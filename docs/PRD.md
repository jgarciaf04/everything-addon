# Everything Addon - Product Requirements Document

## 1. Product Overview

Everything Addon is a website functioning as an online store for Minecraft Bedrock Edition addons. Users browse a catalog of available addons, add individual addons to a cart, preview their selection, and receive a generated custom addon pack combining their chosen items.

**This is a Proof of Concept (POC) / mockup.** No real backend exists. All addon data, pricing, file references, and download behavior are static and mocked. Implementers MUST NOT treat any part of this system as production-ready or connected to live services.

### Key Objectives

- Demonstrate the full user journey from browsing to simulated download using only static assets.
- Establish the visual design language and page structure for a future production implementation.
- Validate the addon catalog schema and UI patterns before investing in real backend infrastructure.

---

## 2. Technical Stack

All stack decisions are final constraints, not recommendations.

| Layer | Technology | Notes |
|-------|------------|-------|
| Site generator | Astro | Static output only |
| Hosting | Cloudflare Pages | Serves static build artifacts |
| Data layer | Static mock JSON files | No database, no API, no server-side logic |
| Language | English only | No i18n support, no locale switching |

---

## 3. Pages and Features

The site MUST consist of exactly five pages. All pages MUST share a persistent navigation header that includes links to the Landing Page, Addon Catalog Page, and Cart Page, plus a cart item count indicator. Each page is described below with its required content and behavior.

### 3.1 Landing Page

**Purpose**: Introduce the product and direct users to the addon catalog.

**Required Elements**:
- Hero banner containing Minecraft-themed visuals, a headline, and a subheadline describing the product value proposition.
- Features section listing the selling points of the addon store (minimum three distinct feature highlights).
- A primary call-to-action (CTA) button that navigates the user to the Addon Catalog Page.

**Acceptance Criteria**:
- [ ] The hero banner is visible on page load without scrolling on both mobile and desktop viewports.
- [ ] The features section displays a minimum of three feature highlights.
- [ ] The CTA button navigates to the Addon Catalog Page when clicked.
- [ ] No broken image references exist on the page.

---

### 3.2 Addon Catalog Page

**Purpose**: Allow users to browse, filter, and search available addons, and add them to their cart.

**Required Elements**:
- A grid displaying between 15 and 20 mock addon cards.
- Each addon card MUST show: thumbnail image, addon name, type badge, short description, price, and an "Add to Cart" button.
- A filter control allowing users to filter the grid by type: `mob`, `item`, `block`, `system`. Selecting a type shows only addons of that type. A default "All" state shows every addon.
- A search bar that filters the visible grid in real time by matching the user's input against addon name, short description, and tags fields.

**Acceptance Criteria**:
- [ ] The grid renders between 15 and 20 addon cards on initial load with no filter or search active.
- [ ] Each card displays all six required elements: thumbnail, name, type badge, short description, price, "Add to Cart" button.
- [ ] Selecting a type filter reduces the grid to only cards matching that type.
- [ ] Selecting "All" (or clearing the type filter) restores all cards.
- [ ] Entering text in the search bar filters cards to those whose name, short description, or tags contain the entered text (case-insensitive).
- [ ] Combining a type filter and a search term applies both constraints simultaneously.
- [ ] Clicking "Add to Cart" on a card adds that addon to the cart state. The button MUST reflect an "added" state if the addon is already in the cart (e.g., disabled or label change).
- [ ] Clicking an addon card (outside the "Add to Cart" button) navigates to that addon's Detail Page.

---

### 3.3 Addon Detail Page

**Purpose**: Display full information about a single addon.

**Required Elements**:
- Full (long) description of the addon.
- Screenshot gallery displaying 2 to 3 mock images with navigation between them.
- Specs section displaying: Minecraft version compatibility, category/type, and file size.
- Price display.
- "Add to Cart" button with the same added/not-added state behavior as on the Catalog Page.

**Acceptance Criteria**:
- [ ] The page is reachable from the Addon Catalog Page by clicking an addon card.
- [ ] The page URL MUST include the addon's `slug` field as a path parameter.
- [ ] The long description is rendered (supports line breaks).
- [ ] The gallery displays 2 to 3 images and provides a mechanism to navigate between them.
- [ ] The specs section displays MC version, category, and file size values sourced from the mock data.
- [ ] The price is displayed.
- [ ] Clicking "Add to Cart" adds the addon to the cart state.
- [ ] If the addon is already in the cart, the button reflects an "added" state.

---

### 3.4 Cart Page

**Purpose**: Display the user's selected addons and allow them to proceed to the preview and generation step.

**Required Elements**:
- A list of all addons currently in the cart. Each list item MUST show: addon name, price, and a remove button.
- A total price value calculated as the sum of all addon prices in the cart.
- A "Preview & Generate" button that navigates to the Preview & Download Page.

**Acceptance Criteria**:
- [ ] The page displays all addons currently in the cart.
- [ ] Each cart item shows the addon name and price.
- [ ] Clicking the remove button on a cart item removes that addon from the cart and updates the list and total immediately without a page reload.
- [ ] The total price reflects the sum of all current cart item prices.
- [ ] If the cart is empty, the page displays an empty state message and the "Preview & Generate" button is disabled or hidden.
- [ ] Clicking "Preview & Generate" navigates to the Preview & Download Page.

