import React from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { Section } from './components/ui/Section';
import { Container } from './components/ui/Container';
import { Typography } from './components/ui/Typography';
import { Button } from './components/ui/Button';
import { Flex } from './components/ui/Flex';
import { DISCORD_INVITE_URL } from './constants';

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-600 selection:text-white">
      <Nav />
      <main>
        <Hero />
        <Features />
        
        {/* CTA Section */}
        <Section spacing="xl" className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full" />
          </div>
          
          <Container size="xl" className="relative z-10">
            <div className="glass rounded-[64px] p-16 md:p-32 text-center border border-white/5">
              <Typography variant="h2" weight="black" className="mb-8">
                Ready to <span className="text-indigo-600">Fusion</span> Your Server?
              </Typography>
              <Typography variant="lead" className="max-w-2xl mx-auto mb-16">
                Join over 50,000+ servers and millions of users who trust Fusion for their Discord experience.
              </Typography>
              <Flex gap={6} justify="center" className="flex-col sm:flex-row">
                <Button size="lg" onClick={() => window.open(DISCORD_INVITE_URL)}>
                  Add to Discord
                </Button>
                <Button size="lg" variant="outline">
                  View Documentation
                </Button>
              </Flex>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
