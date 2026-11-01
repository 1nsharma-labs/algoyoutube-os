/**
 * @algoyoutube/connector-sdk
 * Unified Connector SDK with OAuth 2.1 PKCE support, token bucket rate limiting,
 * safe token encryption, and connection health diagnostics.
 */

import crypto from 'node:crypto';
import { encryptToken, decryptToken } from '@algoyoutube/security';

export class BaseConnector {
  constructor(metadata) {
    this.id = metadata.id;
    this.name = metadata.name;
    this.category = metadata.category;
    this.authType = metadata.authType;
    this.rateLimit = metadata.rateLimit || { tokens: 60, intervalMs: 60000 };
    this.tokens = this.rateLimit.tokens;
    this.lastRefill = Date.now();
  }

  refillTokens() {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    if (elapsed > this.rateLimit.intervalMs) {
      this.tokens = this.rateLimit.tokens;
      this.lastRefill = now;
    }
  }

  acquireToken() {
    this.refillTokens();
    if (this.tokens <= 0) {
      throw new Error(`Rate limit exceeded for connector '${this.name}'`);
    }
    this.tokens--;
    return true;
  }

  async healthCheck() {
    return { status: 'HEALTHY', timestamp: new Date().toISOString() };
  }
}

/**
 * OAuth 2.1 PKCE Helpers
 */
export function generatePKCE() {
  const verifier = crypto.randomBytes(32).toString('base64url');
  const challenge = crypto.createHash('sha256').update(verifier).digest('base64url');
  const state = crypto.randomBytes(16).toString('hex');
  return { verifier, challenge, state };
}

/**
 * Secure Credential Storage helper
 */
export class CredentialVault {
  constructor() {
    this.store = new Map();
  }

  set(serviceId, tokenObject) {
    const serialized = JSON.stringify(tokenObject);
    const encrypted = encryptToken(serialized);
    this.store.set(serviceId, encrypted);
  }

  get(serviceId) {
    const encrypted = this.store.get(serviceId);
    if (!encrypted) return null;
    const decrypted = decryptToken(encrypted);
    return JSON.parse(decrypted);
  }

  has(serviceId) {
    return this.store.has(serviceId);
  }

  delete(serviceId) {
    return this.store.delete(serviceId);
  }
}

export const credentialVault = new CredentialVault();
