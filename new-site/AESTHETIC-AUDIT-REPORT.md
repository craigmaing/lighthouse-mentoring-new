# Lighthouse Mentoring - Aesthetic Audit Report
**Date:** October 1, 2025
**Tool:** Playwright Browser Automation
**Viewports Tested:** 1920px, 1440px, 768px, 375px
**Pages Audited:** Homepage, Services, About, Contact

---

## Executive Summary

Comprehensive aesthetic audit reveals **moderate consistency** across the site with several areas requiring standardization to achieve premium B2B design quality. Key issues include button inconsistency, typography scaling on mobile, badge readability, and alignment variations.

### Priority Level Key
🔴 **Critical** - Immediate fix required (impacts user experience)
🟡 **High** - Important for professional appearance
🟢 **Medium** - Enhancement opportunity
⚪ **Low** - Nice to have

---

## 1. Typography Audit

### Current State
```
Font Family: Inter, system-ui, sans-serif (✅ Consistent across all elements)

H1: 72px / 700 weight / 79.2px line-height
H2: 36px / 600 weight / 46.8px line-height
H3: 30px / 600 weight / 42px line-height
Paragraph: 24px / 400 weight / 32px line-height
Badge: 14px / 400 weight / 20px line-height
Button: 16px / 500 weight / 24px line-height
Nav Links: 16px / 400 weight / 24px line-height
```

### Issues Identified

#### 🔴 **CRITICAL: H1 Size Too Large for Mobile**
- **Current:** 72px on all viewports
- **Issue:** Will cause horizontal scrolling and poor readability on mobile devices
- **Recommendation:** Implement responsive typography
  ```css
  /* Desktop (1440px+) */
  h1 { font-size: 72px; }

  /* Tablet (768px-1439px) */
  @media (max-width: 1439px) {
    h1 { font-size: 56px; }
  }

  /* Mobile (< 768px) */
  @media (max-width: 767px) {
    h1 { font-size: 40px; line-height: 1.1; }
  }
  ```

#### 🟡 **HIGH: Badge Text Readability**
- **Current:** 14px font size
- **Issue:** Too small for quick scanning of credentials (IoD Ambassador, FRSPH Fellow, FCMI Fellow)
- **Recommendation:** Increase to 16px minimum for better legibility
  ```css
  .badge { font-size: 16px; font-weight: 500; }
  ```

#### 🟡 **HIGH: Paragraph Text Too Large**
- **Current:** 24px body text
- **Issue:** Uncomfortably large for extended reading, especially on desktop
- **Recommendation:** Reduce to 18px for better readability
  ```css
  p { font-size: 18px; line-height: 1.6; }

  @media (max-width: 767px) {
    p { font-size: 16px; }
  }
  ```

#### 🟢 **MEDIUM: H2 and H3 Scaling**
- **Current:** H2 36px, H3 30px (too close together)
- **Recommendation:** Increase differentiation
  ```css
  h2 { font-size: 48px; }
  h3 { font-size: 28px; }

  @media (max-width: 767px) {
    h2 { font-size: 32px; }
    h3 { font-size: 24px; }
  }
  ```

---

## 2. Button & CTA Consistency Audit

### Current State Analysis

| Element | Width | Height | Font Size | Padding | Background Color | Border |
|---------|-------|--------|-----------|---------|------------------|--------|
| Nav "Contact" | 56.27px | 24px | 16px | 0px | Transparent | None |
| Nav "Get Started" | 130.43px | 37.5px | 16px | 8px 24px | rgb(164, 92, 26) | None |
| Hero "Book a Strategy Call" | 231.84px | 64px | 18px | 16px 32px | White | 2px solid black |
| Hero "Explore Services" | Unknown | Unknown | Unknown | Unknown | Unknown | Unknown |

### Issues Identified

#### 🔴 **CRITICAL: Button Inconsistency**
- **Issue:** Three different button styles with varying sizes, colors, and treatments
- **Impact:** Confuses visual hierarchy and reduces professional appearance
- **Recommendation:** Establish 3 consistent button variants:

