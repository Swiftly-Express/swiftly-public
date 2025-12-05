'use client';

import React from 'react';
import Image from 'next/image';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';

// Component imports - replace with your actual components
const YummyText: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={className}>{children}</div>
);

const Button: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'dark' | 'light' | 'outline';
  className?: string;
  onClick?: () => void;
}> = ({ children, variant = 'primary', className = '', onClick }) => {
  const baseStyles = 'px-4 py-2 rounded transition-colors';
  const variantStyles = {
    primary: 'bg-[#10b981] text-white hover:bg-[#059669]',
    dark: 'bg-black text-white hover:bg-gray-800',
    light: 'bg-white text-black hover:bg-gray-100',
    outline: 'border border-white text-white hover:bg-white hover:text-black'
  };
  
  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const PageWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`container mx-auto px-4 ${className}`}>{children}</div>
);



// FeatureCard Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg p-8 border border-gray-200">
    <div className="-mb-4">
      <div className="w-16 h-16 rounded-full mt-1 flex-start items-center justify-center">
        {icon}
      </div>
    </div>
    <div className="mt-6">
      <YummyText className="text-xl font-medium text-gray-900 mb-3">
        {title}
      </YummyText>
      <YummyText className="text-sm text-gray-600 mt-3 flex leading-relaxed">
        {description}
      </YummyText>
    </div>
  </div>
);

// StepCard Component
interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => (
  <div className="text-center p-6">
    <div className="flex justify-center !mb-4">
      <div className="w-14 h-14 rounded-full bg-[#00D68F] flex items-center justify-center">
        <span className="text-white text-lg font-[200]">{number}</span>
      </div>
    </div>
    <YummyText className="text-medium font-medium text-gray-900 mb-4">
      {title}
    </YummyText>
    <YummyText className="text-xs text-gray-600 flex leading-relaxed">
      {description}
    </YummyText>
  </div>
);

