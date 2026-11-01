/**
 * @algoyoutube/web
 * Production Web Server for AlgoYouTube OS Creator & Intelligence Dashboard
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, 'public');
const PORT = process.env.WEB_PORT || 3000;
const API_URL = process.env.API_URL || 'http://127.0.0.1:4000';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  // Proxy /api and /mcp to the backend
  if (req.url.startsWith('/api/') || req.url.startsWith('/mcp/')) {
    try {
      const proxyUrl = `${API_URL}${req.url}`;
      const method = req.method;
      const headers = { ...req.headers, host: '127.0.0.1:4000' };

      const chunks = [];
      req.on('data', chunk => chunks.push(chunk));
      req.on('end', async () => {
        const bodyBuffer = Buffer.concat(chunks);
        try {
          const fetchRes = await fetch(proxyUrl, {
            method,
            headers: {
              'Content-Type': req.headers['content-type'] || 'application/json',
              'X-Tenant-Id': req.headers['x-tenant-id'] || 'tenant_1nsharma'
            },
            body: ['POST', 'PUT', 'PATCH'].includes(method) ? bodyBuffer : undefined
          });

          res.writeHead(fetchRes.status, {
            'Content-Type': fetchRes.headers.get('content-type') || 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          const data = await fetchRes.arrayBuffer();
          res.end(Buffer.from(data));
        } catch (err) {
          res.writeHead(502, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Backend API unreachable', message: err.message }));
        }
      });
      return;
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: err.message }));
    }
  }

  // Serve static assets from public/
  let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(PUBLIC_DIR, 'index.html'); // SPA fallback
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`[AlgoYouTube OS Web] Frontend Dashboard running on http://localhost:${PORT}`);
});