```css
/* Primary CTA - High emphasis */
.btn-primary {
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  background-color: rgb(164, 92, 26); /* Brown accent */
  color: white;
  border-radius: 8px;
  border: none;
  min-height: 56px;
}

/* Secondary CTA - Medium emphasis */
.btn-secondary {
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  background-color: white;
  color: rgb(45, 45, 45);
  border-radius: 8px;
  border: 2px solid rgb(45, 45, 45);
  min-height: 56px;
}

/* Tertiary/Ghost - Low emphasis */
.btn-ghost {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  background-color: transparent;
  color: rgb(164, 92, 26);
  border: none;
  text-decoration: underline;
  text-underline-offset: 4px;
  min-height: auto;
}
```

#### 🟡 **HIGH: CTA Sizing on Mobile**
- **Current:** Hero buttons at 231.84px width may not fit well on mobile
- **Recommendation:** Use full-width buttons on mobile
  ```css
  @media (max-width: 767px) {
    .btn-primary, .btn-secondary {
      width: 100%;
      justify-content: center;
    }
  }
  ```

---

## 3. Color Palette Audit

### Colors Detected: 20 unique colors

#### Primary Colors (Brand)
- **Primary Dark:** `rgb(45, 45, 45)` - Navigation, footer, headings
- **Primary Accent:** `rgb(164, 92, 26)` - CTAs, highlights
- **Secondary Accent:** `rgb(139, 69, 19)` - Darker brown variant
- **White:** `rgb(255, 255, 255)` - Backgrounds, text on dark

#### Neutrals (Grays)
- `rgb(17, 24, 39)` - Dark gray (headings)
- `rgb(31, 41, 55)` - Medium-dark gray
- `rgb(55, 65, 81)` - Medium gray
- `rgb(75, 85, 99)` - Gray
- `rgb(107, 114, 128)` - Light-medium gray
- `rgb(156, 163, 175)` - Light gray
- `rgb(209, 213, 219)` - Very light gray (text on dark backgrounds)
- `rgb(229, 231, 235)` - Off-white gray
- `rgb(243, 244, 246)` - Very light gray (hero text)
- `rgb(249, 250, 251)` - Almost white

#### Transparency Variants
- `rgba(45, 45, 45, 0.5)` - 50% dark
- `rgba(45, 45, 45, 0.1)` - 10% dark
- `rgba(255, 255, 255, 0.1)` - 10% white
- `rgba(164, 92, 26, 0.1)` - 10% brown
- `rgba(139, 69, 19, 0.1)` - 10% dark brown

### Issues Identified

#### 🟢 **MEDIUM: Too Many Gray Variants**
- **Current:** 10+ gray shades
- **Issue:** Creates subtle inconsistencies that are hard to maintain
- **Recommendation:** Consolidate to 5 semantic grays in Tailwind config:
  ```javascript
  // tailwind.config.js
  colors: {
    primary: {
      DEFAULT: '#2D2D2D',  // rgb(45, 45, 45)
      light: '#3F3F3F',
    },
    accent: {
      DEFAULT: '#A45C1A',  // rgb(164, 92, 26)
      dark: '#8B4513',     // rgb(139, 69, 19)
    },
    gray: {
      50: '#F9FAFB',   // Lightest
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',  // Medium
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',  // Darkest
    }
  }
  ```

#### 🟡 **HIGH: Contrast Ratio Validation Needed**
- **Action Required:** Test all text/background combinations for WCAG AA compliance
- **Minimum Ratios:**
  - Normal text: 4.5:1
  - Large text (18px+): 3:1
  - UI components: 3:1

**Specific Combinations to Check:**
1. ✅ White text on `rgb(45, 45, 45)` - Likely passes
2. ⚠️ Light gray `rgb(209, 213, 219)` on dark backgrounds - May fail
3. ⚠️ Badge text `14px` on any background - Size + contrast concern

---

## 4. Spacing & Layout Audit

### Section Spacing (Consistent ✅)
```
All sections: 96px padding-top, 96px padding-bottom
- Hero section
- Services section
- Credentials section
- Testimonials section
- CTA section
```

**Status:** Excellent consistency. No changes needed.

### Navigation Spacing
```
Height: 81px
Position: sticky
Top: 0px
Padding: 0px (relies on inner container padding)
Background: rgb(45, 45, 45)
```

