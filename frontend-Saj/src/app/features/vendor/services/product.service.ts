import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Product } from '../models/product.model';
import { ProductsResponse } from '../../../core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  addNewProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrl}/products/create`, formData);
  }

  getProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${environment.apiUrl}/products/products`);
  }
   
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/products/product/${id}`);
  }
}
