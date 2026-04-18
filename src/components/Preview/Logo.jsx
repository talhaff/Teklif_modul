import React from 'react';

// Generates a text-based logo that looks premium and resembles the user's layout
export default function Logo() {
  return (
    <div className="flex flex-col items-start justify-center">
      <div className="flex items-baseline" style={{ letterSpacing: '-0.05em' }}>
        <span className="text-6xl font-black text-brand-green drop-shadow-md relative" style={{ textShadow: "2px 2px 0px #b8860b" }}>
          M
        </span>
        <span className="text-6xl font-black text-brand-green drop-shadow-md relative" style={{ textShadow: "2px 2px 0px #b8860b" }}>
          R
        </span>
        <span className="text-6xl font-black text-brand-green drop-shadow-md relative" style={{ textShadow: "2px 2px 0px #b8860b" }}>
          C
        </span>
      </div>
      <div className="text-brand-gold font-bold tracking-widest uppercase text-xs mt-1 border-t border-brand-gold pt-1 w-full text-center">
        YALITIM & SÖVE
      </div>
    </div>
  );
}
