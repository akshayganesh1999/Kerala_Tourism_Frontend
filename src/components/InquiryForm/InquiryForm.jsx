import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion, useInView } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { KERALA_DISTRICTS, DISTRICTS } from '../../utils/constants';
import { inquiryService } from '../../services/api';

export default function InquiryForm() {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const places = selectedDistrict ? KERALA_DISTRICTS[selectedDistrict]?.places || [] : [];

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await inquiryService.submit(data);
      toast.success("🌿 Inquiry submitted! We'll reach out within 24 hours.", {
        duration: 5000,
        style: { background: '#064e3b', color: '#fff', border: '1px solid #059669' },
      });
      reset();
      setSelectedDistrict('');
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(msg, {
        style: { background: '#450a0a', color: '#fff', border: '1px solid #dc2626' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="plan-trip" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-tag mx-auto w-fit"
          >
            ✦ Start Your Journey
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Plan Your Kerala{' '}
            <span className="text-gradient italic">Journey</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto mt-4"
          >
            Share your details and we'll craft a personalised Kerala itinerary just for you — within 24 hours.
          </motion.p>
        </div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="glass-card p-8 md:p-12 glow-emerald"
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Name */}
              <div>
                <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
                  Full Name *
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                  <input
                    {...register('name', {
                      required: 'Full name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' },
                      maxLength: { value: 100, message: 'Name is too long' },
                    })}
                    placeholder="Your full name"
                    className={`input-field pl-10 ${errors.name ? 'border-red-500/50' : ''}`}
                    aria-label="Full name"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    ⚠ {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
                  Email Address *
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                  <input
                    {...register('email', {
                      required: 'Email address is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email containing @',
                      },
                    })}
                    type="email"
                    placeholder="you@example.com"
                    className={`input-field pl-10 ${errors.email ? 'border-red-500/50' : ''}`}
                    aria-label="Email address"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    ⚠ {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
                  Phone Number *
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                  <input
                    {...register('phone', {
                      required: 'Phone number is required',
                      minLength: { value: 10, message: 'Phone number must be exactly 10 digits' },
                      maxLength: { value: 10, message: 'Phone number must be exactly 10 digits' },
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: 'Enter a valid 10-digit Indian mobile number',
                      },
                    })}
                    type="tel"
                    placeholder="9876543210"
                    className={`input-field pl-10 ${errors.phone ? 'border-red-500/50' : ''}`}
                    aria-label="Phone number"
                    maxLength={10}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) e.preventDefault();
                    }}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    ⚠ {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Area — optional */}
              <div>
                <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
                  Area / Locality{' '}
                  <span className="text-white/30 normal-case tracking-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                  <input
                    {...register('area')}
                    placeholder="Your area or locality"
                    className="input-field pl-10"
                    aria-label="Area or locality"
                  />
                </div>
              </div>

              {/* District */}
              <div>
                <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
                  District *
                </label>
                <select
                  {...register('district', {
                    required: 'Please select a district',
                    validate: (v) => v !== '' || 'Please select a district',
                  })}
                  onChange={(e) => {
                    const dist = e.target.value;
                    setSelectedDistrict(dist);
                    setValue('district', dist, { shouldValidate: true });
                    setValue('place', '', { shouldValidate: false });
                  }}
                  value={selectedDistrict}
                  className={`input-field appearance-none cursor-pointer ${errors.district ? 'border-red-500/50' : ''}`}
                  aria-label="District"
                >
                  <option value="" className="bg-[#071729]">Select District</option>
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d} className="bg-[#071729]">{d}</option>
                  ))}
                </select>
                {errors.district && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    ⚠ {errors.district.message}
                  </p>
                )}
              </div>

              {/* Place — dynamic */}
              <div>
                <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
                  Destination / Place *
                </label>
                <select
                  {...register('place', {
                    required: 'Please select a destination',
                    validate: (v) => v !== '' || 'Please select a destination',
                  })}
                  disabled={!selectedDistrict}
                  className={`input-field appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${errors.place ? 'border-red-500/50' : ''}`}
                  aria-label="Place"
                >
                  <option value="" className="bg-[#071729]">
                    {selectedDistrict ? 'Select Place' : 'Select district first'}
                  </option>
                  {places.map((p) => (
                    <option key={p} value={p} className="bg-[#071729]">{p}</option>
                  ))}
                </select>
                {errors.place && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    ⚠ {errors.place.message}
                  </p>
                )}
              </div>

            </div>

            {/* District preview */}
            {selectedDistrict && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 p-4 bg-emerald-900/20 border border-emerald-800/30 rounded-xl flex items-center gap-3"
              >
                <span className="text-2xl">🌿</span>
                <div>
                  <div className="text-emerald-400 font-medium text-sm">{selectedDistrict}</div>
                  <div className="text-white/50 text-xs">{KERALA_DISTRICTS[selectedDistrict]?.description}</div>
                </div>
              </motion.div>
            )}

            {/* Submit */}
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary text-base px-10 py-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FiSend /> Submit Inquiry
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-white/30 text-xs mt-4">
              We respect your privacy. Your information is never shared.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}