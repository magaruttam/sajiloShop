import { Component, signal } from '@angular/core';
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
export class VendorSidenav {
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
