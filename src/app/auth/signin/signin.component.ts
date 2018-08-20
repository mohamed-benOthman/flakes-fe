import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  email = '';
  password = '';

  constructor(private fb: FormBuilder) {
    this.signinForm = fb.group({
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
    });
  }

  ngOnInit() {
  }

  addPost(post) {
    this.email = post.value.email;
    this.password = post.value.password;
    console.log('email = ' + this.email);
  }
}
