import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from '../services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public images=[];
  constructor(private router: Router, private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getBaniereImages().subscribe((res:any)=>{
      this.images=res;
      console.log(this.images)
    });

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
