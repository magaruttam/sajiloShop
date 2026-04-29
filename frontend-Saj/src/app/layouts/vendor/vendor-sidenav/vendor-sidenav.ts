import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

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
  private router = inject(Router);
  
  // Track which dropdowns are open
  openDropdowns = signal<Set<string>>(new Set());

  readonly navItems: NavItem[] = [
    { label: 'Overview', icon: 'grid_view', route: '/vendor/overview' },
    {
      label: 'Products',
      icon: 'inventory_2',
      route: '/vendor/products-list',
      children: [
        { label: 'All Products', route: '/vendor/products-list' },
        { label: 'Add Product', route: '/vendor/products-list/new' },
      ],
    },
  ];

  constructor() {
    // Auto-expand dropdown if current route matches any child
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.updateOpenDropdowns();
      });
    
    // Set initial state
    this.updateOpenDropdowns();
  }

  private updateOpenDropdowns() {
    const currentUrl = this.router.url;
    const newOpenDropdowns = new Set<string>();
    
    this.navItems.forEach((item) => {
      if (item.children?.length) {
        // Check if any child route matches current URL
        const hasActiveChild = item.children.some((child) => 
          currentUrl.startsWith(child.route)
        );
        if (hasActiveChild) {
          newOpenDropdowns.add(item.label);
        }
      }
    });
    
    this.openDropdowns.set(newOpenDropdowns);
  }

  toggleDropdown(itemLabel: string) {
    const current = this.openDropdowns();
    const newSet = new Set(current);
    
    if (newSet.has(itemLabel)) {
      newSet.delete(itemLabel);
    } else {
      newSet.add(itemLabel);
    }
    
    this.openDropdowns.set(newSet);
  }

  isDropdownOpen(itemLabel: string): boolean {
    return this.openDropdowns().has(itemLabel);
  }
}
