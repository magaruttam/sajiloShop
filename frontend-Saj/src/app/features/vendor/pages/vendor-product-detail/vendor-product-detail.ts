import { Component, inject, signal, computed } from '@angular/core';
import { NgClass, DecimalPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsStore } from '../../../../core/store/products.store';

@Component({
  selector: 'app-vendor-product-detail',
  imports: [NgClass, RouterLink, DecimalPipe, DatePipe],
  templateUrl: './vendor-product-detail.html',
  styleUrl: './vendor-product-detail.scss',
})
export class VendorProductDetail {
  private route = inject(ActivatedRoute);
  private productsStore = inject(ProductsStore);

  readonly product = computed(() => {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.productsStore.products().find((p) => p.id === id);
  });

  activeImage = signal(0);

  // Use product images from the product data
  readonly images = computed(() => {
    const prod = this.product();
    if (prod && prod.images && prod.images.length > 0) {
      return prod.images.map(img => img.url);
    }
    // Fallback to placeholder if no images
    return ['/images/product-image.png'];
  });

  stockStatus(stock: number): 'in-stock' | 'low-stock' | 'out-of-stock' {
    if (stock === 0) return 'out-of-stock';
    if (stock <= 5) return 'low-stock';
    return 'in-stock';
  }

  readonly stockLabels = {
    'in-stock': 'In Stock',
    'low-stock': 'Low Stock',
    'out-of-stock': 'Out of Stock',
  };

  readonly stockColors = {
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
