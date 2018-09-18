import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, of} from 'rxjs';
import {Profile} from '../models/profile.model';
import {BusinessExpertService} from './business-expert.service';
import {HttpClient} from '@angular/common/http';
import * as cloneDeep from 'lodash/cloneDeep';
import {Business} from '../models/business.model';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private emptyProfile: Profile = {
    idMaquilleuse: 0,
    lastname: '',
    firstname: '',
    username: '',
    emailAdress: '',
    phone: '',
    street: '',
    slogan: '',
    photo_profile: '',
    photosUrl: [],
    cities: {},
    business: [],
    expertises: []

  };

  private baseURL = 'http://82.165.253.223:3000/maquilleuse';

  private userProfile: BehaviorSubject<Profile>;
  currentProfile: Observable<Profile>;

  isAuthenticated = false;

  constructor(private http: HttpClient, private businessExpertiseService: BusinessExpertService) {
    this.userProfile = new BehaviorSubject<Profile>(this.emptyProfile);
    this.currentProfile = this.userProfile.asObservable();
  }

  searchProfile(username: string) {

    const profileObs = this.http.get<Profile>(`${this.baseURL}/${username}/5/0/1`);
    const businessObs = this.businessExpertiseService.getBusiness();
    const expertiseObs = this.businessExpertiseService.getExpertises();

    forkJoin([profileObs, businessObs, expertiseObs]).subscribe(results => {
      const profile = cloneDeep(results[0])[0]; // renvoi un tableau avec un profile
      const businesses = cloneDeep(results[1]);
      const expertises = cloneDeep(results[2]);

      for (const business of businesses) {
        business.checked = profile.business.some(x => x.idBusiness === business.idBusiness);
      }
      profile.business = businesses;

      for (const expertise of expertises) {
        expertise.checked = profile.expertises.some(x => x.idExpertise === expertise.idExpertise);
      }
      profile.business = businesses;
      profile.expertises = expertises;

      // this.formatCities(profile);
      this.updateProfile(profile);
    });
  }

  updateProfile(profile) {
    this.userProfile.next(profile);
  }
}
