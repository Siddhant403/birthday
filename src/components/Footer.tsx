import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-t from-primary/5 to-transparent py-16">
      <div className="max-w-[100rem] mx-auto px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-primary fill-primary animate-pulse" />
          <p className="font-paragraph text-base text-foreground">
            Made with endless love
          </p>
          <Heart className="w-5 h-5 text-primary fill-primary animate-pulse" />
        </div>
        <p className="font-paragraph text-sm text-foreground/60">
          Every moment with you is a treasure
        </p>
      </div>
    </footer>
  );
}
