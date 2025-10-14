// generate-sri-hash.cjs
// Generates SHA-384 SRI hashes for JavaScript files
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Files to hash - using the source files in public/
const files = [
  {
    path: 'public/js/analytics.js',
    name: 'analytics.js',
    location: 'src/layouts/Layout.astro:86'
  },
  {
    path: 'public/js/mobile-menu.js',
    name: 'mobile-menu.js',
    location: 'src/components/Navigation.astro:86'
  }
];

console.log('═══════════════════════════════════════════════════════');
console.log('  SRI Hash Generator for Lighthouse Mentoring');
console.log('═══════════════════════════════════════════════════════\n');

let allSuccess = true;

files.forEach(file => {
  const fullPath = path.join(__dirname, file.path);

  if (!fs.existsSync(fullPath)) {
    console.log(`❌ File not found: ${file.path}\n`);
    allSuccess = false;
    return;
  }

  const fileBuffer = fs.readFileSync(fullPath);
  const hashSum = crypto.createHash('sha384');
  hashSum.update(fileBuffer);
  const hash = hashSum.digest('base64');

  console.log(`✅ ${file.name}`);
  console.log(`   Path: ${file.path}`);
  console.log(`   Size: ${fileBuffer.length} bytes`);
  console.log(`   Hash: sha384-${hash}`);
  console.log(`   Location: ${file.location}`);
  console.log('');
});

if (allSuccess) {
  console.log('═══════════════════════════════════════════════════════');
  console.log('✅ All hashes generated successfully!');
  console.log('═══════════════════════════════════════════════════════');
  console.log('\n📋 Next steps:');
  console.log('   1. Copy the hashes above');
  console.log('   2. Update integrity attributes in the specified files');
  console.log('   3. Run: npm run build');
  console.log('   4. Test locally with: npm run preview\n');
} else {
  console.log('═══════════════════════════════════════════════════════');
  console.log('❌ Some files were not found');
  console.log('═══════════════════════════════════════════════════════\n');
  process.exit(1);
}
