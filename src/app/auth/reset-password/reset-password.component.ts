import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../services/profile.service';
import {SignupService} from '../../services/signup.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token = '';
  success = false;
  resetPasswordSuccess = false;
  resetPasswordFailed = false;
  failed = false;
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private signupService: SignupService) { }
  resetPasswordForm: FormGroup;
  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.success = false;
    this.failed = false;
    this.signupService.checkResetToken(this.token).subscribe((res: any) => {
        this.success = true;
      },
      error => {
        this.failed = true;
      });
    this.resetPasswordForm = this.formBuilder.group({
      password1 :  [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
      password2 :  [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
    });

  }

  onSubmit() {
    this.resetPasswordSuccess = false;
    this.resetPasswordFailed = false;
   this.signupService.resetPassword(this.token, this.resetPasswordForm.value.password1).subscribe((res: any) => {
      this.resetPasswordSuccess = true;
      setTimeout(() => {
        this.router.navigateByUrl('/home');
      }, 3000);
   },
   err => {
        this.resetPasswordFailed = true;
   }  );

    }
  get f() { return this.resetPasswordForm.controls; }

}
