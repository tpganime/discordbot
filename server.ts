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
