import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public uri: string = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  updateProfile(profile): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.uri}/candidate/updateProfile`,
      {
        profile
      }
    );
  }
}
