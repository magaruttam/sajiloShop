import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCard } from '../../../../shared/components/product-card/product-card';

export interface SearchProduct {
  id: number;
  image: string;
  badge?: string;
  badgeColor?: string;
  subtitle: string;
  name: string;
  price: string;
  isFavorite: boolean;
}

@Component({
  selector: 'app-search-results',
  imports: [CommonModule, FormsModule, ProductCard],
  templateUrl: './search-results.html',
  styleUrl: './search-results.scss',
})
export class SearchResults {
  query = 'Pashmina';
  sortBy = 'Newest Arrivals';
  currentPage = 1;
  totalPages = 12;

  sortOptions = ['Newest Arrivals', 'Price: Low to High', 'Price: High to Low', 'Most Popular'];

  categories = [
    { label: 'All Pashmina', count: 124, active: true },
    { label: 'Shawls', count: 0, active: false },
    { label: 'Scarves', count: 0, active: false },
    { label: 'Throws', count: 0, active: false },
  ];

  colors = [
    { hex: '#D4B896', active: false },
    { hex: '#2D5A4E', active: false },
    { hex: '#8B1A1A', active: false },
    { hex: '#2D2D6B', active: false },
    { hex: '#F5F0E8', active: false },
  ];

  materials = [
    { label: '100% Chyangra Cashmere', checked: true },
    { label: 'Silk Blend Pashmina', checked: false },
    { label: 'Hand-spun Wool', checked: false },
  ];

  minRating = 4;

  priceMin = 1000;
  priceMax = 50000;

  products: SearchProduct[] = [
    { id: 1, image: '/images/clothes.webp', subtitle: 'CHYANORA CASHMERE', name: 'Classic Ivory Heritage Shawl', price: 'NPR 18,500', isFavorite: false },
    { id: 2, image: '/images/clothes.webp', badge: 'ARTISAN CHOICE', badgeColor: 'bg-[#13696A]', subtitle: 'NATURAL DYED', name: 'Deep Teal Artisan Scarf', price: 'NPR 12,200', isFavorite: false },
    { id: 3, image: '/images/clothes.webp', subtitle: 'PREMIUM BLEND', name: 'Slate Grey Everyday Scarf', price: 'NPR 8,900', isFavorite: false },
    { id: 4, image: '/images/clothes.webp', subtitle: 'TRADITIONAL WEAVE', name: 'Crimson Mandala Border Shawl', price: 'NPR 24,500', isFavorite: false },
    { id: 5, image: '/images/clothes.webp', subtitle: "MEN'S COLLECTION", name: 'Charcoal Executive Scarf', price: 'NPR 11,000', isFavorite: false },
    { id: 6, image: '/images/clothes.webp', subtitle: "WOMEN'S PREMIUM", name: 'Dusty Rose Evening Wrap', price: 'NPR 16,800', isFavorite: false },
    { id: 7, image: '/images/clothes.webp', subtitle: 'REVERSIBLE', name: 'Royal Blue Reversible Shawl', price: 'NPR 22,000', isFavorite: false },
    { id: 8, image: '/images/clothes.webp', badge: 'LIMITED EDITION', badgeColor: 'bg-[#B8860B]', subtitle: 'CHYANGRA CASHMERE', name: 'Sage Green Pure Cashmere', price: 'NPR 19,500', isFavorite: false },
  ];

  get pages(): (number | string)[] {
    return [1, 2, 3, '...', 12];
  }

  selectCategory(index: number) {
    this.categories = this.categories.map((c, i) => ({ ...c, active: i === index }));
  }

  toggleColor(index: number) {
    this.colors[index].active = !this.colors[index].active;
  }

  goToPage(page: number | string) {
    if (typeof page === 'number') this.currentPage = page;
  }
}
