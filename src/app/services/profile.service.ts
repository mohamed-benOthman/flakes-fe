import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Profile} from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private testProfile: Profile = {
    username: 'perfectJohn',
    firstName: 'John',
    lastName: 'Doe',
    street: '30 Rue Robert Dugrand - Rond point de la lyre',
    phone: '0622323230',
    zipCode: {code: 34000, city: 'MONTPELLIER'},
    department: 'Paris',
    business: [
      {id: 'businessId1', label: 'Maquillage', checked: true},
      {id: 'businessId2', label: 'Microblading', checked: true},
      {id: 'businessId3', label: 'Manucure', checked: true},
      {id: 'businessId4', label: 'Extension de cils', checked: false}
    ],
    emailAdress: 'test@gmail.com',
    expertise: [
      {id: 'expertiseId1', label: 'Peau claire', checked: false},
      {id: 'expertiseId2', label: 'Peau foncée', checked: true},
      {id: 'expertiseId3', label: 'Peau mate', checked: false}
    ],
    slogan: 'Sed posuere consectetur est at lobortis. Maecenas sed diam eget risus varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna mollis euismod.',
    photosUrl: [
      'https://cdn.pixabay.com/photo/2017/06/02/14/11/girl-2366438_1280.jpg',
      'https://cdn.pixabay.com/photo/2015/05/31/13/29/lipstick-791761_1280.jpg',
      'https://cdn.pixabay.com/photo/2016/01/10/21/06/eye-1132531_1280.jpg',
      'https://cdn.pixabay.com/photo/2016/10/22/22/37/eyelash-curler-1761855_1280.jpg',
      'https://cdn.pixabay.com/photo/2016/03/26/23/17/woman-1281830_1280.jpg',
      'assets/images/face-1.png', 'assets/images/face2.png', 'assets/images/face-3.png',
      'assets/images/face-4.png', 'assets/images/face-5.png', 'assets/images/face-6.png'
    ]
  };
  private userProfile = new BehaviorSubject<Profile>(this.testProfile);
  currentProfile = this.userProfile.asObservable();

  constructor() { }

  updateProfile(profile) {
    this.userProfile.next(profile);
  }
}
