import { useCallback } from 'react';

interface AudioContextType {
  audioContext: AudioContext | null;
  initialized: boolean;
}

let audioState: AudioContextType = {
  audioContext: null,
  initialized: false
};

export function useSounds() {
  const initializeAudio = useCallback(() => {
    if (!audioState.initialized && typeof window !== 'undefined') {
      try {
        audioState.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioState.initialized = true;
      } catch (error) {
        console.warn('Web Audio API not supported');
      }
    }
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.1) => {
    if (!audioState.audioContext) {
      initializeAudio();
      if (!audioState.audioContext) return;
    }

    try {
      const oscillator = audioState.audioContext.createOscillator();
      const gainNode = audioState.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioState.audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioState.audioContext.currentTime);
      oscillator.type = type;

      // Fade in and out to avoid clicks
      gainNode.gain.setValueAtTime(0, audioState.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioState.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioState.audioContext.currentTime + duration);

      oscillator.start(audioState.audioContext.currentTime);
      oscillator.stop(audioState.audioContext.currentTime + duration);
    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  }, [initializeAudio]);

  const playGrassSound = useCallback(() => {
    // Create a rustling grass sound effect
    const frequencies = [200, 250, 180, 220];
    const duration = 0.1;
    
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        playTone(freq, duration, 'sawtooth', 0.02);
      }, index * 50);
    });
  }, [playTone]);

  const playPositiveSound = useCallback(() => {
    // Happy ascending tones
    const notes = [440, 554, 659]; // A, C#, E
    notes.forEach((freq, index) => {
      setTimeout(() => {
        playTone(freq, 0.2, 'sine', 0.05);
      }, index * 100);
    });
  }, [playTone]);

  const playNegativeSound = useCallback(() => {
    // Sad descending tone
    playTone(200, 0.5, 'sawtooth', 0.03);
  }, [playTone]);

  const playPrestigeSound = useCallback(() => {
    // Epic fanfare
    const fanfare = [523, 659, 784, 1047]; // C, E, G, C
    fanfare.forEach((freq, index) => {
      setTimeout(() => {
        playTone(freq, 0.3, 'triangle', 0.08);
      }, index * 150);
    });
  }, [playTone]);

  return {
    playGrassSound,
    playPositiveSound,
    playNegativeSound,
    playPrestigeSound
  };
}