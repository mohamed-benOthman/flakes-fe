import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Profile} from '../../../models/profile.model';
import {ProfileService} from '../../../services/profile.service';

import * as cloneDeep from 'lodash/cloneDeep';
import * as Constants from '../../../utils/globals';
import {MenuItem} from 'primeng/api';
import {SignupService} from '../../../services/signup.service';
import {areAllEquivalent} from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-profile-edit-info',
  templateUrl: './profile-edit-info.component.html',
  styleUrls: ['./profile-edit-info.component.css']
})
export class ProfileEditInfoComponent implements OnInit {

  @ViewChild('postalCodeInput') zipCodeInput;
  @ViewChild('sloganArea') sloganArea;

  @Output() uploadingEvent = new EventEmitter<any>();

  sloganMaxLen = Constants.SLOGAN_MAX_LENGTH;
  defaultProfilePhoto = Constants.defaultProfilePhoto;
  currentProfileCopy: Profile;
  isProfilePhotoValid: boolean; // pour afficher le message d'erreur si la photo de profile exède 1Mo
  profilePhotoFile: File;
  splitButtonActions: MenuItem[];
  expertises = [];
  expertisesManu = [];
  extenseion = [];
  micro = [];
  laceFrontaleExpertise = [];
  henneExpertises = [];
  constructor(private profileService: ProfileService,
              private signupService: SignupService) {}


  ngOnInit() {
    this.profileService.currentDisplayedProfile.subscribe(res => {
      // this.currentDisplayedProfile = res;
      this.currentProfileCopy = cloneDeep(res);
      console.log(this.currentProfileCopy.movings);
      console.log(this.currentProfileCopy);
      if (!this.currentProfileCopy.photo_profile) {
        this.currentProfileCopy.photo_profile = this.defaultProfilePhoto;
      }
    });

    this.isProfilePhotoValid = true; // par défaut on affiche pas le message car la photo est censée etre valide

    this.splitButtonActions = [
      {label: 'Supprimer la photo', icon: 'fa fa-close', command: () => {
          this.profilePhotoFile = null;
          this.currentProfileCopy.photo_profile = this.defaultProfilePhoto;
        }}
    ];
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
  radioChange(e){
    this.currentProfileCopy.movings=e.value;
  }

  phoneChecker(event: KeyboardEvent) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  saveEditProfile() {
    if (this.profilePhotoFile) {
      console.log('we are uploading the photo');
      this.uploadProfilePhoto();
    } else { // --- si pas de photo de profile on continue sinon upload + mise à jour du profile
      console.log('we are NOT uploading the photo');
      this.profileService.updateProfile(cloneDeep(this.currentProfileCopy));
    }
  }

  checkOthers(type) {

      const lengthExpertise = this.currentProfileCopy.expertises.filter(item => item.type === type && item.checked === true  ).length;

      if (lengthExpertise > 0) {
      return true;
      } else {return false; }

  }
  checkuncheck(event, id, type) {
    if (event.checked) {
      this.currentProfileCopy.business[id].checked = true;
    } else {
      if (this.checkOthers(type) === false) {
        this.currentProfileCopy.business[id].checked = false;
      }
  }
  }
  check(event, business) {

    switch (business.type) {
      case 'Maquillage':
        this.checkuncheck(event, 0, 'Maquillage' );
        break;
      case 'Manucure':
        this.checkuncheck(event, 1, 'Manucure');
        break;
      case 'MicroBlading' :
        this.checkuncheck(event, 2, 'MicroBlading' );
        break;
      case 'extension':
        this.checkuncheck(event, 3, 'extension' );
        break;
      case 'Henné' :
        this.checkuncheck(event, 4, 'Henné' );
        break;
      case 'Lace Frontale':
        this.checkuncheck(event, 5, 'Lace Frontale' );
        break;
      default:

    }
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
        this.profilePhotoFile = event.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (evn: Event) => { // called once readAsDataURL is completed
          this.currentProfileCopy.photo_profile = reader.result as string;
        };
      }
    }
  }

  uploadProfilePhoto() {
    console.log('uploadProfilePhoto');
    this.uploadingEvent.emit(true);
    const uploadData = new FormData();
    uploadData.append(Constants.uploadPhotoParam, this.profilePhotoFile, this.profilePhotoFile.name);

    this.profileService.postPhoto(uploadData).subscribe(results => {
      console.log('response = ' + JSON.stringify(results));
      this.currentProfileCopy.photo_profile = results[0];
      this.uploadingEvent.emit(false);
    }, error1 => {
      console.log('response error = ' + JSON.stringify(error1));
      this.uploadingEvent.emit(false);
    });
  }

  onCitySelected(cities) {
    console.log('onCitySelected: ' + JSON.stringify(cities));
    this.currentProfileCopy.cities = cities;
  }

  checked(value, type) {
    console.log(value.checked);
    if (value.checked && type === 'Maquillage') {
      this.signupService.getExpertises().subscribe((res: any) => {
        console.log(res);
        this.expertises = res.filter(data => data .type === type);
        this.currentProfileCopy.expertises.push(this.expertises);
        console.log(this.currentProfileCopy.expertises);
        console.log(this.expertises);
      });
    } else {
      console.log(value.checked);
      // this.currentProfileCopy= this.currentProfileCopy;
      this.expertises = [];

      console.log(this.expertises);
    }
  }
  checkedmanu(value, type) {
    if (value.checked && type === 'Manucure') {
      this.signupService.getExpertises().subscribe((res: any) => {
        console.log(res);
        this.expertisesManu = res.filter(data => data .type === type);
        console.log(this.expertisesManu);
      });

    } else {

      this.expertisesManu = [];
      console.log(this.expertisesManu);
    }
  }

  checkedmicro(value, type) {
    if (value.checked && type === 'MicroBlading') {
      this.signupService.getExpertises().subscribe((res: any) => {
        console.log(res);
        this.micro = res.filter(data => data .type === type);
        console.log(this.micro);
      });

    } else {

      this.micro = [];
      console.log(this.micro);
    }
  }
  checkedext(value, type) {
    if (value.checked && type === 'extension') {
      this.signupService.getExpertises().subscribe((res: any) => {
        console.log(res);
        this.extenseion = res.filter(data => data .type === type);
        console.log(this.extenseion);
      });

    } else {

      this.extenseion = [];
      console.log(this.extenseion);
    }

  }
  checkedHenne(value, type) {
    if (value.checked && type === 'Henné') {
      this.signupService.getExpertises().subscribe((res: any) => {
        console.log(res);
        this.henneExpertises = res.filter(data => data .type === type);

      });

    } else {

      this.henneExpertises = [];
    }

  }
  checkedLaceFrontale(value, type) {
    if (value.checked && type === 'Lace Frontale') {
      this.signupService.getExpertises().subscribe((res: any) => {
        console.log(res);
        this.laceFrontaleExpertise = res.filter(data => data .type === type);
      });

    } else {

      this.laceFrontaleExpertise = [];
    }

  }

}
