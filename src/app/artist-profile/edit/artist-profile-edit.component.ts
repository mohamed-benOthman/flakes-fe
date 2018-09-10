import {Component, OnInit, ViewChild} from '@angular/core';
import {Profile} from '../../models/profile.model';
import {ProfileService} from '../../services/profile.service';
import {ProfileEditInfoComponent} from './profile-edit-info/profile-edit-info.component';
import {ProfilePhotosGalleryComponent} from '../display/profile-photos-gallery/profile-photos-gallery.component';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-artist-profile-edit',
  templateUrl: './artist-profile-edit.component.html',
  styleUrls: ['./artist-profile-edit.component.css']
})
export class ArtistProfileEditComponent implements OnInit {

  @ViewChild(ProfileEditInfoComponent) profileEditInfoComponent: ProfileEditInfoComponent;

  currentProfile: Profile;
  growlMessage: Message[] = [];

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.currentProfile.subscribe(res => {
      console.log('in app-artist-profile with profile = ' + JSON.stringify(res));
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
      detail: ''});
  }

  showSaveSuccess() {
    this.growlMessage = [];
    this.growlMessage.push({
      severity: 'success',
      summary: 'Modifications sauvegardées',
      detail: ''});
  }

  saveEditProfile() {
    this.profileEditInfoComponent.saveEditProfile();
    this.showSaveSuccess();
  }

  cancelEditProfile() {

  }

}
