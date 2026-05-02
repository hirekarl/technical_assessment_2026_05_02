# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Konvertr** — a km ↔ mi unit converter web app built as a technical assessment response. Intentionally over-engineered to demonstrate professional engineering practices. See `SPECIFICATION.md` for the original prompt and `BOOTSTRAPPING.md` for the full tech/tooling requirements.

## Tech Stack

- **Framework**: React 19 + Vite 6 + TypeScript (strict)
- **Styling**: Tailwind CSS v4 with `@tailwindcss/vite` plugin — CSS-first config, `rtl:` variants
- **i18n**: `react-i18next` + `i18next` + `i18next-browser-languagedetector`
- **Unit/integration tests**: Vitest + React Testing Library (jsdom)
- **Coverage**: `@vitest/coverage-v8` — enforced at 100%
- **E2e tests**: Playwright + `@axe-core/playwright`
- **A11y linting**: `eslint-plugin-jsx-a11y` (strict)
- **Pre-commit**: Husky + lint-staged (ESLint + Prettier + `tsc`)
- **CI**: GitHub Actions (`.github/workflows/ci.yml`)
- **Deploy**: Netlify static (`netlify.toml`, `dist/`)

## Commands

```bash
npm install --legacy-peer-deps   # eslint-plugin-jsx-a11y hasn't declared ESLint 10 as peer dep yet
npm run dev                      # Vite dev server
npm run build                    # tsc -b && vite build
npm run preview                  # Preview production build on :4173

npm run typecheck                # tsc -b (no emit)
npm run lint                     # ESLint, 0 warnings allowed
npm run lint:fix                 # ESLint --fix
npm run format                   # Prettier --write
npm run format:check             # Prettier --check (CI gate)

npm run test                     # Vitest run (unit + integration)
npm run test:watch               # Vitest watch mode
npm run test:coverage            # Vitest with 100% threshold enforcement

npm run test:e2e                 # Playwright (builds + starts preview first)
npm run test:e2e:ui              # Playwright interactive UI
```

To run a single test file:

```bash
npx vitest run src/utils/conversion.test.ts
npx playwright test tests/converter.spec.ts
```

## Architecture

**Conversion logic** — `src/utils/conversion.ts` — pure math, no React. `KM_PER_MILE = 1.60934`. Rounding to 4 decimal places happens in `formatResult`, not in the core math functions.

**i18n** — `src/i18n/index.ts` initialises i18next with all 5 locale bundles loaded synchronously (no async backend). Locale preference is persisted in `localStorage` under key `konvertr-lang`. 5 locales: `en`, `en-GB`, `es`, `fr`, `ar`.

**RTL** — `App.tsx` `useEffect` watches `i18n.language` and sets `document.documentElement.dir` and `document.documentElement.lang` reactively. Tailwind `rtl:` variants and logical property utilities (`ps-`, `pe-`, `ms-`, `me-`, `text-start`) handle layout flipping without any JS.

**Number input** — always rendered with `dir="ltr"` even in RTL mode, so numerals display correctly regardless of page direction.

**Result output** — `<output aria-live="polite" aria-atomic="true">` so screen readers announce new values without requiring focus movement. Displays `—` for empty or NaN input.

**Direction toggle** — `<fieldset>`/`<legend>` wrapping two radio inputs styled via wrapping `<label>` elements. Inputs are `sr-only`; the visible labels are the click targets. In Playwright tests, click the label (`label:has(input[value="miToKm"])`) not the hidden input.

**Test utilities** — `src/test-utils.tsx` wraps `@testing-library/react`'s `render` in an `I18nextProvider` and sets up `userEvent`. Import from `@/test-utils` in all component tests; re-exports everything from `@testing-library/react`.

**Coverage exclusions** — `src/main.tsx` (DOM bootstrap) and `src/test-setup.ts` are excluded from the 100% threshold.

**CI gate order** — typecheck → lint → format:check → test:coverage → build → playwright e2e (Chromium + Firefox).
