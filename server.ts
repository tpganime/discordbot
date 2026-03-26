import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { spawn, execSync } from "child_process";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// 🔐 DISCORD OAUTH2 CREDENTIALS 
const DISCORD_CLIENT_ID = '1485375910562758967'; 
const DISCORD_CLIENT_SECRET = 'vSOnjPRwqht5eGVSiyQG_yjxlGVdbs9A'; 
const DISCORD_REDIRECT_URI = 'https://bot.fusionhub.in/auth/callback'; 

// 🍃 MONGODB SETUP
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://fusionbot:tpg@fusionbot.lq3g6fc.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const serverConfigSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  welcomeChannel: String,
  byeChannel: String,
  banWords: [String]
});

const ServerConfig = mongoose.model('ServerConfig', serverConfigSchema);

const DB_FOLDER = process.env.VERCEL ? '/tmp/database' : path.join(__dirname, 'database');
const EMAIL_USER = process.env.EMAIL_USER; 
const EMAIL_PASS = process.env.EMAIL_PASS;    

const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: EMAIL_USER, pass: EMAIL_PASS } });

if (!fs.existsSync(DB_FOLDER)) fs.mkdirSync(DB_FOLDER);
const dbFiles = {
    users: path.join(DB_FOLDER, 'users.json'), 
    otps: path.join(DB_FOLDER, 'otps.json'), 
    resets: path.join(DB_FOLDER, 'resets.json'),
    liked: path.join(DB_FOLDER, 'liked.json'), 
    playlists: path.join(DB_FOLDER, 'playlists.json'),
    serverConfig: path.join(DB_FOLDER, 'server_config.json'), 
    webTokens: path.join(DB_FOLDER, 'web_tokens.json'),
    economy: path.join(DB_FOLDER, 'economy.json'),
    daily: path.join(DB_FOLDER, 'daily.json'),
    giveaways: path.join(DB_FOLDER, 'giveaways.json')
};

for (const key in dbFiles) { 
    if (!fs.existsSync(dbFiles[key as keyof typeof dbFiles])) {
        fs.writeFileSync(dbFiles[key as keyof typeof dbFiles], '{}'); 
    }
}

function readDB(file: string) { try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch(e) { return {}; } }
function writeDB(file: string, data: any) { try { fs.writeFileSync(file, JSON.stringify(data, null, 2)); } catch(e) {} }

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

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// ==========================================
// API ROUTES
// ==========================================

app.get('/manifest.json', (req, res) => {
    res.json({ 
        "name": "FusionMusic", 
        "short_name": "Fusion", 
        "start_url": "/", 
        "display": "standalone", 
        "background_color": "#121212", 
        "theme_color": "#fc3c44", 
        "icons": [
            {"src": "https://cdn-icons-png.flaticon.com/512/461/461163.png", "sizes": "192x192", "type": "image/png"}, 
            {"src": "https://cdn-icons-png.flaticon.com/512/461/461163.png", "sizes": "512x512", "type": "image/png"}
        ] 
    });
});

app.get('/sw.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.send(`self.addEventListener('fetch', e => e.respondWith(fetch(e.request)));`);
});

