# Categories Store Usage

The `CategoriesStore` is a global NgRx Signal Store that manages category data across the application.

## Features

- **Auto-loading**: Categories are automatically fetched when the store initializes
- **Loading states**: Track loading, error, and success states
- **Computed values**: `categoriesCount` and `hasCategories` for convenience
- **Global singleton**: Provided at root level, shared across all components

## Usage in Components

### Basic Usage

```typescript
import { Component, inject } from '@angular/core';
import { CategoriesStore } from '@core/store/categories.store';

@Component({
  selector: 'app-my-component',
  template: `
    @if (categoriesStore.isLoading()) {
      <p>Loading categories...</p>
    }
    
    @if (categoriesStore.error()) {
      <p>Error: {{ categoriesStore.error() }}</p>
    }
    
    @for (category of categoriesStore.categories(); track category.id) {
      <div>{{ category.name }}</div>
    }
  `
})
export class MyComponent {
  readonly categoriesStore = inject(CategoriesStore);
}
```

### Available Signals

- `categories()` - Array of Category objects
- `isLoading()` - Boolean indicating loading state
- `error()` - Error message string or null
- `categoriesCount()` - Computed count of categories
- `hasCategories()` - Computed boolean if categories exist

### Available Methods

- `loadCategories()` - Manually reload categories (usually not needed as auto-loaded)
- `clearError()` - Clear any error state

### Manual Reload Example

```typescript
export class MyComponent {
  readonly categoriesStore = inject(CategoriesStore);
  
  refreshCategories() {
    this.categoriesStore.loadCategories();
  }
}
```

## Store Structure

```typescript
type CategoriesState = {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
};
```

## Category Model

```typescript
interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
```