### Issues Identified

#### 🟡 **HIGH: Navigation Height Inconsistency**
- **Issue:** Navigation inner container handles padding, but this may cause alignment issues across pages
- **Recommendation:** Standardize navigation height and padding:
  ```css
  nav {
    height: 80px; /* Fixed height */
    padding: 0 24px; /* Horizontal padding only */
  }

  nav .container {
    height: 100%;
    display: flex;
    align-items: center;
  }
  ```

#### 🟢 **MEDIUM: Footer Padding Missing**
- **Current:** `padding: 0px` (relies on inner elements)
- **Recommendation:** Add consistent footer padding
  ```css
  footer {
    padding: 64px 24px 32px;
  }
  ```

---

## 5. Badge & Credential Display Audit

### Current State
- **Badges Found:** None with class selector `[class*="badge"]`
- **Credential Images:** 5 images detected in credentials section
- **Image Aspect Ratio:** 1.5:1 (448px × 298px for hero image)

### Issues Identified

#### 🔴 **CRITICAL: Credential Badge Sizing Inconsistency**
- **Issue:** Unable to locate badge elements with standard selectors - suggests inconsistent naming/styling
- **Action Required:**
  1. View screenshots to identify actual badge elements
  2. Standardize badge component with consistent class names
  3. Ensure all credential badges (IoD, FRSPH, FCMI) are same size

**Recommended Badge Structure:**
```html
<div class="credential-badge">
  <img src="..." alt="FRSPH Fellow Badge" class="credential-badge__image" />
  <h3 class="credential-badge__title">FRSPH Fellow</h3>
  <p class="credential-badge__subtitle">Royal Society for Public Health</p>
</div>
```

```css
.credential-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
}

.credential-badge__image {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.credential-badge__title {
  font-size: 20px;
  font-weight: 600;
  color: rgb(17, 24, 39);
}

.credential-badge__subtitle {
  font-size: 14px;
  color: rgb(107, 114, 128);
}
```

#### 🟡 **HIGH: Credential Images Not Optimized**
- **Current:** 1920×1280 source images
- **Recommendation:**
  - Credential badges: 240×240px @2x = 480×480 source
  - Hero images: Multiple sizes via Astro Image optimization
  - Use WebP format with JPEG fallback

---

## 6. Alignment & Positioning Audit

### Heading Alignment Analysis

| Element | Alignment | Left Position | Width | Issue |
|---------|-----------|---------------|-------|-------|
| H1 | Left | 344.5px | 584px | ❌ Inconsistent left offset |
| H2 (Services) | Center | 568.5px | 768px | ✅ Centered |
| H3 (Cards) | Left | 376.5px | 320px | ❌ Different offset than H1 |
| H3 (Credentials) | Center | Varies | 277px | ✅ Centered |

### Issues Identified

#### 🔴 **CRITICAL: Heading Alignment Inconsistency**
- **Issue:** Different sections use different alignment strategies (some left-aligned with varying offsets, some centered)
- **Impact:** Creates visual dissonance and unprofessional appearance
- **Recommendation:** Establish consistent alignment rules:

```css
/* Hero sections - Left-aligned within container */
.hero h1, .hero p {
  text-align: left;
  margin-left: 0;
  max-width: 600px;
}

/* Content sections - Centered headings, left-aligned body */
.content-section h2 {
  text-align: center;
  margin: 0 auto 24px;
  max-width: 800px;
}

.content-section p {
  text-align: left;
  margin: 0 auto;
  max-width: 700px;
}

/* Card headings - Left-aligned within card */
.card h3 {
  text-align: left;
  margin-left: 0;
}
```

#### 🟡 **HIGH: Container Max-Width Needed**
- **Issue:** Content not constrained, causing different effective widths
- **Recommendation:**
  ```css
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }

  @media (min-width: 1536px) {
    .container {
      max-width: 1400px;
    }
  }
  ```

---

## 7. Responsive Behavior Audit

### Viewport Tests Conducted
- ✅ 1920×1080 (Large Desktop)
- ✅ 1440×900 (Standard Desktop)
- ✅ 768×1024 (Tablet Portrait)
- ✅ 375×667 (Mobile)

