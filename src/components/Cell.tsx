import React from 'react';
import { X, Circle } from 'lucide-react';

interface CellProps {
  value: string | null;
  onClick: () => void;
  isWinningCell: boolean;
  index: number;
}

const Cell: React.FC<CellProps> = ({ value, onClick, isWinningCell, index }) => {
  const renderIcon = () => {
    if (!value) return null;
    
    if (value === 'X') {
      return <X className={`w-12 h-12 md:w-16 md:h-16 transition-all duration-300 ${isWinningCell ? 'text-green-500 scale-110' : 'text-blue-500'}`} />;
    } else {
      return <Circle className={`w-12 h-12 md:w-16 md:h-16 transition-all duration-300 ${isWinningCell ? 'text-green-500 scale-110' : 'text-purple-500'}`} />;
    }
  };

  const delay = index * 0.05;
  
  return (
    <button
      className={`cell aspect-square flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 ${
        isWinningCell ? 'animate-pulse bg-green-50 dark:bg-green-900/20' : ''
      }`}
      onClick={onClick}
      style={{ 
        animationDelay: `${delay}s`,
        animationFillMode: 'backwards'
      }}
      aria-label={value ? `Cell with ${value}` : "Empty cell"}
      disabled={Boolean(value)}
    >
      {renderIcon()}
    </button>
  );
};

export default Cell;