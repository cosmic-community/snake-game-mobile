'use client'

import { useRef, useCallback } from 'react'
import { Direction } from '@/types'

interface SwipeGestureOptions {
  onSwipe: (direction: Direction) => void
  minSwipeDistance?: number
  maxSwipeTime?: number
}

export function useSwipeGesture({
  onSwipe,
  minSwipeDistance = 30,
  maxSwipeTime = 1000
}: SwipeGestureOptions) {
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    if (!touch) return

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    }
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const touchStart = touchStartRef.current
    if (!touchStart) return

    const touch = e.changedTouches[0]
    if (!touch) return

    const touchEnd = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    }

    const deltaX = touchEnd.x - touchStart.x
    const deltaY = touchEnd.y - touchStart.y
    const deltaTime = touchEnd.time - touchStart.time

    // Check if swipe was too slow
    if (deltaTime > maxSwipeTime) {
      touchStartRef.current = null
      return
    }

    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)

    // Check if swipe distance is sufficient
    if (Math.max(absX, absY) < minSwipeDistance) {
      touchStartRef.current = null
      return
    }

    // Determine swipe direction based on the larger movement
    let direction: Direction
    if (absX > absY) {
      // Horizontal swipe
      direction = deltaX > 0 ? 'RIGHT' : 'LEFT'
    } else {
      // Vertical swipe
      direction = deltaY > 0 ? 'DOWN' : 'UP'
    }

    onSwipe(direction)
    touchStartRef.current = null
  }, [onSwipe, minSwipeDistance, maxSwipeTime])

  const handleTouchCancel = useCallback(() => {
    touchStartRef.current = null
  }, [])

  return {
    handleTouchStart,
    handleTouchEnd,
    handleTouchCancel
  }
}