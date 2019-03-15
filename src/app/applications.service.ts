import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { applicantData, appliedInfo, userInfo } from './interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  constructor(private http: HttpClient) {}

  public uri: string = 'http://localhost:8082/api';

  getAllApplicationsWithId(): Observable<String> {
    return this.http.get<String>(`${this.uri}/admin/getAllCandidatesWithId`);
  }

  statusChanged(data): Observable<userInfo> {
    console.log(data);
    return this.http.post<userInfo>(
      `${this.uri}/admin/changeScheduleStatus`,
      data
    );
  }
}
