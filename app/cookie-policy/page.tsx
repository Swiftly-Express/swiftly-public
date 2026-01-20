"use client"

import React from 'react'

export default function CookiePolicy() {
  return (
    <div className="relative bg-white min-h-screen">
      <div className="bg-green-500 h-48 sm:h-64 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-20 bg-white rounded-tl-[50%] rounded-tr-[50%]" />
      </div>

      <div className="mx-auto max-w-6xl -mt-32 px-6 md:px-12 pb-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">Cookie Policy</h1>
            <button
              onClick={() => window.history.back()}
              className="mt-2 inline-block px-4 py-2 bg-green-500 text-black rounded-md text-sm hover:bg-green-600 transition"
            >
              Back
            </button>
            <p className="text-sm text-gray-500 mt-4 mx-auto max-w-2xl">
              Swiftly Xpress uses cookies to improve user experience, analyze traffic, and enhance platform functionality.
            </p>
          </div>

          <div className="border-t border-gray-100 my-8" />

          <div className="space-y-6 text-gray-700">
            <h2 className="text-xl font-semibold">Purpose</h2>
            <p>Cookies help us remember preferences and understand usage patterns. Users may disable cookies via their browser settings.</p>

            <h2 className="text-xl font-semibold">Professional touch</h2>
            <p>Cookies are useful if you run ads or analytics; they enable more relevant content and improve platform performance.</p>

            <h2 className="text-xl font-semibold">Managing Cookies</h2>
            <p>You can control cookie settings through your browser. Disabling cookies may affect certain features.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
