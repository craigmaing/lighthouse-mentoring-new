# Lighthouse Mentoring Website - Complete Code Index

**Generated:** 2025-10-13
**Purpose:** Comprehensive index of all site code for reference and development

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [Configuration Files](#configuration-files)
4. [Layouts & Core Components](#layouts--core-components)
5. [Pages](#pages)
6. [Components](#components)
7. [Content Collections](#content-collections)
8. [Styling](#styling)
9. [Data Files](#data-files)
10. [Scripts & Utilities](#scripts--utilities)
11. [Build & Development](#build--development)

---

## Project Overview

**Framework:** Astro 5.14.1
**Styling:** Tailwind CSS 3.4.17
**Image Optimization:** Sharp (Astro built-in)
**Site URL:** https://lighthousementoring.co.uk
**Deployment:** Netlify

### Key Features

- Static site generation (SSG) for maximum performance
- View Transitions API for smooth navigation
- Responsive images with AVIF/WebP formats
- Content collections for blog/insights
- SEO-optimized with structured data
- Mobile-first responsive design
- Lighthouse scores 95+

---

## File Structure

```
new-site/
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── blog/           # Blog-specific components
│   │   ├── Button.astro
│   │   ├── FAQAccordion.astro
│   │   ├── Footer.astro
│   │   ├── Navigation.astro
│   │   └── StructuredData.astro
│   ├── content/
│   │   ├── config.ts       # Content collections schema
│   │   └── insights/       # Blog posts (markdown)
│   ├── images/             # Image assets
│   ├── layouts/
│   │   ├── BlogPostLayout.astro
│   │   └── Layout.astro    # Base layout with SEO
│   ├── pages/              # File-based routing
│   │   ├── services/
│   │   ├── insights/
│   │   ├── index.astro     # Homepage
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── privacy.astro
│   │   ├── terms.astro
│   │   └── 404.astro
│   └── styles/
│       └── global.css      # Global styles + Tailwind
├── public/                 # Static assets
│   ├── images/
│   ├── js/
│   ├── favicon.ico
│   └── robots.txt
├── testimonials-data.json  # Testimonials database
├── astro.config.mjs        # Astro configuration
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript config
├── package.json            # Dependencies
└── netlify.toml            # Netlify config
```

---

## Configuration Files

### astro.config.mjs

Core Astro configuration with performance optimizations:

```javascript
// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://lighthousementoring.co.uk',

  // Prefetch for near-instant page navigation
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },

  // Experimental client prerender for even faster navigation
  experimental: {
    clientPrerender: true
  },

  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
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
    inlineStylesheets: 'always',
  },

  compressHTML: true,

  // Vite build optimizations
  vite: {
    build: {
      cssMinify: 'lightningcss',
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('astro')) {
                return 'vendor-astro';
              }
              return 'vendor';
            }
          },
        },
      },
    },
  },
});
```

**Key Features:**
- Viewport-based prefetching for fast navigation
- Client-side prerendering (experimental)
- LightningCSS for faster CSS minification
- Vendor code splitting for better caching
- HTML compression enabled

### tailwind.config.js

Custom design system configuration:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D2D2D',    // Dark charcoal
          light: '#3F3F3F',
          dark: '#1A1A1A',
        },
        accent: {
          DEFAULT: '#A45C1A',    // Warm bronze
          dark: '#8B4513',
          light: '#B8732C',
        },
        eggshell: '#F4F1EA',     // Warm cream background
        gray: {
          // Extended gray scale for professional aesthetic
          50: '#F9FAFB',
          100: '#F3F4F6',
          // ... full spectrum
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['2.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'h1': ['2rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        // ... more sizes
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1)...',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1)...',
      },
    },
  },
  plugins: [],
}
```

**Design System:**
- **Primary**: #2D2D2D (dark charcoal) - headers, navigation
- **Accent**: #A45C1A (warm bronze) - CTAs, links
- **Eggshell**: #F4F1EA (warm cream) - backgrounds
- **Font**: Inter (system sans-serif stack)
- **Mobile-first**: Responsive typography scales

### package.json

```json
{
  "name": "squealing-star",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/rss": "^4.0.12",
    "@astrojs/sitemap": "^3.6.0",
    "@astrojs/tailwind": "^6.0.2",
    "@fontsource-variable/inter": "^5.2.8",
    "astro": "^5.14.1",
    "sharp": "^0.34.4",
    "tailwindcss": "^3.4.17"
  }
}
```

**Key Dependencies:**
- Astro 5.14.1 (latest stable)
- Tailwind CSS 3.4.17
- Inter variable font (self-hosted)
- Sharp for image optimization
- RSS feed generation
- Sitemap generation

---

## Layouts & Core Components

### src/layouts/Layout.astro

Base layout component with SEO, meta tags, and structured data:

```astro
---
import { ClientRouter } from 'astro:transitions';
import Navigation from '../components/Navigation.astro';
import StructuredData from '../components/StructuredData.astro';
import Footer from '../components/Footer.astro';

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
  keywords = 'board advisory, executive coaching...',
  schemaType = 'homepage',
  serviceName,
  serviceDescription
} = Astro.props;

const ogImageURL = new URL(ogImage, Astro.site);
const canonicalURL = new URL(Astro.url.pathname, "https://lighthousementoring.co.uk");
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="index, follow, max-snippet:-1..." />
    <meta name="google-site-verification" content="nom2dcJdMs2GaOtHfyDYtr0T3M5--fz3_5sWm6F9zTM" />

    <!-- Favicons -->
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="canonical" href={canonicalURL} />

    <!-- Font preload -->
    <link rel="preload" href="..." as="font" type="font/woff2" crossorigin />

    <!-- RSS Feed -->
    <link rel="alternate" type="application/rss+xml" title="Lighthouse Mentoring Insights" href="/rss.xml" />

    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />

    <!-- Open Graph & Twitter Cards -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImageURL} />

    <ClientRouter />
    <StructuredData type={schemaType} serviceName={serviceName} serviceDescription={serviceDescription} />

    <!-- Google Analytics (conditional) -->
    {import.meta.env.PUBLIC_GA_MEASUREMENT_ID && (
      <script async src="https://www.googletagmanager.com/gtag/js..."></script>
    )}
  </head>
  <body>
    <a href="#main-content" class="skip-to-content">Skip to main content</a>
    <Navigation />
    <main id="main-content" tabindex="-1">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

**Features:**
- Comprehensive SEO meta tags
- Open Graph & Twitter Cards
- Google Analytics integration
- Skip-to-content link (accessibility)
- View Transitions API
- Structured data integration
- Canonical URLs

### src/components/Navigation.astro

Sticky navigation with mobile menu:

```astro
---
const currentPath = Astro.url.pathname;

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/insights', label: 'Insights' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];
---

<nav transition:persist transition:name="main-nav" class="bg-primary border-b border-primary/50 shadow-lg sticky top-0 z-50">
  <div class="container">
    <div class="flex items-center justify-between h-20">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-3">
        <picture>
          <source srcset="/images/logo-white.webp" type="image/webp" />
          <img src="/images/logo-white.png" alt="Lighthouse Mentoring" class="h-10 w-auto" />
        </picture>
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a href={link.href} class={currentPath === link.href ? 'text-white border-b-2 border-accent' : 'text-gray-200 hover:text-white'}>
            {link.label}
          </a>
        ))}
      </div>

      <!-- CTA Button -->
      <div class="hidden md:block">
        <a href="/contact" class="btn-nav">Get Started</a>
      </div>

      <!-- Mobile Menu Button -->
      <button id="mobile-menu-button" class="md:hidden">
        <svg>...</svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden md:hidden pb-4">
      {navLinks.map((link) => (
        <a href={link.href} class="block py-3">{link.label}</a>
      ))}
    </div>
  </div>
</nav>

<script src="/js/mobile-menu.js"></script>
```

**Features:**
- Sticky positioning
- Active link highlighting
- Responsive mobile menu
- View Transitions persistence
- WebP/PNG fallback for logo

### src/components/Footer.astro

Site footer with links and contact info:

```astro
---
const currentYear = new Date().getFullYear();
---

<footer class="bg-primary text-gray-300">
  <div class="container py-12">
    <div class="grid md:grid-cols-4 gap-8 mb-8">
      <!-- Company Info -->
      <div class="md:col-span-2">
        <picture>
          <source srcset="/images/logo-white.webp" type="image/webp" />
          <img src="/images/logo-white.png" alt="Lighthouse Mentoring" />
        </picture>
        <p class="text-gray-400 leading-relaxed mb-4">
          Strategic consulting and board advisory services...
        </p>
        <p class="text-sm text-gray-400">
          FCMI Fellow | FRSPH Fellow | IoD Ambassador
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-white font-semibold mb-4">Quick Links</h3>
        <ul class="space-y-2">
          <li><a href="/">Home</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/insights">Insights</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h3 class="text-white font-semibold mb-4">Get In Touch</h3>
        <ul class="space-y-2 text-sm">
          <li>
            <a href="mailto:craig.fearn@lighthousementoring.co.uk">
              craig.fearn@lighthousementoring.co.uk
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/craig-fearn1/" target="_blank" rel="noopener">
              Connect on LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-gray-800 pt-8">
      <p class="text-sm text-gray-400">
        © {currentYear} Lighthouse Mentoring. All rights reserved.
      </p>
      <div class="flex gap-6 text-sm">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
```

**Features:**
- Credentials display
- Quick navigation links
- Contact information
- Legal links
- Dynamic copyright year

---

## Pages

### src/pages/index.astro (Homepage)

**Key Sections:**

1. **Hero Section**
   - Headline: "The Strategic Advisor Boards Turn to First"
   - Craig's credentials (IoD Ambassador, FRSPH Fellow, FCMI Fellow)
   - Trust indicators
   - Professional image

2. **Value Proposition**
   - "Strategic Advisory When Stakes Are High"
   - Three service cards: Board Advisory, Executive Coaching, Organizational Wellbeing

3. **How It Works**
   - 3-step process: Strategy Call → Custom Proposal → Deliver Results

4. **Modern Tools Section**
   - "Modern Tools, Human Judgment"
   - AI integration explanation

5. **Credentials Section**
   - Image badges for FRSPH, IoD Ambassador, FCMI
   - IoD Awards finalist badges (2025)

6. **Latest Insights**
   - Featured blog posts (max 3)
   - Category tags, read time, CTA to full article

7. **Testimonials**
   - 4 testimonials in 2×2 grid
   - C-suite and board-level focus

8. **Final CTA**
   - "Start with a Conversation"
   - Book strategy call

**Testimonials Logic:**
```javascript
const homepageTestimonials = testimonialsData
  .filter(t => t.featured && (
    t.category.includes('c-suite') ||
    t.category.includes('iod-leadership') ||
    t.category.includes('board-advisory')
  ))
  .slice(0, 4);
```

Currently showing: Jeremy Wrathall, Steve Hill, Richard Sharpe, Chris Saxby

### Service Pages

**Located in:** `src/pages/services/`

1. **board-advisory.astro** - Board Advisory & Governance
2. **executive-coaching.astro** - Executive Coaching
3. **organizational-wellbeing.astro** - Organizational Wellbeing Audits

**Common Structure:**
- Hero with service-specific headline
- "Who It's For" section
- "How It Works" process
- Benefits/outcomes
- Testimonials (2-4, filtered to avoid homepage duplicates)
- FAQ accordion
- CTA section

### Other Pages

- **about.astro** - Craig's story, credentials, board experience
- **contact.astro** - Contact form + Calendly embed
- **privacy.astro** - Privacy policy
- **terms.astro** - Terms of service
- **404.astro** - Custom 404 page
- **thank-you.astro** - Post-contact form submission

---

## Components

### src/components/Button.astro

Reusable button component with variants:

```astro
---
interface Props {
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'large';
  class?: string;
}

const { href, variant = 'primary', size = 'default', class: className = '' } = Astro.props;

const variants = {
  primary: 'bg-accent text-white hover:bg-accent-dark',
  secondary: 'bg-eggshell text-primary hover:bg-gray-100',
  ghost: 'bg-transparent border-2 border-white text-white hover:bg-white/10',
};

const sizes = {
  default: 'px-6 py-3 text-base',
  large: 'px-8 py-4 text-lg',
};
---

<a
  href={href}
  class={`btn ${variants[variant]} ${sizes[size]} ${className}`}
>
  <slot />
</a>
```

### src/components/FAQAccordion.astro

Accordion for FAQ sections:

```astro
---
interface Props {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

const { faqs } = Astro.props;
---

<div class="space-y-4">
  {faqs.map((faq, index) => (
    <details class="group border border-gray-200 rounded-lg p-6">
      <summary class="cursor-pointer font-semibold text-gray-900 flex justify-between items-center">
        {faq.question}
        <svg class="w-5 h-5 transform group-open:rotate-180 transition-transform">
          <!-- Chevron icon -->
        </svg>
      </summary>
      <p class="mt-4 text-gray-700 leading-relaxed">
        {faq.answer}
      </p>
    </details>
  ))}
</div>
```

### src/components/StructuredData.astro

JSON-LD schema.org markup for SEO:

```astro
---
interface Props {
  type: 'homepage' | 'person' | 'service';
  serviceName?: string;
  serviceDescription?: string;
}

const { type, serviceName, serviceDescription } = Astro.props;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Lighthouse Mentoring",
  "url": "https://lighthousementoring.co.uk",
  "logo": "https://lighthousementoring.co.uk/images/logo.png",
  "founder": {
    "@type": "Person",
    "name": "Craig Fearn",
    "jobTitle": "Founder & Principal Consultant",
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Fellowship",
        "name": "FRSPH Fellow"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Fellowship",
        "name": "FCMI Fellow"
      }
    ]
  }
};

// Schema generation based on type...
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

### Blog Components

**Located in:** `src/components/blog/`

1. **TLDRSummary.astro** - Executive summary for AI search
2. **KeyTakeaways.astro** - Bullet-point takeaways
3. **FAQSection.astro** - Blog post FAQs
4. **AuthorByline.astro** - Author info with credentials

---

## Content Collections

### src/content/config.ts

Content collection schema for blog posts:

```typescript
import { defineCollection, z } from 'astro:content';

const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Craig Fearn'),
    authorCredentials: z.string().optional(),
    readTime: z.string().optional(),
    category: z.enum([
      'board-advisory',
      'executive-coaching',
      'wellbeing',
      'leadership',
      'governance'
    ]),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    // AI Search Optimization fields
    tldr: z.array(z.string()).optional(),
    keyTakeaways: z.array(z.string()).optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
  }),
});

