import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { spawn, execSync } from "child_process";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// ==========================================
// 🔐 DISCORD OAUTH2 CREDENTIALS 
// ==========================================
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || '1485375910562758967'; 
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || 'vSOnjPRwqht5eGVSiyQG_yjxlGVdbs9A';

// Use APP_URL if available, otherwise fallback to localhost:3000
const APP_URL = process.env.APP_URL || `http://localhost:${PORT}`;
const DISCORD_REDIRECT_URI = `${APP_URL}/api/auth/discord/callback`;

if (!process.env.APP_URL) {
    console.warn("[Warning] APP_URL environment variable is not set. OAuth redirects may fail in production.");
}
console.log(`[Config] APP_URL: ${APP_URL}`);
console.log(`[Config] DISCORD_REDIRECT_URI: ${DISCORD_REDIRECT_URI}`);

const DB_FOLDER = path.join(__dirname, 'database');
const EMAIL_USER = process.env.EMAIL_USER || 'fusionhub122@gmail.com'; 
const EMAIL_PASS = process.env.EMAIL_PASS || 'bjes fepg nqqf aioq';    

const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: EMAIL_USER, pass: EMAIL_PASS } });

if (!fs.existsSync(DB_FOLDER)) fs.mkdirSync(DB_FOLDER);
const dbFiles = {
    users: path.join(DB_FOLDER, 'users.json'), 
    otps: path.join(DB_FOLDER, 'otps.json'), 
    resets: path.join(DB_FOLDER, 'resets.json'),
    liked: path.join(DB_FOLDER, 'liked.json'), 
    playlists: path.join(DB_FOLDER, 'playlists.json'),
    serverConfig: path.join(DB_FOLDER, 'server_config.json'), 
    webTokens: path.join(DB_FOLDER, 'web_tokens.json')
};

for (const key in dbFiles) { 
    if (!fs.existsSync(dbFiles[key as keyof typeof dbFiles])) {
        fs.writeFileSync(dbFiles[key as keyof typeof dbFiles], '{}'); 
    }
}

function readDB(file: string) { return JSON.parse(fs.readFileSync(file, 'utf8')); }
function writeDB(file: string, data: any) { fs.writeFileSync(file, JSON.stringify(data, null, 2)); }

// ==========================================
// YT-DLP ENGINE (FOR WEB API)
// ==========================================
const memCache: { search: { [key: string]: { data: any, time: number } } } = { search: {} }; 
let globalRecommendsCache: any[] = [];

function findYtDlp() {
    try { const sysPath = execSync('which yt-dlp').toString().trim(); if (sysPath) return sysPath; } catch(e) {}
    const isWin = process.platform === "win32"; 
    const binName = isWin ? 'yt-dlp.exe' : 'yt-dlp'; 
    const localPath = path.join(__dirname, binName); 
    if (!fs.existsSync(localPath)) {
        const dlUrl = isWin ? 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe' : 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp';
        try { 
            if(isWin) { 
                execSync(`powershell -Command "Invoke-WebRequest -Uri ${dlUrl} -OutFile ${binName}"`); 
            } else { 
                execSync(`curl -L ${dlUrl} -o ${binName}`); 
                execSync(`chmod a+rx ${binName}`); 
            } 
        } catch(e) {}
    } 
    return localPath;
}

const YTDLP_PATH = findYtDlp();

function ytRun(args: string[]): Promise<string> { 
    return new Promise((resolve) => { 
        const proc = spawn(YTDLP_PATH, args); 
        let out = ''; 
        proc.stdout.on('data', d => out += d); 
        proc.on('close', () => resolve(out.trim())); 
        proc.on('error', () => resolve('')); 
    }); 
}

async function searchYouTube(query: string, limit = 15) {
  if (memCache.search[query]) return memCache.search[query].data;
  const out = await ytRun(['--print', '%(id)s|||%(title)s|||%(uploader)s|||%(thumbnail)s|||%(duration)s', '--no-warnings', '--flat-playlist', `ytsearch${limit}:${query}`]);
  const results = out.split('\n').filter(Boolean).map(line => {
    let [id, title, artist, thumbnail, duration] = line.split('|||'); 
    if (thumbnail && thumbnail.includes('mqdefault.jpg')) { 
        thumbnail = thumbnail.replace('mqdefault.jpg', 'maxresdefault.jpg'); 
    }
    return { 
        id, 
        title: title || 'Unknown', 
        artist: artist || 'Unknown', 
        thumbnail: thumbnail && thumbnail !== 'NA' ? thumbnail : `https://i.ytimg.com/vi/${id}/mqdefault.jpg`, 
        duration: parseInt(duration) || 0 
    };
  }).filter(s => s.id && s.id.length > 3);
  memCache.search[query] = { data: results, time: Date.now() }; 
  return results;
}

