# Technical Documentation: Transforming Static WordPress to Dynamic Storefront

This document outlines the systematic engineering process used to convert a static HTML export (from Simply Static) into a functional e-commerce storefront.

## 1. The Core Problem
The static export removed the WordPress backend (PHP/MySQL), which broke all dynamic features:
- **AJAX Calls:** Category filters, search, and "Quick View" buttons were attempting to contact a non-existent server.
- **Data Silos:** Product information was locked in a static `products.json` file but wasn't being utilized effectively by the UI.
- **Routing:** Standard WordPress search and category links led to 404s or non-functional pages.

## 2. Architectural Solution: The "Technical Bridge"
Instead of re-implementing a backend, we built a client-side "Bridge" using Vanilla JavaScript. This bridge intercepts theme events and handles them locally using a cached version of the product database.

---

## 3. The Implementation Journey

### Phase 1: Data Centralization & Performance
*   **Action:** Modified `cart.js` to act as the primary Data Manager.
*   **Innovation:** Implemented a **Global Product Cache** via `cartManager.getProducts()`.
*   **Impact:** Reduced network overhead. The 115KB `products.json` is fetched once; all subsequent interactions (adding to cart, searching, filtering) are instantaneous.

### Phase 2: Global Search Routing
*   **Action:** Batch-updated 14+ HTML files to redirect search queries.
*   **Logic:** Changed form actions from `action="/"` to `action="shop.html"`.
*   **Logic:** Enhanced `loadShop()` in `shop.html` to parse the `s` (search) parameter and perform fuzzy matching against product names and categories.

### Phase 3: Dynamic Sidebar & Filter Logic
*   **Action:** Completely rewrote `setupSidebarListeners` in `shop.html`.
*   **Fixes:**
    *   Handled multiple URL formats (e.g., `?category=name` and `/cat=17/`).
    *   **Filter Clearing:** Added logic to clear old search/price filters when a new category is selected, preventing "ghost filters" from hiding valid products.
    *   **Browser History:** Wired up `window.history.pushState` and `popstate` to allow users to use the browser's "Back" button while filtering.

### Phase 4: Static Quick View System
*   **Action:** Replaced the broken WooCommerce AJAX Quick View.
*   **Implementation:** 
    *   Created a custom, hidden HTML modal structure in `cart.js`.
    *   Added a global click listener for `.quickview-button`.
    *   Populated the modal's image, title, and price dynamically from the local cache.
*   **Impact:** Restored a premium theme feature without requiring a server.

### Phase 5: Critical Bug Fixes (The "First Page" Issue)
*   **Discovery:** A restrictive script intended to stop redirects was accidentally blocking the `pushState` navigation tool.
*   **Discovery:** Scripts were loading at the bottom of the page, causing "variable not defined" errors when the page tried to load products.
*   **Solution:** Removed the hijacking blocks and moved core bridge scripts (`cart.js`, `add-to-cart.js`) to the `<head>` of the documents.

---

## 4. Current System Map

| Component | Responsibility |
| :--- | :--- |
| `products.json` | The static database containing ~100+ products and metadata. |
| `cart.js` | **The Brain.** Handles data caching, cart logic, and the Quick View modal. |
| `shop.html` | **The View.** Handles grid rendering, pagination, and filter state management. |
| `add-to-cart.js` | **The Interceptor.** Bridges theme buttons to the `cartManager` and shows UI notifications. |

## 5. Summary of Functional Features
- ✅ **Site-wide Search:** Works from header/overlay.
- ✅ **Dynamic Filtering:** Category and Price filters update the grid instantly.
- ✅ **Cart Management:** Persistence across page refreshes via LocalStorage.
- ✅ **Quick View:** Fully functional static product previews.
- ✅ **Performance:** Optimized data loading with zero redundant fetches.
