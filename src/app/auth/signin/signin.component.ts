import {Component, OnInit, ViewChild} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {first} from 'rxjs/operators';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {}

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  @ViewChild('resetemail') resetEmail;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  cantFindUser = false;
  resetPasswordError = false;

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username : [null, [Validators.required, Validators.email]],
      password : [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // TODO: REMOVE THIS - TESTS ONLY
    // @ts-ignore
    this.f.username.value = 'shark@yopmail.com';
    // @ts-ignore
    this.f.password.value = 'password';
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.logout();
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          // this.router.navigate([this.returnUrl]);
          if (data == null) {
            this.cantFindUser = true;
          } /*else {
            this.router.navigate(['profile']);
          }*/
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
 resetPasswordSuccess = false;
  resetPassword(){
    this.resetPasswordSuccess=false;
    this.resetPasswordError=false;
    this.authenticationService.resetPassword(this.resetEmail.nativeElement.value).subscribe(res => {
      this.resetPasswordSuccess = true;
  /*    this.resetEmail.nativeElement.value = '';
      const element: HTMLElement = document.getElementById('dismissResetPassDialog') as HTMLElement;
      element.click();*/
    },
      error => {
      this.resetPasswordError = true;
      });

  }
}
