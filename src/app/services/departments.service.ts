import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import * as Constants from '../utils/globals';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  private cachedDepartments;

  constructor(private http: HttpClient) { }

  public getJSON(): Observable<any> {
    if (this.cachedDepartments) {
      return of(this.cachedDepartments);
    } else {
      return this.http.get(Constants.departmentsURL)
        .pipe(
          tap((data) => {
            this.cachedDepartments = data;
          })
        );
    }
  }
}
