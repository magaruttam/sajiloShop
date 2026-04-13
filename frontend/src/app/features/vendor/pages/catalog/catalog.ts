import { Component, inject, signal } from '@angular/core';
import { NgClass, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

export interface CatalogProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  categoryColor: string;
  price: number;
  stock: number;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  image: string;
}

@Component({
  selector: 'app-vendor-catalog',
  imports: [NgClass, DecimalPipe],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class VendorCatalog {
  private router = inject(Router);

  activeTab = signal<'all' | 'drafts' | 'archived'>('all');
  currentPage = signal(1);

  readonly products: CatalogProduct[] = [
    {
      id: '1', name: 'Zenith Runner X1', sku: 'ZRX1-092',
      category: 'Footwear', categoryColor: 'bg-[#EBF4FF] text-[#1A365D]',
      price: 8500, stock: 42, stockStatus: 'in-stock', image: '/images/product-image.png',
    },
    {
      id: '2', name: 'Nordic Chronograph', sku: 'NC22-W34',
      category: 'Accessories', categoryColor: 'bg-[#F3E8FF] text-[#6B21A8]',
      price: 24500, stock: 3, stockStatus: 'low-stock', image: '/images/bottle.webp',
    },
    {
      id: '3', name: 'Himalayan Bass Pro', sku: 'HBP-X500',
      category: 'Electronics', categoryColor: 'bg-[#FFF7ED] text-[#C2410C]',
      price: 15900, stock: 156, stockStatus: 'in-stock', image: '/images/tea.webp',
    },
    {
      id: '4', name: 'Dhaka Shawl', sku: 'DS-001',
      category: 'Clothing', categoryColor: 'bg-[#F0FDF4] text-[#16A34A]',
      price: 3200, stock: 0, stockStatus: 'out-of-stock', image: '/images/clothes.webp',
    },
  ];

  readonly stockLabels: Record<CatalogProduct['stockStatus'], string> = {
    'in-stock': 'In Stock',
    'low-stock': 'Low Stock',
    'out-of-stock': 'Out of Stock',
  };

  readonly stockColors: Record<CatalogProduct['stockStatus'], string> = {
    'in-stock': 'text-[#16A34A]',
    'low-stock': 'text-red-500',
    'out-of-stock': 'text-[#43474E]',
  };

  readonly dotColors: Record<CatalogProduct['stockStatus'], string> = {
    'in-stock': 'bg-[#16A34A]',
    'low-stock': 'bg-red-500',
    'out-of-stock': 'bg-[#C4C6CF]',
  };

  goToDetail(id: string) {
    this.router.navigate(['/vendor/catalog', id]);
  }
}
