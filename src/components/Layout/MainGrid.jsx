import React, { useState, useEffect, useRef } from 'react';
import FormPanel from '../Sidebar/FormPanel';
import A4Document from '../Preview/A4Document';
import { Edit3, Eye } from 'lucide-react';

function MainGrid(props) {
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'preview'
  const [scale, setScale] = useState(1);
  const previewContainerRef = useRef(null);

  // Mobil cihazlarda A4 belgesini sığdırmak için ölçek hesaplama
  useEffect(() => {
    const calculateScale = () => {
      if (window.innerWidth < 768) {
        // A4 width is 210mm. We need to fit it into container width.
        // Let's assume 1mm = 3.78px approx, so 210mm = 793.8px.
        // But let's just use the physical width of the container.
        const containerWidth = window.innerWidth - 32; // 16px padding on both sides
        const a4WidthInPx = 210 * 3.7795275591; // Convert 210mm to pixels
        const newScale = containerWidth / a4WidthInPx;
        setScale(Math.min(newScale, 1));
      } else {
        setScale(1);
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-gray-100">
      {/* Mobile Tabs */}
      <div className="md:hidden flex bg-white border-b border-gray-200 sticky top-0 z-20">
        <button
          onClick={() => setActiveTab('form')}
          className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold text-sm transition-colors ${
            activeTab === 'form' ? 'text-brand-gold border-b-2 border-brand-gold bg-brand-gold/5' : 'text-gray-500'
          }`}
        >
          <Edit3 size={18} /> DÜZENLE
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold text-sm transition-colors ${
            activeTab === 'preview' ? 'text-brand-gold border-b-2 border-brand-gold bg-brand-gold/5' : 'text-gray-500'
          }`}
        >
          <Eye size={18} /> ÖNİZLEME
        </button>
      </div>

      {/* Form Panel - Hide on mobile if preview tab is active */}
      <div className={`w-full md:max-w-md bg-white border-r border-gray-200 overflow-y-auto ${activeTab === 'preview' ? 'hidden md:block' : 'block'}`} style={{ height: window.innerWidth >= 768 ? 'calc(100vh - 64px)' : 'auto' }}>
        <FormPanel {...props} />
      </div>
      
      {/* Preview Panel - Hide on mobile if form tab is active */}
      <div 
        ref={previewContainerRef}
        className={`flex-1 overflow-y-auto bg-gray-200 p-4 md:p-8 flex justify-center ${activeTab === 'form' ? 'hidden md:flex' : 'flex'}`}
        style={{ 
          height: window.innerWidth >= 768 ? 'calc(100vh - 64px)' : 'auto',
          '--a4-scale': scale
        }}
      >
        <div className="w-full flex justify-center h-fit">
          <A4Document {...props} />
        </div>
      </div>
    </div>
  );
}

export default MainGrid;
