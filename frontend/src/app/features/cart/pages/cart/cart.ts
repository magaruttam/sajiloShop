import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../../../shared/components/product-card/product-card';

export interface CartItem {
  id: number;
  image: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  unitPrice: number;
  storeName: string;
  storeAvatar: string;
  selected: boolean;
}

export interface StoreGroup {
  storeName: string;
  storeAvatar: string;
  items: CartItem[];
}

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, RouterLink, ProductCard],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  promoCode = '';

  items: CartItem[] = [
    { id: 1, image: '/images/clothes.webp', name: 'Hand-Woven Pashmina Wrap', color: 'Midnight Navy', size: 'Standard', quantity: 1, unitPrice: 185, storeName: 'Himalayan Clay Studio', storeAvatar: '/images/clothes.webp', selected: true },
    { id: 2, image: '/images/bottle.webp', name: 'Artisan Terracotta Planter', color: 'Stone Keal', size: 'Large', quantity: 2, unitPrice: 62, storeName: 'Himalayan Clay Studio', storeAvatar: '/images/clothes.webp', selected: true },
    { id: 3, image: '/images/tea.webp', name: 'Brass Panas Pair', color: 'Antique Gold', size: 'Standard', quantity: 1, unitPrice: 95, storeName: 'Nepal Craft House', storeAvatar: '/images/tea.webp', selected: false },
  ];

  suggestions = [
    { name: 'Hand-Hammered Singing Bowl', price: 'NPR 8,900', image: '/images/tea.webp' },
    { name: 'High-Mountain Cedar Incense', price: 'NPR 2,400', image: '/images/tree.webp' },
    { name: 'Himalayan Wool Accent Rug', price: 'NPR 21,000', image: '/images/clothes.webp' },
    { name: 'Midnight Ceramic Tea Set', price: 'NPR 7,500', image: '/images/bottle.webp' },
  ];

  get storeGroups(): StoreGroup[] {
    const map = new Map<string, StoreGroup>();
    for (const item of this.items) {
      if (!map.has(item.storeName)) {
        map.set(item.storeName, { storeName: item.storeName, storeAvatar: item.storeAvatar, items: [] });
      }
      map.get(item.storeName)!.items.push(item);
    }
    return Array.from(map.values());
  }

  isStoreAllSelected(group: StoreGroup): boolean {
    return group.items.every(i => i.selected);
  }

  isStoreIndeterminate(group: StoreGroup): boolean {
    const some = group.items.some(i => i.selected);
    const all = group.items.every(i => i.selected);
    return some && !all;
  }

  toggleStore(group: StoreGroup, checked: boolean) {
    group.items.forEach(i => i.selected = checked);
  }

  get selectedItems() { return this.items.filter(i => i.selected); }
  get subtotal() { return this.selectedItems.reduce((s, i) => s + i.unitPrice * i.quantity, 0); }
  get shipping() { return this.selectedItems.length > 0 ? 15 : 0; }
  get tax() { return +(this.subtotal * 0.08).toFixed(2); }
  get total() { return +(this.subtotal + this.shipping + this.tax).toFixed(2); }

  increment(item: CartItem) { item.quantity++; }
  decrement(item: CartItem) { if (item.quantity > 1) item.quantity--; }
  remove(item: CartItem) { this.items = this.items.filter(i => i.id !== item.id); }
  applyPromo() { /* promo logic */ }
}
