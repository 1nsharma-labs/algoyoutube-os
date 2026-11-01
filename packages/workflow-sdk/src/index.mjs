/**
 * @algoyoutube/workflow-sdk
 * The canonical 26-Step Idea-to-Content-Kit Production Workflow State Machine.
 */

export const WORKFLOW_STEPS = [
  { step: 1, id: 'research_report', name: 'Research Report', engine: 'idea-intelligence' },
  { step: 2, id: 'verified_references', name: 'Verified References', engine: 'discovery' },
  { step: 3, id: 'topic_opportunity_analysis', name: 'Topic Opportunity Analysis', engine: 'idea-intelligence' },
  { step: 4, id: 'audience_fit_analysis', name: 'Audience-Fit Analysis', engine: 'dna' },
  { step: 5, id: 'title_variations', name: 'Title Variations', engine: 'reach' },
  { step: 6, id: 'seo_description', name: 'SEO Description', engine: 'reach' },
  { step: 7, id: 'keywords', name: 'Keywords & Tags', engine: 'reach' },
  { step: 8, id: 'story_map', name: 'Story Map (3-Act Arc)', engine: 'scriptforge' },
  { step: 9, id: 'full_script', name: 'Full Script', engine: 'scriptforge' },
  { step: 10, id: 'timestamped_narration', name: 'Timestamped Narration', engine: 'scriptforge' },
  { step: 11, id: 'storyboard', name: 'Storyboard Scenes', engine: 'visual-lab' },
  { step: 12, id: 'thumbnail_concepts', name: 'Thumbnail Concepts', engine: 'visual-lab' },
  { step: 13, id: 'image_generation_prompts', name: 'Image-Generation Prompts', engine: 'visual-lab' },
  { step: 14, id: 'b_roll_prompts', name: 'B-Roll Prompts & Lists', engine: 'visual-lab' },
  { step: 15, id: 'voiceover_direction', name: 'Voiceover Direction & Tone', engine: 'scriptforge' },
  { step: 16, id: 'subtitle_instructions', name: 'Subtitle & Caption Instructions', engine: 'toolchain' },
  { step: 17, id: 'editing_timeline', name: 'Editing Timeline & Pacing', engine: 'toolchain' },
  { step: 18, id: 'motion_graphics', name: 'Motion Graphics Callouts', engine: 'visual-lab' },
  { step: 19, id: 'sound_design', name: 'Sound Design & SFX Cues', engine: 'toolchain' },
  { step: 20, id: 'branding_application', name: 'Brand Identity Application', engine: 'dna' },
  { step: 21, id: 'shorts_extraction', name: 'Shorts Extraction Plan', engine: 'reach' },
  { step: 22, id: 'social_distribution_assets', name: 'Social Distribution Assets', engine: 'reach' },
  { step: 23, id: 'community_posts', name: 'Community Tab Posts', engine: 'reach' },
  { step: 24, id: 'resource_links', name: 'Resource Links & Citations', engine: 'discovery' },
  { step: 25, id: 'publishing_checklist', name: 'Publishing Checklist', engine: 'reach' },
  { step: 26, id: 'performance_tracking_plan', name: 'Performance Tracking Plan', engine: 'dna' }
];

export class ContentWorkflowRunner {
  constructor(initialIdea, options = {}) {
    this.idea = initialIdea;
    this.creatorId = options.creatorId || 'creator_1nsharma';
    this.tenantId = options.tenantId || 'tenant_1nsharma';
    this.artifacts = new Map();
    this.currentStep = 0;
    this.status = 'INITIALIZED';
  }

  async executeStep(stepNumber) {
    const stepDef = WORKFLOW_STEPS.find(s => s.step === stepNumber);
    if (!stepDef) throw new Error(`Invalid step number: ${stepNumber}`);

    // Generate step artifact
    const artifact = this.generateStepArtifact(stepDef);
    this.artifacts.set(stepDef.id, artifact);
    this.currentStep = stepNumber;
    return artifact;
  }

