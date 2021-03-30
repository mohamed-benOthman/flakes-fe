import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Business} from '../models/business.model';
import {Expertise} from '../models/expertise.model';
import * as Constants from '../utils/globals';

@Injectable({
  providedIn: 'root'
})
export class BusinessExpertService {

  private cachedBusiness: Business[];
  private cachedExpertise: Expertise[];

  constructor(private http: HttpClient) {
  }

  getBusiness() {
    if (this.cachedBusiness) {
      return of(this.cachedBusiness);
    } else {
      return this.http.get<Business[]>(Constants.businessURL)
        .pipe(
          tap((data) => {
            this.cachedBusiness = data;
          })
        );
    }
  }

  getExpertises() {
    if (this.cachedExpertise) {
      return of(this.cachedExpertise);
    } else {
      return this.http.get<Expertise[]>(Constants.expertiseURL)
        .pipe(
          tap((data) => {
            this.cachedExpertise = data;
          }));
    }
  }
}
