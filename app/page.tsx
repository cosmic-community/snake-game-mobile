'use client'

import { useState, useEffect } from 'react'
import GameBoard from '@/components/GameBoard'
import GameControls from '@/components/GameControls'
import GameStats from '@/components/GameStats'
import GameOverScreen from '@/components/GameOverScreen'
import { useGameLogic } from '@/hooks/useGameLogic'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { GameConfig, Direction } from '@/types'

const GAME_CONFIG: GameConfig = {
  boardWidth: 20,
  boardHeight: 20,
  cellSize: 20,
  initialSpeed: 200,
  maxSpeed: 80,
  speedIncrement: 10
}

export default function Home() {
  const [highScore, setHighScore] = useLocalStorage('snakeHighScore', 0)
  const [isMounted, setIsMounted] = useState(false)

  const {
    gameState,
    startGame,
    pauseGame,
    resumeGame,
    restartGame,
    changeDirection,
    isGameRunning
  } = useGameLogic(GAME_CONFIG, highScore)

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isGameRunning) return

      const keyMap: Record<string, Direction> = {
        'ArrowUp': 'UP',
        'ArrowDown': 'DOWN',
        'ArrowLeft': 'LEFT',
        'ArrowRight': 'RIGHT',
        'w': 'UP',
        'W': 'UP',
        's': 'DOWN',
        'S': 'DOWN',
        'a': 'LEFT',
        'A': 'LEFT',
        'd': 'RIGHT',
        'D': 'RIGHT'
      }

      const direction = keyMap[event.key]
      if (direction) {
        event.preventDefault()
        changeDirection(direction)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [changeDirection, isGameRunning])

  // Update high score
  useEffect(() => {
    if (gameState.score > highScore) {
      setHighScore(gameState.score)
    }
  }, [gameState.score, highScore, setHighScore])

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle game board click/tap
  const handleGameBoardClick = () => {
    if (gameState.gameStatus === 'READY') {
      startGame()
    } else if (gameState.gameStatus === 'PLAYING') {
      pauseGame()
    } else if (gameState.gameStatus === 'PAUSED') {
      resumeGame()
    }
  }

  // Handle swipe direction change
  const handleSwipeDirection = (direction: Direction) => {
    if (gameState.gameStatus === 'READY') {
      // Start the game and set initial direction
      startGame()
      changeDirection(direction)
    } else if (gameState.gameStatus === 'PLAYING') {
      // Change direction during gameplay
      changeDirection(direction)
    }
  }

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-900 py-4 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-2 font-mono">
            🐍 SNAKE GAME
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Classic Snake Game - Swipe to control on mobile!
          </p>
        </div>

        {/* Game Stats */}
        <GameStats 
          score={gameState.score}
          highScore={gameState.highScore}
          gameStatus={gameState.gameStatus}
        />

        {/* Game Board Container */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <GameBoard
              gameState={gameState}
              gameConfig={GAME_CONFIG}
              onClick={handleGameBoardClick}
              onDirectionChange={handleSwipeDirection}
            />
            
            {/* Game Over Overlay */}
            {gameState.gameStatus === 'GAME_OVER' && (
              <GameOverScreen
                finalScore={gameState.score}
                highScore={gameState.highScore}
                onRestart={restartGame}
              />
            )}
          </div>
        </div>

        {/* Game Controls */}
        <GameControls
          onDirectionChange={changeDirection}
          gameStatus={gameState.gameStatus}
          onPause={pauseGame}
          onResume={resumeGame}
          onRestart={restartGame}
        />

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-xs">
          <p>Built with Next.js and TypeScript</p>
          <p className="mt-1">Mobile: Swipe to move • Desktop: Arrow keys or WASD</p>
        </div>
      </div>
    </main>
  )
}