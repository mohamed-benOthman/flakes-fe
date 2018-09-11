import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Business} from '../models/business.model';
import {tap} from 'rxjs/operators';

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
      return this.http.get('../../assets/json/departments.json')
        .pipe(
          tap((data) => {
            this.cachedDepartments = data;
          })
        );
    }
  }
}
