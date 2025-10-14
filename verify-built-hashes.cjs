// verify-built-hashes.cjs
// Verifies that the SRI hashes in the code match the actual built files
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const files = [
  {
    path: 'dist/js/analytics.js',
    name: 'analytics.js',
    expectedHash: 'sha384-ssQ4OSf0nfWq4fxVS2SGGIL0EtbnprL+2xn9VrOVGpmZ+nRLUDeTZeJftIvbQ1ow'
  },
  {
    path: 'dist/js/mobile-menu.js',
    name: 'mobile-menu.js',
    expectedHash: 'sha384-M6yY7LZSj4s3/1YoQbN+pBloeNNyBWYD71n9PiilQPidAFsXLM4HDwrP2Q3gClFE'
  }
];

console.log('═══════════════════════════════════════════════════════');
console.log('  Verifying Built File SRI Hashes');
console.log('═══════════════════════════════════════════════════════\n');

let allMatch = true;

files.forEach(file => {
  const fullPath = path.join(__dirname, file.path);

  if (!fs.existsSync(fullPath)) {
    console.log(`❌ ${file.name}: File not found at ${file.path}\n`);
    allMatch = false;
    return;
  }

  const fileBuffer = fs.readFileSync(fullPath);
  const hashSum = crypto.createHash('sha384');
  hashSum.update(fileBuffer);
  const actualHash = `sha384-${hashSum.digest('base64')}`;

  const matches = actualHash === file.expectedHash;

  if (matches) {
    console.log(`✅ ${file.name}: Hash matches!`);
    console.log(`   ${actualHash}\n`);
  } else {
    console.log(`❌ ${file.name}: Hash MISMATCH!`);
    console.log(`   Expected: ${file.expectedHash}`);
    console.log(`   Actual:   ${actualHash}\n`);
    allMatch = false;
  }
});

console.log('═══════════════════════════════════════════════════════');
if (allMatch) {
  console.log('✅ All hashes verified successfully!');
  console.log('   Safe to deploy to production.');
} else {
  console.log('❌ Hash verification failed!');
  console.log('   DO NOT deploy - fix hashes first.');
}
console.log('═══════════════════════════════════════════════════════\n');

process.exit(allMatch ? 0 : 1);
