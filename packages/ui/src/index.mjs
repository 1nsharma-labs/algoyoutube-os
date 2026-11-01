/**
 * @algoyoutube/ui
 * Reusable design tokens and UI helpers
 */

export * from './tokens.mjs';

export function renderBadge(text, type = 'success') {
  return `<span class="badge-status badge-${type}">${text}</span>`;
}
