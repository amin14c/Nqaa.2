import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import BottomNav from '../../components/BottomNav';

export default function WorkerHome() {
  const { profile } = useAuth();
  const { t } = useI18n();
  const [isAvailable, setIsAvailable] = React.useState(true);

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#1A1A2E]">لوحة التحكم</h1>
          
          <label className="flex items-center cursor-pointer">
            <span className="me-3 text-sm font-medium text-[#1A1A2E]">
              {isAvailable ? t('available') : t('not_available')}
            </span>
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={isAvailable} onChange={() => setIsAvailable(!isAvailable)} />
              <div className={`block w-14 h-8 rounded-full ${isAvailable ? 'bg-[#0284c7]' : 'bg-gray-300'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${isAvailable ? 'translate-x-6' : ''}`}></div>
            </div>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 border-s-4 border-s-[#f59e0b]">
            <p className="text-sm text-[#6B7280] mb-1">حجوزات اليوم</p>
            <p className="text-2xl font-bold text-[#1A1A2E]">2</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 border-s-4 border-s-[#0284c7]">
            <p className="text-sm text-[#6B7280] mb-1">{t('earnings')}</p>
            <p className="text-xl font-bold text-[#0284c7]">3,500 دج</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">{t('new_requests')}</h2>
          <div className="space-y-4">
            {/* Mocked request */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between mb-3">
                <h3 className="font-semibold text-[#1A1A2E]">تنظيف مكاتب</h3>
                <span className="text-sm text-[#f59e0b] bg-orange-50 px-2 py-1 rounded">قيد الانتظار</span>
              </div>
              <p className="text-sm text-[#6B7280] mb-4">العميل: كريم ز. • الجزائر العاصمة</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-[#0284c7] text-white py-2 rounded-lg font-medium hover:bg-opacity-90">{t('accept')}</button>
                <button className="flex-1 border border-gray-300 text-[#1A1A2E] py-2 rounded-lg font-medium hover:bg-gray-50">{t('reject')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNav role="worker" />
    </div>
  );
}
