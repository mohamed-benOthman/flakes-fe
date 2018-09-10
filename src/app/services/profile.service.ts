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

  private url = 'http://82.165.253.223:3000/maquilleuse/perfectJohn/1';
  // private url = 'http://82.165.253.223:3000/maquilleuse/frosa/1';

  private userProfile: BehaviorSubject<Profile>;
  currentProfile: Observable<Profile>;

  constructor(private http: HttpClient, private businessExpertiseService: BusinessExpertService) {
    this.userProfile = new BehaviorSubject<Profile>(this.emptyProfile);
    this.currentProfile = this.userProfile.asObservable();
    // this.formatBusinessInProfile();

    /*this.currentProfile = this.http.get<Profile>(this.url).pipe(
      tap(data => console.log('on a appelé le profile depuis le server'))
    );*/

    const profileObs = this.http.get<Profile>(this.url);
    const businessObs = this.businessExpertiseService.getBusiness();
    const expertiseObs = this.businessExpertiseService.getExpertises();

    forkJoin([profileObs, businessObs, expertiseObs]).subscribe(results => {
      const profile = results[0];
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

      this.formatCities(profile);
      this.updateProfile(profile);
    });
  }

  formatCities(profile: Profile) {
    if (profile.cities) {
      const cities = {code: profile.cities.zip_code, city: profile.cities.name};
      profile.cities = cities;
      console.log('cities formatted: ' + JSON.stringify(profile.cities));
    }
  }


  updateProfile(profile) {
    this.userProfile.next(profile);
  }
}
