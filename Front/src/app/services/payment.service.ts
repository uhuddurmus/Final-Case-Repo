import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'https://localhost:50000/vk/api/v1/';

  constructor(private http: HttpClient) {}

  makePayment(credit: any, isPayment: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const options = { headers };

    return this.http.post(
      this.apiUrl + `Payment/Eft?credit=${credit}&isPayment=${isPayment}`,
      options
    );
  }
}
