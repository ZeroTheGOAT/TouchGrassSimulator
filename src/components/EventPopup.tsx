import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

export default function EventPopup() {
  const { state, dispatch } = useGame();
  const event = state.currentEvent;

  useEffect(() => {
    if (event) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_EVENT' });
      }, event.duration);
      return () => clearTimeout(timer);
    }
  }, [event, dispatch]);

  if (!event) return null;

  const getEventStyle = () => {
    switch (event.type) {
      case 'positive':
        return 'from-green-500 to-emerald-600 border-green-400';
      case 'negative':
        return 'from-red-500 to-rose-600 border-red-400';
      default:
        return 'from-blue-500 to-cyan-600 border-blue-400';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`bg-gradient-to-r ${getEventStyle()} rounded-2xl shadow-2xl border-2 p-6 max-w-sm w-full mx-4 animate-bounce`}>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white">{event.title}</h3>
          <button
            onClick={() => dispatch({ type: 'CLEAR_EVENT' })}
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-white/90 mb-4">{event.description}</p>
        
        <div className="flex items-center justify-between">
          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
            event.effect > 0 ? 'bg-green-400/20 text-green-100' :
            event.effect < 0 ? 'bg-red-400/20 text-red-100' :
            'bg-blue-400/20 text-blue-100'
          }`}>
            {event.effect > 0 ? '+' : ''}{event.effect} grass
          </div>
          
          <div className="text-white/70 text-sm">
            {event.type === 'positive' ? '🎉' : event.type === 'negative' ? '😰' : '🤔'}
          </div>
        </div>
      </div>
    </div>
  );
}