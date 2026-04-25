import React from 'react';
import { useI18n } from '../../contexts/I18nContext';

export default function Splash() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-[#0284c7]">
      <div className="text-center animate-pulse">
        <img src="/logo.png" alt={t('app_name')} className="h-40 mb-8 mx-auto object-contain" />
        <div className="w-10 h-10 border-4 border-[#0284c7] border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}
