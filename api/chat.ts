import Groq from 'groq-sdk';

export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error('GROQ_API_KEY is not set in environment variables');
    return res.status(500).json({
      error: 'AI configuration error',
      details: 'GROQ_API_KEY is missing in Vercel environment variables. Please check your project settings.'
    });
  }

  try {
    const { messages } = req.body || {};
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required.' });
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

    return res.status(200).json({ content });
  } catch (error: any) {
    console.error('Groq API Error on Vercel:', error?.message || error);
    return res.status(500).json({
      error: 'AI service error',
      details: error?.message || 'Unknown error'
    });
  }
}
