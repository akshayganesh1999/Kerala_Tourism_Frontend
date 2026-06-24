import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { GiPalmTree } from 'react-icons/gi';

const quickLinks = [
  { label: 'Destinations', href: '#destinations' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Plan Your Trip', href: '#plan-trip' },
];

const destinations = ['Munnar', 'Alleppey', 'Wayanad', 'Fort Kochi', 'Kovalam', 'Athirappilly'];

export default function Footer() {
  const scrollTo = (href) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#040e1a] border-t border-white/6">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
                <GiPalmTree className="text-white text-lg" />
              </div>
              <div>
                <div className="font-display font-bold text-white">Explore Kerala</div>
                <div className="text-gold-400 text-[10px] tracking-widest uppercase">God's Own Country</div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Your trusted Kerala travel companion — built by locals, for travellers who want the real Kerala experience.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: <FiInstagram />, label: 'Instagram' },
                { icon: <FiFacebook />, label: 'Facebook' },
                { icon: <FiTwitter />, label: 'Twitter' },
                { icon: <FiYoutube />, label: 'YouTube' },
              ].map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="w-9 h-9 glass-card rounded-lg flex items-center justify-center text-white/40 hover:text-emerald-400 hover:border-emerald-700/40 transition-all text-sm"
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-white/40 hover:text-emerald-400 text-sm transition-colors"
                  >
                    → {link.label}
                  </button>
                </li>
              ))}
              <li>
                <Link to="/admin" className="text-white/40 hover:text-emerald-400 text-sm transition-colors">
                  → Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Top Destinations</h4>
            <ul className="space-y-2.5">
              {destinations.map((d) => (
                <li key={d}>
                  <span className="text-white/40 text-sm">📍 {d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/40 text-sm">
                <FiMapPin className="mt-0.5 text-emerald-500 flex-shrink-0" />
                Kerala Tourism Office, Thiruvananthapuram, Kerala 695001
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <FiPhone className="text-emerald-500 flex-shrink-0" />
                +91 471 2321 132
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <FiMail className="text-emerald-500 flex-shrink-0" />
                hello@explorekerala.in
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Explore Kerala. All rights reserved.
          </p>
          <p className="text-white/25 text-xs">
            Built with 🌿 for God's Own Country
          </p>
        </div>
      </div>
    </footer>
  );
}
