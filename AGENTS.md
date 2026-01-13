# Project: Abolish Abortion Georgia

## Project Overview

This is a SvelteKit web application for "Abolish Abortion Georgia," a movement dedicated to the complete abolition of abortion in Georgia. The application serves as an informational and mobilization hub for activists.

The main technologies used are:
- **Framework**: SvelteKit
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Mapping**: Leaflet.js with OpenStreetMap tiles
- **Geospatial Analysis**: Turf.js

The project's architecture is a standard SvelteKit application with routes for different pages. The most complex feature is the "Who Do I Call" page (route: /form), which uses Leaflet.js and Turf.js to create an interactive map that allows users to find their elected representatives based on their ZIP code.

## Building and Running

### Development

To run the development server:

```sh
npm install
npm run dev
```

### Building

To create a production build:

```sh
npm run build
```

This will create a static site in the `docs` directory, configured for deployment to GitHub Pages.

### Checking

To run the type checker and linter:

```sh
npm run check
```

## Development Conventions

- **Styling**: The project uses Tailwind CSS for styling. Utility classes are used directly in the Svelte components.
- **Data**: The application relies on several JSON files located in the `static/data` directory. These files contain information about elected representatives, points of contact, and GeoJSON data for electoral districts.
- **Mapping**: The interactive map is built using Leaflet.js. The `form` page contains the logic for geocoding, district lookup, and map rendering.
- **State Management**: The project uses Svelte's built-in state management capabilities (`$state`).
