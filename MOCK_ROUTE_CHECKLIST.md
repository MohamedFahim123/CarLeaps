# CarLeaps Mock API Route Checklist

Default mode: `NEXT_PUBLIC_DATA_MODE=mock` (mock when unset). Set `NEXT_PUBLIC_DATA_MODE=api` to hit the live admin API.

## Auth credentials (mock)

| Field | Value |
|-------|-------|
| Email | `dealer@carleaps.com` |
| Password | `Demo@1234` |
| Dealer | Demo Motors (id `1`) |

## Persistence

- Client mutations persist to `localStorage` key `carleaps_mock_db_v1`
- Server/SSR uses in-memory singleton (reseeded per process)
- `resetMockDb()` restores seed data and rewrites storage

## Classification legend

- **Public** — no auth
- **Dealer** — Bearer token required
- **Auth** — login/register/forget/reset (no bearer)

## GET routes

| Route | Class | Mock service / source | Notes |
|-------|-------|----------------------|-------|
| `/cities` | Public | `db.cities` | |
| `/interests` | Public | `db.interests` | |
| `/research-makes` | Public | `db.researchMakes` | Nested models/trims/gallery/warranties/dealers/cars |
| `/authorized-cars` | Public | `db.authorizedCars` | New + Certified listing cars |
| `/featured-items` | Public | `db.featuredItems` | |
| `/ad-states` | Public | `db.adStates` | |
| `/models` | Public | `db.models` | |
| `/trims` | Public | `db.trims` | Features grouped by type |
| `/bodies` | Public | `db.bodies` | |
| `/countries` | Public | `db.countries` | |
| `/programs` | Public | `db.cpoPrograms` | CPOCarsMakes shape |
| `/features` | Public | `db.features` | comfort/seats/safety/entertainment |
| `/footer-taps` | Public | `db.footerTaps` | |
| `/fuel-types` | Public | `db.fuelTypes` | |
| `/makes` | Public | `db.makes` | |
| `/transmissions` | Public | `db.transmissions` | |
| `/years` | Public | `db.years` | |
| `/conditions` | Public | `db.conditions` | Returns `{ data: { condition: [...] } }` |
| `/dealer/profile` | Dealer | `db.dealers` | `{ data: { dealer } }` |
| `/dealer/active-cars` | Dealer | `db.dealerActiveCars` | Paginated `{ cars, meta, links, pages }` |
| `/dealer/pending-cars` | Dealer | `db.dealerPendingCars` | Paginated |
| `/dealer/deactive-cars` | Dealer | `db.dealerDeactiveCars` | Paginated |
| `/dealers/:id` | Public | `db.dealers` + cars | Full dealer + owned cars |

## POST routes

| Route | Class | Mock service / source | Notes |
|-------|-------|----------------------|-------|
| `/cars` | Public | `db.cars` + bodies/models/makes | Filters from body (condition/make/model/fuel/body/ad_state) |
| `/cpo-cars` | Public | cars grouped by body | Optional `make_id` |
| `/research-bodies` | Public | `db.researchBodies[make_id]` | |
| `/dealer/login` | Auth | sessions map | `dealer@carleaps.com` / `Demo@1234` → token; wrong → 422 |
| `/dealer/register` | Auth | creates dealer + token | |
| `/dealer/logout` | Dealer | clears session | |
| `/dealer/store-car` | Dealer | pending + cars list | Multipart/JSON body accepted |
| `/dealer/update-profile` | Dealer | mutates dealer | Persists to storage |
| `/dealer/search-active-cars` | Dealer | filter by name | |
| `/dealer/search-pending-cars` | Dealer | filter by name | |
| `/dealer/search-deactive-cars` | Dealer | filter by name | |
| `/get-cities` | Public | filter by `country_id` | |
| `/get-model` | Public | filter by `make_id` | |
| `/get-trim` | Public | filter by `model_id` | |
| `/find-car` | Public | success message | |
| `/sell-car` | Public | success message | |
| `/cars/perfect/match/search` | Public | models list | `{ models, current_page, last_page }` |
| `/car/show` | Public | car by id or slugified name | `{ car, related_cars }` |
| `/dealer/forget-password` | Auth | issues reset token | Token returned in mock for UX |
| `/dealer/reset-password` | Auth | token + password | Updates dealer password |

## Wiring

| Layer | File | Role |
|-------|------|------|
| Mode | `app/lib/config/dataMode.ts` | `isMockMode()` |
| DB | `app/lib/mock/db.ts` | Seed + persistence |
| Handlers | `app/lib/mock/handlers.ts` | Axios + Fetch |
| Install | `app/lib/mock/install.ts` | Axios adapter intercept |
| Barrel | `app/lib/mock/index.ts` | Public exports |
| Side-effect | `app/utils/mainData.ts` | Imports install |
| SSR | car-details + dealer pages | `handleMockFetch` when mock |

## Validation

### `npx tsc --noEmit`

**PASS** (exit 0) — no TypeScript errors.

### `npm run build`

**PASS** (exit 0) — Next.js 16.4.3 compiled successfully.

Notes from build (pre-existing / environmental, not introduced by mock layer):
- React 18 deprecation warning under Next 16 (project still on React 18 by design)
- Middleware → proxy migration warning
- Sass `@import` deprecation in `public/main.scss`

### Hydration

Footer and other region links read `js-cookie` during render. The server has no cookie (falls back to London) while the browser cookie is `riyadh`. Those links now use `useRouteRegion()` (`app/hooks/useRouteRegion.ts`), which reads the `[region]` URL segment. Store region defaults to `London` and the cars layout syncs it to the URL after mount.
