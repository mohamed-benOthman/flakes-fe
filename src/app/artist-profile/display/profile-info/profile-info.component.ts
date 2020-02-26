import { Component, OnInit } from '@angular/core';
import {Profile} from '../../../models/profile.model';
import {ProfileService} from '../../../services/profile.service';
import {BusinessExpertService} from '../../../services/business-expert.service';
import {Business} from '../../../models/business.model';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  currentProfile: Profile;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.currentProfile.subscribe(res => this.currentProfile = res);
  }

  isLoggedIn() {
    return this.profileService.isAuthenticated;
  }

  isMoving() {
    return this.currentProfile.movings != null && this.currentProfile.movings.length > 0;
  }
}
