import React from 'react';
import Cell from './Cell.tsx';

interface BoardProps {
  squares: (string | null)[];
  onClick: (i: number) => void;
  winningLine: number[] | null;
}

const Board: React.FC<BoardProps> = ({ squares, onClick, winningLine }) => {
  const renderCell = (i: number) => {
    const isWinningCell = winningLine ? winningLine.includes(i) : false;
    
    return (
      <Cell 
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinningCell={isWinningCell}
        index={i}
      />
    );
  };

  return (
    <div className="board-container w-full max-w-md mx-auto">
      <div className="aspect-square w-full grid grid-cols-3 gap-2 md:gap-3">
        {Array(9).fill(null).map((_, i) => renderCell(i))}
      </div>
    </div>
  );
};

export default Board;