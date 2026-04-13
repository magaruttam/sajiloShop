import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {FormGroup , FormControl, ReactiveFormsModule} from '@angular/forms';
import { Product } from '../../models/product.model';

interface Variant {
  type: string;
  options: string;
}

@Component({
  selector: 'app-add-product',
  imports: [NgClass, RouterLink, FormsModule,ReactiveFormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct {
  isActive = signal(true);
  productName = '';
  category = '';
  sku = '';
  description = '';
  price = '';
  discount = '';
  discountType = signal<'%' | 'flat'>('%');
  stockQty = 0;
  tags = signal<string[]>(['Handmade', 'Handwoven']);
  tagInput = '';

 profileForm  = new FormGroup({
    name: new FormControl(''),
  });


  deliveryOptions = signal([
    { label: 'Standard Delivery', sub: '3–5 business days', selected: true },
    { label: 'Express Shipping', sub: '1–2 business days', selected: true },
  ]);

  variants = signal<Variant[]>([{ type: 'Size', options: 'Small, Medium, Large' }]);

  addVariant() {
    this.variants.update((v) => [...v, { type: '', options: '' }]);
  }

  removeVariant(index: number) {
    this.variants.update((v) => v.filter((_, i) => i !== index));
  }

  addTag(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.tagInput.trim()) {
      event.preventDefault();
      this.tags.update((t) => [...t, this.tagInput.trim()]);
      this.tagInput = '';
    }
  }

  removeTag(tag: string) {
    this.tags.update((t) => t.filter((x) => x !== tag));
  }

  toggleDiscount() {
    this.discountType.update((d) => (d === '%' ? 'flat' : '%'));
  }
}
