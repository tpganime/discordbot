import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const app = express();
const PORT = 3000;

app.use(express.json());

// API Route for Groq
app.post('/api/chat', async (req, res) => {
  try {
    if (!GROQ_API_KEY) {
      return res.status(500).json({ error: 'Groq API Key not configured' });
    }

    const { messages } = req.body;
    const groq = new Groq({ apiKey: GROQ_API_KEY });

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are FUSION BOT, an advanced AI-powered Discord bot. You are helpful, professional, and tech-savvy. You specialize in moderation, server management, and community features.

Official Commands:
- Music: /play (song/playlist), /skip, /queue, /volume (0-100)
- Moderation: /ban, /kick, /mute, /purge
- General: /help, /ping, /info, /stats

How to Setup:
1. Invite the bot using the "Add to Discord" button on the homepage.
2. Grant necessary permissions (Administrator recommended for full features, or at least Manage Messages, Ban/Kick Members).
3. Use /setup music to create a dedicated music channel.
4. Use /setup secure to activate Nuke Guard protection.`,
        },
        ...messages,
      ],
      model: 'llama-3.3-70b-versatile',
    });

    res.json({ content: chatCompletion.choices[0]?.message?.content || 'I am sorry, I could not process your request.' });
  } catch (error) {
    console.error('Groq API Error:', error);
    res.status(500).json({ error: 'Failed to fetch response from AI' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
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

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export { app };
startServer();
