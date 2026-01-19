"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { getCookie, deleteCookie } from '../../../../utils/cookies';
import YummyText from '../../../../components/YummyText';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.VITE_API_BASE_URL || 'https://api.swiftlyxpress.com';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState('Verifying payment...');
  const [success, setSuccess] = useState(false);
  const [deliveryId, setDeliveryId] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const q = searchParams;
        const rawPaymentId = q?.get('paymentId') || q?.get('reference') || q?.get('trx') || q?.get('payment_id');
        let paymentId = rawPaymentId || '';
        const pendingCookie = getCookie('pending_payment_id');
        if (paymentId && /^DEL[-_]/i.test(paymentId) && pendingCookie) {
          paymentId = pendingCookie;
        }

        const candidateDelivery = q?.get('deliveryId') || getCookie('pending_payment_delivery_id');
        if (candidateDelivery) setDeliveryId(candidateDelivery);

        if (!paymentId) {
          setStatusMsg('No payment identifier found in the URL.');
          setLoading(false);
          return;
        }

        setStatusMsg('Contacting payment gateway to verify transaction...');

        let final = null;
        try {
          const token = getCookie('customer_token') || getCookie('auth_token') || getCookie('rider_token') || getCookie('admin_token');
          const headers: any = { Accept: 'application/json' };
          if (token) headers.Authorization = `Bearer ${token}`;

          const r = await axios.get(`${API_BASE}/api/payment/verify/${encodeURIComponent(paymentId)}`, { headers, withCredentials: true });
          final = r.data;
        } catch (err) {
          console.warn('Verify call failed', err);
        }

        if (!final) {
          setStatusMsg('Unable to verify payment. Please check your deliveries.');
          setLoading(false);
          return;
        }

        const isSuccess = final?.status === 'success' || final?.success === true || final?.data?.status === 'success' || final?.data?.status === 'successful' || final?.payment_status === 'success';
        const foundDelivery = final?.deliveryId || final?.data?.deliveryId || final?.data?.metadata?.deliveryId || final?.metadata?.deliveryId || candidateDelivery;

        if (foundDelivery) setDeliveryId(foundDelivery);
        if (isSuccess) {
          setSuccess(true);
          setStatusMsg('Payment successful. Your delivery is being processed.');
          try { deleteCookie('pending_payment_delivery_id'); deleteCookie('pending_payment_id'); } catch (e) { }
        } else {
          setSuccess(false);
          setStatusMsg(final?.message || final?.data?.message || 'Payment was not successful.');
        }
      } catch (err) {
        console.error('Payment verification error', err);
        setStatusMsg('Failed to verify payment.');
      } finally {
        setLoading(false);
      }
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Auto-redirect countdown after successful payment
  useEffect(() => {
    if (!loading && success) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            router.push('/smartbooking/smartride-booking');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [loading, success, router]);

  const goToDeliveries = () => router.push('/customer/deliveries');

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-xl w-full p-6 bg-white rounded-2xl shadow">
        {loading ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="w-10 h-10 rounded-full border-4 border-t-transparent border-green-500 animate-spin" />
            <YummyText className="text-base text-[#64748B]">{statusMsg}</YummyText>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              {success ? (
                <div className="w-20 h-20 rounded-full bg-[#ECFDF5] flex items-center justify-center">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#FEF3F2] flex items-center justify-center">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                    <path d="M12 9v4" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="9" stroke="#DC2626" strokeWidth="2.5" />
                  </svg>
                </div>
              )}
            </div>

            <YummyText className="text-xl font-semibold mb-2">{success ? 'Payment Confirmed' : 'Payment Status'}</YummyText>
            <p className="text-sm text-[#64748B] mb-4">{statusMsg}</p>

            {success ? (
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm text-[#64748B]">Redirecting to tracking in {countdown} seconds...</p>
                <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-[#00B75A] animate-spin"></div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
