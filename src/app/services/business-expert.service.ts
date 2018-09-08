import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Business} from '../models/business.model';
import {Expertise} from '../models/expertise.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessExpertService {

  private bizUrl = 'http://82.165.253.223:3000/business';
  private expertUrl = 'http://82.165.253.223:3000/expertise';

  private cachedBusiness: Business[];
  private cachedExpertise: Expertise[];

  constructor(private http: HttpClient) {
  }

  getBusiness() {
    if (this.cachedBusiness) {
      return of(this.cachedBusiness);
    } else {
      return this.http.get<Business[]>(this.bizUrl)
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
      return this.http.get<Expertise[]>(this.expertUrl)
        .pipe(
          tap((data) => {
            this.cachedExpertise = data;
          }));
    }
  }
}
