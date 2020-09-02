import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import * as Constants from '../utils/globals';
import {CITIES_CACHE_KEY} from '../utils/globals';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private zipCodeRegex = /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/;
  private cache: Record<string, Observable<any>>;

  constructor(private http: HttpClient) {
    this.cache = {};
  }

  getCitiesList(term: string = null) {
    if (term) {
      term = term.trim();
      const url = `${Constants.citiesSearchURL}/${term}`;

      /*if (!this.cache[url]) {
        this.cache[url] = this.http.get<any>(url).pipe(map(obj => obj.cities));
      }
      else {
        console.log('on récupère le cache des villes: ' + url);
      }
      return this.cache[url];*/
      return this.http.get<any>(url).pipe(map(obj => obj.cities));
    } else {
      return of([]);
    }
  }
}
