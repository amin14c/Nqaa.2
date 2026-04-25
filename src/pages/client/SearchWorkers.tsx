import React, { useState, useEffect } from 'react';
import { useI18n } from '../../contexts/I18nContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import BottomNav from '../../components/BottomNav';
import { Search } from 'lucide-react';

export default function SearchWorkers() {
  const { t } = useI18n();
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Note: To show any workers immediately, we could omit the where isAvailable=true until configured properly by workers
    // but the rules allow it. We will fetch all workers for mock demonstration.
    const fetchWorkers = async () => {
      try {
        const q = query(collection(db, 'workers'));
        const snap = await getDocs(q);
        const dataList: any[] = [];
        snap.forEach(doc => {
          dataList.push(doc.data());
        });
        setWorkers(dataList);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#1A1A2E] mb-6">{t('search')}</h1>

        <div className="relative mb-8">
            <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input 
                type="text" 
                placeholder={t('find_worker')}
                className="w-full border-gray-200 py-3 ps-12 pe-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7] border"
            />
        </div>

        {loading ? (
            <div className="text-center py-10">...</div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workers.length === 0 ? (
                    <div className="text-gray-500 text-center py-10">No workers available.</div>
                ) : (
                    workers.map((w, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-[#0284c7]">
                            <h3 className="font-semibold text-lg text-[#1A1A2E] mb-1">عامل نظافة محترف</h3>
                            <p className="text-sm text-[#6B7280] mb-4">يعمل في: {w.wilayasServed?.[0]}</p>
                            <button className="w-full bg-[#0284c7] text-white py-2 rounded-lg hover:bg-opacity-90">{t('book_now')}</button>
                        </div>
                    ))
                )}
                {/* Mock worker since real one is likely empty */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-[#0284c7]">
                    <h3 className="font-semibold text-lg text-[#1A1A2E] mb-1">عائشة م.</h3>
                    <p className="text-sm text-[#6B7280] mb-4">الجزائر العاصمة</p>
                    <button className="w-full bg-[#0284c7] text-white py-2 rounded-lg hover:bg-opacity-90">{t('book_now')}</button>
                </div>
            </div>
        )}
      </div>
      <BottomNav role="client" />
    </div>
  );
}