// Main SmartRide Component
export default function SmartRide() {

  const features = [
    {
      icon: (
        <Image src="/strike.svg" alt="Instant Booking" width={32} height={32} className="text-green-600" />
      ),
      title: 'Instant Booking',
      description: 'Book a ride in seconds through our mobile app. Your ride will be assigned immediately and on their way to you.'
    },
    {
      icon: (
        <Image src="/locationicon.svg" alt="Live Tracking" width={32} height={32} className="text-green-600" />
      ),
      title: 'Live Tracking',
      description: 'Track your rider in real-time on the map. Know exactly when they\'ll arrive at your pickup location.'
    },
    {
      icon: (
        <Image src="/clockicon.svg" alt="Quick Delivery" width={32} height={32} className="text-green-600" />
      ),
      title: 'Quick Delivery',
      description: 'Our fleet of motorcycles and scooters navigate traffic efficiently, ensuring fast delivery times.'
    },
    {
      icon: (
        <Image src="/dollaricon.svg" alt="Transparent Pricing" width={32} height={32} className="text-green-600" />
      ),
      title: 'Transparent Pricing',
      description: 'See the exact cost before you book. No hidden fees, no surprises. What you see is what you pay.'
    },
    {
      icon: (
        <Image src="/shieldicon.svg" alt="Safe & Secure" width={32} height={32} className="text-green-600" />
      ),
      title: 'Safe & Secure',
      description: 'All riders are verified and trained. Your packages are insured and handled with care.'
    },
    {
      icon: (
        <Image src="/peopleicon.svg" alt="Professional Riders" width={32} height={32} className="text-green-600" />
      ),
      title: 'Professional Riders',
      description: 'Our riders are experienced professionals who know the city inside out for optimal routes.'
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'Open the App',
      description: 'Launch the Swiftly app and enter your pickup and delivery locations.'
    },
    {
      number: 2,
      title: 'Choose Smart Ride',
      description: 'Select Smart Ride for fast motorcycle or scooter delivery.'
    },
    {
      number: 3,
      title: 'Confirm Booking',
      description: 'Review the price and confirm. A rider will be assigned instantly.'
    },
    {
      number: 4,
      title: 'Track & Receive',
      description: 'Track your package in real-time and receive it within minutes.'
    }
  ];

  return (
    <div className="bg-[#ffffff] min-h-screen">
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <PageWrapper className="py-3 flex items-center justify-between">
          <YummyText className="text-3xl px-3 font-sm text-black">
            Swiftly
          </YummyText>
          <NavBar />
          <div className="flex items-center px-4 gap-3">
            <Button
              variant="primary"
              className="px-4 py-3 !bg-[#00B75A] text-medium rounded-full font-[300] text-[10px]"
              onClick={() => {
                window.location.href = 'https://dashboard.swiftlyxpress.com/auth/customer/signup';
              }}
            >
              <YummyText>Book a delivery</YummyText>
            </Button>
            
            <Button
              variant="dark"
              className="px-4 py-3 text-medium rounded-full font-[300] text-[10px]"
              onClick={() => {
                window.location.href = 'https://dashboard.swiftlyxpress.com/auth/role-select';
              }}
            >
              <YummyText>Get Started</YummyText>
            </Button>
          </div>
          
        </PageWrapper>
      </div>

      {/* Hero Section */}
      <div className="relative w-full bg-white py-16 md:py-24 lg:py-20 overflow-hidden">
        <PageWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="relative text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#00B75A] rounded-full mb-6">
                <YummyText className="text-xs font-[400] text-[#00B75A] uppercase tracking-wider">
                  SMART RIDES - Same day Delivery
                </YummyText>
              </div>
              
              <YummyText className="text-5xl md:text-6xl font-[400] text-gray-900 mb-6 leading-tight">
                Lightning-Fast Delivery on<br />Two Wheels
              </YummyText>
              
              <YummyText className="text-base font-[300] text-gray-600 mb-8 leading-relaxed max-w-xl">
                Skip the traffic and beat the clock with our Same-Day Smart Rides. Our motorcycles and scooters weave through the city with speed and precision, ensuring your packages arrive today — and on time.
              </YummyText>

              <Button
                variant="primary"
                className="px-8 py-4 !bg-[#00B75A] text-base rounded-full font-[400] hover:!bg-[#00a352]"
                onClick={() => {
                  window.location.href = 'https://dashboard.swiftlyxpress.com/auth/customer/signup';
                }}
              >
                <YummyText>Send A Package Now</YummyText>
              </Button>
            </div>

            {/* Right Content - Phone Mockup with Testimonials */}
            <div className="relative flex justify-center items-center min-h-[600px]">
              {/* Large Green Circle Background */}
              <div className="absolute w-[500px] h-[500px] bg-[#00B75A] rounded-full"></div>
              
              {/* Phone Mockup */}
              <div className="relative z-10">
                <div className="w-[280px] h-[560px] bg-gray-900 rounded-[40px] shadow-2xl overflow-hidden border-8 border-gray-800">
                  <div className="w-full h-full bg-gray-800"></div>
                </div>
              </div>

              {/* Floating Testimonials */}
              {/* Top Right Testimonial */}
              <div className="absolute top-0 right-0 bg-white rounded-2xl shadow-lg p-4 max-w-[240px] z-20">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex-shrink-0"></div>
                  <div>
                    <YummyText className="font-[600] text-sm text-gray-900 mb-1">
                      Imabong Essien
                    </YummyText>
                    <YummyText className="text-xs text-gray-600 leading-relaxed">
                      My package arrived faster than I expected. Super reliable service!
                    </YummyText>
                  </div>
                </div>
              </div>

              {/* Bottom Left Testimonial */}
              <div className="absolute bottom-8 left-0 bg-white rounded-2xl shadow-lg p-4 max-w-[240px] z-20">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-400 flex-shrink-0"></div>
                  <div>
                    <YummyText className="font-[600] text-sm text-gray-900 mb-1">
                      Suleiman Musa
                    </YummyText>
                    <YummyText className="text-xs text-gray-600 leading-relaxed">
                      Every time I use them, delivery is unbelievably quick.
                    </YummyText>
                  </div>
                </div>
              </div>

              {/* Floating Avatar Circles */}
              <div className="absolute top-32 left-8 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-4 border-white shadow-lg z-20"></div>
              <div className="absolute top-48 right-12 w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 border-4 border-white shadow-lg z-20"></div>
              <div className="absolute bottom-32 right-4 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-4 border-white shadow-lg z-20"></div>
            </div>
          </div>
        </PageWrapper>
      </div>

      {/* Why Smart Rides Section */}
      <PageWrapper>
        <section className="py-8 md:py-12 lg:py-8">
          <div className="text-center mb-8 md:mb-12 lg:mb-8">
            <YummyText className="text-4xl font-[400] text-[#111827] mb-4">
              Why Smart Rides?
            </YummyText>
            <YummyText className="text-[#4B5563] flex !justify-center text-base font-[300] max-w-2xl mx-auto">
              Experience the future of urban delivery with our intelligent two-wheel fleet.
            </YummyText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-14">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-3 md:py-4 lg:py-3 bg-[#F9FAFB] rounded-3xl mx-18">
          <div className="text-center mb-6 md:mb-10 lg:mb-6">
            <YummyText className="text-5xl font-[300] text-[#111827]">
              How It Works
            </YummyText>
            <YummyText className="text-[#4B5563] flex items-center mt-2 justify-center text-base font-[300]">
              Getting started with Smart Rides is simple and quick
            </YummyText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-10 px-14">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                number={step.number}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </section>
      </PageWrapper>

      {/* CTA Section */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0"></div>

        <div className="relative text-center text-[#1E1E1E] py-24 px-6 max-w-5xl mx-auto">
          <YummyText className="text-4xl font-[400] mb-6">
            Ready to Experience Fast Delivery?
          </YummyText>

          <YummyText className="mb-8 mt-2 text-sm font-[300] flex justify-center opacity-90">
            Download the Swiftly app today and get your first Smart Ride delivery at 20% off.
          </YummyText>

          <div className="flex justify-center gap-4">
            <button className="bg-[#00D68F] hover:bg-[#149C46] text-white px-6 py-3 rounded-lg transition-all duration-300">
              <YummyText>Download App</YummyText>
            </button>

            <button className="px-4 py-3 border-2 border-[#1E1E1E] bg-white text-gray-900 rounded-lg transition-all duration-300 hover:bg-gray-50">
              <YummyText>Contact Support</YummyText>
            </button>
          </div>
        </div>
      </section>

      <div className="-mt-6"></div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}