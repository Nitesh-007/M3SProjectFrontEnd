import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../Auth/auth-service.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth:AuthServiceService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add authorization header with jwt token if available
      const userJson = localStorage.getItem('currentUser');
      let currentUser = userJson !== null ? JSON.parse(userJson) : null
      if (currentUser && currentUser.token) {
          request = request.clone({
              setHeaders: { 
                  Authorization: `Bearer ${currentUser.token}`
              }
          });
      }

      return next.handle(request);
    }
  }
