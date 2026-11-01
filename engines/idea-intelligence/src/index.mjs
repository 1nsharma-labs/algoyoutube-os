/**
 * @algoyoutube/engine-idea-intelligence
 * Idea Intelligence Engine — Scientific opportunity scoring and ideation ranking.
 */

export class IdeaIntelligenceEngine {
  /**
   * Transparent Opportunity Scoring Algorithm (Weights sum to 1.0)
   * W1: Search Demand (0.25)
   * W2: Trend Momentum (0.25)
   * W3: Audience Pain Point Alignment (0.20)
   * W4: Creator DNA Fit (0.20)
   * W5: Production Feasibility (0.10)
   */
  calculateOpportunityScore(breakdown) {
    const {
      searchDemandScore = 70,
      trendMomentumScore = 70,
      audiencePainScore = 70,
      creatorFitScore = 80,
      productionFeasibilityScore = 75
    } = breakdown;

    const rawScore =
      searchDemandScore * 0.25 +
      trendMomentumScore * 0.25 +
      audiencePainScore * 0.20 +
      creatorFitScore * 0.20 +
      productionFeasibilityScore * 0.10;

    return Math.round(Math.min(100, Math.max(0, rawScore)));
  }

  generateIdeasForNiche(niche, count = 3) {
    const ideas = [];
    const seedTopics = [
      {
        title: `The Complete Architectural Guide to ${niche} in 2026`,
        angle: 'Authoritative, definitive engineering guide with real open-source repository.',
        breakdown: { searchDemandScore: 92, trendMomentumScore: 88, audiencePainScore: 90, creatorFitScore: 95, productionFeasibilityScore: 85 }
      },
      {
        title: `Why 90% of Developers Fail at ${niche}`,
        angle: 'Contrarian analysis revealing hidden pitfalls, common mistakes, and proven fixes.',
        breakdown: { searchDemandScore: 85, trendMomentumScore: 94, audiencePainScore: 96, creatorFitScore: 90, productionFeasibilityScore: 92 }
      },
      {
        title: `Build a Production ${niche} from Scratch (Zero Cost)`,
        angle: 'Actionable hands-on coding tutorial utilizing free and open-source tools.',
        breakdown: { searchDemandScore: 96, trendMomentumScore: 92, audiencePainScore: 88, creatorFitScore: 94, productionFeasibilityScore: 80 }
      }
    ];

    for (let i = 0; i < Math.min(count, seedTopics.length); i++) {
      const item = seedTopics[i];
      const score = this.calculateOpportunityScore(item.breakdown);
      ideas.push({
        id: `idea_${Date.now()}_${i + 1}`,
        title: item.title,
        angle: item.angle,
        targetAudience: 'Software Engineers & Technical Creators',
        opportunityScore: score,
        breakdown: item.breakdown,
        rationale: `Ranked #${i + 1} with composite score of ${score}/100. High demand and strong creator alignment.`,
        estimatedLengthMin: 12 + i * 2
      });
    }

    return ideas.sort((a, b) => b.opportunityScore - a.opportunityScore);
  }
}

export const ideaEngine = new IdeaIntelligenceEngine();
