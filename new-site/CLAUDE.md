# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Professional services marketing website for **Lighthouse Mentoring**, founded by Craig Fearn. Built with Astro 5 and Tailwind CSS, showcasing board advisory, executive coaching, and organizational wellbeing services targeting C-suite executives and senior leaders.

## About Craig Fearn & Lighthouse Mentoring

**Craig Fearn's Credentials** (CRITICAL - Must be accurate):
- **2 Fellowships**: FRSPH Fellow (Royal Society for Public Health) and FCMI Fellow (Chartered Management Institute)
- **1 Ambassadorship**: IoD Ambassador (Institute of Directors South West)
- **NOT 3 Fellowships** - IoD Ambassador is an ambassadorship, not a fellowship
- Additional: MEd, BSc (Hons), PGCE (L7), QTLS, EMCC Professional Coach
- Recent certifications: Google Project Management, Yale (Science of Well-Being), Johns Hopkins (Psychological First Aid), UC Davis Health, NEDonBoard

Craig works at **board and senior manager level** providing:
- Board Advisory and NED services
- Executive Coaching
- Organizational Wellbeing Audits
- Strategic Consulting

**Core motivation**: To help people through authentic, human-centered service delivery.

## Agency Structure & Working Approach

You should work as a **complete design agency** with all relevant employees and agents. You can work agentically - having agents become different parts of the agency with you as the project manager if you think that's best. The approach is left to you.

### Available Tools
- 1M context window
- MCP (Model Context Protocol) tools
- Agent delegation capabilities
- Ability to change thinking state for complex problems

## Research Requirements

### SEO & Keyword Research
For **every service** Craig provides, you must:
1. Research the most searched-for terms
2. Understand different ways people search (language variations)
3. Analyze search volume and competition
4. Map buyer intent and search patterns

### Services to Research
- Non-Executive Director (NED)
- Board Advisory
- Strategic Consulting
- Executive Coaching
- Business Coaching
- Wellbeing Governance
- Management Consulting

### Competitor Analysis
For each service offering:
1. Find competitor information
2. Understand what competitors are targeting
3. Identify differentiation opportunities
4. Analyze their messaging and positioning

### Design Research
Research design trends for premium consultancy sites including:
- Impactful hero section design
- Premium B2B design patterns
- Conversion optimization strategies
- UX/UI best practices for executive audiences
- Typography and visual hierarchy
- Trust signals and credibility markers

## Constraints & Ethics

**Never:**
- Lie or make things up
- Make false claims
- Sell with fear
- Slag off competitors
- Use jargon

**Always:**
- Use clear, accessible language
- Target content precisely
- Perfect the user journey
- Pay special attention to UX/UI
- Maintain professional credibility

## Assets & Resources

**Can Use:**
- Images, banners, and logos in the folder
- Can read the running site

**Cannot Use:**
- External images or assets
- Content from other sites (except for research)

**Old Documentation:**
- Ignore all other MD files in the folder - they are for old projects
- These can probably be deleted so you can do all research fresh

## Technical Stack

**Framework**: Astro 5.x
- Static site generation
- Island architecture for performance
- Component-based development
- View Transitions API for smooth page navigation

**Styling**: Tailwind CSS
- Custom design system with professional color palette
- Responsive utilities
- Custom components via @layer

**Dependencies**:
```json
{
  "@astrojs/check": "^0.9.4",
  "@astrojs/tailwind": "^5.1.2",
  "astro": "^5.0.5",
  "tailwindcss": "^3.4.17",
  "typescript": "^5.7.2"
}
```

## Commands

**Development**: `npm run dev -- --port 1000`
- Runs Astro dev server on port 1000
- Hot module replacement enabled
- Access at http://localhost:1000

**Build**: `npm run build`
- Static site generation
- Output to `dist/` directory

**Preview**: `npm run preview`
- Preview production build locally

**Type Checking**: `npm run astro check`
- TypeScript validation

## Architecture

