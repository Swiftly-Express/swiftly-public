"use client";

import React from "react";

export default function PrivacyPolicy(): JSX.Element {
  return (
    <div className="relative bg-white min-h-screen">
      <div className="bg-green-500 h-64 sm:h-80 md:h-96 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-white rounded-tl-[50%] rounded-tr-[50%]" />
      </div>

      <div className="mx-auto max-w-6xl -mt-48 px-6 md:px-12 pb-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">Privacy Policy</h1>
            <button
              onClick={() => window.history.back()}
              className="mt-2 inline-block px-4 py-2 bg-green-500 text-black rounded-md text-sm hover:bg-green-600 transition"
            >
              Back
            </button>
            <p className="text-sm text-gray-500 mt-4 mx-auto max-w-2xl">
              Swiftly Xpress respects your privacy and is committed to protecting your personal data.
            </p>
          </div>

          <div className="border-t border-gray-100 my-8" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <aside className="md:col-span-3">
              <nav className="space-y-3 sticky top-8">
                <div onClick={() => document.getElementById('info-collect')?.scrollIntoView({ behavior: 'smooth' })} className="cursor-pointer text-sm text-gray-600 hover:text-gray-900 px-1">Information We Collect</div>
                <div onClick={() => document.getElementById('how-use')?.scrollIntoView({ behavior: 'smooth' })} className="cursor-pointer text-sm text-gray-600 hover:text-gray-900 px-1">How We Use Information</div>
                <div onClick={() => document.getElementById('data-sharing')?.scrollIntoView({ behavior: 'smooth' })} className="cursor-pointer text-sm text-gray-600 hover:text-gray-900 px-1">Data Sharing</div>
                <div onClick={() => document.getElementById('security')?.scrollIntoView({ behavior: 'smooth' })} className="cursor-pointer text-sm text-gray-600 hover:text-gray-900 px-1">Data Security</div>
                <div onClick={() => document.getElementById('rights')?.scrollIntoView({ behavior: 'smooth' })} className="cursor-pointer text-sm text-gray-600 hover:text-gray-900 px-1">Your Rights</div>
              </nav>
            </aside>

            <main className="md:col-span-9">
              <div className="space-y-8">
                <section id="info-collect" className="section">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect</h2>
                  <ul className="list-disc ml-6 text-gray-700">
                    <li>Name, phone number, email</li>
                    <li>Pickup and delivery addresses</li>
                    <li>Payment transaction data</li>
                    <li>Device and usage data</li>
                  </ul>
                </section>

                <section id="how-use" className="section">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">How We Use Information</h2>
                  <ul className="list-disc ml-6 text-gray-700">
                    <li>To process deliveries</li>
                    <li>To match riders and customers</li>
                    <li>To process payments</li>
                    <li>To improve platform performance</li>
                  </ul>
                </section>

                <section id="data-sharing" className="section">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Sharing</h2>
                  <p className="text-gray-700 mb-2">We may share limited data with:</p>
                  <ul className="list-disc ml-6 text-gray-700">
                    <li>Payment processors</li>
                    <li>Delivery riders (for service execution)</li>
                    <li>Legal authorities when required by law</li>
                  </ul>
                </section>

                <section id="security" className="section">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Security</h2>
                  <p className="text-gray-700">We implement reasonable technical and organizational measures to protect user data.</p>
                </section>

                <section id="rights" className="section">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Your Rights</h2>
                  <p className="text-gray-700">Users may request access, correction, or deletion of their data.</p>
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
