import { Component, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CategoriesStore } from '../../../../core/store/categories.store';

interface Variant {
  type: string;
  options: string;
}

@Component({
  selector: 'app-add-product',
  imports: [NgClass, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct {
  // Inject the global categories store
  readonly categoriesStore = inject(CategoriesStore);

  profileForm = new FormGroup({
    name: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(0),
    discount: new FormControl(0),
    stockQty: new FormControl(0),
  });

  deliveryOptions = signal([
    { label: 'Standard Delivery', sub: '3-5 business days', selected: true },
    { label: 'Express Shipping', sub: '1-2 business days', selected: true },
  ]);

  variants = signal<Variant[]>([{ type: 'Size', options: 'Small, Medium, Large' }]);

  addVariant() {
    this.variants.update((v) => [...v, { type: '', options: '' }]);
  }

  removeVariant(index: number) {
    this.variants.update((v) => v.filter((_, i) => i !== index));
  }
}
