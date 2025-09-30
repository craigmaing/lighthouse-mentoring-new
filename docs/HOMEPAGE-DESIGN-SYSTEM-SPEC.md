# 📐 HOMEPAGE DESIGN SYSTEM SPECIFICATION
## Lighthouse Mentoring B2B Professional Services Redesign
*Strategic Consultant | Executive Coach | Board Advisor*

---

## 🎨 DESIGN PHILOSOPHY

### Core Principles
- **Authority First**: Every design decision reinforces expertise and credibility
- **Trust Through Restraint**: Professional minimalism over flashy marketing
- **Performance Obsessed**: Sub-2-second load times, 95+ Lighthouse scores
- **Mobile Excellence**: 60% of executives browse on mobile devices
- **Conversion Clarity**: Clear path from visitor to board inquiry

### Visual Language
- **Berkeley Blue Heritage**: Professional trust color psychology
- **Bold Sans-Serif Typography**: Modern authority without pretension
- **Strategic White Space**: Premium positioning through breathing room
- **Subtle Depth**: Refined shadows and layers, not flat design
- **Professional Photography**: Real boardroom environments, not stock

---

## 📊 VISUAL HIERARCHY

### Desktop Layout (1440px+)

```
┌─────────────────────────────────────────────────────────┐
│ NAVIGATION (Fixed, 80px height)                          │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ HERO SECTION (100vh - 80px)                              │
│ - 60/40 split: Content left, credentials right           │
│ - Hero headline: 72px → 56px → 48px (clamp)              │
│ - Subheadline: 24px → 20px → 18px                        │
│ - 48px bottom padding                                    │
│                                                           │
├─────────────────────────────────────────────────────────┤
│ TRUST BAR (120px height)                                 │
│ - 5 columns: Board positions | Clients | Years | Awards  │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ VALUE PROPOSITION (Padding: 120px top/bottom)            │
│ - Center-aligned headline                                │
│ - 3-column grid for credentials                          │
│                                                           │
├─────────────────────────────────────────────────────────┤
│ WHO I SERVE (Padding: 96px top/bottom)                   │
│ - Left: Content (40%)                                    │
│ - Right: 2x2 grid of target boards (60%)                 │
├─────────────────────────────────────────────────────────┤
│ SERVICES (Padding: 96px top/bottom)                      │
│ - 3-column card layout                                   │
│ - 32px gap between cards                                 │
├─────────────────────────────────────────────────────────┤
│ METHODOLOGY (Padding: 96px top/bottom)                   │
│ - 50/50 split: Process left, benefits right              │
├─────────────────────────────────────────────────────────┤
│ CREDENTIALS (Padding: 96px top/bottom)                   │
│ - Timeline layout with milestones                        │
├─────────────────────────────────────────────────────────┤
│ CTA SECTION (Padding: 120px top/bottom)                  │
│ - Center-aligned with prominent button                   │
├─────────────────────────────────────────────────────────┤
│ FOOTER (Padding: 64px top/bottom)                        │
└─────────────────────────────────────────────────────────┘
```

### Tablet Layout (768px - 1439px)

```
┌─────────────────────────────────────────────┐
│ NAVIGATION (Fixed, 72px height)              │
├─────────────────────────────────────────────┤
│ HERO (100vh - 72px)                          │
│ - Single column, center-aligned              │
│ - Credentials below content                  │
├─────────────────────────────────────────────┤
│ TRUST BAR (Horizontal scroll)                │
├─────────────────────────────────────────────┤
│ VALUE PROPOSITION (Padding: 80px)            │
│ - 2-column grid for credentials              │
├─────────────────────────────────────────────┤
│ WHO I SERVE (Padding: 80px)                  │
│ - Stacked: Content top, 2x2 grid below       │
├─────────────────────────────────────────────┤
│ SERVICES (Padding: 80px)                     │
│ - 2-column card layout                       │
├─────────────────────────────────────────────┤
│ Additional sections...                       │
└─────────────────────────────────────────────┘
```

