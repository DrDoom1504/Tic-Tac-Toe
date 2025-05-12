import { PlayerNames } from './types.ts';

/**
 * Calculates the winner of the game
 * @param squares Current state of the board
 * @returns The winner ('X' or 'O') and winning line or null if no winner
 */
export function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]  
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  
  return null;
}

/**
 * Checks if the game is a draw
 * @param squares Current state of the board
 * @returns True if the game is a draw, false otherwise
 */
export function isDraw(squares: (string | null)[]) {
  if (calculateWinner(squares)) {
    return false;
  }
  
  return squares.every(square => square !== null);
}


export function getGameStatus(
  winner: { winner: string; line: number[] } | null, 
  isDraw: boolean, 
  xIsNext: boolean,
  playerNames: PlayerNames
) {
  if (winner) {
    const winnerName = winner.winner === 'X' ? playerNames.X : playerNames.O;
    return `Winner: ${winnerName}!`;
  } else if (isDraw) {
    return "Game ended in a draw!";
  } else {
    const nextPlayer = xIsNext ? playerNames.X : playerNames.O;
    return `Next player: ${nextPlayer}`;
  }
}