'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar } from 'lucide-react';

// Component imports - replace with your actual components
const YummyText: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={className}>{children}</div>
);

const Button: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}> = ({ children, variant = 'primary', className = '', onClick, type = 'button' }) => {
  const baseStyles = 'px-6 py-3 rounded-lg transition-colors font-medium';
  const variantStyles = {
    primary: 'bg-[#00D68F] text-white hover:bg-[#00B876]',
    secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50',
  };
  
  return (
    <button 
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Breadcrumb Component
const Breadcrumb: React.FC<{ steps: string[]; currentStep: number }> = ({ steps, currentStep }) => (
  <div className="flex items-center justify-center gap-2 mb-8">
    {steps.map((step, index) => (
      <React.Fragment key={index}>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${
            index === currentStep 
              ? 'text-[#00D68F] font-medium' 
              : index < currentStep 
                ? 'text-gray-700' 
                : 'text-gray-400'
          }`}>
            {step}
          </span>
        </div>
        {index < steps.length - 1 && (
          <span className="text-gray-400">›</span>
        )}
      </React.Fragment>
    ))}
  </div>
);

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

  const breadcrumbSteps = ['Package Information', 'Package Summary', 'Rider Matching', 'Package Information'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <YummyText className="text-3xl font-medium text-black">
            Swiftly
          </YummyText>
          <Button
            variant="primary"
            className="!bg-[#00D68F] hover:!bg-[#00B876] !px-6 !py-2"
            onClick={() => router.push('/')}
          >
            Back home
          </Button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb steps={breadcrumbSteps} currentStep={0} />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Page Title */}
          <div className="mb-8">
            <YummyText className="text-3xl font-medium text-gray-900 mb-2">
              Book a Delivery
            </YummyText>
            <YummyText className="text-gray-600 text-sm">
              Schedule a new shipment with ease
            </YummyText>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Delivery Information Section */}
            <div className="mb-8">
              <YummyText className="text-lg font-medium text-gray-900 mb-4">
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
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D68F]"
                  readOnly
                />
              </div>
            </div>

            {/* Pickup and Delivery Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Pickup Details */}
              <div>
                <YummyText className="text-lg font-medium text-gray-900 mb-4">
                  Pickup Details
                </YummyText>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sender Name
                    </label>
                    <input
                      type="text"
                      name="senderName"
                      value={formData.senderName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D68F] placeholder-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="senderPhone"
                      value={formData.senderPhone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D68F] placeholder-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Address
                    </label>
                    <input
                      type="text"
                      name="pickupAddress"
                      value={formData.pickupAddress}
                      onChange={handleChange}
                      placeholder="123 Main Street, New York, NY 10001"
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D68F] placeholder-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="pickupDate"
                        value={formData.pickupDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D68F] appearance-none"
                        required
                      />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Details */}
              <div>
                <YummyText className="text-lg font-medium text-gray-900 mb-4">
                  Delivery Details
                </YummyText>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      name="recipientName"
                      value={formData.recipientName}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D68F] placeholder-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="recipientPhone"
                      value={formData.recipientPhone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D68F] placeholder-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      name="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={handleChange}
                      placeholder="456 Oak Avenue, Los Angeles, CA 90001"
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D68F] placeholder-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email (for notifications)
                    </label>
                    <input
                      type="email"
                      name="recipientEmail"
                      value={formData.recipientEmail}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D68F] placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Package Details Section */}
            <div className="mb-8">
              <YummyText className="text-lg font-medium text-gray-900 mb-4">
                Package Details
              </YummyText>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="2.5"
                    step="0.1"
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D68F] placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length (cm)
                  </label>
                  <input
                    type="number"
                    name="length"
                    value={formData.length}
                    onChange={handleChange}
                    placeholder="30"
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D68F] placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width (cm)
                  </label>
                  <input
                    type="number"
                    name="width"
                    value={formData.width}
                    onChange={handleChange}
                    placeholder="20"
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D68F] placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="15"
                  className="w-full md:w-1/3 px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D68F] placeholder-gray-400"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Package Description
                </label>
                <textarea
                  name="packageDescription"
                  value={formData.packageDescription}
                  onChange={handleChange}
                  placeholder="Describe the contents of your package"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D68F] placeholder-gray-400 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Declared Value ($)
                </label>
                <input
                  type="number"
                  name="declaredValue"
                  value={formData.declaredValue}
                  onChange={handleChange}
                  placeholder="100.00"
                  step="0.01"
                  className="w-full md:w-1/3 px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D68F] placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                variant="primary"
                className="!w-full !py-4 !text-base"
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