export const collections = {
  insights,
};
```

**Schema Fields:**
- **title** - Post title
- **description** - Meta description
- **pubDate** - Publication date
- **category** - One of 5 categories
- **featured** - Show on homepage
- **tldr** - Executive summary for AI
- **keyTakeaways** - Bullet points
- **faqs** - Structured Q&A

### Blog Post Example

**Location:** `src/content/insights/example-post.md`

```markdown
---
title: "How to Build High-Performing Boards"
description: "Evidence-based strategies for board effectiveness"
pubDate: 2025-01-15
category: "board-advisory"
featured: true
readTime: "8 min read"
tldr:
  - "Board effectiveness depends on culture, not just structure"
  - "Diversity improves decision-making quality by 35%"
  - "Regular effectiveness reviews correlate with better outcomes"
keyTakeaways:
  - "Establish clear board purpose and roles"
  - "Build psychological safety for constructive challenge"
  - "Invest in ongoing director development"
faqs:
  - question: "How often should boards conduct effectiveness reviews?"
    answer: "Annual formal reviews are recommended, with informal check-ins quarterly."
---

# How to Build High-Performing Boards

[Content here...]
```

---

## Styling

### src/styles/global.css

Global styles and Tailwind utilities:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Typography */
  body {
    @apply font-sans text-gray-900 antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-semibold text-gray-900;
  }

  /* Headings responsive sizing */
  h1 {
    @apply text-h1 md:text-[2.5rem];
  }

  h2 {
    @apply text-h2 md:text-[2rem];
  }

  h3 {
    @apply text-h3 md:text-[1.75rem];
  }

  /* Links */
  a {
    @apply transition-colors duration-200;
  }
}

@layer components {
  /* Container */
  .container {
    @apply mx-auto px-4 md:px-6 lg:px-8 max-w-7xl;
  }

  /* Section Padding */
  .section-padding {
    @apply py-16 md:py-24;
  }

  /* Cards */
  .card {
    @apply bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200;
  }

  /* Buttons */
  .btn {
    @apply inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 min-h-11;
  }

  .btn-nav {
    @apply px-6 py-2.5 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors font-semibold min-h-11 inline-flex items-center;
  }

  /* Badges */
  .badge {
    @apply inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-800 border border-gray-200;
  }

  /* Credentials Badge */
  .credential-badge {
    @apply flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-100;
  }

  .credential-badge__image {
    @apply w-32 h-32 object-contain mb-4;
  }

  .credential-badge__image--award {
    @apply w-full h-auto max-w-sm;
  }

  .credential-badge__title {
    @apply text-lg font-semibold text-gray-900 mb-1;
  }

  .credential-badge__subtitle {
    @apply text-sm text-gray-600;
  }

  /* Skip to content link (accessibility) */
  .skip-to-content {
    @apply absolute left-0 top-0 bg-accent text-white px-4 py-2 -translate-y-full focus:translate-y-0 z-[9999] transition-transform;
  }

  /* Hero typography */
  .hero h1 {
    @apply text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] leading-tight font-bold;
  }
}

@layer utilities {
  /* Text utilities */
  .text-h2 {
    @apply text-h2 md:text-[2rem];
  }

  .text-h3 {
    @apply text-h3 md:text-[1.75rem];
  }

  /* Line clamp */
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus visible for keyboard navigation */
:focus-visible {
  @apply outline-2 outline-offset-2 outline-accent;
}
```

