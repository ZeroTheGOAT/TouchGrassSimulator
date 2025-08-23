import React from 'react';
import { GameProvider } from './contexts/GameContext';
import Header from './components/Header';
import GrassArea from './components/GrassArea';
import StatsPanel from './components/StatsPanel';
import Leaderboard from './components/Leaderboard';
import EventPopup from './components/EventPopup';
import ShareModal from './components/ShareModal';
import PrestigeModal from './components/PrestigeModal';
import SoundToggle from './components/SoundToggle';

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-b from-green-400 via-green-500 to-green-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative z-10">
          <Header />
          <main className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Game Area */}
              <div className="lg:col-span-2">
                <GrassArea />
              </div>
              
              {/* Side Panel */}
              <div className="space-y-6">
                <StatsPanel />
                <Leaderboard />
              </div>
            </div>
          </main>
        </div>

        {/* Floating Components */}
        <SoundToggle />
        <EventPopup />
        <ShareModal />
        <PrestigeModal />
      </div>
    </GameProvider>
  );
}

export default App;