# Requirements Document

## Introduction

The Search Results Page is a core discovery feature for SajiloShop, an e-commerce platform targeting the Nepali market. When a user submits a search query, the Search Results Page displays matching products in a filterable, sortable grid. The page integrates with the existing Base layout (header + footer unchanged) and reuses the `app-product-card` component. Filters include category, price range (in NPR), material, and star rating. Results are paginated and the page is fully responsive.

## Glossary

- **Search_Results_Page**: The Angular standalone page component rendered at the `/search` route, displaying products matching a query.
- **Filter_Sidebar**: The left-panel component containing all filter controls (category, price range, color, material, rating).
- **Product_Grid**: The main content area displaying `app-product-card` components in a responsive grid.
- **Pagination**: The component at the bottom of the Product_Grid that allows navigation between result pages.
- **Sort_Control**: The dropdown control that changes the ordering of results.
- **Active_Filters**: The set of currently applied filter values that constrain the displayed results.
- **Price_Range_Slider**: A dual-handle slider component for selecting a minimum and maximum price in NPR.
- **Query**: The search term submitted by the user, passed via the Angular Router query parameter `q`.
- **NPR**: Nepalese Rupee — the currency unit used throughout the platform.
- **ProductCard**: The existing reusable component (`app-product-card`) with inputs: `image`, `name`, `subtitle`, `price`, `discount`.

---

## Requirements

### Requirement 1: Search Route and Page Initialization

**User Story:** As a shopper, I want to navigate to a dedicated search results page when I submit a search query, so that I can see all matching products in one place.

#### Acceptance Criteria

1. WHEN a user navigates to `/search?q=<term>`, THE Search_Results_Page SHALL render within the existing Base layout (header and footer unchanged).
2. WHEN the `q` query parameter is present, THE Search_Results_Page SHALL read the query value from the Angular Router and display it in the breadcrumb and results header.
3. IF the `q` query parameter is absent or empty, THEN THE Search_Results_Page SHALL display a "No search term provided" message in place of the results.
4. WHEN the query parameter changes (e.g. user searches again from the header), THE Search_Results_Page SHALL re-initialize all filters to their default values and reload results for the new query.

---

### Requirement 2: Breadcrumb Navigation

**User Story:** As a shopper, I want to see a breadcrumb trail on the search results page, so that I know where I am in the site hierarchy and can navigate back easily.

#### Acceptance Criteria

1. THE Search_Results_Page SHALL display a breadcrumb in the format: `HOME › SEARCH › [QUERY]`.
2. WHEN the user clicks the `HOME` breadcrumb segment, THE Search_Results_Page SHALL navigate to the `/` route.
3. THE Search_Results_Page SHALL render the `[QUERY]` breadcrumb segment in a visually distinct style (bold, dark color) compared to the preceding segments.

---

### Requirement 3: Results Count and Sort Control

**User Story:** As a shopper, I want to see how many results were found and sort them by different criteria, so that I can quickly find the most relevant products.

#### Acceptance Criteria

1. THE Search_Results_Page SHALL display the total result count and the current query in the format: `{N} results found for '{query}'`.
2. THE Sort_Control SHALL offer the following sort options: `Newest Arrivals`, `Price: Low to High`, `Price: High to Low`, `Top Rated`.
3. WHEN the user selects a sort option, THE Product_Grid SHALL re-render the product list in the selected order without a full page reload.
4. THE Sort_Control SHALL default to `Newest Arrivals` on initial page load.

---

### Requirement 4: Category Filter

**User Story:** As a shopper, I want to filter search results by category, so that I can narrow down products to a specific type.

#### Acceptance Criteria

1. THE Filter_Sidebar SHALL display a `CATEGORY` section listing all categories relevant to the current query results, each with a product count badge.
2. WHEN the user selects a category, THE Product_Grid SHALL update to show only products belonging to that category.
3. WHEN no category is selected, THE Filter_Sidebar SHALL treat `All [Query]` as the active default, showing all results.
4. THE Filter_Sidebar SHALL visually distinguish the active category from inactive ones.

---

### Requirement 5: Price Range Filter

**User Story:** As a shopper, I want to filter products by a price range in NPR, so that I can find products within my budget.

#### Acceptance Criteria

