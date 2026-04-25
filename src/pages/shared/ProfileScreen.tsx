import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import BottomNav from '../../components/BottomNav';
import { LogOut, Globe } from 'lucide-react';

export default function ProfileScreen() {
  const { profile, logout } = useAuth();
  const { t, lang, setLang } = useI18n();

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#1A1A2E] mb-8">{t('profile')}</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-[#1A1A2E]">{profile?.fullName}</h2>
            <p className="text-[#6B7280]">{profile?.phone}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Globe className="text-[#6B7280]" size={20} />
                    <span className="font-medium">تغيير اللغة / Changer la langue</span>
                </div>
            </div>
            <div className="p-4 flex gap-4">
                <button 
                  onClick={() => setLang('ar')}
                  className={`flex-1 py-2 rounded-lg font-medium border transition-colors ${lang === 'ar' ? 'bg-[#0284c7] text-white border-[#0284c7]' : 'bg-white border-gray-300'}`}
                >عربية 🇩🇿</button>
                <button 
                  onClick={() => setLang('fr')}
                  className={`flex-1 py-2 rounded-lg font-medium border transition-colors ${lang === 'fr' ? 'bg-[#0284c7] text-white border-[#0284c7]' : 'bg-white border-gray-300'}`}
                >Français 🇫🇷</button>
            </div>
        </div>

        <button 
            onClick={() => logout()}
            className="w-full bg-red-50 text-red-600 rounded-xl p-4 flex items-center justify-center gap-2 font-semibold hover:bg-red-100 transition-colors"
        >
            <LogOut size={20} />
            {t('logout')}
        </button>

      </div>
      <BottomNav role={profile?.role || 'client'} />
    </div>
  );
}
