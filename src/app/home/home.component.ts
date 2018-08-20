import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  contactClicked() {
    console.log('contact clicked');
  }

  partenershipClicked() {
    console.log('partenership clicked');
  }

  aboutClicked() {
    console.log('about clicked');
  }
}
