import { Component, inject, signal, computed } from '@angular/core';
import { NgClass, DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CatalogProduct } from '../catalog/catalog';

const MOCK_PRODUCTS: CatalogProduct[] = [
  {
    id: '1', name: 'Zenith Runner X1', sku: 'ZRX1-092',
    category: 'Footwear', categoryColor: 'bg-[#EBF4FF] text-[#1A365D]',
    price: 8500, stock: 42, stockStatus: 'in-stock', image: '/images/product-image.png',
  },
  {
    id: '2', name: 'Nordic Chronograph', sku: 'NC22-W34',
    category: 'Accessories', categoryColor: 'bg-[#F3E8FF] text-[#6B21A8]',
    price: 24500, stock: 3, stockStatus: 'low-stock', image: '/images/bottle.webp',
  },
  {
    id: '3', name: 'Himalayan Bass Pro', sku: 'HBP-X500',
    category: 'Electronics', categoryColor: 'bg-[#FFF7ED] text-[#C2410C]',
    price: 15900, stock: 156, stockStatus: 'in-stock', image: '/images/tea.webp',
  },
  {
    id: '4', name: 'Dhaka Shawl', sku: 'DS-001',
    category: 'Clothing', categoryColor: 'bg-[#F0FDF4] text-[#16A34A]',
    price: 3200, stock: 0, stockStatus: 'out-of-stock', image: '/images/clothes.webp',
  },
];

@Component({
  selector: 'app-vendor-product-detail',
  imports: [NgClass, RouterLink, DecimalPipe],
  templateUrl: './vendor-product-detail.html',
  styleUrl: './vendor-product-detail.scss',
})
export class VendorProductDetail {
  private route = inject(ActivatedRoute);

  readonly product = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    return MOCK_PRODUCTS.find((p) => p.id === id) ?? MOCK_PRODUCTS[0];
  });

  activeImage = signal(0);

  readonly images = [
    '/images/product-image.png',
    '/images/bottle.webp',
    '/images/clothes.webp',
    '/images/tea.webp',
  ];

  readonly stockLabels: Record<CatalogProduct['stockStatus'], string> = {
    'in-stock': 'In Stock',
    'low-stock': 'Low Stock',
    'out-of-stock': 'Out of Stock',
  };

  readonly stockColors: Record<CatalogProduct['stockStatus'], string> = {
    'in-stock': 'text-[#16A34A] bg-[#F0FDF4]',
    'low-stock': 'text-red-500 bg-[#FEF2F2]',
    'out-of-stock': 'text-[#43474E] bg-[#F7FAFC]',
  };

  readonly recentOrders = [
    { id: '#ORD-8921', date: 'Oct 24, 2023', customer: 'Prasanna K.C.', qty: 2, status: 'SHIPPED', amount: 'NPR 17,000' },
    { id: '#ORD-8905', date: 'Oct 18, 2023', customer: 'Meera Gurung', qty: 1, status: 'DELIVERED', amount: 'NPR 8,500' },
    { id: '#ORD-8890', date: 'Oct 12, 2023', customer: 'Rohan Shakya', qty: 3, status: 'PROCESSING', amount: 'NPR 25,500' },
  ];

  readonly statusStyles: Record<string, string> = {
    SHIPPED: 'bg-[#E6F4F4] text-[#13696A]',
    PROCESSING: 'bg-[#EBF4FF] text-[#1A365D]',
    DELIVERED: 'bg-[#F0FDF4] text-[#16A34A]',
    CANCELLED: 'bg-[#FEF2F2] text-[#DC2626]',
  };
}
