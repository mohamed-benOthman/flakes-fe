import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';
import * as Constants from '../utils/globals';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private zipCodeRegex = /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/;

  constructor(private http: HttpClient) {
  }

  getCitiesList(term: string = null) {
    if (term) {
      term = term.trim();
      return this.http.get<any>(`${Constants.citiesSearchURL}/${term}`).pipe(map(obj => obj.cities));
    } else {
      return of([]);
    }
  }
}
