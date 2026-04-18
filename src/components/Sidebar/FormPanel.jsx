import React from 'react';
import { Plus, Trash2, Settings2, Download } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { generatePDF } from '../../utils/pdfGenerator';

function FormPanel({ 
  headerInfo, setHeaderInfo, 
  settings, setSettings, 
  items, setItems, 
  footerNotes, setFooterNotes 
}) {
  
  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => {
    setItems([...items, { id: uuidv4(), urunAdi: '', miktar: 0, birim: 'AD', birimFiyat: 0 }]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleDownload = async () => {
    const filename = `Teklif_${headerInfo.aliciFirma.replace(/\s+/g, '_')}_${headerInfo.tarih}.pdf`;
    await generatePDF('pdf-content', filename);
  };

  return (
    <div className="p-6 space-y-8 pb-32">
      {/* Header Info Form */}
      <section>
        <h3 className="text-lg font-semibold text-brand-dark mb-4 border-b pb-2">Üst Bilgiler</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Alıcı Firma</label>
            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-brand-gold focus:border-brand-gold" 
                   value={headerInfo.aliciFirma} onChange={e => setHeaderInfo({...headerInfo, aliciFirma: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">İlgili Kişi</label>
            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-brand-gold focus:border-brand-gold" 
                   value={headerInfo.ilgili} onChange={e => setHeaderInfo({...headerInfo, ilgili: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Proje Adı</label>
              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-brand-gold focus:border-brand-gold" 
                     value={headerInfo.proje} onChange={e => setHeaderInfo({...headerInfo, proje: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tarih</label>
              <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-brand-gold focus:border-brand-gold" 
                     value={headerInfo.tarih} onChange={e => setHeaderInfo({...headerInfo, tarih: e.target.value})} />
            </div>
          </div>
        </div>
      </section>

      {/* Settings (KDV & Currency) */}
      <section>
        <h3 className="text-lg font-semibold text-brand-dark mb-4 border-b pb-2 flex items-center gap-2">
          <Settings2 size={18} /> Ayarlar
        </h3>
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border">
          <div className="flex items-center">
            <input type="checkbox" id="kdvToggle" className="h-4 w-4 text-brand-gold focus:ring-brand-gold border-gray-300 rounded" 
                   checked={settings.kdvDahil} onChange={e => setSettings({...settings, kdvDahil: e.target.checked})} />
            <label htmlFor="kdvToggle" className="ml-2 block text-sm text-gray-900 font-medium">
              KDV Hesapla / Göster
            </label>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Döviz:</label>
            <select className="rounded-md border-gray-300 shadow-sm p-1 border focus:ring-brand-gold focus:border-brand-gold"
                    value={settings.currency} onChange={e => setSettings({...settings, currency: e.target.value})}>
              <option value="TL">TL (₺)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Items Table */}
      <section>
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-lg font-semibold text-brand-dark">Ürün Kalemleri</h3>
          <button onClick={addItem} className="text-brand-gold hover:text-brand-dark flex items-center gap-1 text-sm font-medium">
            <Plus size={16} /> Satır Ekle
          </button>
        </div>
        
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="p-4 bg-gray-50 border rounded-lg relative">
              <button onClick={() => removeItem(item.id)} className="absolute top-2 right-2 text-red-400 hover:text-red-600">
                <Trash2 size={16} />
              </button>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500">Ürün Adı</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-brand-gold focus:border-brand-gold text-sm" 
                         value={item.urunAdi} onChange={e => handleItemChange(item.id, 'urunAdi', e.target.value)} placeholder="Örn: 5X46,5 EPS KAT SİLMESİ" />
                </div>
                <div className="flex gap-2">
                  <div className="w-1/3">
                    <label className="block text-xs font-medium text-gray-500">Miktar</label>
                    <input type="number" min="0" step="any" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-brand-gold focus:border-brand-gold text-sm" 
                           value={item.miktar} onChange={e => handleItemChange(item.id, 'miktar', e.target.value)} />
                  </div>
                  <div className="w-1/4">
                    <label className="block text-xs font-medium text-gray-500">Birim</label>
                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-brand-gold focus:border-brand-gold text-sm"
                            value={item.birim} onChange={e => handleItemChange(item.id, 'birim', e.target.value)}>
                      <option value="AD">AD</option>
                      <option value="MT">MT</option>
                      <option value="M2">M2</option>
                      <option value="KG">KG</option>
                      <option value="TK">TK</option>
                      <option value="M3">M3</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-500">B. Fiyat</label>
                    <input type="number" min="0" step="any" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-brand-gold focus:border-brand-gold text-sm" 
                           value={item.birimFiyat} onChange={e => handleItemChange(item.id, 'birimFiyat', e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Notes Config */}
      <section>
        <h3 className="text-lg font-semibold text-brand-dark mb-4 border-b pb-2">Alt Bilgi / Notlar</h3>
        <textarea 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-brand-gold focus:border-brand-gold text-sm h-32"
          value={footerNotes.join('\n')}
          onChange={(e) => setFooterNotes(e.target.value.split('\n'))}
          placeholder="Her satır ayrı bir not olarak belgeye yansır..."
        />
        <p className="text-xs text-gray-500 mt-2">Notları ayırmak için yeni satıra (Enter) geçin.</p>
      </section>

      {/* Sticky Download Button for Panel */}
      <div className="fixed bottom-0 left-0 w-full max-w-md p-4 bg-white border-t border-gray-200">
        <button 
          onClick={handleDownload}
          className="w-full bg-brand-green hover:bg-green-800 text-white font-bold py-3 px-4 rounded-lg flex justify-center items-center gap-2 shadow-lg transition-colors"
        >
          <Download size={20} /> PDF OLARAK İNDİR
        </button>
      </div>

    </div>
  );
}

export default FormPanel;
