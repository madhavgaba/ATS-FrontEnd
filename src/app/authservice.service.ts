import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginInterface } from './interface/interfaces';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { genOtp, otpData } from './interface/interfaces';
import { Observable } from 'rxjs';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  public uri: string = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  userLogin(param) {
    return this.http.post<loginInterface>(`${this.uri}/auth/login`, param).pipe(
      map(data => {
        if (!data.token) {
          return data;
        }
        let token = '' + data['token'];
        const decode = helper.decodeToken(token);
        console.log(decode);
        if (token) {
          localStorage.setItem('token', token.toString());
        }
        console.log(decode);
        return decode;
      })
    );
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !helper.isTokenExpired(token);
  }

  public userInfo() {
    const token = localStorage.getItem('token');
    const decode = helper.decodeToken(token);
    return decode;
  }

  sendOtp(data: genOtp): Observable<otpData> {
    return this.http.post<otpData>(`${this.uri}/candidate/otpgen/`, data);
  }
  matchOtp(data: string): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(
      `${this.uri}/candidate/otpverify/${data}`
    );
  }
}
