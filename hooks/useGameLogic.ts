'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { GameState, GameConfig, Direction, Position } from '@/types'

const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
]

export function useGameLogic(gameConfig: GameConfig, highScore: number) {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: { x: 15, y: 15 },
    direction: 'RIGHT',
    nextDirection: 'RIGHT',
    score: 0,
    highScore,
    gameStatus: 'READY',
    gameSpeed: gameConfig.initialSpeed
  })

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)
  const lastUpdateRef = useRef<number>(0)

  // Generate random food position
  const generateFood = useCallback((snake: Position[]): Position => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * gameConfig.boardWidth),
        y: Math.floor(Math.random() * gameConfig.boardHeight)
      }
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [gameConfig.boardWidth, gameConfig.boardHeight])

  // Check collision with walls or self
  const checkCollision = useCallback((head: Position, snake: Position[]): boolean => {
    // Wall collision
    if (
      head.x < 0 ||
      head.x >= gameConfig.boardWidth ||
      head.y < 0 ||
      head.y >= gameConfig.boardHeight
    ) {
      return true
    }

    // Self collision - check against snake body (excluding the head which is at index 0)
    // We only check against the body segments, not the current head position
    const snakeBody = snake.slice(1)
    return snakeBody.some(segment => segment.x === head.x && segment.y === head.y)
  }, [gameConfig.boardWidth, gameConfig.boardHeight])

  // Get next position based on direction
  const getNextPosition = useCallback((head: Position, direction: Direction): Position => {
    switch (direction) {
      case 'UP':
        return { x: head.x, y: head.y - 1 }
      case 'DOWN':
        return { x: head.x, y: head.y + 1 }
      case 'LEFT':
        return { x: head.x - 1, y: head.y }
      case 'RIGHT':
        return { x: head.x + 1, y: head.y }
    }
  }, [])

  // Game update logic
  const updateGame = useCallback(() => {
    setGameState(prevState => {
      if (prevState.gameStatus !== 'PLAYING') {
        return prevState
      }

      const currentDirection = prevState.nextDirection
      const head = prevState.snake[0]
      
      // Add null check for head - should never be undefined in valid game state
      if (!head) {
        return {
          ...prevState,
          gameStatus: 'GAME_OVER'
        }
      }
      
      const newHead = getNextPosition(head, currentDirection)

      // Check collision
      if (checkCollision(newHead, prevState.snake)) {
        return {
          ...prevState,
          gameStatus: 'GAME_OVER'
        }
      }

      const newSnake = [newHead, ...prevState.snake]

      // Check if food is eaten
      const foodEaten = newHead.x === prevState.food.x && newHead.y === prevState.food.y

      if (!foodEaten) {
        newSnake.pop() // Remove tail if no food eaten
      }

      const newScore = foodEaten ? prevState.score + 10 : prevState.score
      const newSpeed = Math.max(
        gameConfig.maxSpeed,
        gameConfig.initialSpeed - Math.floor(newScore / 50) * gameConfig.speedIncrement
      )

      return {
        ...prevState,
        snake: newSnake,
        food: foodEaten ? generateFood(newSnake) : prevState.food,
        direction: currentDirection,
        score: newScore,
        gameSpeed: newSpeed
      }
    })
  }, [generateFood, getNextPosition, checkCollision, gameConfig])

  // Game loop
  useEffect(() => {
    if (gameState.gameStatus === 'PLAYING') {
      gameLoopRef.current = setTimeout(() => {
        updateGame()
      }, gameState.gameSpeed)
    }

    return () => {
      if (gameLoopRef.current) {
        clearTimeout(gameLoopRef.current)
      }
    }
  }, [gameState, updateGame])

  // Initialize game
  const initializeGame = useCallback(() => {
    const initialSnake = [...INITIAL_SNAKE]
    setGameState({
      snake: initialSnake,
      food: generateFood(initialSnake),
      direction: 'RIGHT',
      nextDirection: 'RIGHT',
      score: 0,
      highScore,
      gameStatus: 'READY',
      gameSpeed: gameConfig.initialSpeed
    })
  }, [generateFood, highScore, gameConfig.initialSpeed])

  // Game control functions
  const startGame = useCallback(() => {
    setGameState(prev => ({ ...prev, gameStatus: 'PLAYING' }))
  }, [])

  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, gameStatus: 'PAUSED' }))
  }, [])

  const resumeGame = useCallback(() => {
    setGameState(prev => ({ ...prev, gameStatus: 'PLAYING' }))
  }, [])

  const restartGame = useCallback(() => {
    initializeGame()
  }, [initializeGame])

  const changeDirection = useCallback((newDirection: Direction) => {
    setGameState(prev => {
      // Prevent reversing into self
      const opposites: Record<Direction, Direction> = {
        UP: 'DOWN',
        DOWN: 'UP',
        LEFT: 'RIGHT',
        RIGHT: 'LEFT'
      }

      if (opposites[newDirection] === prev.direction) {
        return prev
      }

      return { ...prev, nextDirection: newDirection }
    })
  }, [])

  // Initialize game on mount
  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  const isGameRunning = gameState.gameStatus === 'PLAYING'

  return {
    gameState,
    startGame,
    pauseGame,
    resumeGame,
    restartGame,
    changeDirection,
    isGameRunning
  }
}