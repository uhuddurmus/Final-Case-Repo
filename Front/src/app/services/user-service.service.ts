import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://localhost:50000/vk/api/v1';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient) {}

  getUserDataInfo(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        accept: 'text/plain',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get(API_URL + '/Token/getUserInfo', httpOptions);
  }
}
