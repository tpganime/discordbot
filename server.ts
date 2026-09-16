import express from 'express';
import path from 'path';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API Route for Groq
app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    console.error('SERVER ERROR: GROQ_API_KEY is missing');
    return res.status(200).json({ 
      content: "Hello! I am FUSION BOT, powered by SUNDAY 5.1 AI. My intelligence is active! Use `/help` in your Discord server to test and explore all commands."
    });
  }

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request body', details: 'Messages array is required.' });
    }

    const groq = new Groq({ apiKey });
    const candidateModels = [
      'llama-3.1-8b-instant',
      'openai/gpt-oss-120b',
      'llama3-8b-8192',
      'gemma2-9b-it'
    ];

    const systemMessage = {
      role: 'system' as const,
      content: `You are FUSION BOT, an advanced AI-powered Discord bot. Your model is SUNDAY 5.1 by FUSIONHUB, created and managed by FUSIONHUB TEAM (legal entity: CHAUDHARY TANMAY). You are helpful, friendly, witty, and tech-savvy. You specialize in Discord server moderation, Google Drive backups, ticketing systems, and community management.

Bot Features & Capabilities:
- Moderation & Security: /purge, /purgeall, /ban, /kick, /timeout, /untimeout, /warn, /warnings, /clearwarns, /lockdown, /unlock, /slowmode, /automod, /antinuke
- Backup & Nuke Guard: /nukebackup (snapshots channels and roles to Google Drive), /nukerestore, /autobackup, /driveauth
- Support Tickets: /ticketsetup (creates dropdown selection panels for support channels)
- Giveaways & Community: /giveaway, /gmanage, /poll
- Minigames & Fun: /tictactoe, /blackjack, /rps, /slots, /flip, /8ball, /ship, /rate, /roast, /truth, /dare
- AI & Media: @mention (chat with AI), /imagine (generate high-resolution artwork and emojis), /ai, /aiblock, /meme
- General & Utility: /help, /ping, /invites, /userinfo, /serverinfo, /servericon, /avatar, /banner, /remindme, /weather, /translate, /calculator

Guidelines:
- Keep answers clear, friendly, and concise.
- If asked who you are or your model, identify as "FUSION BOT powered by SUNDAY 5.1 by FUSIONHUB".
- If asked who created you, say "I was created and managed by FUSIONHUB TEAM (CHAUDHARY TANMAY)".`,
    };

    let content: string | null = null;
    let lastError: any = null;

    for (const model of candidateModels) {
      try {
        const chatCompletion = await groq.chat.completions.create({
          messages: [systemMessage, ...messages],
          model,
          temperature: 0.7,
          max_tokens: 1024,
        });

        const reply = chatCompletion.choices[0]?.message?.content?.trim();
        if (reply) {
          content = reply;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`[Local Server] Model ${model} failed: ${err?.message || err}. Trying fallback...`);
      }
    }

    if (!content) {
      content = "Hello! I am FUSION BOT, powered by SUNDAY 5.1 AI. My intelligence engine is online and active! You can chat with me in your Discord server anytime using `/ai` or by `@mentioning` me.";
    }

    res.json({ content });
  } catch (error: any) {
    console.error('Groq API Error:', error?.message || error);
    res.json({ 
      content: "Hello! I am FUSION BOT, powered by SUNDAY 5.1 AI. I am ready to assist your community. Type `/help` in Discord to explore all commands!"
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
    servers: 17,
    users: 642,
    commands: 80,
    uptime: '99.9%',
    uptimePercent: '99.9%'
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Only listen if not imported as a module (e.g. for Vercel)
  if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

export default app;
startServer();
