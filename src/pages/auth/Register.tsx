import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useI18n } from '../../contexts/I18nContext';
import { useAuth, UserProfile } from '../../contexts/AuthContext';

const wilayasList = ["1- أدرار", "2- الشلف", "3- الأغواط", "16- الجزائر العاصمة", "31- وهران"];

export default function Register() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [wilaya, setWilaya] = useState(wilayasList[0]);
  const [role, setRole] = useState<'client' | 'worker'>('client');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { t, lang } = useI18n();
  const { reloadProfile } = useAuth();
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !password) return;
    setLoading(true);
    setError('');
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, `${phone}@nqaa.com`, password);
      const uid = userCredential.user.uid;

      const userRef = doc(db, 'users', uid);
      const profileData: UserProfile = {
        uid,
        fullName: name,
        phone,
        wilaya,
        commune: '',
        role,
        photoUrl: '',
        isVerified: false,
        preferredLang: lang,
        createdAt: Date.now(),
      };
      
      await setDoc(userRef, profileData);
      
      if (role === 'worker') {
        const workerRef = doc(db, 'workers', uid);
        await setDoc(workerRef, {
          uid,
          bio: '',
          bioFr: '',
          services: [],
          wilayasServed: [wilaya],
          pricePerHour: 0,
          pricePerSession: 0,
          rating: 0,
          totalReviews: 0,
          totalBookings: 0,
          isAvailable: true,
          idCardVerified: false
        });
      }
      
      await reloadProfile();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-[#F8F9FA] overflow-y-auto relative">
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

      <h1 className="text-3xl font-bold text-[#0284c7] mt-12 mb-6 text-center">{t('app_name')}</h1>
      
      <form onSubmit={handleRegister} className="flex-1 max-w-sm w-full mx-auto space-y-4 pb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('register')}</h2>
        {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
        
        <div>
          <label className="block text-sm font-medium mb-1">{t('full_name')}</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0284c7]" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">{t('phone_number')}</label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required dir="ltr"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0284c7]" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t('password')}</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required dir="ltr"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0284c7]" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t('wilaya')}</label>
          <select value={wilaya} onChange={e => setWilaya(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0284c7]">
            {wilayasList.map(w => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>

        <div className="flex space-x-4 space-x-reverse pt-2">
          <div 
            onClick={() => setRole('client')}
            className={`flex-1 p-4 rounded-lg border-2 cursor-pointer text-center font-medium transition-colors ${role === 'client' ? 'border-[#0284c7] bg-[#e0f2fe] text-[#0284c7]' : 'border-gray-200 bg-white'}`}
          >
            {t('client_role')}
          </div>
          <div 
            onClick={() => setRole('worker')}
            className={`flex-1 p-4 rounded-lg border-2 cursor-pointer text-center font-medium transition-colors ${role === 'worker' ? 'border-[#0284c7] bg-[#e0f2fe] text-[#0284c7]' : 'border-gray-200 bg-white'}`}
          >
            {t('worker_role')}
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="w-full bg-[#0284c7] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-70 transition-opacity mt-4">
          {loading ? '...' : t('register')}
        </button>
        
        <div className="text-center pt-2">
          <Link to="/login" className="text-[#0284c7] hover:underline">{t('login')}</Link>
        </div>

        <div className="pt-6 text-center pb-6">
          <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">{t('tagline')}</p>
        </div>
      </form>
    </div>
  );
}
