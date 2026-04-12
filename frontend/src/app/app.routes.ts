import { Routes } from '@angular/router';
import { Home } from './features/home/pages/home/home';
import { Base } from './layouts/base/base/base';
import { ProductDetail } from './features/product-detail/pages/product-detail/product-detail';
import { SearchResults } from './features/search/pages/search-results/search-results';
import { BecomeASeller } from './features/become-a-seller/pages/become-a-seller/become-a-seller';
import { Cart } from './features/cart/pages/cart/cart';
import { Orders } from './features/account/pages/orders/orders';
import { Checkout } from './features/checkout/pages/checkout/checkout';
import { Wishlist } from './features/wishlist/pages/wishlist/wishlist';

export const routes: Routes = [
  { path: '', component: Base, children: [
    { path: '', component: Home },
    { path: 'product-detail', component: ProductDetail },
    { path: 'search', component: SearchResults },
    { path: 'become-a-seller', component: BecomeASeller },
    { path: 'cart', component: Cart },
    { path: 'account/orders', component: Orders },
    { path: 'checkout', component: Checkout },
    { path: 'wishlist', component: Wishlist },
  ] },
];
