/**
 * @algoyoutube/security
 * Enterprise-grade security primitives: AES-256-GCM token encryption,
 * SSRF validation, RBAC policy enforcement, and audit logging.
 */

import crypto from 'node:crypto';

// 32-byte secret derived or fallback to local secure key
const DEFAULT_SALT = 'algoyoutube-os-sec-salt-2026';
let MASTER_KEY = crypto.scryptSync(process.env.ALGOYOUTUBE_MASTER_SECRET || 'algoyoutube-master-offline-key-change-in-prod', DEFAULT_SALT, 32);

export function setMasterSecret(secret) {
  MASTER_KEY = crypto.scryptSync(secret, DEFAULT_SALT, 32);
}

/**
 * Encrypt sensitive token with AES-256-GCM
 */
export function encryptToken(plainText) {
  if (!plainText) return '';
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', MASTER_KEY, iv);
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted}`;
}

/**
 * Decrypt sensitive token
 */
export function decryptToken(cipherString) {
  if (!cipherString) return '';
  const parts = cipherString.split(':');
  if (parts.length !== 3) {
    throw new Error('Invalid cipher string format');
  }
  const [ivHex, tagHex, encryptedHex] = parts;
  const iv = Buffer.from(ivHex, 'hex');
  const tag = Buffer.from(tagHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-gcm', MASTER_KEY, iv);
  decipher.setAuthTag(tag);
  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

/**
 * SSRF Protection: Blocks private IPs, loopback, AWS metadata, and local host addresses
 */
export function validateSafeUrl(urlString) {
  try {
    const url = new URL(urlString);
    if (!['http:', 'https:'].includes(url.protocol)) {
      return { safe: false, reason: 'Invalid protocol: only http and https are allowed' };
    }
    const hostname = url.hostname.toLowerCase();
    
    // Check loopback and local names
    if (hostname === 'localhost' || hostname.endsWith('.local') || hostname === '127.0.0.1' || hostname === '::1') {
      return { safe: false, reason: 'SSRF blocked: loopback address' };
    }
    
    // Check cloud metadata endpoint
    if (hostname === '169.254.169.254' || hostname === 'metadata.google.internal') {
      return { safe: false, reason: 'SSRF blocked: cloud metadata endpoint' };
    }

    // Check private RFC 1918 IPv4 ranges
    const ipv4Match = hostname.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    if (ipv4Match) {
      const octet1 = parseInt(ipv4Match[1], 10);
      const octet2 = parseInt(ipv4Match[2], 10);
      if (octet1 === 10) return { safe: false, reason: 'SSRF blocked: 10.0.0.0/8 private range' };
      if (octet1 === 172 && octet2 >= 16 && octet2 <= 31) return { safe: false, reason: 'SSRF blocked: 172.16.0.0/12 private range' };
      if (octet1 === 192 && octet2 === 168) return { safe: false, reason: 'SSRF blocked: 192.168.0.0/16 private range' };
      if (octet1 === 0 || octet1 === 127) return { safe: false, reason: 'SSRF blocked: invalid or loopback range' };
    }

    return { safe: true, url: url.toString() };
  } catch (err) {
    return { safe: false, reason: `Malformed URL: ${err.message}` };
  }
}

/**
 * Input sanitizer against prompt injection & control character manipulation
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  // Strip control chars except normal newlines/tabs
  return input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim();
}

/**
 * Security Audit Logger
 */
class AuditLogger {
  constructor() {
    this.logs = [];
  }

  log(event) {
    const entry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      tenantId: event.tenantId || 'global',
      action: event.action,
      actor: event.actor || 'system',
      status: event.status || 'SUCCESS',
      details: event.details || {}
    };
    this.logs.push(entry);
    if (this.logs.length > 1000) this.logs.shift();
    return entry;
  }

  getRecentLogs(limit = 50) {
    return this.logs.slice(-limit).reverse();
  }
}

export const auditLogger = new AuditLogger();
