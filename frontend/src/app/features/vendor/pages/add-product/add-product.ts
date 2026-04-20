import { Component, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CategoriesStore } from '../../../../core/store/categories.store';
import { ProductService } from '../../services/product.service';
import { AuthStore } from '../../../../core/store/auth.store';

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
  readonly categoriesStore = inject(CategoriesStore);
  private productService = inject(ProductService);
  private authStore = inject(AuthStore);
  private router = inject(Router);

  submitting = signal(false);
  selectedImage = signal<File | null>(null);
  errorMessage = signal('');

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.selectedImage.set(file);
  }
  

  profileForm = new FormGroup({
    name: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(),
    discount: new FormControl(),
    stockQty: new FormControl(),
    image: new FormControl(null),
  });

  onSubmit() {
    this.errorMessage.set('');

    const vendorId = this.authStore.vendor()?.id;
    if (!vendorId) {
      this.errorMessage.set('Vendor session not found. Please log in again.');
      return;
    }

    const v = this.profileForm.value;
    const formData = new FormData();
    formData.append('vendorId', String(vendorId));
    formData.append('name', v.name!);
    formData.append('categoryId', v.category!);
    formData.append('description', v.description ?? '');
    formData.append('price', String(v.price));
    formData.append('stock', String(v.stockQty));
    formData.append('status', 'approved');
    if (this.selectedImage()) {
      formData.append('image', this.selectedImage()!);
    }

    this.submitting.set(true);
    this.productService.addNewProduct(formData).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/vendor/catalog']);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message ?? 'Failed to add product. Please try again.');
        this.submitting.set(false);
      },
    });
  }

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
