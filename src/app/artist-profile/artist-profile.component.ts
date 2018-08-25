import {Component, OnInit, ViewChild} from '@angular/core';
import {Profile} from '../models/profile.model';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';
import {Message} from 'primeng/api';
import * as cloneDeep from 'lodash/cloneDeep';
import {ProfileService} from '../services/profile.service';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.css']
})
export class ArtistProfileComponent implements OnInit {

  @ViewChild(ProfileEditComponent) profileEditComponent: ProfileEditComponent;
  /*@ViewChild('postalCodeInput') zipCodeInput;
  @ViewChild('sloganArea') sloganArea;*/

  // sloganMaxLen = 500;

  currentProfile: Profile;

  currentProfileCopy: Profile;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  displayEditProfileDialog: boolean;
  displayEditPhotosDialog: boolean;
  growlMessage: Message[] = [];
  uploadedFiles: any[] = [];


  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.displayEditProfileDialog = false;
    this.displayEditPhotosDialog = false;

    this.profileService.currentProfile.subscribe(res => this.currentProfile = res);
    this.currentProfileCopy = cloneDeep(this.currentProfile);

    this.galleryOptions = [
      {width: '100%', height: '480px', thumbnailsColumns: 4, imageAnimation: NgxGalleryAnimation.Slide,
        previewCloseOnClick: true, previewCloseOnEsc: true
      },
      {breakpoint: 800, width: '100%', height: '600px', imagePercent: 80, thumbnailsPercent: 10,
        thumbnailsMargin: 20, thumbnailMargin: 20
      },
      {breakpoint: 400, preview: false}
    ];

    this.galleryImages = [];
    for (const img of this.currentProfile.photosUrl) {
      this.galleryImages.push({small: img, medium: img, big: img});
    }

  }

  onDeletePhoto(index) {
    this.currentProfile.photosUrl.splice(index, 1);
    this.profileService.updateProfile(this.currentProfile);
    this.galleryImages.splice(index, 1);
    this.showPhotoDeletedSuccess();
    console.log('photosLength= ' + this.currentProfile.photosUrl.length);
  }

  editProfileClicked() {
    this.currentProfileCopy = cloneDeep(this.currentProfile);
    this.displayEditProfileDialog = true;
  }

  editPhotosClicked() {
    this.displayEditPhotosDialog = true;
  }

  saveEditProfile() {
    this.displayEditProfileDialog = false;
    this.profileEditComponent.saveEditProfile();
  }

  showPhotoDeletedSuccess() {
    this.growlMessage = [];
    this.growlMessage.push({
      severity: 'success',
      summary: 'Photo supprimée',
      detail: 'La photo a été correctement supprimée sur le serveur'});
  }

  showPhotoUploadedSuccess() {
    this.growlMessage = [];
    this.growlMessage.push({
      severity: 'success',
      summary: 'Photo(s) envoyée(s)',
      detail: ''});
  }

  onUploadPhotos(event) {
    this.showPhotoUploadedSuccess();
  }

  onSelectPhotos(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  onRemoveSelectedPhoto(file) {
    this.uploadedFiles = this.uploadedFiles.filter(item => item !== file);
  }

}