// 🔥 1. SERVE PANEL HTML (The Dashboard)
app.get(['/panel', '/panel.html', '/dashboard'], (req, res) => {
    const panelPath = path.join(__dirname, 'panel.html');
    if (fs.existsSync(panelPath)) {
        return res.sendFile(panelPath);
    }
    // Fallback if panel.html is missing
    res.writeHead(200, {'Content-Type': 'text/html'});
    return res.end(`
        <!DOCTYPE html><html><head><title>Fusion Bot Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body{font-family:sans-serif;background:#121212;color:#fff;padding:20px;display:flex;justify-content:center;align-items:flex-start;min-height:100vh;} 
            .container {background:#1e1e1e;padding:30px;border-radius:12px;width:100%;max-width:500px;box-shadow:0 4px 15px rgba(0,0,0,0.5);}
            input, select{padding:12px;margin:8px 0 15px 0;width:100%;box-sizing:border-box;border-radius:6px;border:1px solid #333;background:#2a2a2a;color:#fff;font-size:14px;} 
            button{padding:12px 20px;background:#5865F2;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:bold;width:100%;font-size:16px;transition:0.2s;}
            button:hover{background:#4752C4;}
            .btn-save {background:#fc3c44;} .btn-save:hover {background:#d63038;}
            .profile{display:flex;align-items:center;gap:15px;margin-bottom:25px;background:#2a2a2a;padding:15px;border-radius:8px;}
            .profile img{border-radius:50%;width:60px;height:60px;}
            h2 {margin-top:0; text-align:center;}
        </style></head>
        <body>
            <div class="container">
                <h2>⚙️ Server Dashboard</h2>
                <div id="app">
                    <p style="text-align:center; color:#aaa;">Please log in to manage your bot settings.</p>
                    <button onclick="window.location.href='/auth/login'">Login with Discord</button>
                </div>
            </div>
            <script>
                let token = new URLSearchParams(window.location.search).get('token') || localStorage.getItem('discord_token');
                let currentGuildId = null;

                if (token) {
                    localStorage.setItem('discord_token', token);
                    window.history.replaceState({}, document.title, "/panel"); // Clean up the URL
                    loadDashboard();
                }

                function loadDashboard() {
                    document.getElementById('app').innerHTML = "<p style='text-align:center;'>Loading your servers...</p>";
                    fetch('/api/discord/me', { headers: { 'Authorization': token } }).then(r=>r.json()).then(data => {
                        if (data.error) { 
                            localStorage.removeItem('discord_token'); 
                            window.location.href = "/auth/login"; 
                            return; 
                        }
                        
                        let guildOptions = data.guilds.map(g => \`<option value="\${g.id}">\${g.name}</option>\`).join('');
                        if(data.guilds.length === 0) guildOptions = "<option disabled>You are not an Admin in any servers.</option>";
                        
                        document.getElementById('app').innerHTML = \`
                            <div class="profile">
                                <img src="https://cdn.discordapp.com/avatars/\${data.user.id}/\${data.user.avatar}.png">
                                <div>
                                    <b style="font-size:18px;">\${data.user.username}</b><br>
                                    <span style="color:#fc3c44; cursor:pointer; font-weight:bold; font-size:14px;" onclick="logout()">Logout</span>
                                </div>
                            </div>
                            <label><b>Select a Server to Manage:</b></label><br>
                            <select id="serverSelect" onchange="loadServerSettings(this.value)">
                                <option value="" disabled selected>-- Choose a server --</option>
                                \${guildOptions}
                            </select>
                            <div id="settingsArea" style="display:none; margin-top:20px; padding-top:15px; border-top:1px solid #333;">
                                <label>Welcome Channel ID:</label><br><input id="welc" placeholder="e.g. 123456789012345"><br>
                                <label>Goodbye Channel ID:</label><br><input id="bye" placeholder="e.g. 123456789012345"><br>
                                <label>Banned Words (comma separated):</label><br><input id="ban" placeholder="e.g. badword1, badword2"><br>
                                <button class="btn-save" onclick="saveSettings()">Save Settings</button>
                            </div>
                        \`;
                    });
                }

                function loadServerSettings(guildId) {
                    currentGuildId = guildId;
                    document.getElementById('settingsArea').style.display = "block";
                    fetch('/api/panel/data?guildId=' + guildId).then(r=>r.json()).then(data => {
                        const cfg = data.config || {};
                        document.getElementById('welc').value = cfg.welcomeChannel || '';
                        document.getElementById('bye').value = cfg.byeChannel || '';
                        document.getElementById('ban').value = (cfg.banWords || []).join(', ');
                    });
                }

                function saveSettings() {
                    if(!currentGuildId) return;
                    const payload = {
                        guildId: currentGuildId,
                        welcomeChannel: document.getElementById('welc').value.trim(),
                        byeChannel: document.getElementById('bye').value.trim(),
                        banWords: document.getElementById('ban').value.split(',').map(s=>s.trim()).filter(Boolean)
                    };
                    fetch('/api/panel/update', {
                        method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)
                    }).then(r=>r.json()).then(d=>{
                        if(d.success) alert("✅ Settings Saved Successfully!");
                        else alert("❌ Error Saving Settings.");
                    });
                }

                function logout() { localStorage.removeItem('discord_token'); location.reload(); }
            </script>
        </body></html>
    `);
});

