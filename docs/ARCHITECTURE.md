# Architecture Documentation

This document explains the software design, code organization, data flow, and scalability practices for the **SM Tours & Travels** lead generation application.

---

## 1. Directory Structure

Modularity and separation of concerns are critical to prevent codebloat and ensure a frictionless transition to dynamic server APIs later. The application uses a feature-sliced layout:

* **`src/types.ts`**: The central schema of the application. Having a single source of truth for the types (`AppContent`, `TourPackage`, `BusinessInfo`, `LeadSubmission`, etc.) forces strict type-safety across the content stores, components, and form modules.
* **`src/data/`**: Keeps static default collections separate from the UI. Features reference this for initial visual loads.
* **`src/lib/`**: Contains side-effects and backend transaction mockups. `contentStore.ts` houses transaction wrappers for writing and reading from storage. `seo.ts` governs head injection systems to update metatags and structured schemas programmatically.
* **`src/components/`**: Standard stateless layouts (Header, Footer) and persistent items (FloatingCTA).
* **`src/features/`**: Represents distinct visual boundaries of user interactions. Each feature (home, packages, services, about, contact, cms) is self-contained.

---

## 2. Dynamic Data Lifecycle & Flow

The application moves data through a unidirectional flow utilizing standard React state initialized from transactional cached storage:

```text
                  +--------------------------------+
                  |    src/data/defaultContent.ts  | (Coded default catalog fallback)
                  +---------------+----------------+
                                  |
                                  v
                  +---------------+----------------+
                  |     src/lib/contentStore.ts    | (LocalStorage layer)
                  +---------------+----------------+
                                  |
                                  v
                  +---------------+----------------+
                  |         src/App.tsx            | (Holds reactive global state)
                  +---------------+----------------+
                                  |
            +---------------------+---------------------+
            |                     |                     |
            v                     v                     v
  +---------+---------+ +---------+---------+ +---------+---------+
  |  HomeSection.tsx  | | PackagesSection.tsx| |   CmsSection.tsx   |
  +---------+---------+ +---------+---------+ +---------+---------+
            |                     |                     |
            | (Triggers Modal)    | (Inquiry Request)   | (Modifies state & updates store)
            +----------+----------+                     |
                       |                                |
                       v                                v
         +-------------+-------------+    +-------------+-------------+
         |   LeadInquiryModal.tsx    |    |   saveAppContent(updated) |
         +-------------+-------------+    +-------------+-------------+
                       |                                |
                       v                                v
         +-------------+-------------+    +-------------+-------------+
         |    addSubmission(data)    |    |  App state reloads        |
         +---------------------------+    +---------------------------+
```

1. **Bootstrap**: `App.tsx` calls `getAppContent()`. If browser storage has no existing `sm_tours_content`, the store initializes using `defaultContent.ts`.
2. **Global Update**: If the proprietor modifies a package or phone number in `CmsSection.tsx`, it calls `saveAppContent(updated)`. The callback `onContentChange()` triggers a state refresh inside `App.tsx`, immediately syncing other sections (Header, Footer, Tour lists) in real-time.
3. **Leads Capture**: Filing a contact inquiry flows elements through `addSubmission()`, which prepends records into local storage, ensuring the lead persists and appears immediately inside the proprietor's Inbox Leads view.

---

## 3. Dynamic Search Engine Optimization (SEO) & Structured Data

Rather than relying on static Next.js server pre-rendering for meta files, we achieve optimized SEO capabilities dynamically in our single-page application:

* **Dynamic Schema JSON-LD**: When `App.tsx` initializes or changes tabs, `injectStructuredSchema()` appends a `<script type="application/ld+json">` tag targeting the `TravelAgency` structure directly into the document head. This allows search crawler bots to parse local phone, address coordinates, and founder indicators.
* **Page Metatags Translation**: Changing nav tabs triggers a `useEffect` inside `App.tsx` which mutates `document.title` and updates standard OpenGraph (`og:title`, `og:image`) and Twitter Card elements in the page header programmatically.
* **Sitemap and Robots**: Served immediately at the root (`/sitemap.xml` and `/robots.txt`) from the public directory.

---

## 4. Architectural Readiness for Booking Systems Integration

This codebase requires zero layout changes to move from a basic lead-generator to a fully automated reservation engine:

```text
                             CURRENT PERSISTENCE
                               [LocalStorage]
                                     |
                                     |  (Step 1: Replace storage layer with fetch APIs)
                                     v
                             FUTURE PERSISTENCE
                        [FastAPI/Express Server Engine]
                                     |
                  +------------------+------------------+
                  |                                     |
                  v (SQL Drizzle ORM queries)           v (SaaS Multi-tenant routes)
         +--------+--------+                   +--------+--------+
         |  PostgreSQL DB  |                   |  Stripe Gateway |
         +-----------------+                   +-----------------+
```

* **Step 1: REST API Layer**: Swap local storage requests inside `src/lib/contentStore.ts` with authentic asynchronous `fetch()` or `axios` queries targeting backing express APIs (e.g. `GET /api/packages` and `POST /api/leads`).
* **Step 2: Database Migration**: Establish Postgres collections tracking accounts, bookings, and payments. The `LeadSubmission` type maps directly to a relational structure:
  ```typescript
  export interface Booking {
    id: string;
    userId: string;
    packageId: string;
    travelDate: Date;
    passengersCount: number;
    paymentStatus: 'pending' | 'completed' | 'refunded';
  }
  ```
* **Step 3: Gateway Integration**: Build server route proxying Stripe or Razorpay payments, resolving packages prices from database states rather than client structures to secure checkouts.
