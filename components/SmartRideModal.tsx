'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Clock, Shield, Zap } from 'lucide-react';
import Image from 'next/image';

interface SmartRideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SmartRideModal: React.FC<SmartRideModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  // prevent background scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev || '';
      };
    }
    return;
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Glassmorphism Backdrop */}
      {/* <div 
        className="fixed inset-0 z-50 transition-all duration-300 backdrop-blur-md bg-black/30"
        onClick={onClose}
      />
       */}
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-2xl max-h-screen bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl relative animate-in fade-in zoom-in duration-300 border border-white/20 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 md:p-8">
            {/* Title */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-left text-gray-900 mb-2 sm:mb-3">
              Send a Package using Smart Ride
            </h2>

            {/* Illustration */}
            <div className="flex justify-center mb-3 sm:mb-4">
              <Image
                src="/smart-rider.svg"
                alt="Smart Ride Delivery"
                width={700}
                height={420}
                className="w-auto max-h-[20vh] sm:max-h-[28vh] md:max-h-[36vh]"
                priority
              />
            </div>

            {/* Features */}
            <div className="space-y-3 mb-3">
              {/* Feature 1 */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-0.5">
                    Ultra-Fast Same-Day Delivery
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Our network of verified riders ensures your package arrives within 2-4 hours
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-0.5">
                    Fully Insured & Tracked
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Every package is insured up to $500 with real-time GPS tracking
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-0.5">
                    Instant Rider Matching
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    AI-powered system connects you with the nearest available rider in seconds
                  </p>
                </div>
              </div>
            </div>

            {/* Promo Banner */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 mb-3">
              <p className="text-center text-xs">
                🎉 <span className="font-semibold text-orange-600">Limited Time Offer:</span> First delivery <span className="font-bold text-orange-600">50% OFF</span> for new users!
              </p>
            </div>

            {/* Action Buttons - ensure they stay visible */}
            <div className="flex gap-3 mt-1">
              <button
                onClick={() => {
                  onClose();
                  router.push('/smartride-booking');
                }}
                className="flex-1 bg-[#00D68F] hover:bg-[#00B876] text-white whitespace-nowrap font-semibold py-3 px-4 rounded-full transition-colors text-sm"
              >
                Send Package Now
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-full border border-gray-300 transition-colors text-sm"
              >
                Maybe Later
              </button>
            </div>

            {/* Footer Text */}
            <p className="text-center text-[10px] text-gray-500 mt-3">
              No credit card required to get started • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmartRideModal;