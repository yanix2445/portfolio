{/*'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Interface pour définir la structure d'une étoile
interface StarDot {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  opacity: number
}

// Composant des points flottants qui apparaissent après l'hydratation
const FloatingDots: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [stars, setStars] = useState<StarDot[]>([]);

  useEffect(() => {
    // Ce hook s'exécute uniquement côté client
    // Nous mettons d'abord à jour l'état `isMounted` pour autoriser le rendu
    setIsMounted(true);
    
    // Puis nous générons les étoiles.
    // La génération des positions aléatoires se fait ici
    // pour s'assurer qu'elle est déterministe côté client uniquement.
    const generatedStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 6,
      opacity: Math.random() * 0.6 + 0.8,
    }));
    setStars(generatedStars);
  }, []);

  // Le composant ne rend rien tant qu'il n'est pas monté sur le client
  if (!isMounted) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 pointer-events-none select-none overflow-hidden z-[-1]"
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
            boxShadow: '0 0 4px hsl(var(--primary))',
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
  );
}

export default FloatingDots;
*/}