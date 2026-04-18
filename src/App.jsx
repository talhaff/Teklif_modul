import React from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import MainGrid from './components/Layout/MainGrid';
import { v4 as uuidv4 } from 'uuid';
import { parseNumber } from './utils/formatters';

const DEFAULT_ITEMS = [
  { id: uuidv4(), urunAdi: '', miktar: 0, birim: 'AD', birimFiyat: 0 }
];

function App() {
  const [headerInfo, setHeaderInfo] = useLocalStorage('mrc_teklif_header', {
    aliciFirma: 'GK ALTYAPI',
    ilgili: '',
    tarih: new Date().toISOString().split('T')[0],
    proje: 'AKPINAR ŞANTİYESİ'
  });

  const [settings, setSettings] = useLocalStorage('mrc_teklif_settings', {
    kdvDahil: false, // Default false/kdv haric? As requested "KDV pasif edildiğinde..." usually false means KDV Hariç. We'll default to true (KDV applied) and user can disable.
    currency: 'TL',
    kdvOrani: 20 // Standard KDV is 20 in TR right now
  });

  const [items, setItems] = useLocalStorage('mrc_teklif_items', DEFAULT_ITEMS);

  const [footerNotes, setFooterNotes] = useLocalStorage('mrc_teklif_notes', [
    "ÖDEME: FATURA +60 GÜN OLARAK HESAPLANMIŞTIR",
    "NAKLİYE: MALATYA ŞEHİR İÇİ ŞANTİYE TESLİMDİR.",
    "TERMİN: ONAYDAN SONRA ÜRETİME ALINACAKTIR."
  ]);

  // Derived calculations
  const calculatedItems = items.map(item => {
    const tutar = parseNumber(item.miktar) * parseNumber(item.birimFiyat);
    let kdvTutar = 0;
    
    // If setting is KDV Dahil, then we calculate KDV based on settings.kdvOrani.
    // Wait, the requirement says "KDV Dahil / KDV Hariç anahtarı olmalıdır. KDV pasif edildiğinde KDV sütunu gizlenmeli ve genel toplam ham tutarlar üzerinden hesaplanmalıdır."
    // meaning if active, we Calculate KDV.
    if (settings.kdvDahil) {
      kdvTutar = tutar * (settings.kdvOrani / 100);
    }
    
    const toplam = tutar + kdvTutar;
    
    return { ...item, tutar, kdv: kdvTutar, toplam };
  });

  const totals = calculatedItems.reduce((acc, curr) => {
    acc.araToplam += curr.tutar;
    acc.toplamKdv += curr.kdv;
    acc.genelToplam += curr.toplam;
    return acc;
  }, { araToplam: 0, toplamKdv: 0, genelToplam: 0 });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <header className="bg-brand-dark text-white py-4 px-6 fixed w-full top-0 z-10 shadow-md">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-brand-gold">MRC</span> YALITIM & SÖVE - Hızlı Teklif Sistemi
        </h1>
      </header>

      <main className="mt-16 flex-1 flex">
        <MainGrid 
          headerInfo={headerInfo} setHeaderInfo={setHeaderInfo}
          settings={settings} setSettings={setSettings}
          items={items} setItems={setItems} calculatedItems={calculatedItems}
          footerNotes={footerNotes} setFooterNotes={setFooterNotes}
          totals={totals}
        />
      </main>
    </div>
  );
}

export default App;
