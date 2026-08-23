
import fs from 'fs';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';

const dir = process.cwd();
const token = process.argv[2];

async function run() {
  async function getFiles(curDir, baseDir = '') {
    const entries = await fs.promises.readdir(curDir, { withFileTypes: true });
    let files = [];
    for (const entry of entries) {
      const relPath = path.join(baseDir, entry.name).replace(/\\/g, '/');
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === '.env') continue;
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
  for (const f of allFiles) {
    await git.add({ fs, dir, filepath: f });
  }

  const sha = await git.commit({
    fs,
    dir,
    author: { name: 'CHAUDHARY TANMAY', email: 'support@fusionhub.in' },
    message: 'refactor: Clean UI without visual AI banners, preserve all agent endpoints in background'
  });
  console.log('Committed SHA:', sha);

  const pushRes = await git.push({
    fs,
    http,
    dir,
    remote: 'origin',
    ref: 'main',
    force: true,
    onAuth: () => ({ username: token })
  });
  console.log('✅ Pushed to GitHub:', JSON.stringify(pushRes, null, 2));
}

import path from 'path';
run().catch(e => { console.error('Error:', e); process.exit(1); });
