import { Component, inject, signal } from '@angular/core';
import { NgClass, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ProductsStore } from '../../../../core/store/products.store';

@Component({
  selector: 'app-vendor-catalog',
  imports: [NgClass, DecimalPipe],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class VendorCatalog {
  private router = inject(Router);
  readonly productsStore = inject(ProductsStore);

  activeTab = signal<'all' | 'drafts' | 'archived'>('all');
  currentPage = signal(1);

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
    this.router.navigate(['/vendor/catalog', id]);
  }
}
