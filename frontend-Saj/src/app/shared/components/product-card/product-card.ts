import { Component, input, output, model, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  private router = inject(Router);
  
  image = input('/images/clothes.webp');
  name = input('Product Name');
  subtitle = input('');
  price = input('');
  badge = input('');
  badgeColor = input('bg-[#13696A]');
  discount = input('');
  productId = input<number | undefined>();
  isFavorite = model(false);

  // Sanitized image URL for display
  displayImage = computed(() => {
    const url = this.image();
    return url ? url.replace(/\\/g, '') : '/images/product-image.png';
  });

  favoriteToggled = output<void>();

  toggleFavorite(event: MouseEvent) {
    event.stopPropagation();
    this.isFavorite.set(!this.isFavorite());
    this.favoriteToggled.emit();
  }

  navigateToProduct(event: MouseEvent) {
    if (this.productId()) {
      this.router.navigate(['/product', this.productId()]);
    }
  }
}
