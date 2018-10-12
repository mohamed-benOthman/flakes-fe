import {Component, OnInit, ViewChild} from '@angular/core';
import {Profile} from '../../models/profile.model';
import {ProfileService} from '../../services/profile.service';
import {ProfileEditInfoComponent} from './profile-edit-info/profile-edit-info.component';
import {ProfilePhotosGalleryComponent} from '../display/profile-photos-gallery/profile-photos-gallery.component';
import {Message} from 'primeng/api';
import {Router} from '@angular/router';
import {ProfileEditPhotosComponent} from './profile-edit-photos/profile-edit-photos.component';
import * as Constants from '../../utils/globals';

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
  updateProfileDone = false;
  profileSuccessfullyUpdated = false;

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
      if (this.profileEditInfoComponent.profilePhotoFile) {
        const profilePhotoFile = this.profileEditInfoComponent.profilePhotoFile;
        this.isUploading = true;
        const uploadData = new FormData();
        uploadData.append(Constants.uploadPhotoParam, profilePhotoFile, profilePhotoFile.name);

        this.profileService.postPhoto(uploadData).subscribe(results => {
          console.log('response after posting photo profile = ' + JSON.stringify(results));
          // @ts-ignore
          this.profileEditInfoComponent.currentProfileCopy.photo_profile = results.url;
          this.sendProfileServer();
        }, error1 => {
          console.log('response error = ' + JSON.stringify(error1));
          this.isUploading = false;
          this.sendProfileServer();
        });
      } else {
        this.sendProfileServer();
      }
    } else {
      this.displayInvalidProfile = true;
    }
  }

  sendProfileServer() {
    this.isUploading = true;
    this.currentProfile = this.profileEditInfoComponent.currentProfileCopy;
    this.currentProfile.photosUrl = this.profileEditPhotosComponent.currentProfileCopy.photosUrl;
    this.profileService.updateProfile(this.currentProfile);

    const formattedProfile = this.profileService.formatProfileForUpload(this.currentProfile);
    this.profileService.postProfileObserver(formattedProfile).subscribe(
      res => {
        console.log('post profile response: ' + JSON.stringify(formattedProfile));
        console.log('server response = ' + res);
        this.showSaveSuccess();
        this.isUploading = false;
        this.updateProfileDone = true;
        this.profileSuccessfullyUpdated = true;
      },
      err => {
        console.log('post profile erreur: ' + JSON.stringify(err));
        this.isUploading = false;
        this.updateProfileDone = true;
        this.profileSuccessfullyUpdated = false;
      }
    );
  }

  cancelEditProfile() {
    console.log('cancelEditProfile');
    this.router.navigate(['/profile']);
  }

  quitEdit() {
    this.router.navigate(['/profile']);
  }

}