// ==========================================
// API ROUTES
// ==========================================

// 🔥 1. DISCORD OAUTH2 LOGIN REDIRECT
app.get('/api/auth/discord/login', (req, res) => {
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI)}&response_type=code&scope=identify%20guilds`;
    console.log(`[OAuth] Initiating login.`);
    console.log(`[OAuth] Redirect URI: ${DISCORD_REDIRECT_URI}`);
    console.log(`[OAuth] Auth URL: ${authUrl}`);
    res.redirect(authUrl);
});

// 🔥 2. DISCORD OAUTH2 CALLBACK (GETS TOKEN)
app.get('/api/auth/discord/callback', async (req, res) => {
    const code = req.query.code as string;
    console.log(`[OAuth] Callback received. Code present: ${!!code}`);
    
    if (!code) {
        console.error("[OAuth] No code provided by Discord.");
        return res.send("Error: No code provided by Discord.");
    }

    const params = new URLSearchParams({
        client_id: DISCORD_CLIENT_ID, 
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code', 
        code: code, 
        redirect_uri: DISCORD_REDIRECT_URI
    });

    try {
        console.log("[OAuth] Exchanging code for token...");
        const tokenRes = await fetch('https://discord.com/api/oauth2/token', { 
            method: 'POST', 
            body: params, 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' } 
        });
        const tokenData: any = await tokenRes.json();
        
        if (tokenData.error) {
            console.error(`[OAuth] Token exchange error: ${tokenData.error} - ${tokenData.error_description}`);
            return res.send(`Discord OAuth Error: ${tokenData.error_description}`);
        }
        
        console.log("[OAuth] Token exchange successful. Redirecting to panel...");
        // Send them to the panel with their secure access token
        res.redirect(`/panel?token=${tokenData.access_token}`);
    } catch(e) { 
        console.error("[OAuth] Server Error during OAuth:", e);
        return res.send("Server Error during OAuth"); 
    }
});

// 🔥 3. FETCH USER DISCORD DATA
app.get('/api/discord/me', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });
    try {
        const userRes = await fetch('https://discord.com/api/users/@me', { 
            headers: { Authorization: `Bearer ${authHeader}` } 
        });
        const userData = await userRes.json();
        
        const guildRes = await fetch('https://discord.com/api/users/@me/guilds', { 
            headers: { Authorization: `Bearer ${authHeader}` } 
        });
        const guildData: any[] = await guildRes.json() as any[];
        
        // Only return servers where the user is an Administrator (Permission bit 0x8)
        const adminGuilds = guildData.filter(g => (BigInt(g.permissions) & 0x8n) === 0x8n);
        return res.json({ user: userData, guilds: adminGuilds });
    } catch(e) { 
        console.error(e);
        return res.status(500).json({ error: "Failed to fetch Discord data" }); 
    }
});

// 🔥 5. SECURE WEB PANEL API ENDPOINTS
app.get('/api/panel/data', (req, res) => {
    const guildId = req.query.guildId as string; 
    if (!guildId) return res.status(400).json({error: "No guild ID"});
    const serverCfg = readDB(dbFiles.serverConfig);
    return res.json({ config: serverCfg[guildId] || {} });
});

app.post('/api/panel/update', (req, res) => {
    const body = req.body; 
    const guildId = body.guildId;
    if (!guildId) return res.status(400).json({error: "No guild ID"});
    const serverCfg = readDB(dbFiles.serverConfig);
    if (!serverCfg[guildId]) serverCfg[guildId] = {};
    serverCfg[guildId].welcomeChannel = body.welcomeChannel; 
    serverCfg[guildId].byeChannel = body.byeChannel; 
    serverCfg[guildId].banWords = body.banWords;
    writeDB(dbFiles.serverConfig, serverCfg); 
    return res.json({ success: true });
});

// ORIGINAL ROUTES (Kept fully intact)
app.get('/api/search', async (req, res) => {
    const q = req.query.q as string;
    return res.json({ results: await searchYouTube(q, 15) });
});

app.get('/api/recommends', (req, res) => {
    return res.json({ results: globalRecommendsCache.slice(0, 15) });
});

// Vite middleware for development
async function startServer() {
    if (process.env.NODE_ENV !== "production") {
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: "spa",
        });
        app.use(vite.middlewares);
    } else {
        const distPath = path.join(process.cwd(), 'dist');
        app.use(express.static(distPath));
        app.get('*', (req, res) => {
            res.sendFile(path.join(distPath, 'index.html'));
        });
    }

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();
