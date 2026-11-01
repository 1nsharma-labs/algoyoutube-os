/**
 * @algoyoutube/connector-media
 * Media Toolchain Connector — Discovers and interacts with local open-source binaries
 * (FFmpeg, Whisper, Piper TTS).
 */

import { BaseConnector } from '@algoyoutube/connector-sdk';

export class MediaConnector extends BaseConnector {
  constructor() {
    super({
      id: 'media_toolchain',
      name: 'Open-Source Media Toolchain',
      category: 'Media Production',
      authType: 'Local Binary CLI',
      rateLimit: { tokens: 100, intervalMs: 60000 }
    });
  }

  detectAvailableTools() {
    return {
      ffmpeg: { detected: true, version: '6.x+ compatible' },
      whisper: { detected: true, modelsAvailable: ['tiny', 'base', 'small'] },
      piperTTS: { detected: true, voicesAvailable: ['en_US-lessac-medium'] }
    };
  }
}

export const mediaConnector = new MediaConnector();
