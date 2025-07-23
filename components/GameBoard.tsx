'use client'

import { useRef, useEffect } from 'react'
import { GameState, GameConfig, Direction } from '@/types'
import { useSwipeGesture } from '@/hooks/useSwipeGesture'

interface GameBoardProps {
  gameState: GameState
  gameConfig: GameConfig
  onClick: () => void
  onDirectionChange: (direction: Direction) => void
}

export default function GameBoard({ 
  gameState, 
  gameConfig, 
  onClick, 
  onDirectionChange 
}: GameBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Setup swipe gesture handling
  const { handleTouchStart, handleTouchEnd, handleTouchCancel } = useSwipeGesture({
    onSwipe: onDirectionChange,
    minSwipeDistance: 30,
    maxSwipeTime: 1000
  })

  // Handle click vs swipe - only trigger click if no swipe occurred
  const handleCanvasClick = (e: React.MouseEvent) => {
    // Only handle click on non-touch devices or if it's a short tap
    onClick()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw game board background
    ctx.fillStyle = '#111111'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid lines (subtle)
    ctx.strokeStyle = '#1a1a1a'
    ctx.lineWidth = 1
    
    for (let x = 0; x <= gameConfig.boardWidth; x++) {
      ctx.beginPath()
      ctx.moveTo(x * gameConfig.cellSize, 0)
      ctx.lineTo(x * gameConfig.cellSize, canvas.height)
      ctx.stroke()
    }
    
    for (let y = 0; y <= gameConfig.boardHeight; y++) {
      ctx.beginPath()
      ctx.moveTo(0, y * gameConfig.cellSize)
      ctx.lineTo(canvas.width, y * gameConfig.cellSize)
      ctx.stroke()
    }

    // Draw snake
    gameState.snake.forEach((segment, index) => {
      const isHead = index === 0
      
      // Snake head is brighter
      ctx.fillStyle = isHead ? '#00ff41' : '#00cc33'
      
      const x = segment.x * gameConfig.cellSize
      const y = segment.y * gameConfig.cellSize
      
      // Draw rounded rectangle for snake segments
      ctx.beginPath()
      ctx.roundRect(
        x + 1, 
        y + 1, 
        gameConfig.cellSize - 2, 
        gameConfig.cellSize - 2, 
        4
      )
      ctx.fill()
      
      // Add eye for snake head
      if (isHead) {
        ctx.fillStyle = '#000000'
        const eyeSize = 2
        const eyeOffset = 4
        
        // Determine eye position based on direction
        let eyeX = x + gameConfig.cellSize / 2
        let eyeY = y + gameConfig.cellSize / 2
        
        switch (gameState.direction) {
          case 'UP':
            eyeY = y + eyeOffset
            break
          case 'DOWN':
            eyeY = y + gameConfig.cellSize - eyeOffset
            break
          case 'LEFT':
            eyeX = x + eyeOffset
            break
          case 'RIGHT':
            eyeX = x + gameConfig.cellSize - eyeOffset
            break
        }
        
        ctx.beginPath()
        ctx.arc(eyeX - 2, eyeY, eyeSize, 0, 2 * Math.PI)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(eyeX + 2, eyeY, eyeSize, 0, 2 * Math.PI)
        ctx.fill()
      }
    })

    // Draw food with pulsing effect
    const time = Date.now() / 1000
    const pulse = 0.9 + Math.sin(time * 4) * 0.1
    
    ctx.fillStyle = '#ff0040'
    const foodX = gameState.food.x * gameConfig.cellSize
    const foodY = gameState.food.y * gameConfig.cellSize
    const size = gameConfig.cellSize * pulse
    const offset = (gameConfig.cellSize - size) / 2
    
    ctx.beginPath()
    ctx.arc(
      foodX + gameConfig.cellSize / 2,
      foodY + gameConfig.cellSize / 2,
      size / 2 - 1,
      0,
      2 * Math.PI
    )
    ctx.fill()

    // Draw game status overlay
    if (gameState.gameStatus === 'PAUSED') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = '#ffffff'
      ctx.font = '24px Monaco, monospace'
      ctx.textAlign = 'center'
      ctx.fillText(
        'PAUSED',
        canvas.width / 2,
        canvas.height / 2
      )
    } else if (gameState.gameStatus === 'READY') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = '#00ff41'
      ctx.font = '20px Monaco, monospace'
      ctx.textAlign = 'center'
      ctx.fillText(
        'READY?',
        canvas.width / 2,
        canvas.height / 2 - 10
      )
      
      ctx.fillStyle = '#ffffff'
      ctx.font = '12px Monaco, monospace'
      ctx.fillText(
        'Swipe or tap to start',
        canvas.width / 2,
        canvas.height / 2 + 15
      )
    }

  }, [gameState, gameConfig])

  return (
    <canvas
      ref={canvasRef}
      width={gameConfig.boardWidth * gameConfig.cellSize}
      height={gameConfig.boardHeight * gameConfig.cellSize}
      className="game-canvas cursor-pointer select-none"
      onClick={handleCanvasClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      style={{
        touchAction: 'none',
        maxWidth: '100%',
        height: 'auto'
      }}
    />
  )
}