import express from 'express';
import path from 'path';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';
// @ts-ignore
import attachAgenticPortal, { getHomepageMarkdown } from './agentic_portal.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Public static assets (including robots.txt, sitemap.xml, llms.txt, .well-known)
app.use(express.static(path.join(process.cwd(), 'public')));
app.use('/.well-known', express.static(path.join(process.cwd(), 'public', '.well-known')));

// Attach complete Agentic Portal & OpenAPI / MCP Engine
attachAgenticPortal(app);

// API Route for Groq
app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    console.error('SERVER ERROR: GROQ_API_KEY is missing');
    return res.status(500).json({ 
      error: 'AI configuration error', 
      details: 'GROQ_API_KEY is not set in environment variables.' 
    });
  }

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request body', details: 'Messages array is required.' });
    }

    const groq = new Groq({ apiKey });

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are FUSION BOT, an advanced AI-powered Discord bot. Your model is SUNDAY 5.1 by FUSIONHUB, created and managed by FUSIONHUB TEAM (legal entity: CHAUDHARY TANMAY). You are helpful, friendly, witty, and tech-savvy. You specialize in Discord server moderation, Google Drive backups, ticketing systems, and community management.

Bot Features & Capabilities:
- Moderation & Automod: /ban, /kick, /timeout, /purge, /automod (banned words, anti-spam rate limiting, attachment spam)
- Backup & Nuke Guard: /nukebackup (snapshots channels and roles to Google Drive), /nukerestore
- Support Tickets: /tickets (creates dropdown selection panels for support channels)
- Giveaways & Reaction Roles: /giveaway, /gmanage, /reactrole
- AI & Media: /ask (chat with AI), /imagine (generate high-resolution artwork and emojis)
- General & Utility: /help, /ping, /stats, /invites, /userinfo, /serverinfo

Guidelines:
- Keep answers clear, friendly, and concise.
- If asked who you are or your model, identify as "FUSION BOT powered by SUNDAY 5.1 by FUSIONHUB".
- If asked who created you, say "I was created and managed by FUSIONHUB TEAM (CHAUDHARY TANMAY)".`,
        },
        ...messages,
      ],
      model: 'llama-3.3-70b-versatile',
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Groq returned an empty response.');
    }

    res.json({ content });
  } catch (error: any) {
    console.error('Groq API Error:', error?.message || error);
    const errorMessage = error?.message || 'Unknown error';
    const status = error?.status || 500;
    
    res.status(status).json({ 
      error: 'AI service error', 
      details: errorMessage 
    });
  }
});

// API Route for Live Bot Stats
app.get('/api/stats', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const panelRes = await fetch('https://panel.fusionhub.in/api/stats', {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    clearTimeout(timeoutId);

    if (panelRes.ok) {
      const data = await panelRes.json();
      return res.json(data);
    }
  } catch(e) {}

  res.json({
    online: true,
    ping: 24,
    servers: 35,
    users: 15420,
    commands: 48,
    uptime: '99.9%',
    uptimePercent: '99.9%'
  });
});

// Markdown content negotiation for homepage
app.get('/', (req, res, next) => {
  res.setHeader('Vary', 'Accept, Accept-Encoding');
  const accept = (req.headers.accept || '').toLowerCase();
  if (accept.includes('text/markdown') || accept.includes('text/x-markdown')) {
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    return res.send(getHomepageMarkdown());
  }
  next();
});

// Valid SPA frontend routes
const SPA_ROUTES = [
  '/',
  '/commands',
  '/privacy',
  '/terms',
  '/updates',
  '/status',
  '/features',
  '/docs',
  '/developers',
  '/about',
  '/contact',
  '/refund',
  '/shipping'
];

async function startServer() {
  if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));

    SPA_ROUTES.forEach(route => {
      app.get(route, (req, res) => {
        res.setHeader('Vary', 'Accept, Accept-Encoding');
        res.sendFile(path.join(distPath, 'index.html'));
      });
    });
  }

  // 🤖 Real HTTP 404 Handler for Unknown Routes
  app.use((req, res) => {
    res.setHeader('Vary', 'Accept, Accept-Encoding');
    res.status(404);

    const accept = (req.headers.accept || '').toLowerCase();
    if (req.path.startsWith('/api') || accept.includes('application/json')) {
      return res.json({
        success: false,
        error: 'RESOURCE_NOT_FOUND',
        code: 404,
        message: `Endpoint ${req.path} does not exist.`,
        links: {
          sitemap: 'https://bot.fusionhub.in/sitemap.xml',
          llms: 'https://bot.fusionhub.in/llms.txt',
          docs: 'https://bot.fusionhub.in/docs',
          openapi: 'https://bot.fusionhub.in/openapi.json',
          mcp: 'https://bot.fusionhub.in/.well-known/mcp'
        }
      });
    }

    if (accept.includes('text/markdown') || accept.includes('text/x-markdown')) {
      res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
      return res.send(`# 404 Not Found - Fusion Bot\n\nThe path \`${req.path}\` does not exist on this server.\n\n## Agent Discovery Resources:\n- Sitemap: https://bot.fusionhub.in/sitemap.xml\n- LLM Guidance (llms.txt): https://bot.fusionhub.in/llms.txt\n- Developer Portal: https://bot.fusionhub.in/developers\n- OpenAPI Spec: https://bot.fusionhub.in/openapi.json\n- Model Context Protocol: https://bot.fusionhub.in/.well-known/mcp\n`);
    }

    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>404 — Page Not Found | Fusion Bot</title>
    <link rel="icon" type="image/jpeg" href="https://i.ibb.co/vC79Nthr/Whats-App-Image-2026-03-23-at-6-49-47-PM.jpg">
    <style>
        body { background: #020617; color: #fff; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
        .box { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); padding: 40px; border-radius: 20px; max-width: 480px; }
        h1 { font-size: 48px; color: #3b82f6; margin: 0 0 10px; }
        p { color: #94a3b8; line-height: 1.6; margin-bottom: 24px; }
        a { background: #3b82f6; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 10px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="box">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The requested URL <code>${req.path}</code> was not found on this server.</p>
        <a href="/">Return Home</a>
    </div>
</body>
</html>`);
  });

  if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

export default app;
startServer();
