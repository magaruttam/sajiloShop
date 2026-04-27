# Implementation Plan: Search Results Page (Static UI)

## Overview

Build the static UI for the Search Results Page at `/search`. All components use hardcoded mock data — no service calls, no complex state management. Focus is on pixel-perfect layout matching the design reference. State management will be wired up separately in a future pass.

## Tasks

- [ ] 1. Register the search route in app.routes.ts
  - Import `SearchResults` page component and add `{ path: 'search', component: SearchResults }` as a child of the `Base` route
  - _Requirements: 1.1_

- [-] 2. Create the `PriceRangeSlider` component
  - [-] 2.1 Scaffold `src/app/features/search-results/components/price-range-slider/` with `.ts`, `.html`, `.scss`
    - Standalone component, selector `app-price-range-slider`
    - Two overlapping `<input type="range">` elements for min/max handles
    - Display `NPR {min} – NPR {max}` label below the track
    - Hardcode default min=0, max=50000 as component properties
    - Style the track fill (teal `#13696A`) between the two handles using SCSS
    - _Requirements: 5.1, 5.2_

- [ ] 3. Create the `FilterSidebar` component
  - [ ] 3.1 Scaffold `src/app/features/search-results/components/filter-sidebar/` with `.ts`, `.html`, `.scss`
    - Standalone component, selector `app-filter-sidebar`
    - Fixed width ~220px on desktop, full-width overlay on mobile
    - _Requirements: 4.1, 5.1, 7.1, 8.1, 12.1_
  - [ ] 3.2 Implement CATEGORY section
    - Hardcode a list of category objects `{ name: string, count: number }` in the component class
    - Render each as a clickable text row; active item in teal `#13696A` with a teal pill badge showing count
    - First item `All Pashmina` active by default (add `active` class)
    - _Requirements: 4.1, 4.3, 4.4_
  - [ ] 3.3 Implement PRICE RANGE section
    - Embed `<app-price-range-slider>` inside the sidebar
    - Import `PriceRangeSlider` in the sidebar's `imports` array
    - _Requirements: 5.1, 5.2_
  - [ ] 3.4 Implement COLOR section
    - Hardcode an array of color hex values in the component class
    - Render each as a circular `<button>` swatch (32×32px) with a teal ring on the "selected" swatch
    - First color selected by default via a hardcoded `selectedColor` property
    - _Requirements: design reference_
  - [ ] 3.5 Implement MATERIAL section
    - Hardcode a list of material strings in the component class
    - Render each as a labeled `<input type="checkbox">` row
    - Style checkboxes with teal accent color
    - _Requirements: 7.1_
  - [ ] 3.6 Implement RATING section
    - Render a single "4 Stars & Up" row with five star icons (4 filled teal, 1 empty)
    - Use a hardcoded boolean `ratingActive = false` to toggle the active/checked state visually
    - _Requirements: 8.1, 8.3_

- [ ] 4. Create the `Pagination` component
  - [ ] 4.1 Scaffold `src/app/features/search-results/components/pagination/` with `.ts`, `.html`, `.scss`
    - Standalone component, selector `app-pagination`
    - Hardcode `currentPage = 3`, `totalPages = 8` as component properties
    - _Requirements: 10.1, 10.2_
  - [ ] 4.2 Render pagination bar
    - Previous arrow `‹` (disabled styling when on page 1)
    - Numbered page buttons; active page has teal background `#13696A` and white text
    - Ellipsis `...` rendered between page 1 and the middle range, and between the middle range and last page
    - Next arrow `›` (disabled styling when on last page)
    - Center the bar horizontally
    - _Requirements: 10.1, 10.3, 10.4_

- [ ] 5. Create the `SearchResults` page component
  - [ ] 5.1 Scaffold `src/app/features/search-results/pages/search-results/` with `.ts`, `.html`, `.scss`
    - Standalone component, selector `app-search-results`
    - Import `FilterSidebar`, `Pagination`, `ProductCard`, `RouterLink`
    - Hardcode `query = 'Pashmina'`, `totalResults = 48`, `currentSort = 'Newest Arrivals'` as component properties
    - Hardcode an array of 16 mock product objects `{ image, name, subtitle, price, discount }` in the component class
    - _Requirements: 1.1, 1.2, 9.1_
  - [ ] 5.2 Implement breadcrumb
    - Render `HOME › SEARCH › PASHMINA` in uppercase small muted text
    - `HOME` is a `[routerLink]="['/']"` anchor; `SEARCH` is plain text; query segment is bold dark text
    - _Requirements: 2.1, 2.2, 2.3_
  - [ ] 5.3 Implement results header row
    - Left side: `<h1>` with `{totalResults} results found for '{query}'` — large bold text
    - Right side: `Sort By` label + `<select>` dropdown with options: `Newest Arrivals`, `Price: Low to High`, `Price: High to Low`, `Top Rated`
    - Align header row using flexbox `justify-between items-center`
    - _Requirements: 3.1, 3.2, 3.4_
  - [ ] 5.4 Implement two-column page layout
    - Outer wrapper: light grey background `#F7FAFC`, full min-height
    - Left column: `<app-filter-sidebar>` — hidden on mobile (`hidden lg:block`), ~220px wide
    - Right column: product grid + pagination, takes remaining width (`flex-1`)
    - On mobile: add a "Filters" toggle `<button>` above the grid that shows/hides the sidebar using a `sidebarOpen = false` signal
    - _Requirements: 12.1, 12.2, 12.3_
  - [ ] 5.5 Implement product grid
    - CSS grid: `grid-cols-2 lg:grid-cols-4` with `gap-4`
    - Render `<app-product-card>` for each mock product, binding all five inputs
    - Below the grid, render `<app-pagination>`
    - _Requirements: 9.1, 9.2, 10.1_

- [ ] 6. Style polish and responsive verification
  - [ ] 6.1 Verify sidebar section headings use uppercase, letter-spaced, small muted text (e.g. `text-xs font-semibold tracking-widest text-gray-500 uppercase`)
  - [ ] 6.2 Verify teal color `#13696A` is applied consistently: active category, color swatch ring, active pagination page, checkbox accent, filled stars
  - [ ] 6.3 Verify the mobile sidebar overlay renders above the product grid (`z-50`) and has a close button
  - [ ] 6.4 Verify the price range slider track fill visually reflects the min/max handle positions
  - _Requirements: 4.4, 5.2, 8.3, 12.2_

- [ ] 7. Final checkpoint
  - Build the app (`ng build`) and confirm zero compilation errors
  - Visually verify the `/search` route renders correctly at desktop (≥1024px) and mobile (<640px) widths
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- All data is hardcoded mock data — no service layer needed for this phase
- State management (filter logic, sort, pagination clicks) will be wired up in a future pass
- The `sidebarOpen` signal in the page component is the only reactive primitive needed for this phase
- `app-product-card` selector and inputs (`image`, `name`, `subtitle`, `price`, `discount`) must not be modified
