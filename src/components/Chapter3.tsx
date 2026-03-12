import { motion } from 'framer-motion';

export default function Chapter3() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center py-32 px-8"
      style={{
        background: 'linear-gradient(to bottom, transparent, rgba(216, 191, 216, 0.1), transparent)',
      }}
    >
      <div className="max-w-[100rem] mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="font-heading text-5xl md:text-6xl text-primary mb-16">
            Somewhere Between Our Talks and Laughs…
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <p className="font-paragraph text-2xl md:text-3xl text-foreground leading-relaxed max-w-4xl mx-auto mb-8">
              I didn't plan to fall in love with you.
            </p>
            <p className="font-paragraph text-2xl md:text-3xl text-foreground leading-relaxed max-w-4xl mx-auto">
              But somehow… you became my favorite place.
            </p>

            {/* Warm romantic glow */}
            <motion.div
              className="absolute inset-0 -z-10 blur-3xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                background: 'radial-gradient(circle, rgba(230, 169, 184, 0.4) 0%, transparent 70%)',
              }}
            />
          </motion.div>

          {/* Decorative hearts */}
          <div className="mt-20 flex justify-center gap-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.2 }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div
                  className="w-3 h-3 bg-soft-gold-accent rounded-full"
                  style={{
                    boxShadow: '0 0 20px rgba(218, 165, 32, 0.8)',
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
