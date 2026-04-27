import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  imports: [CommonModule],
  templateUrl: './star-rating.html',
})
export class StarRating {
  rating = input<number>(0);
  reviewCount = input<number>(0);

  get stars() {
    return [1, 2, 3, 4, 5].map((i) => ({
      full: i <= Math.floor(this.rating()),
      half: i === Math.ceil(this.rating()) && this.rating() % 1 >= 0.5,
    }));
  }
}
