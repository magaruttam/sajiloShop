import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export type OrderStatus = 'IN TRANSIT' | 'DELIVERED' | 'CANCELLED' | 'IN PROGRESS';

export interface Order {
  id: string;
  storeName: string;
  storeCategory: string;
  storeInitial: string;
  storeColor: string;
  productImage: string;
  orderNumber: string;
  productName: string;
  productDesc: string;
  placedOn: string;
  totalAmount: string;
  status: OrderStatus;
}

@Component({
  selector: 'app-orders',
  imports: [CommonModule, RouterLink],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders {
  activeTab = signal<string>('All Orders');
  tabs = ['All Orders', 'In Progress', 'Completed', 'Cancelled'];

  orders: Order[] = [
    {
      id: '1',
      storeName: 'The Himalayan Loom',
      storeCategory: 'ARTISAN COLLECTIVE',
      storeInitial: 'H',
      storeColor: 'bg-[#1A365D]',
      productImage: '/images/clothes.webp',
      orderNumber: '#SC-89241',
      productName: 'Hand-Knotted Pashmina Throw',
      productDesc:
        'A masterwork of Himalayan craftsmanship, sourced sustainably from the high-altitude valleys.',
      placedOn: 'Oct 24, 2023',
      totalAmount: 'NPR 18,500',
      status: 'IN TRANSIT',
    },
    {
      id: '2',
      storeName: 'Everest Essence',
      storeCategory: 'FRAGRANCE & WELLNESS',
      storeInitial: 'E',
      storeColor: 'bg-[#13696A]',
      productImage: '/images/bottle.webp',
      orderNumber: '#SC-77302',
      productName: 'Wildflower & Cedar Incense Set',
      productDesc:
        'Naturally harvested cedarwood mixed with high-altitude wildflowers for a meditative atmosphere.',
      placedOn: 'Sep 12, 2023',
      totalAmount: 'NPR 4,200',
      status: 'DELIVERED',
    },
    {
      id: '3',
      storeName: 'Annapurna Harvest',
      storeCategory: 'ORGANIC TEAS',
      storeInitial: 'A',
      storeColor: 'bg-[#6B4226]',
      productImage: '/images/tea.webp',
      orderNumber: '#SC-81255',
      productName: 'Cloud Forest Silver Needle Tea',
      productDesc: 'Hand-picked silver needle white tea from the slopes of the Annapurna range.',
      placedOn: 'Aug 05, 2023',
      totalAmount: 'NPR 3,150',
      status: 'CANCELLED',
    },
  ];

  get filteredOrders(): Order[] {
    const tab = this.activeTab();
    if (tab === 'All Orders') return this.orders;
    if (tab === 'In Progress')
      return this.orders.filter((o) => o.status === 'IN TRANSIT' || o.status === 'IN PROGRESS');
    if (tab === 'Completed') return this.orders.filter((o) => o.status === 'DELIVERED');
    if (tab === 'Cancelled') return this.orders.filter((o) => o.status === 'CANCELLED');
    return this.orders;
  }

  statusStyle(status: OrderStatus): string {
    switch (status) {
      case 'IN TRANSIT':
        return 'bg-[#E6F4F4] text-[#13696A]';
      case 'DELIVERED':
        return 'bg-[#E8F5E9] text-[#2E7D32]';
      case 'CANCELLED':
        return 'bg-[#FDECEA] text-[#C62828]';
      case 'IN PROGRESS':
        return 'bg-[#FFF8E1] text-[#F57F17]';
    }
  }
}
