import {Component, OnInit, ViewChild} from '@angular/core';
import {Profile} from '../models/profile.model';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';
import {Message} from 'primeng/api';
import * as cloneDeep from 'lodash/cloneDeep';
import {ProfileService} from '../services/profile.service';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';
import {ProfilePhotosGalleryComponent} from './profile-photos-gallery/profile-photos-gallery.component';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.css']
})
export class ArtistProfileComponent implements OnInit {

  @ViewChild(ProfileEditComponent) profileEditComponent: ProfileEditComponent;
  @ViewChild(ProfilePhotosGalleryComponent) profilePhotosGalleryComponent: ProfilePhotosGalleryComponent;

  currentProfile: Profile;
  displayEditProfileDialog: boolean;
  displayEditPhotosDialog: boolean;
  growlMessage: Message[] = [];



  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.displayEditProfileDialog = false;
    this.displayEditPhotosDialog = false;

    this.profileService.currentProfile.subscribe(res => this.currentProfile = res);
  }

  deleteFromGallery(index) {
    this.profilePhotosGalleryComponent.deleteFromGallery(index);
    this.showPhotoDeletedSuccess();
  }

  editProfileClicked() {
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


}
