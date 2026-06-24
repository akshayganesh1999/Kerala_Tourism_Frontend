import { motion } from 'framer-motion';
import { FiArrowDown, FiMap } from 'react-icons/fi';
import { GiWaves, GiMountainCave, GiTropicalFish } from 'react-icons/gi';

const floatingStats = [
  { icon: <GiWaves />, value: '900km', label: 'Backwaters' },
  { icon: <GiMountainCave />, value: '1,695m', label: 'Highest Peak' },
  { icon: <GiTropicalFish />, value: '590km', label: 'Coastline' },
];

export default function Hero() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#064e3b] via-[#0f2744] to-[#071729]" />

      {/* Parallax-style background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)',
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[80px]" />
      </div>

      {/* Animated dots pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 text-center">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-900/40 border border-emerald-700/40 rounded-full text-emerald-400 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          Kerala, India · God's Own Country
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[1.05] mb-6"
        >
          Explore Kerala{' '}
          <br />
          <span className="text-gradient italic">Like Never Before</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Discover breathtaking destinations, serene backwaters, misty hills, golden beaches
          and unforgettable experiences across Kerala.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <button onClick={() => scrollTo('#destinations')} className="btn-primary text-base">
            <FiMap /> Explore Destinations
          </button>
          <button onClick={() => scrollTo('#plan-trip')} className="btn-outline text-base">
            Plan Your Trip
          </button>
        </motion.div>

        {/* Floating stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {floatingStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-card px-6 py-3.5 flex items-center gap-3 glow-emerald"
            >
              <span className="text-emerald-400 text-xl">{stat.icon}</span>
              <div className="text-left">
                <div className="text-white font-bold text-lg leading-none">{stat.value}</div>
                <div className="text-white/50 text-xs mt-0.5">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('#destinations')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors"
        aria-label="Scroll down"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <FiArrowDown size={24} />
        </motion.div>
      </motion.button>
    </section>
  );
}
