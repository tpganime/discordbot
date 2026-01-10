
import React from 'react';
import { BOT_NAME } from '../constants';

const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 min-h-screen">
      <div className="glass-effect rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
        <h1 className="text-4xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
          Terms of Service
        </h1>
        <p className="text-gray-400 mb-8">Last Updated: May 2024</p>

        <section className="space-y-8 text-gray-300 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By adding <strong>{BOT_NAME}</strong> to your Discord server or using its features, you agree to be bound by these Terms of Service and Discord's own Terms of Service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">2. Usage Rules</h2>
            <p className="mb-4">Users must not use {BOT_NAME} to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Harass, abuse, or harm others.</li>
              <li>Bypass Discord's platform limitations.</li>
              <li>Attempt to reverse-engineer the bot or its AI features.</li>
              <li>Distribute illegal content via the bot's search or play features.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">3. Bot Availability</h2>
            <p>
              While we strive for 24/7 uptime, {BOT_NAME} is provided "as is" and "as available". We do not guarantee uninterrupted service and reserve the right to modify or terminate the service at any time without notice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">4. Limitation of Liability</h2>
            <p>
              The developers of {BOT_NAME} shall not be liable for any damages resulting from the use or inability to use the bot, including but not limited to data loss, server disruptions, or account sanctions from third-party platforms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">5. Termination</h2>
            <p>
              We reserve the right to blacklist servers or users from using {BOT_NAME} if these terms are violated.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">6. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the bot after changes are posted constitutes acceptance of the new terms.
            </p>
          </div>

          <div className="pt-8 border-t border-white/5">
            <p className="text-sm text-gray-500 italic">
              By using {BOT_NAME}, you acknowledge that you have read and understood these terms.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
