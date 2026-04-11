import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { ScrollToTop } from './components/ScrollToTop';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Commands } from './components/Commands';
import { Footer } from './components/Footer';
import { Section } from './components/ui/Section';
import { Container } from './components/ui/Container';
import { Typography } from './components/ui/Typography';
import { Button } from './components/ui/Button';
import { Flex } from './components/ui/Flex';
import { DISCORD_INVITE_URL } from './constants';
import { CommandsPage } from './pages/CommandsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

const HomePage = () => (
  <main>
    <Hero />
    <Features />
  </main>
);

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/commands" element={<CommandsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
