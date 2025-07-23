import { GameStatus } from '../types'

interface GameStatsProps {
  score: number
  highScore: number
  gameStatus: GameStatus
}

export default function GameStats({ score, highScore, gameStatus }: GameStatsProps) {
  return (
    <div className="flex justify-between items-center space-x-4">
      <div className="text-center">
        <div className="score-display text-snake-green">
          {score}
        </div>
        <div className="text-xs text-gray-400">Score</div>
      </div>
      
      <div className="text-center">
        <div className="score-display text-yellow-400">
          {highScore}
        </div>
        <div className="text-xs text-gray-400">Best</div>
      </div>
      
      <div className="text-center">
        <div className="score-display text-blue-400">
          {gameStatus === 'PLAYING' ? 'Playing' : 
           gameStatus === 'PAUSED' ? 'Paused' : 
           gameStatus === 'GAME_OVER' ? 'Game Over' : 'Ready'}
        </div>
        <div className="text-xs text-gray-400">Status</div>
      </div>
    </div>
  )
}