// HPI 1.7-G
import { Image } from '@/components/ui/image';
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Heart, Music, Sparkles, Stars, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// --- Utility Components ---

const [musicPlaying, setMusicPlaying] = useState(false);
const audioRef = useRef(null);
useEffect(() => {
  if (audioRef.current) {
    if (musicPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }
}, [musicPlaying]);

const HeartCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };
    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference"
      animate={{
        x: position.x - 12,
        y: position.y - 12,
        scale: isPointer ? 1.5 : 1,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    >
      <Heart className="w-6 h-6 text-primary fill-primary opacity-80 drop-shadow-[0_0_10px_rgba(230,169,184,0.8)]" />
    </motion.div>
  );
};

const StarryBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-starry-night">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{
            opacity: [Math.random() * 0.5 + 0.2, Math.random() * 0.8 + 0.5, Math.random() * 0.5 + 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const FloatingHeartsBg = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/20"
          style={{
            left: Math.random() * 100 + '%',
            bottom: '-10%',
          }}
          animate={{
            y: ['0vh', '-120vh'],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            rotate: [0, Math.random() * 360],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 10,
          }}
        >
          <Heart className="w-8 h-8 fill-current" />
        </motion.div>
      ))}
    </div>
  );
};

const Confetti = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[90] overflow-hidden">
      {[...Array(80)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            y: window.innerHeight + 20,
            rotate: Math.random() * 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 3,
            ease: 'linear',
          }}
          className="absolute"
        >
          {i % 4 === 0 ? (
            <Heart className="w-5 h-5 text-primary fill-primary drop-shadow-md" />
          ) : i % 4 === 1 ? (
            <Sparkles className="w-6 h-6 text-soft-gold-accent drop-shadow-md" />
          ) : i % 4 === 2 ? (
            <div className="w-3 h-3 rounded-full bg-secondary drop-shadow-md" />
          ) : (
            <div className="w-4 h-2 bg-primary/60 rounded-sm drop-shadow-md" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  const [storyStarted, setStoryStarted] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [proposalAccepted, setProposalAccepted] = useState(false);

  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const lightBackgroundOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

  const handleBeginStory = () => {
    setStoryStarted(true);
    setMusicPlaying(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 6000);
  };

  return (
    <div className="relative min-h-screen bg-background text-red-600 overflow-x-clip selection:bg-primary/30 selection:text-primary-foreground font-paragraph">
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .text-glow { text-shadow: 0 0 20px rgba(255, 250, 205, 0.5); }
        .box-glow { box-shadow: 0 0 40px rgba(230, 169, 184, 0.3); }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <HeartCursor />

      <>
{/* Audio Element */}
<audio ref={audioRef} loop>
  <source src="https://static.wixstatic.com/mp3/217bff_5a01c1830cac44ed88c0da208d64ea74.mp3" type="audio/mpeg" />
</audio>

      {/* Global Audio Toggle */}
      <AnimatePresence>
        {storyStarted && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMusicPlaying(!musicPlaying)}
            className="fixed top-6 right-6 z-50 bg-white/10 backdrop-blur-md p-4 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 shadow-lg group"
            aria-label="Toggle music"
          >
            {musicPlaying ? (
              <Music className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            ) : (
              <VolumeX className="w-5 h-5 text-foreground/50 group-hover:scale-110 transition-transform" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {showConfetti && <Confetti />}

      {/* Dynamic Backgrounds */}
      <motion.div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: backgroundOpacity }}>
        <StarryBackground />
      </motion.div>

      <motion.div className="fixed inset-0 z-0 pointer-events-none bg-background" style={{ opacity: lightBackgroundOpacity }}>
        <FloatingHeartsBg />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,250,205,0.4)_0%,transparent_100%)] opacity-50 mix-blend-overlay" />
      </motion.div>

      <AnimatePresence mode="wait">
        {!storyStarted ? (
          <OpeningScene key="opening" onBegin={handleBeginStory} />
        ) : (
          <StoryTimeline key="timeline" onBirthdayReveal={triggerConfetti} onProposal={setProposalAccepted} proposalAccepted={proposalAccepted} />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Sections ---

function OpeningScene({ onBegin }: { onBegin: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
      className="relative min-h-screen flex flex-col items-center justify-center z-10 px-6 text-center"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading text-red-600 font-semibold tracking-wide"
        >
          Every love story is beautiful...
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-heading text-red-600 italic font-semibold"
        >
          ...but ours is my favorite.
        </motion.h2>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 7 }}
          onClick={onBegin}
          className="mt-16 px-10 py-4 rounded-full bg-primary/10 border border-primary/30 text-red-600 hover:bg-primary hover:text-primary-foreground transition-all duration-500 text-lg tracking-widest uppercase flex items-center gap-3 group box-glow"
        >
          Begin Our Story
          <Heart className="w-5 h-5 group-hover:fill-current transition-all duration-300" />
        </motion.button>
      </div>
    </motion.div>
  );
}

