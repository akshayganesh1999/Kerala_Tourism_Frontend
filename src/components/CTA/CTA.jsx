import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiArrowRight, FiPhone } from 'react-icons/fi';

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/60 via-[#071729] to-navy-950/60" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-8"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1600&q=60)' }}
      />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-600/10 rounded-full blur-[120px]" />

      <div ref={ref} className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-tag mx-auto w-fit"
        >
          ✦ Begin Your Journey
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-display font-bold text-white mt-4 mb-6 leading-tight"
        >
          Ready to Explore{' '}
          <span className="text-gradient italic">Kerala?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-white/60 text-lg max-w-xl mx-auto mb-10"
        >
          Start planning your unforgettable journey today. Our Kerala travel experts are ready to guide you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button onClick={() => scrollTo('#plan-trip')} className="btn-primary text-base px-8 py-4">
            Plan My Trip <FiArrowRight />
          </button>
          <button onClick={() => scrollTo('#gallery')} className="btn-outline text-base px-8 py-4">
            Explore Destinations
          </button>
        </motion.div>

        {/* Trust note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/30 text-sm"
        >
          <span className="flex items-center gap-2">✅ No booking fees</span>
          <span className="hidden sm:block">·</span>
          <span className="flex items-center gap-2">🌿 Kerala-based team</span>
          <span className="hidden sm:block">·</span>
          <span className="flex items-center gap-2">⚡ 24-hour response</span>
        </motion.div>
      </div>
    </section>
  );
}
