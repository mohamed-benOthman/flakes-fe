import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {Profile} from '../../models/profile.model';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit, AfterViewInit {

  private currentProfile: Profile;

  constructor(private router: Router,
              private profileService: ProfileService,
              private authService: AuthenticationService) { }

  ngOnInit() {
    if (this.profileService.isAuthenticated()) {
      this.profileService.currentDisplayedProfile.subscribe(res => {
        this.currentProfile = res;
      });
    }
  }



  showProfile() {
    if (this.profileService.isAuthenticated() && this.profileService.getAuthUsername()) {
      if (this.currentProfile.username !== this.profileService.getAuthUsername()) {
        this.profileService.loadProfile(this.profileService.getAuthUsername());
      }
    }
    this.router.navigate(['profile']);
  }

  loggout() {
    this.authService.logout();
  }

  ngAfterViewInit(): void {
    if (this.currentProfile.username !== this.profileService.getAuthUsername()) {
      this.currentProfile = this.profileService.getEmptyProfile();
      this.profileService.loadProfile(this.profileService.getAuthUsername());
    }
  }

}
