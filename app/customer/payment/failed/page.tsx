"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import YummyText from '../../../../components/YummyText';

export default function PaymentFailedPage() {
  const router = useRouter();
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-2xl shadow text-center">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path d="M12 9v4" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="9" stroke="#DC2626" strokeWidth="2.5" />
          </svg>
        </div>
        <YummyText className="text-2xl font-bold text-gray-900">Payment Not Completed</YummyText>
        <YummyText className="text-base text-gray-600">Your payment was not completed. Please try again.</YummyText>
        <div className="mt-6 flex gap-3 justify-center">
          <button onClick={() => router.push('/customer/deliveries')} className="px-6 py-3 bg-[#00B75A] text-white rounded-full">My Deliveries</button>
          <button onClick={() => router.push('/')} className="px-6 py-3 bg-gray-100 rounded-full">Home</button>
        </div>
      </div>
    </div>
  );
}
