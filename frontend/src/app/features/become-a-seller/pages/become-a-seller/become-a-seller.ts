import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-become-a-seller',
  imports: [CommonModule],
  templateUrl: './become-a-seller.html',
  styleUrl: './become-a-seller.scss',
})
export class BecomeASeller {
  currentTestimonial = 0;

  features = [
    {
      icon: 'language',
      title: 'Global Reach',
      desc: 'Your products, delivered to discerning buyers from Manhattan to Singapore. We bring our global logistics network.',
    },
    {
      icon: 'payments',
      title: 'Swift Payouts',
      desc: 'Transparent, automated payout cycle. Receive your earnings every Friday directly to your local or international bank account.',
    },
    {
      icon: 'verified',
      title: 'Brand Integrity',
      desc: 'We protect your listings. Our platform authenticates every item, ensuring value over volume.',
    },
  ];

  steps = [
    {
      number: 1,
      title: 'Apply as Curator',
      desc: 'Submit your brand story in a few product samples. We look for quality and authenticity.',
    },
    {
      number: 2,
      title: 'Digital Setup',
      desc: 'Our onboarding team helps list your product photography and storytelling descriptions.',
    },
    {
      number: 3,
      title: 'Start Selling',
      desc: 'Go live and reach our global customer base with compelling story posts.',
    },
  ];

  testimonials = [
    {
      quote:
        '"SajiloShop changed how I think about my business. I\'m no longer just a local potter, my works are on shelves in New York."',
      name: 'Anisha Thay',
      role: 'Artisan Ceramics',
      image: '/images/clothes.webp',
    },
    {
      quote:
        '"The onboarding was so simple. They understood the heritage value of my weavings and helped me price them fairly."',
      name: 'Ramit Shrestha',
      role: 'Artisan Ceramics',
      image: '/images/clothes.webp',
    },
  ];

  prev() {
    this.currentTestimonial = Math.max(0, this.currentTestimonial - 1);
  }

  next() {
    this.currentTestimonial = Math.min(this.testimonials.length - 1, this.currentTestimonial + 1);
  }
}
