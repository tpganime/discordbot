import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
}

interface Guild {
  id: string;
  name: string;
  icon: string;
  permissions: string;
}

interface ServerConfig {
  welcomeChannel?: string;
  byeChannel?: string;
  banWords?: string[];
}

const DashboardPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useState<string | null>(localStorage.getItem('discord_token'));
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [selectedGuild, setSelectedGuild] = useState<string>('');
  const [config, setConfig] = useState<ServerConfig>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) {
      localStorage.setItem('discord_token', urlToken);
      setToken(urlToken);
      searchParams.delete('token');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/discord/me', {
        headers: { Authorization: token! },
      });
      const data = await res.json();
      if (data.error) {
        handleLogout();
      } else {
        setUser(data.user);
        setGuilds(data.guilds);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadServerSettings = async (guildId: string) => {
    setSelectedGuild(guildId);
    try {
      const res = await fetch(`/api/panel/data?guildId=${guildId}`);
      const data = await res.json();
      setConfig(data.config || {});
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    if (!selectedGuild) return;
    setSaving(true);
    try {
      const res = await fetch('/api/panel/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guildId: selectedGuild,
          ...config,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert('✅ Settings Saved!');
      } else {
        alert('❌ Error Saving.');
      }
    } catch (e) {
      console.error(e);
      alert('❌ Error Saving.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('discord_token');
    setToken(null);
    setUser(null);
    setGuilds([]);
    setSelectedGuild('');
    setConfig({});
  };

  if (!token) {
    return (
      <div className="min-h-screen pt-40 pb-20 px-6 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-panel p-12 text-center"
        >
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-6">
            ⚙️ BOT <span className="text-indigo-500">PANEL</span>
          </h2>
          <p className="text-gray-400 mb-8 uppercase tracking-widest text-xs font-bold">
            Manage your bot settings securely.
          </p>
          <a
            href="/auth/login"
            className="block w-full py-4 bg-[#5865F2] text-white font-black text-[11px] uppercase tracking-[0.4em] rounded-2xl transition-all shadow-xl hover:scale-105"
          >
            Login with Discord
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
          BOT <span className="text-indigo-600">PANEL</span>
        </h1>
        <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.5em]">System Configuration Interface</p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 md:p-12"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/5 pb-8">
          <div className="flex items-center gap-4">
            {user && (
              <>
                <img
                  src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full border-2 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                />
                <div>
                  <h2 className="text-xl font-black text-white uppercase tracking-tighter">
                    {user.username}
                  </h2>
                  <button
                    onClick={handleLogout}
                    className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="w-full md:w-64">
            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-3">
              Select Server
            </label>
            <select
              value={selectedGuild}
              onChange={(e) => loadServerSettings(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="" disabled>
                -- Choose a server --
              </option>
              {guilds.map((g) => (
                <option key={g.id} value={g.id} className="bg-[#121212]">
                  {g.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedGuild ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-3">
                  Welcome Channel ID
                </label>
                <input
                  type="text"
                  value={config.welcomeChannel || ''}
                  onChange={(e) => setConfig({ ...config, welcomeChannel: e.target.value })}
                  placeholder="e.g. 123456789012345678"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-3">
                  Goodbye Channel ID
                </label>
                <input
                  type="text"
                  value={config.byeChannel || ''}
                  onChange={(e) => setConfig({ ...config, byeChannel: e.target.value })}
                  placeholder="e.g. 123456789012345678"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-3">
                Banned Words (comma separated)
              </label>
              <textarea
                value={(config.banWords || []).join(', ')}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    banWords: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  })
                }
                placeholder="e.g. badword1, badword2"
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full py-5 bg-indigo-600 text-white font-black text-[11px] uppercase tracking-[0.4em] rounded-2xl transition-all shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[2.5rem]">
            <p className="text-gray-600 text-xs font-bold uppercase tracking-[0.4em]">
              Select a server to begin configuration
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DashboardPage;
