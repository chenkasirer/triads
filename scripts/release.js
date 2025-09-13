#!/usr/bin/env node

import fs from 'fs';

// Get the release type from command line args
const releaseType = process.argv[2] || 'minor';

if (!['patch', 'minor', 'major'].includes(releaseType)) {
  console.error('❌ Invalid release type. Use: patch, minor, or major');
  process.exit(1);
}

try {
  console.log(`🚀 Starting ${releaseType} release...`);

  // Get current version
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const currentVersion = packageJson.version;
  
  // Calculate new version
  const [major, minor, patch] = currentVersion.split('.').map(Number);
  let newVersion;
  
  switch (releaseType) {
    case 'major':
      newVersion = `${major + 1}.0.0`;
      break;
    case 'minor':
      newVersion = `${major}.${minor + 1}.0`;
      break;
    case 'patch':
      newVersion = `${major}.${minor}.${patch + 1}`;
      break;
  }

  console.log(`📝 Updating version: ${currentVersion} → ${newVersion}`);

  // Update package.json version
  packageJson.version = newVersion;
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n');

  // Update version in App.tsx footer
  const appPath = 'src/App.tsx';
  if (fs.existsSync(appPath)) {
    let appContent = fs.readFileSync(appPath, 'utf8');
    appContent = appContent.replace(/v\d+\.\d+\.\d+/, `v${newVersion}`);
    fs.writeFileSync(appPath, appContent);
    console.log(`✅ Updated version in App.tsx to v${newVersion}`);
  }

  // Update CHANGELOG.md
  const changelogPath = 'CHANGELOG.md';
  if (fs.existsSync(changelogPath)) {
    let changelog = fs.readFileSync(changelogPath, 'utf8');
    const today = new Date().toISOString().split('T')[0];
    
    // Replace [Unreleased] with the new version
    changelog = changelog.replace(
      '## [Unreleased]',
      `## [Unreleased]\n\n## [${newVersion}] - ${today}`
    );
    
    fs.writeFileSync(changelogPath, changelog);
    console.log(`✅ Updated CHANGELOG.md with version ${newVersion}`);
  }

  console.log(`\n🎉 Release ${newVersion} prepared!`);
  console.log(`\nNext steps:`);
  console.log(`1. Review the changes`);
  console.log(`2. git add .`);
  console.log(`3. git commit -m "chore: release v${newVersion}"`);
  console.log(`4. git push origin main  # This will deploy your release!`);

} catch (error) {
  console.error('❌ Release failed:', error.message);
  process.exit(1);
}
