import { Routes } from '@angular/router';
import { Home } from './features/home/pages/home/home';
import { Base } from './layouts/base/base/base';
import { ProductDetail } from './features/product-detail/pages/product-detail/product-detail';
export const routes: Routes = [
  { path: '', component: Base, children: [
    { path: '', component: Home },
    { path: 'product-detail', component: ProductDetail },
    { path: 'search', component: SearchResults },
  ] },
];
