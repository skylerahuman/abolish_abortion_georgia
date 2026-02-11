# Tech Stack - Abolition Georgia

## Core Framework
*   **SvelteKit 2:** Chosen for its performance, ease of use, and excellent support for static site generation (SSG).
*   **TypeScript:** Used in strict mode for robust type safety across the application.

## Frontend & Styling
*   **Svelte 5:** The underlying component framework.
*   **Tailwind CSS 4:** For rapid, utility-first styling and a modern design system.

## Geospatial & Mapping
*   **Leaflet.js:** The primary mapping library for the "Who Do I Call" feature.
*   **OpenStreetMap:** Source for map tiles.
*   **Turf.js:** For client-side geospatial operations (e.g., point-in-polygon checks).
*   **Nominatim API:** For geocoding (address to coordinates).

## Data & Storage
*   **Local JSON/GeoJSON:** Data is stored statically to ensure high performance and simplify hosting on GitHub Pages.
*   **Stateless Architecture:** No backend or database is required for the core representative lookup.

## Testing
*   **Vitest:** The primary testing framework for unit and component tests.
*   **Svelte Testing Library:** For testing Svelte components in a simulated browser environment (jsdom).

## Deployment & Build
*   **Adapter Static:** Configured for deployment to static hosting environments (GitHub Pages).
*   **Vite:** The build tool and development server.