### Directory Structure
```
src/
├── components/
│   ├── CallToAction.astro       # CTA buttons/sections
│   ├── CredentialBadge.astro    # Credential display badges
│   ├── Footer.astro             # Site footer with contact/legal
│   ├── Header.astro             # Navigation header
│   ├── Hero.astro               # Hero section template
│   ├── ServiceCard.astro        # Service offering cards
│   ├── StructuredData.astro     # Schema.org JSON-LD
│   └── TestimonialCard.astro    # Testimonial display cards
├── layouts/
│   └── Layout.astro             # Base page layout with SEO
├── pages/
│   ├── index.astro              # Homepage
│   ├── about.astro              # About Craig page
│   ├── contact.astro            # Contact form + Calendly
│   ├── privacy.astro            # Privacy policy
│   ├── terms.astro              # Terms of service
│   └── services/
│       ├── board-advisory.astro           # Board advisory service
│       ├── executive-coaching.astro       # Executive coaching service
│       └── organizational-wellbeing.astro # Wellbeing audits
├── styles/
│   └── global.css               # Global styles + Tailwind
└── images/                      # Optimized image assets
testimonials-data.json           # Root-level testimonial database
```

### Layout Component Props

All pages use `Layout.astro` with these props:

```typescript
interface Props {
  title: string;              // Page title (appended with " | Lighthouse Mentoring")
  description: string;        // Meta description for SEO
  schemaType?: 'home' | 'about' | 'service' | 'contact';
  serviceName?: string;       // For service pages only
}
```

**Schema Types**:
- `home`: Organization + ProfessionalService schema
- `about`: Person schema for Craig Fearn
- `service`: ProfessionalService schema with specific service details
- `contact`: ContactPage schema

### Design System (Tailwind Config)

**Colors**:
```javascript
colors: {
  primary: '#2D2D2D',      // Dark charcoal (headers, text)
  accent: '#A45C1A',       // Warm bronze (CTAs, links)
  eggshell: '#F4F1EA',     // Warm off-white (backgrounds)
}
```

**Typography**:
- Headings: System serif stack (Georgia, Cambria, Times New Roman)
- Body: System sans-serif (Inter-like)
- Professional, sophisticated aesthetic

**Custom Components** (via @layer components):
```css
.section-padding { @apply py-16 md:py-24 }
.container { @apply mx-auto px-4 md:px-6 lg:px-8 }
.card { @apply bg-white p-6 md:p-8 shadow-sm border border-gray-100 }
.credential-badge { /* Credential display styling */ }
.credential-badge__image--award { /* Award/certification styling */ }
```

## Testimonials System

**CRITICAL RULE**: No testimonial can appear on multiple pages.

### Data Structure (testimonials-data.json)

Located at **root level** (not in src/):

```json
{
  "id": "unique-id",
  "name": "Full Name",
  "role": "Job Title",
  "company": "Company Name",
  "date": "YYYY-MM-DD",
  "category": ["executive-coaching", "wellbeing", "board-advisory", "c-suite"],
  "featured": true,
  "content": "Full testimonial text (200-300 words)",
  "excerpt": "Shorter excerpt (1-2 sentences)"
}
```

**Categories**:
- `executive-coaching` - Executive/business coaching
- `coaching` - General coaching
- `wellbeing` - Organizational wellbeing work
- `organizational-support` - Wellbeing support
- `board-advisory` - Board advisory work
- `iod-leadership` - IoD leadership work
- `c-suite` - C-suite level testimonials

### Testimonial Distribution (Current State)

**Homepage** (4 testimonials in 2×2 grid):
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

**Board Advisory Page** (2 testimonials):
```javascript
const homepageNames = ['Jeremy Wrathall', 'Steve Hill', 'Richard Sharpe', 'Chris Saxby'];
const boardTestimonials = testimonialsData
  .filter(t => t.featured &&
    (t.category.includes('board-advisory') || t.category.includes('iod-leadership')) &&
    !homepageNames.includes(t.name))
  .slice(0, 2);
```
Currently showing: Andrew Honey CDir FIoD, Des Bell