### Mobile Layout (<768px)

```
┌─────────────────────────────┐
│ NAV (Fixed, 64px)           │
├─────────────────────────────┤
│ HERO (100vh - 64px)         │
│ - Single column              │
│ - Credentials: 2x2 grid      │
├─────────────────────────────┤
│ TRUST BAR (Carousel)        │
├─────────────────────────────┤
│ VALUE PROP (Padding: 64px)  │
│ - Single column              │
├─────────────────────────────┤
│ WHO I SERVE                 │
│ - Stack all elements         │
├─────────────────────────────┤
│ SERVICES                    │
│ - Single column cards        │
├─────────────────────────────┤
│ Additional sections...       │
└─────────────────────────────┘
```

### Section Spacing Strategy

**Desktop (1440px+)**
- Hero: 100vh minus navigation
- Major sections: 120px padding top/bottom
- Standard sections: 96px padding top/bottom
- Subsections: 64px padding top/bottom
- Container max-width: 1280px
- Side padding: 32px

**Tablet (768px-1439px)**
- Hero: 100vh minus navigation
- Major sections: 80px padding top/bottom
- Standard sections: 64px padding top/bottom
- Subsections: 48px padding top/bottom
- Container: 100% width
- Side padding: 24px

**Mobile (<768px)**
- Hero: 100vh minus navigation
- Major sections: 64px padding top/bottom
- Standard sections: 48px padding top/bottom
- Subsections: 32px padding top/bottom
- Container: 100% width
- Side padding: 20px

---

## 🔤 TYPOGRAPHY SYSTEM

### Font Stack
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Courier New', monospace;
```

### Type Scale (Mobile-First with Clamp)

```css
/* Hero Title - Massive Authority */
--text-hero: clamp(2.5rem, 5vw + 1rem, 4.5rem);
/* Desktop: 72px, Tablet: 56px, Mobile: 40px */
/* Line height: 1.1 */
/* Letter spacing: -0.03em */
/* Font weight: 800 */

/* Section Headlines - Clear Hierarchy */
--text-h1: clamp(2rem, 4vw + 0.5rem, 3.5rem);
/* Desktop: 56px, Tablet: 48px, Mobile: 32px */
/* Line height: 1.15 */
/* Letter spacing: -0.02em */
/* Font weight: 700 */

--text-h2: clamp(1.75rem, 3vw + 0.5rem, 3rem);
/* Desktop: 48px, Tablet: 40px, Mobile: 28px */
/* Line height: 1.2 */
/* Letter spacing: -0.01em */
/* Font weight: 700 */

--text-h3: clamp(1.5rem, 2.5vw + 0.25rem, 2.25rem);
/* Desktop: 36px, Tablet: 32px, Mobile: 24px */
/* Line height: 1.25 */
/* Font weight: 600 */

--text-h4: clamp(1.25rem, 2vw + 0.25rem, 1.875rem);
/* Desktop: 30px, Tablet: 26px, Mobile: 20px */
/* Line height: 1.3 */
/* Font weight: 600 */

/* Body Copy - Optimized Readability */
--text-body-large: clamp(1.125rem, 1.5vw + 0.25rem, 1.375rem);
/* Desktop: 22px, Tablet: 20px, Mobile: 18px */
/* Line height: 1.7 */
/* Font weight: 400 */

--text-body: clamp(1rem, 1vw + 0.25rem, 1.125rem);
/* Desktop: 18px, Tablet: 17px, Mobile: 16px */
/* Line height: 1.7 */
/* Font weight: 400 */

