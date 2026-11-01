/**
 * @algoyoutube/mcp-client
 * Universal MCP Client & Connector Manager for discovering, connecting to,
 * schema-auditing, and invoking external MCP servers.
 */

import { validateSafeUrl, auditLogger } from '@algoyoutube/security';

export class MCPClientManager {
  constructor() {
    this.connections = new Map();
  }

  async addServer(config) {
    const { id, name, endpointUrl, apiKey } = config;
    const urlValidation = validateSafeUrl(endpointUrl);
    if (!urlValidation.safe && !endpointUrl.startsWith('internal://')) {
      throw new Error(`Cannot register MCP Server: ${urlValidation.reason}`);
    }

    const serverRecord = {
      id,
      name,
      endpointUrl,
      apiKey: apiKey ? '***CONFIGURED***' : 'NONE',
      status: 'INITIALIZING',
      capabilities: null,
      tools: [],
      resources: [],
      prompts: [],
      lastChecked: new Date().toISOString()
    };

    this.connections.set(id, serverRecord);
    await this.testConnection(id);
    return serverRecord;
  }

  async testConnection(serverId) {
    const server = this.connections.get(serverId);
    if (!server) throw new Error(`Server '${serverId}' not found`);

    try {
      // If internal mock / loopback
      if (server.endpointUrl.startsWith('internal://')) {
        server.status = 'CONNECTED';
        server.tools = [
          { name: 'query_vector_store', description: 'Search local embeddings', permission: 'read' },
          { name: 'execute_media_render', description: 'Run FFmpeg assembly', permission: 'controlled_write' }
        ];
        server.lastChecked = new Date().toISOString();
        return { success: true, status: 'CONNECTED', toolsCount: server.tools.length };
      }

      // External HTTP JSON-RPC ping
      const res = await fetch(server.endpointUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize', params: {} }),
        signal: AbortSignal.timeout(3000)
      });

      if (res.ok) {
        const data = await res.json();
        server.status = 'CONNECTED';
        server.capabilities = data.result?.capabilities;
        server.lastChecked = new Date().toISOString();
        return { success: true, status: 'CONNECTED' };
      } else {
        server.status = 'ERROR';
        return { success: false, status: 'ERROR', code: res.status };
      }
    } catch (err) {
      server.status = 'OFFLINE';
      return { success: false, status: 'OFFLINE', error: err.message };
    }
  }

  listServers() {
    return Array.from(this.connections.values());
  }

  removeServer(serverId) {
    return this.connections.delete(serverId);
  }

  async invokeTool(serverId, toolName, args) {
    const server = this.connections.get(serverId);
    if (!server) throw new Error(`Server '${serverId}' not found`);

    auditLogger.log({
      action: 'mcp_client_invoke',
      actor: 'algoyoutube_orchestrator',
      details: { serverId, toolName }
    });

    if (server.endpointUrl.startsWith('internal://')) {
      return { status: 'SUCCESS', result: `Mock execution of ${toolName} on ${server.name}` };
    }

    const res = await fetch(server.endpointUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: Date.now(),
        method: 'tools/call',
        params: { name: toolName, arguments: args }
      }),
      signal: AbortSignal.timeout(10000)
    });

    return await res.json();
  }
}

export const mcpClientManager = new MCPClientManager();

// Seed initial default local client adapters
mcpClientManager.addServer({
  id: 'mcp_local_media',
  name: 'Local Media Production MCP',
  endpointUrl: 'internal://media-worker',
  apiKey: ''
}).catch(() => {});
