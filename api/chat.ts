import Groq from 'groq-sdk';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const chatRateLimitStore = new Map<string, RateLimitRecord>();

function getClientIp(req: any): string {
  const xff = req.headers?.['x-forwarded-for'];
  if (xff) {
    const ips = typeof xff === 'string' ? xff.split(',') : xff;
    if (ips && ips.length > 0) return ips[0].trim();
  }
  return req.headers?.['cf-connecting-ip'] || req.headers?.['x-real-ip'] || req.socket?.remoteAddress || '127.0.0.1';
}

function checkChatRateLimit(req: any, limit = 15, windowMs = 60000) {
  const ip = getClientIp(req);
  const now = Date.now();

  if (chatRateLimitStore.size > 1000) {
    for (const [k, v] of chatRateLimitStore.entries()) {
      if (now > v.resetTime) chatRateLimitStore.delete(k);
    }
  }

  let rec = chatRateLimitStore.get(ip);
  if (!rec || now > rec.resetTime) {
    rec = { count: 1, resetTime: now + windowMs };
    chatRateLimitStore.set(ip, rec);
    return { allowed: true, limit, remaining: limit - 1, resetTime: Math.ceil(rec.resetTime / 1000), retryAfter: 0 };
  }

  rec.count += 1;
  const remaining = Math.max(0, limit - rec.count);
  const allowed = rec.count <= limit;
  const retryAfter = Math.max(1, Math.ceil((rec.resetTime - now) / 1000));
  return { allowed, limit, remaining, resetTime: Math.ceil(rec.resetTime / 1000), retryAfter };
}

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

  // Rate Limiting: 15 messages per minute per IP for AI Chat
  const rl = checkChatRateLimit(req, 15, 60000);
  res.setHeader('X-RateLimit-Limit', rl.limit.toString());
  res.setHeader('X-RateLimit-Remaining', rl.remaining.toString());
  res.setHeader('X-RateLimit-Reset', rl.resetTime.toString());

  if (!rl.allowed) {
    res.setHeader('Retry-After', rl.retryAfter.toString());
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'You are sending AI messages too quickly. Please wait a moment before trying again.',
      retryAfter: rl.retryAfter
    });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error('GROQ_API_KEY is not set in environment variables');
    return res.status(200).json({
      content: "Hello! I am FUSION BOT, powered by SUNDAY 5.1 AI. My intelligence is fully active on Discord! Use `/help` in your Discord server to test and use all 80+ commands."
    });
  }

  try {
    const { messages } = req.body || {};
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required.' });
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
        console.warn(`[AI Chat] Model ${model} failed: ${err?.message || err}. Trying next fallback...`);
      }
    }

    if (!content) {
      console.error('All Groq models failed. Last error:', lastError?.message || lastError);
      content = "Hello! I am FUSION BOT, powered by SUNDAY 5.1 AI. My intelligence engine is online and active! You can chat with me in your Discord server anytime using `/ai` or by `@mentioning` me.";
    }

    return res.status(200).json({ content });
  } catch (error: any) {
    console.error('Groq API Error on Vercel:', error?.message || error);
    return res.status(200).json({
      content: "Hello! I am FUSION BOT, powered by SUNDAY 5.1 AI. I am ready to assist your community with moderation, cloud backups, tickets, and interactive fun. Type `/help` in Discord to explore all 80+ commands!"
    });
  }
}
