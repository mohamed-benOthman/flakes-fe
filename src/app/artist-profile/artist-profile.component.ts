import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Profile} from '../models/profile.model';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';
import {Message} from 'primeng/api';
import * as cloneDeep from 'lodash/cloneDeep';
import {ProfileService} from '../services/profile.service';
import {ProfileEditInfoComponent} from './edit/profile-edit-info/profile-edit-info.component';
import {ProfilePhotosGalleryComponent} from './display/profile-photos-gallery/profile-photos-gallery.component';
import {BusinessExpertService} from '../services/business-expert.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.css']
})
export class ArtistProfileComponent implements OnInit, OnDestroy {

  @ViewChild(ProfileEditInfoComponent) profileEditComponent: ProfileEditInfoComponent;
  @ViewChild(ProfilePhotosGalleryComponent) profilePhotosGalleryComponent: ProfilePhotosGalleryComponent;

  currentProfile: Profile;
  displayEditProfileDialog: boolean;
  displayEditPhotosDialog: boolean;
  growlMessage: Message[] = [];



  constructor(private profileService: ProfileService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.displayEditProfileDialog = false;
    this.displayEditPhotosDialog = false;

    const routeParams = this.activeRoute.snapshot.params;
    if (routeParams) {
      this.profileService.searchProfile(String(routeParams.username));
    }

    this.profileService.currentProfile.subscribe(res => {
      console.log('in app-artist-profile with profile = ' + JSON.stringify(res));
      this.currentProfile = res;
    });
  }

  ngOnDestroy() {

  }

  deleteFromGallery(index) {
    this.profilePhotosGalleryComponent.deleteFromGallery(index);
    this.showPhotoDeletedSuccess();
  }

  editProfileClicked() {
    this.displayEditProfileDialog = true;
    this.router.navigate(['/profile/edit']);
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

  isEditEnabled() {
    return this.profileService.isAuthenticated;
  }

}
