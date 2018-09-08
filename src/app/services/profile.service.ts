import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, of} from 'rxjs';
import {Profile} from '../models/profile.model';
import {BusinessExpertService} from './business-expert.service';
import {HttpClient} from '@angular/common/http';
import * as cloneDeep from 'lodash/cloneDeep';
import {Business} from '../models/business.model';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private testProfile: Profile = {
    idMaquilleuse: 5,
    lastname: 'John',
    firstname: 'Doe',
    username: 'perfectJohn',
    emailAdress: 'test@gmail.com',
    phone: '0622323230',
    street: '30 Rue Robert Dugrand - Rond point de la lyre',
    slogan: 'Sed posuere consectetur est at lobortis. Maecenas sed diam eget risus varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna mollis euismod.',
    photo_profile: '',
    photosUrl: [
      {
        id: 1,
        url: 'http://mag.monchval.com/wp-content/uploads/2016/06/article-maquillage-nulles-6-590x550.jpg'
      },
      {
        id: 2,
        url: 'https://img-3.journaldesfemmes.com/Oj4Rk7M5xAMAutdhRJhhoYCgSwQ=/910x607/smart/4257bafa1938402c9ca80a087798efab/ccmcms-jdf/10349409.png'
      },
      {
        id: 3,
        url: 'http://www.ambassaderm-formation-esthetique.com/images/m/mic/microblading-square.jpg'
      },
      {
        id: 4,
        url: 'http://www.atlanthal.com/73-large_default/manucure-pose-vernis.jpg'
      }
    ],
    cities: {
      id: 13288,
      insee_code: '34172',
      zip_code: '34000',
      name: 'Montpellier',
      slug: 'montpellier',
      gps_lat: 43.6047275,
      gps_lng: 3.9011747
    },
    business: [
      {
        idBusiness: 1,
        libelle: 'Maquillage'
      },
      {
        idBusiness: 2,
        libelle: 'Manucure'
      }
    ],
    expertises: []

  };
  private emptyProfile: Profile = {
    idMaquilleuse: 0,
    lastname: '',
    firstname: '',
    username: '',
    emailAdress: '',
    phone: '',
    street: '',
    slogan: '',
    photo_profile: '',
    photosUrl: [],
    cities: {},
    business: [],
    expertises: []

  };

  // private url = 'http://82.165.253.223:3000/maquilleuse/perfectJohn/1';
  private url = 'http://82.165.253.223:3000/maquilleuse/frosa/1';

  private userProfile: BehaviorSubject<Profile>;
  currentProfile: Observable<Profile>;

  constructor(private http: HttpClient, private businessExpertiseService: BusinessExpertService) {
    this.userProfile = new BehaviorSubject<Profile>(this.emptyProfile);
    this.currentProfile = this.userProfile.asObservable();
    // this.formatBusinessInProfile();

    /*this.currentProfile = this.http.get<Profile>(this.url).pipe(
      tap(data => console.log('on a appelé le profile depuis le server'))
    );*/

    const profileObs = this.http.get<Profile>(this.url);
    const businessObs = this.businessExpertiseService.getBusiness();
    const expertiseObs = this.businessExpertiseService.getExpertises();

    forkJoin([profileObs, businessObs, expertiseObs]).subscribe(results => {
      const profile = results[0];
      const businesses = cloneDeep(results[1]);
      const expertises = cloneDeep(results[2]);

      for (const business of businesses) {
        business.checked = profile.business.some(x => x.idBusiness === business.idBusiness);
      }
      profile.business = businesses;

      for (const expertise of expertises) {
        expertise.checked = profile.business.some(x => x.idExpertise === expertise.idExpertise);
      }
      profile.business = businesses;
      profile.expertises = expertises;

      this.updateProfile(profile);
    });

    /*this.http.get<Profile>(this.url).subscribe(profile => {
      this.updateProfile(profile);
      this.formatBusinessInProfile(profile);
    });*/
  }

  /*
  Méthode qui va ajouter tous les business au profile avec les libellés
  et indiquer si le profile à telle ou telle compétence grâce à la variable 'checked'.
   */
  private formatBusinessInProfile(profile: Profile) {
    this.businessExpertiseService.getBusiness().subscribe(businesses => {

    });
  }

  updateProfile(profile) {
    this.userProfile.next(profile);
  }
}
