/*
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

  currentDisplayedProfile: Observable<Profile>;
  currentLoggedInProfile: Observable<Profile>;
  isAuthenticated = false;
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
    movings: '',
    departements: []
  };
  private userProfile: BehaviorSubject<Profile>;
  private loggedProfile: BehaviorSubject<Profile>;

  constructor(private http: HttpClient, private businessExpertiseService: BusinessExpertService) {
    this.userProfile = new BehaviorSubject<Profile>(this.emptyProfile);
    this.loggedProfile = new BehaviorSubject<Profile>(this.emptyProfile);

    this.currentDisplayedProfile = this.userProfile.asObservable();
    this.currentLoggedInProfile = this.loggedProfile.asObservable();
  }

  loadProfile(username: string = null, email: string = null, isAuthUser: boolean = false) {
    const profileUrl = email != null ? `${Constants.searchURL}/${email}/6/0/1` : `${Constants.searchURL}/${username}/5/0/1`;
    console.log('url profile = ' + profileUrl);
    const profileObs = this.http.get<Profile>(profileUrl);
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
      this.updateProfile(profile, isAuthUser);
    });
  }

  updateProfile(profile, isAuthUser: boolean = false) {
    console.log('updating profile with ' + JSON.stringify(profile));
    // isAuthUser ? this.loggedProfile.next(profile) : this.userProfile.next(profile);
    if (isAuthUser) {
      this.loggedProfile.next(profile);
    }
    this.userProfile.next(profile); // on charge dans tous les cas le displayed profile
  }

  createProfileObserver(profile) {
    const regex = /\"/gi;
    // console.log('createProfileObserver: ' + JSON.stringify(profile).replace(regex, '\\\"'));
    console.log('createProfileObserver: ' + JSON.stringify(profile));

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    };

    return this.http.post(Constants.searchURL + '/create', JSON.stringify(profile), httpOptions);
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
*/


import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, of} from 'rxjs';
import {Profile} from '../models/profile.model';
import {BusinessExpertService} from './business-expert.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as cloneDeep from 'lodash/cloneDeep';
import * as Constants from '../utils/globals';
import {LOGGED_IN_KEY} from '../utils/globals';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  currentDisplayedProfile: Observable<Profile>;
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
    movings: '',
    departements: []
  };
  private userProfile: BehaviorSubject<Profile>;

  // isAuthenticated = false;
  // authenticatedUsername: string = null;

  constructor(private http: HttpClient, private businessExpertiseService: BusinessExpertService) {
    this.userProfile = new BehaviorSubject<Profile>(this.emptyProfile);
    this.currentDisplayedProfile = this.userProfile.asObservable();
  }

  loadProfile(username: string) {
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

  createProfileObserver(profile) {
    const regex = /\"/gi;
    // console.log('createProfileObserver: ' + JSON.stringify(profile).replace(regex, '\\\"'));
    console.log('createProfileObserver: ' + JSON.stringify(profile));

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    };

    return this.http.post(Constants.searchURL + '/create', JSON.stringify(profile), httpOptions);
  }

  updateProfileObserver(profile) {
    const regex = /\"/gi;
    // console.log('postProfileObserver: ' + JSON.stringify(profile).replace(regex, '\\\"'));
    console.log('updateProfileObserver: ' + JSON.stringify(profile));

    const currentUser = JSON.parse(localStorage.getItem(LOGGED_IN_KEY));

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json',
        // 'authorization': `Token ${currentUser.token}`
      })
    };

    console.log('updating with headers: ' + JSON.stringify(httpOptions));

    return this.http.post(Constants.searchURL + '/modify', JSON.stringify(profile), httpOptions);
  }

  postPhoto(uploadData) {

    return this.http.post('http://82.165.253.223:3050/files/upload', uploadData);
  }

  savePhoto(photoUrl) {
    const user = JSON.parse(localStorage.getItem('currentUser')) ;
    const maquilleuseId = user.idMaquilleuse;

    const data = {
      id: maquilleuseId,
      url: photoUrl
    };
    return this.http.post(Constants.photosURL + '/add', data);
  }

  deletePhoto(photoUrl) {
    const user = JSON.parse(localStorage.getItem('currentUser')) ;
    const maquilleuseId = user.idMaquilleuse;

    const data = {
      id: maquilleuseId,
      url: photoUrl
    };
    return this.http.post(Constants.photosURL + '/delete', data);
  }

  getBaniereImages() {
    return this.http.get('http://localhost:3050/banierePubliciataire/all');
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

  updateProfile(profile) {
    this.userProfile.next(profile);
  }

  getEmptyProfile() {
    return cloneDeep(this.emptyProfile);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(LOGGED_IN_KEY) != null;
  }

  getAuthUsername(): string {
    const user = localStorage.getItem(LOGGED_IN_KEY);
    if (user) {
      return JSON.parse(user).userna;
    }
    return null;
  }



}
