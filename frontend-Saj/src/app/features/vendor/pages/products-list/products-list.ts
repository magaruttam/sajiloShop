import { Component, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { ProductsStore } from '../../../../core/store/products.store';
import { ProductList } from './components/product-list/product-list';

@Component({
  selector: 'app-vendor-products-list',
  imports: [NgClass, ProductList],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
export class VendorProductsList {
  readonly productsStore = inject(ProductsStore);

  activeTab = signal<'all' | 'drafts' | 'archived'>('all');
  currentPage = signal(1);
}