**Key Classes:**
- `.container` - Max-width container with responsive padding
- `.section-padding` - Consistent vertical spacing
- `.card` - Elevated card component
- `.btn` / `.btn-nav` - Button styles
- `.credential-badge` - Credential display component
- `.skip-to-content` - Accessibility link

---

## Data Files

### testimonials-data.json

**Location:** Project root (not in src/)

**Structure:**
```json
[
  {
    "id": "unique-id",
    "name": "Full Name",
    "role": "Job Title",
    "company": "Company Name",
    "date": "YYYY-MM-DD",
    "category": ["executive-coaching", "c-suite"],
    "featured": true,
    "content": "Full testimonial (200-300 words)",
    "excerpt": "Short excerpt (1-2 sentences)"
  }
]
```

**Categories:**
- `executive-coaching` - Executive/business coaching
- `coaching` - General coaching
- `wellbeing` - Organizational wellbeing
- `organizational-support` - Wellbeing support
- `board-advisory` - Board advisory work
- `iod-leadership` - IoD leadership work
- `c-suite` - C-suite level

**CRITICAL RULE:** No testimonial appears on multiple pages

**Distribution:**
- **Homepage**: 4 testimonials (C-suite/IoD/board-advisory)
- **Board Advisory**: 2 testimonials (excluding homepage)
- **Wellbeing**: 4 testimonials (excluding homepage/board)
- **Executive Coaching**: 2 testimonials (high-quality only)
- **About**: 3 manually-specified (character-focused)

