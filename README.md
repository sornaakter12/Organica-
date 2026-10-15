# Organica — Pure & Healthy Organic Food Store

An elegant, fully responsive organic food e-commerce web application crafted with React, TypeScript, and Tailwind CSS. Inspired by high-end organic farm-to-table aesthetics, Organica features fresh produce catalogs, interactive cart management with local storage persistence, responsive mobile navigation, promotional editorial banners, product quick-view modal with nutrition profiles, and a validated demo checkout workflow.

---

## 🌿 Key Features

1. **Brand Identity & Aesthetic**
   - Palette: Forest Green (`#315F39`), Sage Green (`#7EA778`), Pale Mint (`#E3F0D7`), Warm Off-White (`#F7FAEF`), Dark Green text (`#203D26`).
   - Typography: Elegant serif headings with modern, highly legible sans-serif body typography.

2. **Hero Section**
   - Left: Clear brand statement ("Healthy Organic Food"), value proposition, and "SHOP NOW" call to action.
   - Right: Editorial organic composition featuring broccoli, avocado, spinach, and nuts with organic certification badges.

3. **Product Catalogue & Shopping**
   - 12 realistic sample organic products priced in Bangladeshi Taka (৳).
   - Category filtering: All, Fresh Vegetables, Organic Fruits, Nuts & Seeds, Natural Foods.
   - Search: Instant real-time filtering with clear buttons.
   - Sorting: Price (Low to High, High to Low), Star Rating, and Alphabetical.
   - Quantity Stepper: Adjust units before or after adding to basket.
   - Quick View Modal: Inspect nutrition breakdown (calories, protein, carbs, fiber), health benefits, and origin info.

4. **Cart Drawer & Persistence**
   - LocalStorage synchronization (`organica_cart_items_v2`) ensures cart items remain across browser reloads.
   - Real-time subtotal, free shipping threshold indicator (Free delivery in Dhaka over ৳1,000, or flat ৳60).
   - Coupon system: Supports `ORGANIC10` (10% discount) and `FREESHIP`.

5. **Demo Checkout Workflow**
   - Validated checkout form: Full Name, Bangladeshi mobile number format (`01...`), delivery street address, city/district, and optional notes.
   - Payment method toggle: Cash on Delivery (COD) or bKash / Mobile Wallet (Demo).
   - Generates simulated demo order reference (e.g. `ORG-2026-XXXXX`), estimated delivery window, itemized receipt breakdown, and print receipt capability.
   - Cart safely clears upon successful demo confirmation.

6. **Additional Sections**
   - About Us: Story of sustainable bio-farming and 24-hour farm-to-table promise.
   - Why Choose Us: 6 core freshness standards and guarantees.
   - Customer Testimonials: Authentic feedback from verified customers.
   - Contact & Hub: Store address in Banani/Gulshan-2, Dhaka, hotlines, opening hours, and validated contact message form.
   - Newsletter: Weekly harvest alerts subscription with discount code voucher.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18.0 or newer recommended)
- npm, yarn, or pnpm

### Installation

1. Clone or download the repository:
   ```bash
   git clone <repository-url>
   cd organica-food-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

---

## 🏗️ Build & Production

To create an optimized production build:
```bash
npm run build
```

To preview the built production app locally:
```bash
npm run preview
```

To run TypeScript verification:
```bash
npm run lint
```

---

## ☁️ Deployment Instructions

### Deploy to Vercel
1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Organica organic food e-commerce"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset will automatically detect **Vite**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**. Your site will be live on a `*.vercel.app` domain within seconds.

---

## 🔒 Environment Variables

No external API keys or secrets are required for the client-side shopping, cart, or demo checkout features to work.
If integrating a production payment gateway or backend API in the future:
- Copy `.env.example` to `.env`:
  ```bash
  cp .env.example .env
  ```
- All client-side environment variables in Vite must begin with `VITE_`.

---

## 📄 License
MIT License. Created for Organica Organic Food Store.
