'use client'

import React, { useState, useEffect, useMemo } from 'react'
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
  const [mounted, setMounted] = useState<boolean>(false)

  // Génération optimisée des étoiles avec useMemo
  // Les positions x et y sont calculées de manière aléatoire
  // une seule fois au montage du composant, garantissant une apparition unique
  // pour chaque chargement de page.
  const stars = useMemo<StarDot[]>(() => {
    return Array.from({ length: 600 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1, // 2-5px
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 6, // 4-7s
      opacity: Math.random() * 0.6 + 0.8, // 0.6-1.2
    }))
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Hydration guard pour éviter les erreurs SSR
  if (!mounted) {
    return null
  }

  return (
    <div 
      className="fixed inset-0 pointer-events-none select-none overflow-hidden "
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
            boxShadow: '0 0 6px hsl(var(--primary))', 
            
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