--text-small: clamp(0.875rem, 1vw, 1rem);
/* Desktop: 16px, Tablet: 15px, Mobile: 14px */
/* Line height: 1.5 */
/* Font weight: 400 */
```

### Typography Rules

**Headlines**
- Hero: Always center on mobile, left-align on desktop
- Section heads: Left-align with max-width 800px for readability
- Subheads: 60% opacity of headline color
- All headlines use Inter 700-800 weight

**Body Copy**
- Maximum line length: 65-75 characters (optimal readability)
- Paragraph spacing: 1.5rem between paragraphs
- List item spacing: 0.75rem between items
- Never justify text - always left-align for web

**Mobile Typography**
- Minimum font size: 16px (prevents zoom on iOS)
- Touch target minimum: 44px height
- Increased letter-spacing on small screens (+0.01em)
- Reduced line-height on headlines (1.1 vs 1.2)

---

## 🎨 COLOR PALETTE

### Primary Colors

```css
/* Berkeley Blue - Trust & Authority */
--color-berkeley-blue: #1E3D59;      /* Primary brand color */
--color-berkeley-dark: #152C43;      /* Hover states */
--color-berkeley-light: #2A5278;     /* Active states */
--color-berkeley-pale: #E8EDF2;      /* Backgrounds */

/* Professional Neutrals */
--color-charcoal: #1A202C;           /* Primary text */
--color-slate: #475569;              /* Secondary text */
--color-gray: #6B7280;               /* Tertiary text */
--color-silver: #9CA3AF;             /* Disabled/muted */
--color-pearl: #E5E7EB;              /* Borders */
--color-alabaster: #F3F4F6;          /* Alt backgrounds */
--color-white: #FFFFFF;              /* Base background */

/* Accent Colors - Sparingly Used */
--color-emerald: #10B981;            /* Success/CTAs */
--color-emerald-dark: #047857;       /* CTA hover */
--color-amber: #F59E0B;              /* Warnings */
--color-ruby: #DC2626;               /* Errors/urgent */
```

### Color Implementation

**Hero Section**
```css
background: linear-gradient(135deg,
  var(--color-berkeley-blue) 0%,
  var(--color-berkeley-dark) 100%);
color: var(--color-white);
```

**Trust Signals**
- Credential badges: White background with Berkeley Blue accents
- Testimonial cards: White with 1px pearl border
- Stats/metrics: Berkeley Blue numbers, slate labels

**Buttons**
```css
/* Primary CTA */
.btn-primary {
  background: var(--color-emerald);
  color: white;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.25);
}

.btn-primary:hover {
  background: var(--color-emerald-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);
}

/* Secondary CTA */
.btn-secondary {
  background: transparent;
  color: var(--color-berkeley-blue);
  border: 2px solid var(--color-berkeley-blue);
}

.btn-secondary:hover {
  background: var(--color-berkeley-blue);
  color: white;
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: var(--color-slate);
  border: 1px solid var(--color-pearl);
}
```

**Sections**
- Odd sections: White background
- Even sections: Alabaster background (subtle alternation)
- Dark sections: Berkeley Blue gradient (sparingly)
- No more than 2 dark sections per page

---

## 🧩 COMPONENT SPECIFICATIONS

### Navigation Component

```css
.navigation {
  height: 80px; /* Desktop */
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  position: fixed;
  z-index: 1000;
}

.nav-logo {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-berkeley-blue);
}

.nav-link {
  font-size: 16px;
  font-weight: 500;
  color: var(--color-charcoal);
  padding: 8px 16px;
  transition: all 200ms ease;
}

.nav-link:hover {
  color: var(--color-berkeley-blue);
}

.nav-cta {
  /* Uses btn-primary styles */
  font-size: 15px;
  padding: 10px 24px;
}
```

### Hero Section Component

```astro
<section class="hero-section">
  <div class="hero-container">
    <!-- Left Content: 60% width -->
    <div class="hero-content">
      <h1 class="hero-headline">
        Board-Level Leadership for
        <span class="text-emerald">Sustainable Performance</span>
      </h1>

      <p class="hero-subheadline">
        Non Executive Director serving forward-thinking boards that
        recognize wellbeing as strategic advantage, not HR compliance.
      </p>

      <div class="hero-credentials">
        <span class="credential-badge">IoD Ambassador</span>
        <span class="credential-badge">FRSPH Fellow</span>
        <span class="credential-badge">FCMI Fellow</span>
      </div>

      <div class="hero-cta-group">
        <button class="btn-primary btn-large">
          Discuss Board Advisory
        </button>
        <button class="btn-secondary btn-large">
          View Credentials
        </button>
      </div>
    </div>

    <!-- Right Content: 40% width -->
    <div class="hero-trust">
      <!-- Credential cards in 2x2 grid -->
    </div>
  </div>
