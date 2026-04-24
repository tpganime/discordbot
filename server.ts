import express from 'express';
import path from 'path';
import cors from 'cors';
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());
const PORT = Number(process.env.PORT) || 3000;

// --- STATS STORAGE ---
const StatsSchema = new mongoose.Schema({
  servers: { type: Number, default: 11 },
  users: { type: Number, default: 40 },
}, { timestamps: true });

const StatsModel = mongoose.models.Stats || mongoose.model('Stats', StatsSchema);

let botStats = {
  servers: 11,
  users: 40
};

// Function to load initial stats from DB
const loadStats = async () => {
  if (process.env.MONGODB_URI) {
    try {
      const stats = await StatsModel.findOne();
      if (stats) {
        botStats.servers = stats.servers;
        botStats.users = stats.users;
        console.log('✅ Stats loaded from MongoDB');
      } else {
        await StatsModel.create(botStats);
        console.log('✅ Initial stats created in MongoDB');
      }
    } catch (err) {
      console.error('❌ Error loading stats from MongoDB:', err);
    }
  }
};

// --- API ENDPOINTS ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'live', timestamp: new Date().toISOString() });
});

app.get('/api/stats', (req, res) => {
  console.log('GET /api/stats requested');
  res.json(botStats);
});

app.post('/api/stats', async (req, res) => {
  console.log('POST /api/stats received');
  const apiKey = req.headers['x-api-key'];
  const secretKey = process.env.FUSION_API_KEY;

  if (!secretKey) {
    console.error('❌ FUSION_API_KEY is missing in environment variables');
    return res.status(500).json({ error: 'FUSION_API_KEY not configured on server' });
  }

  if (apiKey !== secretKey) {
    console.warn(`⚠️ Unauthorized access attempt with key: ${apiKey}`);
    return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
  }

  const { servers, users } = req.body;
  console.log(`📊 Updating stats: Servers=${servers}, Users=${users}`);

  if (typeof servers === 'number') botStats.servers = servers;
  if (typeof users === 'number') botStats.users = users;

  // Persist to MongoDB if possible
  if (process.env.MONGODB_URI) {
    try {
      await StatsModel.findOneAndUpdate({}, botStats, { upsert: true });
    } catch (err) {
      console.error('❌ Error persisting stats to MongoDB:', err);
    }
  }

  res.json({ message: 'Stats updated successfully', stats: botStats });
});

// --- MONGODB SETUP ---
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('✅ Connected to MongoDB');
      loadStats();
    })
    .catch(err => console.error('❌ MongoDB Connection Error:', err));
}

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
