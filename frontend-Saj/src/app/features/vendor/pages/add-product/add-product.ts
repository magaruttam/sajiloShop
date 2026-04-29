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
  selectedImages = signal<File[]>([]);
  errorMessage = signal('');
  dragOver = signal(false);
  imageError = signal('');

  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  private readonly MAX_IMAGES = 10;
  private readonly ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  onImagesSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.processFiles(Array.from(files));
    }
  }

  private processFiles(files: File[]) {
    this.imageError.set('');
    
    // Filter valid image files
    const validFiles = files.filter(file => {
      if (!this.ALLOWED_TYPES.includes(file.type)) {
        this.imageError.set(`${file.name} is not a supported image format.`);
        return false;
      }
      if (file.size > this.MAX_FILE_SIZE) {
        this.imageError.set(`${file.name} is too large. Maximum size is 5MB.`);
        return false;
      }
      return true;
    });

    // Check total image limit
    const currentCount = this.selectedImages().length;
    const newCount = currentCount + validFiles.length;
    
    if (newCount > this.MAX_IMAGES) {
      this.imageError.set(`Maximum ${this.MAX_IMAGES} images allowed. You can add ${this.MAX_IMAGES - currentCount} more.`);
      return;
    }

    // Add valid files
    if (validFiles.length > 0) {
      this.selectedImages.update(current => [...current, ...validFiles]);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragOver.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragOver.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver.set(false);
    
    const files = event.dataTransfer?.files;
    if (files) {
      const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
      this.processFiles(imageFiles);
    }
  }

  removeImage(index: number) {
    this.selectedImages.update(current => current.filter((_, i) => i !== index));
    this.imageError.set(''); // Clear any previous errors
  }

  getImagePreview(file: File): string {
    return URL.createObjectURL(file);
  }

  clearAllImages() {
    this.selectedImages.set([]);
    this.imageError.set('');
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

    // Validate that at least one image is selected
    if (this.selectedImages().length === 0) {
      this.errorMessage.set('Please select at least one product image.');
      return;
    }

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
    
    // Append all selected images
    this.selectedImages().forEach((image, index) => {
      formData.append(`images`, image);
    });

    this.submitting.set(true);
    this.productService.addNewProduct(formData).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/vendor/products-list']);
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
