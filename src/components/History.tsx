import React from 'react';
import { PlayerNames } from '../lib/types';

interface HistoryProps {
  history: {
    squares: (string | null)[];
    position: number | null;
  }[];
  currentStep: number;
  jumpTo: (step: number) => void;
  playerNames: PlayerNames;
}

const History: React.FC<HistoryProps> = ({ history, currentStep, jumpTo, playerNames }) => {
  if (history.length <= 1) {
    return null;
  }

  const moves = history.map((step, move) => {
    const position = step.position;
    const row = position !== null ? Math.floor(position / 3) + 1 : null;
    const col = position !== null ? (position % 3) + 1 : null;
    const player = move % 2 === 0 ? playerNames.O : playerNames.X;
    
    const desc = move ? 
      `Move #${move}: ${player} at (${row}, ${col})` : 
      'Game start';
    
    return (
      <li key={move} className="mb-1">
        <button
          className={`px-3 py-1 w-full text-left rounded ${
            move === currentStep
              ? 'bg-blue-100 text-blue-700 font-medium'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="history mt-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200 max-w-md mx-auto">
      <h3 className="text-lg font-medium mb-2 text-gray-800">Game History</h3>
      <ul className="text-sm max-h-40 overflow-y-auto">{moves}</ul>
    </div>
  );
};

export default History;