function StoryTimeline({ onBirthdayReveal, onProposal, proposalAccepted }: { onBirthdayReveal: () => void, onProposal: (v: boolean) => void, proposalAccepted: boolean }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="relative z-10 w-full max-w-[120rem] mx-auto"
    >
      <Chapter1 />
      <Chapter2 />
      <Chapter3 />
      <Chapter4 />
      <Chapter5 />
      <Chapter6 onReveal={onBirthdayReveal} />
      <LoveLetter />
      <FinalSurprise onProposal={onProposal} accepted={proposalAccepted} />
    </motion.main>
  );
}

function Chapter1() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 150]);

  return (
    <section ref={ref} className="min-h-screen flex items-center py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.5 }}
          className="space-y-8 max-w-2xl"
        >
          <div className="flex items-center gap-4 text-red-600/60 mb-4">
            <span className="w-12 h-[1px] bg-red-600/60"></span>
            <span className="uppercase tracking-widest text-sm text-red-600">Chapter 1</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-heading text-red-600 leading-tight font-semibold">
            The Day <br/><span className="text-red-600 italic">Everything Changed</span>
          </h2>
          <p className="text-lg md:text-2xl text-red-600/80 leading-relaxed font-medium">
            When I first saw you, I didn't know you would become the most important person in my life. It was an ordinary day that suddenly became the start of my favorite adventure.
          </p>
        </motion.div>

        <div className="relative h-[60vh] w-full flex justify-center items-center">
          <motion.div style={{ y: y1 }} className="absolute left-0 top-10 w-2/3 aspect-[4/5] rounded-2xl overflow-hidden box-glow z-10">
            <Image
              src="https://static.wixstatic.com/media/217bff_fd612fe7fdce4a7aa1358b9386bb03db~mv2.jpeg"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              originWidth={960}
              originHeight={1280}
              focalPointX={44.739583333333336}
              focalPointY={34.0234375} />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute right-0 bottom-10 w-1/2 aspect-square rounded-full overflow-hidden box-glow border-4 border-white z-20">
            <Image
              src="https://static.wixstatic.com/media/217bff_5858b51ddbc44cc38bbca544bf98b558~mv2.jpg"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              originWidth={759}
              originHeight={689}
              focalPointX={61.56126482213439}
              focalPointY={39.404934687953556} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Chapter2() {
  const text = "One simple conversation... and suddenly my world felt different.";
  const words = text.split(" ");

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-32 px-6 text-center relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1 }}
        className="mb-16"
      >
        <div className="flex items-center justify-center gap-4 text-red-600/60 mb-6">
          <span className="w-8 h-[1px] bg-red-600/60"></span>
          <span className="uppercase tracking-widest text-sm text-red-600">Chapter 2</span>
          <span className="w-8 h-[1px] bg-red-600/60"></span>
        </div>
        <h2 className="text-5xl md:text-7xl font-heading text-red-600 font-semibold">The Beginning of Something Beautiful</h2>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <h3 className="text-4xl md:text-6xl font-heading text-red-600 leading-relaxed flex flex-wrap justify-center gap-x-3 gap-y-2 font-semibold">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              {word}
            </motion.span>
          ))}
        </h3>
      </div>
    </section>
  );
}

