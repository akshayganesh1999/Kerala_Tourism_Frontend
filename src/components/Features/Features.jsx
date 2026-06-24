import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FEATURES } from '../../utils/constants';
import { FiArrowRight } from 'react-icons/fi';

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`glass-card bg-gradient-to-br ${feature.color} p-8 cursor-pointer group relative overflow-hidden`}
      style={{
        '--accent': feature.accent,
        boxShadow: inView ? `0 0 0 1px rgba(255,255,255,0.06), 0 20px 40px rgba(0,0,0,0.3)` : 'none',
      }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${feature.accent}15 0%, transparent 70%)` }}
      />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 relative z-10 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${feature.accent}20`, border: `1px solid ${feature.accent}30` }}
      >
        {feature.icon}
      </div>

      <h3 className="font-display font-bold text-xl text-white mb-3 relative z-10">{feature.title}</h3>
      <p className="text-white/55 text-sm leading-relaxed mb-6 relative z-10">{feature.description}</p>

      <button
        className="flex items-center gap-2 text-sm font-medium relative z-10 transition-all duration-300 group-hover:gap-3"
        style={{ color: feature.accent }}
        onClick={() => document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })}
      >
        Explore <FiArrowRight />
      </button>
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="destinations" className="py-24 bg-mesh relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-tag mx-auto w-fit"
          >
            ✦ What Awaits You
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title"
          >
            Four Worlds,{' '}
            <span className="text-gradient italic">One Kerala</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-subtitle mx-auto mt-4"
          >
            From misty mountain peaks to tranquil backwaters — Kerala holds entire universes within its 38,852 sq km.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