**Utility Scripts:**
- `check-all-page-testimonials.cjs` - Verify distribution
- `analyze-all-testimonials.cjs` - Show all with categories
- `check-coaching-available.cjs` - Check available for coaching page

---

## Scripts & Utilities

### Testimonial Verification

**check-all-page-testimonials.cjs**
```javascript
// Comprehensive check across all pages
// Reports which testimonials appear on each page
// Flags duplicates with ⚠️  warnings
// Usage: node check-all-page-testimonials.cjs
```

### Blog Post Management

**audit-all-blog-posts.cjs**
```javascript
// Analyzes all blog posts for:
// - TLDR presence
// - Key takeaways count
// - FAQ count
// - Content quality metrics
```

**fix-all-blog-posts.cjs**
```javascript
// Batch fixes for blog posts:
// - Add missing TLDR
// - Format key takeaways
// - Add FAQs
```

### Lighthouse Testing

**analyze-lighthouse.cjs**
```javascript
// Parses Lighthouse JSON reports
// Compares before/after optimizations
// Usage: node analyze-lighthouse.cjs lighthouse-report.json
```

**compare-lighthouse.cjs**
```javascript
// Compares two Lighthouse reports
// Shows performance deltas
// Usage: node compare-lighthouse.cjs report1.json report2.json
```

