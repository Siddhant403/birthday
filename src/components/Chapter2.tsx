import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Chapter2() {
  const [showText, setShowText] = useState(false);
  const text = "One simple conversation…\nand suddenly my world felt different.";
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (showText) {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [showText, text]);

  return (
    <section className="relative min-h-screen flex items-center justify-center py-32 px-8">
      <div className="max-w-[100rem] mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          onViewportEnter={() => setShowText(true)}
        >
          <h2 className="font-heading text-5xl md:text-6xl text-secondary mb-16">
            The Beginning of Something Beautiful
          </h2>

          <div className="relative inline-block">
            <p
              className="font-paragraph text-2xl md:text-3xl text-foreground whitespace-pre-line leading-relaxed"
              style={{ minHeight: '120px' }}
            >
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 h-8 bg-foreground ml-1 align-middle"
              />
            </p>
          </div>

          {/* Floating heart particles */}
          <div className="relative mt-20 h-40">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  y: [-20, -120],
                  x: [0, (Math.random() - 0.5) * 100],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className="absolute left-1/2 top-0"
                style={{
                  marginLeft: `${(i - 4) * 40}px`,
                }}
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
      </div>
    </section>
  );
}
