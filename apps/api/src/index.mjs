/**
 * @algoyoutube/api
 * Modular AI Operating System & Universal MCP Gateway Server
 * Exposes REST endpoints, SSE streams, and MCP JSON-RPC 2.0 at /mcp/v1
 */

import http from 'node:http';
import { URL } from 'node:url';
import { db } from '@algoyoutube/database';
import { mcpServer } from '@algoyoutube/mcp-server';
import { mcpClientManager } from '@algoyoutube/mcp-client';
import { ideaEngine } from '@algoyoutube/engine-idea-intelligence';
import { dnaEngine } from '@algoyoutube/engine-dna';
import { scriptForge } from '@algoyoutube/engine-scriptforge';
import { visualLab } from '@algoyoutube/engine-visual-lab';
import { reachEngine } from '@algoyoutube/engine-reach';
import { outsourceEngine } from '@algoyoutube/engine-outsource';
import { engineeringOrchestrator } from '@algoyoutube/engine-orchestrator';
import { benchmarkEngine } from '@algoyoutube/engine-benchmark';
import { auditLogger } from '@algoyoutube/security';
import { ContentWorkflowRunner, WORKFLOW_STEPS } from '@algoyoutube/workflow-sdk';

const PORT = process.env.PORT || 4000;

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Tenant-Id'
  });
  res.end(JSON.stringify(data, null, 2));
}

async function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Tenant-Id'
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const path = parsedUrl.pathname;
  const method = req.method;
  const tenantId = req.headers['x-tenant-id'] || 'tenant_1nsharma';

  try {
    // 1. HEALTH CHECK
    if (path === '/api/health' && method === 'GET') {
      return sendJSON(res, 200, {
        status: 'HEALTHY',
        system: 'AlgoYouTube OS',
        version: '1.0.0-alpha',
        uptimeSeconds: Math.round(process.uptime()),
        timestamp: new Date().toISOString()
      });
    }

    // 2. MODEL CONTEXT PROTOCOL (MCP) JSON-RPC 2.0 ENDPOINT
    if (path === '/mcp/v1' && method === 'POST') {
      const rpcRequest = await parseBody(req);
      const rpcResponse = await mcpServer.handleJSONRPC(rpcRequest, { tenantId, actor: 'http_client' });
      return sendJSON(res, 200, rpcResponse);
    }

    // 3. CREATOR PROFILE & DNA
    if (path === '/api/creator/profile' && method === 'GET') {
      const profile = db.getCreator('creator_1nsharma');
      return sendJSON(res, 200, profile);
    }

    if (path === '/api/creator/dna' && method === 'GET') {
      const dna = dnaEngine.getDNA();
      return sendJSON(res, 200, dna);
    }

    if (path === '/api/creator/dna/diagnostics' && method === 'GET') {
      const report = dnaEngine.generateDiagnosticReport();
      return sendJSON(res, 200, report);
    }

    // 4. IDEA INTELLIGENCE
    if (path === '/api/ideas/generate' && method === 'POST') {
      const body = await parseBody(req);
      const niche = body.niche || 'Autonomous AI Engineering';
      const count = body.count || 3;
      const ideas = ideaEngine.generateIdeasForNiche(niche, count);
      return sendJSON(res, 200, { niche, count: ideas.length, ideas });
    }

    // 5. CONTENT PROJECTS
    if (path === '/api/projects' && method === 'GET') {
      const projects = db.listProjects(tenantId);
      return sendJSON(res, 200, projects);
    }

    if (path === '/api/projects' && method === 'POST') {
      const body = await parseBody(req);
      const newProject = {
        id: `proj_${Date.now()}`,
        creatorId: 'creator_1nsharma',
        tenantId,
        title: body.title || 'Untitled Project',
        niche: body.niche || 'Autonomous AI Engineering',
        status: 'ideation',
        currentStep: 1,
        totalSteps: 26,
        idea: body.idea || {
          id: `idea_${Date.now()}`,
          title: body.title,
          opportunityScore: 92,
          breakdown: { searchDemandScore: 90, trendMomentumScore: 90, audiencePainScore: 95, creatorFitScore: 95, productionFeasibilityScore: 90 }
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      db.saveProject(newProject);
      return sendJSON(res, 201, newProject);
    }

    // 6. WORKFLOW EXECUTION: 26-STEP PIPELINE
    const runAllMatch = path.match(/^\/api\/projects\/([^/]+)\/run-all$/);
    if (runAllMatch && method === 'POST') {
      const projectId = runAllMatch[1];
      const project = db.getProject(projectId, tenantId);
      if (!project) return sendJSON(res, 404, { error: 'Project not found' });

      const runner = new ContentWorkflowRunner(project.idea || { title: project.title });
      const artifacts = await runner.runAllSteps();

      // Enrich project
      project.currentStep = 26;
      project.status = 'ready_to_publish';
      project.script = scriptForge.generateScript({ title: project.title });
      project.visuals = visualLab.generateVisualPackage({ title: project.title });
      project.reach = reachEngine.generatePackage({ title: project.title });
      project.artifacts = artifacts;
      db.saveProject(project);

      return sendJSON(res, 200, { success: true, project });
    }

    // 7. PLATFORMS & CONNECTORS
    if (path === '/api/platforms' && method === 'GET') {
      return sendJSON(res, 200, db.listPlatforms());
    }

    if (path === '/api/mcp/servers' && method === 'GET') {
      return sendJSON(res, 200, mcpClientManager.listServers());
    }

    // 8. AUTONOMOUS EVOLUTION & BENCHMARKS
    if (path === '/api/evolution/cycle' && method === 'POST') {
      const cycleResult = await engineeringOrchestrator.runAutonomousEvolutionCycle();
      return sendJSON(res, 200, cycleResult);
    }

    if (path === '/api/evolution/proposals' && method === 'GET') {
      return sendJSON(res, 200, db.listImprovementProposals());
    }

    if (path === '/api/benchmarks' && method === 'GET') {
      const benchmark = await benchmarkEngine.runSuite();
      return sendJSON(res, 200, benchmark);
    }

    // 9. OWNER COMMAND CENTER
    if (path === '/api/owner/command' && method === 'POST') {
      const body = await parseBody(req);
      const instruction = body.instruction || '';
      const result = await engineeringOrchestrator.handleOwnerInstruction(instruction);
      return sendJSON(res, 200, result);
    }

    // 10. SECURITY AUDIT LOGS
    if (path === '/api/security/audit' && method === 'GET') {
      return sendJSON(res, 200, auditLogger.getRecentLogs(25));
    }

    // 404 Fallback
    return sendJSON(res, 404, { error: 'Endpoint not found', path });
  } catch (err) {
    return sendJSON(res, 500, { error: 'Internal Server Error', message: err.message });
  }
});

server.listen(PORT, () => {
  console.log(`[AlgoYouTube OS] Modular API & MCP Gateway running on http://localhost:${PORT}`);
  console.log(`[AlgoYouTube OS] MCP JSON-RPC 2.0 endpoint available at http://localhost:${PORT}/mcp/v1`);
});
