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
import { VendorLayout } from './layouts/vendor/vendor-layout/vendor-layout';
import { VendorOverview } from './features/vendor/pages/overview/overview';
import { VendorSales } from './features/vendor/pages/sales/sales';
import { AddProduct } from './features/vendor/pages/add-product/add-product';
import { VendorProductsList } from './features/vendor/pages/products-list/products-list';
import { VendorProductDetail } from './features/vendor/pages/vendor-product-detail/vendor-product-detail';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';
import { VendorLogin } from './features/auth/pages/vendor-login/vendor-login';
import { VendorRegister } from './features/auth/pages/vendor-register/vendor-register';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'vendor-login', component: VendorLogin },
  { path: 'vendor-register', component: VendorRegister },
  {
    path: '',
    component: Base,
    children: [
      { path: '', component: Home },
      { path: 'product/:id', component: ProductDetail },
      { path: 'search', component: SearchResults },
      { path: 'become-a-seller', component: BecomeASeller },
      { path: 'cart', component: Cart },
      { path: 'account/orders', component: Orders },
      { path: 'checkout', component: Checkout },
      { path: 'wishlist', component: Wishlist },
    ],
  },
  {
    path: 'vendor',
    component: VendorLayout,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: VendorOverview },
      { path: 'sales', component: VendorSales },
      { path: 'products-list', component: VendorProductsList },
      { path: 'products-list/new', component: AddProduct },
      { path: 'products-list/:id', component: VendorProductDetail },
      // Backward compatibility routes
      { path: 'catalog', redirectTo: 'products-list', pathMatch: 'full' },
      { path: 'catalog/new', redirectTo: 'products-list/new', pathMatch: 'full' },
      { path: 'catalog/:id', redirectTo: 'products-list/:id', pathMatch: 'full' },
    ],
  },
];
