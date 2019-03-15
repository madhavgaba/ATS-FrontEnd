import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Icandidate, applicantData, editProfile } from './interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GetcandidatesService {
  public uri: string = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  getAllCandidates(): Observable<Icandidate> {
    return this.http.get<Icandidate>(`${this.uri}/admin/allCandidates`);
  }

  getAllCandidatesWithId(param: String): Observable<applicantData[]> {
    console.log(param);
    return this.http.post<applicantData[]>(
      `${this.uri}/job/candidatesForJobId`,
      { param }
    );
  }

  getCandidateById(candidateId: String): Observable<Icandidate> {
    return this.http.post<Icandidate>(`${this.uri}/admin/findCandidateById`, {
      candidateId
    });
  }

  getCandidateProfile(candidateId) {
    return this.http.get(`${this.uri}/candidate/${candidateId}`);
  }

  getAllDetailsOfCandidate(candidateId): Observable<editProfile> {
    return this.http.post<editProfile>(
      `${this.uri}/candidate/getAllDetailsOfCandidate`,
      {
        candidateId
      }
    );
  }
}
