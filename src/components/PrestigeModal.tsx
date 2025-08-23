import React from 'react';
import { Crown, X, RotateCcw } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

export default function PrestigeModal() {
  const { state, dispatch } = useGame();

  if (!state.showPrestigeModal) return null;

  const handlePrestige = () => {
    dispatch({ type: 'PRESTIGE_RESET' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-gradient-to-b from-purple-600 to-pink-600 rounded-2xl shadow-2xl border-2 border-yellow-400 p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Crown className="w-6 h-6 text-yellow-300" />
            <h2 className="text-xl font-bold text-white">Prestige Available!</h2>
          </div>
          <button
            onClick={() => dispatch({ type: 'SHOW_PRESTIGE_MODAL', show: false })}
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-2xl font-bold text-yellow-300 mb-2">Mow the Lawn!</h3>
          <p className="text-white/90 mb-4">
            You've reached 100,000+ grass touches! Time to prestige and start fresh with special rewards.
          </p>
          
          <div className="bg-black/20 rounded-lg p-4 mb-4">
            <h4 className="text-white font-semibold mb-2">What you get:</h4>
            <ul className="text-white/80 text-sm space-y-1">
              <li>• Prestige Level +1</li>
              <li>• Special prestige badge</li>
              <li>• Enhanced title display</li>
              <li>• Bragging rights forever</li>
            </ul>
          </div>

          <div className="bg-red-500/20 rounded-lg p-4 mb-6">
            <h4 className="text-red-300 font-semibold mb-2">What you lose:</h4>
            <ul className="text-red-200 text-sm space-y-1">
              <li>• All current grass touches reset to 0</li>
              <li>• Daily touches reset to 0</li>
            </ul>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => dispatch({ type: 'SHOW_PRESTIGE_MODAL', show: false })}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
          >
            Not Yet
          </button>
          
          <button
            onClick={handlePrestige}
            className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Prestige!</span>
          </button>
        </div>
      </div>
    </div>
  );
}