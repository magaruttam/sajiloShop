import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

interface StatCard {
  icon: string;
  label: string;
  value: string;
  badge: string;
  badgeColor: string;
}

interface StockAlert {
  name: string;
  image: string;
  stock: number;
  urgency: 'critical' | 'warning';
}

interface Order {
  id: string;
  date: string;
  customer: string;
  status: 'SHIPPED' | 'PROCESSING' | 'DELIVERED' | 'CANCELLED';
  amount: string;
}

@Component({
  selector: 'app-vendor-overview',
  imports: [RouterLink, NgClass],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class VendorOverview {
  salesRange = signal<'7days' | '30days'>('7days');

  readonly stats: StatCard[] = [
    { icon: 'payments', label: 'Total Revenue', value: 'NPR 1,42,500', badge: '+12% trend', badgeColor: 'text-[#13696A]' },
    { icon: 'shopping_cart', label: 'Total Orders', value: '842', badge: 'Steady performance', badgeColor: 'text-[#43474E]' },
    { icon: 'visibility', label: 'Customer Reach', value: '3,120', badge: '+4.2k impressions', badgeColor: 'text-[#13696A]' },
  ];

  readonly stockAlerts: StockAlert[] = [
    { name: 'Dhaka Shawl', image: '/images/clothes.webp', stock: 2, urgency: 'critical' },
    { name: 'Ceramic Pot', image: '/images/bottle.webp', stock: 5, urgency: 'critical' },
    { name: 'Silver Earrings', image: '/images/product-image.png', stock: 8, urgency: 'warning' },
  ];

  readonly orders: Order[] = [
    { id: '#ORD-8921', date: 'Oct 24, 2023', customer: 'Prasanna K.C.', status: 'SHIPPED', amount: 'NPR 4,200' },
    { id: '#ORD-8920', date: 'Oct 23, 2023', customer: 'Meera Gurung', status: 'PROCESSING', amount: 'NPR 12,850' },
    { id: '#ORD-8919', date: 'Oct 23, 2023', customer: 'Rohan Shakya', status: 'DELIVERED', amount: 'NPR 1,900' },
    { id: '#ORD-8918', date: 'Oct 22, 2023', customer: 'Anjali Rai', status: 'CANCELLED', amount: 'NPR 3,400' },
  ];

  readonly chartBars = [
    { day: 'Mon', height: 40 },
    { day: 'Tue', height: 65 },
    { day: 'Wed', height: 90 },
    { day: 'Thu', height: 55 },
    { day: 'Fri', height: 75 },
    { day: 'Sat', height: 50 },
    { day: 'Sun', height: 30 },
  ];

  readonly statusStyles: Record<Order['status'], string> = {
    SHIPPED: 'bg-[#E6F4F4] text-[#13696A]',
    PROCESSING: 'bg-[#EBF4FF] text-[#1A365D]',
    DELIVERED: 'bg-[#F0FDF4] text-[#16A34A]',
    CANCELLED: 'bg-[#FEF2F2] text-[#DC2626]',
  };

  readonly profileCompletion = 85;
}