</section>
```

### Service Card Component

```css
.service-card {
  background: white;
  border: 1px solid var(--color-pearl);
  border-radius: 12px;
  padding: 32px;
  transition: all 300ms ease;
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--color-berkeley-blue);
  transform: scaleX(0);
  transition: transform 300ms ease;
}

.service-card:hover {
  box-shadow: 0 12px 24px rgba(30, 61, 89, 0.08);
  transform: translateY(-4px);
}

.service-card:hover::before {
  transform: scaleX(1);
}

.service-icon {
  width: 48px;
  height: 48px;
  background: var(--color-berkeley-pale);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.service-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-charcoal);
  margin-bottom: 12px;
}

.service-description {
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-slate);
  margin-bottom: 20px;
}

.service-features {
  list-style: none;
  padding: 0;
}

.service-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  font-size: 15px;
  color: var(--color-gray);
}

.service-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-berkeley-blue);
  font-weight: 600;
  margin-top: 16px;
}
```

### Credential Badge Component

```css
.credential-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: white;
  border: 1px solid var(--color-berkeley-blue);
  border-radius: 100px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-berkeley-blue);
  transition: all 200ms ease;
}

.credential-badge:hover {
  background: var(--color-berkeley-blue);
  color: white;
  transform: scale(1.05);
}

.credential-badge-large {
  padding: 12px 24px;
  font-size: 16px;
}

.credential-badge-verified {
  background: var(--color-berkeley-pale);
  border-color: transparent;
}

.credential-badge-verified::before {
  content: '✓';
  color: var(--color-emerald);
  font-weight: 700;
}
```

### Trust Bar Component

```css
.trust-bar {
  background: var(--color-alabaster);
  padding: 32px 0;
  border-top: 1px solid var(--color-pearl);
  border-bottom: 1px solid var(--color-pearl);
}

.trust-metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  text-align: center;
}

.trust-metric-value {
  font-size: 36px;
  font-weight: 800;
  color: var(--color-berkeley-blue);
  line-height: 1;
  margin-bottom: 8px;
}

.trust-metric-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-slate);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .trust-metrics {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .trust-metric-value {
    font-size: 28px;
  }
}
```

### Form Elements

```css
.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-charcoal);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid var(--color-pearl);
  border-radius: 8px;
  background: white;
  transition: all 200ms ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-berkeley-blue);
  box-shadow: 0 0 0 3px rgba(30, 61, 89, 0.1);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,...");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;
}
```

---

## 🏗️ ASTRO IMPLEMENTATION

### Component Architecture

```typescript
// src/components/Hero.astro
---
interface Props {
  headline: string;
  subheadline: string;
  credentials?: string[];
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

const {
  headline,
  subheadline,
  credentials = [],
  primaryCTA,
  secondaryCTA
} = Astro.props;
---

<section class="hero-section" data-component="hero">
  <div class="container">
    <div class="hero-grid">
      <div class="hero-content">
        <h1 class="hero-headline" set:html={headline} />
        <p class="hero-subheadline">{subheadline}</p>

        {credentials.length > 0 && (
          <div class="hero-credentials">
            {credentials.map(cred => (
              <span class="credential-badge">{cred}</span>
            ))}
          </div>
        )}

        <div class="hero-cta-group">
          {primaryCTA && (
            <a href={primaryCTA.href} class="btn-primary btn-large">
              {primaryCTA.text}
            </a>
          )}
          {secondaryCTA && (
            <a href={secondaryCTA.href} class="btn-secondary btn-large">
              {secondaryCTA.text}
            </a>
          )}
        </div>
      </div>

