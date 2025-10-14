#!/usr/bin/env node

/**
 * Sitemap Validation & Ghost Page Detection
 *
 * This script:
 * 1. Reads the generated sitemap
 * 2. Lists all URLs in the sitemap
 * 3. Checks if each URL has a corresponding HTML file
 * 4. Identifies any ghost pages or broken URLs
 */

const fs = require('fs');
const path = require('path');

// Read sitemap
const sitemapPath = path.join(__dirname, 'dist', 'sitemap-0.xml');
const sitemap = fs.readFileSync(sitemapPath, 'utf-8');

// Extract all URLs from sitemap
const urlMatches = sitemap.matchAll(/<loc>(.*?)<\/loc>/g);
const urls = Array.from(urlMatches).map(match => match[1]);

console.log('\n📊 SITEMAP VALIDATION REPORT\n');
console.log(`Found ${urls.length} URLs in sitemap:\n`);

// Check each URL
const issues = [];
const valid = [];

urls.forEach(url => {
  const urlPath = url.replace('https://lighthousementoring.co.uk', '');

  // Determine expected file path
  let filePath;
  if (urlPath === '/' || urlPath === '') {
    filePath = path.join(__dirname, 'dist', 'index.html');
  } else if (urlPath.endsWith('/')) {
    filePath = path.join(__dirname, 'dist', urlPath, 'index.html');
  } else {
    filePath = path.join(__dirname, 'dist', urlPath + '.html');
  }

  // Check if file exists
  const exists = fs.existsSync(filePath);

  if (exists) {
    valid.push({ url, path: urlPath });
    console.log(`✅ ${urlPath || '/'}`);
  } else {
    issues.push({ url, path: urlPath, expectedFile: filePath });
    console.log(`❌ ${urlPath || '/'} - FILE NOT FOUND: ${filePath}`);
  }
});

console.log(`\n\n📈 SUMMARY\n`);
console.log(`✅ Valid URLs: ${valid.length}`);
console.log(`❌ Ghost/Missing URLs: ${issues.length}`);

if (issues.length > 0) {
  console.log(`\n\n⚠️  ISSUES FOUND:\n`);
  issues.forEach(issue => {
    console.log(`URL: ${issue.url}`);
    console.log(`Expected file: ${issue.expectedFile}`);
    console.log(``);
  });
}

// List all actual HTML files
console.log(`\n\n📁 ACTUAL HTML FILES IN DIST:\n`);

function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && file !== 'node_modules' && file !== '_astro') {
      findHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      const relativePath = filePath.replace(path.join(__dirname, 'dist'), '').replace(/\\/g, '/');
      fileList.push(relativePath);
    }
  });

  return fileList;
}

const htmlFiles = findHtmlFiles(path.join(__dirname, 'dist'));
console.log(`Found ${htmlFiles.length} HTML files:\n`);
htmlFiles.forEach(file => console.log(`  ${file}`));

// Check if any HTML files are NOT in the sitemap
console.log(`\n\n🔍 FILES NOT IN SITEMAP:\n`);
const notInSitemap = [];

htmlFiles.forEach(file => {
  // Convert file path to URL path
  let urlPath = file;
  if (urlPath.endsWith('/index.html')) {
    urlPath = urlPath.replace('/index.html', '/');
  } else if (urlPath.endsWith('.html')) {
    urlPath = urlPath.replace('.html', '/');
  }

  const fullUrl = 'https://lighthousementoring.co.uk' + urlPath;

  // Check if this URL is in the sitemap
  if (!urls.includes(fullUrl)) {
    notInSitemap.push({ file, expectedUrl: fullUrl });
    console.log(`❌ ${file} → ${fullUrl}`);
  }
});

if (notInSitemap.length === 0) {
  console.log(`✅ All HTML files are in the sitemap`);
}

console.log(`\n\n✨ VALIDATION COMPLETE\n`);

if (issues.length === 0 && notInSitemap.length === 0) {
  console.log(`🎉 Perfect! No issues found.`);
  process.exit(0);
} else {
  console.log(`⚠️  Found ${issues.length + notInSitemap.length} issues that need attention.`);
  process.exit(1);
}
