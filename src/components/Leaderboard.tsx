import React from 'react';
import { Crown, Medal, Award } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

export default function Leaderboard() {
  const { state, getCurrentPlayerTitle } = useGame();

  const playerEntry = {
    name: state.playerName,
    touches: state.grassTouches,
    prestige: state.prestige,
    avatar: '🤖',
    title: getCurrentPlayerTitle()
  };

  const allEntries = [...state.leaderboard, playerEntry]
    .sort((a, b) => {
      if (a.prestige !== b.prestige) return b.prestige - a.prestige;
      return b.touches - a.touches;
    })
    .slice(0, 10);

  const playerRank = allEntries.findIndex(entry => entry.name === playerEntry.name) + 1;

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="w-5 h-5 text-yellow-400" />;
      case 1: return <Medal className="w-5 h-5 text-gray-300" />;
      case 2: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-white/60 font-bold text-sm">#{index + 1}</span>;
    }
  };

  const getRankBg = (index: number, isPlayer: boolean) => {
    if (isPlayer) return 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/50';
    switch (index) {
      case 0: return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/50';
      case 1: return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/50';
      case 2: return 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 border-amber-500/50';
      default: return 'bg-white/5 border-white/10';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center">
        <Crown className="w-5 h-5 mr-2 text-yellow-400" />
        Leaderboard
      </h2>

      <div className="space-y-3">
        {allEntries.map((entry, index) => {
          const isPlayer = entry.name === playerEntry.name;
          
          return (
            <div
              key={`${entry.name}-${entry.touches}`}
              className={`p-3 rounded-xl border transition-all duration-200 ${getRankBg(index, isPlayer)} ${
                isPlayer ? 'ring-2 ring-blue-400/50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {getRankIcon(index)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{entry.avatar}</span>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {isPlayer ? '👑 ' : ''}{entry.name}
                      </p>
                      <p className="text-white/60 text-xs">{entry.title}</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-white font-bold">
                    {entry.touches.toLocaleString()}
                  </p>
                  {entry.prestige > 0 && (
                    <p className="text-purple-300 text-xs">P{entry.prestige}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {playerRank > 10 && (
        <div className="mt-4 p-3 bg-blue-500/20 border border-blue-400/50 rounded-xl">
          <p className="text-white text-sm text-center">
            Your rank: #{playerRank} - Keep touching grass! 🌱
          </p>
        </div>
      )}
    </div>
  );
}