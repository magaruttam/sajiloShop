import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsResponse } from '../../../core/models/product.model';

const API_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  addNewProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${API_URL}/product/create-product`, formData);
  }

  getProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${API_URL}/product/get-products`);
  }
}