**Organizational Wellbeing Page** (4 testimonials):
```javascript
const homepageNames = ['Jeremy Wrathall', 'Steve Hill', 'Richard Sharpe', 'Chris Saxby'];
const boardNames = ['Andrew Honey CDir FIoD'];
const wellbeingTestimonials = testimonialsData
  .filter(t => t.featured &&
    (t.category.includes('wellbeing') || t.category.includes('organizational-support')) &&
    !homepageNames.includes(t.name) &&
    !boardNames.includes(t.name))
  .slice(0, 4);
```
Currently showing: Terry Mullins, Michael Redgewell (Edrington UK), David McGuire, Nidal Ramini (Brown-Forman)

**Executive Coaching Page** (2 testimonials - intentionally limited to highest quality):
```javascript
const wellbeingPageNames = ['Terry Mullins', 'Michael Redgewell', 'David McGuire', 'Nidal Ramini'];
const coachingTestimonials = testimonialsData
  .filter(t => t.featured &&
    (t.category.includes('executive-coaching') || t.category.includes('coaching')) &&
    !wellbeingPageNames.includes(t.name))
  .slice(0, 4);
```
Currently showing: Phil Tottman, Dianne Knight (HSBC)

**About Page** (3 manually-specified testimonials - character-focused):
```javascript
const aboutTestimonials = [
  'Tim Etherington-Judge',      // Healthy Hospo - empathy focus
  'Sabina Ôn-Stothard PIEMA',   // AECOM - compassion + credentials
  'Mark Kendall'                // Web Developer - warm and genuine
];
```

### Adding New Testimonials

1. Add to `testimonials-data.json` with accurate metadata
2. Set `featured: true` to make it available
3. Choose appropriate categories
4. Testimonial will appear on first eligible page based on filtering logic
5. Run verification script to check for duplicates

### Global Brand Testimonials

High-value testimonials from globally recognized companies:
- **Michael Redgewell** - Edrington UK (premium spirits - Macallan, Highland Park)
- **Nidal Ramini** - Brown-Forman (Jack Daniels, Woodford Reserve)
- **Tim Etherington-Judge** - Healthy Hospo (hospitality wellbeing)
- **Sabina Ôn-Stothard** - AECOM (Fortune 500 engineering)
- **Dianne Knight** - HSBC (global banking)

## Image Optimization

**Astro Picture Component** (for hero images):
```astro
<Picture
  src={import('../images/craig-hero.webp')}
  widths={[400, 800, 1200, 1600]}
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, (max-width: 1536px) 1200px, 1600px"
  formats={['avif', 'webp']}
  alt="Craig Fearn - Board Advisory & Executive Coaching"
  loading="eager"
/>
```

**Astro Image Component** (for content images):
```astro
<Image
  src={import('../images/credential.webp')}
  alt="FRSPH Fellowship"
  width={120}
  height={120}
  loading="lazy"
/>
```

**Format Hierarchy**: AVIF → WebP → Original
- AVIF: Best compression, modern browsers
- WebP: Fallback for older browsers
- Original: Ultimate fallback

## SEO & Structured Data

**Schema.org Implementation** (StructuredData.astro):

```typescript
// Organization schema (homepage)
{
  "@type": "Organization",
  "name": "Lighthouse Mentoring",
  "founder": {
    "@type": "Person",
    "name": "Craig Fearn",
    "jobTitle": "Founder & Principal Consultant",
    "hasCredential": [
      { "@type": "EducationalOccupationalCredential", "credentialCategory": "Fellowship", "name": "FRSPH Fellow" },
      { "@type": "EducationalOccupationalCredential", "credentialCategory": "Fellowship", "name": "FCMI Fellow" }
    ]
  }
}

// Person schema (about page)
{
  "@type": "Person",
  "name": "Craig Fearn",
  "hasCredential": [...]
}

// ProfessionalService schema (service pages)
{
  "@type": "ProfessionalService",
  "name": "Executive Coaching",
  "provider": { "@type": "Organization", "name": "Lighthouse Mentoring" }
}
```

