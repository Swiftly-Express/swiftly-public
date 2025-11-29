'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar } from 'lucide-react';
import Button from '../../components/Button';
import YummyText from '../../components/YummyText';
import Breadcrumb from '../../components/Breadcrumb';


const sideBottomShadow = {
  boxShadow: '2px 2px 4px rgba(0,0,0,0.06), -2px 2px 4px rgba(0,0,0,0.06), 0 4px 8px rgba(0,0,0,0.08)'
};



export default function SmartRideBooking() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    deliveryType: 'Smart Ride',
    senderName: '',
    senderPhone: '',
    pickupAddress: '',
    pickupDate: '',
    recipientName: '',
    recipientPhone: '',
    deliveryAddress: '',
    recipientEmail: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    packageDescription: '',
    declaredValue: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Navigate to summary page
    router.push('/booking/summary');
  };

   const calculateTotal = () => {
    let baseRate = 0;
    
    // Calculate base rate based on delivery type
    if (formData.deliveryType === 'Smart Ride') {
      baseRate = 500; // Flat rate for Smart Ride
    } else {
      baseRate = 1000; // Default flat rate
    } 
    
    // Calculate insurance (1% of declared value, minimum ₦200)
    const declaredValue = parseFloat(formData.declaredValue) || 0;
    const insurance = declaredValue > 0 ? Math.max(declaredValue * 0.01, 200) : 0;
    
    return baseRate + insurance;
  };


  const breadcrumbSteps = ['Package Information', 'Package Summary', 'Rider Matching', 'Package Information'];

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Header */}
      <div className="bg-white ">
        <div className="max-w-6xl mx-auto px-4 py-10 flex items-center justify-between">
          <YummyText className="text-3xl font-medium text-black">
            Swiftly
          </YummyText>
          <Button
            variant="primary"
            className="!bg-[#00B75A] text-sm hover:!bg-[#00B876] rounded-full px-6 py-2"
            onClick={() => router.push('/')}
          >
            Back home
          </Button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto -mt-6 px-4 sm:px-6 lg:px-8">
        <Breadcrumb steps={breadcrumbSteps} currentStep={0} />
      </div>

      {/* Page Title (outside the card) */}
      <div className="max-w-5xl mx-auto px-18">
        <div className="mb-3">
          <YummyText className="text-3xl font-medium text-gray-900 mb-1">
            Book a Delivery
          </YummyText>
          <YummyText className="text-gray-600 text-sm">
            Schedule a new shipment with ease
          </YummyText>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-18 pb-12">
        <div className="bg-white rounded-2xl p-6" style={sideBottomShadow}>

          <form onSubmit={handleSubmit}>
            {/* Delivery Information Section */}
            <div className="mb-3">
              <YummyText className="text-lg font-medium text-gray-900 mb-1">
                Delivery Information
              </YummyText>
              <YummyText className="text-sm text-gray-600 mb-4">
                Fill in the details below to schedule your delivery
              </YummyText>

              {/* Delivery Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Type
                </label>
                <input
                  type="text"
                  name="deliveryType"
                  value={formData.deliveryType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#FBFBFB] placeholder:text-[#BDBDBD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D68F]"
                  readOnly
                />
              </div>
            </div>

            {/* Pickup and Delivery Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pickup Details */}
                <div>
                  <div className="text-base font-sm text-[#0F172A] mb-4">
                    Pickup Details
                    <div className="border-t border-gray-300 mt-2"></div>
                  </div>
                  

                  <div className="space-y-4">
                    {/* Sender Name */}
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-2">
                        Sender Name
                      </label>
                      <input
                        type="text"
                        name="senderName"
                        value={formData.senderName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00D68F] border-none"
                        required
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="senderPhone"
                        value={formData.senderPhone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00D68F] border-none"
                        required
                      />
                    </div>

                    {/* Pickup Address */}
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-2">
                        Pickup Address
                      </label>
                      <textarea
                        name="pickupAddress"
                        value={formData.pickupAddress}
                        onChange={handleChange}
                        placeholder="123 Main Street, New York, NY 10001"
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00D68F] border-none resize-none"
                        required
                      ></textarea>
                    </div>

                    {/* Pickup Date */}
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-2">
                        Pickup Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="pickupDate"
                          value={formData.pickupDate}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#00D68F] border-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Delivery Details */}
                <div>
                  <div className="text-base font-sm text-[#0F172A] mb-4">
                    Delivery Details
                  <div className="border-t border-gray-300 mt-2"></div>
                  </div>

                  <div className="space-y-4">
                    {/* Recipient Name */}
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-2">
                        Recipient Name
                      </label>
                      <input
                        type="text"
                        name="recipientName"
                        value={formData.recipientName}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00D68F] border-none"
                        required
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="recipientPhone"
                        value={formData.recipientPhone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00D68F] border-none"
                        required
                      />
                    </div>

                    {/* Delivery Address */}
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-2">
                        Delivery Address
                      </label>
                      <textarea
                        name="deliveryAddress"
                        value={formData.deliveryAddress}
                        onChange={handleChange}
                        placeholder="456 Oak Avenue, Los Angeles, CA 90001"
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00D68F] border-none resize-none"
                        required
                      ></textarea>
                    </div>

                    {/* Email (for notifications) */}
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-2">
                        Email (for notifications)
                      </label>
                      <input
                        type="email"
                        name="recipientEmail"
                        value={formData.recipientEmail}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00D68F] border-none"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-300 my-5"></div>

              {/* Package Details */}
              <div>
                <YummyText>
                <div className="text-xl font-sm text-[#0F172A] mb-6">
                  Package Details
                  <div className="border-t border-gray-300 my-5"></div>
                </div>
                

                {/* Weight, Length, Width */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="2.5"
                      step="0.1"
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00D68F] border-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-2">
                      Length (cm)
                    </label>
                    <input
                      type="number"
                      name="length"
                      value={formData.length}
                      onChange={handleChange}
                      placeholder="30"
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00D68F] border-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-2">
                      Width (cm)
                    </label>
                    <input
                      type="number"
                      name="width"
                      value={formData.width}
                      onChange={handleChange}
                      placeholder="20"
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00D68F] border-none"
                      required
                    />
                  </div>
                </div>
                

                {/* Package Description */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">
                    Package Description
                  </label>
                  <textarea
                    name="packageDescription"
                    value={formData.packageDescription}
                    onChange={handleChange}
                    placeholder="Describe the contents of your package"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00D68F] border-none resize-none"
                    required
                  ></textarea>
                </div>
                {/* Declared Value */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">
                    Declared Value ($)
                  </label>
                  <input
                    type="number"
                    name="declaredValue"
                    value={formData.declaredValue}
                    onChange={handleChange}
                    placeholder="100.00"
                    step="0.01"
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00D68F] border-none"
                    required
                  />
                </div>
                </YummyText>
              </div>

              

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button
                variant="primary"
                className="!w-full !py-4 !bg-[#00B75A] !text-sm !font-[400]"
              >
                Review Summary
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}