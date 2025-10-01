# Aesthetic Fixes Plan - Services, About, Contact Pages

## Overview
This plan details the specific changes needed for each page to match the new design system established in the homepage. All changes follow the patterns successfully implemented on index.astro.

---

## Services Page (`src/pages/services.astro`)

### 🔴 Critical Issues

#### 1. Hero Typography (Lines 16-28)
**Current:**
```astro
<h1 class="text-hero mb-6">
<p class="text-xl text-gray-100 leading-relaxed mb-6">
<p class="text-lg text-gray-100 leading-relaxed">
```

**Fix:**
```astro
<section class="hero section-padding bg-gradient-to-br from-gray-900 to-primary-dark text-white">
  <h1 class="mb-6"> <!-- Remove text-hero, let global CSS handle responsive sizing -->
  <p class="text-gray-100 leading-relaxed mb-6"> <!-- Remove text-xl, use default responsive p -->
```

**Reason:** New design system has responsive typography baked into base styles (16px mobile → 18px desktop)

#### 2. Old Color References (Lines 16, 202, 109, 115, 121, 127, 133, 139, 160, 166, 172, 178, 184, 190)
**Current:**
- `bg-gradient-to-br from-gray-900 to-brand-800`
- `text-secondary` (for icons)
- `hover:text-brand-800`

**Fix:**
```astro
<!-- Line 16 -->
<section class="hero section-padding bg-gradient-to-br from-gray-900 to-primary-dark text-white">

<!-- Lines 109, 115, 121, 127, 133, 139 - Executive Coaching icons -->
<svg class="w-6 h-6 text-accent mt-1 flex-shrink-0"

<!-- Line 202 - CTA section -->
<section class="section-padding bg-gradient-to-r from-primary to-primary-dark text-white">
```

**Reason:** `brand-800` no longer exists, replaced by `primary-dark`. `secondary` replaced by `accent`.

#### 3. Button Component Calls (Lines 94, 145, 196, 211)
**Current:**
```astro
<Button href="/contact">Discuss Your Board Challenge</Button>
<Button href="/contact">Explore Executive Coaching</Button>
<Button href="/contact">Discuss a Wellbeing Audit</Button>
<Button href="/contact" size="large" variant="secondary">
```

**Fix:**
```astro
<Button href="/contact" variant="primary">Discuss Your Board Challenge</Button>
<Button href="/contact" variant="primary">Explore Executive Coaching</Button>
<Button href="/contact" variant="primary">Discuss a Wellbeing Audit</Button>
<Button href="/contact" variant="secondary">Book a Strategy Call</Button>
```

**Reason:**
- Explicit variant specification (no default assumption)
- `size="large"` parameter removed from new button system (buttons are already 56px min-height)

#### 4. Typography in Content (Lines 53, 104, 155, 208)
**Current:**
```astro
<p class="text-lg text-gray-700 leading-relaxed mb-6">
<p class="text-xl text-gray-100 mb-8 leading-relaxed">
```

**Fix:**
```astro
<p class="text-gray-700 leading-relaxed mb-6"> <!-- Let base p styles handle sizing -->
<p class="text-gray-100 mb-8 leading-relaxed">
```

**Reason:** Base paragraph styles now responsive (16px mobile → 18px desktop)

---

## About Page (`src/pages/about.astro`)

### 🔴 Critical Issues

#### 1. Hero Typography (Lines 22-39)
**Current:**
```astro
<h1 class="text-hero mb-6">
<p class="text-xl text-gray-100 leading-relaxed mb-6">
<div class="flex flex-wrap gap-4 text-sm font-medium text-gray-200">
  <span class="px-3 py-1 bg-white/10 rounded-full">
```

**Fix:**
```astro
<section class="hero section-padding bg-gradient-to-br from-gray-900 to-primary-dark text-white">
  <h1 class="mb-6"> <!-- Responsive h1 from global CSS -->
  <p class="text-gray-100 leading-relaxed mb-6"> <!-- Remove text-xl -->

  <!-- Credentials Bar - Use badge component -->
  <div class="flex flex-wrap gap-3 mb-8">
    <span class="badge bg-white/10 text-white border-0">IoD Ambassador</span>
    <span class="badge bg-white/10 text-white border-0">FRSPH Fellow</span>
    <span class="badge bg-white/10 text-white border-0">FCMI Fellow</span>
    <span class="badge bg-white/10 text-white border-0">IoD Awards Finalist 2025</span>
  </div>
```

