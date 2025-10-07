# Lighthouse Mentoring Website - Complete Rebuild Specification

**Version:** 2.0
**Last Updated:** January 2025
**Purpose:** Complete technical specification for rebuilding the Lighthouse Mentoring website from scratch

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technical Stack](#technical-stack)
3. [Design System](#design-system)
4. [Site Structure](#site-structure)
5. [Component Library](#component-library)
6. [Page Specifications](#page-specifications)
7. [Content Guidelines](#content-guidelines)
8. [SEO & Accessibility](#seo--accessibility)
9. [Performance Requirements](#performance-requirements)
10. [Deployment Configuration](#deployment-configuration)

---

## Project Overview

### Purpose
Professional consulting website for Craig Fearn's board advisory, executive coaching, and organizational wellbeing services.

### Target Audience
- C-suite executives and senior leaders
- Board directors and aspiring NEDs
- HR Directors and People Leaders
- Organizations seeking strategic consulting

### Brand Positioning
- **Tone:** Professional, confident but humble, experienced, authentic
- **Voice:** Direct, no jargon, evidence-based, board-room ready
- **Personality:** Senior advisor with real scars, not theoretical consultant

### Key Differentiators
1. 17 years board-level experience (not just advisory)
2. Fellowship-level credentials (FCMI, FRSPH)
3. IoD Ambassador status
4. Human+AI wellbeing analysis approach
5. IoD Awards Finalist 2025

---

## Technical Stack

### Core Framework
```bash
npm create astro@latest lighthouse-mentoring
cd lighthouse-mentoring
```

### Dependencies
```json
{
  "dependencies": {
    "@astrojs/sitemap": "^3.6.0",
    "@astrojs/tailwind": "^6.0.2",
    "@fontsource-variable/inter": "^5.2.8",
    "astro": "^5.14.1",
    "sharp": "^0.34.4",
    "tailwindcss": "^3.4.17"
  }
}
```

### Configuration

**astro.config.mjs:**
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://lighthousementoring.co.uk',
  integrations: [
    tailwind(),
    sitemap(),
  ],
  image: {
    domains: ['lighthousementoring.co.uk'],
    experimentalResponsiveImages: true,
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
```

---

## Design System

### Color Palette

```javascript
// tailwind.config.js colors
colors: {
  primary: {
    DEFAULT: '#2D2D2D',  // Dark charcoal - navigation, headings
    light: '#3F3F3F',
    dark: '#1A1A1A',
  },
  accent: {
    DEFAULT: '#A45C1A',  // Bronze/rust - CTAs, highlights
    dark: '#8B4513',
    light: '#B8732C',
  },
  eggshell: '#F4F1EA',  // Warm cream - section backgrounds
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
}
```

### Typography

**Font:** Inter Variable
```css
@import '@fontsource-variable/inter';
font-family: 'Inter Variable', system-ui, sans-serif;
```

**Type Scale (Mobile-First):**
```javascript
fontSize: {
  'hero': ['2.5rem', { lineHeight: '1.1', fontWeight: '700' }],     // 40px mobile, 72px desktop
  'h1': ['2rem', { lineHeight: '1.2', fontWeight: '700' }],         // 32px mobile, 64px desktop
  'h2': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],      // 28px mobile, 48px desktop
  'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],       // 24px mobile, 28px desktop
  'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],      // 20px mobile, 24px desktop
  'body-large': ['1.125rem', { lineHeight: '1.6' }],                // 18px
  'body': ['1rem', { lineHeight: '1.6' }],                          // 16px
  'small': ['0.875rem', { lineHeight: '1.5' }],                     // 14px
  'badge': ['1rem', { lineHeight: '1.3', fontWeight: '500' }],      // 16px
}
```

**Responsive Typography:**
```css
h1 { @apply text-h1 md:text-[3rem] lg:text-[4rem]; }
h2 { @apply text-h2 md:text-[2.25rem] lg:text-[3rem]; }
h3 { @apply text-h3 md:text-[1.75rem]; }
.hero h1 { @apply text-hero md:text-[3.5rem] lg:text-[4.5rem]; }
```

### Spacing System

**Container:**
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem; /* 24px */
}

@media (min-width: 640px) {
  .container { padding: 0 2rem; } /* 32px */
}

@media (min-width: 1024px) {
  .container { padding: 0 3rem; } /* 48px */
}
```

**Section Padding:**
```css
.section-padding {
  padding-top: 4rem;    /* 64px mobile */
  padding-bottom: 4rem;
}

@media (min-width: 768px) {
  .section-padding {
    padding-top: 6rem;    /* 96px desktop */
    padding-bottom: 6rem;
  }
}
```

### Shadows

```javascript
boxShadow: {
  'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
}
```

---

## Component Library

### 1. Button Component

**File:** `src/components/Button.astro`

```astro
---
interface Props {
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'large';
  class?: string;
}

const { href, variant = 'primary', size = 'default', class: className = '' } = Astro.props;

const variantClasses = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
};
---

<a
  href={href}
  class={`${variantClasses[variant]} ${className}`}
>
  <slot />
</a>
```

**CSS Classes:**
```css
/* Base button */
.btn {
  @apply inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200;
  @apply min-h-[56px] px-8 text-lg;
}

/* Primary CTA - Accent color */
.btn-primary {
  @apply btn bg-accent text-white;
  @apply hover:bg-accent-dark hover:shadow-lg hover:-translate-y-0.5;
  @apply active:translate-y-0;
}

/* Secondary CTA - Eggshell with border */
.btn-secondary {
  @apply btn bg-eggshell text-primary border-2 border-primary;
  @apply hover:bg-primary hover:text-white;
}

/* Ghost/Tertiary - Underlined link style */
.btn-ghost {
  @apply inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200;
  @apply text-accent underline underline-offset-4;
  @apply hover:text-accent-dark hover:underline-offset-[6px];
}

/* Navigation button */
.btn-nav {
  @apply px-6 py-2 rounded-lg font-semibold text-base transition-all duration-200;
  @apply bg-accent text-white;
  @apply hover:bg-accent-dark;
}
```

### 2. Navigation Component

**File:** `src/components/Navigation.astro`

```astro
---
const currentPath = Astro.url.pathname;

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];
---

<nav class="bg-primary border-b border-primary/50 shadow-lg sticky top-0 z-50">
  <div class="container">
    <div class="flex items-center justify-between h-20">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-3">
        <img
          src="/images/logo-final.png"
          alt="Lighthouse Mentoring"
          class="h-10 w-auto"
          width="150"
          height="40"
        />
        <span class="text-xl font-bold text-white hidden sm:block">Lighthouse Mentoring</span>
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            href={link.href}
            class={`text-gray-200 hover:text-white transition-colors font-medium ${
              currentPath === link.href ? 'text-white border-b-2 border-accent' : ''
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>

      <!-- CTA Button -->
      <div class="hidden md:block">
        <a href="/contact" class="btn-nav">
          Get Started
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button
        id="mobile-menu-button"
        class="md:hidden p-2 text-gray-200 hover:text-white"
        aria-label="Toggle menu"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden md:hidden pb-4">
      {navLinks.map((link) => (
        <a
          href={link.href}
          class={`block py-2 text-gray-200 hover:text-white transition-colors ${
            currentPath === link.href ? 'text-white font-semibold border-l-2 border-accent pl-2' : ''
          }`}
        >
          {link.label}
        </a>
      ))}
      <a href="/contact" class="btn-nav block text-center mt-4">
        Get Started
      </a>
    </div>
  </div>
</nav>

<script>
  function setupMobileMenu() {
    const button = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');

    if (button && menu) {
      button.addEventListener('click', () => {
        menu.classList.toggle('hidden');
      });
    }
  }

  setupMobileMenu();
  document.addEventListener('astro:page-load', setupMobileMenu);
</script>
```

### 3. Footer Component

**File:** `src/components/Footer.astro`

```astro
---
const currentYear = new Date().getFullYear();
---

<footer class="bg-primary text-gray-300">
  <div class="container py-12">
    <div class="grid md:grid-cols-4 gap-8 mb-8">
      <!-- Company Info -->
      <div class="md:col-span-2">
        <img
          src="/images/logo-final.png"
          alt="Lighthouse Mentoring"
          class="h-10 w-auto mb-4"
          width="150"
          height="40"
        />
        <p class="text-gray-400 mb-4">
          Strategic consulting for board-level challenges. FCMI Fellow | FRSPH Fellow | IoD Ambassador.
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-white font-semibold mb-4">Services</h3>
        <ul class="space-y-2">
          <li><a href="/services/board-advisory" class="hover:text-white transition-colors">Board Advisory</a></li>
          <li><a href="/services/executive-coaching" class="hover:text-white transition-colors">Executive Coaching</a></li>
          <li><a href="/services/organizational-wellbeing" class="hover:text-white transition-colors">Wellbeing Audits</a></li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div>
        <h3 class="text-white font-semibold mb-4">Contact</h3>
        <ul class="space-y-3">
          <li class="flex items-start gap-2">
            <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href="mailto:craig.fearn@lighthousementoring.co.uk" class="hover:text-white transition-colors">
              craig.fearn@lighthousementoring.co.uk
            </a>
          </li>
          <li class="flex items-start gap-2">
            <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Cornwall, UK</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-sm text-gray-400">
        © {currentYear} Lighthouse Mentoring. All rights reserved.
      </p>
      <div class="flex gap-6 text-sm">
        <a href="/privacy" class="hover:text-white transition-colors">Privacy Policy</a>
        <a href="/terms" class="hover:text-white transition-colors">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
```

### 4. Card Component

**CSS Class:**
```css
.card {
  @apply bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300;
}
```

**Usage:**
```html
<div class="card p-8">
  <!-- Card content -->
</div>
```

### 5. Badge Component

**CSS Classes:**
```css
.badge {
  @apply text-badge px-4 py-2 rounded-full;
  @apply bg-gray-100 text-gray-700;
}

/* Credential badge layout */
.credential-badge {
  @apply flex flex-col items-center text-center gap-4;
}

.credential-badge__image {
  @apply w-[120px] h-[120px] object-contain;
}

.credential-badge__image--award {
  @apply w-[300px] h-[300px] object-contain;
}

.credential-badge__title {
  @apply text-xl font-semibold text-gray-900;
}

.credential-badge__subtitle {
  @apply text-sm text-gray-500;
}
```

### 6. Layout Component

**File:** `src/layouts/Layout.astro`

```astro
---
import { ClientRouter } from 'astro:transitions';
import Navigation from '../components/Navigation.astro';
import StructuredData from '../components/StructuredData.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
  keywords?: string;
  schemaType?: 'homepage' | 'person' | 'service';
  serviceName?: string;
  serviceDescription?: string;
}

const {
  title,
  description,
  ogImage = '/images/craig-headshot.jpg',
  keywords = 'board advisory, executive coaching, non-executive director, strategic consultant',
  schemaType = 'homepage',
  serviceName,
  serviceDescription
} = Astro.props;

const ogImageURL = new URL(ogImage, Astro.site);
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="canonical" href={canonicalURL} />

    <meta name="theme-color" content="#2D2D2D" />

    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="author" content="Craig Fearn" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImageURL} />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={canonicalURL} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={ogImageURL} />

    <meta name="generator" content={Astro.generator} />
    <ClientRouter />
    <StructuredData type={schemaType} serviceName={serviceName} serviceDescription={serviceDescription} />
  </head>
  <body>
    <a href="#main-content" class="skip-to-content">
      Skip to main content
    </a>

    <Navigation />
    <main id="main-content" tabindex="-1">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

---

## Site Structure

### Directory Structure

```
lighthouse-mentoring/
├── public/
│   ├── images/
│   │   ├── logo-final.png
│   │   ├── craig-headshot.jpg
│   │   ├── iod-conference-07.jpg
│   │   ├── iod-conference-83.jpg
│   │   ├── iod-conference-142.jpg
│   │   ├── RSPH-Fellow-Badge.jpg
│   │   ├── IoD-Ambassador-badge-web.png
│   │   ├── cmi-fellow-certificate.png
│   │   ├── iod-aspiring-award-badge.png
│   │   └── iod-global-award-badge.png
│   ├── favicon.svg
│   ├── robots.txt
│   ├── site.webmanifest
│   └── _headers
├── src/
│   ├── components/
│   │   ├── Button.astro
│   │   ├── Navigation.astro
│   │   ├── Footer.astro
│   │   └── StructuredData.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── services.astro
│   │   ├── contact.astro
│   │   ├── privacy.astro
│   │   ├── terms.astro
│   │   ├── 404.astro
│   │   └── services/
│   │       ├── board-advisory.astro
│   │       ├── executive-coaching.astro
│   │       └── organizational-wellbeing.astro
│   ├── styles/
│   │   └── global.css
│   └── images/
│       └── (optimized source images)
├── astro.config.mjs
├── tailwind.config.js
├── package.json
└── tsconfig.json
```

### URL Structure

```
/                                    → Homepage
/about                               → About Craig
/services                            → Services Overview
/services/board-advisory             → Board Advisory Service
/services/executive-coaching         → Executive Coaching Service
/services/organizational-wellbeing   → Wellbeing Audit Service
/contact                             → Contact Page
/privacy                             → Privacy Policy
/terms                               → Terms of Service
/404                                 → 404 Error Page
```

---

## Page Specifications

### 1. Homepage (`/`)

**Meta:**
```
Title: Craig Fearn - Strategic Consultant | Board Advisory | Executive Leadership
Description: Strategic consultant specializing in board advisory and AI-enhanced decision-making. FCMI Fellow | FRSPH Fellow | IoD Ambassador. 17 years of board-level experience.
Keywords: board advisory services UK, non-executive director, strategic consultant, executive coaching
```

**Structure:**

#### Hero Section
- **Background:** `bg-primary text-white`
- **Layout:** 2-column grid (text left, image right)
- **Content:**
  - H1: "The Strategic Advisor Boards Turn to First"
  - Supporting copy (2 paragraphs)
  - Credential badges (IoD Ambassador, FRSPH Fellow, FCMI Fellow, IoD Awards Finalist)
  - 2 CTAs: "Book a Strategy Call" (secondary), "Explore Services" (ghost)
  - Trust indicators with checkmark icons
  - Professional headshot (Craig at IoD Conference)

#### Value Proposition Section
- **Background:** `bg-eggshell`
- **Content:**
  - H2: "Strategic Advisory When Stakes Are High"
  - 2 paragraphs of positioning copy
  - 3 service cards in grid:
    1. Board Advisory & Governance
    2. Executive Coaching
    3. Organizational Wellbeing
  - Each card: Icon, H3, description, "Learn more →" link

#### Credentials Section
- **Background:** `bg-gray-50`
- **Layout:**
  - H2 centered
  - First row: 3 credentials (FRSPH, IoD Ambassador, FCMI) - 120x120px badges
  - Second row: 2 IoD Awards - 300x300px banners
- **Content:**
  - Fellowship badges with titles and subtitles
  - Award banners (Aspiring Director 2025, Global Award Finalist)

#### Testimonials Section
- **Background:** `bg-eggshell`
- **Layout:** 3-column grid
- **Content:**
  - 3 testimonials (Steve Hill, Andrew Honey, Richard Sharpe)
  - Each: Quote, name, title

#### CTA Section
- **Background:** `bg-primary text-white`
- **Content:**
  - H2: "Start with a Conversation"
  - 2 paragraphs
  - CTA button (secondary variant)
  - Small print about confidentiality

### 2. Services Overview (`/services`)

**Meta:**
```
Title: Strategic Consulting Services | Board Advisory & Executive Coaching
Description: Board advisory, executive coaching, and organizational wellbeing services. Evidence-based strategic consulting from an FCMI Fellow.
```

**Structure:**

#### Page Hero
- **Background:** `bg-primary text-white`
- **Content:**
  - H1: "Strategic Advisory When Stakes Are High"
  - 2 paragraphs
  - 2 CTAs

#### Three Service Sections (alternating bg-eggshell and bg-gray-50)
Each section:
- Large card with padding
- H2 title
- Description paragraph
- 6-8 bullet points with checkmark icons
- **Dual buttons:**
  - Primary: "Learn More" → Individual service page
  - Secondary: "Discuss Your Challenge" → /contact

1. **Board Advisory & Governance**
2. **Executive Coaching**
3. **Organizational Wellbeing Audits**

#### CTA Section
- Standard CTA (as homepage)

### 3. Individual Service Pages

**Three pages with identical structure:**
1. `/services/board-advisory`
2. `/services/executive-coaching`
3. `/services/organizational-wellbeing`

**Common Structure:**

#### Hero Section
- **Background:** `bg-primary text-white`
- **Layout:** 2-column grid
- **Content:**
  - Badge with credentials
  - H1
  - 1-2 paragraphs
  - Stat/trust indicator box
  - 2 CTAs
  - Professional photo (right column)

#### What's Included Section
- **Background:** `bg-eggshell`
- **Content:**
  - H2 centered
  - 2-column grid of included items
  - Each item: Icon, title, description

#### Who This Is For Section
- **Background:** `bg-gray-50`
- **Content:**
  - H2 centered
  - 4 cards in 2x2 grid
  - Each card: H3, 4 bullet points

#### How It Works Section
- **Background:** `bg-eggshell`
- **Content:**
  - H2 centered
  - 3-4 numbered process steps
  - Each step: Number badge, H3, bullet points
  - Additional "What you provide / What Craig delivers" card

#### Why Craig Section
- **Background:** `bg-gray-50`
- **Content:**
  - H2 centered
  - 4 cards highlighting credentials/experience
  - Each: H3, 4 checkmark bullet points

#### Testimonials Section
- **Background:** `bg-eggshell`
- **Content:**
  - 2 relevant testimonials
  - Cards with quotes and attribution

#### FAQ Section
- **Background:** `bg-gray-50`
- **Content:**
  - H2 centered
  - 6-7 cards with Q&A
  - Each: H3 question, paragraph answer

#### Final CTA Section
- **Background:** `bg-primary text-white`
- **Content:**
  - H2
  - 2 paragraphs
  - 2 CTAs (email + contact form)
  - Small print

**Key Content Notes:**
- NO timeframe commitments (removed "6-12 months", "weekly sessions", etc.)
- Professional tone - confident but NOT arrogant
- Factual statements of experience
- No dismissive language about competitors
- Clear value propositions

### 4. About Page (`/about`)

**Structure:**

#### Hero Section
- **Background:** `bg-primary text-white`
- H1: "Strategic Insight From 17 Years at Board Level"
- Credential badges
- 2 CTAs
- Professional headshot

#### Experience Section
- **Background:** `bg-eggshell`
- H2: "Experience That Can't Be Googled"
- 4-5 paragraphs about Craig's background
- Focus on real experience, not just qualifications

#### Credentials Section
- **Background:** `bg-gray-50`
- Fellowship badges and awards
- Same layout as homepage

#### Sectors Section
- **Background:** `bg-eggshell`
- 2-column grid
- "100+ Organizations Supported"
- "How Directors Work With Craig"

#### CTA Section
- Standard CTA

### 5. Contact Page (`/contact`)

**Structure:**

#### Hero Section
- **Background:** `bg-primary text-white`
- H1: "Start a Conversation"
- Supporting copy

#### Contact Content
- **Background:** `bg-eggshell`
- 2-column grid:
  - **Left:** Contact information (email, location, response time)
  - **Right:** Calendly embed or contact form

#### What to Expect
- Cards explaining the consultation process

#### Testimonials
- 2 relevant testimonials

---

## Content Guidelines

### Tone of Voice

**DO:**
- Be direct and concise
- Use short, punchy sentences
- Lead with experience and evidence
- Use em dashes for emphasis
- Speak to board-level challenges
- Focus on outcomes and value

**DON'T:**
- Use jargon or buzzwords
- Make unsubstantiated claims
- Overstate credentials
- Be dismissive of others
- Use fear-based selling
- Include specific timeframes

### Writing Patterns

**Headlines:**
- Action-oriented
- Clear value proposition
- 8-12 words maximum
- Examples:
  - "The Strategic Advisor Boards Turn to First"
  - "Board Advisory That Comes From The Boardroom"
  - "Strategic Advisory When Stakes Are High"

**Body Copy:**
- 1-2 sentence paragraphs
- Concrete examples over abstract concepts
- "Not X—Y" pattern for differentiation
- Lead with problems, follow with solutions

**CTAs:**
- Clear next action
- No pressure language
- Examples:
  - "Book a Strategy Call"
  - "Discuss Your Challenge"
  - "Learn More"

### Credentials Format

**Always use:**
- FCMI Fellow (not just FCMI)
- FRSPH Fellow (not just FRSPH)
- IoD Ambassador (specify South West if relevant)
- "17 years at board level" (not "17+ years" or "over 17 years")
- "100+ organizations" (consistent format)

### Service Descriptions

**Format:**
```
[Service Name]

[One-sentence positioning statement]

[2-3 paragraphs explaining:]
- What it is
- Who it's for
- What makes it different

[Bullet points of deliverables]

[Clear CTA]
```

---

## SEO & Accessibility

### Meta Tags Template

```html
<title>[Page-specific Title] | Lighthouse Mentoring</title>
<meta name="description" content="[140-160 character description]" />
<meta name="keywords" content="[5-10 relevant keywords]" />
<link rel="canonical" href="[Canonical URL]" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="[Page URL]" />
<meta property="og:title" content="[Page Title]" />
<meta property="og:description" content="[Description]" />
<meta property="og:image" content="[Image URL]" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:title" content="[Page Title]" />
<meta property="twitter:description" content="[Description]" />
<meta property="twitter:image" content="[Image URL]" />
```

### Structured Data

**Organization Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Lighthouse Mentoring",
  "founder": {
    "@type": "Person",
    "name": "Craig Fearn"
  },
  "url": "https://lighthousementoring.co.uk",
  "logo": "https://lighthousementoring.co.uk/images/logo-final.png",
  "description": "Strategic consulting services...",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "Cornwall",
    "addressCountry": "UK"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "craig.fearn@lighthousementoring.co.uk",
    "contactType": "Customer Service"
  }
}
```

**Person Schema (for Craig):**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Craig Fearn",
  "jobTitle": "Strategic Consultant & Board Advisor",
  "affiliation": [
    "Institute of Directors",
    "Chartered Management Institute",
    "Royal Society for Public Health"
  ],
  "hasCredential": [
    "FCMI Fellow",
    "FRSPH Fellow",
    "IoD Ambassador"
  ]
}
```

**Breadcrumb Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://lighthousementoring.co.uk"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "[Current Page]",
      "item": "[Current URL]"
    }
  ]
}
```

### Accessibility Requirements

**WCAG 2.1 AA Compliance:**

1. **Color Contrast:**
   - Text on eggshell: Minimum 4.5:1 contrast ratio
   - Text on white cards: Minimum 4.5:1 contrast ratio
   - Primary buttons: Minimum 4.5:1 contrast ratio

2. **Focus States:**
   ```css
   *:focus-visible {
     @apply outline-none ring-4 ring-accent ring-offset-2;
   }
   ```

3. **Skip Links:**
   ```html
   <a href="#main-content" class="skip-to-content">
     Skip to main content
   </a>
   ```

4. **Semantic HTML:**
   - Proper heading hierarchy (h1 → h2 → h3)
   - `<nav>`, `<main>`, `<footer>` landmarks
   - `<article>` for testimonials
   - `<section>` for page sections

5. **Image Alt Text:**
   - Descriptive alt text for all images
   - Empty alt for decorative images
   - Example: `alt="Craig Fearn at IoD Conference"`

6. **ARIA Labels:**
   ```html
   <button aria-label="Toggle menu">...</button>
   <nav aria-label="Main navigation">...</nav>
   ```

### robots.txt

```
User-agent: *
Allow: /

Sitemap: https://lighthousementoring.co.uk/sitemap-index.xml
```

### sitemap.xml

Generated automatically by `@astrojs/sitemap`

---

## Performance Requirements

### Target Metrics

**Lighthouse Scores:**
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

**Core Web Vitals:**
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1
- First Contentful Paint (FCP): < 1.5s

### Image Optimization

**Strategy:**
```astro
import { Image, Picture } from 'astro:assets';

<!-- For hero images -->
<Picture
  src={heroImage}
  alt="Descriptive text"
  widths={[400, 600, 800, 1200]}
  sizes="(max-width: 768px) 100vw, 800px"
  formats={['avif', 'webp']}
  loading="eager"
  fetchpriority="high"
  quality={85}
/>

<!-- For below-fold images -->
<Image
  src={badgeImage}
  alt="Descriptive text"
  widths={[120, 240]}
  sizes="120px"
  loading="lazy"
  format="webp"
  quality={90}
/>
```

**Image Specifications:**
- Hero images: JPEG source, convert to AVIF/WebP
- Badge images: PNG source, convert to WebP
- Maximum source size: 2MB
- Quality setting: 85 for photos, 90 for badges/logos

### Font Loading

```css
@import '@fontsource-variable/inter';

@supports (font-variation-settings: normal) {
  :root {
    font-family: 'Inter Variable', system-ui, sans-serif;
  }
}
```

**Font Display Strategy:**
- Use variable font for performance
- Subset to Latin characters only
- Display strategy: swap

### Code Splitting

- Minimal JavaScript (navigation toggle only)
- No client-side frameworks
- Static site generation (SSG)
- CSS inlined for critical path

---

## Deployment Configuration

### Netlify/Vercel Configuration

**Build Settings:**
```
Build command: npm run build
Publish directory: dist
```

**Environment Variables:**
```
SITE_URL=https://lighthousementoring.co.uk
```

### Security Headers

**File:** `public/_headers`

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;
```

### SSL/TLS

- Force HTTPS
- HSTS enabled
- Certificate auto-renewal

### Performance Headers

```
/images/*
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.woff2
  Cache-Control: public, max-age=31536000, immutable
```

---

## Image Assets Required

### Logo & Branding
- `logo-final.png` - Primary logo (white version for dark backgrounds)
- `favicon.svg` - Favicon

### Professional Photos
- `craig-headshot.jpg` - Professional headshot (portrait)
- `iod-conference-07.jpg` - Conference photo option 1
- `iod-conference-83.jpg` - Conference photo option 2
- `iod-conference-142.jpg` - Conference photo option 3

### Credential Badges
- `RSPH-Fellow-Badge.jpg` - FRSPH Fellow badge (120x120)
- `IoD-Ambassador-badge-web.png` - IoD Ambassador badge (120x120)
- `cmi-fellow-certificate.png` - FCMI certificate (120x120)

### Award Badges
- `iod-aspiring-award-badge.png` - IoD Aspiring Director 2025 (300x300)
- `iod-global-award-badge.png` - IoD Global Award Finalist (300x300)

---

## Build Instructions

### Initial Setup

```bash
# Create new Astro project
npm create astro@latest lighthouse-mentoring

# Navigate to project
cd lighthouse-mentoring

# Install dependencies
npm install @astrojs/tailwind @astrojs/sitemap @fontsource-variable/inter sharp tailwindcss

# Initialize Tailwind
npx astro add tailwind

# Add sitemap integration
npx astro add sitemap
```

### Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Quality Checks

```bash
# Run Lighthouse audit
npm install -g lighthouse
lighthouse http://localhost:4321 --view

# Check accessibility
npm install -g pa11y
pa11y http://localhost:4321
```

---

## Testing Checklist

### Functional Testing
- [ ] All navigation links work
- [ ] Mobile menu toggles correctly
- [ ] All CTAs link to correct destinations
- [ ] Contact form/Calendly embed works
- [ ] All images load correctly
- [ ] Service pages are accessible from services overview

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Responsive Testing
- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1280px)
- [ ] Large desktop (1920px)

### Performance Testing
- [ ] Lighthouse score 95+ on all pages
- [ ] Images lazy load below fold
- [ ] Hero images load with priority
- [ ] No layout shift on page load
- [ ] Font loads without FOIT

### SEO Testing
- [ ] Meta tags present on all pages
- [ ] Canonical URLs set correctly
- [ ] Structured data validates (Google Rich Results Test)
- [ ] Sitemap.xml generates correctly
- [ ] Robots.txt allows indexing
- [ ] 404 page works

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader testing passes
- [ ] Color contrast meets WCAG AA
- [ ] Focus states visible
- [ ] Skip links work
- [ ] Semantic HTML correct
- [ ] ARIA labels where needed

---

## Maintenance & Updates

### Content Updates
- Testimonials: Add via new cards in testimonial sections
- Services: Update individual service pages
- Credentials: Update badges in credentials section

### Annual Updates
- Copyright year in footer (automated)
- Lighthouse reports and optimization
- Dependency updates
- SSL certificate renewal (automated)

### Performance Monitoring
- Monthly Lighthouse audits
- Core Web Vitals tracking
- Image optimization review
- Broken link checking

---

## Notes & Considerations

### Design Decisions

1. **Eggshell vs White:** Eggshell (#F4F1EA) for section backgrounds creates warmth; white cards provide contrast
2. **Dark Navigation:** Primary dark background establishes authority and professionalism
3. **Accent Color:** Bronze/rust (#A45C1A) is distinctive without being loud
4. **Typography:** Inter Variable for modern, professional appearance with excellent readability

### Content Strategy

1. **No Timeframes:** Removed specific duration commitments for flexibility
2. **Humble Confidence:** Factual statements of experience without arrogance
3. **Board-Level Language:** Speak to executives at their level
4. **Evidence-Based:** Lead with credentials and experience

### Technical Decisions

1. **Astro Framework:** Static site generation for maximum performance
2. **Tailwind CSS:** Utility-first for maintainability
3. **No Client JS:** Except navigation toggle for simplicity
4. **Image Optimization:** Astro's built-in tools for automatic optimization

---

## Contact for Questions

This specification should enable complete rebuild of the Lighthouse Mentoring website. For clarification on any section, refer to:

- Original site: https://lighthousementoring.co.uk
- Design system: Tailwind config
- Content tone: Existing page copy
- Technical approach: Astro documentation

**Document Version:** 2.0
**Last Updated:** January 2025
**Prepared for:** Complete site rebuild from scratch
