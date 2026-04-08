import { Component, ViewChild } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SearchBox } from '../../../shared/components/search-box/search-box';
import { ElementRef ,viewChild , HostListener } from '@angular/core';
import { last } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, SearchBox],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @ViewChild('header') header!: ElementRef;

  private lastScroll = 0;
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 50) {
      this.header.nativeElement.style.transform = 'translateY(0)';
    }else if (currentScroll > this.lastScroll) {
      this.header.nativeElement.style.transform = 'translateY(-100%)';
    }else if (currentScroll < this.lastScroll){
      this.header.nativeElement.style.transform = 'translateY(0)';
    }
    this.lastScroll = currentScroll;
} 
}