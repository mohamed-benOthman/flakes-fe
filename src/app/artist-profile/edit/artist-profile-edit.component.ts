import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {Profile} from '../../models/profile.model';
import {ProfileService} from '../../services/profile.service';
import {ProfileEditInfoComponent} from './profile-edit-info/profile-edit-info.component';
import {ProfilePhotosGalleryComponent} from '../display/profile-photos-gallery/profile-photos-gallery.component';
import {Message, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {ProfileEditPhotosComponent} from './profile-edit-photos/profile-edit-photos.component';
import * as Constants from '../../utils/globals';
import {ICreateOrderRequest, IPayPalConfig} from 'ngx-paypal';


@Component({
  selector: 'app-artist-profile-edit',
  templateUrl: './artist-profile-edit.component.html',
  styleUrls: ['./artist-profile-edit.component.css'],
  providers: [MessageService]
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

  constructor(private profileService: ProfileService,
              private router: Router,
              private messageService: MessageService) {
  }

  public payPalConfig?: IPayPalConfig;

  ngOnInit() {
    console.log("loulou");
    const formData = new FormData(document.querySelector('form'))
   formData.forEach(value => console.log(value));
    this.profileService.currentDisplayedProfile.subscribe(res => {
      console.log('res = ' + JSON.stringify(res));
      if (res.username == '' && this.profileService.isAuthenticated())
        this.profileService.loadProfile(this.profileService.getAuthUsername());
      else
        this.currentProfile = res;
    });
    this.initConfig();
  }

  private loadAuth

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => < ICreateOrderRequest > {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [{
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: '9.99',
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  deleteFromGallery(index) {
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

  showSaveSuccess() {
    // this.growlMessage = [];
    this.messageService.clear();
    this.messageService.add({
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
    this.profileService.updateProfileObserver(formattedProfile).subscribe(
      res => {
        console.log('update profile response: ' + JSON.stringify(formattedProfile));
        console.log('server response = ' + res);
        this.showSaveSuccess();
        this.isUploading = false;
        this.updateProfileDone = true;
        this.profileSuccessfullyUpdated = true;
      },
      err => {
        console.log('update profile erreur: ' + JSON.stringify(err));
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
