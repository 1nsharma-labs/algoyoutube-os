/**
 * @algoyoutube/engine-knowledge
 * Knowledge Engine — Multi-tier memory subsystem preserving:
 * Global Knowledge, System Engineering Memory, Creator Memory, and Community Memory.
 */

export class SystemKnowledgeEngine {
  constructor() {
    this.globalKnowledge = [];
    this.engineeringMemory = [];
    this.creatorMemory = [];
  }

  recordEngineeringDecision(decision) {
    const entry = {
      id: `decision_${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...decision
    };
    this.engineeringMemory.push(entry);
    return entry;
  }

  queryKnowledge(query) {
    const q = query.toLowerCase();
    const hits = this.engineeringMemory.filter(m =>
      (m.title && m.title.toLowerCase().includes(q)) ||
      (m.summary && m.summary.toLowerCase().includes(q))
    );
    return hits;
  }
}

export const knowledgeEngine = new SystemKnowledgeEngine();
