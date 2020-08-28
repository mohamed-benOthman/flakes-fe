import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            console.log('JWT Interceptor, cloning request - token = ' + currentUser.token);
            request = request.clone({
                setHeaders: { 
                    authorization: `Token ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}
