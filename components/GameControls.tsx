'use client'

import { Direction, GameStatus } from '@/types'

interface GameControlsProps {
  onDirectionChange: (direction: Direction) => void
  gameStatus: GameStatus
  onPause: () => void
  onResume: () => void
  onRestart: () => void
}

export default function GameControls({
  onDirectionChange,
  gameStatus,
  onPause,
  onResume,
  onRestart
}: GameControlsProps) {
  const handleDirectionClick = (direction: Direction) => {
    onDirectionChange(direction)
  }

  const handleActionClick = () => {
    if (gameStatus === 'PLAYING') {
      onPause()
    } else if (gameStatus === 'PAUSED') {
      onResume()
    } else if (gameStatus === 'GAME_OVER') {
      onRestart()
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Directional Controls */}
      <div className="relative">
        {/* Up Button */}
        <button
          className="control-button absolute -top-14 left-1/2 transform -translate-x-1/2"
          onClick={() => handleDirectionClick('UP')}
          aria-label="Move Up"
        >
          ↑
        </button>

        {/* Left and Right Buttons */}
        <div className="flex items-center space-x-16">
          <button
            className="control-button"
            onClick={() => handleDirectionClick('LEFT')}
            aria-label="Move Left"
          >
            ←
          </button>
          <button
            className="control-button"
            onClick={() => handleDirectionClick('RIGHT')}
            aria-label="Move Right"
          >
            →
          </button>
        </div>

        {/* Down Button */}
        <button
          className="control-button absolute -bottom-14 left-1/2 transform -translate-x-1/2"
          onClick={() => handleDirectionClick('DOWN')}
          aria-label="Move Down"
        >
          ↓
        </button>
      </div>

      {/* Action Button */}
      <div className="flex space-x-4">
        <button
          className="game-button px-6 py-3 text-lg"
          onClick={handleActionClick}
        >
          {gameStatus === 'PLAYING' && '⏸️ Pause'}
          {gameStatus === 'PAUSED' && '▶️ Resume'}
          {gameStatus === 'GAME_OVER' && '🔄 Restart'}
          {gameStatus === 'READY' && '🎮 Start'}
        </button>
      </div>

      {/* Mobile-specific instructions */}
      <div className="text-center text-xs text-gray-500 md:hidden">
        <p>Tap directional arrows to move</p>
        <p>Tap game board to pause/resume</p>
      </div>
    </div>
  )
}