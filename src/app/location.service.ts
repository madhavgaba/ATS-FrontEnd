import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private uri: string = 'http://localhost:8082/api';
  constructor(private http: HttpClient) {}

  getAllLocations(): Observable<{ location: string }> {
    return this.http.get<{ location: string }>(
      `${this.uri}/admin/getAllLocations`
    );
  }

  addLocation(location) {
    return this.http.post(`${this.uri}/admin/addLocation`, location);
  }
}
