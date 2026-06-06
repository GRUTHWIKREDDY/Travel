# Future Technology Scaling Roadmap

This document maps the evolution of **SM Tours & Travels** from its current Phase 1 lead generation system into a complete Travel Agency SaaS Platform.

---

## Phase 1 (Current): High-Polished Lead Generator
* **Scope**: Luxury single-page client portfolio, organic search schema injection, WhatsApp pre-populated triggers, client inquiry lodgment, visual CMS dashboard, and CSV-based data backups.
* **Hosting**: Free static Cloud deployment (Vercel/Netlify for absolute speed and durability).

---

## Phase 2: Booking Engine, Auth & Local Relational Storage (Q3 2026)
Migrate the storage tier from simple browser-cache mechanisms (`localStorage`) to durable relational cloud database layers. This unlocks permanent client records, employee roles, and customized trip reservations.

### 1. Database Provisioning & Authentication
* Integrate **Firebase Authentication** or **Supabase Auth** to support client logins, Google OAuth Sign-ins, and employee roles.
* Establish secure relational database models (using Firestore or Postgres via Drizzle ORM):
  * **Users Table**: `id`, `name`, `email`, `role` (client, operator, admin)
  * **Inquiries Table**: `id`, `user_id`, `destination`, `num_passengers`, `status`
  * **Hotels Table**: `id`, `name`, `stars`, `location`, `b2b_tariff`

### 2. Quotation Drafting Board
* Introduce an Employee Role (for Sonika and operators) enabling them to visual-draft customized itineraries matching inquiry cards.
* Trigger automated PDF exports of proposed schedules to mail to clients with one click.

---

## Phase 3: Travel Portal & Live Inventory API Integrations (Q1 2027)
Transform the lead-generation layout into a fully transactional travel booking engine where clients browse live seat tariffs and pay on-the-spot.

### 1. Flights Search & Sabre/Amadeus GDS Connection
* Integrate global GDS flight booking API endpoints (Amadeus, Sabre, or Skyscanner) to search, hold, and ticket flight seats directly within the SM Tours interface.
* Create automated margins processing:
  * For domestic sectors, auto-apply a ₹500 agency markup.
  * For international sectors, auto-apply a 1.5% commission override.

### 2. Payment Gateway Activation
* Integrate Stripe, Razorpay, or PayU to handle instantaneous netbanking, credit cards, or UPI payments securely.
* On payment confirmation, execute booking calls to Sabre and trigger automated invoice delivery.

---

## Phase 4: Multi-Tenant Travel agency SaaS (Q4 2027)
Scale the architectural code to allow independent travel operators to create their own custom portals under a white-labeled subscription structure.

```text
                           +------------------------+
                           |  SM TOURS CENTRAL SaaS | (Root Multi-tenant Engine)
                           +-----------+------------+
                                       |
              +------------------------+------------------------+
              |                                                 |
              v                                                 v
   +----------+----------+                           +----------+----------+
   |   Tenant: HN Tours  | (Subdomain: hn.smtours.in)|   Tenant: SV Travels| (Subdomain: sv.smtours.in)
   +----------+----------+                           +----------+----------+
              |                                                 |
     - Custom Gold theme                              - Custom Indigo theme
     - HN Flight Operator Keys                        - SV Private local database
```

### 1. Multi-Tenant Subdomain Routing
* Deploy an Express/Next.js dynamic routing layer resolving tenancy dynamically based on headers:
  * Visited domain: `hn-tours.smtours.com` -> resolves matching tenant HN Tours visuals and database models.
  * Visited domain: `booking.travels.com` -> resolves SV configuration.

### 2. Vendor Customizer Panels
* Empower independent vendors to visually configure their custom domains, brand colors, payment accounts, flight API credentials, and package markups instantly.
* Charge monthly subscription fees processed via Stripe Billing subscription hooks.
