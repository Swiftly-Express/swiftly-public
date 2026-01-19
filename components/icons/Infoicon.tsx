import React from 'react';

const Infoicon = ({ width = '16', height = '16', stroke = '#64748B' }: { width?: string; height?: string; stroke?: string }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={stroke} strokeWidth="1.5" />
    <path d="M12 8v.01" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11.25 12.5h1.5v3h-1.5z" fill={stroke} />
  </svg>
);

export default Infoicon;
