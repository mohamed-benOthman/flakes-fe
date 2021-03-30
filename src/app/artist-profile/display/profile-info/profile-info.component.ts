/*
import {Component, Input, OnInit} from '@angular/core';
import {Profile} from '../../../models/profile.model';
import {ProfileService} from '../../../services/profile.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  @Input() currentProfile: Profile;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    // this.loadProfile();
  }

  loadProfile() {
    console.log('we load profile in ProfileInfoComponent');
    if (this.isLoggedIn()) {
      this.profileService.currentLoggedInProfile.subscribe(res => {
        this.currentProfile = res;
      });
    }
    else {
      this.profileService.currentDisplayedProfile.subscribe(res => {
        this.currentProfile = res;
      });
    }
    return false;
  }

  isLoggedIn() {
    return this.profileService.isAuthenticated;
  }

  isFranceOnly() {
    return this.currentProfile.movings !== '' && this.currentProfile.movings === '1';
  }
}
*/



import {Component, Input, OnInit} from '@angular/core';
import {Profile} from '../../../models/profile.model';
import {ProfileService} from '../../../services/profile.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  @Input() currentProfile: Profile;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.currentDisplayedProfile.subscribe(res => {
      this.currentProfile = res;
    });
  }

  isLoggedIn() {
    return this.profileService.isAuthenticated() && this.currentProfile.username === this.profileService.getAuthUsername();
  }

  isFranceOnly() {
    return this.currentProfile.movings !== '' && this.currentProfile.movings === '1';
  }
}
