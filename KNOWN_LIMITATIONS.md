# KNOWN LIMITATIONS & MITIGATIONS

1. **YouTube Data API v3 Quota (10,000 units/day):**
   - *Limitation:* Free Google Cloud projects provide 10,000 quota units per day.
   - *Mitigation:* Aggressive deterministic caching in database layer (`knowledge/creator`), incremental syncs, and RSS-feed fallback for public video updates (0 quota cost).

2. **Local AI Inference Latency on Consumer Hardware:**
   - *Limitation:* Large parameter models (70B+) require significant VRAM or quantized CPU execution.
   - *Mitigation:* Multi-tier fallback architecture: fast free-tier Google Gemini 2.5 Flash for cloud execution, 8B-14B quantized models (Qwen 2.5, Llama 3.3) for local Ollama execution.

3. **External Platform Anti-Scraping Policies:**
   - *Limitation:* Social platforms block unauthenticated web scraping.
   - *Mitigation:* Strictly use authorized OAuth 2.0/2.1 tokens, official public APIs, and community RSS/oEmbed protocols. Never violate Terms of Service.
