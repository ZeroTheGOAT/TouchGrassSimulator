import React, { useRef } from 'react';
import { X, Download, Copy } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

export default function ShareModal() {
  const { state, dispatch, getCurrentPlayerTitle } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (!state.showShareModal) return null;

  const generateMemeCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#22c55e');
    gradient.addColorStop(1, '#16a34a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add pattern
    ctx.globalAlpha = 0.1;
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }
    ctx.globalAlpha = 1;

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Touch Grass Simulator', canvas.width / 2, 80);

    // Grass emoji
    ctx.font = '120px Arial';
    ctx.fillText('🌱', canvas.width / 2, 220);

    // Stats
    ctx.font = 'bold 36px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${state.playerName}`, canvas.width / 2, 280);
    
    ctx.font = '24px Arial';
    ctx.fillStyle = '#f0f0f0';
    ctx.fillText(`has touched grass`, canvas.width / 2, 320);
    
    ctx.font = 'bold 64px Arial';
    ctx.fillStyle = '#ffff00';
    ctx.fillText(`${state.grassTouches.toLocaleString()}`, canvas.width / 2, 400);
    
    ctx.font = '24px Arial';
    ctx.fillStyle = '#f0f0f0';
    ctx.fillText(`times!`, canvas.width / 2, 440);

    // Title
    ctx.font = '20px Arial';
    ctx.fillStyle = '#a0a0a0';
    ctx.fillText(getCurrentPlayerTitle(), canvas.width / 2, 480);

    // Meme text
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Are you still cooked? 💀', canvas.width / 2, 540);

    // Download the image
    const link = document.createElement('a');
    link.download = 'grass-touches.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const copyShareText = async () => {
    const text = `I've touched grass ${state.grassTouches.toLocaleString()} times on Touch Grass Simulator! ${getCurrentPlayerTitle()} 🌱 Are you still cooked? 💀`;
    
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Share Your Progress</h2>
          <button
            onClick={() => dispatch({ type: 'SHOW_SHARE_MODAL', show: false })}
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🌱</div>
          <p className="text-white text-lg mb-2">
            <span className="font-bold">{state.grassTouches.toLocaleString()}</span> grass touches
          </p>
          <p className="text-white/80">{getCurrentPlayerTitle()}</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={generateMemeCard}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Meme Card</span>
          </button>

          <button
            onClick={copyShareText}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Copy className="w-4 h-4" />
            <span>Copy Share Text</span>
          </button>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}