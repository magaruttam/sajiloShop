import { Component, inject, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { StarRating } from '../../components/star-rating/star-rating';
import { ReviewCard, Review } from '../../components/review-card/review-card';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { ProductsStore } from '../../../../core/store/products.store';

@Component({
  selector: 'app-product-detail',
  imports: [DecimalPipe, StarRating, ReviewCard, ProductCard],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productsStore = inject(ProductsStore);

  quantity = 1;
  showMagnifier = false;
  lensX = 0;
  lensY = 0;
  bgSize = '200% 200%';
  bgPosition = '0% 0%';

  readonly LENS_SIZE = 120;
  readonly ZOOM = 2.5;

  // Get the specific product based on route parameter
  readonly product = computed(() => {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.productsStore.products().find((p) => p.id === id);
  });

  // Get product images
  readonly thumbnails = computed(() => {
    const prod = this.product();
    if (prod && prod.images && prod.images.length > 0) {
      return prod.images.map(img => img.url);
    }
    return ['/images/product-image.png'];
  });

  selectedImage = '/images/product-image.png';

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
      comment:
        'The craftsmanship is exceptional. It fits perfectly in my minimalist living room. The texture of the clay feels very premium and grounded.',
      verified: true,
    },
    {
      name: 'Sita M.',
      initials: 'SM',
      rating: 4,
      timeAgo: '1 week ago',
      comment:
        'Lovely vase. Much better than the pictures. It has a nice weight to it and the packaging was very secure.',
      verified: true,
    },
  ];

  pairings = [
    {
      name: 'Handwoven Bamboo Tray',
      subtitle: 'Natural sustainable weave',
      price: 'NPR 2,200',
      image: '/images/clothes.webp',
    },
    { name: 'Stone Washed Linen', subtitle: '', price: 'NPR 1,200', image: '/images/clothes.webp' },
    {
      name: 'Himalayan Cedarwood',
      subtitle: '',
      price: 'NPR 1,850',
      image: '/images/clothes.webp',
    },
  ];

  store = {
    name: 'Himalayan Clay Studio',
    avatar: '/images/clothes.webp',
    rating: 4.9,
    totalSales: '1.2k',
    verified: true,
  };

  ngOnInit() {
    // Set the first image as selected when product loads
    const thumbs = this.thumbnails();
    if (thumbs.length > 0) {
      this.selectedImage = thumbs[0];
    }
  }

  increment() {
    this.quantity++;
  }
  decrement() {
    if (this.quantity > 1) this.quantity--;
  }
  selectImage(img: string) {
    this.selectedImage = img;
  }

  buyNow() {
    const prod = this.product();
    if (!prod) return;

    this.router.navigate(['/checkout'], {
      state: {
        items: [
          {
            image: this.selectedImage,
            name: prod.name,
            size: 'Standard',
            color: 'Default',
            quantity: this.quantity,
            unitPrice: parseFloat(prod.price),
          },
        ],
      },
    });
  }

  onMouseMove(event: MouseEvent, container: HTMLElement) {
    console.log(container.getBoundingClientRect());
    const rect = container.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Center the lens on the cursor
    this.lensX = mouseX - this.LENS_SIZE / 2;
    this.lensY = mouseY - this.LENS_SIZE / 2;

    // Calculate background position so the zoomed area matches cursor
    const bgX = (mouseX / rect.width) * 100;
    const bgY = (mouseY / rect.height) * 100;

    this.bgSize = `${rect.width * this.ZOOM}px ${rect.height * this.ZOOM}px`;
    this.bgPosition = `${bgX}% ${bgY}%`;
    this.showMagnifier = true;
  }
  onMouseLeave() {
    this.showMagnifier = false;
  }
}
