/**
 * @algoyoutube/schemas
 * Lightweight, zero-dependency schema validation & canonical schemas
 */

export class ValidationError extends Error {
  constructor(message, errors = []) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

export function validateRequired(obj, fields, context = 'root') {
  const missing = [];
  if (!obj || typeof obj !== 'object') {
    throw new ValidationError(`Expected object for ${context}, received ${typeof obj}`);
  }
  for (const field of fields) {
    if (obj[field] === undefined || obj[field] === null || obj[field] === '') {
      missing.push(field);
    }
  }
  if (missing.length > 0) {
    throw new ValidationError(`Missing required fields in ${context}: ${missing.join(', ')}`, missing);
  }
  return true;
}

export const CreatorProfileSchema = {
  validate(data) {
    validateRequired(data, ['id', 'name', 'handle', 'targetNiche'], 'CreatorProfile');
    return data;
  }
};

export const ChannelDNASchema = {
  validate(data) {
    validateRequired(data, ['channelId', 'channelTitle', 'niche'], 'ChannelDNA');
    return data;
  }
};

export const ContentIdeaSchema = {
  validate(data) {
    validateRequired(data, ['id', 'title', 'opportunityScore'], 'ContentIdea');
    if (typeof data.opportunityScore !== 'number' || data.opportunityScore < 0 || data.opportunityScore > 100) {
      throw new ValidationError('opportunityScore must be a number between 0 and 100');
    }
    return data;
  }
};

export const ScriptForgeSchema = {
  validate(data) {
    validateRequired(data, ['title', 'threeActStructure', 'fullScriptSections'], 'ScriptForge');
    return data;
  }
};

export const VisualLabSchema = {
  validate(data) {
    validateRequired(data, ['thumbnailConcepts', 'storyboardScenes'], 'VisualLab');
    return data;
  }
};

export const ReachAmplifierSchema = {
  validate(data) {
    validateRequired(data, ['seoTitleOptions', 'optimizedDescription', 'tags'], 'ReachAmplifier');
    return data;
  }
};

export const MCPToolCallSchema = {
  validate(data) {
    validateRequired(data, ['name', 'arguments'], 'MCPToolCall');
    return data;
  }
};
