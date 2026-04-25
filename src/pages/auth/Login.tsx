import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useI18n } from '../../contexts/I18nContext';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { t, lang, setLang } = useI18n();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !password) return;
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, `${phone}@nqaa.com`, password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col p-6 bg-[#F8F9FA] relative">
      <div className="absolute top-4 end-4 flex gap-2">
        <button 
          onClick={() => setLang('ar')}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${lang === 'ar' ? 'bg-[#0284c7] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          عربية
        </button>
        <button 
          onClick={() => setLang('fr')}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${lang === 'fr' ? 'bg-[#0284c7] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Français
        </button>
      </div>

      <h1 className="text-3xl font-bold text-[#0284c7] mt-12 mb-8 text-center">{t('app_name')}</h1>
      
      <form onSubmit={handleLogin} className="flex-1 max-w-sm w-full mx-auto space-y-6">
        <h2 className="text-2xl font-semibold">{t('login')}</h2>
        {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
        <div>
          <label className="block text-sm font-medium mb-1 text-[#1A1A2E]">{t('phone_number')}</label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
            dir="ltr"
            placeholder="05..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-[#1A1A2E]">{t('password')}</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
            dir="ltr"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#0284c7] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-70 transition-opacity"
        >
          {loading ? '...' : t('login')}
        </button>
        
        <div className="text-center pt-4">
          <Link to="/register" className="text-[#0284c7] hover:underline">{t('register')}</Link>
        </div>

        <div className="pt-8 text-center">
          <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">{t('tagline')}</p>
        </div>
      </form>
    </div>
  );
}
