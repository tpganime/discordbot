const url = require('url');
const mongoose = require('mongoose');

// 🔐 DISCORD OAUTH2 CREDENTIALS
const DISCORD_CLIENT_ID = '1485375910562758967';
const DISCORD_CLIENT_SECRET = 'vSOnjPRwqht5eGVSiyQG_yjxlGVdbs9A';
const DISCORD_REDIRECT_URI = 'https://bot.fusionhub.in/auth/callback';
const MONGO_URI = 'mongodb+srv://fusionbot:tpg@fusionbot.lq3g6fc.mongodb.net/fusionbot?retryWrites=true&w=majority';

// ─── DATABASE CONNECTION ───
let cached = global.mongoose;
if (!cached) { cached = global.mongoose = { conn: null, promise: null }; }
async function dbConnect() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) { cached.promise = mongoose.connect(MONGO_URI).then(m => m); }
    cached.conn = await cached.promise; return cached.conn;
}

const ServerConfigSchema = new mongoose.Schema({ guildId: String, welcomeChannel: String, byeChannel: String, banWords: [String] });
let ServerConfig;
try { ServerConfig = mongoose.model('ServerConfig'); } catch(e) { ServerConfig = mongoose.model('ServerConfig', ServerConfigSchema); }

function parseBody(req) { return new Promise((resolve) => { let body = ''; req.on('data', chunk => body += chunk); req.on('end', () => { try { resolve(JSON.parse(body)); } catch { resolve({}); } }); }); }

// ==========================================
// VERCEL SERVERLESS HANDLER
// ==========================================
module.exports = async (req, res) => {
  await dbConnect(); // Connect to MongoDB on every request

  const { pathname, query } = url.parse(req.url, true);
  const sendJSON = (data, status=200) => { res.writeHead(status, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}); res.end(JSON.stringify(data)); };

  // 🔥 1. DISCORD LOGIN
  if (pathname === '/auth/login') {
      const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI)}&response_type=code&scope=identify%20guilds`;
      res.writeHead(302, { Location: authUrl });
      return res.end();
  }

  // 🔥 2. DISCORD CALLBACK
  if (pathname === '/auth/callback') {
      const code = query.code; if (!code) return res.end("Error: No code provided.");
      const params = new URLSearchParams({ client_id: DISCORD_CLIENT_ID, client_secret: DISCORD_CLIENT_SECRET, grant_type: 'authorization_code', code: code, redirect_uri: DISCORD_REDIRECT_URI }).toString();

      try {
          const tokenRes = await fetch('https://discord.com/api/v10/oauth2/token', { method: 'POST', body: params, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
          const tokenData = await tokenRes.json();
          if (tokenData.error) { res.writeHead(200, {'Content-Type': 'text/html'}); return res.end(`<h2>Discord API Error</h2><p>${tokenData.error_description}</p><a href="/">Go Back</a>`); }
          res.writeHead(302, { Location: `/panel?token=${tokenData.access_token}` }); return res.end();
      } catch(e) { return res.end("Server Error during OAuth"); }
  }

  // 🔥 3. FETCH USER DISCORD DATA
  if (pathname === '/bot/me') {
      const authHeader = req.headers['authorization']; if (!authHeader || authHeader === 'null') return sendJSON({ error: "Unauthorized" }, 401);
      try {
          const userRes = await fetch('https://discord.com/api/v10/users/@me', { headers: { Authorization: `Bearer ${authHeader}` } });
          const userData = await userRes.json(); if (userData.message === "401: Unauthorized") return sendJSON({ error: "Session Expired" }, 401);
          const guildRes = await fetch('https://discord.com/api/v10/users/@me/guilds', { headers: { Authorization: `Bearer ${authHeader}` } });
          const guildData = await guildRes.json();
          const adminGuilds = guildData.filter(g => (g.permissions & 0x8) === 0x8); 
          return sendJSON({ user: userData, guilds: adminGuilds });
      } catch(e) { return sendJSON({ error: "Failed to fetch Discord data" }, 500); }
  }

  // 🔥 4. FETCH SETTINGS DIRECTLY FROM MONGODB 
  if (pathname === '/bot/data') {
      const guildId = query.guildId; if (!guildId) return sendJSON({error: "No guild ID"}, 400);
      const cfg = await ServerConfig.findOne({ guildId });
      return sendJSON({ config: cfg || {} });
  }
  
  // 🔥 5. UPDATE SETTINGS DIRECTLY TO MONGODB 
  if (pathname === '/bot/update') {
      const body = await parseBody(req); const guildId = body.guildId; if (!guildId) return sendJSON({error: "No guild ID"}, 400);
      await ServerConfig.findOneAndUpdate(
          { guildId: guildId }, 
          { welcomeChannel: body.welcomeChannel, byeChannel: body.byeChannel, banWords: body.banWords }, 
          { upsert: true, new: true }
      );
      return sendJSON({ success: true });
  }

  // 🔥 6. THE DASHBOARD UI
  if (pathname === '/panel') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      return res.end(`
          <!DOCTYPE html><html><head><title>Fusion Bot Dashboard</title>
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
                  if (token) { localStorage.setItem('discord_token', token); window.history.replaceState({}, document.title, "/panel"); loadDashboard(); }

                  function loadDashboard() {
                      document.getElementById('app').innerHTML = "<p style='text-align:center;'>Loading your servers...</p>";
                      fetch('/bot/me', { headers: { 'Authorization': token } }).then(r=>r.json()).then(data => {
                          if (data.error) { localStorage.removeItem('discord_token'); window.location.href = "/auth/login"; return; }
                          
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
                      currentGuildId = guildId; document.getElementById('settingsArea').style.display = "block";
                      fetch('/bot/data?guildId=' + guildId).then(r=>r.json()).then(data => {
                          const cfg = data.config || {};
                          document.getElementById('welc').value = cfg.welcomeChannel || '';
                          document.getElementById('bye').value = cfg.byeChannel || '';
                          document.getElementById('ban').value = (cfg.banWords || []).join(', ');
                      });
                  }

                  function saveSettings() {
                      if(!currentGuildId) return;
                      const payload = { guildId: currentGuildId, welcomeChannel: document.getElementById('welc').value.trim(), byeChannel: document.getElementById('bye').value.trim(), banWords: document.getElementById('ban').value.split(',').map(s=>s.trim()).filter(Boolean) };
                      fetch('/bot/update', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
                      .then(r=>r.json()).then(d=>{ if(d.success) alert("✅ Settings Saved to MongoDB!"); else alert("❌ Error Saving Settings."); });
                  }

                  function logout() { localStorage.removeItem('discord_token'); location.reload(); }
              </script>
          </body></html>
      `);
  }

  return sendJSON({ error: "API Route Not Found" }, 404);
};
