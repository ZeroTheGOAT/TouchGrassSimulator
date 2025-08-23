import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface GameState {
  grassTouches: number;
  dailyTouches: number;
  currentStreak: number;
  longestStreak: number;
  lastTouchDate: string;
  prestige: number;
  prestigeBadges: string[];
  soundEnabled: boolean;
  currentEvent: RandomEvent | null;
  showShareModal: boolean;
  showPrestigeModal: boolean;
  leaderboard: LeaderboardEntry[];
  playerName: string;
}

interface RandomEvent {
  id: string;
  type: 'positive' | 'negative' | 'neutral';
  title: string;
  description: string;
  effect: number;
  duration: number;
}

interface LeaderboardEntry {
  name: string;
  touches: number;
  prestige: number;
  avatar: string;
  title: string;
}

type GameAction = 
  | { type: 'TOUCH_GRASS' }
  | { type: 'TRIGGER_EVENT'; event: RandomEvent }
  | { type: 'CLEAR_EVENT' }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'SHOW_SHARE_MODAL'; show: boolean }
  | { type: 'SHOW_PRESTIGE_MODAL'; show: boolean }
  | { type: 'PRESTIGE_RESET' }
  | { type: 'SET_PLAYER_NAME'; name: string }
  | { type: 'LOAD_STATE'; state: Partial<GameState> };

const initialState: GameState = {
  grassTouches: 0,
  dailyTouches: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastTouchDate: '',
  prestige: 0,
  prestigeBadges: [],
  soundEnabled: true,
  currentEvent: null,
  showShareModal: false,
  showPrestigeModal: false,
  leaderboard: [
    { name: 'HariGOAT', touches: 69420, prestige: 7, avatar: '🌱', title: 'Photosynthesis Papi' },
    { name: 'YashNigga', touches: 42069, prestige: 5, avatar: '🍃', title: 'Certified Grass Enjoyer' },
    { name: 'TouchMaster', touches: 13337, prestige: 3, avatar: '🌿', title: 'Lawn Demon' },
    { name: 'GrassToucher', touches: 8888, prestige: 2, avatar: '🌾', title: 'Indoor NPC Reformed' },
    { name: 'FieldWalker', touches: 6969, prestige: 1, avatar: '🍀', title: 'Grass Apprentice' },
  ],
  playerName: 'Anonymous Grass Toucher'
};

const titles = [
  { min: 0, max: 9, title: 'Indoor NPC' },
  { min: 10, max: 99, title: 'Grass Curious' },
  { min: 100, max: 999, title: 'Grass Apprentice' },
  { min: 1000, max: 9999, title: 'Certified Grass Enjoyer' },
  { min: 10000, max: 99999, title: 'Lawn Demon' },
  { min: 100000, max: 999999, title: 'Photosynthesis Papi' },
  { min: 1000000, max: Infinity, title: 'Grass Deity' }
];

const randomEvents: Omit<RandomEvent, 'id' | 'duration'>[] = [
  { type: 'negative', title: '🐍 Snake Encounter!', description: 'You stepped on a snake!', effect: -10 },
  { type: 'negative', title: '🕷️ Spider Web!', description: 'Walked into a web, ew!', effect: -5 },
  { type: 'negative', title: '💩 Dog Poop!', description: 'Oh no, you stepped in it!', effect: -15 },
  { type: 'positive', title: '☀️ Sunshine Buff!', description: 'Perfect weather for grass touching!', effect: 2 },
  { type: 'positive', title: '🌈 Rainbow Blessing!', description: 'Nature smiles upon you!', effect: 5 },
  { type: 'positive', title: '🦋 Butterfly Luck!', description: 'A butterfly landed on you!', effect: 3 },
  { type: 'positive', title: '🍀 Four Leaf Clover!', description: 'Lucky find!', effect: 10 },
  { type: 'neutral', title: '🐛 Bug Inspection!', description: 'A curious bug watches you.', effect: 0 },
  { type: 'neutral', title: '🌬️ Gentle Breeze!', description: 'The wind whispers secrets.', effect: 1 },
];

