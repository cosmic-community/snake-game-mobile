'use client'

import { useState, useEffect } from 'react'
import GameBoard from '@/components/GameBoard'
import GameControls from '@/components/GameControls'
import GameStats from '@/components/GameStats'
import GameOverScreen from '@/components/GameOverScreen'
import { GameState, GameConfig, Direction, GameStatus } from '@/types'
import { useGameLogic } from '@/hooks/useGameLogic'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const INITIAL_GAME_CONFIG: GameConfig = {
  boardWidth: 20,
  boardHeight: 20,
  cellSize: 20,
  initialSpeed: 150,
  speedIncrement: 5,
  maxSpeed: 80,
}

export default function HomePage() {
  const [gameConfig, setGameConfig] = useState<GameConfig>(INITIAL_GAME_CONFIG)
  const [highScore, setHighScore] = useLocalStorage('snake-high-score', 0)
  const [gamesPlayed, setGamesPlayed] = useLocalStorage('snake-games-played', 0)
  
  const {
    gameState,
    startGame,
    pauseGame,
    resumeGame,
    restartGame,
    changeDirection,
    isGameRunning
  } = useGameLogic(gameConfig, highScore)

  // Update high score when game ends
  useEffect(() => {
    if (gameState.gameStatus === 'GAME_OVER' && gameState.score > highScore) {
      setHighScore(gameState.score)
      setGamesPlayed(prev => prev + 1)
    }
  }, [gameState.gameStatus, gameState.score, highScore, setHighScore, setGamesPlayed])

  // Adjust game board size based on screen size
  useEffect(() => {
    const updateGameConfig = () => {
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight
      
      // Calculate optimal board size for mobile
      const maxBoardWidth = Math.min(screenWidth - 40, 400)
      const maxBoardHeight = Math.min(screenHeight - 200, 400)
      
      const cellSize = Math.floor(Math.min(maxBoardWidth / 20, maxBoardHeight / 20))
      const boardWidth = Math.floor(maxBoardWidth / cellSize)
      const boardHeight = Math.floor(maxBoardHeight / cellSize)
      
      setGameConfig(prev => ({
        ...prev,
        boardWidth: Math.max(15, Math.min(25, boardWidth)),
        boardHeight: Math.max(15, Math.min(25, boardHeight)),
        cellSize: Math.max(15, Math.min(25, cellSize))
      }))
    }

    updateGameConfig()
    window.addEventListener('resize', updateGameConfig)
    return () => window.removeEventListener('resize', updateGameConfig)
  }, [])

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          changeDirection('UP')
          break
        case 'ArrowDown':
          e.preventDefault()
          changeDirection('DOWN')
          break
        case 'ArrowLeft':
          e.preventDefault()
          changeDirection('LEFT')
          break
        case 'ArrowRight':
          e.preventDefault()
          changeDirection('RIGHT')
          break
        case ' ':
          e.preventDefault()
          if (gameState.gameStatus === 'PLAYING') {
            pauseGame()
          } else if (gameState.gameStatus === 'PAUSED') {
            resumeGame()
          }
          break
        case 'Enter':
          e.preventDefault()
          if (gameState.gameStatus === 'GAME_OVER') {
            restartGame()
          } else if (gameState.gameStatus === 'READY') {
            startGame()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameState.gameStatus, changeDirection, pauseGame, resumeGame, restartGame, startGame])

  const handleDirectionChange = (direction: Direction) => {
    if (gameState.gameStatus === 'READY') {
      startGame()
    }
    changeDirection(direction)
  }

  const handleGameBoardClick = () => {
    if (gameState.gameStatus === 'PLAYING') {
      pauseGame()
    } else if (gameState.gameStatus === 'PAUSED') {
      resumeGame()
    } else if (gameState.gameStatus === 'READY') {
      startGame()
    }
  }

  return (
    <div className="min-h-screen bg-game-bg flex flex-col items-center justify-center p-4 game-container">
      <div className="w-full max-w-md mx-auto space-y-4">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-snake-green">Snake Game</h1>
          <GameStats 
            score={gameState.score}
            highScore={Math.max(highScore, gameState.score)}
            gamesPlayed={gamesPlayed}
          />
        </div>

        {/* Game Board */}
        <div className="flex justify-center">
          <GameBoard
            gameState={gameState}
            gameConfig={gameConfig}
            onClick={handleGameBoardClick}
          />
        </div>

        {/* Game Status Message */}
        <div className="text-center min-h-[24px]">
          {gameState.gameStatus === 'READY' && (
            <p className="text-gray-400 text-sm">Tap controls or press arrow keys to start</p>
          )}
          {gameState.gameStatus === 'PAUSED' && (
            <p className="text-yellow-400 text-sm animate-pulse">Game Paused - Tap to resume</p>
          )}
          {gameState.gameStatus === 'PLAYING' && (
            <p className="text-green-400 text-sm">Playing - Tap board to pause</p>
          )}
        </div>

        {/* Touch Controls */}
        <GameControls
          onDirectionChange={handleDirectionChange}
          gameStatus={gameState.gameStatus}
          onPause={pauseGame}
          onResume={resumeGame}
          onRestart={restartGame}
        />

        {/* Game Over Screen */}
        {gameState.gameStatus === 'GAME_OVER' && (
          <GameOverScreen
            score={gameState.score}
            highScore={Math.max(highScore, gameState.score)}
            isNewHighScore={gameState.score > highScore}
            onRestart={restartGame}
          />
        )}

        {/* Instructions */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>🐍 Eat red food to grow and increase score</p>
          <p>⚡ Game speeds up as you progress</p>
          <p>💥 Avoid hitting walls or yourself</p>
        </div>
      </div>
    </div>
  )
}