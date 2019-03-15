import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { candidateSignUp } from './interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  public uri: string = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  signUp(param: FormData): Observable<candidateSignUp> {
    return this.http.post<candidateSignUp>(
      `${this.uri}/candidate/signUp`,
      param
    );
  }
}
