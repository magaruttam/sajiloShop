import { Component } from '@angular/core';
import { ProductCard } from "../../../../shared/components/product-card/product-card";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-justforyou-section',
  imports: [ProductCard,RouterModule],
  templateUrl: './justforyou-section.html',
  styleUrl: './justforyou-section.scss',
})
export class JustforyouSection {
  pairings = [
    { name: 'Handwoven Bamboo Tray', subtitle: 'Natural sustainable weave', price: 'NPR 2,200', image: '/images/clothes.webp' },
    { name: 'Stone Washed Linen', subtitle: '', price: 'NPR 1,200', image: '/images/clothes.webp' },
    { name: 'Himalayan Cedarwood', subtitle: '', price: 'NPR 1,850', image: '/images/clothes.webp' },
  ];

}
