import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';

const dir = process.cwd();

async function initAndCommit() {
  console.log('Initializing local git repository in:', dir);
  await git.init({ fs, dir, defaultBranch: 'main' });

  // Get all files excluding node_modules, dist, and .git
  async function getFiles(curDir, baseDir = '') {
    const entries = await fs.promises.readdir(curDir, { withFileTypes: true });
    let files = [];
    for (const entry of entries) {
      const relPath = path.join(baseDir, entry.name).replace(/\\/g, '/');
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === '.env') {
        continue;
      }
      if (entry.isDirectory()) {
        const sub = await getFiles(path.join(curDir, entry.name), relPath);
        files = files.concat(sub);
      } else {
        files.push(relPath);
      }
    }
    return files;
  }

  const allFiles = await getFiles(dir);
  console.log(`Adding ${allFiles.length} files to Git index...`);

  for (const file of allFiles) {
    await git.add({ fs, dir, filepath: file });
  }

  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'CHAUDHARY TANMAY',
      email: 'support@fusionhub.in',
    },
    message: 'feat: AI Agent readiness overhaul (OpenAPI 3.1.0, MCP, Accept-Markdown, SEO & JSON-LD)',
  });

  console.log('✅ Commit created successfully! Commit SHA:', sha);

  await git.setConfig({
    fs,
    dir,
    path: 'remote.origin.url',
    value: 'https://github.com/tpganime/discordbot.git'
  });
  console.log('✅ Remote origin set to https://github.com/tpganime/discordbot.git');
}

initAndCommit().catch(err => {
  console.error('Git error:', err);
  process.exit(1);
});
