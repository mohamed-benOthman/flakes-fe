import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  departments;

  constructor(private http: HttpClient) { }

  public getJSON(): Observable<any> {
    const dpt = this.http.get('../../assets/json/departments.json');
    dpt.subscribe(data => { this.departments = data; });

    return dpt;
  }
}
