'use client'

import { useEffect, useRef } from 'react'

const BRANCH_PROBABILITY = 0.3
const COMMIT_PROBABILITY = 0.2
const SPEED = 0.5

interface Branch {
  x: number
  y: number
  length: number
  angle: number
  commits: { x: number; y: number }[]
}

export default function GitBackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const branches: Branch[] = [
      { x: canvas.width / 2, y: canvas.height, length: 0, angle: -Math.PI / 2, commits: [] }
    ]

    function drawBranch(branch: Branch) {
      ctx.beginPath()
      ctx.moveTo(branch.x, branch.y)
      const endX = branch.x + Math.cos(branch.angle) * branch.length
      const endY = branch.y + Math.sin(branch.angle) * branch.length
      ctx.lineTo(endX, endY)
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)' // Red color for branches
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw commits
      branch.commits.forEach(commit => {
        ctx.beginPath()
        ctx.arc(commit.x, commit.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)' // White color for commits
        ctx.fill()
      })
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      branches.forEach((branch, index) => {
        branch.length += SPEED
        drawBranch(branch)

        const endX = branch.x + Math.cos(branch.angle) * branch.length
        const endY = branch.y + Math.sin(branch.angle) * branch.length

        // Adding commit points with probability
        if (Math.random() < COMMIT_PROBABILITY) {
          branch.commits.push({ x: endX, y: endY })
        }

        // Creating new branches with probability
        if (Math.random() < BRANCH_PROBABILITY && branch.length > 50) {
          const newAngle = branch.angle + (Math.random() - 0.5)
          branches.push({
            x: endX,
            y: endY,
            length: 0,
            angle: newAngle,
            commits: []
          })
        }

        // Remove branches that go off-screen
        if (endY < 0 || endX < 0 || endX > canvas.width) {
          branches.splice(index, 1)
        }
      })

      // Reset if no branches are left
      if (branches.length === 0) {
        branches.push({
          x: canvas.width / 2,
          y: canvas.height,
          length: 0,
          angle: -Math.PI / 2,
          commits: []
        })
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}