**Reason:** Use new `.badge` component for consistency (16px text, proper padding)

#### 2. Old Color References (Lines 22, 267)
**Current:**
```astro
<section class="section-padding bg-gradient-to-br from-gray-900 to-brand-800 text-white">
<section class="section-padding bg-gradient-to-r from-primary to-brand-800 text-white">
```

**Fix:**
```astro
<section class="hero section-padding bg-gradient-to-br from-gray-900 to-primary-dark text-white">
<section class="section-padding bg-gradient-to-r from-primary to-primary-dark text-white">
```

#### 3. Typography Sizing (Lines 62, 64, 187, 273)
**Current:**
```astro
<p class="text-xl text-gray-600 text-center mb-12">
<div class="space-y-6 text-lg text-gray-700 leading-relaxed">
<p class="text-lg text-gray-700 font-semibold mb-2">
<p class="text-xl text-gray-100 mb-8 leading-relaxed">
```

**Fix:**
```astro
<p class="text-gray-600 text-center mb-12"> <!-- Remove text-xl -->
<div class="space-y-6 text-gray-700 leading-relaxed"> <!-- Remove text-lg -->
<p class="text-gray-700 font-semibold mb-2"> <!-- Remove text-lg -->
<p class="text-gray-100 mb-8 leading-relaxed"> <!-- Remove text-xl -->
```

#### 4. Credential Badges (Lines 96-183)
**Current:**
```astro
<div class="text-center">
  <div class="w-64 h-64 mx-auto mb-6 flex items-center justify-center">
    <Image ... class="w-full h-full object-contain" />
  </div>
  <h3 class="text-h3 text-gray-900 mb-2">FRSPH Fellow</h3>
  <p class="text-gray-600">Royal Society for Public Health</p>
</div>
```

**Fix:**
```astro
<div class="credential-badge">
  <Image
    ...
    class="credential-badge__image"
    widths={[120, 240]}
    sizes="120px"
  />
  <h3 class="credential-badge__title">FRSPH Fellow</h3>
  <p class="credential-badge__subtitle">Royal Society for Public Health</p>
</div>
```

**Reason:** Use consistent credential badge component (120x120px images, standardized spacing)

#### 5. Icon Colors (Lines 207, 213, 219, 225, 237, 243, 249, 255)
**Current:**
```astro
<svg class="w-6 h-6 text-secondary mt-0.5 flex-shrink-0">
```

**Fix:**
```astro
<svg class="w-6 h-6 text-accent mt-0.5 flex-shrink-0">
```

#### 6. Button Component (Line 276)
**Current:**
```astro
<Button href="/contact" size="large" variant="secondary">
```

**Fix:**
```astro
<Button href="/contact" variant="secondary">
```

---

## Contact Page (`src/pages/contact.astro`)

### 🔴 Critical Issues

#### 1. Hero Typography (Lines 18-30)
**Current:**
```astro
<h1 class="text-hero mb-6">
<p class="text-xl text-gray-100 leading-relaxed mb-4">
<p class="text-lg text-gray-100 leading-relaxed">
```

**Fix:**
```astro
<section class="hero section-padding bg-gradient-to-br from-gray-900 to-primary-dark text-white">
  <h1 class="mb-6">
  <p class="text-gray-100 leading-relaxed mb-4">
```

#### 2. Old Color References (Lines 18, 148, 162)
**Current:**
```astro
<section class="section-padding bg-gradient-to-br from-gray-900 to-brand-800 text-white">
<a href="mailto:craig@lighthousementoring.co.uk" class="text-primary hover:text-brand-800 transition-colors">
<a href="https://www.linkedin.com/in/craig-fearn1/" ... class="text-primary hover:text-brand-800 transition-colors">
```

**Fix:**
```astro
<section class="hero section-padding bg-gradient-to-br from-gray-900 to-primary-dark text-white">
<a href="mailto:craig@lighthousementoring.co.uk" class="text-accent hover:text-accent-dark transition-colors">
<a href="https://www.linkedin.com/in/craig-fearn1/" ... class="text-accent hover:text-accent-dark transition-colors">
```

