import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableInput, Subject } from 'rxjs';
import { ICategory, IDesignation } from './interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GetCategoryService {
  updateListener = new Subject<any>();

  private url: string = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  getAllCategory(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.url}/genre`);
  }

  getAllDesignation(): Observable<IDesignation> {
    return this.http.get<IDesignation>(`${this.url}/genre`);
  }

  addCategory(param: String): Observable<String> {
    return this.http.post<String>(`${this.url}/admin/addCategories`, param);
  }

  addDesignation(param): Observable<Object> {
    return this.http.post<Object>(`${this.url}/admin/addDesignation`, param);
  }
}
