import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';

type CategoriesState = {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
};

const initialState: CategoriesState = {
  categories: [],
  isLoading: false, 
  error: null,
};

export const CategoriesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ categories }) => ({
    categoriesCount: computed(() => categories().length),
    hasCategories: computed(() => categories().length > 0),
  })),
  withMethods((store, categoryService = inject(CategoryService)) => ({
    loadCategories: rxMethod<void>(
      pipe( 
        tap(() => patchState(store, { isLoading: true, error: null })), 
        switchMap(() =>
          categoryService.getCategories().pipe(
            tap({
              next: (categories) =>
                patchState(store, { categories, isLoading: false, error: null }),
              error: (error) => {
                // Extract the actual error message from the API response
                const errorMessage = error.error?.message || error.message || 'Failed to load categories';
                patchState(store, {
                  error: errorMessage,
                  isLoading: false,
                });
              },
            })
          )
        )
      )
    ),
    clearError: () => patchState(store, { error: null }),
  })),
  withHooks({
    onInit(store) {
      // Automatically load categories when the store is initialized
      store.loadCategories();
    },
  })
);
    