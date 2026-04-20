import { Component, inject, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface children {
  label: string;
  route: string;
}

interface NavItem {
  label: string;
  icon: string;
  route: string;
  children?: children[];
}

@Component({
  selector: 'app-vendor-sidenav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './vendor-sidenav.html',
  styleUrl: './vendor-sidenav.scss',
})
export class VendorSidenav implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const { initFlowbite } = await import('flowbite');
      initFlowbite();
    }
  }

  readonly navItems: NavItem[] = [
    { label: 'Overview', icon: 'grid_view', route: '/vendor/overview' },
    {
      label: 'Products',
      icon: 'inventory_2',
      route: '/vendor/catalog',
      children: [
        { label: 'All Products', route: '/vendor/catalog' },
        { label: 'Add Product', route: '/vendor/catalog/new' },
      ],
    },
  ];
}
