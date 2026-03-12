import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-primary/10"
    >
      <div className="max-w-[120rem] mx-auto px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Heart className="w-6 h-6 text-primary fill-primary animate-pulse" />
          <h1 className="font-heading text-2xl text-primary">Our Love Story</h1>
        </div>
        <nav className="flex items-center gap-8">
          <a
            href="#timeline"
            className="font-paragraph text-base text-foreground hover:text-primary transition-colors duration-300"
          >
            Timeline
          </a>
          <a
            href="#memories"
            className="font-paragraph text-base text-foreground hover:text-primary transition-colors duration-300"
          >
            Memories
          </a>
          <a
            href="#letter"
            className="font-paragraph text-base text-foreground hover:text-primary transition-colors duration-300"
          >
            Letter
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
