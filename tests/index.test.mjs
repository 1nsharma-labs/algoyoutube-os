/**
 * AlgoYouTube OS Master Test Suite
 * Executed via native Node.js test runner: `node --test tests/index.test.mjs`
 */

import test from 'node:test';
import assert from 'node:assert/strict';

// Core packages & engines
import { encryptToken, decryptToken, validateSafeUrl, sanitizeInput } from '../packages/security/src/index.mjs';
import { db } from '../packages/database/src/index.mjs';
import { mcpServer } from '../packages/mcp-server/src/index.mjs';
import { mcpClientManager } from '../packages/mcp-client/src/index.mjs';
import { ideaEngine } from '../engines/idea-intelligence/src/index.mjs';
import { dnaEngine } from '../engines/dna/src/index.mjs';
import { scriptForge } from '../engines/scriptforge/src/index.mjs';
import { visualLab } from '../engines/visual-lab/src/index.mjs';
import { reachEngine } from '../engines/reach/src/index.mjs';
import { outsourceEngine } from '../engines/outsource/src/index.mjs';
import { ContentWorkflowRunner, WORKFLOW_STEPS } from '../packages/workflow-sdk/src/index.mjs';
import { engineeringOrchestrator } from '../engines/engineering-orchestrator/src/index.mjs';
import { benchmarkEngine } from '../engines/benchmark/src/index.mjs';

// --------------------------------------------------------------------------
// 1. SECURITY SUITE
// --------------------------------------------------------------------------
test('Security: AES-256-GCM Token Encryption & Decryption', () => {
  const secret = 'super_secret_oauth_refresh_token_xyz_123';
  const cipher = encryptToken(secret);
  assert.notEqual(cipher, secret);
  assert.match(cipher, /^[a-f0-9]+:[a-f0-9]+:[a-f0-9]+$/);

  const decrypted = decryptToken(cipher);
  assert.equal(decrypted, secret);
});

test('Security: SSRF Filter Blocks Private IPs and Cloud Metadata', () => {
  assert.equal(validateSafeUrl('http://169.254.169.254/latest/meta-data').safe, false);
  assert.equal(validateSafeUrl('http://127.0.0.1:8080').safe, false);
  assert.equal(validateSafeUrl('http://localhost:3000').safe, false);
  assert.equal(validateSafeUrl('http://192.168.1.1').safe, false);
  assert.equal(validateSafeUrl('http://10.0.0.5').safe, false);
  assert.equal(validateSafeUrl('https://api.github.com').safe, true);
  assert.equal(validateSafeUrl('https://developers.google.com').safe, true);
});

test('Security: Input Sanitizer strips control characters', () => {
  const dirty = 'Normal text\x00\x08with control characters\x1F';
  const clean = sanitizeInput(dirty);
  assert.equal(clean, 'Normal textwith control characters');
});

// --------------------------------------------------------------------------
// 2. DATABASE & MULTI-TENANCY SUITE
// --------------------------------------------------------------------------
test('Database: Multi-Tenant Project Isolation and Retrieval', () => {
  const p1 = db.getProject('proj_mcp_mastery_001', 'tenant_1nsharma');
  assert.ok(p1, 'Project should exist for tenant_1nsharma');
  assert.equal(p1.tenantId, 'tenant_1nsharma');

  const pForeign = db.getProject('proj_mcp_mastery_001', 'tenant_stranger');
  assert.equal(pForeign, null, 'Tenant boundary firewall must block foreign tenant access');
});

// --------------------------------------------------------------------------
// 3. SEVEN PRODUCTION ENGINES SUITE
// --------------------------------------------------------------------------
test('DNA Engine: Channel DNA calculation and diagnostic report', () => {
  const dna = dnaEngine.getDNA();
  assert.ok(dna);
  assert.equal(dna.channelTitle, '1nsharma Tech & AI Architecture');

  const diag = dnaEngine.generateDiagnosticReport();
  assert.ok(diag.recommendedRoadmap.length > 0);
  assert.ok(diag.healthScore >= 90);
});

test('Idea Intelligence: Transparent Weighted Opportunity Score', () => {
  const score = ideaEngine.calculateOpportunityScore({
    searchDemandScore: 90,
    trendMomentumScore: 90,
    audiencePainScore: 90,
    creatorFitScore: 90,
    productionFeasibilityScore: 90
  });
  assert.equal(score, 90);

  const ideas = ideaEngine.generateIdeasForNiche('Model Context Protocol', 3);
  assert.equal(ideas.length, 3);
  assert.ok(ideas[0].opportunityScore > 70);
});

test('ScriptForge: 3-Act Structure and Retention Hook Generation', () => {
  const script = scriptForge.generateScript({ title: 'Autonomous AI Operating Systems' });
  assert.equal(script.format, 'long-form');
  assert.ok(script.hookOptions.length >= 2);
  assert.ok(script.threeActStructure.act1_hookAndPremise);
  assert.ok(script.threeActStructure.act2_escalationAndValue);
  assert.ok(script.threeActStructure.act3_climaxAndResolution);
  assert.ok(script.fullScriptSections.length >= 3);
});