function Chapter3() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center py-32 px-6 relative">
      <motion.div
        style={{ scale, opacity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,250,205,0.8)_0%,transparent_70%)] pointer-events-none mix-blend-multiply"
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="uppercase tracking-widest text-sm text-red-600/80 block mb-6">Chapter 3</span>
          <h2 className="text-6xl md:text-8xl font-heading text-red-600 mb-12 font-semibold">
            Somewhere Between Our <br/><span className="text-red-600 italic">Talks and Laughs...</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="relative p-12 md:p-24 rounded-3xl overflow-hidden box-glow bg-white/40 backdrop-blur-sm border border-white/50"
        >
          <p className="text-3xl md:text-4xl font-heading text-red-600/85 leading-relaxed font-semibold">
            "I didn't plan to fall in love with you.<br/>
            But somehow... <span className="text-red-600 font-semibold">you became my favorite place.</span>"
          </p>
          <Heart className="absolute bottom-8 right-8 w-12 h-12 text-primary/20 fill-primary/20 rotate-12" />
        </motion.div>
      </div>
    </section>
  );
}

function Chapter4() {
  const memories = [
    { caption: "My favorite smile", rotate: "-rotate-3", mt: "mt-0" },
    { caption: "Our happiest moment", rotate: "rotate-2", mt: "mt-12 md:mt-24" },
    { caption: "A memory I'll never forget", rotate: "-rotate-1", mt: "mt-8 md:mt-12" },
    { caption: "The moment I realized I love you", rotate: "rotate-3", mt: "mt-20 md:mt-32" },
  ];

  return (
    <section className="min-h-screen py-32 px-6 md:px-12 relative bg-secondary/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="uppercase tracking-widest text-sm text-red-600/80 block mb-4">Chapter 4</span>
          <h2 className="text-6xl md:text-8xl font-heading text-red-600 font-semibold">Our Best Memories</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {memories.map((memory, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className={`relative group cursor-pointer ${memory.mt}`}
            >
              <div className={`bg-white p-4 pb-12 shadow-xl rounded-sm transform transition-all duration-500 ${memory.rotate} group-hover:rotate-0 group-hover:scale-105 group-hover:shadow-2xl group-hover:z-10`}>
                <div className="aspect-square overflow-hidden bg-gray-100 mb-4">
                  <Image
                    src="https://static.wixstatic.com/media/217bff_293fa206273f48a4a5d20921ddebfe89~mv2.png"
                    className="w-full h-full object-cover filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                    originWidth={570}
                    originHeight={676}
                    focalPointX={47.192982456140356}
                    focalPointY={29.06804733727811} />
                </div>
                <p className="font-heading text-xl text-center text-red-600/80 italic absolute bottom-4 left-0 right-0 px-4">
                  {memory.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Chapter5() {
  const reasons = [
    "Your smile brightens my world",
    "Your kindness inspires me",
    "You understand me like no one else",
    "You make ordinary moments magical",
    "You make life feel beautiful",
    "You are my safe haven"
  ];

  return (
    <section className="min-h-screen py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="uppercase tracking-widest text-sm text-red-600/80 block mb-4">Chapter 5</span>
          <h2 className="text-5xl md:text-7xl font-heading text-red-600">Reasons I Love You</h2>
          <p className="mt-6 text-red-600/60 tracking-wide">Click to reveal</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <FlipCard key={i} reason={reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlipCard({ reason, index }: { reason: string, index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="perspective-1000 h-64 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transform-style-3d transition-transform duration-700 ease-in-out ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-lg border border-primary/10 flex items-center justify-center p-8 group-hover:shadow-xl transition-shadow">
          <Heart className="w-12 h-12 text-primary/30" />
          <span className="absolute bottom-6 text-red-600/40 font-heading text-lg italic">Reason #{index + 1}</span>
        </div>
        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-primary text-primary-foreground rounded-2xl shadow-lg flex items-center justify-center p-8 text-center box-glow">
          <p className="font-heading text-2xl leading-relaxed">{reason}</p>
          <Sparkles className="absolute top-4 right-4 w-5 h-5 text-soft-gold-accent opacity-50" />
        </div>
      </div>
    </motion.div>
  );
}

function Chapter6({ onReveal }: { onReveal: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30%" });

  useEffect(() => {
    if (isInView) {
      onReveal();
    }
  }, [isInView, onReveal]);

  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center py-32 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-soft-glow/20 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 1.5 }}
        className="max-w-4xl mx-auto z-10"
      >
        <span className="uppercase tracking-widest text-sm text-red-600/80 block mb-8">Chapter 6</span>
        <h2 className="text-4xl md:text-6xl font-heading text-red-600 mb-12">
          And Today... <br/><span className="text-red-600 italic">It's Your Birthday.</span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xl md:text-2xl text-red-600/70 mb-16 font-light"
        >
          Today the world celebrates the day the most beautiful soul was born.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          transition={{ duration: 2, delay: 2, type: "spring" }}
          className="inline-block"
        >
          <h3 className="text-5xl md:text-8xl font-heading text-red-600 text-glow drop-shadow-2xl">
            Happy Birthday,<br/>My Love 🎂❤️
          </h3>
        </motion.div>
      </motion.div>
    </section>
  );
}

function LoveLetter() {
  const letterLines = [
    "You are the most beautiful chapter of my life.",
    "Every moment with you feels like magic.",
    "If I could choose again, I would still choose you every single time."
  ];

  return (
    <section className="min-h-screen flex items-center justify-center py-32 px-6 relative bg-white/50">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <Stars className="w-12 h-12 text-soft-gold-accent mx-auto mb-12 opacity-50" />

        <div className="space-y-12">
          {letterLines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.5, delay: i * 0.5 }}
              className="text-3xl md:text-5xl font-heading text-red-600/90 leading-relaxed italic"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalSurprise({ onProposal, accepted }: { onProposal: (v: boolean) => void, accepted: boolean }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center py-32 px-6 relative bg-starry-night text-starry-night-foreground overflow-hidden">
      <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none">
        <StarryBackground />
      </motion.div>

      <div className="max-w-4xl mx-auto text-center z-10 relative">
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 2 }}
              className="space-y-24"
            >
              <div className="space-y-8">
                <motion.p
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 2 }}
                  className="text-2xl md:text-3xl font-light text-white/70"
                >
                  Before this story continues...
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 2, delay: 2 }}
                  className="text-2xl md:text-3xl font-light text-white/70"
                >
                  There is something I want to ask you.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 4, type: "spring" }}
                className="space-y-16"
              >
                <h2 className="text-5xl md:text-7xl font-heading text-white text-glow">
                  Will you stay with me forever? 💍
                </h2>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button
                    onClick={() => onProposal(true)}
                    className="px-12 py-4 rounded-full bg-primary text-primary-foreground font-heading text-2xl hover:scale-105 hover:shadow-[0_0_30px_rgba(230,169,184,0.6)] transition-all duration-300 flex items-center gap-3"
                  >
                    <Heart className="w-6 h-6 fill-current" /> Yes
                  </button>
                  <button
                    onClick={() => onProposal(true)}
                    className="px-12 py-4 rounded-full bg-transparent border border-soft-gold-accent text-soft-gold-accent font-heading text-2xl hover:bg-soft-gold-accent hover:text-starry-night hover:scale-105 hover:shadow-[0_0_30px_rgba(218,165,32,0.4)] transition-all duration-300 flex items-center gap-3"
                  >
                    <Sparkles className="w-6 h-6" /> Always
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="answer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="space-y-12"
            >
              <Heart className="w-24 h-24 text-primary fill-primary mx-auto drop-shadow-[0_0_50px_rgba(230,169,184,0.8)] animate-pulse" />
              <h2 className="text-5xl md:text-8xl font-heading text-white text-glow leading-tight">
                The best part of my life <br/>
                <span className="text-primary italic">is loving you.</span>
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
