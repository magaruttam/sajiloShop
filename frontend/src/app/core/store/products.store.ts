import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from '../../features/vendor/services/product.service';

type ProductsState = {
  products: Product[];
  isLoading: boolean;
  error: string | null;
};

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: null,
};

export const ProductsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ products }) => ({
    hasProducts: computed(() => products().length > 0),
    productsCount: computed(() => products().length),
  })),
  withMethods((store, productService = inject(ProductService)) => ({
    loadProducts: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() =>
          productService.getProducts().pipe(
            tap({
              next: (res) => patchState(store, { products: res.allProducts, isLoading: false }),
              error: (err) =>
                patchState(store, {
                  error: err.message || 'Failed to load products',
                  isLoading: false,
                }),
            })
          )
        )
      )
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadProducts();
    },
  })
);
