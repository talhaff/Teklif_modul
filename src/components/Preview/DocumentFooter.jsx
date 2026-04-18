import React from 'react';

function DocumentFooter({ footerNotes }) {
  return (
    <div className="mt-4 flex flex-col pt-4 h-full">
      
      {/* Signature and Notes Section */}
      <div className="flex justify-between items-start mb-6 px-2 flex-1">
        {/* Dynamic Notes */}
        <div className="w-2/3 pr-8">
          <div className="bg-gray-50 border-l-4 border-brand-green p-4 rounded-r-lg">
            <h4 className="font-bold text-brand-dark tracking-widest text-xs mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
              ÖNEMLİ NOTLAR VE ŞARTLAR
            </h4>
            <ul className="text-[11px] text-gray-600 space-y-1.5 leading-relaxed">
              {footerNotes.map((note, idx) => {
                if (!note.trim()) return null;
                return <li key={idx} className="flex gap-2"><span className="text-brand-gold mt-0.5">•</span> <span>{note}</span></li>;
              })}
            </ul>
          </div>
        </div>

        {/* Signature Area */}
        <div className="w-1/3 flex flex-col items-center pt-2">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-12">Müşteri Onayı</div>
          <div className="w-3/4 border-b border-gray-400"></div>
          <div className="text-[10px] text-gray-400 mt-2">Kaşe / İmza</div>
        </div>
      </div>

      {/* Static Footer Banner (Full width of the container) */}
      <div className="bg-brand-dark text-white rounded-t-xl overflow-hidden mt-auto mx-2 flex justify-between items-center shadow-md">
         {/* Gold accent line */}
         <div className="w-1.5 h-full bg-brand-gold absolute left-0 bottom-0"></div>
         <div className="py-3 px-6 flex-1 flex flex-col justify-center border-r border-gray-700/50">
            <div className="font-bold text-sm tracking-wide mb-1 text-brand-gold">MRC YALITIM İNŞAAT SAN. TİC. LTD. ŞTİ.</div>
            <div className="text-xs text-gray-300">1.OSB MAHALLESİ 5.CADDE NO:13/2</div>
         </div>
         <div className="py-3 px-6 flex flex-col justify-center items-end min-w-[180px]">
            <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">İletişim</div>
            <div className="font-bold text-sm tracking-wider">0532 258 52 44</div>
         </div>
      </div>
    </div>
  );
}

export default DocumentFooter;