  generateStepArtifact(stepDef) {
    const title = this.idea.title || 'Untitled Project';
    switch (stepDef.id) {
      case 'research_report':
        return {
          step: 1,
          name: 'Research Report',
          content: `In-depth technical breakdown of "${title}". Evaluated recent community sentiment, technical papers, and developer discussions.`
        };
      case 'verified_references':
        return {
          step: 2,
          name: 'Verified References',
          citations: [
            { source: 'Official Protocol Spec 2024-11-05', url: 'https://modelcontextprotocol.io' },
            { source: 'Open-Source AI Agent Architecture Benchmarks', url: 'https://arxiv.org' }
          ]
        };
      case 'topic_opportunity_analysis':
        return {
          step: 3,
          name: 'Topic Opportunity Analysis',
          opportunityScore: 95,
          searchDemand: 'High (84k/month)',
          competition: 'Low to Medium',
          recommendation: 'Target technical practitioners with practical code blueprints.'
        };
      case 'audience_fit_analysis':
        return {
          step: 4,
          name: 'Audience-Fit Analysis',
          matchPercentage: 98,
          alignmentReason: 'Directly aligns with core audience pain points: escaping proprietary vendor lock-in.'
        };
      case 'title_variations':
        return {
          step: 5,
          name: 'Title Variations',
          options: [
            `Why ${title} is Changing Everything`,
            `The Open-Source Guide to ${title}`,
            `Stop Ignoring ${title} in 2026`
          ]
        };
      case 'seo_description':
        return {
          step: 6,
          name: 'SEO Description',
          text: `A comprehensive masterclass on ${title}. Learn the architecture, free open-source tools, and production deployment strategies.`
        };
      case 'keywords':
        return {
          step: 7,
          name: 'Keywords & Tags',
          tags: ['ai architecture', 'open source', 'automation', 'software engineering', 'mcp']
        };
      case 'story_map':
        return {
          step: 8,
          name: 'Story Map',
          act1: 'Hook: The status quo is broken.',
          act2: 'Value: Step-by-step technical implementation.',
          act3: 'Payoff: Production verification and source code release.'
        };
      case 'full_script':
        return {
          step: 9,
          name: 'Full Script',
          wordCount: 1850,
          sections: [
            { heading: 'Hook', duration: '0:00-0:45', text: `Welcome to the breakdown of ${title}. Today, we build it live.` },
            { heading: 'Core Blueprint', duration: '0:45-8:00', text: 'Inspecting the architectural fundamentals.' },
            { heading: 'Demonstration', duration: '8:00-12:30', text: 'Running the live sandbox execution and verifying tests.' },
            { heading: 'Outro', duration: '12:30-14:00', text: 'Grab the free repository on GitHub and star it.' }
          ]
        };
      case 'timestamped_narration':
        return {
          step: 10,
          name: 'Timestamped Narration',
          cues: [
            { timestamp: '00:00', cue: 'Camera 1, high energy start' },
            { timestamp: '02:15', cue: 'Switch to screen recording of terminal' },
            { timestamp: '08:45', cue: 'Picture-in-picture with architecture schematic' }
          ]
        };
      case 'storyboard':
        return {
          step: 11,
          name: 'Storyboard Scenes',
          scenesCount: 8,
          preview: 'Scene 1: Dark studio backdrop with glowing schematic. Scene 2: Code IDE.'
        };
      case 'thumbnail_concepts':
        return {
          step: 12,
          name: 'Thumbnail Concepts',
          concepts: [
            { variant: 'A (High-CTR Contrarian)', text: 'DON\'T USE REST', visual: 'Cracked logo, neon code' },
            { variant: 'B (Authoritative Blueprint)', text: 'THE FULL ARCHITECTURE', visual: 'Technical circuit diagram' }
          ]
        };
      case 'image_generation_prompts':
        return {
          step: 13,
          name: 'Image-Generation Prompts',
          prompts: [
            { tool: 'Midjourney v6', prompt: `Ultra-detailed technical system blueprint, cinematic lighting, dark slate --ar 16:9` },
            { tool: 'FLUX.1 Schnell', prompt: `Cyberpunk minimal software development terminal, clean typography` }
          ]
        };
      case 'b_roll_prompts':
        return {
          step: 14,
          name: 'B-Roll Prompts',
          clips: ['Close-up fingers typing mechanical keyboard', 'Server rack lights blinking', 'Terminal scrolling logs']
        };
      case 'voiceover_direction':
        return {
          step: 15,
          name: 'Voiceover Direction',
          pace: '150 WPM',
          tone: 'Confidant, energetic, authoritative engineering cadence'
        };
      case 'subtitle_instructions':
        return {
          step: 16,
          name: 'Subtitle Instructions',
          format: 'WebVTT / SRT',
          style: 'Karaoke yellow highlights for key technical keywords'
        };
      case 'editing_timeline':
        return {
          step: 17,
          name: 'Editing Timeline',
          cutFrequencySec: 4.5,
          zoomPunches: 'Every major concept transition'
        };
      case 'motion_graphics':
        return {
          step: 18,
          name: 'Motion Graphics Callouts',
          assets: ['Lower-third GitHub badge', 'Animated arrow pointing to JSON-RPC packet', 'Metric counter']
        };
      case 'sound_design':
        return {
          step: 19,
          name: 'Sound Design',
          sfx: ['Subtle tech whoosh on slide changes', 'Deep boom on problem statement', 'Mechanical click on code reveal']
        };
      case 'branding_application':
        return {
          step: 20,
          name: 'Branding Application',
          brandVoiceApplied: true,
          watermarkPlacement: 'Top right 40% opacity'
        };
      case 'shorts_extraction':
        return {
          step: 21,
          name: 'Shorts Extraction Plan',
          shortsCount: 3,
          clips: [
            { title: 'The Death of Traditional APIs in 60s', timestamp: '01:10-02:10' },
            { title: 'How Local AI Agents Talk Over MCP', timestamp: '05:30-06:28' }
          ]
        };
      case 'social_distribution_assets':
        return {
          step: 22,
          name: 'Social Distribution Assets',
          twitterThread: '1/7 Traditional REST APIs are failing AI agents. Here is why the Model Context Protocol changes everything 🧵👇',
          linkedinPost: 'Excited to publish our deep architectural analysis on open-source AI operating systems...'
        };
      case 'community_posts':
        return {
          step: 23,
          name: 'Community Posts',
          postText: 'New video dropping tomorrow at 9 AM EST! Which open-source agent framework are you using right now? Drop your setup below.'
        };
      case 'resource_links':
        return {
          step: 24,
          name: 'Resource Links',
          links: [
            { text: 'AlgoYouTube OS GitHub', url: 'https://github.com/1nsharma-labs/algoyoutube-os' },
            { text: 'Architecture Decision Records', url: 'https://algoyoutube.com/docs/architecture' }
          ]
        };
      case 'publishing_checklist':
        return {
          step: 25,
          name: 'Publishing Checklist',
          checks: [
            { item: 'Metadata verified and tags applied', done: true },
            { item: 'Custom thumbnail A/B test uploaded', done: true },
            { item: 'Subtitles synced and uploaded', done: true },
            { item: 'Cards and end screens configured', done: true }
          ]
        };
      case 'performance_tracking_plan':
        return {
          step: 26,
          name: 'Performance Tracking Plan',
          metricsToWatch: ['CTR at 2h', 'Average percentage viewed (target > 50%)', 'GitHub repository referral traffic']
        };
      default:
        return { step: stepDef.step, name: stepDef.name, status: 'GENERATED' };
    }
  }

  async runAllSteps() {
    this.status = 'RUNNING';
    for (let i = 1; i <= 26; i++) {
      await this.executeStep(i);
    }
    this.status = 'COMPLETED';
    return Object.fromEntries(this.artifacts.entries());
  }
}
