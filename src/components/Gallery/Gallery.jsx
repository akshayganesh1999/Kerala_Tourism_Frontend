import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { DESTINATIONS } from '../../utils/constants';

const tagColors = {
  emerald: 'bg-emerald-900/70 text-emerald-300 border-emerald-700/50',
  blue: 'bg-blue-900/70 text-blue-300 border-blue-700/50',
  amber: 'bg-amber-900/70 text-amber-300 border-amber-700/50',
  purple: 'bg-purple-900/70 text-purple-300 border-purple-700/50',
  cyan: 'bg-cyan-900/70 text-cyan-300 border-cyan-700/50',
  teal: 'bg-teal-900/70 text-teal-300 border-teal-700/50',
};

function GalleryCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  // Varying heights for masonry effect
  const isLarge = index === 0 || index === 3 || index === 6;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${isLarge ? 'row-span-2' : ''
        }`}
      style={{ minHeight: isLarge ? '400px' : '220px' }}
    >
      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Tag */}
      <div className="absolute top-3 left-3">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full border ${tagColors[item.tagColor] || tagColors.emerald
            }`}
        >
          {item.tag}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-display font-bold text-white text-xl mb-1">{item.name}</h3>
        <p className="text-white/60 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20">
          {item.description}
        </p>
        <div className="text-white/40 text-xs mt-2 flex items-center gap-1">
          <span>📍</span> {item.district}
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="gallery" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-tag mx-auto w-fit"
          >
            ✦ Destination Gallery
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Glimpses of{' '}
            <span className="text-gradient italic">God's Own Country</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto mt-4"
          >
            Eight iconic destinations that define Kerala's extraordinary natural and cultural landscape.
          </motion.p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {DESTINATIONS.map((item, i) => (
            <GalleryCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
