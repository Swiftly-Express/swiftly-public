"use client"

import React, { useEffect, useState } from 'react'
import { getCookie, setCookie } from '../utils/cookies'

export default function CookieConsent() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        try {
            const v = getCookie('cookies_accepted')
            if (!v) setVisible(true)
        } catch (e) {
            setVisible(true)
        }
    }, [])

    const accept = () => {
        setCookie('cookies_accepted', 'true', 365)
        setVisible(false)
    }

    const customize = () => {
        // Handle customize preferences
        // You can open a modal or navigate to preferences page
        console.log('Customize preferences')
    }

    if (!visible) return null

    const reject = () => {
        setCookie('cookies_accepted', 'rejected', 365)
        setVisible(false)
    }

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[100%] sm:w-[96%] md:w-[92%] lg:w-[84%] xl:w-[78%] max-w-10xl">
            <div className="bg-white shadow-2xl rounded-2xl px-4 py-4 md:px-8 md:py-6 flex flex-col md:flex-row items-start gap-4 md:gap-6">
                {/* Cookie Icon */}
                <div className="flex-shrink-0 mt-0 md:mt-1">
                    <div className="w-14 h-14 md:w-24 md:h-24 relative">
                        <img src="/cookies.svg" alt="Cookie Icon" className="w-full h-full object-contain" />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <h3 className="text-sm md:text-xs font-medium text-gray-400 mb-2 md:mb-3">Cookie policy</h3>

                    <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
                        We use cookies and similar technologies to improve website functionality, understand user behavior, and enhance our delivery services. Some cookies are essential for the website to work properly, while others help us improve performance.
                    </p>

                    <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-5">
                        You can choose to accept all cookies or manage your preferences. For more details, please review our{' '}
                        <a href="/cookie-policy" className="text-[#00B75A] underline hover:text-[#009648]">
                            Cookie Policy
                        </a>
                        .
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <button
                            onClick={accept}
                            className="w-full sm:flex-1 px-12 py-4 rounded-full bg-[#00B75A] text-white text-lg font-sm hover:bg-[#009648] transition-colors min-w-[220px]"
                        >
                            Accept all
                        </button>
                        <button
                            onClick={reject}
                            className="w-full sm:flex-1 px-12 py-4 rounded-full bg-white text-gray-800 text-lg font-sm hover:bg-gray-50 transition-colors border border-gray-400 min-w-[220px]"
                        >
                            Reject all
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}