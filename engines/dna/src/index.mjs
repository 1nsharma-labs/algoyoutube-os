/**
 * @algoyoutube/engine-dna
 * YouTube DNA Engine — Continuous multi-layer creator and audience modeling.
 */

import { db } from '@algoyoutube/database';

export class YouTubeDNAEngine {
  constructor(creatorId = 'creator_1nsharma') {
    this.creatorId = creatorId;
  }

  getDNA() {
    return db.getChannelDNA(this.creatorId);
  }

  /**
   * Evolve DNA with gradual weighted update (prevents identity thrashing)
   */
  updateDNAWithNewVideoPerformance(videoMetrics) {
    const current = this.getDNA();
    if (!current) return null;

    const currentViews = current.historicalMetrics.avgViews;
    const currentEngage = current.historicalMetrics.avgEngagementRate;
    const totalVideos = current.historicalMetrics.videoCount + 1;

    // Moving average
    const updatedViews = Math.round((currentViews * (totalVideos - 1) + videoMetrics.views) / totalVideos);
    const updatedEngage = Number(((currentEngage * (totalVideos - 1) + videoMetrics.engagementRate) / totalVideos).toFixed(1));

    const updatedDNA = {
      ...current,
      historicalMetrics: {
        ...current.historicalMetrics,
        videoCount: totalVideos,
        avgViews: updatedViews,
        avgEngagementRate: updatedEngage
      },
      lastUpdated: new Date().toISOString()
    };

    db.saveChannelDNA(this.creatorId, updatedDNA);
    return updatedDNA;
  }

  generateDiagnosticReport() {
    const dna = this.getDNA();
    if (!dna) return { error: 'DNA not found' };

    return {
      channelTitle: dna.channelTitle,
      niche: dna.niche,
      healthScore: Math.round(dna.confidenceScore * 100),
      topClusters: dna.opportunityClusters,
      recommendedRoadmap: [
        'Produce 2 deep-dive architectural videos targeting high-opportunity clusters.',
        'Experiment with contrasting thumbnail variants to boost 2h CTR beyond 8.5%.',
        'Incorporate audience pain points directly into video hook in the first 15 seconds.'
      ]
    };
  }
}

export const dnaEngine = new YouTubeDNAEngine();
