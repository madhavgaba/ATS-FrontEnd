import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer, ObservableInput } from 'rxjs';
import { IJobs, IApplyJob, JobId, appliedInfo } from './interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GetjobserviceService {
  public url: string = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  getAllJobIds() {
    return this.http.get(`${this.url}/job/allJobIds`);
  }

  getAllJobs(): Observable<IJobs[]> {
    return this.http.get<IJobs[]>(`${this.url}/job/allJobs`);
  }

  addJob(param: IJobs): Observable<IJobs> {
    console.log('api hit', param);
    return this.http.post<IJobs>(`${this.url}/admin/addjob`, param);
  }

  applyJob(param): Observable<IApplyJob> {
    return this.http.post<IApplyJob>(`${this.url}/job/applyJob`, param);
  }

  getJobForId(jobId: String): Observable<JobId> {
    return this.http.post<JobId>(`${this.url}/job/getJobForId`, { jobId });
  }

  getMyAppliedJobs(candidateId): Observable<{ status: string; jobId: string }> {
    return this.http.post<{ status: string; jobId: string }>(
      `${this.url}/candidate/getAllAppliedJobs`,
      {
        candidateId
      }
    );
  }

  getAllScheduledJobs(data): Observable<{ date: string; time: string }> {
    return this.http.post<{ date: string; time: string }>(
      `${this.url}/schedule/getAllScheduledJobs`,
      data
    );
  }

  closeApplication(data): Observable<appliedInfo> {
    return this.http.post<appliedInfo>(this.url + '/job/close', data);
  }

  newApplications() {
    return;
  }
}
