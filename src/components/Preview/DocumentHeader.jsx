import React from 'react';

function DocumentHeader({ headerInfo }) {
  const { aliciFirma, ilgili, tarih, proje } = headerInfo;

  const formatTarih = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', month: 'long' }).format(date);
    } catch {
      return dateString;
    }
  };

  return (
    <div className="mb-10 px-2">
      {/* Top Section with Logo and Title */}
      <div className="flex justify-between items-end pb-6 mb-6 border-b border-gray-300">
        <div>
           <img src="/logo.png" alt="MRC YALITIM Logo" className="h-[8rem] mix-blend-multiply object-contain" />
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-light tracking-widest text-brand-dark mb-1">TEKLİF <span className="font-bold text-brand-gold">FORMU</span></h2>
          <p className="text-xs text-gray-400 font-medium tracking-wider">REF NO: {Date.now().toString().slice(-6)} / {new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Customer Info Section - Sleek Design */}
      <div className="flex justify-between items-start bg-gray-50 rounded-xl p-5 border border-gray-100 shadow-sm relative overflow-hidden">
        {/* Subtle decorative left border */}
        <div className="absolute left-0 top-0 w-1.5 h-full bg-brand-gold"></div>
        
        <div className="space-y-3 pl-2 w-1/2">
          <div>
            <div className="text-[10px] uppercase text-gray-400 font-bold tracking-widest mb-0.5">ALICI FİRMA</div>
            <div className="font-bold text-brand-dark text-lg">{aliciFirma || '-'}</div>
          </div>
          {ilgili && (
            <div>
              <div className="text-[10px] uppercase text-gray-400 font-bold tracking-widest mb-0.5">İLGİLİ KİŞİ</div>
              <div className="text-gray-800 font-medium">{ilgili}</div>
            </div>
          )}
        </div>
        
        <div className="space-y-3 w-1/2 pl-6 border-l border-gray-200">
          <div>
            <div className="text-[10px] uppercase text-gray-400 font-bold tracking-widest mb-0.5">PROJE ADI</div>
            <div className="text-gray-800 font-medium">{proje || '-'}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-gray-400 font-bold tracking-widest mb-0.5">TARİH</div>
            <div className="text-gray-800 font-medium">{formatTarih(tarih)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentHeader;
