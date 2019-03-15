import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { application } from './interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  public uri: string = 'http://localhost:8082/api';
  constructor(private http: HttpClient) {}

  getAllApplications(jobId: string): Observable<application> {
    return this.http.post<application>(`${this.uri}/job/getAllApplications`, {
      jobId
    });
  }
}
