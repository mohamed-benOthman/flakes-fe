import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profile} from '../../models/profile.model';
import {ProfileService} from '../../services/profile.service';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {SignupService} from '../../services/signup.service';
import {Observable, Subject} from 'rxjs';
import * as Constants from '../../utils/globals';
import {DepartmentsService} from '../../services/departments.service';
import {Department} from '../../models/department.model';

export class PasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
interface expertise  {
  // tslint:disable-next-line:label-position
  label: String;
  checked: Boolean;
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SignupComponent implements OnInit {

  stepOneGroup: FormGroup;
  stepOneGroupPassword: FormGroup;
  stepTwoGroup: FormGroup;
  thirdFormGroup: FormGroup;
  thirdBisFormGroup: FormGroup;

  sloganMaxLength = Constants.SLOGAN_MAX_LENGTH;
  selectedStep = 0;
  passwordMaxLen = Constants.PASSWORD_MAX_LENGTH;
  passwordMinLen = Constants.PASSWORD_MIN_LENGTH;
  usernameMinLen = Constants.USERNAME_MIN_LENGTH;

  selectedCity = null;

  makeupChecked = false;
  microbladingChecked = false;
  manicureChecked = false;
  eyesExtenChecked = false;
  henneChecked = false;
  laceFrontaleChecked = false;
  clearSkinChecked = false;
  tannedSkinChecked = false;
  darkSkinChecked = false;

  expertises = [];
  expertisesManu = [];
  extenseion = [];
  micro = [];
  laceFrontaleExpertise = [];
  henneExpertises = [];
  /*
  movingInFranceOnly = false;
  movingOutsideFrance = false;
*/

  sloganTxt = '';

  isUploading = false;
  showCreationDone = false;
  profileCreatedSuccessfully = false;
  isEmailTaken = false;
  isUsernameTaken = false;

  matcher = new PasswordErrorStateMatcher();

  emailSubject = new Subject<string>();
  usernameSubject = new Subject<string>();

  deptList: Observable<any[]>;
  // selectedDept: Department[];
  movings = '1';

  checked(value, type) {
    console.log(value.checked);
   if (value.checked && type === 'Maquillage') {
    this.signupService.getExpertises().subscribe((res: any) => {
      console.log(res);
      this.expertises = res.filter(data => data .type === type);
      console.log(this.expertises);
    });
   } else {
     console.log(value.checked);
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
  constructor(private _formBuilder: FormBuilder, private profileService: ProfileService,
              private signupService: SignupService, private router: Router,
              private deptService: DepartmentsService) {
    this.signupService.search(this.usernameSubject, false).subscribe(result => {
      this.isUsernameTaken = result === true || result === false ? result : false;
      if (this.isUsernameTaken) {
        this.stepOneGroup.controls['username'].setErrors({'isTaken': true});
      }
    });

    this.signupService.search(this.emailSubject, true).subscribe(result => {
      this.isEmailTaken = result;
      if (this.isEmailTaken) {
        this.stepOneGroup.controls['email'].setErrors({'isTaken': true});
      }
    });
  }

  ngOnInit() {

    this.deptList = this.deptService.getJSON();

    this.stepOneGroup = this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(this.usernameMinLen)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.stepOneGroupPassword = this._formBuilder.group({
      // tslint:disable-next-line:max-line-length
      password: [null, Validators.compose([Validators.required, Validators.minLength(this.passwordMinLen), Validators.maxLength(this.passwordMaxLen)])],
      confirmPassword: ['']
    }, {validator: this.checkPasswords});

    this.stepTwoGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      phone: ['', Validators.pattern('[0-9]+')]
    });

    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : {notSame: true};
  }

  phoneChecker(event: KeyboardEvent) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onCitySelected(city) {
    this.selectedCity = city;
    console.log('selected city = ' + JSON.stringify(this.selectedCity));
  }

  isBusinnessValid() {
    return this.makeupChecked || this.microbladingChecked || this.manicureChecked || this.eyesExtenChecked || this.laceFrontaleExpertise || this.henneExpertises;
  }

  isReadyToPost() {
    return this.stepOneGroup.valid && this.stepOneGroupPassword.valid && this.stepTwoGroup.valid && this.isBusinnessValid();
  }

  getBusinnessList() {
    let biz = '';
    if (this.makeupChecked) {
      biz += '1|';
    }
    if (this.manicureChecked) {
      biz += '2|';
    }
    if (this.microbladingChecked) {
      biz += '3|';
    }
    if (this.eyesExtenChecked) {
      biz += '4|';
    }
    if (this.henneChecked) {
      biz += '5|';
    }
    if (this.laceFrontaleChecked) {
      biz += '6|';
    }

    if (biz !== null && biz.endsWith('|')) {
      biz = biz.substring(0, biz.length - 1);
    }
    return biz;
  }
  expertise = '';
  getExpertiseList2(value, expertiseId: any) {
    if (value.checked) {
  this.expertise += `${expertiseId}|`;
    } else {
      console.log(expertiseId);
      this.expertise=this.expertise.replace(expertiseId + '|', '');
    }


  }
  convertExpertiseList() {
    if (this.expertise.endsWith('|')) {
      this.expertise = this.expertise.substring(0, this.expertise.length - 1);
    }
  }

  getExpertiseList() {
    let expertise = '';
    if (this.clearSkinChecked) {
      expertise += '1|';
    }
    if (this.darkSkinChecked) {
      expertise += '2|';
    }
    if (this.tannedSkinChecked) {
      expertise += '3|';
    }

    if (expertise.endsWith('|')) {
      expertise = expertise.substring(0, expertise.length - 1);
    }
    return expertise;
  }

  formatMovingList() {
    /*let movings = '';
    if (this.movingInFranceOnly) {
      movings += '1|';
    }
    if (this.movingOutsideFrance) {
      movings += '2|';
    }*/

    if (this.movings.endsWith('|')) {
      this.movings = this.movings.substring(0, this.movings.length - 1);
    }
    return this.movings;
  }

  getDeptsList() {
    /*let depts = '';
    this.selectedDept.forEach((dpt) => {
      depts += dpt.code + '|';
    });*/

  }

  submitPost() {
    this.isUploading = true;
    this.formatMovingList();
    this.convertExpertiseList();
    const newProfile = {
      lastname: this.stepTwoGroup.value.lastName,
      firstname: this.stepTwoGroup.value.firstName,
      username: this.stepOneGroup.value.username,
      emailAdress: this.stepOneGroup.value.email,
      phone: this.stepTwoGroup.value.phone,
      street: this.stepTwoGroup.value.street,
      slogan: this.sloganTxt,
      password: this.stepOneGroupPassword.value.password,
      cities: this.selectedCity.code + ';' + this.selectedCity.city,
      business: this.getBusinnessList(),
      expertises: this.expertise,
      movings: this.movings
      // departements: this.getDeptsList()
    };

    console.log('will submit: ' + JSON.stringify(newProfile));

    this.profileService.createProfileObserver(newProfile).subscribe(res => {
        console.log('server response = ' + res);
        this.isUploading = false;
        this.showCreationDone = true;
        this.profileCreatedSuccessfully = true;
      },
      err => {
        console.log('post profil erreur: ' + JSON.stringify(err));
        this.isUploading = false;
        this.showCreationDone = true;
        this.profileCreatedSuccessfully = false;
      }
    );
  }

  quitSignup() {
    console.log('quitSignup');
    this.router.navigate(['/home']);
  }

  onStepChanged(event) {
    this.selectedStep = event.selectedIndex;
  }
}