### Link Testing

**test-all-links.cjs**
```javascript
// Crawls site and tests all links
// Reports broken links and redirects
// Checks internal and external links
```

---

## Build & Development

### Development

```bash
npm run dev
# Runs on http://localhost:4321
# Hot module replacement enabled
```

### Production Build

```bash
npm run build
# Output: dist/
# Static site generation
# Optimized images (AVIF/WebP)
# Minified CSS/JS
# Compressed HTML
```

### Preview Build

```bash
npm run preview
# Preview production build locally
```

### Type Checking

```bash
npm run astro check
# TypeScript validation
# Astro component checking
```

---

## Performance Optimizations

### Images

**Formats:** AVIF → WebP → Original fallback

**Example:**
```astro
<Picture
  src={heroImage}
  widths={[400, 800, 1200, 1600]}
  sizes="(max-width: 640px) 400px, ..."
  formats={['avif', 'webp']}
  loading="eager"
  quality={85}
/>
```

### Navigation Prefetching

**Strategy:** Viewport-based prefetching
- Links prefetch as they enter viewport
- Near-instant navigation
- Client-side prerendering (experimental)

### CSS Optimization

- **LightningCSS** for faster minification
- **Inline critical CSS** (`inlineStylesheets: 'always'`)
- Tailwind purges unused CSS