      <div class="hero-trust">
        <slot name="trust-signals" />
      </div>
    </div>
  </div>
</section>

<style>
  .hero-section {
    min-height: calc(100vh - 80px);
    display: flex;
    align-items: center;
    background: linear-gradient(135deg,
      var(--color-berkeley-blue) 0%,
      var(--color-berkeley-dark) 100%);
    color: white;
    position: relative;
    overflow: hidden;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px;
    align-items: center;
  }

  @media (min-width: 1024px) {
    .hero-grid {
      grid-template-columns: 3fr 2fr;
      gap: 64px;
    }
  }
</style>
```

### Layout Architecture

```typescript
// src/layouts/BaseLayout.astro
---
export interface Props {
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
}

const { title, description, image, noindex = false } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />

    <!-- Preload critical fonts -->
    <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin />

    <!-- Critical CSS -->
    <style is:inline>
      /* Inline critical CSS for above-the-fold content */
      :root {
        --color-berkeley-blue: #1E3D59;
        --color-charcoal: #1A202C;
        /* ... other critical properties */
      }

      /* Prevent FOUC */
      body { opacity: 0; }
      body.loaded { opacity: 1; transition: opacity 300ms ease; }
    </style>

    <!-- Async load non-critical CSS -->
    <link rel="preload" href="/styles/main.css" as="style" />
    <link rel="stylesheet" href="/styles/main.css" media="print" onload="this.media='all'" />

    <!-- Open Graph / Social -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {image && <meta property="og:image" content={image} />}

    <!-- Schema.org markup -->
    <script type="application/ld+json" is:inline>
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Craig Fearn Strategic Consulting",
        "description": "Non Executive Director and Board Advisor",
        "@id": "https://craigfearn.com",
        "url": "https://craigfearn.com",
        "telephone": "+44-XXX-XXX-XXXX",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "United Kingdom"
        },
        "sameAs": [
          "https://www.linkedin.com/in/craigfearn",
          "https://www.iod.com/members/craig-fearn"
        ]
      }
    </script>
  </head>
  <body>
    <slot />

    <!-- Lazy load JS -->
    <script>
      document.body.classList.add('loaded');
    </script>
  </body>
</html>
```

### Performance Optimizations

```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import compress from 'astro-compress';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';

export default defineConfig({
  site: 'https://craigfearn.com',
  integrations: [
    sitemap(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp'
    }),
    compress({
      css: true,
      html: true,
      js: true,
      img: false, // Handle with image integration
      svg: true
    })
  ],
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['@astrojs/image', 'sharp']
          }
        }
      }
    },
    ssr: {
      noExternal: ['@astrojs/image']
    }
  }
});
```

### Image Optimization Strategy

```astro
---
// src/components/OptimizedImage.astro
import { Image } from '@astrojs/image/components';

interface Props {
  src: string;
  alt: string;
  loading?: 'eager' | 'lazy';
  sizes?: string;
  widths?: number[];
  aspectRatio?: number;
  format?: 'webp' | 'avif' | 'jpg';
}

const {
  src,
  alt,
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px',
  widths = [640, 768, 1024, 1280, 1920],
  aspectRatio = 16/9,
  format = 'webp'
} = Astro.props;
---

<Image
  src={src}
  alt={alt}
  loading={loading}
  sizes={sizes}
  widths={widths}
  aspectRatio={aspectRatio}
  format={format}
  quality={85}
/>
```

### Animation Recommendations

```css
/* Subtle, professional animations */

/* Page load animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-on-load {
  animation: fadeInUp 600ms ease-out;
  animation-fill-mode: both;
}

/* Stagger children */
.stagger-children > * {
  animation: fadeInUp 600ms ease-out;
  animation-fill-mode: both;
}

.stagger-children > *:nth-child(1) { animation-delay: 0ms; }
.stagger-children > *:nth-child(2) { animation-delay: 100ms; }
.stagger-children > *:nth-child(3) { animation-delay: 200ms; }
.stagger-children > *:nth-child(4) { animation-delay: 300ms; }

