import { Component, OnInit } from '@angular/core';
import {Profile} from '../models/profile.model';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.css']
})
export class ArtistProfileComponent implements OnInit {

  currentProfile: Profile = new Profile();

  constructor() { }

  ngOnInit() {
  }

}
