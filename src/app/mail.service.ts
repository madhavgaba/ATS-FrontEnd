import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  public uri: string = 'http://localhost:8082/api';
  constructor(private http: HttpClient) {}

  sendEmail(userId) {
    return this.http.post(`${this.uri}/candidate/sendemail`, { userId });
  }

  verifyEmail(token): Observable<{ status: Boolean }> {
    console.error('api call');
    return this.http.get<{ status: Boolean }>(
      `${this.uri}/candidate/matchEmail/${token}`
    );
  }

  sendAccountActivationEmail(credentials: { email: string; password: string }) {
    return this.http.post(
      `${this.uri}/interviewer/sendCredentials`,
      credentials
    );
  }
}