### JavaScript

- **Vendor code splitting** for better caching
- **Minimal client-side JS** (mobile menu only)
- **Async loading** for analytics

### Build Output

```
dist/
├── _astro/              # Chunked assets with hashes
│   ├── vendor-astro.[hash].js
│   ├── vendor.[hash].js
│   └── [page].[hash].css
├── images/              # Optimized images (AVIF/WebP)
├── index.html
├── services/
│   ├── board-advisory.html
│   ├── executive-coaching.html
│   └── organizational-wellbeing.html
├── insights/
│   ├── index.html
│   └── [slug].html
└── sitemap-0.xml
```

---

## SEO Implementation

### Meta Tags

Every page includes:
- Title (< 60 characters)
- Description (150-160 characters)
- Keywords
- Canonical URL
- Open Graph tags
- Twitter Card tags

### Structured Data

**Types:**
- Organization (homepage)
- Person (about page)
- ProfessionalService (service pages)
- BlogPosting (blog posts)

### Sitemap

**Generated:** `sitemap-0.xml`
**Update frequency:** Weekly
**Priority:** 0.7
**Last modified:** Dynamic (build time)

### Robots.txt

```
User-agent: *
Allow: /

Sitemap: https://lighthousementoring.co.uk/sitemap-0.xml
```

---

## Accessibility

### WCAG 2.1 AA Compliance

- **Skip-to-content link** for keyboard navigation
- **Semantic HTML** (nav, main, footer, article)
- **ARIA labels** on interactive elements
- **Focus indicators** on all interactive elements
- **Alt text** on all images
- **Color contrast** meets AA standards (4.5:1 minimum)

### Keyboard Navigation

- All interactive elements reachable via Tab
- Mobile menu accessible via keyboard
- Focus visible on all elements

### Screen Reader Support

- Proper heading hierarchy (h1 → h2 → h3)
- Descriptive link text
- Form labels associated with inputs
- ARIA landmarks

---

## Deployment

### Netlify Configuration

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404

[build.environment]
  NODE_VERSION = "20"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Environment Variables

**Required:**
- `PUBLIC_GA_MEASUREMENT_ID` - Google Analytics (optional)

### Domain

**Primary:** https://lighthousementoring.co.uk
**SSL:** Automatic (Let's Encrypt)
**CDN:** Netlify Edge Network

---

## Maintenance Checklist

### Weekly
- [ ] Monitor Google Search Console for indexing issues
- [ ] Check Lighthouse scores (maintain 95+)
- [ ] Review testimonial distribution (no duplicates)

### Monthly
- [ ] Update dependencies (`npm update`)
- [ ] Review blog post performance
- [ ] Check broken links
- [ ] Monitor Core Web Vitals

### Quarterly
- [ ] Content audit (update outdated information)
- [ ] SEO keyword analysis
- [ ] Accessibility audit
- [ ] Performance testing

---

## Key Files Reference

### Most Important Files

1. **src/layouts/Layout.astro** - Base layout, SEO foundation
2. **src/pages/index.astro** - Homepage (primary conversion page)
3. **src/styles/global.css** - Design system
4. **tailwind.config.js** - Color palette, typography
5. **testimonials-data.json** - Testimonial database
6. **astro.config.mjs** - Performance optimizations

### Critical Components

1. **Navigation.astro** - Site navigation
2. **Footer.astro** - Footer with credentials
3. **StructuredData.astro** - Schema.org markup
4. **Button.astro** - CTA buttons

### Service Pages

1. **services/board-advisory.astro**
2. **services/executive-coaching.astro**
3. **services/organizational-wellbeing.astro**

---

## Technical Debt & Future Improvements

### Current Limitations

1. **Mobile menu** - Uses inline script, could be componentized
2. **Testimonial filtering** - Logic duplicated across pages
3. **Image formats** - Not all images have AVIF versions
4. **Form validation** - Client-side only

### Planned Improvements

1. **Dynamic sitemap** - Generate from page data
2. **Image service** - Automated AVIF/WebP conversion
3. **CMS integration** - Consider headless CMS for blog
4. **A/B testing** - Test headline variations

---

## Contact & Support

**Developer:** Claude Code
**Project Owner:** Craig Fearn
**Email:** craig.fearn@lighthousementoring.co.uk
**Last Updated:** 2025-10-13

---

**End of Code Index**