1. THE Filter_Sidebar SHALL display a `PRICE RANGE` section with a Price_Range_Slider showing minimum and maximum price handles.
2. THE Price_Range_Slider SHALL display the current selected range in the format `NPR {min} – NPR {max}`.
3. WHEN the user adjusts either handle of the Price_Range_Slider, THE Product_Grid SHALL update to show only products whose price falls within the selected range.
4. THE Price_Range_Slider SHALL initialize with a default range spanning the full price range of the current result set.
5. IF no products exist within the selected price range, THEN THE Product_Grid SHALL display an empty-state message: `No products match the selected filters.`

### Requirement 7: Material Filter

**User Story:** As a shopper, I want to filter products by material using checkboxes, so that I can find products made from specific materials.

#### Acceptance Criteria

1. THE Filter_Sidebar SHALL display a `MATERIAL` section with a checkbox list of available materials in the result set.
2. WHEN the user checks a material checkbox, THE Product_Grid SHALL update to show only products made from the selected material(s).
3. THE Filter_Sidebar SHALL support selecting multiple materials simultaneously, showing products that match any of the selected materials.
4. WHEN the user unchecks all material checkboxes, THE Product_Grid SHALL remove the material filter and show all results.

---

### Requirement 8: Rating Filter

**User Story:** As a shopper, I want to filter products by minimum star rating, so that I can find highly-rated products.

#### Acceptance Criteria

1. THE Filter_Sidebar SHALL display a `RATING` section with a selectable option for `4 Stars & Up`.
2. WHEN the user selects the rating filter, THE Product_Grid SHALL update to show only products with an average rating of 4.0 or above.
3. THE Filter_Sidebar SHALL visually indicate when the rating filter is active.
4. WHEN the user deselects the rating filter, THE Product_Grid SHALL remove the rating constraint and show all results.

---

### Requirement 9: Product Grid Display

**User Story:** As a shopper, I want to see search results displayed as a product grid using familiar product cards, so that I can browse and compare products easily.

#### Acceptance Criteria

1. THE Product_Grid SHALL display products using the existing `app-product-card` component, passing `image`, `name`, `subtitle`, `price`, and `discount` inputs.
2. THE Product_Grid SHALL render in a 4-column layout on desktop (≥1024px), a 2-column layout on tablet (≥640px), and a 2-column layout on mobile (<640px).
3. WHEN Active_Filters change, THE Product_Grid SHALL update the displayed products without a full page reload.
4. WHEN the result set is empty after filtering, THE Product_Grid SHALL display the message: `No products match the selected filters.`

---

### Requirement 10: Pagination

**User Story:** As a shopper, I want to navigate between pages of search results, so that I can browse all matching products without being overwhelmed.

#### Acceptance Criteria

1. THE Pagination SHALL display previous and next navigation controls, numbered page buttons, and an ellipsis (`...`) for large page ranges.
2. WHEN the user clicks a page number, THE Product_Grid SHALL update to display the products for that page and THE Pagination SHALL highlight the active page.
3. WHEN the user is on the first page, THE Pagination SHALL disable the previous control.
4. WHEN the user is on the last page, THE Pagination SHALL disable the next control.
5. THE Search_Results_Page SHALL display a maximum of 16 products per page.

---

### Requirement 11: Combined Filter Behavior

**User Story:** As a shopper, I want all active filters to work together simultaneously, so that I can precisely narrow down results using multiple criteria at once.

#### Acceptance Criteria

1. WHEN multiple filters are Active_Filters simultaneously, THE Product_Grid SHALL display only products that satisfy all active filter conditions.
2. WHEN any Active_Filter changes, THE Pagination SHALL reset to page 1.
3. WHEN the sort order changes, THE Pagination SHALL reset to page 1.

---

### Requirement 12: Responsive Layout

**User Story:** As a shopper on a mobile device, I want the search results page to be usable on small screens, so that I can search and filter products from my phone.

#### Acceptance Criteria

1. WHILE the viewport width is less than 1024px, THE Filter_Sidebar SHALL be hidden by default and accessible via a toggle button.
2. WHEN the user taps the filter toggle button on mobile, THE Filter_Sidebar SHALL appear as an overlay or slide-in panel.
3. WHILE the viewport width is 1024px or greater, THE Filter_Sidebar SHALL be visible as a persistent left sidebar alongside the Product_Grid.
