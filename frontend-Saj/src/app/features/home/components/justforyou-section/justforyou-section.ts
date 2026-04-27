import { Component, inject } from '@angular/core';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { RouterModule } from '@angular/router';
import { ProductsStore } from '../../../../core/store/products.store';

@Component({
  selector: 'app-justforyou-section',
  imports: [ProductCard, RouterModule],
  templateUrl: './justforyou-section.html',
  styleUrl: './justforyou-section.scss',
})
export class JustforyouSection {
  readonly productsStore = inject(ProductsStore);
}
