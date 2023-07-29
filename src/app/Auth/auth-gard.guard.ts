import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import {LandingPages} from '../helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGardGuard implements CanActivate {


  constructor(private auth:AuthServiceService,private router:Router){
  }
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // const currentUser = this.auth.currentUser;
    const userJson = localStorage.getItem('currentUser');
      // let data = userJson !== null ? JSON.parse(userJson) : new User();
        // this.currentUserSubject = new BehaviorSubject<User>(data );
        const currentUser = userJson !== null ? JSON.parse(userJson) : null
    if (currentUser) {
        // check if route is restricted by role
          if (route.data.role && route.data.role.indexOf(currentUser.employeeType) === -1) {
            // role not authorised so redirect to home page
            let routeTo = LandingPages[currentUser.employeeType]
            this.router.navigate([routeTo]);
            return false;
        }

        // authorised so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    // this.router.navigate(['/login']);
    return false;
}

  }
