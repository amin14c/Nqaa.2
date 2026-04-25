import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Calendar, User, DollarSign } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';

export default function BottomNav({ role }: { role: 'client' | 'worker' }) {
  const loc = useLocation();
  const { t } = useI18n();

  const clientLinks = [
    { to: '/', icon: <Home size={24} />, label: t('home') },
    { to: '/search', icon: <Search size={24} />, label: t('search') },
    // Mock Bookings path for now
    { to: '/bookings', icon: <Calendar size={24} />, label: t('my_bookings') },
    { to: '/profile', icon: <User size={24} />, label: t('profile') },
  ];

  const workerLinks = [
    { to: '/', icon: <Home size={24} />, label: t('home') },
    { to: '/requests', icon: <Calendar size={24} />, label: t('my_bookings') },
    { to: '/earnings', icon: <DollarSign size={24} />, label: t('earnings') },
    { to: '/profile', icon: <User size={24} />, label: t('profile') },
  ];

  const links = role === 'client' ? clientLinks : workerLinks;

  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around p-3 z-50">
      {links.map((link) => {
        const active = loc.pathname === link.to;
        return (
          <Link to={link.to} key={link.to} className={`flex flex-col items-center ${active ? 'text-[#0284c7]' : 'text-gray-400'}`}>
            {link.icon}
            <span className="text-[10px] mt-1 font-medium">{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
