"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCookie } from '../../../../utils/cookies';
import YummyText from '../../../../components/YummyText';

export default function PaymentCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('Processing payment...');

  useEffect(() => {
    const processCallback = async () => {
      try {
        const q = searchParams;
        const reference = q?.get('reference') || q?.get('trxref') || q?.get('trx_ref') || q?.get('trx') || q?.get('paymentId');
        const deliveryId = getCookie('pending_payment_delivery_id') || q?.get('deliveryId') || q?.get('delivery_id');

        if (!reference) {
          setStatus('No payment reference found. Redirecting...');
          setTimeout(() => router.replace('/customer/deliveries'), 1500);
          return;
        }

        const relativeUrl = `/customer/payment/success?paymentId=${encodeURIComponent(reference)}${deliveryId ? `&deliveryId=${encodeURIComponent(deliveryId)}` : ''}`;
        const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${relativeUrl}` : relativeUrl;

        setStatus('Payment received! Verifying...');

        try {
          const opener = typeof window !== 'undefined' ? window.opener : null;
          if (opener && !opener.closed) {
            try {
              opener.location.href = fullUrl;
              setTimeout(() => { try { window.close(); } catch (e) { } }, 300);
              return;
            } catch (err) {
              try { opener.postMessage({ type: 'PAYMENT_REDIRECT', url: relativeUrl, fullUrl }, '*'); } catch (e) { }
              setTimeout(() => { try { window.close(); } catch (e) { } }, 300);
              return;
            }
          }
        } catch (e) {
          // ignore
        }

        setTimeout(() => router.replace(relativeUrl), 400);
      } catch (err) {
        console.error('Payment callback error', err);
        setStatus('Error processing payment. Redirecting...');
        setTimeout(() => router.replace('/customer/deliveries'), 1500);
      }
    };

    processCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-t-transparent border-green-500 animate-spin" />
        <YummyText className="text-lg text-[#0F172A]">{status}</YummyText>
        <p className="text-sm text-[#64748B]">Please wait while we confirm your payment...</p>
      </div>
    </div>
  );
}
