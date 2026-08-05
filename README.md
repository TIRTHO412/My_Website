# Chandra Paints - Premium Modern Business Website

A high-performance, fully responsive, modern web application for **Chandra Paints** in **Amta Sahapara**, built with HTML5, CSS3, Vanilla JavaScript, and Three.js 3D WebGL animations.

---

## 🌟 Key Features

- **3D Interactive Hero Canvas**: Powered by Three.js featuring 28 glossy floating 3D paint swatches reacting dynamically to mouse cursor and touch motion.
- **Glassmorphism UI**: Modern frosted glass cards with ambient glowing borders, fluid typography (`clamp()`), and responsive layouts.
- **Authorized Products Section**:
  - Showcases 5 official partner brands: **Birla White Putty**, **Berger Paints**, **Asian Paints**, **Nerolac Paints**, and **Dulux Paints**.
  - Includes official vector brand logos stored in `/assets/logos/`.
  - **3D Tilt Hover Effects**: Interactive mouse-following perspective rotation on product cards.
  - **Direct External Deep-linking**: Clicking any card or "Visit Official Website" button opens the official website in a new tab (`target="_blank" rel="noopener noreferrer"`).
- **100% Full-Width Google Maps & Contact Section**:
  - Embedded exact store location iframe for **Chandra Paints** in Amta Sahapara.
  - Quick action buttons: **Call Now** (`tel:9932151277`), **Email Us** (`mailto:paintschandra@gmail.com`), **WhatsApp**, and **Get Directions** (`https://maps.google.com/?q=Chandra+Paints`).
- **Computerized Shade Cards Gallery**: Interactive visual shade swatches for **Berger**, **Asian Paints**, **Dulux**, and **Nerolac** with a fullscreen Lightbox Modal viewer.
- **Direct-to-WhatsApp Form Integration**: Automatically constructs a formatted customer message and opens WhatsApp instantly (`https://wa.me/919932151277`).
- **Footer with Clickable Official Brand Logos**: Direct external links to official brand portals.

---

## 📁 Complete Project Directory Structure

```text
/My_website
│
├── index.html                  <-- Primary Semantic HTML5 Document
├── README.md                   <-- Comprehensive Project & Setup Docs
│
├── css/                        <-- Modular CSS Architecture
│   ├── variables.css           <-- Design tokens, colors, fluid clamps
│   ├── style.css               <-- Base styles, layouts, glassmorphic cards, products grid
│   ├── animation.css           <-- Motion keyframes, gradient shimmer, glows
│   └── responsive.css          <-- Mobile, Tablet, Laptop, Ultra-Wide media queries
│
├── js/                         <-- Modular JavaScript Controller Files
│   ├── utils.js                <-- DOM helpers, year updater, WhatsApp URL builder
│   ├── navigation.js           <-- Mobile menu hamburger toggle & ARIA states
│   ├── scroll.js               <-- Sticky header scroll shadow & active nav links
│   ├── animation.js            <-- Scroll reveal observers
│   ├── three.js                <-- Three.js 3D interactive hero backdrop
│   ├── products.js             <-- Products section renderer, 3D tilt & link handlers
│   ├── map.js                  <-- Google Maps Get Directions button handler
│   └── main.js                 <-- Application bootstrapper, Lightbox & Form logic
│
└── assets/                     <-- Project Static Assets
    ├── images/                 <-- Brand Shade Cards (Berger, Asian, Dulux, Nerolac)
    ├── logos/                  <-- Official Vector Brand Logos (Birla White, Berger, Asian, Nerolac, Dulux)
    ├── icons/
    ├── videos/
    ├── models/
    └── fonts/
```

---

## 🚀 Official Product Website Links

1. **Birla White Putty**: [https://www.birlawhite.com/](https://www.birlawhite.com/)
2. **Berger Paints**: [https://www.bergerpaints.com/](https://www.bergerpaints.com/)
3. **Asian Paints**: [https://www.asianpaints.com/](https://www.asianpaints.com/)
4. **Nerolac Paints**: [https://www.nerolac.com/](https://www.nerolac.com/)
5. **Dulux Paints**: [https://www.dulux.in/](https://www.dulux.in/)

---

## 💻 How to Run Locally

### Option 1: VS Code Live Server
1. Open Visual Studio Code.
2. Click **File** ➔ **Open Folder** ➔ Select the `My_website` directory.
3. Open `index.html`.
4. Right-click inside `index.html` and select **"Open with Live Server"**.

### Option 2: Python HTTP Server
1. Open Command Prompt in the project folder:
   ```cmd
   cd C:\Users\tirth\OneDrive\Desktop\Projects\My_website
   ```
2. Run:
   ```cmd
   python -m http.server 8000
   ```
3. Open your browser and go to: `http://localhost:8000`
