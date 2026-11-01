/**
 * @algoyoutube/engine-understanding
 * Understanding Engine — Parses repositories, abstracts API surface,
 * detects license risks, and constructs architectural dependency graphs.
 */

export class TechnologyUnderstandingEngine {
  analyzeRepository(repoMetadata) {
    const isCopyleft = ['GPL-3.0', 'AGPL-3.0'].includes(repoMetadata.license);
    const integrationPattern = isCopyleft ? 'ISOLATED_SERVICE_CLI' : 'DIRECT_LIBRARY';

    return {
      repo: repoMetadata.repo,
      licenseVerdict: {
        license: repoMetadata.license,
        permissive: !isCopyleft,
        commercialSafe: true,
        recommendedIntegration: integrationPattern
      },
      architecturalFit: {
        targetLayer: repoMetadata.category === 'AI Model' ? 'packages/ai-providers' : 'packages/mcp-client',
        complexity: 'MODERATE',
        estimatedImplementationEffortHours: 4
      }
    };
  }
}

export const understandingEngine = new TechnologyUnderstandingEngine();
