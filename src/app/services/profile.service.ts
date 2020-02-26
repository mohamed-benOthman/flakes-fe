import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, of} from 'rxjs';
import {Profile} from '../models/profile.model';
import {BusinessExpertService} from './business-expert.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as cloneDeep from 'lodash/cloneDeep';
import * as Constants from '../utils/globals';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  currentProfile: Observable<Profile>;
  isAuthenticated = true;
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
    expertises: [],
    movings: []
  };
  private userProfile: BehaviorSubject<Profile>;

  constructor(private http: HttpClient, private businessExpertiseService: BusinessExpertService) {
    this.userProfile = new BehaviorSubject<Profile>(this.emptyProfile);
    this.currentProfile = this.userProfile.asObservable();
  }

  searchProfile(username: string) {

    const profileObs = this.http.get<Profile>(`${Constants.searchURL}/${username}/5/0/1`);
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
    console.log('updating profile with ' + JSON.stringify(profile));
    this.userProfile.next(profile);
  }

  postProfileObserver(profile) {
    const regex = /\"/gi;
    // console.log('postProfileObserver: ' + JSON.stringify(profile).replace(regex, '\\\"'));
    console.log('postProfileObserver: ' + JSON.stringify(profile));

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    };

    return this.http.post(Constants.searchURL, JSON.stringify(profile), httpOptions);
  }

  postPhoto(uploadData) {
    return this.http.post(Constants.uploadPhotoURL, uploadData);
  }

  formatProfileForUpload(profile) {
    const formattedProfile = cloneDeep(profile);
    let business = '', expertises = '', photosUrl = '', cities = '';

    if (profile.business) {
      for (const biz of profile.business) {
        if (biz.checked) {
          business += biz.idBusiness + '|';
        }
      }
      if (business.endsWith('|')) {
        business = business.substring(0, business.length - 1);
      }
    }

    if (profile.expertises) {
      for (const expt of profile.expertises) {
        if (expt.checked) {
          expertises += expt.idExpertise + '|';
        }
      }
      if (expertises.endsWith('|')) {
        expertises = expertises.substring(0, expertises.length - 1);
      }
    }

    if (profile.photosUrl) {
      for (const photo of profile.photosUrl) {
        photosUrl += photo.id + '|';
      }
      if (photosUrl.endsWith('|')) {
        photosUrl = photosUrl.substring(0, photosUrl.length - 1);
      }
    }

    if (profile.cities) {
      cities = profile.cities.code + ';' + profile.cities.city;
    }

    formattedProfile.business = business;
    formattedProfile.expertises = expertises;
    formattedProfile.photosUrl = photosUrl;
    formattedProfile.cities = cities;

    return formattedProfile;
  }


}