#### 3. Typography Sizing (Lines 57, 119)
**Current:**
```astro
<p class="text-xl text-gray-600">
<p class="text-lg text-gray-700 leading-relaxed mb-4">
```

**Fix:**
```astro
<p class="text-gray-600">
<p class="text-gray-700 leading-relaxed mb-4">
```

#### 4. Credential Badges (Lines 64-113)
**Current:**
```astro
<div class="text-center">
  <div class="w-64 h-64 mx-auto mb-6 flex items-center justify-center">
```

**Fix:**
```astro
<div class="credential-badge">
  <Image
    ...
    class="credential-badge__image"
    widths={[120, 240]}
    sizes="120px"
  />
  <h3 class="credential-badge__title">FRSPH Fellow</h3>
  <p class="credential-badge__subtitle">Royal Society for Public Health</p>
</div>
```

#### 5. Form Button (Lines 269-274)
**Current:**
```astro
<button
  type="submit"
  class="btn btn-primary w-full text-lg"
>
```

**Fix:**
```astro
<button
  type="submit"
  class="btn-primary w-full"
>
```

**Reason:** `.btn-primary` already includes base `.btn` styles and proper sizing (text-lg built-in)

---

## Summary of Changes Per Page

### Services Page (11 fixes)
1. ✅ Add `hero` class to hero section
2. ✅ Remove explicit typography sizing (text-hero, text-xl, text-lg)
3. ✅ Replace `brand-800` → `primary-dark` (2 locations)
4. ✅ Replace `text-secondary` → `text-accent` (6 icon locations)
5. ✅ Add explicit button variants (4 buttons)
6. ✅ Remove `size="large"` from button

### About Page (15 fixes)
1. ✅ Add `hero` class to hero section
2. ✅ Replace old badges with `.badge` component (4 badges)
3. ✅ Replace `brand-800` → `primary-dark` (2 locations)
4. ✅ Remove explicit typography sizing (4 locations)
5. ✅ Convert credential badges to `.credential-badge` component (5 badges)
6. ✅ Replace `text-secondary` → `text-accent` (4 icon locations)
7. ✅ Remove `size="large"` from button

### Contact Page (12 fixes)
1. ✅ Add `hero` class to hero section
2. ✅ Replace `brand-800` → `primary-dark` (1 location)
3. ✅ Replace `hover:text-brand-800` → `hover:text-accent-dark` (2 links)
4. ✅ Remove explicit typography sizing (2 locations)
5. ✅ Convert credential badges to `.credential-badge` component (3 badges)
6. ✅ Fix form button class (remove redundant `.btn`)

---

## Testing Checklist (Per Page)

After applying fixes to each page, verify:

### Visual Tests
- [ ] H1 responsive sizing (40px mobile → 72px desktop)
- [ ] Paragraph sizing (16px mobile → 18px desktop)
- [ ] Badge sizing (16px with proper padding)
- [ ] Credential badges (120x120px, consistent spacing)
- [ ] Button consistency (56px min-height, proper colors)
- [ ] Color consistency (no old brand-800 or secondary)

### Breakpoint Tests
- [ ] 375px (mobile) - No horizontal scroll
- [ ] 768px (tablet) - Proper scaling
- [ ] 1440px (desktop) - Proper max-width constraints
- [ ] 1920px (large desktop) - No excessive whitespace

### Interaction Tests
- [ ] Button hover states work
- [ ] Link hover colors correct (accent-dark)
- [ ] Form inputs (contact page) have proper focus states
- [ ] Mobile navigation accessible

---

## Implementation Order

1. **Services Page** (Simplest - mostly color and typography fixes)
2. **About Page** (Medium - includes credential badge conversion)
3. **Contact Page** (Simplest - fewer components to update)

## Post-Implementation

After all pages fixed:
1. Run Playwright visual regression tests
2. Capture before/after screenshots at all breakpoints
3. Validate cross-page consistency (same components look identical)
4. Test navigation flow between pages
5. Run WCAG contrast validation
6. Update AESTHETIC-AUDIT-REPORT.md with completion status

---

**Estimated Time Per Page:** 10-15 minutes
**Total Estimated Time:** 30-45 minutes
