import React from 'react';
import { Grab as Grass } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

export default function Header() {
  const { getCurrentPlayerTitle } = useGame();

  return (
    <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-green-300 to-green-500 p-3 rounded-xl shadow-lg">
              <Grass className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                Touch Grass Simulator
              </h1>
              <p className="text-green-100 text-sm font-medium">
                {getCurrentPlayerTitle()}
              </p>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
              <p className="text-white text-sm font-medium">
                🌱 Touch grass to gain enlightenment
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}