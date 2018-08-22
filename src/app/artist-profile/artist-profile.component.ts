import {Component, OnInit} from '@angular/core';
import {Profile} from '../models/profile.model';
import * as $ from '../../../assets/js/jquery';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.css']
})
export class ArtistProfileComponent implements OnInit {

  currentProfile: Profile = {
    username: 'perfectJohn',
    firstName: 'John',
    lastName: 'Doe',
    phone: '062232323',
    zipCode: '75002',
    departments: ['Paris', 'Hauts de seine'],
    business: 'Beauté',
    emailAdress: 'test@gmail.com',
    expertise: ['Manucure'],
    slogan: 'Le client est roi',
    photosUrl: []
  };

  constructor() {
  }

  ngOnInit() {
    $(document).ready(function() {
      $('#lightGallery').lightGallery({
        mode: 'fade',
        speed: 800,
        caption: true,
        desc: true,
        mobileSrc: true
      });
    });
  }

}
