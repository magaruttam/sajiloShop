# Design Document — Search Results Page

## Overview

The Search Results Page is a new feature for SajiloShop that renders at the `/search` route. It reads the `q` query parameter from the Angular Router, displays matching products in a filterable and sortable grid, and provides pagination. The page is composed inside the existing `Base` layout (header + footer unchanged) and reuses the `app-product-card` component.

The page is built as a set of Angular 21 standalone components using signals for reactive state, `inject()` for dependency injection, and Tailwind CSS for styling. No new backend is introduced — the initial implementation uses in-memory mock data; the service layer is designed to be swapped for a real API later.

---

## Architecture

The feature lives entirely under `src/app/features/search-results/`. The page component orchestrates three sub-components and a service.

```
src/app/features/search-results/
├── pages/
│   └── search-results/
│       ├── search-results.ts
│       ├── search-results.html
│       └── search-results.scss
├── components/
│   ├── filter-sidebar/
│   │   ├── filter-sidebar.ts
│   │   ├── filter-sidebar.html
│   │   └── filter-sidebar.scss
│   ├── price-range-slider/
│   │   ├── price-range-slider.ts
│   │   ├── price-range-slider.html
│   │   └── price-range-slider.scss
│   └── pagination/
│       ├── pagination.ts
│       ├── pagination.html
│       └── pagination.scss
└── services/
    └── product-search.service.ts
```

just create a static page now , now more focus on the design part , i manually create the state management part in future , your task now is to crate the page design perfactly not thinking on the logic part now ,leave that at me