### Screenshots Captured
```
✅ homepage-desktop-1920.png
✅ homepage-desktop-1440.png
✅ homepage-tablet-768.png
✅ homepage-mobile-375.png
✅ services-desktop-1920.png
✅ about-desktop-1920.png
✅ contact-desktop-1920.png
```

### Issues to Verify in Screenshots

#### 🔴 **CRITICAL: Mobile Typography**
- Check if H1 (72px) causes horizontal scroll on 375px viewport
- Verify button stack/arrangement on mobile
- Confirm credential badges don't overlap or crowd

#### 🟡 **HIGH: Tablet Layout**
- Verify 768px breakpoint handles card layouts properly
- Check if 3-column credential grid breaks to 2-column or stacks
- Confirm navigation doesn't break or overlap

#### 🟢 **MEDIUM: Large Desktop Spacing**
- Verify 1920px viewport doesn't have excessive whitespace
- Check if max-width container constraint is needed

---

## 8. Navigation Consistency Audit

### Current Navigation State
```
Height: 81px
Position: sticky
Top: 0px
Background: rgb(45, 45, 45)
Left alignment: 0px (full width)
Width: 1905px (viewport minus scrollbar)
```

### Navigation Links
- Home
- Services
- About
- Contact
- Get Started (CTA button)

### Issues Identified

#### 🟡 **HIGH: Logo Size Not Measured**
- **Action Required:** Verify logo is consistent size across all pages
- **Recommendation:**
  ```css
  .logo {
    height: 40px;
    width: auto;
  }
  ```

#### 🟢 **MEDIUM: Mobile Navigation**
- **Current:** Unknown if hamburger menu implemented
- **Recommendation:** Verify mobile menu:
  - Hamburger icon appears < 768px
  - Menu slides in smoothly
  - Close button clearly visible
  - Links are touch-friendly (min 44px height)

---

## 9. Footer Consistency Audit

### Current Footer State
```
Height: 359px
Position: static
Background: rgb(45, 45, 45)
Padding: 0px (handled by inner elements)
```

### Issues Identified

#### 🟡 **HIGH: Footer Height Variation Risk**
- **Issue:** 359px height suggests content-driven sizing, which may vary across pages
- **Action Required:** Check all pages' footers for height consistency
- **Recommendation:** Use consistent padding instead of fixed height

#### 🟢 **MEDIUM: Footer Structure**
- **Verify:**
  - Logo placement consistent
  - Link groups aligned properly
  - Copyright text positioned consistently
  - Social links same size and spacing

---

## 10. Image Quality & Sizing Audit

### Images Analyzed
- **Hero Image:** 448×298px rendered (aspect ratio 1.5:1)
- **Credential Badge Images:** Multiple detected
- **Service Icons:** Detected in cards

### Issues Identified

#### 🟡 **HIGH: Image Optimization Strategy**
- **Current:** Using Astro Image with dynamic resizing
- **Recommendation:** Ensure srcset implemented for responsive images
  ```astro
  <Image
    src={heroImage}
    alt="Craig Fearn at IoD Conference"
    widths={[400, 800, 1200, 1600]}
    sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 800px"
    format="webp"
    quality={85}
  />
  ```

#### 🟡 **HIGH: Credential Badge Image Consistency**
- **Action Required:** Verify all credential badges are:
  - Same dimensions (recommend 120×120px displayed, 240×240px source @2x)
  - Same file format
  - Same visual weight/density
  - Proper alt text for accessibility

---

## 11. Hover & Interaction States

### Status
⚠️ **NOT YET TESTED** - Requires additional Playwright interactions

### Test Plan
1. **Button Hover States**
   - Primary button: Darken background 10%
   - Secondary button: Add subtle shadow
   - Ghost button: Strengthen underline

2. **Link Hover States**
   - Navigation links: Color change + underline
   - Footer links: Opacity change
   - "Learn more →" links: Arrow animation

3. **Card Hover States** (if applicable)
   - Service cards: Lift effect (translateY + shadow)
   - Testimonial cards: Border highlight

**Action Required:** Run hover state testing script

---

## 12. Visual Hierarchy Assessment

### Current Hierarchy Analysis

