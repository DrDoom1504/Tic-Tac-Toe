import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/board.tsx';
import GameInfo from './components/Gameinfo.tsx';
import History from './components/History.tsx';
import { calculateWinner, isDraw, getGameStatus } from './lib/gameLogic.ts';
import { GameHistory, Scores, PlayerNames } from './lib/types.ts';



function App() {
  const [history, setHistory] = useState<GameHistory[]>([{ 
    squares: Array(9).fill(null),
    position: null
  }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState<Scores>({ X: 0, O: 0, draws: 0 });
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isEditingNames, setIsEditingNames] = useState(true);
  const [playerNames, setPlayerNames] = useState<PlayerNames>({
    X: '',
    O: ''
  });

  const current = history[stepNumber];
  const winnerInfo = calculateWinner(current.squares);
  const gameIsDraw = isDraw(current.squares);
  
  useEffect(() => {
    if (stepNumber > 0 && !gameCompleted && (winnerInfo || gameIsDraw)) {
      setGameCompleted(true);
      if (winnerInfo) {
        setScores(prev => ({
          ...prev,
          [winnerInfo.winner]: prev[winnerInfo.winner as keyof Scores] + 1
        }));
      } else if (gameIsDraw) {
        setScores(prev => ({
          ...prev,
          draws: prev.draws + 1
        }));
      }
    }
  }, [winnerInfo, gameIsDraw, stepNumber, gameCompleted]);

  const handleClick = (i: number) => {
    const currentHistory = history.slice(0, stepNumber + 1);
    const currentSquares = [...current.squares];
    
    if (calculateWinner(currentSquares) || currentSquares[i]) {
      return;
    }
    
    currentSquares[i] = xIsNext ? 'X' : 'O';
    
    setHistory([
      ...currentHistory, 
      { 
        squares: currentSquares,
        position: i
      }
    ]);
    setStepNumber(currentHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  };

  const resetGame = () => {
  setHistory([{ 
    squares: Array(9).fill(null),
    position: null
  }]);
  setStepNumber(0);
  setXIsNext(true);
  setGameCompleted(false);
  setIsEditingNames(true);
  setScores({ X: 0, O: 0, draws: 0 }); 
};

const resetBoard = () => {
  setHistory([{ 
    squares: Array(9).fill(null),
    position: null
  }]);
  setStepNumber(0);
  setXIsNext(true);
  setGameCompleted(false);
};

  

  const handleNameSubmit = (names: PlayerNames) => {
    setPlayerNames(names);
    setIsEditingNames(false);
  };

  const status = getGameStatus(winnerInfo, gameIsDraw, xIsNext, playerNames);

  if (isEditingNames) {
    return (
      <div className="min-h-screen bg-slate-800">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Tic Tac Toe</h1>
            <p className="text-white">A classic game</p>
          </header>
          <GameInfo
            status={status}
            scores={scores}
            onReset={resetGame}
            playerNames={playerNames}
            isEditingNames={isEditingNames}
            onNameSubmit={handleNameSubmit}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Tic Tac Toe</h1>
          <p className="text-blue-600">A classic game </p>
        </header>

        <main className="max-w-lg mx-auto">
          <Board 
            squares={current.squares}
            onClick={handleClick}
            winningLine={winnerInfo ? winnerInfo.line : null}
          />
          
        <GameInfo
          status={status}
          scores={scores}
          onReset={resetGame}
          onResetBoard={resetBoard} 
          playerNames={playerNames}
          isEditingNames={isEditingNames}
          onNameSubmit={handleNameSubmit}
/>
          
          <History 
            history={history}
            currentStep={stepNumber}
            jumpTo={jumpTo}
            playerNames={playerNames}
          />
        </main>
      </div>
    </div>
  );
}

export default App;