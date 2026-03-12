import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cake, Heart, Sparkles } from 'lucide-react';

interface Chapter6Props {
  onBirthdayReveal: () => void;
}

export default function Chapter6({ onBirthdayReveal }: Chapter6Props) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('birthday-section');
      if (element && !revealed) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.6) {
          setRevealed(true);
          onBirthdayReveal();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [revealed, onBirthdayReveal]);

  return (
    <section
      id="birthday-section"
      className="relative min-h-screen flex items-center justify-center py-32 px-8"
      style={{
        background: 'linear-gradient(135deg, rgba(230, 169, 184, 0.1) 0%, rgba(216, 191, 216, 0.1) 100%)',
      }}
    >
      <div className="max-w-[100rem] mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="font-heading text-5xl md:text-7xl text-primary mb-12"
            animate={{
              textShadow: [
                '0 0 20px rgba(230, 169, 184, 0.5)',
                '0 0 40px rgba(230, 169, 184, 0.8)',
                '0 0 20px rgba(230, 169, 184, 0.5)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            And Today… It's Your Birthday.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-paragraph text-2xl md:text-3xl text-foreground mb-16 leading-relaxed max-w-4xl mx-auto"
          >
            Today the world celebrates the day the most beautiful soul was born.
          </motion.p>

          {/* Birthday Message with Icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, type: 'spring', stiffness: 100 }}
            className="relative inline-block"
          >
            <div
              className="bg-gradient-to-br from-primary to-secondary px-16 py-12 rounded-3xl relative overflow-hidden"
              style={{
                boxShadow: '0 20px 60px rgba(230, 169, 184, 0.4)',
              }}
            >
              {/* Animated background glow */}
              <motion.div
                className="absolute inset-0 bg-soft-glow/20"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <div className="relative z-10 flex items-center justify-center gap-6">
                <Cake className="w-12 h-12 text-primary-foreground" />
                <h3 className="font-heading text-4xl md:text-5xl text-primary-foreground">
                  Happy Birthday, My Love
                </h3>
                <Heart className="w-12 h-12 text-primary-foreground fill-primary-foreground animate-pulse" />
              </div>
            </div>

            {/* Floating sparkles around the message */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${50 + Math.cos((i * Math.PI * 2) / 8) * 150}%`,
                  top: `${50 + Math.sin((i * Math.PI * 2) / 8) * 150}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                <Sparkles className="w-6 h-6 text-soft-gold-accent" />
              </motion.div>
            ))}
          </motion.div>

          {/* Floating hearts animation */}
          <div className="relative mt-20 h-32">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [0, -100],
                  x: [(i - 6) * 20, (i - 6) * 20 + (Math.random() - 0.5) * 40],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="absolute left-1/2 top-0"
              >
                <Heart
                  className="text-primary fill-primary"
                  style={{
                    width: `${Math.random() * 10 + 15}px`,
                    height: `${Math.random() * 10 + 15}px`,
                    filter: 'drop-shadow(0 0 8px rgba(230, 169, 184, 0.8))',
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