test('Visual Lab: High-CTR Thumbnail Prompts & Storyboard Scenes', () => {
  const visuals = visualLab.generateVisualPackage({ title: 'The Future of AI Agents' });
  assert.ok(visuals.thumbnailConcepts.length >= 2);
  assert.ok(visuals.thumbnailConcepts[0].midjourneyPrompt.includes('Futuristic') || visuals.thumbnailConcepts[0].midjourneyPrompt.includes('Cinematic'));
  assert.ok(visuals.storyboardScenes.length >= 3);
});

test('Outsource Connect: Production Briefs without Unapproved Spend', () => {
  const briefs = outsourceEngine.generateProductionBriefs({ title: 'AI Architecture' });
  assert.ok(briefs.editorBrief);
  assert.ok(briefs.designerBrief);
  assert.ok(briefs.estimatedProductionBudgetUSD.minimum > 0);
});

test('Reach Amplifier: SEO Metadata & Shorts Extraction', () => {
  const reach = reachEngine.generatePackage({ title: 'Open-Source MCP Server' });
  assert.ok(reach.titleVariations.length >= 3);
  assert.ok(reach.optimizedDescription.includes('GitHub'));
  assert.ok(reach.chapterTimestamps.length >= 4);
  assert.ok(reach.shortsPlan.length >= 2);
});

// --------------------------------------------------------------------------
// 4. WORKFLOW PIPELINE: 26 CANONICAL STEPS
// --------------------------------------------------------------------------
test('Workflow SDK: Full 26-Step Sequential Idea-to-Content-Kit Execution', async () => {
  assert.equal(WORKFLOW_STEPS.length, 26, 'Must contain exactly 26 canonical steps');

  const runner = new ContentWorkflowRunner({ title: 'Automating Everything with AlgoYouTube OS' });
  const artifacts = await runner.runAllSteps();

  assert.equal(runner.currentStep, 26);
  assert.equal(runner.status, 'COMPLETED');
  assert.ok(artifacts.research_report);
  assert.ok(artifacts.full_script);
  assert.ok(artifacts.storyboard);
  assert.ok(artifacts.thumbnail_concepts);
  assert.ok(artifacts.performance_tracking_plan);
});

// --------------------------------------------------------------------------
// 5. UNIVERSAL MODEL CONTEXT PROTOCOL (MCP) SUITE
// --------------------------------------------------------------------------
test('MCP Server: JSON-RPC 2.0 initialize Handshake', async () => {
  const res = await mcpServer.handleJSONRPC({
    jsonrpc: '2.0',
    id: 101,
    method: 'initialize',
    params: {}
  });

  assert.equal(res.jsonrpc, '2.0');
  assert.equal(res.id, 101);
  assert.equal(res.result.serverInfo.name, 'algoyoutube-mcp-server');
  assert.ok(res.result.capabilities.tools);
});

test('MCP Server: tools/list & tools/call Tool Invocation', async () => {
  const listRes = await mcpServer.handleJSONRPC({
    jsonrpc: '2.0',
    id: 102,
    method: 'tools/list'
  });
  assert.ok(listRes.result.tools.length >= 6);

  const callRes = await mcpServer.handleJSONRPC({
    jsonrpc: '2.0',
    id: 103,
    method: 'tools/call',
    params: {
      name: 'get_system_status',
      arguments: {}
    }
  });

  assert.equal(callRes.id, 103);
  const statusData = JSON.parse(callRes.result.content[0].text);
  assert.equal(statusData.status, 'OPERATIONAL');
  assert.equal(statusData.system, 'AlgoYouTube OS');
});

test('MCP Server: resources/read creator://dna', async () => {
  const res = await mcpServer.handleJSONRPC({
    jsonrpc: '2.0',
    id: 104,
    method: 'resources/read',
    params: { uri: 'creator://dna' }
  });

  assert.equal(res.id, 104);
  assert.ok(res.result.contents[0].text.includes('1nsharma Tech & AI Architecture'));
});

// --------------------------------------------------------------------------
// 6. META-ENGINEERING & BENCHMARK SUITE
// --------------------------------------------------------------------------
test('Meta-Engineering: Autonomous Evolution Cycle Execution', async () => {
  const cycle = await engineeringOrchestrator.runAutonomousEvolutionCycle();
  assert.equal(cycle.status, 'CYCLE_COMPLETED');
  assert.ok(cycle.discoveriesCount > 0);
  assert.ok(cycle.proposalsGenerated > 0);
});

test('Benchmark Engine: Latency and regression benchmarks pass', async () => {
  const bench = await benchmarkEngine.runSuite();
  assert.equal(bench.overallVerdict, 'ALL_BENCHMARKS_SATISFIED');
  assert.ok(bench.benchmarks.every(b => b.status === 'PASSED'));
});
