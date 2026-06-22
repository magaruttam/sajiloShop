import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Product as VendorProduct } from '../models/product.model';
import { Product as CoreProduct, ProductsResponse } from '../../../core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  private sanitizeProductUrls(product: CoreProduct): CoreProduct {
    if (product && product.images) {
      return {
        ...product,
        images: product.images.map(img => ({
          ...img,
          url: img && img.url ? img.url.replace(/\\/g, '') : ''
        }))
      };
    }
    return product;
  }

  private sanitizeProductsResponse(response: ProductsResponse): ProductsResponse {
    if (response && response.allProducts) {
      return {
        ...response,
        allProducts: response.allProducts.map(prod => this.sanitizeProductUrls(prod))
      };
    }
    return response;
  }

  addNewProduct(formData: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/products/create`, formData);
  }

  getProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${environment.apiUrl}/products/products`).pipe(
      map(res => this.sanitizeProductsResponse(res))
    );
  }
   
  getProduct(id: number): Observable<CoreProduct> {
    return this.http.get<CoreProduct>(`${environment.apiUrl}/products/product/${id}`).pipe(
      map(prod => this.sanitizeProductUrls(prod))
    );
  }
}

