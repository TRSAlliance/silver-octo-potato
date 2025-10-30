// trs-cli-check.js — TRS GEN-2 HEALTH CLI
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPOS = [
  { name: 'TRS_Alliance_v2.3', path: 'C:/Users/Spann/TRS_Alliance_v2.3' },
  { name: 'silver-octo-potato', path: 'C:/Users/Spann/silver-octo-potato' }
];

console.log('TRS GEN-2 SYSTEM CHECK\n');

REPOS.forEach(repo => {
  console.log(`Checking ${repo.name}...`);
  
  try {
    // 1. Folder exists?
    if (!fs.existsSync(repo.path)) {
      console.log(`   Folder NOT found: ${repo.path}`);
      return;
    }

    // 2. Git repo?
    const gitStatus = execSync('git status', { cwd: repo.path, stdio: 'pipe' }).toString();
    if (gitStatus.includes('not a git repository')) {
      console.log(`   NOT a git repo`);
      return;
    }

    // 3. On correct branch?
    const branch = execSync('git branch --show-current', { cwd: repo.path }).toString().trim();
    console.log(`   Branch: ${branch || 'detached'}`);

    // 4. Changes?
    const changes = execSync('git status --porcelain', { cwd: repo.path }).toString();
    console.log(`   Changes: ${changes ? changes.split('\n').length - 1 : 0}`);

    // 5. package.json?
    const pkgPath = path.join(repo.path, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      console.log(`   Version: ${pkg.version || 'N/A'}`);
    }

    // 6. .env?
    const envPath = path.join(repo.path, '.env');
    console.log(`   .env: ${fs.existsSync(envPath) ? 'YES' : 'NO'}`);

    console.log(`   ${repo.name} = LIVE\n`);
  } catch (err) {
    console.log(`   ERROR: ${err.message}`);
  }
});

// Final Firebase check
console.log('Firebase Check:');
try {
  const env = fs.readFileSync('C:/Users/Spann/TRS_Alliance_v2.3/.env', 'utf8');
  const hasKeys = env.includes('VITE_FIREBASE_API_KEY') && env.includes('VITE_FIREBASE_PROJECT_ID');
  console.log(`   Keys in .env: ${hasKeys ? 'YES' : 'NO'}`);
} catch {
  console.log(`   .env not found or unreadable`);
}

console.log('\nTRS SYSTEM CHECK COMPLETE.');
