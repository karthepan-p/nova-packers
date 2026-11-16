# Nova Packers & Transport — Official Commercial Website

> **"Your Belongings, Our Responsibility."**  
> A modern, responsive web application for **Nova Packers & Transport** (Aruppukkottai, Tamil Nadu), built to establish corporate trust, showcase real shifting operations, and convert visitors into direct moving quote leads via instant WhatsApp integration.

---

## 📋 Overview

Established in **2014** and led by **Dharma Raj A**, **Nova Packers & Transport** is Aruppukkottai’s pioneer shifting and regional logistics service operating across all cities and districts of Tamil Nadu. This single-page multi-view web application combines high-contrast corporate branding with zero-friction customer conversion tools.

---

## ✨ Key Features

- **Hardware-Accelerated Brand Preloader:** High-contrast white splash screen featuring a 1:1 rotating spinner, animated cargo truck indicator, and a seamless FLIP-animation transition that docks the company logo directly into the top header.
- **Multi-View Navigation Engine:** Instant, smooth-scrolling client-side routing across **Home**, **About Us**, **Services**, **Reach Us**, **Gallery**, and **Book Move** without page reloads.
- **Dedicated Corporate Motto & Legacy Showcase:** Full-width dark navy highlight banner (`#0B192C` to `#1E3E62`) paired with company heritage cards detailing 20+ years of field expertise and a transparent 5-step relocation workflow.
- **Interactive Service Showcase Gallery & Fullscreen Lightbox:**
  - Filterable 15-item showcase across **House Shifting**, **Office Relocation**, **Vehicle Transport**, **Packing & Unpacking**, and **Warehouse & Storage** with zero layout-shift or trailing whitespace.
  - Cinematic fullscreen lightbox modal (`95vw`/`95vh`) supporting keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`), next/previous controls, and graceful SVG fallbacks for missing assets.
- **Reach Us & Exact GPS Map Integration:** Two-column layout pairing direct tap-to-call/WhatsApp contact details with an embedded Google Map pinpointing the exact headquarters coordinates (`9.517792700469158, 78.09521599878`) in Aruppukkottai (`626101`).
- **Instant WhatsApp Quote & Booking Form:** Captures customer details, origin/destination addresses, floor levels, lift availability, shifting category, expected date, and heavy inventory notes—validating required fields and generating a formatted, URL-encoded `wa.me` redirect straight to management.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3 (Custom CSS Variables, CSS Grid, Flexbox, `clamp()` fluid typography, keyframe animations), Vanilla JavaScript (ES6+)
- **Typography & Icons:** Google Fonts (`Outfit`, `Plus Jakarta Sans`, `Playfair Display`) & Font Awesome 6.4
- **Integrations:** WhatsApp Click-to-Chat (`wa.me` API), Google Maps Embed API
- **Optional Backend Ready:** Node.js / Express REST endpoint (`/api/enquire`) for server-side inquiry logging or Meta WhatsApp Cloud API webhooks

---

## 📁 Project Structure

```text
nova-packers-website/
├── index.html          # Main multi-section HTML document & modal markup
├── style.css           # Complete modular stylesheet, design tokens & responsive rules
├── script.js           # Preloader FLIP engine, router, lightbox, gallery filter & WhatsApp form logic
├── README.md           # Project documentation
└── src/                # Brand logos and real operation photography
    ├── New-Nova-logo.png
    ├── house-shifting-1.jpeg
    ├── house-shifting-2.jpeg
    ├── house-shifting-3.jpeg
    ├── vehicle-transport-1.jpeg
    ├── vehicle-transport-2.jpeg
    ├── vehicle-transport-3.jpeg
    ├── packing-service-1.jpeg
    ├── packing-service-2.jpeg
    ├── packing-service-3.jpeg
    ├── warehouse-1.jpeg
    └── warehouse-2.jpeg