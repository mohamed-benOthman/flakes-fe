import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import * as Constants from '../utils/globals';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }


  // exemple: http://82.165.253.223:3000/maquilleuse/|34000;montpellier|1|1,3/2|3|4/0/10
  requestSearch(elementsNumber: number = 10, displayedPage: number = 0,
                dept: string = null, city: string = null,
                businessType: string = null, expertiseType: any[] = null) {

    console.log('dept = ' +  `${dept}`)
    const typeURL = this.getTypePart(dept, city, businessType, expertiseType);
    const paramURL = this.getParamPart(dept, city, businessType, expertiseType);

    console.log('requestSearch = ' + `${Constants.searchURL}/${paramURL}/${typeURL}/${displayedPage}/${elementsNumber}`);

    return this.http.get<any>(`${Constants.searchURL}/${paramURL}/${typeURL}/${displayedPage}/${elementsNumber}`)
      .pipe(
        map(profiles => {
          if (profiles) {
            for (const profile of profiles) {
              if (!profile.photo_profile) {
                profile.photo_profile = Constants.defaultProfilePhoto;
              }
            }
          }
          return profiles;
        }));
  }

  requestSearchCount(dept: string = null, city: string = null, businessType: string = null, expertiseType: any[] = null) {
    const typeURL = this.getTypePart(dept, city, businessType, expertiseType);
    const paramURL = this.getParamPart(dept, city, businessType, expertiseType);

    console.log('requestCount = ' + `${Constants.searchURL}/${paramURL}/${typeURL}`);

    return this.http.get<any>(`${Constants.searchURL}/${paramURL}/${typeURL}`);
  }


  private getParamPart(dept: string, city: string, businessType: string, expertiseType: any[]) {
    let paramURL = '';

    if (dept !== null) {
      paramURL = dept.trim();
    }
    paramURL = `${paramURL}|`;

    if (city !== null) {
      console.log('ici city = ' + JSON.stringify(city));
      paramURL += city.trim();
    }
    paramURL = `${paramURL}|`;

    if (businessType !== null) {
      paramURL += businessType.trim();
    }
    paramURL = `${paramURL}|`;

    if (expertiseType !== null && expertiseType.length > 0) {
      for (const expertise of expertiseType) {
        paramURL += expertise.value + ',';
      }
      if (paramURL !== null && paramURL.endsWith(',')) {
        paramURL = paramURL.substring(0, paramURL.length - 1);
      }
    }

    return paramURL;
  }


  private getTypePart(dept: string, city: string, businessType: string, expertiseType: any[]) {
    let typeURL = '';

    if (dept !== null) {
      typeURL = '1';
    }

    if (city !== null) {
      typeURL += '|2';
    }

    if (businessType !== null) {
      typeURL += '|3';
    }

    if (expertiseType !== null && expertiseType.length > 0) {
      typeURL += '|4';
    }

    if (typeURL !== null && typeURL.startsWith('|')) {
      typeURL = typeURL.substring(1);
    }

    return typeURL;
  }
}

