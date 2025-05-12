export type Player = 'X' | 'O' | null;

export interface BoardState {
  squares: Player[];
}

export interface GameHistory {
  squares: Player[];
  position: number | null;
}

export interface Scores {
  X: number;
  O: number;
  draws: number;
}

export interface PlayerNames {
  X: string;
  O: string;
}