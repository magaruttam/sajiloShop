import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { ProductsStore } from '../../../../core/store/products.store';

@Component({
  selector: 'app-trending-in-nepal-section',
  imports: [CommonModule, ProductCard],
  templateUrl: './trending-in-nepal-section.html',
  styleUrl: './trending-in-nepal-section.scss',
})
export class TrendingInNepalSection {
  readonly productsStore = inject(ProductsStore);
}
