export type EngineType =
  | 'dna'
  | 'idea-intelligence'
  | 'scriptforge'
  | 'visual-lab'
  | 'outsource'
  | 'toolchain'
  | 'reach'
  | 'discovery'
  | 'understanding'
  | 'technology-selection'
  | 'evolution'
  | 'benchmark'
  | 'knowledge'
  | 'connector-evolution'
  | 'engineering-orchestrator';

export type ToolPermission = 'read' | 'controlled_write' | 'admin';

export interface CreatorProfile {
  id: string;
  handle: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  language: string;
  targetNiche: string;
  channelId?: string;
  channelTitle?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChannelDNA {
  channelId: string;
  channelTitle: string;
  niche: string;
  audiencePersona: {
    demographics: string;
    painPoints: string[];
    coreDesires: string[];
  };
  brandVoice: {
    tone: string;
    pacing: string;
    catchphrases: string[];
  };
  visualStyle: {
    colorPalette: string[];
    thumbnailStyle: string;
    fontFamily: string;
  };
  historicalMetrics: {
    subscriberCount: number;
    videoCount: number;
    avgViews: number;
    avgEngagementRate: number;
  };
  opportunityClusters: Array<{
    topic: string;
    searchDemand: number;
    competitionLevel: number;
    projectedFit: number;
  }>;
  confidenceScore: number;
  lastUpdated: string;
}

export interface ContentIdea {
  id: string;
  title: string;
  angle: string;
  targetAudience: string;
  opportunityScore: number;
  breakdown: {
    searchDemandScore: number;
    trendMomentumScore: number;
    audiencePainScore: number;
    creatorFitScore: number;
    productionFeasibilityScore: number;
  };
  rationale: string;
  estimatedLengthMin: number;
}

export interface ScriptForgeOutput {
  title: string;
  hookOptions: Array<{ text: string; retentionHookType: string }>;
  threeActStructure: {
    act1_hookAndPremise: string;
    act2_escalationAndValue: string;
    act3_climaxAndResolution: string;
  };
  fullScriptSections: Array<{
    section: string;
    timestamp: string;
    narrationText: string;
    visualCallout: string;
    soundEffectCues?: string;
  }>;
  callToAction: string;
}

export interface VisualLabOutput {
  thumbnailConcepts: Array<{
    conceptName: string;
    visualElements: string;
    textOverlay: string;
    midjourneyPrompt: string;
    fluxPrompt: string;
    colorDominance: string[];
  }>;
  storyboardScenes: Array<{
    sceneNumber: number;
    timing: string;
    shotType: 'close-up' | 'wide' | 'b-roll' | 'screen-record' | 'motion-graphic';
    description: string;
    aiPrompt: string;
  }>;
  bRollChecklist: string[];
}

export interface ReachAmplifierOutput {
  seoTitleOptions: string[];
  optimizedDescription: string;
  chapterTimestamps: Array<{ time: string; title: string }>;
  tags: string[];
  hashtags: string[];
  shortsPlan: Array<{
    clipTitle: string;
    sourceTimestamp: string;
    hookNarrative: string;
  }>;
  distributionChecklist: string[];
}

export interface ContentProject {
  id: string;
  creatorId: string;
  title: string;
  niche: string;
  status: string;
  currentStep: number;
  totalSteps: number;
  idea?: ContentIdea;
  script?: ScriptForgeOutput;
  visuals?: VisualLabOutput;
  reach?: ReachAmplifierOutput;
  createdAt: string;
  updatedAt: string;
}

export interface MCPToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  permission: ToolPermission;
  category: 'creator' | 'engineering' | 'connector' | 'evolution';
}
