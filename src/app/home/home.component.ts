import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  contactClicked() {
    console.log('contact clicked');
    this.router.navigate(['/contact']);
  }

  partenershipClicked() {
    console.log('partenership clicked');
    this.router.navigate(['/partnership']);
  }

  aboutClicked() {
    console.log('about clicked');
    this.router.navigate(['/about']);
  }
}
