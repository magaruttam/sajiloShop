import { Component, input } from '@angular/core';
import { StarRating } from '../star-rating/star-rating';

export interface Review {
  name: string;
  initials: string;
  rating: number;
  timeAgo: string;
  comment: string;
  verified: boolean;
}

@Component({
  selector: 'app-review-card',
  imports: [StarRating],
  templateUrl: './review-card.html',
})
export class ReviewCard {
  review = input.required<Review>();
}
