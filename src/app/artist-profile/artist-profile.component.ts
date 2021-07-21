
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Profile} from '../models/profile.model';
import {Message, MessageService} from 'primeng/api';
import {ProfileService} from '../services/profile.service';
import {ProfileEditInfoComponent} from './edit/profile-edit-info/profile-edit-info.component';
import {ProfilePhotosGalleryComponent} from './display/profile-photos-gallery/profile-photos-gallery.component';
import {ActivatedRoute, Router} from '@angular/router';
import {LOGGED_IN_KEY} from '../utils/globals';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.css'],
  providers: [MessageService]
})
export class ArtistProfileComponent implements OnInit, OnDestroy {

  @ViewChild(ProfileEditInfoComponent) profileEditComponent: ProfileEditInfoComponent;
  @ViewChild(ProfilePhotosGalleryComponent) profilePhotosGalleryComponent: ProfilePhotosGalleryComponent;

  currentProfile: Profile;
  displayEditProfileDialog: boolean;
  displayEditPhotosDialog: boolean;
  // growlMessage: Message[] = [];

  constructor(private profileService: ProfileService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.displayEditProfileDialog = false;
    this.displayEditPhotosDialog = false;

    const routeParams = this.activeRoute.snapshot.params;
    if (routeParams && routeParams.username) {
      this.profileService.loadProfile(String(routeParams.username));
    } else if (this.profileService.isAuthenticated()) {
      this.profileService.loadProfile(this.profileService.getAuthUsername());
    }

    this.profileService.currentDisplayedProfile.subscribe(res => {
      this.currentProfile = res;
      console.log(this.currentProfile.username);
      this.profileService.getPaymentAndSubscription(this.currentProfile.username).subscribe((res: any) => {
      this.currentProfile.offre = res.offre;
      this.currentProfile.paymentMethod = res.paymentMethod;
      });
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
    // this.growlMessage = [];
    this.messageService.clear();
    this.messageService.add({
      severity: 'success',
      summary: 'Photo supprimée',
      detail: 'La photo a été correctement supprimée du serveur'
    });
  }

  showPhotoUploadedSuccess() {
    // this.growlMessage = [];
    this.messageService.clear();
    this.messageService.add({
      severity: 'success',
      summary: 'Photo(s) envoyée(s)',
      detail: ''
    });
  }

  isEditEnabled() {
    const currentUser = localStorage.getItem(LOGGED_IN_KEY);
    const jsonUser = JSON.parse(currentUser);
    return jsonUser && this.currentProfile && jsonUser.email === this.currentProfile.emailAdress;
  }
}
