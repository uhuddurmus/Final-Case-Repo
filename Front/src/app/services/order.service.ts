import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'https://localhost:50000/vk/api/v1/';

  constructor(private http: HttpClient) {}

  getOrdersByToken(time: number): Observable<any> {
    const url = `${this.baseUrl}Token/GetOrdersByToken?time=${time}`;

    // Eğer kullanıcı kimliği gerekiyorsa, Authorization başlığını ekleyin.
    const headers = new HttpHeaders().set('accept', 'text/plain');
    return this.http.get(url, { headers });
  }
  deleteOrder(orderId: number): Observable<any> {
    const url = `${this.baseUrl}Orderes/${orderId}`;

    // Eğer kullanıcı kimliği gerekiyorsa, Authorization başlığını ekleyin.
    const headers = new HttpHeaders().set('accept', 'text/plain');
    return this.http.delete(url, { headers });
  }
  postOrder(orderData: any): Observable<any> {
    const url = `${this.baseUrl}Orderes`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'text/plain',
    });

    return this.http.post(url, orderData, { headers });
  }
}
