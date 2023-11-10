import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://localhost:50000/vk/api/v1';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient) {}

  getUserDataInfo(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.get(API_URL + '/Token/getUserInfo', httpOptions);
  }
  getUsers(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.get(API_URL + '/Users', httpOptions);
  }
  getUserWithId(userId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.get(API_URL + `/Users/${userId}`, httpOptions);
  }

  updateProfit(userId: number, newProfit: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.put(
      API_URL + `/Users/updateProfit?id=${userId}&profit=${newProfit}`,
      httpOptions
    );
  }
}
