# Content Management System (CMS) Guide

This guide is written for the **SM Tours & Travels** agency owner (**Sonika**) to explain how to update website content, packages, and manage inquiry leads without developer intervention.

---

## 1. Accessing the Partner Portal (CMS Dashboard)

We have built a custom administration panel directly into your website. 

1. Scroll to the absolute bottom (footer) of any page on your website.
2. Click the text/button labeled **"Owner Dashboard & Content Editor"** (or click the **CMS Portal** button in the very top black bar on desktops).
3. A security overlay will appear asking you to **Enter Authorization Code**.
4. Type **`smtravels`** (all lowercase) and click **Access Administration**.
5. Once unlocked, your dashboard opens. Here you can coordinate all content.

---

## 2. Managing Client Inquiry Leads

Inside the **Inbox Leads** tab, you receive live data submitted by customers:

* **Review Leads**: Each card lists the client's Name, Phone Call Number, Email Address, Destination Category, proposed Travel Date, and their customized message.
* **Update Status**: You can update each lead's status directly from the dropdown menu (choose between *New Lead*, *Contacted Client*, *Followed Up*, or *Closed / Resolved*) to keep track of your operational workflows.
* **Instant WhatsApp Action**: Click the **"WhatsApp Client"** button. This automatically opens a chat with the client's phone number on your device, pre-formatting a friendly starting message: *"Hello [Name], I am Sonika from SM Tours. Received your tour inquiry for [Destination]..."*
* **Export to Excel/CSV**: Click the **"Export Leads to CSV"** button at the top to download your client database as a CSV file, which you can open directly in Excel or Google Sheets.
* **Purge Leads**: Click **"Delete Lead Log"** to permanently remove outdated inquiries from the screen.

---

## 3. Editing and Creating Tour Packages Visually

Under the **Tour Catalog Customizer** tab, you manage all 12 featured tours on the website:

### A. Editing an Existing Package:
1. Locate the package card you wish to modify (e.g., Kashmir Delight).
2. Click the small **Edit (pencil icon)** button.
3. An editable form unlocks. Here you can change:
   * **Title**: Alter names dynamically.
   * **Category**: Toggle between *Domestic Sector* or *International Sector* to move the package into its respective section automatically.
   * **Duration**: Change the night/day ratios (e.g. *6 Nights / 7 Days*).
   * **Price Tag**: Set promotional pricing placeholder variables (e.g. *₹22,999 onwards*).
   * **Description**: Rewrite believable holiday copy paragraphs.
   * **Image URL**: Swap out Unsplash destination pictures.
4. **Itinerary Core Highlights**: You can add or drop key list items. Type your customized detail and click **"Add Action"**, or hit the small cross icon (`×`) next to an existing highlight to delete it.
5. Click **"Save Portfolio Item"** to execute your updates instantly.

### B. Creating a Brand New Package:
1. Click **"Add New Destination Package"** at the top right of the listing.
2. A blank form opens. Fill in Title, Sector properties, Price placeholders, Description paragraphs, and bullet coordinates.
3. Click **"Save Portfolio Item"** to append this tour directly as the first card in your public catalog!

---

## 4. Modifying Office Hours, Phones, and Headlines

Under the **Contact & Homepage Editor** tab, you override general company variables:

* **Official Contacts**: Adjust the phone numbers, central office location address, or support email variables dynamically if your contact coordinates change.
* **Homepage Headlines**: Alter the welcome slide title and paragraph lines inside the hero section to match seasonal holidays (e.g., *Summer Escapes*, *Diwali Specials*).
* **Verify**: Click **"Apply Changes Locally"** to store your new information. It immediately refreshes all headers, footers, map listings, and text columns on the main website in real-time.

---

## 5. Permanently Syncing Visual Edits (Developer Handover)

Because this website operates client-side to keep hosting completely free, visual overrides you apply on your dashboard are initially stored directly inside **your personal browser's cache**. 

To make your visual changes **permanent for all other visitors** globally across the internet:

1. Click on the **JSON Export & Actions** tab.
2. Click **"Download updated content.json"**.
3. A file named `content.json` will download to your device.
4. Simply email this small file to your developer and tell them to: *"Please overwrite `/src/data/defaultContent.ts` with this customized configuration file."*
5. Once your developer uploads this file, your edits will be locked-in permanently for all web users!
