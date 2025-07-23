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
    <div className="flex flex-col items-center space-y-4 mt-4">
      {/* Directional Controls - Compact Grid Layout */}
      <div className="grid grid-cols-3 gap-2 w-32">
        {/* Empty space */}
        <div></div>
        
        {/* Up Button */}
        <button
          className="control-button h-12 w-12 flex items-center justify-center text-xl"
          onClick={() => handleDirectionClick('UP')}
          aria-label="Move Up"
        >
          ↑
        </button>
        
        {/* Empty space */}
        <div></div>

        {/* Left Button */}
        <button
          className="control-button h-12 w-12 flex items-center justify-center text-xl"
          onClick={() => handleDirectionClick('LEFT')}
          aria-label="Move Left"
        >
          ←
        </button>
        
        {/* Empty center space */}
        <div></div>
        
        {/* Right Button */}
        <button
          className="control-button h-12 w-12 flex items-center justify-center text-xl"
          onClick={() => handleDirectionClick('RIGHT')}
          aria-label="Move Right"
        >
          →
        </button>

        {/* Empty space */}
        <div></div>
        
        {/* Down Button */}
        <button
          className="control-button h-12 w-12 flex items-center justify-center text-xl"
          onClick={() => handleDirectionClick('DOWN')}
          aria-label="Move Down"
        >
          ↓
        </button>
        
        {/* Empty space */}
        <div></div>
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
      <div className="text-center text-xs text-gray-500 md:hidden px-4">
        <p>🖐️ Swipe on game board to control snake</p>
        <p>👆 Tap directional arrows for precise control</p>
        <p>🎯 Tap game board to pause/resume</p>
      </div>

      {/* Desktop instructions */}
      <div className="text-center text-xs text-gray-500 hidden md:block">
        <p>Use arrow keys or directional buttons</p>
        <p>Tap game board to pause/resume</p>
      </div>
    </div>
  )
}