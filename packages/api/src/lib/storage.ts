import { inDevelopment } from '#lib';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function gitRoot() {
  return execSync('git rev-parse --show-toplevel').toString().trim();
}

export function storageRoot() {
  return inDevelopment()
    ? path.join(gitRoot(), 'packages/api/storage')
    : fileURLToPath(new URL(process.env.STORAGE));
}
