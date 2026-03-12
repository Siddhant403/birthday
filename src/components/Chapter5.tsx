import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { LoveCards } from '@/entities';

export default function Chapter5() {
  const [cards, setCards] = useState<LoveCards[]>([]);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      const result = await BaseCrudService.getAll<LoveCards>('lovecards', {}, { limit: 10 });
      setCards(result.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
    } catch (error) {
      console.error('Error loading cards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCard = (cardId: string) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  return (
    <section className="relative min-h-screen py-32 px-8">
      <div className="max-w-[100rem] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-5xl md:text-6xl text-primary mb-8">
            Reasons I Love You
          </h2>
          <p className="font-paragraph text-xl text-foreground/80">
            Click each card to reveal a reason
          </p>
        </motion.div>

        {/* Flipping Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" style={{ minHeight: isLoading ? '500px' : 'auto' }}>
          {isLoading ? null : cards.length > 0 ? (
            cards.map((card, index) => {
              const isFlipped = flippedCards.has(card._id);
              const cardColor = card.cardThemeColor || '#E6A9B8';

              return (
                <motion.div
                  key={card._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative h-64 cursor-pointer perspective-1000"
                  onClick={() => toggleCard(card._id)}
                  style={{ perspective: '1000px' }}
                >
                  <motion.div
                    className="relative w-full h-full"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Front of card */}
                    <div
                      className="absolute inset-0 rounded-2xl flex items-center justify-center p-8"
                      style={{
                        backfaceVisibility: 'hidden',
                        backgroundColor: cardColor,
                        boxShadow: `0 10px 40px ${cardColor}40`,
                      }}
                    >
                      <div className="text-center">
                        <Heart className="w-16 h-16 text-primary-foreground fill-primary-foreground mx-auto mb-4 animate-pulse" />
                        <p className="font-heading text-2xl text-primary-foreground">
                          Tap to reveal
                        </p>
                      </div>
                    </div>

                    {/* Back of card */}
                    <div
                      className="absolute inset-0 rounded-2xl flex items-center justify-center p-8"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        backgroundColor: cardColor,
                        boxShadow: `0 10px 40px ${cardColor}40`,
                      }}
                    >
                      <div className="text-center">
                        <p className="font-paragraph text-lg text-primary-foreground leading-relaxed">
                          {card.reasonText}
                        </p>
                        {card.associatedMemorySnippet && (
                          <p className="font-paragraph text-sm text-primary-foreground/80 mt-4 italic">
                            {card.associatedMemorySnippet}
                          </p>
                        )}
                        {card.isSpecial && (
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                            }}
                            className="mt-4"
                          >
                            <Heart className="w-6 h-6 text-soft-gold-accent fill-soft-gold-accent mx-auto" />
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Glowing heart effect when flipped */}
                    <AnimatePresence>
                      {isFlipped && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute -top-4 -right-4 z-10"
                        >
                          <Heart
                            className="w-8 h-8 text-soft-gold-accent fill-soft-gold-accent"
                            style={{
                              filter: 'drop-shadow(0 0 10px rgba(218, 165, 32, 0.8))',
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="font-paragraph text-lg text-foreground/60">
                Preparing love cards...
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
