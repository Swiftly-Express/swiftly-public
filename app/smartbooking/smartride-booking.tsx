'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Bike, Phone, MessageCircle, Package, CheckCircle } from 'lucide-react';
import Button from '../../components/Button';
import YummyText from '../../components/YummyText';
import Breadcrumb from '../../components/Breadcrumb';


const sideBottomShadow = {
  boxShadow: '2px 2px 4px rgba(0,0,0,0.06), -2px 2px 4px rgba(0,0,0,0.06), 0 4px 8px rgba(0,0,0,0.08)'
};



export default function SmartRideBooking() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<'form'|'summary'|'finding-rider'|'rider-found'|'rider-details'>('form');
  const [isSearching, setIsSearching] = useState(false);

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
    // Move to internal summary step
    setCurrentStep('summary');
  };

  const calculateTotal = () => {
    let baseRate = 0;

    if (formData.deliveryType === 'Smart Ride') {
      baseRate = 500;
    } else {
      baseRate = 1000;
    }

    const declaredValue = parseFloat(formData.declaredValue) || 0;
    const insurance = declaredValue > 0 ? Math.max(declaredValue * 0.01, 200) : 0;

    return {
      baseRate,
      insurance,
      total: baseRate + insurance,
    };
  };

  


  const breadcrumbSteps = ['Package Information', 'Package Summary', 'Rider Matching', 'Rider Details'];

  const getCurrentStepIndex = () => {
    switch (currentStep) {
      case 'form':
        return 0;
      case 'summary':
        return 1;
      case 'finding-rider':
      case 'rider-found':
        return 2;
      case 'rider-details':
        return 3;
      default:
        return 0;
    }
  };

  const findRider = () => {
    setCurrentStep('finding-rider');
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setCurrentStep('rider-found');
    }, 3000);
  };

  const proceedToPayment = () => {
    // placeholder for payment flow
    router.push('/payment');
  };

  // Render different steps
  if (currentStep === 'form') {
    return (
      <div className="min-h-screen bg-[#FFFFFF]">
        {/* Header */}
        <div className="bg-white ">
          <div className="max-w-6xl mx-auto px-4 py-10 flex items-center justify-between">
            <YummyText className="text-3xl font-medium text-black">Swiftly</YummyText>
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
          <Breadcrumb steps={breadcrumbSteps} currentStep={getCurrentStepIndex()} />
        </div>

        {/* Page Title (outside the card) */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-3">
            <YummyText className="text-3xl font-medium text-gray-900 mb-1">Book a Delivery</YummyText>
            <YummyText className="text-gray-600 text-sm">Schedule a new shipment with ease</YummyText>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 pb-12">
          <div className="bg-white rounded-2xl p-6" style={sideBottomShadow}>
            <form onSubmit={handleSubmit}>
              {/* Delivery Information Section */}
              <div className="mb-3">
                <YummyText className="text-lg font-medium text-gray-900 mb-1">Delivery Information</YummyText>
                <YummyText className="text-sm text-gray-600 mb-4">Fill in the details below to schedule your delivery</YummyText>

                {/* Delivery Type */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Type</label>
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
                  <div className="text-base font-sm text-[#0F172A] mb-4">Pickup Details<div className="border-t border-gray-300 mt-2"></div></div>

                  <div className="space-y-4">
                    {/* Sender Name */}
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-2">Sender Name</label>
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
                      <label className="block text-sm font-medium text-[#0F172A] mb-2">Phone Number</label>
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
                      <label className="block text-sm font-medium text-[#0F172A] mb-2">Pickup Address</label>
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
                      <label className="block text-sm font-medium text-[#0F172A] mb-2">Pickup Date</label>
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
                  <div className="text-base font-sm text-[#0F172A] mb-4">Delivery Details<div className="border-t border-gray-300 mt-2"></div></div>

                  <div className="space-y-4">
                    {/* Recipient Name */}
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-2">Recipient Name</label>
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
                      <label className="block text-sm font-medium text-[#0F172A] mb-2">Phone Number</label>
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
                      <label className="block text-sm font-medium text-[#0F172A] mb-2">Delivery Address</label>
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
                      <label className="block text-sm font-medium text-[#0F172A] mb-2">Email (for notifications)</label>
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
                <div className="text-xl font-sm text-[#0F172A] mb-6">Package Details<div className="border-t border-gray-300 my-5"></div></div>

                {/* Weight, Length, Width */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-2">Weight (kg)</label>
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
                    <label className="block text-sm font-medium text-[#0F172A] mb-2">Length (cm)</label>
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
                    <label className="block text-sm font-medium text-[#0F172A] mb-2">Width (cm)</label>
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
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">Package Description</label>
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
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">Declared Value ($)</label>
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
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button variant="primary" className="!w-full !py-4 !bg-[#00B75A] !text-sm !font-[400]">Review Summary</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Package Summary
  if (currentStep === 'summary') {
    const pricing = calculateTotal();
    
    return (
      <div className="min-h-screen bg-[#FFFFFF]">
        <div className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-10 flex items-center justify-between">
            <YummyText className="text-3xl font-medium text-black">Swiftly</YummyText>
            <Button
              variant="primary"
              className="!bg-[#00B75A] text-sm hover:!bg-[#00B876] rounded-full px-6 py-2"
              onClick={() => router.push('/')}
            >
              Back home
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto -mt-6 px-4">
          <Breadcrumb steps={breadcrumbSteps} currentStep={getCurrentStepIndex()} />
        </div>

        <div className="max-w-5xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
            {/* Pick-Up Information */}
            <div className="relative w-full bg-transparent">
              {/* SVG scalloped mask (unique ID for pickup) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <defs>
                  <mask id="scallop-mask-pickup" x="0" y="0" width="100%" height="100%">
                    {/* Full white rectangle (base area) */}
                    <rect x="0" y="0" width="100%" height="100%" fill="white" />

                    {/* TOP scallops */}
                    <g fill="black">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <circle key={`top-p-${i}`} cx={i * 40 + 20} cy={0} r={15} />
                      ))}
                    </g>

                    {/* BOTTOM scallops */}
                    <g fill="black">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <circle key={`bottom-p-${i}`} cx={i * 40 + 20} cy="100%"  r={15} />
                      ))}
                    </g>
                  </mask>
                </defs>
              </svg>

              {/* Actual card content */}
              <div
                className="bg-[#F7F7F7] text-[#0F172A] p-12 pb-12 min-h-[260%] rounded-2xl"
                style={{ mask: 'url(#scallop-mask-pickup)', WebkitMask: 'url(#scallop-mask-pickup)' }}
              >
                <h2 className="text-xl font-semibold mb-5">Pick-Up Information</h2>

                <p className="mb-1"><span className="text-[#4B5563] font-[600]">Sender Name</span><p className="inline mx-3 font-[300]"> {formData.senderName}</p></p>
                <p className="mb-1"><span className="text-[#4B5563] font-[600]">Phone</span><p className="inline mx-3 font-[300]"> {formData.senderPhone}</p></p>
                <p className="mb-1"><span className="text-[#4B5563] font-[600]">Address</span><p className="inline mx-3 font-[300]"> {formData.pickupAddress}</p></p>
                <p className="mb-1"><span className="text-[#4B5563] font-[600]">Pick-Up Confirmation</span><p className="inline mx-3 font-[300]"> {formData.senderName}</p></p>
                <p className="mb-1"><span className="text-[#4B5563] font-[600]">Pick-up date</span><p className="inline mx-3 font-[300]"> {formData.pickupDate} 1:42 PM</p></p>
                <p className="mb-1"><span className="text-[#4B5563] font-[600]">Notes</span><p className="inline mx-3 font-[300]"> Delivery at the front desk</p></p>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="relative w-full bg-transparent">
              {/* SVG scalloped mask (unique ID for delivery) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <defs>
                  <mask id="scallop-mask-delivery" x="0" y="0" width="100%" height="100%">
                    {/* Full white rectangle (base area) */}
                    <rect x="0" y="0" width="100%" height="100%" fill="white" />

                    {/* TOP scallops */}
                    <g fill="black">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <circle key={`top-d-${i}`} cx={i * 40 + 20} cy={0} r={15} />
                      ))}
                    </g>

                    {/* BOTTOM scallops */}
                    <g fill="black">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <circle key={`bottom-d-${i}`} cx={i * 40 + 20} cy="100%"  r={15} />
                      ))}
                    </g>
                  </mask>
                </defs>
              </svg>

              {/* Actual card content */}
              <div
                className="bg-[#00B75A] text-white p-12 pb-12 min-h-[260%] rounded-2xl"
                style={{ mask: 'url(#scallop-mask-delivery)', WebkitMask: 'url(#scallop-mask-delivery)' }}
              >
                <h2 className="text-xl font-semibold text-white mb-5">Delivery Information</h2>

                <p className="mb-1"><span className="text-[#FFFFFF] font-[600]">Sender Name</span><p className="inline mx-3 font-[300]"> {formData.recipientName} </p></p>
                <p className="mb-1"><span className="text-[#FFFFFF] font-[600]">Phone</span><p className="inline mx-3 font-[300]"> {formData.recipientPhone}</p></p>
                <p className="mb-1"><span className="text-[#FFFFFF] font-[600]">Address</span><p className="inline mx-3 font-[300]"> {formData.deliveryAddress}</p></p>
                <p className="mb-1"><span className="text-[#FFFFFF] font-[600]">Pick-Up Confirmation</span><p className="inline mx-3 font-[300]"> {formData.recipientName}</p></p>
                <p className="mb-1"><span className="text-[#FFFFFF] font-[600]">Delivery Date</span><p className="inline mx-3 font-[300]"> {formData.pickupDate} 3:42 PM</p></p>
                <p className="mb-1"><span className="text-[#FFFFFF] font-[600]">Notes</span><p className="inline mx-3 font-[300]"> Delivery at the front desk</p></p>
              </div>
            </div>
          </div>

          {/* Package Information */}
          <div className="bg-white rounded-2xl mt-2">
            <h2 className="text-xl font-medium text-[#1E1E1E] mb-6">Package Information</h2>
            
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-sm text-[#1E1E1E] font-medium mb-1">Weight (kg)</p>
                <p className="font-sm text-[#1E1E1E] bg-[#FBFBFB] rounded-md px-3 py-3">{formData.weight}</p>
              </div>
              <div>
                <p className="text-sm text-[#1E1E1E] font-medium mb-1">Length (cm)</p>
                <p className="font-sm text-[#1E1E1E] bg-[#FBFBFB] rounded-md px-3 py-3">{formData.length}</p>
              </div>
              <div>
                <p className="text-sm text-[#1E1E1E] font-medium mb-1">Width (cm)</p>
                <p className="font-sm text-[#1E1E1E] bg-[#FBFBFB] rounded-md px-3 py-3">{formData.width}</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-[#1E1E1E] font-medium mb-1">Package Description</p>
              <p className="font-sm text-[#1E1E1E] bg-[#FBFBFB] rounded-md px-3 py-3">{formData.packageDescription}</p>
            </div>

            <div className="mb-8">
              <p className="text-sm text-[#1E1E1E] font-medium mb-1">Declared Value (₦)</p>
              <p className="font-sm text-[#1E1E1E] bg-[#FBFBFB] rounded-md px-3 py-3">₦{parseFloat(formData.declaredValue).toLocaleString()}</p>
            </div>

            {/* Pricing */}
            <div className="space-y-3 pt-6 border-t">
              <div className="flex justify-between py-2 px-4 bg-gray-50 rounded">
                <span className="text-[#1E1E1E]">Base Rate</span>
                <span className="font-sm text-[#1E1E1E]">₦{pricing.baseRate.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 px-4 bg-gray-50 rounded">
                <span className="text-gray-700">Insurance</span>
                <span className="font-medium">₦{pricing.insurance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-3 px-4 bg-green-50 rounded font-semibold text-lg">
                <span className="text-gray-900">Total</span>
                <span className="text-[#00B75A]">₦{pricing.total.toLocaleString()}</span>
              </div>
            </div>

            <Button
              variant="primary"
              className="!w-full !py-4 !bg-[#00B75A] !text-sm !font-[400] !rounded-lg mt-6"
              onClick={findRider}
            >
              Find a Rider
            </Button>
          </div>
        </div>
      </div>
    );
  }


  // Finding Rider / Rider Found
  if (currentStep === 'finding-rider' || currentStep === 'rider-found') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-10 flex items-center justify-between">
            <YummyText className="text-3xl font-medium text-black">Swiftly</YummyText>
            <Button
              variant="primary"
              className="!bg-[#00B75A] text-sm hover:!bg-[#00B876] rounded-full px-6 py-2"
              onClick={() => router.push('/')}
            >
              Back home
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto -mt-6 px-4">
          <Breadcrumb steps={breadcrumbSteps} currentStep={getCurrentStepIndex()} />
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Map placeholder */}
          <div className="bg-gray-300 rounded-3xl h-80 mb-8 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-300"></div>
            <div className="relative z-10 w-16 h-16 bg-[#00B75A] rounded-full flex items-center justify-center">
              <Bike className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Status */}
          <div className="text-center">
            {isSearching ? (
              <>
                <h2 className="text-3xl font-semibold text-gray-900 mb-3">Finding Nearby Riders</h2>
                <p className="text-gray-600 mb-8">You can make payment as soon as you are paired with a rider.<br />Hold On</p>
                <div className="flex justify-center">
                  <div className="w-16 h-16 border-4 border-[#00B75A] border-t-transparent rounded-full animate-spin"></div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-semibold text-gray-900 mb-3">Rider Found 🎉</h2>
                <p className="text-gray-600 mb-8">Great news! We found a rider near your pickup location.</p>
                <Button variant="primary" className="!bg-[#00B75A] !text-white !py-3 !px-12 !rounded-lg" onClick={proceedToPayment}>Make Payment</Button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Rider Details & Tracking
  if (currentStep === 'rider-details') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-10 flex items-center justify-between">
            <YummyText className="text-3xl font-medium text-black">Swiftly</YummyText>
            <Button
              variant="primary"
              className="!bg-[#00B75A] text-sm hover:!bg-[#00B876] rounded-full px-6 py-2"
              onClick={() => router.push('/')}
            >
              Back home
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto -mt-6 px-4">
          <Breadcrumb steps={breadcrumbSteps} currentStep={getCurrentStepIndex()} />
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Map with route */}
          <div className="bg-gray-300 rounded-3xl h-80 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-300"></div>
            {/* Simulate route line */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
              <line x1="30%" y1="60%" x2="70%" y2="40%" stroke="#00B75A" strokeWidth="4" />
            </svg>
            {/* Pickup marker */}
            <div className="absolute" style={{ left: '30%', top: '60%', transform: 'translate(-50%, -50%)' }}>
              <div className="w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
            </div>
            {/* Delivery marker */}
            <div className="absolute" style={{ left: '70%', top: '40%', transform: 'translate(-50%, -50%)' }}>
              <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white"></div>
            </div>
            {/* Rider position */}
            <div className="absolute" style={{ left: '45%', top: '52%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
              <div className="w-12 h-12 bg-[#00B75A] rounded-full flex items-center justify-center">
                <Bike className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Rider Details Card */}
          <div className="bg-white rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Rider Details</h2>

            <div className="flex items-start gap-6 mb-8">
              {/* Rider Photo */}
              <div className="w-32 h-32 bg-gray-300 rounded-lg overflow-hidden flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500"></div>
              </div>

              {/* Rider Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">Kufre Sunday</h3>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Rider ID Verified</span>
                  <span className="text-gray-600 text-sm">120 Rides</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-600">Bike Model</p>
                    <p className="font-medium text-gray-900">Bajaj Boxer</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Plate number</p>
                    <p className="font-medium text-gray-900">LAG 234 KJ</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estimated Arrival</p>
                    <p className="font-medium text-gray-900">6 mins</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-6 py-3 bg-[#00B75A] text-white rounded-lg hover:bg-[#00A050] transition-colors">
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">Call</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#00B75A] text-[#00B75A] rounded-lg hover:bg-green-50 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">Chat</span>
                </button>
              </div>
            </div>

            {/* Tracking Steps */}
            <div className="border-t pt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Tracking</h3>

              <div className="flex items-center justify-between max-w-2xl mx-auto">
                {/* Dispatch */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#00B75A] rounded-full flex items-center justify-center mb-2">
                    <Bike className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-medium text-[#00B75A]">Dispatch</p>
                </div>

                {/* Connecting line */}
                <div className="flex-1 h-1 bg-gray-200 mx-4"></div>

                {/* Pick Up */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-400">Pick Up</p>
                </div>

                {/* Connecting line */}
                <div className="flex-1 h-1 bg-gray-200 mx-4"></div>

                {/* Delivery */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-400">Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

