import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { WHY_US } from '../../utils/constants';

function StatCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="glass-card p-8 group hover:border-emerald-700/40 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Icon */}
      <div className="w-12 h-12 bg-emerald-900/50 border border-emerald-700/30 rounded-xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
        {item.icon}
      </div>

      {/* Stat counter */}
      <div className="mb-3">
        <span className="text-4xl font-display font-bold text-gradient">{item.stat}</span>
        <span className="text-white/40 text-sm ml-2">{item.label}</span>
      </div>

      <h3 className="font-display font-semibold text-white text-lg mb-2">{item.title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
    </motion.div>
  );
}

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="why-us" className="py-24 bg-mesh relative">
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-emerald-700/40" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-tag mx-auto w-fit"
          >
            ✦ Why Choose Us
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Kerala, Done{' '}
            <span className="text-gradient italic">Properly</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto mt-4"
          >
            We're not a booking engine — we're a Kerala-first team who believe the best journeys are planned by people who actually live here.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_US.map((item, i) => (
            <StatCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
