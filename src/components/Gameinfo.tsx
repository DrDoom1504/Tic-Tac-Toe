import React, { useState } from 'react';
import { PlayerNames, Scores } from '../lib/types';
import { UserCircle2 } from 'lucide-react';

export interface GameInfoProps {
  status: string;
  scores: Scores;
  onReset: () => void;
  onResetBoard?: () => void; 
  playerNames: PlayerNames;
  isEditingNames: boolean;
  onNameSubmit: (names: PlayerNames) => void;
}


const GameInfo: React.FC<GameInfoProps> = ({ 
  status, 
  scores, 
  onReset,
  onResetBoard, 
  playerNames,
  isEditingNames,
  onNameSubmit
}) => {
  const [names, setNames] = useState<PlayerNames>(playerNames);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNameSubmit(names);
  };

  if (isEditingNames) {
    return (
      <div className="game-info w-full max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter Player Names</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Player X Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={names.X}
                onChange={(e) => setNames(prev => ({ ...prev, X: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                placeholder="Enter name"
                maxLength={20}
                required
              />
              <UserCircle2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Player O Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={names.O}
                onChange={(e) => setNames(prev => ({ ...prev, O: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                placeholder="Enter name"
                maxLength={20}
                required
              />
              <UserCircle2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <button 
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
          >
            Start Game
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="game-info w-full max-w-md mx-auto mt-6 space-y-4">
      <div className="status text-xl font-medium text-center text-blue-600">
        {status}
      </div>
      
      <div className="scores grid grid-cols-3 gap-2 text-center mb-4">
        <div className="score-card bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">{playerNames.X}</p>
          <p className="text-2xl font-bold text-blue-500">{scores.X}</p>
        </div>
        <div className="score-card bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Draws</p>
          <p className="text-2xl font-bold text-gray-500">{scores.draws}</p>
        </div>
        <div className="score-card bg-purple-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">{playerNames.O}</p>
          <p className="text-2xl font-bold text-purple-500">{scores.O}</p>
        </div>
      </div>
      
      <button 
        onClick={onResetBoard} // Add the reset board button
        className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
      >
        Reset Board
      </button>

      <button 
        onClick={onReset}
        className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
      >
        New Game
      </button>
    </div>
  );
};

export default GameInfo;