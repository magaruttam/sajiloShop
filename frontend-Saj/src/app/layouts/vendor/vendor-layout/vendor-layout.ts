import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { VendorSidenav } from '../vendor-sidenav/vendor-sidenav';
import { VendorHeader } from '../vendor-header/vendor-header';

@Component({
  selector: 'app-vendor-layout',
  imports: [RouterOutlet, VendorSidenav, VendorHeader],
  templateUrl: './vendor-layout.html',
  styleUrl: './vendor-layout.scss',
})
export class VendorLayout {
  private router = inject(Router);
  showHeader = signal(true);
  sidenavOpen = signal(false);

  constructor() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      this.showHeader.set(!(e as NavigationEnd).urlAfterRedirects.includes('/vendor/products-list/new'));
      // Close sidenav on navigation (mobile)
      this.sidenavOpen.set(false);
    });
    // set initial value
    this.showHeader.set(!this.router.url.includes('/vendor/products-list/new'));
  }

  toggleSidenav() {
    this.sidenavOpen.update(v => !v);
  }
}
