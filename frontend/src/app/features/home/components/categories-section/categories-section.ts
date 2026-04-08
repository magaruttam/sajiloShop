import { Component } from '@angular/core';

@Component({
  selector: 'app-categories-section',
  imports: [],
  templateUrl: './categories-section.html',
  styleUrl: './categories-section.scss',
})
export class CategoriesSection {
  categories = [
    'Monitors', 'Laptops', 'Keyboards', 'Mice',
    'Headphones', 'Speakers', 'Cameras', 'Printers',
    'Tablets', 'Phones', 'TVs', 'Routers',
    'Storage', 'Graphics Cards', 'Processors', 'Accessories'
  ];
}
