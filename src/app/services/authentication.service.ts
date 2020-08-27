/*
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import * as Constants from '../utils/globals';
import {ProfileService} from './profile.service';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private profileService: ProfileService) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${Constants.userURL}/login`, { email: username, password: password })
      .pipe(map(response => {
        if (response.user && response.user.token) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          console.log('login() we are loading the profile: ' + response.user.email);
          this.profileService.loadProfile(null, response.user.email, true);
          this.profileService.isAuthenticated = true;
        }
        console.log('----> login: storing currentUser: ' + JSON.stringify(response.user));

        return response.user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.profileService.isAuthenticated = false;
  }

  resetPassword(email) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    const url = `${Constants.userURL}/forgotpassword/` + email;
    console.log('resetPassword url:      ' + url);
    return this.http.get<any>(url, requestOptions).subscribe(data => {
      console.log(data);
    });
  }
}
*/

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import * as Constants from '../utils/globals';
import {ProfileService} from './profile.service';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private profileService: ProfileService) { }

  login(email: string, password: string) {
    return this.http.post<any>(`${Constants.userURL}/login`, { email: email, password: password })
      .pipe(map(response => {
        if (response.user && response.user.token) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          //this.profileService.authenticatedUsername = response.user.userna;
          this.profileService.loadProfile(response.user.userna);
          //this.profileService.isAuthenticated = true;
        }
        console.log('----> login: storing currentUser: ' + JSON.stringify(response.user));

        return response.user;
      }));
  }

  logout() {
    console.log('we log out');
    localStorage.removeItem('currentUser');
    // this.profileService.isAuthenticated = false;
    // this.profileService.authenticatedUsername = null;
  }

  resetPassword(email) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    const url = `${Constants.userURL}/forgotpassword/` + email;
    console.log('resetPassword url:      ' + url);
    return this.http.get<any>(url, requestOptions).subscribe(data => {
      console.log(data);
    });
  }
}
