import { Routes } from '@angular/router';
import { Home } from './features/home/pages/home/home';
import { Base } from './layouts/base/base/base';
import { ProductDetail } from './features/product-detail/pages/product-detail/product-detail';
<<<<<<< Updated upstream
=======
import { SearchResults } from './features/search/pages/search-results/search-results';
import { BecomeASeller } from './features/become-a-seller/pages/become-a-seller/become-a-seller';

import { Cart } from './features/cart/pages/cart/cart';

>>>>>>> Stashed changes
export const routes: Routes = [
  { path: '', component: Base, children: [
    { path: '', component: Home },
    { path: 'product-detail', component: ProductDetail },
    { path: 'search', component: SearchResults },
<<<<<<< Updated upstream
=======
    { path: 'become-a-seller', component: BecomeASeller },
    { path: 'cart', component: Cart },
>>>>>>> Stashed changes
  ] },
];
