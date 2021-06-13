import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import * as Constants from '../utils/globals';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) {}

  search(terms: Observable<string>, checkEmail = true, checkUsername = false) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => checkEmail ? this.checkEmailNotTaken(term) : this.checkUsernameNotTaken(term))
    );
  }

  private checkEmailNotTaken(email: string = null) {
    if (email) {
      email = email.trim();
      return this.http.get<any>(`${Constants.searchURL}/${email}/E`);
    } else {
      return of([]);
    }
  }

  private checkUsernameNotTaken(username: string = null) {
    if (username) {
      username = username.trim();
      return this.http.get<any>(`${Constants.searchURL}/${username}/U`);
    } else {
      return of([]);
    }
  }
  public getExpertises():any{
    return this.http.get('http://localhost:3050/expertise');
  }
}
