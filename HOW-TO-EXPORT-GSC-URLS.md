# How to Export Specific URLs from Google Search Console

**Current Issue**: We can see there are **15 pages with 404 errors** (ghost pages) and **111 pages not indexed**, but we need the **actual URLs** to fix them.

---

## Step-by-Step Export Instructions

### 1. Export 404 Error URLs (Ghost Pages)

1. **Go to Google Search Console**: https://search.google.com/search-console
2. **Select your property**: `lighthousementoring.co.uk`
3. **Navigate to**: **Indexing** → **Pages**
4. **Scroll down** to the **"Why pages aren't indexed"** section
5. **Click on**: **"Not found (404)"** (shows 15 pages)
6. **Click the Export button** (📊 icon in top right)
7. **Select**: "Export" → "Download CSV"
8. **Save as**: `404-errors.csv`
9. **Place in this folder**: `c:\Users\Fearn\New folder (4)\new-site\`

### 2. Export Crawled But Not Indexed URLs

1. **In the same "Why pages aren't indexed" section**
2. **Click on**: **"Crawled - currently not indexed"** (shows 67 pages)
3. **Click Export** → **Download CSV**
4. **Save as**: `crawled-not-indexed.csv`
5. **Place in same folder**

### 3. Export Page with Redirect URLs

1. **Click on**: **"Page with redirect"** (shows 12 pages)
2. **Click Export** → **Download CSV**
3. **Save as**: `pages-with-redirect.csv`
4. **Place in same folder**

### 4. Export Soft 404 URLs

1. **Click on**: **"Soft 404"** (shows 3 pages)
2. **Click Export** → **Download CSV**
3. **Save as**: `soft-404.csv`
4. **Place in same folder**

### 5. Export Successfully Indexed URLs (For Comparison)

1. **Scroll up** to the **"Indexing status"** section at the top
2. **Click on the number next to "Indexed"** (should show indexed pages)
3. **Click Export** → **Download CSV**
4. **Save as**: `indexed-pages.csv`
5. **Place in same folder**

---

## Alternative: Export All Pages at Once

If you want to export everything in one go:

1. **Go to**: **Indexing** → **Pages**
2. **Click the "View data about indexed pages" link** (at the top)
3. **This shows all pages** (indexed + not indexed)
4. **Click Export** → **Download CSV**
5. **Save as**: `all-pages-full-export.csv`

**Note**: This might be a very large file if Google has discovered many URLs.

---

## What to Look For

Once you export these files, we'll be looking for:

### Ghost Pages (404 Errors)
These are the URLs causing the "ghost pages" problem:
- Old blog post URLs with different slugs
- Old service page URLs
- Removed test/development pages
- Old URL patterns that have changed
- Deploy preview URLs that got indexed

### Crawled But Not Indexed (67 pages!)
This is **concerning** - Google is finding 67 pages but refusing to index them:
- Could be low-quality content flags
- Could be duplicate content issues
- Could be technical SEO problems
- Could be incorrect canonical tags

### Pages with Redirect
These should be working but we need to verify:
- Are the redirects 301 (permanent)?
- Are there redirect chains?
- Do they point to the correct new URLs?

---

## Expected Files

After export, you should have these files in your project folder:

```
new-site/
├── 404-errors.csv              ← 15 ghost page URLs
├── crawled-not-indexed.csv     ← 67 pages Google won't index
├── pages-with-redirect.csv     ← 12 redirect URLs to verify
├── soft-404.csv                ← 3 soft 404 URLs
├── indexed-pages.csv           ← Currently indexed pages (for comparison)
└── all-pages-full-export.csv   ← (Optional) Complete export
```

---

## What I'll Do With This Data

Once you provide these CSV files, I will:

1. **Identify all ghost page URLs** from `404-errors.csv`
2. **Map each ghost URL** to the correct current page
3. **Create 301 redirects** in `netlify.toml` for each ghost page
4. **Analyze crawled-not-indexed pages** to understand why Google won't index them
5. **Fix any technical issues** preventing proper indexing
6. **Create a removal request list** for permanently deleted pages
7. **Generate a complete fix strategy** with exact redirect rules

---

## Urgency Level

**HIGH PRIORITY** - Your indexing trend shows:
- August 24: **80 indexed pages** ✅
- October 7: **28 indexed pages** ❌

You've lost **52 indexed pages** in ~6 weeks. This is a **severe de-indexing event** that needs immediate attention.

---

## After You Export

1. **Place all CSV files** in this folder
2. **Let me know** when they're ready
3. **I'll analyze** and create specific fixes within minutes

**Don't worry** - once we have the URLs, this is fixable! The hard part (identifying the problem) is done. Now we just need the specific URLs to create targeted fixes.

---

**Created**: 2025-10-13
**Priority**: URGENT
**Estimated Time**: 5-10 minutes to export all CSVs
