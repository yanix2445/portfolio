'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface StarDot {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  opacity: number
}

const FloatingDots: React.FC = () => {
  const [stars, setStars] = useState<StarDot[] | null>(null)

  useEffect(() => {
    // La génération des étoiles est déplacée dans useEffect
    // pour garantir qu'elle ne se produit que sur le client.
    const generatedStars = Array.from({ length: 700 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2, // 2-5px
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 4, // 4-7s
      opacity: Math.random() * 0.6 + 0.6, // 0.6-1.2
    }))
    setStars(generatedStars)
  }, [])

  // N'afficher le composant qu'une fois les étoiles générées
  if (!stars) {
    return null
  }

  return (
    <div 

      className="fixed inset-0 pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-primary hidden md:block"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            willChange: 'transform, opacity',
            boxShadow: '0 0 4px hsl(var(--primary))', // Effet de lueur
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, star.opacity, 0],
            scale: [0.5, 1.4, 0.5],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: [0.42, 0, 0.58, 1],
          }}
        />
      ))}
    </div>
  )
}

export default FloatingDots
