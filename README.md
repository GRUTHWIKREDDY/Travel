# SM Tours & Travels Website

A premium, production-ready lead generation website and content management platform built specifically for **SM Tours & Travels** (Hyderabad, India). 

Designed as a high-end luxury boutique interface, this project combines spectacular destination visual showcases with automated click-to-dial actions, pre-filled floating WhatsApp links, in-app client inquiry capture, and an **interactive visual CMS panel** for non-technical administrative owners.

---

## 🌟 Key Features

* **Luxury Brand Visuals**: Elegant sapphire and champagne gold themes mirroring top-tier agencies like MakeMyTrip, Thomas Cook, and SOTC. Fully fluid responsive layouts supporting high-contrast typography and royalty-free destination images.
* **Interactive Tours Portfolio**: Fully searchable, filterable, and sortable collection of 12 distinct domestic and international seasonal packages (including Kashmir, Kerala, Goa, Ladakh, Bali, Dubai, Singapore, and Europe highlighting packages).
* **Consulate Rejection Defense**: Focuses strongly on tourist visa formatting, tatkaal passport submissions, and multi-city flight reservation showcases.
* **Lead Generation CTAs**:
  * **Pre-filled Floating WhatsApp Widget**: Pings **+91 8977820246** with client information automatically organized.
  * **Dynamic Inquiry Form**: Populates destination fields directly from selected tourism cards and saves records locally.
* **Integrated Visual CMS Panel (Partner Portal)**: 
  * Gated with a password (`smtravels`) for proprietor access.
  * **Leads Inbox Manager**: View, filter status tags ('new', 'contacted', etc.), action one-click WhatsApp chats, or purge lead cards. Supports **direct CSV Export** of customer databases!
  * **Portfolio Content Customizer**: Update prices, duration strings, descriptions, and highlights, or instantly append extra sightseeing trips visually.
  * **Corporate Address Configuration**: Update official contact emails, phone mappings, and hero subtitles instantly.
  * **JSON Config Syncing**: Visual changes save immediately to `localStorage`. Owners can download an updated `content.json` file to keep edits permanent in static codebase references.

---

## 📁 Repository Folder Structure

The code is architected to prioritize modularity, Separation of Concerns (SoC), and high-velocity scaling in later phases:

```text
/
├── public/                 # Static SEO configurations
│   ├── sitemap.xml         # Auto-generated Search Engine Index list
│   └── robots.txt          # Standard search crawler rules
├── src/
│   ├── types.ts            # Type-safe contract for app content and leads
│   ├── main.tsx            # App bootstrapping entrypoint
│   ├── App.tsx             # Main Layout Stitching & Global state
│   ├── index.css           # Tailwind v4 import and custom typography variables
│   ├── components/         # Reusable global layouts and widgets
│   │   ├── Header.tsx      # Premium navigation with mobile hamburgers
│   │   ├── Footer.tsx      # Multi-column descriptive footnote with CMS trigger
│   │   ├── FloatingCTA.tsx # Click-to-call mobile and floating WhatsApp widgets
│   │   └── LeadInquiryModal.tsx # Multi-field custom quote lodging form
│   ├── data/
│   │   └── defaultContent.ts # High-fidelity baseline data matching client metrics
│   ├── features/           # Specialized tab layouts
│   │   ├── home/           # Landing showcases & testimonials & FAQs
│   │   ├── packages/       # Searchable & sortable catalogs
│   │   ├── services/       # Passport services and visa alignment blueprints
│   │   ├── about/          # History, mission, and leadership bios
│   │   ├── contact/        # Embedded maps, hours, phone arrays, and live intake
│   │   └── cms/            # Password-gated visual administration panel
│   └── lib/
│       ├── contentStore.ts # Local Storage transaction wrappers for CMS + Leads
│       └── seo.ts          # Page elements and dynamic structured local business schema
├── docs/                   # Exhaustive project documentation
│   ├── ARCHITECTURE.md     # Engineering outlays and data flows
│   ├── CONTENT_MANAGEMENT.md # Manual guide for proprietor content updates
│   └── FUTURE_ROADMAP.md   # Phased scaling blueprints for booking SaaS engine
├── package.json            # Node dependencies descriptor
└── vite.config.ts          # Vite asset bundling rules
```

---

## 🚀 Local Setup Instructions

Ensure you have **Node.js (v18+)** installed.

1. **Clone and Navigate**:
   ```bash
   cd sm-tours-travels
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Launces Dev Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` inside your browser to view the application.

4. **Verify Lints & Builds**:
   ```bash
   npm run build
   ```

---

## 🎨 Future Scaling Roadmap

The project is structured deliberately to evolve in three sequential milestones:
* **Phase 1 (Current)**: High-performance lead generation, visual CMS, and CSV data extraction.
* **Phase 2**: Relational database migration (Firebase Firestore or PostgreSQL via Drizzle), customer accounts, and inquiries tracking portal.
* **Phase 3**: Dynamic flight schedules API linkage, hotel booking, and Stripe/Razorpay payment gateway activation.
* **Phase 4**: Complete multi-tenant travel reservation SaaS engine.

*(For exhaustive architectural specifications, please consult the files inside the `docs/` folder.)*