/* Intersection Observer animations */
.fade-in-view {
  opacity: 0;
  transform: translateY(30px);
  transition: all 600ms ease-out;
}

.fade-in-view.in-view {
  opacity: 1;
  transform: translateY(0);
}

/* Micro-interactions */
.hover-lift {
  transition: transform 200ms ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
}

.hover-scale {
  transition: transform 200ms ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}

/* View Transitions API */
::view-transition-old(root) {
  animation: 300ms ease-out both fade-out;
}

::view-transition-new(root) {
  animation: 300ms ease-in both fade-in;
}
```

### Responsive Breakpoints

```css
/* Mobile First Breakpoint System */

/* Base: 0-767px (Mobile) */
/* Default styles */

/* Tablet: 768px+ */
@media (min-width: 768px) {
  .container { max-width: 768px; }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}

/* Large Desktop: 1280px+ */
@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}

/* XL Desktop: 1440px+ */
@media (min-width: 1440px) {
  .container { max-width: 1440px; }
}

/* 2XL Desktop: 1920px+ */
@media (min-width: 1920px) {
  .container { max-width: 1600px; }
}
```

---

## 🎯 TRUST & CREDIBILITY DESIGN

### Credential Display Hierarchy

1. **Primary Credentials** (Always visible)
   - IoD Ambassador badge
   - FRSPH Fellow badge
   - FCMI Fellow badge
   - Display as high-quality SVG/PNG badges
   - Position: Hero section right column on desktop, below CTA on mobile

2. **Secondary Credentials** (Context-dependent)
   - Years of experience counter
   - Number of boards served
   - Client logos (if permitted)
   - Display in trust bar below hero

3. **Tertiary Credentials** (Deep pages)
   - Awards and recognitions
   - Speaking engagements
   - Publications
   - Display on About/Credentials page

### Social Proof Presentation

```css
.testimonial-card {
  background: white;
  border: 1px solid var(--color-pearl);
  border-radius: 12px;
  padding: 32px;
  position: relative;
}

.testimonial-quote {
  font-size: 18px;
  line-height: 1.6;
  color: var(--color-charcoal);
  margin-bottom: 24px;
  position: relative;
}

.testimonial-quote::before {
  content: '"';
  position: absolute;
  top: -10px;
  left: -10px;
  font-size: 48px;
  color: var(--color-berkeley-blue);
  opacity: 0.2;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 16px;
}

.testimonial-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.testimonial-info {
  flex: 1;
}

.testimonial-name {
  font-weight: 600;
  color: var(--color-charcoal);
  margin-bottom: 2px;
}

.testimonial-role {
  font-size: 14px;
  color: var(--color-slate);
}

.testimonial-company {
  font-size: 14px;
  color: var(--color-gray);
}
```

### Professional Photography Guidelines

**Hero Images**
- Real boardroom or professional settings
- Craig in professional attire (suit, no tie acceptable)
- Natural lighting, not studio-lit
- Authentic expression, not stock photo smile
- 16:9 aspect ratio for hero backgrounds
- Minimum resolution: 1920x1080

**Credential Photos**
- Official badge/logo files from issuing organizations
- Transparent PNG format
- Consistent sizing in display (max height: 64px)
- White or transparent backgrounds only

**About Page Photos**
- Professional headshot (recent, within 2 years)
- Conference/speaking engagement photos
- Board meeting environment shots (if available)
- All photos should reinforce authority positioning

### Trust Signal Placement

**Above the Fold**
- Credential badges in hero section
- "Director of the Year 2025 Finalist" prominently displayed
- Trust bar with key metrics immediately below hero

**Throughout Page**
- Testimonials after service descriptions
- Client logos (if permitted) in dedicated section
- Awards/recognitions in footer or dedicated section

**Contact Page**
- All credentials repeated near contact form
- Professional associations listed
- LinkedIn verification badge
- Clear contact methods (email, phone, booking link)

---

## 📱 MOBILE-FIRST CONSIDERATIONS

### Touch Target Sizing
- Minimum touch target: 44x44px (Apple HIG)
- Button padding: 16px vertical, 24px horizontal minimum
- Link spacing: 8px minimum between clickable elements
- Form inputs: 48px minimum height

### Mobile Navigation
```css
.mobile-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1000;
}