function getCurrentTitle(touches: number, prestige: number): string {
  const baseTitle = titles.find(t => touches >= t.min && touches <= t.max)?.title || 'Grass Deity';
  if (prestige > 0) {
    return `${baseTitle} (P${prestige})`;
  }
  return baseTitle;
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'TOUCH_GRASS': {
      const today = new Date().toDateString();
      const isNewDay = state.lastTouchDate !== today;
      
      let newStreak = state.currentStreak;
      if (isNewDay) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        newStreak = state.lastTouchDate === yesterday.toDateString() ? state.currentStreak + 1 : 1;
      }

      const newTouches = state.grassTouches + 1;
      const newDailyTouches = isNewDay ? 1 : state.dailyTouches + 1;

      // Random event chance (5%)
      const eventChance = Math.random();
      let currentEvent = state.currentEvent;
      if (eventChance < 0.05 && !currentEvent) {
        const randomEvent = randomEvents[Math.floor(Math.random() * randomEvents.length)];
        currentEvent = {
          ...randomEvent,
          id: Date.now().toString(),
          duration: 3000
        };
      }

      return {
        ...state,
        grassTouches: Math.max(0, newTouches + (currentEvent?.effect || 0)),
        dailyTouches: newDailyTouches,
        currentStreak: newStreak,
        longestStreak: Math.max(state.longestStreak, newStreak),
        lastTouchDate: today,
        currentEvent,
        showPrestigeModal: newTouches >= 100000 && state.prestige === 0
      };
    }

    case 'TRIGGER_EVENT':
      return {
        ...state,
        currentEvent: action.event
      };

    case 'CLEAR_EVENT':
      return {
        ...state,
        currentEvent: null
      };

    case 'TOGGLE_SOUND':
      return {
        ...state,
        soundEnabled: !state.soundEnabled
      };

    case 'SHOW_SHARE_MODAL':
      return {
        ...state,
        showShareModal: action.show
      };

    case 'SHOW_PRESTIGE_MODAL':
      return {
        ...state,
        showPrestigeModal: action.show
      };

    case 'PRESTIGE_RESET': {
      const newPrestige = state.prestige + 1;
      const newBadge = `Prestige ${newPrestige} Master`;
      
      return {
        ...state,
        grassTouches: 0,
        dailyTouches: 0,
        prestige: newPrestige,
        prestigeBadges: [...state.prestigeBadges, newBadge],
        showPrestigeModal: false
      };
    }

    case 'SET_PLAYER_NAME':
      return {
        ...state,
        playerName: action.name
      };

    case 'LOAD_STATE':
      return {
        ...state,
        ...action.state
      };

    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  getCurrentPlayerTitle: () => string;
} | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('touch-grass-save');
    if (saved) {
      try {
        const parsedState = JSON.parse(saved);
        dispatch({ type: 'LOAD_STATE', state: parsedState });
      } catch (error) {
        console.warn('Failed to load save data');
      }
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    const saveData = {
      grassTouches: state.grassTouches,
      dailyTouches: state.dailyTouches,
      currentStreak: state.currentStreak,
      longestStreak: state.longestStreak,
      lastTouchDate: state.lastTouchDate,
      prestige: state.prestige,
      prestigeBadges: state.prestigeBadges,
      soundEnabled: state.soundEnabled,
      playerName: state.playerName
    };
    localStorage.setItem('touch-grass-save', JSON.stringify(saveData));
  }, [state]);

  // Clear events after duration
  useEffect(() => {
    if (state.currentEvent) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_EVENT' });
      }, state.currentEvent.duration);
      return () => clearTimeout(timer);
    }
  }, [state.currentEvent]);

  const getCurrentPlayerTitle = () => getCurrentTitle(state.grassTouches, state.prestige);

  return (
    <GameContext.Provider value={{ state, dispatch, getCurrentPlayerTitle }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}