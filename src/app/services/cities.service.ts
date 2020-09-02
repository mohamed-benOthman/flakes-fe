import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import * as Constants from '../utils/globals';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private zipCodeRegex = /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/;
  private cache: Record<string, Observable<any>>;
  private requestOptions;

  constructor(private http: HttpClient) {
    this.cache = {};

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    this.requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
  }

  getCitiesList(term: string = null) {
    if (term) {
      term = term.trim();
      const url = `${Constants.citiesSearchURL}/${term}`;

      if (!this.cache[url]) {
        this.cache[url] = this.http.get<any>(url, this.requestOptions).pipe(
          shareReplay(1),
          // @ts-ignore
          map(obj => obj.cities));
      }
      else {
        console.log('on récupère le cache des villes: ' + url);
      }
      return this.cache[url];
      // @ts-ignore
      // return this.http.get<any>(url, this.requestOptions).pipe(map(obj => obj.cities));
    } else {
      return of([]);
    }
  }
}
