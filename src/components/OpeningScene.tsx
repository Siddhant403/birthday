import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface OpeningSceneProps {
  onBegin: () => void;
}

export default function OpeningScene({ onBegin }: OpeningSceneProps) {
  const [showFirstLine, setShowFirstLine] = useState(false);
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowFirstLine(true), 1000);
    const timer2 = setTimeout(() => setShowSecondLine(true), 4000);
    const timer3 = setTimeout(() => setShowButton(true), 6500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-starry-night flex items-center justify-center z-50">
      {/* Glowing Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0.8, 1], scale: [0, 1, 0.8, 1] }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
            }}
            className="absolute w-1 h-1 bg-soft-glow rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px rgba(255, 250, 205, 0.8)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-8 max-w-4xl">
        <AnimatePresence>
          {showFirstLine && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="font-heading text-4xl md:text-5xl text-starry-night-foreground mb-8"
            >
              Every love story is beautiful…
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSecondLine && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="font-heading text-4xl md:text-5xl text-starry-night-foreground mb-12"
            >
              …but ours is my favorite.
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5 }}
              onClick={onBegin}
              className="relative group px-12 py-5 bg-primary/20 backdrop-blur-sm border-2 border-soft-gold-accent rounded-full font-paragraph text-lg text-starry-night-foreground hover:bg-primary/30 transition-all duration-300"
              style={{
                boxShadow: '0 0 30px rgba(218, 165, 32, 0.5)',
              }}
            >
              <span className="flex items-center gap-3">
                Begin Our Story
                <Heart className="w-5 h-5 fill-soft-gold-accent text-soft-gold-accent animate-pulse" />
              </span>
              <motion.div
                className="absolute inset-0 rounded-full bg-soft-gold-accent/20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
