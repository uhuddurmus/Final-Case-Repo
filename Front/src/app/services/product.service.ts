import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://localhost:50000/vk/api/v1/';

  constructor(private http: HttpClient) {}

  getProductsByParameter(
    productBrand: any,
    productType: any,
    gain: string,
    tax: string
  ): Observable<any> {
    const url = `${this.baseUrl}Token/GetProductsByParameter?ProductBrand=${productBrand}&ProductType=${productType}&Gain=${gain}&Tax=${tax}`;

    // Eğer kullanıcı kimliği gerekiyorsa, Authorization başlığını ekleyin.
    const headers = new HttpHeaders().set('accept', 'text/plain');
    return this.http.get(url, { headers });
  }
  addProduct(productData: any): Observable<any> {
    const url = `${this.baseUrl}Products`;

    const headers = new HttpHeaders()
      .set('accept', 'text/plain')
      .set('Content-Type', 'application/json');

    return this.http.post(url, productData, { headers });
  }
  getProductById(id: any, gain: any, tax: any): Observable<any> {
    const url = `${this.baseUrl}Token/GetProduct?id=${id}&gain=${gain}&tax=${tax}`;

    // Eğer kullanıcı kimliği gerekiyorsa, Authorization başlığını ekleyin.
    const headers = new HttpHeaders().set('accept', 'text/plain');
    return this.http.get(url, { headers });
  }

  updateProductStock(id: any, piece: any): Observable<any> {
    const url = `${this.baseUrl}Orderes/UpdateProductPiece?id=${id}&piece=${piece}`;

    // Eğer kullanıcı kimliği gerekiyorsa, Authorization başlığını ekleyin.
    const headers = new HttpHeaders().set('accept', 'text/plain');
    return this.http.get(url, { headers });
  }
}