.mobile-menu {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  transform: translateX(100%);
  transition: transform 300ms ease;
}

.mobile-menu.open {
  transform: translateX(0);
}

.mobile-menu-item {
  display: block;
  padding: 16px 24px;
  font-size: 18px;
  border-bottom: 1px solid var(--color-pearl);
}
```

### Performance on Mobile
- Critical CSS inlined (< 14KB)
- Fonts loaded with font-display: swap
- Images lazy-loaded below fold
- JavaScript deferred/async where possible
- Service worker for offline capability

---

## ✅ ACCESSIBILITY STANDARDS

### WCAG 2.1 AA Compliance

**Color Contrast**
- Normal text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- Berkeley Blue (#1E3D59) on white: 8.7:1 ✓
- Emerald (#10B981) on white: 3.3:1 (use for large text only)

**Keyboard Navigation**
- All interactive elements keyboard accessible
- Visible focus indicators (3px outline)
- Logical tab order
- Skip links for main content

**Screen Reader Support**
- Semantic HTML structure
- ARIA labels where needed
- Alt text for all images
- Descriptive link text (no "click here")

**Responsive Text**
- Minimum 16px font size
- User can zoom to 200% without horizontal scroll
- Line height minimum 1.5 for body text
- Paragraph width maximum 80 characters

---

## 🚀 PERFORMANCE TARGETS

### Core Web Vitals Goals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FCP (First Contentful Paint)**: < 1.5s
- **TTI (Time to Interactive)**: < 3.5s

### Optimization Checklist
- [ ] Hero image: WebP format, < 200KB
- [ ] Critical CSS: Inlined, < 14KB
- [ ] Fonts: Preloaded, subset, variable where possible
- [ ] JavaScript: < 100KB total, deferred loading
- [ ] Images: Lazy loaded, responsive sizes, next-gen formats
- [ ] Compression: Brotli for text assets
- [ ] Caching: Aggressive cache headers for assets
- [ ] CDN: Static assets served from edge

---

## 📋 IMPLEMENTATION CHECKLIST

### Phase 1: Foundation (Days 1-2)
- [ ] Set up design tokens in CSS variables
- [ ] Implement typography scale
- [ ] Create color system
- [ ] Build base layout components

### Phase 2: Components (Days 3-4)
- [ ] Navigation component
- [ ] Hero section component
- [ ] Service card component
- [ ] Testimonial component
- [ ] CTA section component
- [ ] Footer component

### Phase 3: Pages (Days 5-6)
- [ ] Homepage assembly
- [ ] NED Services page
- [ ] Board Advisory page
- [ ] Management Consulting page
- [ ] Contact page

### Phase 4: Optimization (Day 7)
- [ ] Performance audit
- [ ] Accessibility audit
- [ ] Mobile testing
- [ ] Cross-browser testing
- [ ] SEO optimization

### Phase 5: Launch (Day 8)
- [ ] Final review
- [ ] Deploy to staging
- [ ] Client approval
- [ ] Production deployment

---

## 🎯 SUCCESS METRICS

### Design Success
- Professional appearance that conveys authority
- Clear visual hierarchy guiding user journey
- Consistent design language across all pages
- Mobile experience as good as desktop

### Performance Success
- Lighthouse score: 95+ across all metrics
- Page load time: < 2 seconds on 3G
- Zero layout shift after initial paint
- Smooth 60fps scrolling on all devices

### Business Success
- Clear path from visitor to board inquiry
- Credential visibility above the fold
- Trust signals throughout user journey
- Contact/inquiry conversion > 5%

---

*This design system specification provides a complete blueprint for implementing the Lighthouse Mentoring homepage redesign in Astro, optimized for B2B professional services with a focus on board-level positioning.*