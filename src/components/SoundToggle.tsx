import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

export default function SoundToggle() {
  const { state, dispatch } = useGame();

  return (
    <button
      onClick={() => dispatch({ type: 'TOGGLE_SOUND' })}
      className="fixed top-4 right-4 z-40 bg-black/20 backdrop-blur-md hover:bg-black/30 text-white p-3 rounded-full transition-all duration-200 border border-white/20"
    >
      {state.soundEnabled ? (
        <Volume2 className="w-5 h-5" />
      ) : (
        <VolumeX className="w-5 h-5" />
      )}
    </button>
  );
}