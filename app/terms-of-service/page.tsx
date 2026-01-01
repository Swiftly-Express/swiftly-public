"use client";

import React, { useEffect, useRef, useState } from "react";

export default function TermsPage(): JSX.Element {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<string>("acceptance");

  const SECTIONS = [
    { id: 'acceptance', label: 'Acceptance of Terms' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'responsibilities', label: 'User Responsibilities' },
    { id: 'prohibited', label: 'Prohibited Items' },
    { id: 'pricing', label: 'Pricing and Payments' },
    { id: 'rider', label: 'Rider Assignment & Delivery' },
    { id: 'cancellations', label: 'Cancellations & Refund' },
    { id: 'liability', label: 'Liability & Limitations' },
    { id: 'conduct', label: 'User Conduct' },
    { id: 'privacy', label: 'Data Protection and Privacy' },
    { id: 'intellectual', label: 'Intellectual Property' },
    { id: 'amendments', label: 'Amendments' },
    { id: 'contact', label: 'Contact Information' },
  ];

  function handleBack() {
    window.history.back();
  }

  function scrollToSection(id: string) {
    const main = mainRef.current;
    if (!main) return;
    const el = main.querySelector(`#${id}`) as HTMLElement | null;
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;

    function updateActive() {
      const cont = container;
      if (!cont) return;
      const sections = Array.from(cont.querySelectorAll('.section')) as HTMLElement[];
      const scrollPosition = cont.scrollTop + 120;
      let current = '';
      sections.forEach(section => {
        const top = section.offsetTop;
        const h = section.clientHeight;
        if (scrollPosition >= top && scrollPosition < top + h) current = section.id;
      });
      setActive(current || 'acceptance');
    }

    container.addEventListener('scroll', updateActive);
    updateActive();
    return () => container.removeEventListener('scroll', updateActive);
  }, []);

  return (
    <div className="relative bg-white min-h-screen">
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Green Background Header with Curve */}
      <div className="bg-green-500 h-64 sm:h-80 md:h-96 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-white rounded-tl-[50%] rounded-tr-[50%]" />
      </div>

      {/* Main Content Container */}
      <div className="mx-auto max-w-6xl -mt-48 px-6 md:px-12 pb-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">Terms and Conditions</h1>
            <button
              onClick={handleBack}
              className="mt-2 inline-block px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition"
            >
              Back
            </button>
            <p className="text-sm text-gray-500 mt-4 mx-auto max-w-2xl">
              Welcome to Swiftly. These Terms &amp; Conditions ("Terms") govern your access to and use of the Swiftly
              mobile application, website, and delivery services (collectively, "the Service"). By using Swiftly, you agree
              to be bound by these Terms. If you do not agree, please discontinue use of the Service immediately.
            </p>
          </div>

          <div className="border-t border-gray-100 my-8" />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Sidebar Navigation */}
            <aside className="md:col-span-3">
              <nav className="space-y-3 sticky top-8">
                {SECTIONS.map(s => (
                  <div
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    className={`cursor-pointer text-sm transition-colors px-1 ${active === s.id ? 'text-green-500 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    {s.label}
                  </div>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <main className="md:col-span-9">
              <div ref={mainRef} className="max-h-[60vh] overflow-y-auto pr-4 no-scrollbar">

                <section id="acceptance" className="section mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                  <p className="text-gray-700 leading-relaxed">
                    By creating an account, booking a delivery, or using any feature on Swiftly, you acknowledge that you have
                    read, understood, and agreed to these Terms &amp; Conditions.
                  </p>
                </section>

                <section id="eligibility" className="section mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Eligibility</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">To use Swiftly:</p>
                  <ul className="list-disc ml-6 space-y-2 text-gray-700 leading-relaxed">
                    <li>You must be at least 18 years old.</li>
                    <li>You must provide accurate and verifiable information.</li>
                    <li>You must not use the service for illegal activities or fraudulent deliveries.</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">Swiftly reserves the right to decline service to any user who violates these Terms.</p>
                </section>

                <section id="responsibilities" className="section mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Responsibilities</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">You agree to:</p>
                  <ul className="list-disc ml-6 space-y-2 text-gray-700 leading-relaxed">
                    <li>Provide correct pick-up, delivery, and package details.</li>
                    <li>Ensure your package does not contain prohibited or hazardous items.</li>
                    <li>Ensure the declared value of your package is accurate.</li>
                    <li>Be available for communication with the rider for seamless delivery.</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">Incorrect information may result in delays, failed delivery, or additional charges.</p>
                </section>

                <section id="prohibited" className="section mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Prohibited Items</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">Swiftly strictly prohibits the transportation of:</p>
                  <ul className="list-disc ml-6 space-y-2 text-gray-700 leading-relaxed">
                    <li>Weapons, ammunition, or explosives</li>
                    <li>Illegal substances</li>
                    <li>Cash above regulatory limits</li>
                    <li>Perishables requiring specialized storage</li>
                    <li>Live animals</li>
                    <li>Fragile items not properly packaged</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">Swiftly reserves the right to reject or cancel deliveries containing prohibited items.</p>
                </section>

                <section id="pricing" className="section mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Pricing &amp; Payments</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">Delivery fares on Swiftly are determined by:</p>
                  <ul className="list-disc ml-6 space-y-2 text-gray-700 leading-relaxed">
                    <li>Distance</li>
                    <li>Package weight &amp; size</li>
                    <li>Delivery urgency</li>
                    <li>Traffic and operational factors</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3 mb-3">All payments must be made through Swiftly's approved payment channels. Additional fees may apply for:</p>
                  <ul className="list-disc ml-6 space-y-2 text-gray-700 leading-relaxed">
                    <li>Waiting time</li>
                    <li>Failed delivery attempts</li>
                    <li>Address changes after the rider is en route</li>
                  </ul>
                </section>

                <section id="rider" className="section mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Rider Assignment &amp; Delivery</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">Upon completing the delivery form, Swiftly will:</p>
                  <ol className="list-decimal ml-6 space-y-2 text-gray-700 leading-relaxed">
                    <li>Find available riders closest to the pick-up location</li>
                    <li>Connect you with the best-matched rider</li>
                    <li>Provide real-time tracking of your delivery</li>
                  </ol>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    Swiftly is a connector between customers and independent riders and is not responsible for delays caused by
                    traffic, weather, or unforeseen circumstances.
                  </p>
                </section>

                <section id="cancellations" className="section mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Cancellations &amp; Refunds</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">You may cancel a delivery before a rider accepts the request at no charge.</p>
                  <p className="text-gray-700 leading-relaxed mb-3">Once a rider has accepted the request or has arrived at the pick-up location, cancellation fees may apply.</p>
                  <p className="text-gray-700 leading-relaxed">Refunds are processed based on the circumstances and Swiftly's discretion.</p>
                </section>

                <section id="liability" className="section mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Liability &amp; Limitations</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">Swiftly is not liable for:</p>
                  <ul className="list-disc ml-6 space-y-2 text-gray-700 leading-relaxed">
                    <li>Loss or damage to improperly packaged items</li>
                    <li>Loss due to failure to accurately declare package value</li>
                    <li>Delays caused by third parties or events outside our control</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">For eligible claims, Swiftly's liability shall not exceed the declared value of the item.</p>
                </section>

                <section id="conduct" className="section mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">9. User Conduct</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">You agree not to:</p>
                  <ul className="list-disc ml-6 space-y-2 text-gray-700 leading-relaxed">
                    <li>Harass or threaten riders or support staff</li>
                    <li>Attempt to manipulate pricing</li>
                    <li>Use Swiftly for fraudulent deliveries</li>
                    <li>Interfere with the platform's operation</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">Violation may result in permanent account suspension.</p>
                </section>

                <section id="privacy" className="section mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Data Protection &amp; Privacy</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">Swiftly collects and processes personal data as described in our Privacy Policy.</p>
                  <p className="text-gray-700 leading-relaxed mb-3">Your data is used strictly for:</p>
                  <ul className="list-disc ml-6 space-y-2 text-gray-700 leading-relaxed">
                    <li>Delivery processing</li>
                    <li>Identity verification</li>
                    <li>Rider matching</li>
                    <li>Service improvement</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">We do not sell or misuse customer data.</p>
                </section>

                <section id="intellectual" className="section mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Intellectual Property</h2>
                  <p className="text-gray-700 leading-relaxed">
                    All designs, technologies, logos, and content on Swiftly are the property of Swiftly and may not be
                    reproduced or used without permission.
                  </p>
                </section>

                <section id="amendments" className="section mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Amendments</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Swiftly may update these Terms occasionally. Continued use of the platform after changes means you accept the
                    updated Terms.
                  </p>
                </section>

                <section id="contact" className="section mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Contact Information</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">For questions or concerns, reach out to:</p>
                  <div className="space-y-3">
                    <p className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="#10b981" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      support@swiftly.ng
                    </p>
                    <p className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="#10b981" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                      +234 800 000 0000
                    </p>
                  </div>
                </section>

              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}