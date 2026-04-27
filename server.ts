import express from 'express';
import path from 'path';
import cors from 'cors';
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());
const PORT = Number(process.env.PORT) || 3000;

// --- API ENDPOINTS ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'live', timestamp: new Date().toISOString() });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// --- DISCORD BOT SETUP ---
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// @ts-ignore
client.commands = new Collection();

// --- OAUTH CALLBACK HANDLER ---
app.get('/auth/callback', (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).send('No code provided');
  }

  // In a real app, you would exchange this code for an access token
  // using your CLIENT_SECRET.
  
  res.send(`
    <html>
      <head>
        <title>Authentication Successful</title>
        <style>
          body { font-family: sans-serif; background: #000; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .card { background: #111; padding: 2rem; border-radius: 1rem; border: 1px solid #333; text-align: center; }
          h1 { color: #f97316; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>✅ Fusion Authorized</h1>
          <p>The bot has been successfully added to your server.</p>
          <script>
            setTimeout(() => {
              if (window.opener) {
                window.opener.postMessage({ type: 'DISCORD_AUTH_SUCCESS' }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            }, 3000);
          </script>
        </div>
      </body>
    </html>
  `);
});

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user?.tag}!`);
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (message.content === '!ping') {
    message.reply('Pong! 🏓');
  }
});

if (process.env.DISCORD_TOKEN) {
  client.login(process.env.DISCORD_TOKEN).catch(err => {
    console.error('❌ Discord Login Error:', err.message);
  });
} else {
  console.warn('⚠️ DISCORD_TOKEN not found in environment variables.');
}

// --- VITE MIDDLEWARE / STATIC SERVING ---
async function startServer() {
  console.log(`Starting server in ${process.env.NODE_ENV || 'development'} mode`);
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer();
