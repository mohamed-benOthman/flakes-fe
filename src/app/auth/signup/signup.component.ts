import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {PasswordValidation} from '../../utils/password.validation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  @ViewChild('card') pCard;

  stepOneGroup: FormGroup;
  stepTwoGroup: FormGroup;
  thirdFormGroup: FormGroup;
  sloganMaxLength = 500;
  selectedStep = 0;
  passwordMaxLen = 15;
  passwordMinLen = 6;
  usernameMinLen = 4;

  selectedCity = null;

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.stepOneGroup = this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(this.usernameMinLen)]],
      email: ['', [Validators.required, Validators.email]],
      password: [null, Validators.compose([Validators.required, Validators.minLength(this.passwordMinLen), Validators.maxLength(this.passwordMaxLen)])],
      confirmPassword: [null, Validators.compose([Validators.required, Validators.minLength(this.passwordMinLen), Validators.maxLength(this.passwordMaxLen)])],
    }, {validator: PasswordValidation.matchPassword});

    this.stepTwoGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
    });

    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  phoneChecker(event: KeyboardEvent) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  test(event) {
    console.log('selected index: ' + event.selectedIndex);
    this.selectedStep = event.selectedIndex;
  }

  onCitySelected(city) {
    this.selectedCity = city;
    console.log('selected city = ' + JSON.stringify(this.selectedCity));
  }
}
