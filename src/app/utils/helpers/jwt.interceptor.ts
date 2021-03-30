import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {LOGGED_IN_KEY} from '../globals';
import {AuthenticationService} from '../../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = JSON.parse(localStorage.getItem(LOGGED_IN_KEY));

    if (currentUser && currentUser.token) {
      const helper = new JwtHelperService();

      const decodedToken = helper.decodeToken(currentUser.token);
      const expirationDate = helper.getTokenExpirationDate(currentUser.token);
      const isExpired = helper.isTokenExpired(currentUser.token);

      console.log('token expiration date: ' + expirationDate);
      console.log('token isExpired: ' + isExpired);
      console.log('token decodedToken: ' + JSON.stringify(decodedToken));
      console.log('JWT Interceptor, cloning request - token = ' + currentUser.token);

      if (isExpired) {
        this.authService.logout();
      }
      else {
        request = request.clone({
          setHeaders: {
            authorization: `Token ${currentUser.token}`
          }
        });
      }
    }

    return next.handle(request);
  }
}
