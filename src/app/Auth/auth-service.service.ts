import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/userRole.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  baseUrl: string =environment.URL;

  public currentUser: User;
  CookieService: any;

    constructor(private http: HttpClient, private router:Router) {
      const userJson = localStorage.getItem('currentUser');
        this.currentUser = userJson !== null ? JSON.parse(userJson) : null
    }

   

    login(username: string, password: string) {
      let payload = {
        email: username,
        
        password: btoa(password)
      
        
      };
      let url ='user/login';
      let  reqUrl =`${this.baseUrl}${url}`;
        return this.http.post<any>(reqUrl, payload)
            .pipe(map(user => {
              localStorage.setItem('currentUser', JSON.stringify(user.token));
                // login successful if there's a jwt token in the response
                // if (user && user.message.token) {
                //     // store user details and jwt token in local storage to keep user logged in between page refreshes
                //     localStorage.setItem('currentUser', JSON.stringify(user.message));
                // }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.clear();
        this.router.navigate(['/login']);
         
        
        
    }
}
