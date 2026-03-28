
import React from 'react';
import { BOT_NAME } from '../constants';

const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 min-h-screen">
      <div className="glass-effect rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
        <h1 className="text-4xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
          Privacy Policy
        </h1>
        <p className="text-gray-400 mb-8">Last Updated: March 2026</p>

        <section className="space-y-8 text-gray-300 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-white mb-4">1. Data Collection & Storage</h2>
            <p className="mb-4">
              At <strong>{BOT_NAME}</strong>, we prioritize your privacy. We do <strong>not</strong> take, collect, or save your personal data on our servers. 
            </p>
            <p className="mb-4">
              Our bot is designed to function without persistent data storage of your personal information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">2. Use of User Data in Games</h2>
            <p className="mb-4">
              The only instance where user data is utilized is within the bot's interactive games (such as Economy or Tic-Tac-Toe). In these cases:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li><strong>Usernames:</strong> We may use your Discord display name to identify you within the game interface or leaderboards.</li>
              <li><strong>Temporary Session Data:</strong> Game-related data (like scores or bets) is used only to facilitate the current game session.</li>
            </ul>
            <p className="mt-4">
              This data is used strictly for the purpose of gameplay and is not harvested or sold to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">3. Audio Data</h2>
            <p>
              {BOT_NAME} is a music bot. We do <strong>not</strong> record, store, or transmit any audio from your voice channels. The bot only transmits audio data <em>to</em> your channel for your listening pleasure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">4. Third-Party Services</h2>
            <p>
              We use Discord's API to provide our services. While we do not save your data, Discord may collect information as per their own privacy policy. We encourage you to review Discord's privacy settings and policies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">5. Data Deletion</h2>
            <p>
              Since we do not store persistent personal data, there is no data to delete. However, if you have concerns about your interaction history within a specific server, you can manage those through Discord's native tools.
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
