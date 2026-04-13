import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

export interface CheckoutItem {
  image: string;
  name: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
}

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout implements OnInit {
  private router = inject(Router);

  paymentMethod = signal<'wallet' | 'card' | 'cod'>('card');
  promoCode = '';

  form = {
    fullName: '',
    email: '',
    street: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  };

  items: CheckoutItem[] = [];

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { items?: CheckoutItem[] } | undefined;
    if (state?.items) {
      this.items = state.items;
    } else {
      // fallback demo item
      this.items = [
        {
          image: '/images/clothes.webp',
          name: 'Nordic Clay Vase',
          size: 'Standard',
          color: 'Bone White',
          quantity: 1,
          unitPrice: 4500,
        },
      ];
    }
  }

  get subtotal() {
    return this.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  }
  get shipping() {
    return 0;
  }
  get tax() {
    return Math.round(this.subtotal * 0.13);
  }
  get total() {
    return this.subtotal + this.shipping + this.tax;
  }
}
