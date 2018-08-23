import {Component, OnInit, ViewChild} from '@angular/core';
import {Profile} from '../models/profile.model';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.css']
})
export class ArtistProfileComponent implements OnInit {

  @ViewChild('postalCodeInput') zipCodeInput;

  currentProfile: Profile = {
    username: 'perfectJohn',
    firstName: 'John',
    lastName: 'Doe',
    phone: '062232323',
    zipCode: '75002',
    departments: ['Paris', 'Hauts de seine'],
    business: [
      {id: 'businessId1', label: 'Maquillage', checked: false},
      {id: 'businessId2', label: 'Microblading', checked: true},
      {id: 'businessId3', label: 'Manucure', checked: false},
      {id: 'businessId4', label: 'Extension de cils', checked: false}
    ],
    emailAdress: 'test@gmail.com',
    expertise: [
      {id: 'expertiseId1', label: 'Peau claire', checked: false},
      {id: 'expertiseId2', label: 'Peau foncée', checked: true},
      {id: 'expertiseId3', label: 'Peau mate', checked: false}
    ],
    slogan: 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod.',
    photosUrl: ['https://cdn.pixabay.com/photo/2017/06/02/14/11/girl-2366438_1280.jpg',
      'https://cdn.pixabay.com/photo/2015/05/31/13/29/lipstick-791761_1280.jpg',
      'https://cdn.pixabay.com/photo/2016/01/10/21/06/eye-1132531_1280.jpg',
      'https://cdn.pixabay.com/photo/2016/10/22/22/37/eyelash-curler-1761855_1280.jpg',
      'https://cdn.pixabay.com/photo/2016/03/26/23/17/woman-1281830_1280.jpg',
      'assets/images/face-1.png', 'assets/images/face2.png', 'assets/images/face-3.png',
      'assets/images/face-4.png', 'assets/images/face-5.png', 'assets/images/face-6.png']
  };

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  displayEditDialog: boolean;

  constructor() {
  }

  ngOnInit() {
    this.displayEditDialog = false;

    this.galleryOptions = [
      {width: '100%', height: '480px', thumbnailsColumns: 4, imageAnimation: NgxGalleryAnimation.Slide, previewCloseOnClick: true},
      {breakpoint: 800, width: '100%', height: '600px', imagePercent: 80, thumbnailsPercent: 10, thumbnailsMargin: 20, thumbnailMargin: 20},
      {breakpoint: 400, preview: false}
    ];

    this.galleryImages = [];
    for (const img of this.currentProfile.photosUrl) {
      this.galleryImages.push({small: img, medium: img, big: img});
    }

  }

  editProfileClicked(event) {
    console.log('edit the profile please!');
    this.displayEditDialog = true;
  }

  zipCodeChecker(event: KeyboardEvent) {
    if (this.zipCodeInput.nativeElement.value.length >= 5) {
      event.preventDefault();
    } else {
      const pattern = /[0-9\+\-\ ]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  }

}
