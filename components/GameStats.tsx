interface GameStatsProps {
  score: number
  highScore: number
  gamesPlayed: number
}

export default function GameStats({ score, highScore, gamesPlayed }: GameStatsProps) {
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
          {gamesPlayed}
        </div>
        <div className="text-xs text-gray-400">Games</div>
      </div>
    </div>
  )
}