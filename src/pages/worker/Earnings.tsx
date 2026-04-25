import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import BottomNav from '../../components/BottomNav';

export default function Earnings() {
  const { profile } = useAuth();
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#1A1A2E] mb-6">{t('dashboard')}</h1>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[#0284c7] text-white p-5 rounded-xl shadow-md">
                <p className="text-sm opacity-80 mb-1">{t('total_earnings')}</p>
                <p className="text-xl font-bold">12,500 دج</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-[#6B7280] mb-1">{t('completed_bookings')}</p>
                <p className="text-xl font-bold text-[#1A1A2E]">8</p>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-[#1A1A2E] mb-6">{t('weekly_earnings')}</h3>
            <div className="flex items-end gap-3 h-32">
                <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-[#0284c7] rounded-sm" style={{height: '60%'}}></div>
                    <span className="text-xs text-[#6B7280]">السبت</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-[#f59e0b] rounded-sm" style={{height: '85%'}}></div>
                    <span className="text-xs text-[#6B7280]">الأحد</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-[#0284c7] rounded-sm" style={{height: '40%'}}></div>
                    <span className="text-xs text-[#6B7280]">الاثنين</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-sm" style={{height: '10%'}}></div>
                    <span className="text-xs text-[#6B7280]">الثلاثاء</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-sm" style={{height: '0%'}}></div>
                    <span className="text-xs text-[#6B7280]">الأربعاء</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-sm" style={{height: '0%'}}></div>
                    <span className="text-xs text-[#6B7280]">الخميس</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-sm" style={{height: '0%'}}></div>
                    <span className="text-xs text-[#6B7280]">الجمعة</span>
                </div>
            </div>
        </div>

      </div>
      <BottomNav role="worker" />
    </div>
  );
}
