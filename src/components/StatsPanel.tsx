import React from 'react';
import { Trophy, Calendar, Zap, Award } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

export default function StatsPanel() {
  const { state, dispatch, getCurrentPlayerTitle } = useGame();

  const stats = [
    {
      icon: <Trophy className="w-5 h-5" />,
      label: 'Total Touches',
      value: state.grassTouches.toLocaleString(),
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Current Streak',
      value: `${state.currentStreak} days`,
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'Daily Touches',
      value: state.dailyTouches.toLocaleString(),
      color: 'from-green-400 to-teal-500'
    },
    {
      icon: <Award className="w-5 h-5" />,
      label: 'Prestige Level',
      value: state.prestige,
      color: 'from-pink-400 to-red-500'
    }
  ];

  const canPrestige = state.grassTouches >= 100000;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
          Your Stats
        </h2>
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          <p className="font-semibold">{getCurrentPlayerTitle()}</p>
        </div>
        <div className="mt-2 text-white/80">
          <p className="text-sm">Player: <span className="font-semibold text-white">{state.playerName}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
          >
            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r ${stat.color} mb-3`}>
              {stat.icon}
            </div>
            <p className="text-xs text-white/80 mb-1">{stat.label}</p>
            <p className="text-lg font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Achievement Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-white/80">Progress to Prestige</p>
          <p className="text-sm font-semibold text-white">
            {Math.min(100, Math.floor((state.grassTouches / 100000) * 100))}%
          </p>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-yellow-400 to-red-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, (state.grassTouches / 100000) * 100)}%` }}
          />
        </div>
      </div>

      {/* Prestige Button */}
      {canPrestige && (
        <button
          onClick={() => dispatch({ type: 'SHOW_PRESTIGE_MODAL', show: true })}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
        >
          🏆 Mow the Lawn (Prestige)
        </button>
      )}

      {/* Badges */}
      {state.prestigeBadges.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-white/80 mb-2">Badges</p>
          <div className="flex flex-wrap gap-2">
            {state.prestigeBadges.slice(-3).map((badge, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-semibold px-2 py-1 rounded-full"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}