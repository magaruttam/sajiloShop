import { Component, inject } from '@angular/core';
import { CategoriesStore } from '../../../../core/store/categories.store';

@Component({
  selector: 'app-categories-section',
  imports: [],
  templateUrl: './categories-section.html',
  styleUrl: './categories-section.scss',
})
export class CategoriesSection {
  readonly categoriesStore = inject(CategoriesStore);
}
