import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchBox } from '../../../shared/components/search-box/search-box';

@Component({
  selector: 'app-header',
  imports: [RouterLink, SearchBox, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @ViewChild('header') header!: ElementRef;

  mobileMenuOpen = false;
  userDropdownOpen = false;
  private lastScroll = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 50) {
      this.header.nativeElement.style.transform = 'translateY(0)';
    } else if (currentScroll > this.lastScroll) {
      this.header.nativeElement.style.transform = 'translateY(-100%)';
    } else {
      this.header.nativeElement.style.transform = 'translateY(0)';
    }
    this.lastScroll = currentScroll;
  }
}
