import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private apiUrl = 'https://localhost:50000/vk/api/v1'; // API adresinizi buraya ekleyin

  constructor(private http: HttpClient) {}

  // Adres bilgilerini almak için GET isteği
  getAddressInfo(): Observable<string> {
    const url = `${this.apiUrl}/Token/getAdressInfo`;
    const headers = new HttpHeaders().set('Accept', 'text/plain');

    return this.http.get<string>(url, { headers });
  }

  // Yeni bir adres eklemek için POST isteği
  addAddress(addressData: any): Observable<string> {
    const url = `${this.apiUrl}/Addreses`;
    const headers = new HttpHeaders()
      .set('Accept', 'text/plain')
      .set('Content-Type', 'application/json');

    return this.http.post<string>(url, addressData, { headers });
  }
}
