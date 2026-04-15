import { Category } from '../../../../core/models/category.model';
import { CategoryService } from '../../../../core/services/category.service';
import { Component, inject, signal } from '@angular/core';
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
private CategoryService = inject(CategoryService);

Category!: Category[];

ngOnInit(){
  this.CategoryService.getCategories().subscribe((res)=>{
     this.Category = res;
  })
}

  // discountType = signal<'%' | 'flat'>('%');

 profileForm  = new FormGroup({
    name: new FormControl(''),
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

 

  // toggleDiscount() {
  //   this.discountType.update((d) => (d === '%' ? 'flat' : '%'));
  // }
}
