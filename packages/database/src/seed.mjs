/**
 * @algoyoutube/database/seed
 * Initial production fixtures and realistic domain seeds
 */

export const INITIAL_CREATORS = [
  {
    id: 'creator_1nsharma',
    tenantId: 'tenant_1nsharma',
    handle: '@1nsharma',
    name: '1nsharma AI Lab',
    email: '1nsharma@algoyoutube.com',
    bio: 'Pioneering open-source AI engineering and autonomous creator operating systems.',
    language: 'English',
    targetNiche: 'Autonomous AI Engineering & Tech Architecture',
    channelId: 'UC_1nsharma_official',
    channelTitle: '1nsharma Tech & AI Architecture',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const INITIAL_CHANNEL_DNA = {
  creator_1nsharma: {
    channelId: 'UC_1nsharma_official',
    channelTitle: '1nsharma Tech & AI Architecture',
    niche: 'Autonomous AI Engineering & Developer Ecosystems',
    audiencePersona: {
      demographics: 'Engineers, AI Researchers, Technical Founders, Senior Devs (Ages 22-45)',
      painPoints: [
        'Overwhelmed by fragmented AI toolchains',
        'Exorbitant proprietary SaaS costs',
        'Difficulty integrating local LLMs with production systems',
        'Scaling multi-agent architectures reliably'
      ],
      coreDesires: [
        'Complete self-hosted open-source autonomy',
        'Production-tested architecture blueprints',
        'Deterministic execution without hallucinations'
      ]
    },
    brandVoice: {
      tone: 'Authoritative, Pragmatic, Dense with Value, Zero Fluff, Engineering-First',
      pacing: 'Dynamic, code-grounded, structured 3-act narrative',
      catchphrases: ['Build once, discover daily.', 'Code verified in production, not on slides.']
    },
    visualStyle: {
      colorPalette: ['#0f172a', '#3b82f6', '#10b981', '#f59e0b'],
      thumbnailStyle: 'High-contrast dark mode, bold typography, schematic diagrams, code snippets',
      fontFamily: 'Inter / JetBrains Mono'
    },
    historicalMetrics: {
      subscriberCount: 48500,
      videoCount: 74,
      avgViews: 32400,
      avgEngagementRate: 8.6
    },
    opportunityClusters: [
      {
        topic: 'Model Context Protocol (MCP) in Production',
        searchDemand: 94,
        competitionLevel: 28,
        projectedFit: 98
      },
      {
        topic: 'Local-First AI Agents with Ollama & DeepSeek',
        searchDemand: 91,
        competitionLevel: 35,
        projectedFit: 95
      },
      {
        topic: 'Autonomous Multi-Agent Self-Healing CI/CD',
        searchDemand: 82,
        competitionLevel: 22,
        projectedFit: 92
      }
    ],
    confidenceScore: 0.94,
    lastUpdated: new Date().toISOString()
  }
};

export const INITIAL_CONTENT_PROJECTS = [
  {
    id: 'proj_mcp_mastery_001',
    creatorId: 'creator_1nsharma',
    tenantId: 'tenant_1nsharma',
    title: 'Why MCP Will Kill Traditional REST APIs for AI Agents',
    niche: 'Autonomous AI Engineering',
    status: 'ready_to_publish',
    currentStep: 26,
    totalSteps: 26,
    idea: {
      id: 'idea_mcp_001',
      title: 'Why MCP Will Kill Traditional REST APIs for AI Agents',
      angle: 'Architectural deep dive into Model Context Protocol vs OpenAPI, streamable transports, and dynamic tool negotiation.',
      targetAudience: 'Software Engineers & AI Architects',
      opportunityScore: 96,
      breakdown: {
        searchDemandScore: 95,
        trendMomentumScore: 98,
        audiencePainScore: 92,
        creatorFitScore: 99,
        productionFeasibilityScore: 94
      },
      rationale: 'Massive surge in interest following official protocol standardization, but zero comprehensive architectural breakdowns exist.',
      estimatedLengthMin: 14
    },
    script: {
      title: 'Why MCP Will Kill Traditional REST APIs for AI Agents',
      hookOptions: [
        { text: 'In 24 months, hardcoding REST API endpoints for your AI models will look like hand-wiring vacuum tubes.', retentionHookType: 'contrarian-future' },
        { text: 'Anthropic and the open-source community just solved the biggest bottleneck in AI agent engineering: here is the Model Context Protocol.', retentionHookType: 'curiosity-loop' }
      ],
      threeActStructure: {
        act1_hookAndPremise: 'The death of brittle JSON function calling schemas and the emergence of standardized agent-to-tool protocols.',
        act2_escalationAndValue: 'Deep dive into Streamable HTTP, SSE transports, dynamic tool discovery, and runtime permission firewalls.',
        act3_climaxAndResolution: 'Live architecture demonstration of an open-source MCP Server running against Gemini, Claude, and local Ollama.'
      },
      fullScriptSections: [
        {
          section: '01. The Problem with Custom Tool Wrappers',
          timestamp: '00:00 - 02:15',
          narrationText: 'Every time you build an AI agent today, you write a custom wrapper around OpenAPI, parse schemas by hand, and pray the model adheres to your types. That ends now with MCP.',
          visualCallout: 'Visual animation comparing brittle N-to-N custom wrappers vs 1-to-N universal MCP hub.'
        },
        {
          section: '02. Inside the Protocol Specification',
          timestamp: '02:15 - 06:40',
          narrationText: 'MCP standardizes three key primitives: Tools, Resources, and Prompts. Let us open the spec and inspect the JSON-RPC 2.0 frames over Streamable HTTP.',
          visualCallout: 'Split screen: Architecture diagram on left, active terminal frame capture on right.'
        },
        {
          section: '03. Zero-Cost Implementation Blueprint',
          timestamp: '06:40 - 12:00',
          narrationText: 'You do not need a paid platform. We are running this on standard Node 24 with native SSE, zero external SaaS dependencies.',
          visualCallout: 'Live code review in VS Code highlighting the permission firewall and audit logger.'
        },
        {
          section: '04. Summary & Production Checklist',
          timestamp: '12:00 - 14:00',
          narrationText: 'Grab the full open-source repo in the description below, give it a star on GitHub, and join our Discord.',
          visualCallout: 'Repository URL overlay, GitHub star animation, and final checklist graphic.'
        }
      ],
      callToAction: 'Star algoyoutube-os on GitHub and subscribe for deep-dive architectural engineering.'
    },
    visuals: {
      thumbnailConcepts: [
        {
          conceptName: 'The Death of REST',
          visualElements: 'Split graphic: REST API logo with a crack on left, glowing blue MCP emblem on right, shocked engineer silhouette',
          textOverlay: 'REST IS DEAD? (Use MCP)',
          midjourneyPrompt: 'Futuristic technical blueprint, glowing blue circuit board with MCP emblem, cinematic dark moody studio lighting, 8k resolution, minimalist --ar 16:9',
          fluxPrompt: 'Modern minimalist developer poster, high contrast black and neon cyan, architectural network graph, bold clean typography',
          colorDominance: ['#0f172a', '#38bdf8', '#ef4444']
        }
      ],
      storyboardScenes: [
        {
          sceneNumber: 1,
          timing: '00:00 - 00:15',
          shotType: 'close-up',
          description: 'Presenter direct to camera with animated HUD graphic floating over shoulder.',
          aiPrompt: 'Cinematic studio setup, male software engineer speaking to camera, soft rim lighting, tech background blurred'
        },
        {
          sceneNumber: 2,
          timing: '00:15 - 01:30',
          shotType: 'motion-graphic',
          description: 'Animated flowchart showing agent negotiating with 10 tools simultaneously over MCP.',
          aiPrompt: 'Clean 2D vector animation of neural network nodes connecting to external database and terminal icons'
        }
      ],
      bRollChecklist: ['Terminal compiling code', 'Network waterfall graph in Chrome DevTools', 'GitHub repository star counter']
    },
    reach: {
      seoTitleOptions: [
        'Why Model Context Protocol (MCP) Replaces REST for AI Agents',
        'Model Context Protocol Explained: The Future of AI Tool Calling',
        'Build Your First MCP Server in 10 Minutes (Full Open-Source Guide)'
      ],
      optimizedDescription: 'Discover why the Model Context Protocol (MCP) is revolutionizing autonomous AI engineering. In this deep dive, we break down MCP architecture, JSON-RPC 2.0 streaming, and show you how to build a production MCP Server completely free without paid SaaS.',
      chapterTimestamps: [
        { time: '00:00', title: 'The Problem with Custom AI Tool Wrappers' },
        { time: '02:15', title: 'What is Model Context Protocol (MCP)?' },
        { time: '06:40', title: 'Building a Production MCP Server' },
        { time: '12:00', title: 'Architecture Review & Free Source Code' }
      ],
      tags: ['model context protocol', 'mcp', 'ai agents', 'software engineering', 'anthropic mcp', 'gemini mcp', 'open source ai'],
      hashtags: ['#AIEngineering', '#ModelContextProtocol', '#OpenSource', '#SoftwareArchitecture'],
      shortsPlan: [
        {
          clipTitle: 'The Biggest Shift in AI Since Transformers (MCP Explained)',
          sourceTimestamp: '01:05 - 01:55',
          hookNarrative: 'Why you should never hardcode an API endpoint for an AI agent again.'
        }
      ],
      distributionChecklist: [
        'Upload 4K 60fps render with embedded chapter markers',
        'Set primary thumbnail with 1200x675 high-DPI asset',
        'Pin comment with GitHub repository link',
        'Post teaser to X and LinkedIn with visual architecture diagram'
      ]
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const INITIAL_PLATFORMS_REGISTRY = [
  {
    id: 'plat_youtube',
    name: 'YouTube',
    category: 'Creator Platform',
    officialUrl: 'https://youtube.com',
    documentationUrl: 'https://developers.google.com/youtube/v3',
    apiAvailability: true,
    mcpAvailability: true,
    authType: 'OAuth 2.0 (PKCE)',
    freeTierStatus: '10,000 quota units / day free',
    rateLimits: '10,000 units/day',
    license: 'Proprietary API with Free Developer Tier',
    securityStatus: 'VERIFIED_SAFE',
    supportedOperations: ['read_channel_stats', 'read_video_metadata', 'upload_video_draft', 'sync_comments']
  },
  {
    id: 'plat_github',
    name: 'GitHub',
    category: 'Developer Platform',
    officialUrl: 'https://github.com',
    documentationUrl: 'https://docs.github.com/en/rest',
    apiAvailability: true,
    mcpAvailability: true,
    authType: 'Personal Access Token / GitHub App',
    freeTierStatus: '5,000 requests / hour free',
    rateLimits: '5,000 req/hr',
    license: 'Open-Source friendly REST & GraphQL',
    securityStatus: 'VERIFIED_SAFE',
    supportedOperations: ['read_commits', 'create_pr', 'sync_issues', 'inspect_repo']
  },
  {
    id: 'plat_gemini',
    name: 'Google Gemini AI',
    category: 'AI Platform',
    officialUrl: 'https://ai.google.dev',
    documentationUrl: 'https://ai.google.dev/gemini-api/docs',
    apiAvailability: true,
    mcpAvailability: true,
    authType: 'API Key (Free Tier)',
    freeTierStatus: '15 RPM / 1M TPM / 1500 RPD free',
    rateLimits: '15 RPM (free tier)',
    license: 'Free API Tier with Commercial Rights',
    securityStatus: 'VERIFIED_SAFE',
    supportedOperations: ['text_generation', 'function_calling', 'multimodal_analysis']
  },
  {
    id: 'plat_ollama',
    name: 'Ollama (Local LLM Runtime)',
    category: 'Local AI Runtime',
    officialUrl: 'https://ollama.com',
    documentationUrl: 'https://github.com/ollama/ollama/blob/main/docs/api.md',
    apiAvailability: true,
    mcpAvailability: true,
    authType: 'None (Localhost Loopback)',
    freeTierStatus: '100% Free & Unlimited Self-Hosted',
    rateLimits: 'Hardware-bound',
    license: 'MIT Permissive',
    securityStatus: 'VERIFIED_SAFE',
    supportedOperations: ['local_inference', 'embeddings', 'function_calling']
  }
];
