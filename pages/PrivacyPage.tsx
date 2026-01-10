
import React from 'react';
import { BOT_NAME } from '../constants';

const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 min-h-screen">
      <div className="glass-effect rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
        <h1 className="text-4xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
          Privacy Policy
        </h1>
        <p className="text-gray-400 mb-8">Last Updated: May 2024</p>

        <section className="space-y-8 text-gray-300 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              When you add <strong>{BOT_NAME}</strong> to your server or interact with its commands, we collect specific data required for the bot's functionality:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li><strong>Discord User IDs:</strong> To identify unique users for commands and levels.</li>
              <li><strong>Discord Server IDs:</strong> To store server-specific settings and configurations.</li>
              <li><strong>Channel IDs:</strong> To know where to send messages or stream audio.</li>
              <li><strong>Command Usage:</strong> We log which commands are used to improve bot performance and identify bugs.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">2. Audio Data</h2>
            <p>
              {BOT_NAME} is a music bot. We do <strong>not</strong> record, store, or transmit any audio from your voice channels. The bot only transmits audio data <em>to</em> your channel.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">3. AI Interactions</h2>
            <p>
              Interactions with the AI Chat Assistant (powered by Google Gemini) are transmitted to Google's API for processing. We do not store these conversations permanently, but they may be cached temporarily to maintain session context.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">4. How We Use Information</h2>
            <p>
              Your data is used solely to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Provide and maintain {BOT_NAME}'s services.</li>
              <li>Save your music queues and server settings.</li>
              <li>Prevent abuse and ensure compliance with Discord's Terms of Service.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">5. Data Retention</h2>
            <p>
              We retain your data as long as the bot is in your server or you are an active user. You can request data deletion at any time by contacting us through our support server.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">6. Third-Party Services</h2>
            <p>
              We use third-party services like Discord (for the platform), YouTube/Spotify (for music metadata), and Google (for AI). These services have their own privacy policies which we encourage you to review.
            </p>
          </div>

          <div className="pt-8 border-t border-white/5">
            <p className="text-sm text-gray-500 italic">
              Questions about this policy? Join our <a href="https://discord.gg/XqJwKFPny5" className="text-pink-400 hover:underline">Support Server</a>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
