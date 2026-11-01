/**
 * @algoyoutube/shared-types
 * Canonical interfaces and enumerations for AlgoYouTube OS
 */

export const EngineType = {
  YOUTUBE_DNA: 'dna',
  IDEA_INTELLIGENCE: 'idea-intelligence',
  SCRIPTFORGE: 'scriptforge',
  VISUAL_LAB: 'visual-lab',
  OUTSOURCE_CONNECT: 'outsource',
  AI_TOOLCHAIN: 'toolchain',
  REACH_AMPLIFIER: 'reach',
  DISCOVERY: 'discovery',
  UNDERSTANDING: 'understanding',
  TECH_SELECTION: 'technology-selection',
  EVOLUTION: 'evolution',
  BENCHMARK: 'benchmark',
  KNOWLEDGE: 'knowledge',
  CONNECTOR_EVOLUTION: 'connector-evolution',
  ORCHESTRATOR: 'engineering-orchestrator'
};

export const ProjectStatus = {
  RESEARCHING: 'researching',
  IDEATION: 'ideation',
  SCRIPTING: 'scripting',
  STORYBOARDING: 'storyboarding',
  PRODUCTION: 'production',
  POST_PRODUCTION: 'post_production',
  READY_TO_PUBLISH: 'ready_to_publish',
  PUBLISHED: 'published'
};

export const ToolPermission = {
  READ_ONLY: 'read',
  CONTROLLED_WRITE: 'controlled_write',
  ADMIN_RISKY: 'admin'
};
