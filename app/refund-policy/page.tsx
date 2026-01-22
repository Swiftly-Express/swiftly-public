"use client"

import React from 'react'

export default function RefundPolicy() {
    return (
        <div className="relative bg-white min-h-screen">
            <div className="bg-green-500 h-48 sm:h-64 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-20 bg-white rounded-tl-[50%] rounded-tr-[50%]" />
            </div>

            <div className="mx-auto max-w-6xl -mt-32 px-6 md:px-12 pb-16 relative z-10">
                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">Refund Policy</h1>
                        <button
                            onClick={() => window.history.back()}
                            className="mt-2 inline-block px-4 py-2 bg-green-500 text-black rounded-md text-sm hover:bg-green-600 transition"
                        >
                            Back
                        </button>
                    </div>

                    <div className="space-y-4 text-gray-700">
                        <p className="font-semibold">REFUND POLICY – SWIFTLY XPRESS</p>
                        <p>Swiftly Xpress operates a conditional refund policy.</p>

                        <h2 className="font-semibold">Eligible Refunds</h2>
                        <p>Refunds may be issued if:</p>
                        <ul className="list-disc ml-6">
                            <li>An order is cancelled before rider assignment</li>
                            <li>Payment was made but service was not initiated</li>
                            <li>A system error caused duplicate or incorrect charges</li>
                        </ul>

                        <h2 className="font-semibold">Non-Refundable Situations</h2>
                        <ul className="list-disc ml-6">
                            <li>A rider has already been assigned and is enroute</li>
                            <li>The delivery has been completed</li>
                            <li>Delays are caused by customer unavailability, incorrect address, or force majeure</li>
                        </ul>

                        <h2 className="font-semibold">Partial Refunds</h2>
                        <p>Partial refunds may apply after deducting operational or rider compensation costs.</p>

                        <h2 className="font-semibold">Processing Time</h2>
                        <p>Approved refunds are processed within 1–5 business days via the original payment method.</p>

                        <h2 className="font-semibold">Contact</h2>
                        <p>Refund requests must be submitted via Swiftly Xpress customer support.</p>

                        <h2 className="font-semibold">Refund Requests</h2>
                        <p>All refund requests must be submitted through Swiftly Xpress customer support channels.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
