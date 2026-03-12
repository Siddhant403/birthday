import { motion } from 'framer-motion';
import { useState } from 'react';

export default function StarryBackground() {
  const [secretRevealed, setSecretRevealed] = useState(false);

  const handleStarClick = () => {
    setSecretRevealed(true);
    setTimeout(() => setSecretRevealed(false), 4000);
  };

  return (
    <>
      {/* Subtle star particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
            }}
            className="absolute w-1 h-1 bg-soft-gold-accent rounded-full pointer-events-auto cursor-pointer"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 8px rgba(218, 165, 32, 0.6)',
            }}
            onClick={handleStarClick}
          />
        ))}
      </div>

      {/* Secret Message */}
      {secretRevealed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <div className="bg-primary/90 backdrop-blur-md px-12 py-8 rounded-3xl border-2 border-soft-gold-accent shadow-2xl">
            <p className="font-heading text-3xl text-primary-foreground text-center">
              You found a secret! ✨
            </p>
            <p className="font-paragraph text-lg text-primary-foreground/90 text-center mt-4">
              Just like this star, you light up my world
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
}