---

### 3.5 Preview & Download Page

**Purpose**: Present a final summary of selected addons and simulate the addon pack generation and download.

**Required Elements**:
- A summary list of all addons included in the generated pack.
- A visual preview element representing the combined addon pack.
- A "Generate Addon" button that, when clicked, triggers a simulated generation process.
- A mocked success state displayed after the simulated generation completes, representing a successful download or pack creation.

**Acceptance Criteria**:
- [ ] The page displays the names of all addons in the current cart.
- [ ] The visual preview element is present on the page.
- [ ] Clicking "Generate Addon" triggers a visible loading or processing state.
- [ ] After the simulated process completes, a success state is displayed (e.g., a success message or mock download confirmation).
- [ ] No real file is generated or downloaded. The success state is entirely cosmetic and mocked.
- [ ] If the cart is empty when this page is reached, the page displays an appropriate empty state or redirects to the Cart Page.

---

## 4. Mock Addon Data Schema

All addon data MUST be stored as static JSON. Each addon is represented as a JSON object with a nested `description` object containing `short` and `long` sub-fields. The complete schema for each addon entry is defined below. All fields are required unless noted.

| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | Unique identifier used internally for cart state and data keying; not exposed in URLs |
| `name` | `string` | Display name shown on cards and detail pages |
| `slug` | `string` | URL-friendly identifier used in page routes; MUST be unique and contain only lowercase letters, digits, and hyphens |
| `type` | `"mob" \| "item" \| "block" \| "system"` | Category enum used for type badge and filter control |
| `description.short` | `string` | Brief description displayed on catalog cards |
| `description.long` | `string` | Full description displayed on the detail page |
| `price` | `number` | Mock price value; represents a fictional currency amount |
| `thumbnail` | `string` | Relative path to the card thumbnail image |
| `gallery` | `string[]` | Array of 2 to 3 relative paths to screenshot images |
| `tags` | `string[]` | Array of keyword strings included in search matching |
| `mcVersion` | `string` | Minecraft version compatibility string, e.g. `"1.20+"` |
| `fileSize` | `string` | Mock file size string, e.g. `"2.4 MB"` |

The data layer MUST contain between 15 and 20 addon entries to satisfy the catalog grid requirement. At least one entry of each type (`mob`, `item`, `block`, `system`) MUST be present.

---

## 5. Design Direction

All visual design decisions MUST follow the Minecraft-inspired aesthetic defined below. These are constraints, not suggestions.

| Attribute | Requirement |
|-----------|-------------|
| Visual style | Pixelated; textures and icons MUST use pixel-art style assets |
| Color palette | Earth tones (browns, tans, greens, grays) consistent with Minecraft's block palette |
| Typography | Minecraft-style fonts for headings and display text; legible system or web font acceptable for body text |
| UI elements | Block-like; rectangular components with sharp corners; no rounded buttons or card corners |
| Responsiveness | All five pages MUST render correctly on mobile (minimum 375px wide) and desktop (minimum 1280px wide) viewports |

---

## 6. Monetization Model

All pricing displayed in this POC is mocked. No real payment processing exists or is integrated.

- Addon prices are numeric mock values stored in the mock JSON data.
- The cart total is a calculated sum of mock prices.
- Payment gateways, checkout flows, and financial transactions of any kind MUST NOT be implemented in the POC.
- Any UI element that resembles a payment action (e.g., a "Buy" button) MUST either be absent or clearly non-functional in the POC scope.

---

## 7. Scope Boundaries

### In Scope

- Five static pages as defined in Section 3.
- Addon catalog rendered from static mock JSON.
- Client-side cart state (in-memory or browser storage; no server persistence required).
- Type filtering and name/short-description/tags search on the catalog.
- Addon detail pages with gallery and specs.
- Simulated generation and mocked download success state.
- Minecraft-inspired visual design system.
- Responsive layout for mobile and desktop.

### Out of Scope

The following MUST NOT be implemented in the POC:

- Real payment processing of any kind.
- Real addon file generation, merging, or packaging.
- User authentication, accounts, or session management.
- Database, API, or any server-side backend.
- Addon compatibility checking between selected items.
- Multi-language (i18n) support.
- Real `.mcaddon` file creation or download.
- Video previews or embedded video content.

---

## 8. Glossary

| Term | Definition |
|------|------------|
| Addon | A Minecraft Bedrock Edition modification package that alters game content such as mobs, items, blocks, or systems |
| Addon Pack | A combined bundle of multiple selected addons generated for a user |
| Cart | Client-side state holding the list of addons a user has selected for inclusion in their pack |
| Mock / Mocked | Data, behavior, or UI state that simulates a real system without any actual backend, file I/O, or network operation |
| POC | Proof of Concept; a non-production implementation used to validate design and user flow |
| Slug | A URL-safe string identifier derived from an addon's name, using only lowercase letters, digits, and hyphens |
| Type | The category of an addon, constrained to one of four values: `mob`, `item`, `block`, `system` |
| mcVersion | The minimum Minecraft Bedrock Edition version with which an addon is compatible |
