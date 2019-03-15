import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISchedule } from './interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  public uri: string = 'http://localhost:8082/api';

  setSchedule(param: Object): Observable<Object> {
    console.log(param);
    return this.http.post<Object>(`${this.uri}/admin/schedule`, param);
  }

  getAllSchedules(): Observable<ISchedule[]> {
    return this.http.get<ISchedule[]>(`${this.uri}/admin/track`);
  }

  getAllSchedulesForInterviewer(interviewerId): Observable<ISchedule[]> {
    return this.http.post<ISchedule[]>(
      `${this.uri}/interviewer/getAllSchedulesForInterviewer`,
      { interviewerId }
    );
  }

  rejectInterview(param) {
    return this.http.get(param);
  }

  submitResponse(data) {
    return this.http.post(`${this.uri}/schedule/submitResponse`, data);
  }
}
