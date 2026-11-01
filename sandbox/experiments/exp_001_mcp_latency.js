/**
 * Sandbox Experiment 001: Testing MCP Remote Server JSON-RPC 2.0 Latency
 */

import { performance } from 'node:perf_hooks';
import { mcpServer } from '../../packages/mcp-server/src/index.mjs';

async function runExperiment() {
  const iterations = 100;
  const start = performance.now();

  for (let i = 0; i < iterations; i++) {
    await mcpServer.handleJSONRPC({
      jsonrpc: '2.0',
      id: i,
      method: 'tools/call',
      params: { name: 'get_system_status', arguments: {} }
    });
  }

  const duration = performance.now() - start;
  const avgMs = duration / iterations;
  console.log(`[Sandbox Exp 001] Ran ${iterations} iterations in ${duration.toFixed(2)}ms. Avg: ${avgMs.toFixed(3)}ms/call`);
}

runExperiment();
