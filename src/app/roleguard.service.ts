import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthserviceService } from './authservice.service';
import { decode } from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class RoleguardService implements CanActivate {
  constructor(public auth: AuthserviceService, public route: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    const token = localStorage.getItem('token');
    console.log(token, expectedRole);
    const tokenPayload = helper.decodeToken(token);

    if (!this.auth.isAuthenticated() || tokenPayload.role !== expectedRole) {
      this.route.navigate(['/login']);
      return false;
    } else if (tokenPayload.role === 'interviewee' && !tokenPayload.mobile) {
      this.route.navigate(['/otp']);
      return false;
    }
    return true;
  }
}
