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
    
    // Check for specific Groq errors
    const errorMessage = error?.message || 'Unknown error';
    const status = error?.status || 500;
    
    res.status(status).json({ 
      error: 'AI service error',
      details: errorMessage
    });
  }
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
