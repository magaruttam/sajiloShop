import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../../../shared/components/product-card/product-card';

interface WishlistItem {
  id: number;
  image: string;
  name: string;
  subtitle: string;
  price: string;
  description: string;
}

interface RecentItem {
  id: number;
  image: string;
  name: string;
  price: string;
}

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule, RouterLink, ProductCard],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
})
export class Wishlist {
  items: WishlistItem[] = [
    {
      id: 1,
      image: '/images/tea.webp',
      name: 'Hand-Hammered Singing Bowl',
      subtitle: 'Himalayan Clay Studio',
      price: 'NPR 12,500',
      description: 'Traditional artisanal tool for mindfulness, crafted in the heart of Patan.',
    },
    {
      id: 2,
      image: '/images/clothes.webp',
      name: 'Pure Pashmina Scarf',
      subtitle: 'Nepal Craft House',
      price: 'NPR 28,000',
      description: '100% authentic mountain goat cashmere, ethically sourced and hand-loomed.',
    },
    {
      id: 3,
      image: '/images/bottle.webp',
      name: 'Artisan Tea Set',
      subtitle: 'Himalayan Clay Studio',
      price: 'NPR 8,400',
      description: 'Earthenware set for slow-living rituals, finished with a natural matte glaze.',
    },
  ];

  recentItems: RecentItem[] = [
    { id: 1, image: '/images/tree.webp', name: 'Kintsugi Vessel', price: 'NPR 5,200' },
    { id: 2, image: '/images/tea.webp', name: 'Himalayan Cedar Burner', price: 'NPR 3,800' },
    { id: 3, image: '/images/clothes.webp', name: 'Raw Silk Cushion', price: 'NPR 4,500' },
    { id: 4, image: '/images/bottle.webp', name: 'Hand-Poured Soy Candle', price: 'NPR 2,100' },
  ];

  remove(id: number) {
    this.items = this.items.filter((i) => i.id !== id);
  }
}