**Meta Tags** (Layout.astro):
- Title: `{title} | Lighthouse Mentoring`
- Description: Custom per page (150-160 characters)
- OpenGraph tags for social sharing
- Twitter Card tags
- Canonical URL

## Credential Accuracy (CRITICAL)

**Craig has exactly**:
- **2 Fellowships**: FRSPH (Royal Society for Public Health) and FCMI (Chartered Management Institute)
- **1 Ambassadorship**: IoD Ambassador (Institute of Directors South West)

**Common mistakes to avoid**:
- ❌ "Three Fellowships" - WRONG
- ❌ "IoD Fellow" - WRONG (it's Ambassador, not Fellow)
- ✅ "Two Fellowships plus serves as IoD Ambassador" - CORRECT

**Additional credentials**:
- MEd, BSc (Hons), PGCE (L7), QTLS
- EMCC Professional Coach
- Recent certifications: Google Project Management (2025), Yale Science of Well-Being (2021), Johns Hopkins Psychological First Aid (2021), UC Davis Health Managing as a Coach (2022), NEDonBoard NED Accelerator (2021), University of Sydney Positive Psychiatry (2021)

**Where credentials appear**:
- Homepage hero section
- About page (detailed credentials section)
- Footer
- StructuredData.astro (Schema.org markup)

## Utility Scripts

### check-all-page-testimonials.cjs
Comprehensive testimonial distribution report across all pages. Checks for duplicates.

**Usage**: `node check-all-page-testimonials.cjs`

**Output**:
- Lists testimonials on each page (Homepage, Board Advisory, Wellbeing, Executive Coaching, About)
- Shows total testimonials used vs. available
- Flags any duplicates with ⚠️  warnings
- ✅ confirmation if no duplicates found

### check-tim.cjs
Checks Tim Etherington-Judge's status and position in Wellbeing page queue.

### check-coaching-available.cjs
Lists all available testimonials for Executive Coaching page after filtering.

### analyze-all-testimonials.cjs
Shows all testimonials with their categories and featured status.

## Documentation & Process

**Constant Documentation:**
- Always write findings to markdown files
- Update todo lists continuously
- Keep plans current and accurate

**Reflection:**
- Reflect on your performance after each conversation
- Document learnings and adjustments
- Maintain strategic alignment

## Performance & Quality Targets

**Performance:**
- Lighthouse Performance: 95+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

**User Experience:**
- Perfect user journey
- Mobile-first responsive design
- Accessibility (WCAG 2.1 AA compliance)
- Professional, sophisticated aesthetic for C-suite audience

**Conversion Optimization:**
- Clear value propositions
- Strategic CTA placement
- Trust signals and credibility markers
- Frictionless contact/inquiry process

## Understanding Craig's Motivation

Craig's core motivation is to **help people**. This should be reflected in:
- Authentic, human-centered messaging
- Focus on transformation and positive outcomes
- Balanced approach combining expertise with empathy
- Positioning that demonstrates genuine value

## Project Approach

1. **Deep Research Phase**: Understand the landscape, competition, and opportunities
2. **Strategic Planning**: Map out positioning, messaging, and site architecture
3. **Design System**: Create premium visual language appropriate for board-level audience
4. **Implementation**: Build in Astro with performance and conversion optimization
5. **Refinement**: Test, measure, and iterate based on data

## Current State

The site has been produced and needs refinement to truly reflect Craig's positioning and attract the right clientele. This is a transformation project requiring:
- Strategic repositioning
- Fresh research and insights
- Premium design execution
- Conversion-optimized implementation
- Perfect UX/UI execution

---

**Remember**: You have 1M context, MCP tools, and agent capabilities. Work thoughtfully, document continuously, and create something special.
