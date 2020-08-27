import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {ProfileService} from '../services/profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private profileService: ProfileService, private router: Router) { }

  canActivate(): boolean {
    if (this.profileService.isAuthenticated()) {
      console.log('can Activate because authenticated');
      return true;
    } else {
      console.log('cant activate route because NOT authenticated');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
