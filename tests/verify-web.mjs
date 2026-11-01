/**
 * Verification script for Frontend Dashboard Web server
 */

import { fork } from 'node:child_process';

const webProcess = fork('apps/web/server.mjs');
await new Promise(r => setTimeout(r, 1500));

try {
  const res = await fetch('http://127.0.0.1:3000');
  console.log('[PROBE WEB DASHBOARD]', res.status, res.headers.get('content-type'));
  const html = await res.text();
  if (html.includes('AlgoYouTube OS') && html.includes('26-Step Pipeline')) {
    console.log('>>> FRONTEND WEB DASHBOARD VERIFIED: HTML RENDERED COMPLETE <<<');
  } else {
    throw new Error('Unexpected HTML response');
  }
} finally {
  webProcess.kill();
}
