import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function LoveLetter() {
  const [showLetter, setShowLetter] = useState(false);
  const letterText =
    'You are the most beautiful chapter of my life. Every moment with you feels like magic. If I could choose again, I would still choose you every single time.';
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (showLetter) {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= letterText.length) {
          setDisplayedText(letterText.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 40);
      return () => clearInterval(interval);
    }
  }, [showLetter, letterText]);

  return (
    <section
      id="letter"
      className="relative min-h-screen flex items-center justify-center py-32 px-8"
      style={{
        background: 'linear-gradient(to bottom, rgba(216, 191, 216, 0.05), rgba(230, 169, 184, 0.05))',
      }}
    >
      <div className="max-w-[100rem] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          onViewportEnter={() => setShowLetter(true)}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            className="font-heading text-5xl md:text-6xl text-secondary text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            A Letter to You
          </motion.h2>

          {/* Letter Paper Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative bg-background p-12 md:p-16 rounded-2xl shadow-2xl"
            style={{
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1), inset 0 0 40px rgba(230, 169, 184, 0.1)',
              backgroundImage: 'linear-gradient(rgba(230, 169, 184, 0.02) 1px, transparent 1px)',
              backgroundSize: '100% 2rem',
            }}
          >
            {/* Decorative wax seal */}
            <motion.div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
            >
              <div
                className="w-16 h-16 bg-primary rounded-full flex items-center justify-center border-4 border-background"
                style={{
                  boxShadow: '0 4px 20px rgba(230, 169, 184, 0.5)',
                }}
              >
                <Heart className="w-8 h-8 text-primary-foreground fill-primary-foreground" />
              </div>
            </motion.div>

            <div className="relative">
              <p
                className="font-paragraph text-xl md:text-2xl text-foreground leading-relaxed text-center"
                style={{ minHeight: '200px' }}
              >
                {displayedText}
                {showLetter && displayedText.length < letterText.length && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-1 h-6 bg-foreground ml-1 align-middle"
                  />
                )}
              </p>

              {/* Signature */}
              {displayedText.length === letterText.length && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="mt-12 text-right"
                >
                  <p className="font-heading text-3xl text-primary">
                    Forever Yours
                  </p>
                  <Heart className="w-6 h-6 text-primary fill-primary ml-auto mt-2 animate-pulse" />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Floating hearts around letter */}
          <div className="relative mt-16 h-24">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  y: [0, -80],
                  x: [(i - 3) * 60, (i - 3) * 60 + (Math.random() - 0.5) * 30],
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className="absolute left-1/2 top-0"
              >
                <Heart
                  className="text-secondary fill-secondary"
                  style={{
                    width: `${Math.random() * 8 + 12}px`,
                    height: `${Math.random() * 8 + 12}px`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
