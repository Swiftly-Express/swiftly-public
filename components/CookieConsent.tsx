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

    const decline = () => {
        setCookie('cookies_accepted', 'false', 365)
        setVisible(false)
    }

    if (!visible) return null

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] md:w-auto max-w-3xl bg-white shadow-lg rounded-lg px-6 py-4 flex items-center gap-4">
            <div className="flex-1 text-sm text-gray-700">
                We use cookies to improve your experience. By continuing, you agree to our <a href="/cookie-policy" className="text-green-600 underline">Cookie Policy</a>.
            </div>
            <div className="flex items-center gap-3">
                <button onClick={decline} className="px-4 py-2 rounded-full bg-gray-100 text-gray-800">Decline</button>
                <button onClick={accept} className="px-4 py-2 rounded-full bg-[#00B75A] text-white">Accept</button>
            </div>
        </div>
    )
}
