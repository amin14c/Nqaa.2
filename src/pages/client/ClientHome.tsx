import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import BottomNav from '../../components/BottomNav';
import { Link } from 'react-router-dom';

export default function ClientHome() {
  const { profile } = useAuth();
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#1A1A2E] mb-2">مرحباً {profile?.fullName}</h1>
        <p className="text-[#6B7280] mb-6">ما زلت تبحث عن عامل النظافة المثالي؟</p>

        <Link to="/search" className="block">
          <div className="bg-[#0284c7] text-white p-6 rounded-2xl shadow-md mb-8 flex items-center justify-between hover:bg-opacity-95 transition-all cursor-pointer">
            <span className="text-xl font-semibold gap-2">{t('find_worker')}</span>
            <span className="bg-white/20 p-2 rounded-full px-4">→</span>
          </div>
        </Link>

        <div>
          <h2 className="text-xl font-semibold mb-4">{t('recommended_workers')}</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
              <div className="ms-4 flex-1">
                <h3 className="font-semibold text-[#1A1A2E]">خديجة م.</h3>
                <p className="text-sm text-[#6B7280]">{t('standard_cleaning')} • 4.8 ★</p>
              </div>
              <div className="text-[#0284c7] font-semibold">1200 {t('hour')}</div>
            </div>
            {/* Mocked another worker */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
              <div className="ms-4 flex-1">
                <h3 className="font-semibold text-[#1A1A2E]">أمين ط.</h3>
                <p className="text-sm text-[#6B7280]">{t('deep_cleaning')} • 4.9 ★</p>
              </div>
              <div className="text-[#0284c7] font-semibold">1500 {t('hour')}</div>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNav role="client" />
    </div>
  );
}
