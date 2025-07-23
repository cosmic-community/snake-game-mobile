export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  nextDirection: Direction;
  score: number;
  highScore: number;
  gameStatus: GameStatus;
  gameSpeed: number;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type GameStatus = 'PLAYING' | 'PAUSED' | 'GAME_OVER' | 'READY';

export interface GameConfig {
  boardWidth: number;
  boardHeight: number;
  cellSize: number;
  initialSpeed: number;
  speedIncrement: number;
  maxSpeed: number;
}

export interface TouchControls {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

export interface GameStats {
  gamesPlayed: number;
  totalScore: number;
  averageScore: number;
  bestGame: number;
}