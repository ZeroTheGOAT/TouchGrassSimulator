import React, { useState } from 'react';
import { Grab as Grass, Edit3 } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

export default function Header() {
  const { state, dispatch, getCurrentPlayerTitle } = useGame();
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(state.playerName);

  // Update tempName when playerName changes
  React.useEffect(() => {
    setTempName(state.playerName);
  }, [state.playerName]);

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
              <div className="flex items-center space-x-2">
                <p className="text-green-100 text-sm font-medium">
                  {getCurrentPlayerTitle()}
                </p>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <button
                  onClick={() => setIsEditingName(!isEditingName)}
                  className="text-white text-sm font-medium hover:text-green-200 transition-colors flex items-center space-x-1"
                  title="Click to change player name"
                >
                  <span>Player: {state.playerName}</span>
                  <Edit3 className="w-4 h-4 text-green-200" />
                </button>
              </div>
              {isEditingName && (
                <div className="mt-2 flex items-center space-x-2">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        if (tempName.trim()) {
                          dispatch({ type: 'SET_PLAYER_NAME', name: tempName.trim() });
                          setIsEditingName(false);
                        }
                      }
                    }}
                    className="bg-white/20 backdrop-blur-sm border border-white/30 rounded px-2 py-1 text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400/50"
                    placeholder="Enter your name"
                    maxLength={20}
                  />
                  <button
                    onClick={() => {
                      if (tempName.trim()) {
                        dispatch({ type: 'SET_PLAYER_NAME', name: tempName.trim() });
                        setIsEditingName(false);
                      }
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setTempName(state.playerName);
                      setIsEditingName(false);
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
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