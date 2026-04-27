# Tech Stack

## Core

- **Framework**: Angular 21 (standalone components, no NgModules)
- **Language**: TypeScript ~5.9
- **Styling**: SCSS + Tailwind CSS v3
- **UI Components**: Flowbite (initialized via `initFlowbite()` on app init)
- **Carousel**: Swiper v12 (used as custom element via `CUSTOM_ELEMENTS_SCHEMA`)
- **Reactive primitives**: RxJS ~7.8, Angular `signal()`
- **Routing**: Angular Router
- **Font**: Inter (Google Fonts)

## Build & Tooling

- **Build system**: Angular CLI v21 (`@angular/build:application`)
- **Package manager**: npm 11
- **Test runner**: Vitest v4
- **Linter/Formatter**: Prettier (printWidth: 100, singleQuote: true, angular HTML parser)
- **CSS processing**: PostCSS + Autoprefixer

## Common Commands

```bash
# Dev server (run manually — do not use in automated scripts)
ng serve                        # http://localhost:4200

# Build
ng build                        # production build → dist/
ng build --configuration development

# Tests (use --run for single execution, not watch mode)
ng test

# Code generation
ng generate component path/to/component-name
ng generate service path/to/service-name
```

## Notes

- Default component style is SCSS (configured in `angular.json`)
- Swiper CSS is imported globally in `angular.json` styles array
- Flowbite is lazy-loaded only in browser context (SSR-safe guard via `isPlatformBrowser`)
