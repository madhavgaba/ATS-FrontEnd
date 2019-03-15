import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { login } from './interface/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public uri: string = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  userLogin(param): Observable<login> {
    return this.http.post<login>(`${this.uri}/auth/login`, param);
  }

  loginWithToken() {
    return this.http.get(`${this.uri}/auth/login`, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
}
