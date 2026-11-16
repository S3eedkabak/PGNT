# PNGIT · draft1

A responsive rebrand of [pngit.edu.sa](https://pngit.edu.sa/), using the institute’s teal/orange identity, original photography and logo, and the supplied 2026 profile and training list.

## Run

Requires Node.js 22.18+ (or a newer maintained release).

```sh
npm ci
npm run dev
```

Use the Local URL Vite prints. Build with `npm run build`; serve the production build with `npm run preview`. The production output is a static `dist/` directory and can be hosted at the root of any static host. It does not replace PNGIT’s WordPress site or student portal.

## Experience

- Industry programs, corporate training, institute overview, accreditations, FAQs, and contact information.
- Searchable catalogue with categories, duration filters, pagination, detailed course dialogs, and saved courses.
- All 195 original training rows remain traceable; exact title/duration duplicates consolidate into 178 listings. Source PDFs are bundled and linked from course details.
- Saved courses and enquiry drafts persist on the visitor’s device. Drafts can be restored, updated, and cleared.
- Enquiries open an email draft for the visitor to review and send. Nothing is silently submitted.
- Student login hands off to the existing PNGIT portal. This frontend does not collect credentials or create an independent authentication system.
- Statistics use the original website’s published figures and catalogue counts. There is no invented live data feed.

## Required components

All seven supplied references are implemented from their public source, with brand, accessibility, and product-specific adaptations. See [component mapping and attribution](docs/SOURCES.md).

## Verification

```sh
npm test
npm run build
```

`npm test` validates source-row coverage, featured-course facts, duplicate integrity, duration formats, bundled assets, and core colour contrast. For the opt-in development accessibility audit, visit `/?audit=1` and inspect the browser console for `PNGIT_ACCESSIBILITY_AUDIT`. Press Alt+Shift+A to audit an open panel. This audit module is excluded from the production build.

See [the good/bad evaluation and browser checks](docs/EVALUATION.md). Review screenshots are in `docs/screenshots/`.
