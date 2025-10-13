# Lighthouse Mentoring Website - Code Index

*Generated: 2025-10-13*
*Framework: Astro 5.14.1 with TypeScript*
*Styling: Tailwind CSS 3.4.17*
*Deployment: Netlify*

## Project Overview

This is a professional consulting website for Craig Fearn - Strategic Consultant & Board Advisor. The site showcases board advisory services, executive coaching, and organizational wellbeing expertise with extensive credentials (FRSPH Fellow, FCMI Fellow, IoD Ambassador).

## Architecture & Technology Stack

### Core Framework
- **Astro 5.14.1** - Modern static site generator with island architecture
- **TypeScript** - Type safety throughout the codebase
- **Tailwind CSS 3.4.17** - Utility-first CSS framework with custom design system

### Key Integrations
- **@astrojs/tailwind** - Tailwind CSS integration
- **@astrojs/sitemap** - Automatic sitemap generation
- **@astrojs/rss** - RSS feed generation for blog content
- **Sharp** - Image optimization and processing
- **LightningCSS** - Fast CSS minification

### Performance Optimizations
- Client-side routing with view transitions
- Prefetch all links with viewport strategy
- Experimental client prerendering
- Inline critical CSS
- Manual chunk splitting for vendor code
- Responsive image optimization with AVIF/WebP formats

## Directory Structure

```
new-site/
├── src/                          # Source code
│   ├── components/               # Reusable Astro components
│   │   ├── Button.astro         # CTA button component
│   │   ├── FAQAccordion.astro   # FAQ accordion component
│   │   ├── Footer.astro          # Site footer
│   │   ├── Navigation.astro      # Main navigation
│   │   ├── StructuredData.astro # SEO schema markup
│   │   └── blog/               # Blog-specific components
│   │       ├── AuthorByline.astro
│   │       ├── FAQSection.astro
│   │       ├── KeyTakeaways.astro
│   │       └── TLDRSummary.astro
│   ├── images/                  # Optimized images for import
│   ├── layouts/                 # Page layout templates
│   │   ├── Layout.astro         # Base layout
│   │   └── BlogPostLayout.astro # Blog post layout
│   ├── pages/                   # Route-based pages
│   │   ├── index.astro          # Homepage
│   │   ├── about.astro          # About page
│   │   ├── services.astro       # Services overview
│   │   ├── contact.astro        # Contact page
│   │   ├── 404.astro            # Error page
│   │   ├── privacy.astro         # Privacy policy
│   │   ├── terms.astro          # Terms of service
│   │   ├── thank-you.astro       # Contact success
│   │   └── rss.xml.ts          # RSS feed generator
│   ├── content/                 # Content collections
│   │   ├── config.ts            # Content schema definition
│   │   └── insights/            # Blog posts (markdown)
│   └── styles/                  # Styling
│       └── global.css           # Global styles & Tailwind
├── public/                      # Static assets
│   ├── js/                    # Client-side scripts
│   │   ├── analytics.js         # Google Analytics
│   │   ├── contact-form.js      # Contact form handling
│   │   └── mobile-menu.js       # Mobile navigation
│   ├── images/                 # Optimized images
│   └── _headers               # Netlify headers
├── agents/                      # Automation tools
│   ├── research-agent/          # Content validation
│   └── visual-assets/          # Image processing
└── Configuration files
```

## Core Components

### Layout System

#### [`Layout.astro`](src/layouts/Layout.astro:1)
**Purpose**: Base layout for all pages
**Features**:
- SEO meta tags and Open Graph
- Google Analytics integration
- Structured data (Schema.org)
- Responsive navigation with mobile menu
- Accessibility features (skip links, reduced motion)
- Font preloading for performance

#### [`BlogPostLayout.astro`](src/layouts/BlogPostLayout.astro:1)
**Purpose**: Specialized layout for blog content
**Features**:
- Article schema markup
- Author byline with credentials
- TL;DR summary support
- Key takeaways section
- FAQ section
- Enhanced typography and readability

### Page Components

