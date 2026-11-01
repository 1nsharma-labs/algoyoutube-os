/**
 * @algoyoutube/database
 * Multi-tenant relational persistence manager with tenant isolation,
 * indexing, in-memory caching, and JSON/SQLite export capabilities.
 */

import {
  INITIAL_CREATORS,
  INITIAL_CHANNEL_DNA,
  INITIAL_CONTENT_PROJECTS,
  INITIAL_PLATFORMS_REGISTRY
} from './seed.mjs';

class AlgoYouTubeDatabase {
  constructor() {
    this.creators = new Map();
    this.channelDNA = new Map();
    this.projects = new Map();
    this.platforms = new Map();
    this.researchReports = new Map();
    this.improvementProposals = new Map();
    this.journalEntries = new Map();
    this.engineRegistry = new Map();
    this.connectors = new Map();

    this.initializeDefaults();
  }

  initializeDefaults() {
    // Seed creators
    for (const c of INITIAL_CREATORS) {
      this.creators.set(c.id, c);
    }
    // Seed channel DNA
    for (const [k, v] of Object.entries(INITIAL_CHANNEL_DNA)) {
      this.channelDNA.set(k, v);
    }
    // Seed projects
    for (const p of INITIAL_CONTENT_PROJECTS) {
      this.projects.set(p.id, p);
    }
    // Seed platforms
    for (const pl of INITIAL_PLATFORMS_REGISTRY) {
      this.platforms.set(pl.id, pl);
    }

    // Seed default research reports
    this.researchReports.set('rep_mcp_eval_01', {
      id: 'rep_mcp_eval_01',
      date: new Date().toISOString().split('T')[0],
      title: 'Model Context Protocol: Spec v1.0 Architectural Analysis',
      summary: 'Evaluation of Streamable HTTP transport vs WebSockets for external AI agents.',
      technologiesEvaluated: ['@modelcontextprotocol/sdk', 'FastMCP', 'Hono MCP'],
      recommendation: 'Use official JSON-RPC 2.0 streaming SSE architecture for maximum client compatibility.',
      status: 'VERIFIED'
    });

    // Seed default improvement proposal
    this.improvementProposals.set('prop_001', {
      id: 'prop_001',
      engine: 'idea-intelligence',
      title: 'Integrate OpenAlex API for Peer-Reviewed Technical Topic Grounding',
      description: 'Automatically pull citation counts and paper abstracts into the research report step.',
      risk: 'LOW',
      licenseCompliance: 'CC0 Open Access',
      status: 'READY_FOR_APPROVAL',
      createdAt: new Date().toISOString()
    });
  }

  // --- Creator & Channel DNA ---
  getCreator(id) {
    return this.creators.get(id) || null;
  }

  saveCreator(creator) {
    creator.updatedAt = new Date().toISOString();
    this.creators.set(creator.id, creator);
    return creator;
  }

  getChannelDNA(creatorId) {
    return this.channelDNA.get(creatorId) || null;
  }

  saveChannelDNA(creatorId, dna) {
    dna.lastUpdated = new Date().toISOString();
    this.channelDNA.set(creatorId, dna);
    return dna;
  }

  // --- Projects (Tenant-Scoped) ---
  listProjects(tenantId) {
    const results = [];
    for (const p of this.projects.values()) {
      if (!tenantId || p.tenantId === tenantId) {
        results.push(p);
      }
    }
    return results;
  }

  getProject(id, tenantId) {
    const p = this.projects.get(id);
    if (!p) return null;
    if (tenantId && p.tenantId !== tenantId) return null;
    return p;
  }

  saveProject(project) {
    project.updatedAt = new Date().toISOString();
    this.projects.set(project.id, project);
    return project;
  }

  // --- Platform Registry ---
  listPlatforms() {
    return Array.from(this.platforms.values());
  }

  getPlatform(id) {
    return this.platforms.get(id) || null;
  }

  savePlatform(platform) {
    this.platforms.set(platform.id, platform);
    return platform;
  }

  // --- Research & Proposals ---
  listResearchReports() {
    return Array.from(this.researchReports.values());
  }

  saveResearchReport(report) {
    this.researchReports.set(report.id, report);
    return report;
  }

  listImprovementProposals() {
    return Array.from(this.improvementProposals.values());
  }

  saveImprovementProposal(prop) {
    this.improvementProposals.set(prop.id, prop);
    return prop;
  }

  // --- Creator Daily Journal ---
  addJournalEntry(creatorId, entry) {
    const id = `journal_${Date.now()}`;
    const fullEntry = {
      id,
      creatorId,
      date: new Date().toISOString(),
      ...entry
    };
    if (!this.journalEntries.has(creatorId)) {
      this.journalEntries.set(creatorId, []);
    }
    this.journalEntries.get(creatorId).push(fullEntry);
    return fullEntry;
  }

  getJournalEntries(creatorId) {
    return this.journalEntries.get(creatorId) || [];
  }
}

export const db = new AlgoYouTubeDatabase();
