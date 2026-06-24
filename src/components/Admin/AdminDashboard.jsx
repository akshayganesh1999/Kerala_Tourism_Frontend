import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiTrash2, FiLogOut, FiRefreshCw, FiFilter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { GiPalmTree } from 'react-icons/gi';
import toast from 'react-hot-toast';
import { inquiryService, authService } from '../../services/api';
import { DISTRICTS } from '../../utils/constants';

const STATUS_COLORS = {
  new: 'bg-emerald-900/50 text-emerald-300 border-emerald-700/50',
  contacted: 'bg-blue-900/50 text-blue-300 border-blue-700/50',
  resolved: 'bg-white/5 text-white/40 border-white/10',
};

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const adminUser = localStorage.getItem('ek_admin_user') || 'Admin';

  const fetchData = useCallback(async (searchVal = '', districtVal = '') => {
    setLoading(true);
    try {
      const res = await inquiryService.getAll({ search: searchVal, district: districtVal });
      setInquiries(res.data.data);
      setStats(res.data.stats);
    } catch (err) {
      if (err.response?.status === 401) navigate('/admin');
      toast.error('Failed to fetch inquiries.');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('ek_admin_token');
    if (!token) { navigate('/admin'); return; }
    authService.verify().catch(() => navigate('/admin'));
    fetchData('', '');
  }, [navigate]);

  // Debounced re-fetch whenever search or district changes
  useEffect(() => {
    const timer = setTimeout(() => fetchData(search, districtFilter), 400);
    return () => clearTimeout(timer);
  }, [search, districtFilter]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await inquiryService.delete(id);
      toast.success('Inquiry deleted.');
      fetchData();
    } catch {
      toast.error('Delete failed.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await inquiryService.updateStatus(id, status);
      setInquiries((prev) => prev.map((i) => (i._id === id ? { ...i, status } : i)));
    } catch {
      toast.error('Status update failed.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ek_admin_token');
    localStorage.removeItem('ek_admin_user');
    navigate('/admin');
  };

  const statCards = [
    { label: 'Total Inquiries', value: stats.total || 0, icon: '📋', color: 'from-emerald-900/60 to-teal-900/40' },
    { label: 'New (Unread)', value: stats.new || 0, icon: '🔔', color: 'from-blue-900/60 to-indigo-900/40' },
    { label: 'Today', value: stats.today || 0, icon: '📅', color: 'from-amber-900/60 to-orange-900/40' },
    { label: 'Districts', value: stats.byDistrict?.length || 0, icon: '📍', color: 'from-purple-900/60 to-pink-900/40' },
  ];

  return (
    <div className="min-h-screen bg-[#071729]">
      {/* Top nav */}
      <nav className="bg-[#040e1a]/90 backdrop-blur-xl border-b border-white/6 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
            <GiPalmTree className="text-white text-sm" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm leading-none">Explore Kerala</div>
            <div className="text-white/30 text-xs">Admin Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-white/40 text-sm">
            <AiOutlineUser />
            <span>{adminUser}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg transition-all"
          >
            <FiLogOut size={14} /> Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card bg-gradient-to-br ${card.color} p-5`}
            >
              <div className="text-2xl mb-2">{card.icon}</div>
              <div className="text-3xl font-display font-bold text-white">{card.value}</div>
              <div className="text-white/40 text-xs mt-1">{card.label}</div>
            </motion.div>
          ))}
        </div>

        {/* District breakdown */}
        {stats.byDistrict?.length > 0 && (
          <div className="glass-card p-5 mb-6">
            <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-4">Inquiries by District</h3>
            <div className="flex flex-wrap gap-3">
              {stats.byDistrict.map((d) => (
                <div key={d._id} className="flex items-center gap-2 px-3 py-1.5 bg-emerald-900/30 border border-emerald-700/30 rounded-full text-sm">
                  <span className="text-emerald-400 font-medium">{d._id}</span>
                  <span className="text-white/40">{d.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or place..."
              className="input-field pl-10 w-full"
            />
          </div>
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="input-field w-full sm:w-48 appearance-none"
          >
            <option value="" className="bg-[#071729]">All Districts</option>
            {DISTRICTS.map((d) => (
              <option key={d} value={d} className="bg-[#071729]">{d}</option>
            ))}
          </select>
          <button
            onClick={() => fetchData(search, districtFilter)}
            className="flex items-center justify-center gap-2 px-4 py-3 glass-card text-white/60 hover:text-white rounded-xl transition-all text-sm"
          >
            <FiRefreshCw className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden">
          <div className="px-6 py-4 border-b border-white/6 flex items-center justify-between">
            <h2 className="text-white font-semibold">
              All Inquiries
              <span className="ml-2 text-white/30 text-sm font-normal">({inquiries.length})</span>
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
            </div>
          ) : inquiries.length === 0 ? (
            <div className="text-center py-20 text-white/30">
              <div className="text-4xl mb-3">🌿</div>
              <p>No inquiries found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/6">
                    {['Name', 'Contact', 'Location', 'Status', 'Date', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-6 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inq, i) => (
                    <motion.tr
                      key={inq._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-white/4 hover:bg-white/2 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="text-white font-medium text-sm">{inq.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white/60 text-xs flex items-center gap-1 mb-0.5">
                          <FiMail size={10} /> {inq.email}
                        </div>
                        <div className="text-white/60 text-xs flex items-center gap-1">
                          <FiPhone size={10} /> {inq.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white/70 text-sm">{inq.place}</div>
                        <div className="text-white/40 text-xs flex items-center gap-1">
                          <FiMapPin size={10} /> {inq.district}
                          {inq.area && ` · ${inq.area}`}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                          className={`text-xs px-2.5 py-1 rounded-full border cursor-pointer bg-transparent appearance-none ${STATUS_COLORS[inq.status]}`}
                        >
                          <option value="new" className="bg-[#071729]">New</option>
                          <option value="contacted" className="bg-[#071729]">Contacted</option>
                          <option value="resolved" className="bg-[#071729]">Resolved</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-white/40 text-xs">
                        {new Date(inq.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(inq._id)}
                          disabled={deletingId === inq._id}
                          className="p-2 text-white/30 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all disabled:opacity-40"
                          aria-label="Delete inquiry"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
