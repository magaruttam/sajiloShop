import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../../../shared/components/product-card/product-card';

@Component({
  selector: 'app-trending-in-nepal-section',
  imports: [CommonModule, ProductCard],
  templateUrl: './trending-in-nepal-section.html',
  styleUrl: './trending-in-nepal-section.scss',
})
export class TrendingInNepalSection {
  trendingProducts = [
    { id: 1, name: 'Organic Cotton Script Tee', price: 'NPR 1,850', image: '/images/tree.webp', badge: 'NEW', subtitle: 'APPAREL' },
    { id: 2, name: 'Hammered Copper Vessel', price: 'NPR 2,400', image: '/images/bottle.webp', badge: '', subtitle: 'HOME DECOR' },
    { id: 3, name: 'Brass Panas Pair', price: 'NPR 4,500', image: '/images/tea.webp', badge: 'TRENDING', subtitle: 'LIGHTING' },
    { id: 4, name: 'Hand-Woven Pashmina', price: 'NPR 6,200', image: '/images/clothes.webp', badge: '', subtitle: 'FASHION' },
    { id: 5, name: 'Himalayan Cedar Incense', price: 'NPR 980', image: '/images/tree.webp', badge: 'BESTSELLER', subtitle: 'WELLNESS' },
    { id: 6, name: 'Stone Mortar & Pestle', price: 'NPR 3,100', image: '/images/bottle.webp', badge: '', subtitle: 'KITCHEN' },
    { id: 7, name: 'Lokta Paper Journal', price: 'NPR 1,200', image: '/images/tea.webp', badge: '', subtitle: 'STATIONERY' },
    { id: 8, name: 'Indigo Block Print Scarf', price: 'NPR 2,750', image: '/images/clothes.webp', badge: 'NEW', subtitle: 'FASHION' },
  ];
}

