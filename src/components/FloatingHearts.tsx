import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            opacity: 0,
          }}
          animate={{
            y: -100,
            opacity: [0, 0.6, 0.4, 0],
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute"
        >
          <Heart
            className="text-primary/30 fill-primary/20"
            style={{
              width: `${Math.random() * 20 + 15}px`,
              height: `${Math.random() * 20 + 15}px`,
              filter: 'blur(1px)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