#### [`Navigation.astro`](src/components/Navigation.astro:1)
**Features**:
- Sticky header with backdrop blur
- Mobile-responsive hamburger menu
- Active page highlighting
- CTA button integration
- Astro view transitions support

#### [`Footer.astro`](src/components/Footer.astro:1)
**Features**:
- Company information and credentials
- Quick navigation links
- Contact information
- Social media integration
- Copyright and legal links

#### [`Button.astro`](src/components/Button.astro:1)
**Variants**:
- `primary` - High emphasis CTAs
- `secondary` - Medium emphasis
- `ghost` - Low emphasis links
**Sizes**: `default`, `large`

#### [`StructuredData.astro`](src/components/StructuredData.astro:1)
**Schema Types**:
- Organization schema (all pages)
- Person schema (about page)
- Service schema (service pages)
- Breadcrumb navigation

### Blog Components

#### [`AuthorByline.astro`](src/components/blog/AuthorByline.astro:1)
- Author information with credentials
- Publication date and read time
- Professional attribution

#### [`TLDRSummary.astro`](src/components/blog/TLDRSummary.astro:1)
- "Too Long; Didn't Read" summary
- Bullet point format for quick scanning

#### [`KeyTakeaways.astro`](src/components/blog/KeyTakeaways.astro:1)
- Actionable insights from content
- Numbered list format
- Emphasis on practical application

#### [`FAQSection.astro`](src/components/blog/FAQSection.astro:1)
- Question/answer pairs
- Accordion interaction
- Schema markup for SEO

## Page Structure

### Homepage ([`index.astro`](src/pages/index.astro:1))
**Sections**:
- Hero with credentials and CTAs
- Value proposition (3 services)
- How it works (3-step process)
- Modern tools approach
- Credentials showcase
- Latest insights (3 featured posts)
- Testimonials (4 featured)
- Final CTA section

### About Page ([`about.astro`](src/pages/about.astro:1))
**Sections**:
- Professional hero section
- Experience overview
- Cross-sector expertise grid
- Professional credentials
- Education & certifications
- Personal motivation
- Client testimonials

### Services Page ([`services.astro`](src/pages/services.astro:1))
**Sections**:
- Services hero
- Board advisory details
- Executive coaching details
- Organizational wellbeing audits
- Process explanation
- Contact CTA

### Contact Page ([`contact.astro`](src/pages/contact.astro:1))
**Features**:
- Multiple contact methods
- Comprehensive contact form
- Spam protection (honeypot, timing)
- Form validation
- Success/error handling
- Expectations section

## Content Management

### Content Collections ([`config.ts`](src/content/config.ts:1))
**Schema Fields**:
- Basic metadata (title, description, date)
- Categorization (category, tags, featured)
- AI optimization (TL;DR, key takeaways, FAQs)
- SEO fields (image, alt text)

**Categories**:
- `board-advisory`
- `executive-coaching`
- `wellbeing`
- `leadership`
- `governance`

## Styling System

### Design Tokens ([`tailwind.config.js`](tailwind.config.js:1))
**Colors**:
- Primary: `#2D2D2D` (dark gray)
- Accent: `#A45C1A` (warm orange)
- Eggshell: `#F4F1EA` (warm cream)
- Gray scale: 50-900 shades

**Typography**:
- Inter Variable font with fallbacks
- Mobile-first responsive scaling
- Semantic heading hierarchy
- Readability-optimized line heights

**Components** ([`global.css`](src/styles/global.css:1)):
- Button system (3 variants)
- Card components with hover states
- Badge styling for credentials
- Accessibility-focused focus states
- Mobile touch targets (44px minimum)

## Client-Side Scripts

### Analytics ([`analytics.js`](public/js/analytics.js:1))
- Google Analytics 4 integration
- IP anonymization
- Secure cookie settings
- Environment-based loading

### Contact Form ([`contact-form.js`](public/js/contact-form.js:1))
- Real-time character counting
- Multi-layer spam protection
- Form validation
- Loading states
- Error handling with fallback

### Mobile Menu ([`mobile-menu.js`](public/js/mobile-menu.js:1))
- Astro view transitions support
- Event listener cleanup
- Accessibility considerations

## Automation & Tools

