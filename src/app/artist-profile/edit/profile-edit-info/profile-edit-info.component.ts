import {Component, OnInit, ViewChild} from '@angular/core';
import {Profile} from '../../../models/profile.model';
import {ProfileService} from '../../../services/profile.service';

import * as cloneDeep from 'lodash/cloneDeep';
import {HttpClient} from '@angular/common/http';
import * as Constants from '../../../utils/globals';

@Component({
  selector: 'app-profile-edit-info',
  templateUrl: './profile-edit-info.component.html',
  styleUrls: ['./profile-edit-info.component.css']
})
export class ProfileEditInfoComponent implements OnInit {

  @ViewChild('postalCodeInput') zipCodeInput;
  @ViewChild('sloganArea') sloganArea;


  defaultProfilePhoto = '../../../assets/images/user_icon_placeholder.svg';
  isProfilePhotoValid: boolean; // pour afficher le message d'erreur si la photo de profile exède 1Mo
  sloganMaxLen = Constants.SLOGAN_MAX_LENGTH;
  currentProfileCopy: Profile;

  constructor(private http: HttpClient, private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.currentProfile.subscribe(res => {
      // this.currentProfile = res;
      this.currentProfileCopy = cloneDeep(res);
      if (!this.currentProfileCopy.photo_profile) {
        this.currentProfileCopy.photo_profile = this.defaultProfilePhoto;
      }
    });

    this.isProfilePhotoValid = true; // par défaut on affiche pas le message car la photo est censée etre valide
  }

  zipCodeChecker(event: KeyboardEvent) {
    if (this.zipCodeInput.nativeElement.value.length >= 5) {
      event.preventDefault();
    } else {
      const pattern = /[0-9\+\-\ ]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  }

  phoneChecker(event: KeyboardEvent) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  saveEditProfile() {
    // this.currentProfile = cloneDeep(this.currentProfileCopy);
    this.profileService.updateProfile(cloneDeep(this.currentProfileCopy));
  }

  isValidProfile() {
    const isFirstNameValid = this.currentProfileCopy.firstname && this.currentProfileCopy.firstname.length > 0;
    const isLastNameValid = this.currentProfileCopy.lastname && this.currentProfileCopy.lastname.length > 0;
    const isStreetValid = this.currentProfileCopy.street && this.currentProfileCopy.street.length > 0;
    const isCityValid = this.currentProfileCopy.cities;
    const isExpertiseValid = this.currentProfileCopy.expertises;

    return isFirstNameValid && isLastNameValid && isStreetValid && isCityValid && isExpertiseValid;
  }

  profilePhotoChanged(event) {
    if (event.target.files && event.target.files[0]) {
      console.log('photo size == ' + event.target.files[0].size);

      if (event.target.files[0].size > 1_000_000) {
        console.log('photo is too heavy!');
        this.isProfilePhotoValid = false;
      } else {
        this.isProfilePhotoValid = true;
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (evn: Event) => { // called once readAsDataURL is completed
          // this.currentProfileCopy.profilePhotoUrl = evn.target.result;
          this.currentProfileCopy.photo_profile = reader.result;
        };
      }
    }
  }

  onCitySelected(cities) {
    console.log('onCitySelected: ' + JSON.stringify(cities));
    this.currentProfileCopy.cities = cities;
  }

}
