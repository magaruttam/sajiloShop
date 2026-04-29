import { Component, inject, input } from '@angular/core';
import { NgClass, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../../../../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [NgClass, DecimalPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  private router = inject(Router);

  products = input.required<Product[]>();
  isLoading = input<boolean>(false);

  stockStatus(stock: number): 'in-stock' | 'low-stock' | 'out-of-stock' {
    if (stock === 0) return 'out-of-stock';
    if (stock <= 5) return 'low-stock';
    return 'in-stock';
  }

  readonly stockLabels = {
    'in-stock': 'In Stock',
    'low-stock': 'Low Stock',
    'out-of-stock': 'Out of Stock',
  };

  readonly stockColors = {
    'in-stock': 'text-[#16A34A]',
    'low-stock': 'text-red-500',
    'out-of-stock': 'text-[#43474E]',
  };

  readonly dotColors = {
    'in-stock': 'bg-[#16A34A]',
    'low-stock': 'bg-red-500',
    'out-of-stock': 'bg-[#C4C6CF]',
  };

  goToDetail(id: number) {
    this.router.navigate(['/vendor/products-list', id]);
  }

  onDeleteProduct(event: Event, productId: number) {
    event.stopPropagation();
    // TODO: Implement delete functionality
    console.log('Delete product:', productId);
  }
}