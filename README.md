# The DrunkYard — Bar & Restaurant

A mobile-friendly bar and restaurant website with animations, reservation form, and QR code menu access.

## Quick Start

Open `index.html` in your browser to preview.

## QR Code Menu

For the QR code to work on phones (guests scanning from their device), serve the site over HTTP:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve .
```

Then visit `http://localhost:8000` and the QR code will link to the menu URL that phones can open.

## Files

- `index.html` — Main landing page
- `menu.html` — Full bar & food menu (QR target)
- `styles.css` — Styling & animations
- `script.js` — Interactions & QR generation
