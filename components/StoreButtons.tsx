import React from 'react';
import Image from 'next/image';

const StoreButtons = ({ className = '' }) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
        <Image src="/playstore.svg" alt="Get it on Google Play" width={44} height={44} className="h-11" />
      </a>
      <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
        <Image src="/applestore.svg" alt="Download on the App Store" width={44} height={44} className="h-11" />
      </a>
    </div>
  );
};

export default StoreButtons;
