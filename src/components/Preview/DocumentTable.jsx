import React from 'react';
import { formatCurrency, parseNumber } from '../../utils/formatters';

function DocumentTable({ items, settings, totals }) {
  const { kdvDahil, currency } = settings;

  return (
    <div className="mb-4 flex-1 flex flex-col px-2">
      <div className="rounded-xl overflow-hidden border border-gray-200">
        <table className="w-full text-[11px] border-collapse bg-white">
          <thead>
            <tr className="bg-brand-dark text-white border-b-2 border-brand-gold">
              <th className="py-1.5 px-4 text-left font-medium tracking-wide">ÜRÜN ADI</th>
              <th className="py-1.5 px-2 text-center font-medium tracking-wide w-20">MİKTAR</th>
              <th className="py-1.5 px-2 text-center font-medium tracking-wide w-16">BİRİM</th>
              <th className="py-1.5 px-4 text-right font-medium tracking-wide w-28">B. FİYAT</th>
              <th className="py-1.5 px-4 text-right font-medium tracking-wide w-28">TUTAR</th>
              {kdvDahil && (
                <th className="py-1.5 px-3 text-right font-medium tracking-wide w-24">KDV</th>
              )}
              <th className="py-1.5 px-4 text-right font-bold text-brand-gold tracking-wide w-32">TOPLAM</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {items.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="py-1.5 px-4 font-medium text-brand-dark">{item.urunAdi || '-'}</td>
                <td className="py-1.5 px-2 text-center">{item.miktar}</td>
                <td className="py-1.5 px-2 text-center text-[10px] text-gray-500">{item.birim}</td>
                <td className="py-1.5 px-4 text-right tabular-nums">{formatCurrency(item.birimFiyat, currency)}</td>
                <td className="py-1.5 px-4 text-right tabular-nums">{formatCurrency(item.tutar, currency)}</td>
                {kdvDahil && (
                  <td className="py-1.5 px-3 text-right text-gray-400 tabular-nums">{formatCurrency(item.kdv, currency)}</td>
                )}
                <td className="py-1.5 px-4 text-right font-semibold text-brand-dark tabular-nums">{formatCurrency(item.toplam, currency)}</td>
              </tr>
            ))}
            
            {/* Elegant padding rows if items are too few to stretch the table a bit */}
            {items.length < 5 && Array.from({ length: 5 - items.length }).map((_, i) => (
              <tr key={`empty-${i}`} className="border-b border-gray-50 h-8">
                <td className="px-4"></td><td className="px-2"></td><td className="px-2"></td>
                <td className="px-4"></td><td className="px-4"></td>
                {kdvDahil && <td className="px-3"></td>}
                <td className="px-4"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals Section */}
      <div className="flex justify-end mt-2">
        <div className="w-80 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-4 space-y-3">
            {kdvDahil && (
              <>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-medium text-gray-500 uppercase tracking-wider">Ara Toplam</span>
                  <span className="font-semibold text-brand-dark tabular-nums">{formatCurrency(totals.araToplam, currency)}</span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-medium text-gray-500 uppercase tracking-wider">Toplam KDV (%{settings.kdvOrani || 20})</span>
                  <span className="font-semibold text-brand-dark tabular-nums">{formatCurrency(totals.toplamKdv, currency)}</span>
                </div>
              </>
            )}
          </div>
          <div className="bg-brand-dark p-4 flex justify-between items-center border-t-2 border-brand-gold">
            <span className="font-bold text-white tracking-widest uppercase text-sm">Genel Toplam</span>
            <span className="font-bold text-brand-gold text-lg tabular-nums tracking-wide">{formatCurrency(totals.genelToplam, currency)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentTable;
