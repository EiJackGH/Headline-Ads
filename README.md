# Headline Ads

A highly customisable, elegant, and modern Headline Ads / Announcement Banner widget for everyone. Host on GitHub Pages or integrate directly onto any static or dynamic website.

[Live Customizer / Interactive Dashboard](index.html) | [Interactive Showcases](demo.html)

---

## Features

- ⚡ **Super Lightweight**: Zero dependencies, purely vanilla JS and optimized CSS (~5KB total).
- 🎨 **Fully Customisable**: Tweak colors, background gradients, font sizes, text alignments, shadows, and spacing.
- 📱 **Mobile Responsive**: Dynamically adjusts for smaller screens and smaller devices.
- 🔄 **Multi-message Rotator**: Feed multiple announcements and rotate them smoothly at any specified interval.
- 💾 **State Persistence**: Remembers dismissed banners using `localStorage` so they don't reappear annoyingly.
- 🛡️ **XSS Protection**: Securely escapes messages and fields to prevent cross-site scripting vulnerabilities.
- 🚀 **Two integration modes**: Simple script attributes (Declarative) or direct script instantiation (Imperative).

---

## 🛠️ Get Started & Quick Installation

Simply embed the script tag with data attributes anywhere inside your HTML `<body>` or `<head>`:

```html
<!-- Headline Announcement Banner -->
<script
  src="https://yourusername.github.io/Headline-Ads/headline-ads.js"
  data-id="holiday-announcement"
  data-text="🎉 Holiday season starts today! Save up to 50% on premium memberships. | 🚚 Free express shipping worldwide for 24 hours."
  data-badge-text="DEAL"
  data-cta-text="Claim Discount"
  data-link="https://yoursite.com/deals"
  data-bg-color="linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
  data-text-color="#ffffff"
  data-cta-bg="#ffffff"
  data-cta-color="#4f46e5"
  data-position="top"
  data-rotation-interval="4"
  data-dismissible="true"
  data-shadow="true"
  async>
</script>
```

---

## ⚙️ Configuration Parameter Attributes

Customize your Headline Ad by supplying these attributes on the `<script>` tag:

| Attribute | Default Value | Description |
| :--- | :--- | :--- |
| `data-id` | `'default-headline-ad'` | Unique identifier to persist dismissal/state in LocalStorage. |
| `data-text` | `'Check out our amazing new feature! Learn more today.'` | Banner message. Separate multiple messages with a `\|` for rotation. |
| `data-link` | `'#'` | Target URL link for the CTA button action. |
| `data-cta-text` | `'Get Started'` | Button label. Leave blank to omit the CTA button. |
| `data-position` | `'top'` | Display position: `'top'` (sticky top), `'bottom'` (sticky bottom), or `'inline'`. |
| `data-target` | `''` | DOM Element ID target for placing inline advertisements. |
| `data-bg-color` | `'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'` | Solid background color or CSS background gradient value. |
| `data-text-color` | `'#ffffff'` | Color of the message text. |
| `data-cta-bg` | `'#ffffff'` | CTA button background color. |
| `data-cta-color` | `'#4f46e5'` | CTA button text color. |
| `data-dismissible` | `'true'` | If `true`, renders a close/dismiss icon and persists state. |
| `data-shadow` | `'true'` | If `true`, applies modern drop shadows for aesthetics and depth. |
| `data-font-size` | `'14px'` | Base CSS font-size (e.g. `12px`, `14px`, `16px`). |
| `data-badge-text` | `'PROMO'` | Label/tag text shown next to the message (e.g. `'HOT'`, `'NEW'`). |
| `data-rotation-interval` | `0` | Message rotation speed in seconds. Set to `0` or omit to disable. |

---

## 💻 Programmatic JavaScript API

For Single-Page Apps (SPA) or dynamic applications, you can invoke the widget directly via the global JavaScript API:

```javascript
// Initialise a new banner
window.HeadlineAds.init({
  id: 'spring-banner',
  text: '🌻 Welcome to Spring! Check out new arrivals.',
  badgeText: 'NEW',
  bgColor: '#10b981',
  position: 'inline',
  target: 'my-custom-div-container'
});

// Clear dismissed memory/state
window.HeadlineAds.resetDismissal('spring-banner');
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
