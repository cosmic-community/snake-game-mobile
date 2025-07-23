interface GameOverScreenProps {
  score: number
  highScore: number
  isNewHighScore: boolean
  onRestart: () => void
}

export default function GameOverScreen({
  score,
  highScore,
  isNewHighScore,
  onRestart
}: GameOverScreenProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-button-bg border border-game-border rounded-lg p-6 text-center space-y-4 max-w-sm mx-4">
        <h2 className="text-2xl font-bold text-food-red">Game Over!</h2>
        
        {isNewHighScore && (
          <div className="text-yellow-400 animate-bounce-subtle">
            🎉 New High Score! 🎉
          </div>
        )}
        
        <div className="space-y-2">
          <div className="text-lg">
            Final Score: <span className="text-snake-green font-bold">{score}</span>
          </div>
          <div className="text-sm text-gray-400">
            High Score: <span className="text-yellow-400">{highScore}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <button
            className="game-button w-full py-3 text-lg bg-snake-green text-game-bg hover:bg-green-400"
            onClick={onRestart}
          >
            🎮 Play Again
          </button>
          <p className="text-xs text-gray-500">
            Press Enter or tap to restart
          </p>
        </div>
      </div>
    </div>
  )
}