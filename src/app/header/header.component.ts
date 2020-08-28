import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../services/profile.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private profileService: ProfileService, private authService: AuthenticationService) { }

  ngOnInit() {
  }

}
