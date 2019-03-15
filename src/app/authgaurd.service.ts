import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

let decoder = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthgaurdService implements CanActivate {
  constructor(private route: Router) {}
  canActivate(): boolean {
    let token = localStorage.getItem('token');
    if (token) {
      let decode = decoder.decodeToken(token);
      switch (decode.role) {
        case 'interviewee': {
          this.route.navigate(['/candidate/allJobs']);
          return true;
        }
        case 'interviewer': {
          this.route.navigate(['/interviewer']);
          return true;
        }
        case 'admin': {
          this.route.navigate(['/admin/addCategory']);
          return false;
        }
        default:
          return false;
      }
    }
    return true;
  }
}
