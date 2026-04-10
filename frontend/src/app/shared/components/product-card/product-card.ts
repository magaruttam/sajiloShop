import { Component, input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  image = input('/images/clothes.webp');
  name = input('Product Name');
  subtitle = input('');
  price = input('');
  discount = input('');
}
