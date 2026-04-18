import React from 'react';
import DocumentHeader from './DocumentHeader';
import DocumentTable from './DocumentTable';
import DocumentFooter from './DocumentFooter';

function A4Document({ headerInfo, settings, items, calculatedItems, totals, footerNotes }) {
  return (
    <div id="pdf-content" className="a4-paper flex flex-col relative text-gray-800 shrink-0 bg-white">
      {/* Decorative top stripe */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-green via-brand-dark to-brand-gold"></div>
      
      <div className="flex-1 flex flex-col pt-2 pb-4">
        <DocumentHeader headerInfo={headerInfo} />
        <DocumentTable items={calculatedItems} settings={settings} totals={totals} />
        <DocumentFooter footerNotes={footerNotes} />
      </div>
    </div>
  );
}

export default A4Document;
