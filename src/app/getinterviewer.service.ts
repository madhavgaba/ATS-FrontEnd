import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iinterviewer, JobId, InterviewerId } from './interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GetinterviewerService {
  private url: string = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  setInterviewer(param: Iinterviewer): Observable<Iinterviewer> {
    console.log(param);
    return this.http.post<Iinterviewer>(
      `${this.url}/admin/addInterviewer`,
      param
    );
  }

  // getAllInterviewers(): Observable<Iinterviewer[]> {
  //   return this.http.get<Iinterviewer[]>(`${this.url}/admin/allInterviewers`);
  // }

  getAllInterviewers(): Promise<Iinterviewer[]> {
    return new Promise((resolve, reject) => {
      return this.http
        .get<Iinterviewer[]>(`${this.url}/admin/allInterviewers`)
        .subscribe(response => {
          resolve(response);
        });
    });
  }

  getInterviewerById(interviewerId: String): Observable<InterviewerId> {
    return this.http.post<InterviewerId>(
      `${this.url}/interviewer/getInterviewerById`,
      { interviewerId }
    );
  }
}
