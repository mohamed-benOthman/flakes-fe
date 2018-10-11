import {Component, OnInit, ViewChild} from '@angular/core';
import {Profile} from '../../models/profile.model';
import {ProfileService} from '../../services/profile.service';
import {ProfileEditInfoComponent} from './profile-edit-info/profile-edit-info.component';
import {ProfilePhotosGalleryComponent} from '../display/profile-photos-gallery/profile-photos-gallery.component';
import {Message} from 'primeng/api';
import {Router} from '@angular/router';
import {ProfileEditPhotosComponent} from './profile-edit-photos/profile-edit-photos.component';

@Component({
  selector: 'app-artist-profile-edit',
  templateUrl: './artist-profile-edit.component.html',
  styleUrls: ['./artist-profile-edit.component.css']
})
export class ArtistProfileEditComponent implements OnInit {

  @ViewChild(ProfileEditInfoComponent) profileEditInfoComponent: ProfileEditInfoComponent;
  @ViewChild(ProfileEditPhotosComponent) profileEditPhotosComponent: ProfileEditPhotosComponent;

  currentProfile: Profile;
  growlMessage: Message[] = [];

  isUploading = false;
  displayInvalidProfile = false;

  constructor(private profileService: ProfileService, private router: Router) {
  }

  ngOnInit() {
    this.profileService.currentProfile.subscribe(res => {
      this.currentProfile = res;
    });
  }

  deleteFromGallery(index) {
  }

  showPhotoUploadedSuccess() {
    this.growlMessage = [];
    this.growlMessage.push({
      severity: 'success',
      summary: 'Photo(s) envoyée(s)',
      detail: ''
    });
  }

  showSaveSuccess() {
    this.growlMessage = [];
    this.growlMessage.push({
      severity: 'success',
      summary: 'Modifications sauvegardées',
      detail: ''
    });
  }

  saveEditProfile() {
    console.log('saveEditProfile');

    if (this.profileEditInfoComponent.isValidProfile()) {
      // this.profileEditInfoComponent.saveEditProfile();
      // this.profileEditPhotosComponent.savePhotosProfile();

      this.currentProfile = this.profileEditInfoComponent.currentProfileCopy;
      this.currentProfile.photosUrl = this.profileEditPhotosComponent.currentProfileCopy.photosUrl;
      this.profileService.updateProfile(this.currentProfile);

      const formattedProfile = this.profileService.formatProfileForUpload(this.currentProfile);
      this.profileService.postProfileObserver(formattedProfile).subscribe(res => {
          console.log('post profile response: ' + JSON.stringify(formattedProfile));
          console.log('server response = ' + res);
          this.showSaveSuccess();
        },
        err => {
          console.log('post profile erreur: ' + JSON.stringify(err));
        }
      );
    }
    else {
      this.displayInvalidProfile = true;
    }
  }


  cancelEditProfile() {
    console.log('cancelEditProfile');
    this.router.navigate(['/profile']);
  }

}
