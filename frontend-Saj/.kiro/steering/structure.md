# Project Structure

```
src/
  app/
    core/               # App-wide singletons: services, guards, interceptors (currently empty)
    features/           # Feature modules, each self-contained
      home/
        components/     # Feature-specific components (hero-section, categories-section, etc.)
        pages/          # Routable page components (home/)
      cart/             # Cart feature (in progress)
    layouts/            # Shell components used in routing
      base/             # Base layout wrapping routed pages (header + router-outlet + footer)
      header/
      footer/
    shared/
      components/       # Reusable components (product-card, search-box)
      pipes/            # Shared pipes
    app.ts              # Root component
    app.routes.ts       # Route definitions
    app.config.ts       # App-level providers
  styles.scss           # Global styles (Tailwind directives + font import)
public/
  images/               # Static assets served at root (reference as /images/...)
```

## Conventions

- **Standalone components only** — no NgModules. Every component declares its own `imports: []`.
- **File naming**: kebab-case for folders and files; class name matches filename in PascalCase (e.g. `hero-section.ts` → `export class HeroSection`).
- **Each component lives in its own folder** containing `.ts`, `.html`, `.scss`, and `.spec.ts`.
- **Routing pattern**: Layout components (e.g. `Base`) are parent routes; page components are children.
- **Selector prefix**: `app-` (e.g. `app-hero-section`, `app-product-card`).
- **Ngrx Signals** preferred over class properties for reactive state (`signal from ngrx signal).
- **Dependency injection**: use `inject()` function rather than constructor injection where possible.
- **Images**: stored in `public/images/`, referenced as `/images/filename.ext` (no `assets/` prefix).
- **Tailwind** is the primary styling approach; component SCSS is for structural or complex styles not easily expressed in utility classes.
