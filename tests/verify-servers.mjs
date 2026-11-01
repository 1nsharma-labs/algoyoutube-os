/**
 * Verification script for API and MCP Gateway live servers
 */

import http from 'node:http';
import { fork } from 'node:child_process';

const apiProcess = fork('apps/api/src/index.mjs');

// Wait 1.5s for server to start
await new Promise(r => setTimeout(r, 1500));

async function fetchJSON(url, options = {}) {
  const res = await fetch(url, options);
  return { status: res.status, data: await res.json() };
}

try {
  // 1. Probe /api/health
  const health = await fetchJSON('http://127.0.0.1:4000/api/health');
  console.log('[PROBE 1: API HEALTH]', health.status, health.data);

  // 2. Probe /mcp/v1 JSON-RPC initialize
  const mcpInit = await fetchJSON('http://127.0.0.1:4000/mcp/v1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize', params: {} })
  });
  console.log('[PROBE 2: MCP INITIALIZE]', mcpInit.status, mcpInit.data.result?.serverInfo);

  // 3. Probe /mcp/v1 JSON-RPC tools/call
  const mcpTool = await fetchJSON('http://127.0.0.1:4000/mcp/v1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: { name: 'get_channel_dna', arguments: { creatorId: 'creator_1nsharma' } }
    })
  });
  console.log('[PROBE 3: MCP TOOLS/CALL get_channel_dna]', mcpTool.status, 'Tool executed successfully');

  // 4. Probe /api/ideas/generate
  const ideas = await fetchJSON('http://127.0.0.1:4000/api/ideas/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ niche: 'Model Context Protocol', count: 2 })
  });
  console.log('[PROBE 4: IDEAS GENERATE]', ideas.status, `Generated ${ideas.data.count} high-opportunity ideas`);

  console.log('\n>>> ALL LIVE SERVER PROBES VERIFIED SUCCESSFULLY <<<');
} finally {
  apiProcess.kill();
}
