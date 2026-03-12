import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface FinalSurpriseProps {
  onProposal: () => void;
}

export default function FinalSurprise({ onProposal }: FinalSurpriseProps) {
  const [stage, setStage] = useState<'intro' | 'question' | 'heart' | 'proposal' | 'answered'>('intro');
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const handleHeartClick = () => {
    setStage('proposal');
  };

  const handleAnswer = () => {
    setStage('answered');
    setShowFinalMessage(true);
    onProposal();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-32 px-8 bg-gradient-to-b from-transparent to-starry-night">
      <div className="max-w-[100rem] mx-auto w-full text-center">
        <AnimatePresence mode="wait">
          {/* Stage 1: Intro */}
          {stage === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              onAnimationComplete={() => {
                setTimeout(() => setStage('question'), 2000);
              }}
            >
              <p className="font-heading text-4xl md:text-5xl text-starry-night-foreground">
                Before this story continues…
              </p>
            </motion.div>
          )}

          {/* Stage 2: Question */}
          {stage === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              onAnimationComplete={() => {
                setTimeout(() => setStage('heart'), 2000);
              }}
            >
              <p className="font-heading text-4xl md:text-5xl text-starry-night-foreground">
                There is something I want to ask you.
              </p>
            </motion.div>
          )}

          {/* Stage 3: Glowing Heart */}
          {stage === 'heart' && (
            <motion.div
              key="heart"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 1, type: 'spring' }}
              className="cursor-pointer"
              onClick={handleHeartClick}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Heart
                  className="w-32 h-32 md:w-40 md:h-40 text-primary fill-primary mx-auto"
                  style={{
                    filter: 'drop-shadow(0 0 40px rgba(230, 169, 184, 1))',
                  }}
                />
              </motion.div>
              <p className="font-paragraph text-lg text-starry-night-foreground/80 mt-8">
                Click the heart
              </p>
            </motion.div>
          )}

          {/* Stage 4: Proposal */}
          {stage === 'proposal' && (
            <motion.div
              key="proposal"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.h2
                className="font-heading text-5xl md:text-7xl text-starry-night-foreground mb-16"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(218, 165, 32, 0.5)',
                    '0 0 40px rgba(218, 165, 32, 0.8)',
                    '0 0 20px rgba(218, 165, 32, 0.5)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Will you stay with me forever? 💍
              </motion.h2>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
                <motion.button
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAnswer}
                  className="px-12 py-6 bg-primary/20 backdrop-blur-sm border-2 border-soft-gold-accent rounded-full font-paragraph text-2xl text-starry-night-foreground hover:bg-primary/30 transition-all duration-300 flex items-center gap-3"
                  style={{
                    boxShadow: '0 0 30px rgba(218, 165, 32, 0.5)',
                  }}
                >
                  <Heart className="w-6 h-6 fill-soft-gold-accent text-soft-gold-accent" />
                  Yes
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAnswer}
                  className="px-12 py-6 bg-secondary/20 backdrop-blur-sm border-2 border-soft-gold-accent rounded-full font-paragraph text-2xl text-starry-night-foreground hover:bg-secondary/30 transition-all duration-300 flex items-center gap-3"
                  style={{
                    boxShadow: '0 0 30px rgba(218, 165, 32, 0.5)',
                  }}
                >
                  <Sparkles className="w-6 h-6 text-soft-gold-accent" />
                  Always
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Stage 5: Final Message */}
          {stage === 'answered' && showFinalMessage && (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, type: 'spring' }}
            >
              <motion.div
                className="relative inline-block"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <h2
                  className="font-heading text-5xl md:text-7xl text-starry-night-foreground"
                  style={{
                    textShadow: '0 0 40px rgba(255, 250, 205, 0.8)',
                  }}
                >
                  The best part of my life is loving you.
                </h2>

                {/* Surrounding sparkles */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${50 + Math.cos((i * Math.PI * 2) / 12) * 120}%`,
                      top: `${50 + Math.sin((i * Math.PI * 2) / 12) * 120}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.15,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  >
                    <Sparkles className="w-8 h-8 text-soft-gold-accent" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Final floating hearts */}
              <div className="relative mt-20 h-40">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: [0, -150],
                      x: [(i - 10) * 30, (i - 10) * 30 + (Math.random() - 0.5) * 60],
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    className="absolute left-1/2 top-0"
                  >
                    <Heart
                      className="text-primary fill-primary"
                      style={{
                        width: `${Math.random() * 15 + 20}px`,
                        height: `${Math.random() * 15 + 20}px`,
                        filter: 'drop-shadow(0 0 10px rgba(230, 169, 184, 0.8))',
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
