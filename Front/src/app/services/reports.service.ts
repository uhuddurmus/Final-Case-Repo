import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://localhost:50000/vk/api/v1/';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private http: HttpClient) {}

  getReport(time: number): Observable<any> {
    const headers = new HttpHeaders({ accept: 'text/plain' });

    return this.http.get(API_URL + `Token/getReport?time=${time}`, {
      headers,
      responseType: 'text',
    });
  }
}
