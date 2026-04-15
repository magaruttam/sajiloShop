import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateProductPayload, Product } from '../models/product.model';

const API_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  addNewProduct(payload: CreateProductPayload): Observable<Product> {
    return this.http.post<Product>(`${API_URL}/product/create-product`, payload);
  }
}
