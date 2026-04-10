import { Component } from '@angular/core';
import { StarRating } from '../../components/star-rating/star-rating';
import { ReviewCard, Review } from '../../components/review-card/review-card';
import { ProductCard } from '../../../../shared/components/product-card/product-card';

@Component({
  selector: 'app-product-detail',
  imports: [StarRating, ReviewCard, ProductCard],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  quantity = 1;

  thumbnails = [
    '/images/clothes.webp',
    '/images/clothes.webp',
    '/images/clothes.webp',
  ];
  selectedImage = '/images/clothes.webp';

  specs = [
    { label: 'MATERIAL', value: 'Natural Clay / Matte Glaze' },
    { label: 'DIMENSIONS', value: 'H 24cm x W 15cm' },
    { label: 'COLOR', value: 'Bone White' },
    { label: 'ORIGIN', value: 'Kathmandu, NP' },
  ];

  ratingBreakdown = [
    { stars: 5, percent: 80 },
    { stars: 4, percent: 12 },
    { stars: 3, percent: 5 },
    { stars: 2, percent: 2 },
    { stars: 1, percent: 1 },
  ];

  reviews: Review[] = [
    {
      name: 'Arjun K.',
      initials: 'AK',
      rating: 5,
      timeAgo: '2 days ago',
      comment: 'The craftsmanship is exceptional. It fits perfectly in my minimalist living room. The texture of the clay feels very premium and grounded.',
      verified: true,
    },
    {
      name: 'Sita M.',
      initials: 'SM',
      rating: 4,
      timeAgo: '1 week ago',
      comment: 'Lovely vase. Much better than the pictures. It has a nice weight to it and the packaging was very secure.',
      verified: true,
    },
  ];

  pairings = [
    { name: 'Handwoven Bamboo Tray', subtitle: 'Natural sustainable weave', price: 'NPR 2,200', image: '/images/clothes.webp' },
    { name: 'Stone Washed Linen', subtitle: '', price: 'NPR 1,200', image: '/images/clothes.webp' },
    { name: 'Himalayan Cedarwood', subtitle: '', price: 'NPR 1,850', image: '/images/clothes.webp' },
  ];

  increment() { this.quantity++; }
  decrement() { if (this.quantity > 1) this.quantity--; }
  selectImage(img: string) { this.selectedImage = img; }
}
