
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Stats from './components/Stats';
import InteractiveAI from './components/InteractiveAI';
import Footer from './components/Footer';

const LandingPage: React.FC = () => {
  const [serverCount, setServerCount] = useState(3);
  const [userCount, setUserCount] = useState(3);

  // Simulate live growth
  useEffect(() => {
    const interval = setInterval(() => {
      // Occasional growth simulation
      if (Math.random() > 0.85) {
        setServerCount(prev => prev + 1);
      }
      if (Math.random() > 0.6) {
        setUserCount(prev => prev + 1);
      }
    }, 15000); 

    return () => clearInterval(interval);
  }, []);

  const handleAddBot = () => {
    // Immediate live feedback
    setServerCount(prev => prev + 1);
    setUserCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen relative selection:bg-pink-500/30">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <Navbar onAdd={handleAddBot} />
      
      <main>
        <Hero onAdd={handleAddBot} />
        <Stats servers={serverCount} users={userCount} />
        <Features />
        <InteractiveAI />
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
