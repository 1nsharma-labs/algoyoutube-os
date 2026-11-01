/**
 * @algoyoutube/engine-technology-selection
 * Technology Selection Engine — Decision Matrix comparing options across cost,
 * maintainability, latency, offline capability, and open-source licensing.
 */

export class TechnologySelectionEngine {
  evaluateCandidate(candidate) {
    const scores = {
      licensePermissiveness: candidate.license.includes('MIT') || candidate.license.includes('Apache') ? 100 : 70,
      zeroCostViability: candidate.costTier.toUpperCase().includes('FREE') ? 100 : 30,
      localFirstExecution: candidate.canRunOffline ? 100 : 60,
      communityAdoption: candidate.stars > 5000 ? 95 : 75
    };

    const weightedScore = Math.round(
      scores.licensePermissiveness * 0.35 +
      scores.zeroCostViability * 0.35 +
      scores.localFirstExecution * 0.20 +
      scores.communityAdoption * 0.10
    );

    return {
      candidateName: candidate.name,
      overallScore: weightedScore,
      verdict: weightedScore >= 80 ? 'APPROVED_FOR_INTEGRATION' : 'REJECTED',
      reasons: [
        `Zero-cost compliance evaluated at ${scores.zeroCostViability}/100`,
        `License permissiveness evaluated at ${scores.licensePermissiveness}/100`
      ]
    };
  }
}

export const techSelectionEngine = new TechnologySelectionEngine();
