import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidatehistoryService {
  public uri: string = 'http://localhost:8082/api';
  constructor(private http: HttpClient) {}

  getHistory(data) {
    return this.http.get(data);
  }
}