// 🔥 2. DISCORD OAUTH2 LOGIN REDIRECT
app.get('/auth/login', (req, res) => {
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI)}&response_type=code&scope=identify%20guilds`;
    console.log(`[OAuth] Initiating login.`);
    console.log(`[OAuth] Redirect URI: ${DISCORD_REDIRECT_URI}`);
    console.log(`[OAuth] Auth URL: ${authUrl}`);
    res.redirect(authUrl);
});

// 🔥 2. DISCORD OAUTH2 CALLBACK (GETS TOKEN)
app.get('/auth/callback', async (req, res) => {
    const code = req.query.code as string;
    console.log(`[OAuth] Callback received. Code present: ${!!code}`);
    
    if (!code) {
        console.error("[OAuth] No code provided by Discord.");
        return res.send("Error: No code provided by Discord.");
    }

    try {
        console.log("[OAuth] Exchanging code for token...");
        const params = new URLSearchParams({
            client_id: DISCORD_CLIENT_ID as string, 
            client_secret: DISCORD_CLIENT_SECRET as string,
            grant_type: 'authorization_code', 
            code: code, 
            redirect_uri: DISCORD_REDIRECT_URI
        }).toString();

        const tokenRes = await fetch('https://discord.com/api/v10/oauth2/token', { 
            method: 'POST', 
            body: params, 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' } 
        });
        const tokenData: any = await tokenRes.json();
        
        if (tokenData.error) {
            console.error(`[OAuth] Token exchange error: ${tokenData.error} - ${tokenData.error_description}`);
            res.writeHead(200, {'Content-Type': 'text/html'});
            return res.end(`<h2>Discord API Error</h2><p>${tokenData.error_description}</p><a href="/">Go Back</a>`);
        }
        
        console.log("[OAuth] Token exchange successful. Redirecting to panel...");
        // Securely redirect to panel with the token attached
        res.redirect(`/panel?token=${tokenData.access_token}`);
    } catch(e) { 
        console.error("[OAuth] Server Error during OAuth:", e);
        return res.send("Server Error during OAuth"); 
    }
});

// 🔥 3. FETCH USER DISCORD DATA
app.get('/api/discord/me', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || authHeader === 'null') return res.status(401).json({ error: "Unauthorized" });
    try {
        const userRes = await fetch('https://discord.com/api/v10/users/@me', { 
            headers: { Authorization: `Bearer ${authHeader}` } 
        });
        const userData: any = await userRes.json();
        if (userData.message === "401: Unauthorized") return res.status(401).json({ error: "Session Expired" });
        
        const guildRes = await fetch('https://discord.com/api/v10/users/@me/guilds', { 
            headers: { Authorization: `Bearer ${authHeader}` } 
        });
        const guildData: any[] = await guildRes.json() as any[];
        
        // Only return servers where the user is an Administrator
        const adminGuilds = guildData.filter(g => (parseInt(g.permissions) & 0x8) === 0x8);
        return res.json({ user: userData, guilds: adminGuilds });
    } catch(e) { 
        console.error(e);
        return res.status(500).json({ error: "Failed to fetch Discord data" }); 
    }
});

// 🔥 5. SECURE WEB PANEL API ENDPOINTS
app.get('/api/panel/data', async (req, res) => {
    const guildId = req.query.guildId as string; 
    if (!guildId) return res.status(400).json({error: "No guild ID"});
    try {
        const config = await ServerConfig.findOne({ guildId });
        return res.json({ config: config || {} });
    } catch (e) {
        return res.status(500).json({ error: "Failed to fetch config" });
    }
});

app.post('/api/panel/update', async (req, res) => {
    const body = req.body; 
    const guildId = body.guildId;
    if (!guildId) return res.status(400).json({error: "No guild ID"});
    
    try {
        const update: any = {};
        if (body.welcomeChannel !== undefined) update.welcomeChannel = body.welcomeChannel;
        if (body.byeChannel !== undefined) update.byeChannel = body.byeChannel;
        if (body.banWords !== undefined) update.banWords = body.banWords;

        await ServerConfig.findOneAndUpdate(
            { guildId },
            { $set: update },
            { upsert: true, new: true }
        );
        return res.json({ success: true });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Failed to update config" });
    }
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
