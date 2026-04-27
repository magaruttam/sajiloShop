import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-price-range-slider',
  imports: [DecimalPipe],
  templateUrl: './price-range-slider.html',
  styleUrl: './price-range-slider.scss',
})
export class PriceRangeSlider {
  minValue = 0;
  maxValue = 50000;
}
