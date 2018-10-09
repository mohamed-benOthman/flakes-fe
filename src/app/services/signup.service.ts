import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  baseUrl = 'http://82.165.253.223:3000/maquilleuse';

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
      return this.http.get<any>(`${this.baseUrl}/${email}/E`);
    } else {
      return of([]);
    }
  }

  private checkUsernameNotTaken(username: string = null) {
    if (username) {
      username = username.trim();
      return this.http.get<any>(`${this.baseUrl}/${username}/U`);
    } else {
      return of([]);
    }
  }
}
