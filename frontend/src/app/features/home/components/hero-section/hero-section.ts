import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-hero-section',
  imports: [CommonModule],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeroSection implements AfterViewInit {
  @ViewChild('swiperEl') swiperEl!: ElementRef;

constructor(private cdr: ChangeDetectorRef) {}

  heroSectionImages = [{
    src: '/images/hero-section-1.avif',
    alt: 'Hero Section Image 1'
  },
  {
    src: '/images/hero-section-2.avif',
    alt: 'Hero Section Image 2'
  },
  {
    src: '/images/hero-section-3.avif',
    alt: 'Hero Section Image 3'
  },
  {
    src: '/images/hero-section-4.avif',
    alt: 'Hero Section Image 4'
  },
  {
    src: '/images/hero-section-5.avif',
    alt: 'Hero Section Image 5'
  }
  ];

  ngAfterViewInit(): void {
    const swiperContainer = this.swiperEl.nativeElement;
    const params = {
      slidesPerView: 1,
      spaceBetween: 16,
      navigation: true,
      pagination: {
        clickable: true,
        enabled: true,
      },
      loop: true,
     effect: 'creative',
  creativeEffect: {
    prev: {
      // will set `translateZ(-400px)` on previous slides
      translate: [0, 0, -400],
    },
    next: {
      // will set `translateX(100%)` on next slides
      translate: ['100%', 0, 0],
    },
  },
  
    };

    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
    this.cdr.detectChanges();
  }
}
