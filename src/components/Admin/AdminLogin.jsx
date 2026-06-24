import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { GiPalmTree } from 'react-icons/gi';
import toast from 'react-hot-toast';
import { authService } from '../../services/api';

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await authService.login(data);
      localStorage.setItem('ek_admin_token', res.data.token);
      localStorage.setItem('ek_admin_user', res.data.username);
      toast.success('Welcome back, Admin!', {
        style: { background: '#064e3b', color: '#fff', border: '1px solid #059669' },
      });
      navigate('/admin/dashboard');
    } catch {
      toast.error('Invalid credentials. Please try again.', {
        style: { background: '#450a0a', color: '#fff', border: '1px solid #dc2626' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071729] flex items-center justify-center relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-[#071729] to-navy-950/40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-800/10 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl mb-4 shadow-xl shadow-emerald-500/30">
            <GiPalmTree className="text-white text-2xl" />
          </div>
          <h1 className="font-display font-bold text-2xl text-white">Admin Dashboard</h1>
          <p className="text-white/40 text-sm mt-1">Explore Kerala · Management Portal</p>
        </div>

        <div className="glass-card p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">Username</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                  <input
                    {...register('username', { required: 'Username required' })}
                    placeholder="admin"
                    className="input-field pl-10"
                    autoComplete="username"
                  />
                </div>
                {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                  <input
                    {...register('password', { required: 'Password required' })}
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="input-field pl-10 pr-12"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPass ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-8 py-3.5 disabled:opacity-60"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Logging in...</>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/30 hover:text-emerald-400 text-sm transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
