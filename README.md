# Konvertr

A fast, accessible, internationalized kilometer ↔ mile converter.

**[Live Demo](https://konvertr.netlify.app)** · Built as a technical assessment response

---

## Tech Stack

| Layer                  | Technology                                 |
| ---------------------- | ------------------------------------------ |
| Framework              | React 19 + Vite 6 + TypeScript (strict)    |
| Styling                | Tailwind CSS v4                            |
| i18n                   | react-i18next + i18next                    |
| Unit/integration tests | Vitest + React Testing Library             |
| E2e tests              | Playwright                                 |
| Accessibility          | eslint-plugin-jsx-a11y + axe-core          |
| Code quality           | ESLint 10 + Prettier + Husky + lint-staged |
| CI                     | GitHub Actions                             |
| Deployment             | Netlify (static)                           |

---

## Getting Started

```bash
npm install --legacy-peer-deps
npm run dev
```

---

## Commands

```bash
npm run dev              # Vite dev server
npm run build            # Production build
npm run preview          # Preview production build locally

npm run typecheck        # tsc type-check (no emit)
npm run lint             # ESLint (0 warnings allowed)
npm run format           # Prettier write
npm run format:check     # Prettier check (used in CI)

npm run test             # Vitest unit + integration tests
npm run test:watch       # Vitest watch mode
npm run test:coverage    # Vitest with 100% coverage enforcement

npm run test:e2e         # Playwright (builds first)
npm run test:e2e:ui      # Playwright interactive UI
```

To run a single test file:

```bash
npx vitest run src/utils/conversion.test.ts
npx playwright test tests/converter.spec.ts
```

---

## Test Suite

Three layers of testing:

**Unit tests** (`src/utils/conversion.test.ts`, `src/types/index.test.ts`, `src/i18n/index.test.ts`)
Pure logic: conversion math, locale configuration, type constants.

**Integration tests** (`src/**/*.test.tsx`)
Component behavior via React Testing Library. Every component is tested for correct rendering, interaction (using `userEvent`), i18n output, and accessibility via `axe-core` scans. 100% coverage is enforced as a CI gate.

**End-to-end tests** (`tests/`)
Full user flows in Chromium, Firefox, and Mobile Chrome via Playwright. Includes axe-core accessibility scans at the page level, RTL layout verification, and keyboard navigation.

---

## Accessibility

Accessibility is a first-class concern:

- **ESLint**: `eslint-plugin-jsx-a11y` runs on all TSX files with recommended rules
- **axe-core**: Every component integration test includes an automated axe scan; e2e tests scan the full page in LTR and RTL layouts
- **Semantic HTML**: `<fieldset>`/`<legend>` for the radio group, `<output aria-live="polite" aria-atomic="true">` for the result so screen readers announce updates without focus movement
- **RTL support**: Tailwind `rtl:` variants + CSS logical properties (`ps-`, `pe-`, `ms-`, `me-`); `document.documentElement.dir` and `lang` are updated reactively
- **Color contrast**: Deep indigo (`#3730a3`) on white background exceeds WCAG AA 4.5:1 for all body text
- **Keyboard navigation**: Full form operability without a mouse, verified in Playwright e2e tests

---

## Internationalization

Five locales with locale-accurate unit spelling:

| Code    | Language      | Unit spelling |
| ------- | ------------- | ------------- |
| `en`    | English (US)  | kilometer     |
| `en-GB` | English (UK)  | kilometre     |
| `es`    | Español       | kilómetro     |
| `fr`    | Français      | kilomètre     |
| `ar`    | العربية (RTL) | كيلومتر       |

Language preference is persisted in `localStorage`. Switching to Arabic flips the `dir` attribute on `<html>` to `rtl`.

---

## Code Quality

**Pre-commit hooks** (Husky + lint-staged) run ESLint, Prettier, and `tsc` on every commit.

**CI pipeline** (GitHub Actions) on every push:

1. `tsc` type-check
2. ESLint (0 warnings)
3. Prettier format check
4. Vitest with 100% coverage
5. Vite production build
6. Playwright e2e (Chromium + Firefox)

---

## Deployment

Deploys automatically to Netlify on merge to `main`. Build command: `npm run build`. Publish directory: `dist`.

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"
```

---

## Conversion Factor

`1 mile = 1.60934 km`

All rounding is done in the UI layer (`formatResult` in `src/utils/conversion.ts`) — the core math functions return full floating-point precision.
