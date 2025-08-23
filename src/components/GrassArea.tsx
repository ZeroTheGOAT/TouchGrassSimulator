import React, { useState, useCallback } from 'react';
import { useGame } from '../contexts/GameContext';
import { useSounds } from '../hooks/useSounds';

export default function GrassArea() {
  const { state, dispatch } = useGame();
  const { playGrassSound } = useSounds();
  const [clickAnimation, setClickAnimation] = useState<{ x: number; y: number; id: string } | null>(null);

  const handleGrassClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Create click animation
    const animationId = Date.now().toString();
    setClickAnimation({ x, y, id: animationId });

    // Play sound
    if (state.soundEnabled) {
      playGrassSound();
    }

    // Dispatch touch grass action
    dispatch({ type: 'TOUCH_GRASS' });

    // Clear animation after duration
    setTimeout(() => setClickAnimation(null), 600);
  }, [dispatch, state.soundEnabled, playGrassSound]);

  return (
    <div className="bg-gradient-to-b from-green-400 to-green-600 rounded-2xl shadow-2xl border-4 border-green-300 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      {/* Main Grass Area */}
      <div 
        className="relative h-96 md:h-[500px] cursor-pointer select-none flex items-center justify-center group transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        onClick={handleGrassClick}
      >
        {/* Grass Texture Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-b from-green-300 via-green-400 to-green-500"></div>
          {/* Grass Blade Pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 100 Q 25 50 30 100 M 35 100 Q 40 30 45 100 M 50 100 Q 55 70 60 100 M 65 100 Q 70 40 75 100' stroke='%23166534' stroke-width='2' fill='none' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>

        {/* Main Grass Icon */}
        <div className="relative z-10 text-white group-hover:scale-110 transition-transform duration-200">
          <div className="text-8xl md:text-9xl mb-4 drop-shadow-2xl">🌱</div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold drop-shadow-lg mb-2">
              Click to Touch Grass!
            </p>
            <p className="text-lg md:text-xl opacity-90 drop-shadow-md">
              Touches: {state.grassTouches.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Click Animation */}
        {clickAnimation && (
          <div
            className="absolute pointer-events-none z-20"
            style={{ left: clickAnimation.x, top: clickAnimation.y }}
          >
            <div className="animate-ping absolute -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full opacity-75"></div>
            </div>
            <div className="absolute -translate-x-1/2 -translate-y-1/2 animate-bounce">
              <span className="text-2xl font-bold text-white drop-shadow-lg">+1</span>
            </div>
          </div>
        )}

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-green-200 rounded-full animate-pulse opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-black/30 backdrop-blur-sm p-4">
        <div className="flex justify-between items-center text-white">
          <div className="flex space-x-4">
            <div className="text-center">
              <p className="text-xs opacity-80">Daily</p>
              <p className="font-bold">{state.dailyTouches}</p>
            </div>
            <div className="text-center">
              <p className="text-xs opacity-80">Streak</p>
              <p className="font-bold">{state.currentStreak}</p>
            </div>
            <div className="text-center">
              <p className="text-xs opacity-80">Prestige</p>
              <p className="font-bold">{state.prestige}</p>
            </div>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: 'SHOW_SHARE_MODAL', show: true });
            }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Share 📸
          </button>
        </div>
      </div>
    </div>
  );
}