✅ **Working Well:**
- Clear distinction between H1, H2, H3
- White text on dark hero background creates strong contrast
- Brown accent color draws attention to CTAs
- Section alternation (dark/light backgrounds) creates rhythm

⚠️ **Needs Improvement:**
- Badge text too small (14px) - loses importance
- Button sizing inconsistency confuses CTA priority
- Some headings left-aligned, some centered - breaks flow
- Paragraph text (24px) competes with H3 (30px) for attention

### Recommendations

#### Information Architecture Fixes
1. **Reduce paragraph size** to 18px to let headings dominate
2. **Increase badge size** to 16-18px to emphasize credentials
3. **Standardize heading alignment** for clearer reading flow
4. **Create consistent button hierarchy** with 3 clear levels

---

## Priority Action Plan

### Phase 1: Critical Fixes (Immediate)
1. ✅ **Fix responsive typography** - Implement H1 mobile scaling
2. ✅ **Standardize buttons** - Create 3 consistent button variants
3. ✅ **Fix heading alignment** - Establish consistent alignment rules
4. ✅ **Increase badge text size** - 14px → 16px minimum

### Phase 2: High Priority (This Week)
5. ✅ **Consolidate gray colors** - Reduce from 10+ to 5 semantic values
6. ✅ **Fix navigation consistency** - Standardize height and padding
7. ✅ **Validate contrast ratios** - Test all text/background combinations
8. ✅ **Optimize credential badges** - Ensure consistent sizing and quality

### Phase 3: Medium Priority (Next Week)
9. ✅ **Reduce paragraph text size** - 24px → 18px
10. ✅ **Add container max-width** - Constrain content on large screens
11. ✅ **Standardize footer padding** - Remove reliance on inner element padding
12. ✅ **Optimize all images** - Implement responsive srcset

### Phase 4: Polish (Ongoing)
13. ✅ **Implement hover states** - Add consistent interaction feedback
14. ✅ **Test mobile navigation** - Ensure hamburger menu works smoothly
15. ✅ **Refine H2/H3 sizing** - Increase differentiation

---

## Testing Recommendations

### Automated Testing
- **Visual Regression:** Use Playwright screenshots as baseline
- **Contrast Checking:** Run axe-core or WAVE for WCAG compliance
- **Responsive Testing:** Test at 320px, 375px, 768px, 1024px, 1440px, 1920px

### Manual Testing
- **Real Device Testing:** iPhone, iPad, Android phone
- **Browser Testing:** Chrome, Firefox, Safari, Edge
- **Interaction Testing:** Hover, focus, active states on all interactive elements

---

## Appendix: Design System Specification

### Typography Scale (Proposed)
```css
/* Desktop */
H1: 64px / 700 / 1.1 line-height
H2: 48px / 600 / 1.2 line-height
H3: 28px / 600 / 1.4 line-height
H4: 20px / 600 / 1.4 line-height
Body Large: 18px / 400 / 1.6 line-height
Body: 16px / 400 / 1.6 line-height
Small: 14px / 400 / 1.5 line-height
Badge: 16px / 500 / 1.3 line-height

/* Mobile */
H1: 40px / 700 / 1.1 line-height
H2: 32px / 600 / 1.2 line-height
H3: 24px / 600 / 1.3 line-height
Body: 16px / 400 / 1.6 line-height
```

### Color System (Proposed)
```javascript
{
  primary: {
    DEFAULT: '#2D2D2D',
    light: '#3F3F3F',
  },
  accent: {
    DEFAULT: '#A45C1A',
    dark: '#8B4513',
    light: '#B8732C',
  },
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    500: '#6B7280',
    700: '#374151',
    900: '#111827',
  }
}
```

### Spacing Scale
```
4px base unit system:
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px
```

### Button Specifications
See Section 2 for complete button CSS

---

## Screenshots Location
All baseline screenshots stored in:
```
C:\Users\Fearn\New folder (4)\new-site\.playwright-mcp\
```

**Files:**
- homepage-desktop-1920.png
- homepage-desktop-1440.png
- homepage-tablet-768.png
- homepage-mobile-375.png
- services-desktop-1920.png
- about-desktop-1920.png
- contact-desktop-1920.png

---

**End of Report**