### Research Agent ([`agents/research-agent/index.ts`](agents/research-agent/index.ts:1))
**Purpose**: Content validation and fact-checking
**Features**:
- Claim extraction and verification
- Statistics validation
- Authoritative source checking
- Database of verified claims
- Markdown report generation

### Visual Assets Agent ([`agents/visual-assets/index.ts`](agents/visual-assets/index.ts:1))
**Purpose**: Image sourcing and optimization
**Features**:
- Unsplash integration
- Multi-format optimization (AVIF, WebP, JPG)
- Responsive size generation
- Astro component code generation
- Attribution management

### Citation Tools
- **[`intelligent-citation-finder.ts`](intelligent-citation-finder.ts:1)**: Domain authority validation
- **[`smart-citation-enhancer.ts`](smart-citation-enhancer.ts:1)**: Citation suggestion system
- **[`batch-optimize-posts.ts`](batch-optimize-posts.ts:1)**: Reference section generation

## Performance Optimizations

### Image Optimization
- Sharp-based processing pipeline
- Responsive image generation
- Modern format support (AVIF/WebP)
- Lazy loading with fetchpriority
- Size-optimized delivery

### Build Optimizations
- CSS minification with LightningCSS
- Manual code splitting
- Vendor chunk separation
- Inline critical CSS
- HTML compression

### Runtime Optimizations
- View transitions for SPA-like navigation
- Prefetch strategies
- Client-side prerendering
- Font loading optimization

## SEO Features

### Technical SEO
- Automatic sitemap generation
- RSS feed for content
- Schema.org structured data
- Open Graph tags
- Twitter Card markup
- Canonical URLs

### Content SEO
- Semantic HTML5 structure
- Proper heading hierarchy
- Image alt attributes
- Internal linking strategy
- Meta descriptions

### Performance SEO
- Core Web Vitals optimization
- Mobile-first responsive design
- Fast loading times
- Google Search Console integration

## Deployment Configuration

### Netlify ([`netlify.toml`](netlify.toml:1))
- Node.js 22 build environment
- Form handling configuration
- Redirect rules
- Custom headers
- Production optimization

### Build Process
- `npm run build` - Static site generation
- `npm run preview` - Local testing
- `npm run dev` - Development server

## Development Workflow

### Package Scripts ([`package.json`](package.json:1))
- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Preview**: `npm run preview`
- **Agents**: Multiple specialized automation tools

### MCP Integration ([`.mcp.json`](.mcp.json:1))
- Chrome DevTools integration
- DataForSEO API access
- Automated testing capabilities
- Performance monitoring

## Security Features

### Form Security
- Honeypot fields
- Timing-based bot detection
- Input sanitization
- CSRF protection via Netlify

### Content Security
- XSS prevention
- Secure cookie settings
- HTTPS enforcement
- Subresource integrity

## Accessibility Features

### WCAG 2.1 Compliance
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader optimization

### Visual Accessibility
- High contrast ratios
- Responsive text sizing
- Reduced motion support
- Touch-friendly targets (44px)

## Content Strategy

### Blog System
- Markdown-based content management
- Frontmatter schema validation
- Category-based organization
- Featured content system
- RSS feed generation

### AI Optimization
- TL;DR summaries for quick scanning
- Key takeaways for action items
- FAQ sections for common questions
- Search-optimized content structure

## Integration Points

### External Services
- Google Analytics
- Netlify forms
- Unsplash for images
- DataForSEO for research
- LinkedIn for professional networking

### APIs & Tools
- MCP (Model Context Protocol) servers
- Chrome DevTools integration
- Bright Data search capabilities
- Domain authority validation

## Future Extensibility

### Modular Architecture
- Component-based design
- Plugin-ready structure
- Content collection system
- Agent-based automation

### Scalability Considerations
- CDN-ready asset structure
- SEO-optimized URL patterns
- Performance monitoring hooks
- Content delivery optimization

---

*This index provides a comprehensive overview of the Lighthouse Mentoring website codebase, architecture, and development practices. The site demonstrates modern web development with a focus on performance, accessibility, and SEO optimization.*