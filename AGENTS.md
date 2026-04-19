# Agent Guidelines for abolition-georgia

This document contains essential context, build/test commands, and code style guidelines for AI coding agents operating within the `abolition-georgia` repository.

## 1. Project Overview

- **Framework**: SvelteKit (using Svelte 5)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Vitest (Unit) & Playwright (E2E)
- **Map Integration**: Leaflet / Turf.js
- **Tooling**: Vite, ESLint, Prettier

## 2. Build, Lint, and Test Commands

### Development Server

- Start dev server: `npm run dev`

### Build and Type Checking

- Production build: `npm run build`
- Sync SvelteKit generated types: `npm run prepare`
- Type checking: `npm run check`
- Watch type checking: `npm run check:watch`

### Linting and Formatting

- Lint project: `npm run lint`
- Format code: `npm run format`

### Testing

- **Unit Testing (Vitest)**:
  - Run all unit tests: `npm run test:unit`
  - Run a single test file: `npx vitest run path/to/file.test.ts`
  - Run a specific test by name: `npx vitest run -t "test name"`
  - Run tests in watch mode: `npx vitest watch`
- **End-to-End Testing (Playwright)**:
  - Run all E2E tests: `npm run test`
  - Run a single E2E test file: `npx playwright test path/to/file.spec.ts`
  - Run E2E tests with UI: `npm run test:ui`

## 3. Code Style Guidelines

### 3.1. Formatting (Prettier)

- **Indentation**: Tabs (`useTabs: true`).
- **Quotes**: Single Quotes (`singleQuote: true`).
- **Trailing Commas**: None (`trailingComma: "none"`).
- **Line Length**: 100 characters max (`printWidth: 100`).

### 3.2. TypeScript & Linting (ESLint)

- **Strict Mode**: `tsconfig.json` enforces `"strict": true`.
- **No `any`**: Explicit `any` is forbidden (`@typescript-eslint/no-explicit-any`: 'error').
- **Unused Variables**: Prefix unused variables with an underscore `_`.

### 3.3. Svelte Specifics

- **Script Tags**: `<script lang="ts">`.
- **HTML Injection**: Avoid `{@html ...}` tags.
- **Routing**: Follow SvelteKit file-based routing: `+page.svelte`, `+page.ts`, `+layout.svelte`, `+server.ts`.
- **State Management**: Utilize Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`).

### 3.4. General Best Practices

- **Imports**: Group third-party imports, followed by `$lib/` aliases, then relative imports.
- **Naming**:
  - Components: PascalCase.
  - Variables/Functions: camelCase.
  - Types/Interfaces: PascalCase.
  - Constants: UPPER_SNAKE_CASE.

### 3.5. Error Handling

- Use standard `try/catch` for async operations.
- In SvelteKit, use `throw error(status, message)` from `@sveltejs/kit`.

## 4. Third-Party Libraries

- **Tailwind CSS**: Primary styling tool.
- **Leaflet & Turf**: Used for mapping functionalities.

## 5. Specific Rules

- Adhere strictly to the guidelines defined in this document.
