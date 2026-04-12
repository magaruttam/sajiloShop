import { Component, input, output, model } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  image = input('/images/clothes.webp');
  name = input('Product Name');
  subtitle = input('');
  price = input('');
  badge = input('');
  badgeColor = input('bg-[#13696A]');
  discount = input('');
  isFavorite = model(false);

  favoriteToggled = output<void>();

  toggleFavorite(event: MouseEvent) {
    event.stopPropagation();
    this.isFavorite.set(!this.isFavorite());
    this.favoriteToggled.emit();
  }
}
