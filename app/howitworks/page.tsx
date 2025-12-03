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

// use shared NavBar component from components/NavBar.tsx


// ProcessStep Component
interface ProcessStepProps {
  icon: string;
  title: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ icon, title }) => (
  <div className="flex flex-col items-center text-center">
    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
      title === 'Enter Package Details' ? 'bg-violet-500' :
      title === 'Secure payment' ? 'bg-[#FF4D00]' :
      title === 'Choose Pickup/Delivery' ? 'bg-blue-500' :
      title === 'Create Your Account' ? 'bg-[#00D68F]' :
      title === 'Delivery Confirmation' ? 'bg-[#00D68F]' :
      'bg-red-500' // Real-Time Tracking
    }`}>
      <Image src={icon} alt={title} width={32} height={32} />
    </div>
    <YummyText className="mt-2 text-[#111827] text-sm">{title}</YummyText>
  </div>
);

// Main HowItWorks Component
export default function HowItWorks() {

  const steps = [
    { icon: '/phoneicon.svg', title: 'Create Your Account' },
    { icon: '/blockicon-white.svg', title: 'Enter Package Details' },
    { icon: '/locationicon-white.svg', title: 'Choose Pickup/Delivery' },
    { icon: '/cardicon.svg', title: 'Secure payment' },
    { icon: '/vanicon-white.svg', title: 'Real-Time Tracking' },
    { icon: '/checkicon.svg', title: 'Delivery Confirmation' }
  ];

  return (
    <div className="bg-[#ffffff] min-h-screen">
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <PageWrapper className="py-3 flex items-center justify-between">
          <YummyText className="text-2xl md:text-3xl px-2 md:px-3 font-sm text-black">
            Swiftly
          </YummyText>
          <NavBar />
          <div className="hidden md:flex items-center px-4 gap-3">
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
      <div className="relative w-full min-h-[300px] md:min-h-[400px] bg-[#00B75A] py-6 md:py-10 lg:py-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/riderman.svg"
            alt="Traffic Light"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Glass overlay for deep green translucent effect */}
        <div className="absolute inset-0 bg-green-800/95 mix-blend-multiply"></div>

        <PageWrapper>
          <div className="relative py-8 md:py-12 lg:py-8 text-center mt-12 md:mt-20 text-white flex flex-col items-center justify-center px-4">
            <YummyText className="text-3xl md:text-5xl font-medium mb-3 md:mb-4">
              How Swiftly Works
            </YummyText>
            <YummyText className="text-sm md:text-lg opacity-90 max-w-2xl">
              From booking to delivery, we've made the entire process simple, transparent, and reliable. Here's everything you need to know.
            </YummyText>
          </div>
        </PageWrapper>
      </div>

      <PageWrapper>
        {/* Process Section */}
        <section className="py-0">
          <div className="text-center -mb-1 mt-3 md:mt-4 lg:mt-3 space-y-1 px-4">
            <YummyText className="text-2xl md:text-4xl font-[300] text-[#111827]">
              The Complete Process
            </YummyText>
            <YummyText className="text-[#4B5563] flex !justify-center text-xs md:text-sm">
              Six simple steps to get your package from point A to point B
              <br className="hidden md:block" /> with complete peace of mind
            </YummyText>
          </div>

          {/* Mobile Layout - Vertical Spiral */}
          <div className="block md:hidden  relative min-h-[600px] mt-6">
            <div className="absolute inset-0 left-1/2 -translate-x-1/2 w-[390px] h-[600px]">
              <Image 
                src="/mobilespiral.svg" 
                alt="Process Flow"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            
            <div className="relative z-10 px-4">
              {/* step 0: keep default (title below icon) */}
              <div className="absolute top-0 left-[10%]">
                <ProcessStep {...steps[0]} />
              </div>

              {/* step 1: Enter Package Details - text on LEFT, icon on RIGHT */}
              <div className="absolute top-[60px] right-[0.5%]">
                <div className="flex items-center gap-3">
                  <YummyText className="text-sm mt-7 text-[#111827]">{steps[1].title}</YummyText>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-violet-500">
                    <Image src={steps[1].icon} alt={steps[1].title} width={28} height={28} />
                  </div>
                </div>
              </div>

              {/* step 2: Choose Pickup/Delivery - icon LEFT, text RIGHT */}
              <div className="absolute top-[192px] left-[2%]">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-500">
                    <Image src={steps[2].icon} alt={steps[2].title} width={28} height={28} />
                  </div>
                  <YummyText className="text-sm text-[#111827]">{steps[2].title}</YummyText>
                </div>
              </div>

              {/* step 3: Secure payment - text LEFT, icon RIGHT */}
              <div className="absolute top-[325px] right-[3%]">
                <div className="flex items-center gap-3">
                  <YummyText className="text-sm text-[#111827]">{steps[3].title}</YummyText>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#FF4D00]">
                    <Image src={steps[3].icon} alt={steps[3].title} width={28} height={28} />
                  </div>
                </div>
              </div>

              {/* step 4: Real-Time Tracking - icon LEFT, text RIGHT */}
              <div className="absolute top-[467px] -left-[2%]">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-red-500">
                    <Image src={steps[4].icon} alt={steps[4].title} width={28} height={28} />
                  </div>
                  <YummyText className="text-sm text-[#111827]">{steps[4].title}</YummyText>
                </div>
              </div>

              {/* step 5: keep default (title below icon) */}
              <div className="absolute top-[535px] right-[5%]">
                <ProcessStep {...steps[5]} />
              </div>
            </div>
          </div>

          {/* Desktop Layout - Horizontal Spiral */}
          <div className="hidden md:block relative min-h-[500px]">
            <div className="absolute inset-0 h-[430px] -left-36 -right-36">
              <Image 
                src="/spiralicon.svg" 
                alt="Process Flow"
                fill
                className="object-fill"
                unoptimized
              />
            </div>
            
            <div className="relative z-10">
              <div className="absolute top-20 mt-20 left-[2%]">
                <ProcessStep {...steps[0]} />
              </div>
              <div className="absolute top-20 left-[28%]">
                <ProcessStep {...steps[1]} />
              </div>
              <div className="absolute top-[90px] right-[26%]">
                <ProcessStep {...steps[3]} />
              </div>

              <div className="absolute top-[350px] left-[26%]">
                <ProcessStep {...steps[2]} />
              </div>
              <div className="absolute top-[364px] right-[23%]">
                <ProcessStep {...steps[4]} />
              </div>

              <div className="absolute top-[130px] right-[0%]">
                <ProcessStep {...steps[5]} />
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>

      <PageWrapper>
        {/* Detailed Steps Section */}
        <section className="py-4 md:py-6 lg:py-4 grid grid-cols-1 md:grid-cols-3 gap-4 px-0 mt-10 sm:mt-10 md:mt-16 md:px-3">
          {/* Step 01 */}
          <div className="bg-[#00D68F] rounded-2xl p-10 md:p-8 h-[100%] md:h-[410px] text-white">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <YummyText className="text-5xl text-white/60 font-light">01</YummyText>
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                  <Image src="/phoneicon.svg" alt="" width={30} height={30} />
                </div>
              </div>
              <YummyText className="text-2xl mb-3 whitespace-nowrap">Create Your Account</YummyText>
              <YummyText className="text-xs opacity-90 mb-6">
                Sign up in seconds using your email or phone number. No complicated forms, no hidden fees. Get instant access to our platform via web or mobile app.
              </YummyText>
              <ul className="space-y-2">
                {['Secure account setup', 'Instant verification', 'Multi-platform access'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Image src="/checkicon.svg" alt="" width={16} height={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step 02 */}
          <div className="bg-violet-500 rounded-2xl p-10 md:p-8 h-[100%] md:h-[410px] text-white">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <YummyText className="text-5xl text-white/60 font-light">02</YummyText>
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                  <Image src="/blockicon-white.svg" alt="" width={30} height={30} />
                </div>
              </div>
              <YummyText className="text-2xl mb-3 whitespace-nowrap">Enter Package Details</YummyText>
              <YummyText className="text-xs opacity-90 mb-6">
                Provide information about your package including size, weight, pickup, and destination. Our smart system calculates the best option for you.
              </YummyText>
              <ul className="space-y-2">
                {['Smart information form', 'Automatic pricing calculation', 'Multiple package support', 'Special handling options'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Image src="/checkicon.svg" alt="" width={16} height={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step 03 */}
          <div className="bg-blue-500 rounded-2xl p-10 md:p-8 h-[100%] md:h-[410px] text-white">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <YummyText className="text-5xl text-white/60 font-light">03</YummyText>
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                  <Image src="/locationicon-white.svg" alt="" width={30} height={30} />
                </div>
              </div>
              <YummyText className="text-2xl mb-3 whitespace-nowrap">Choose Pickup/Delivery</YummyText>
              <YummyText className="text-xs opacity-90 mb-6">
                Select your preferred pickup time and delivery address, including alternative addresses or set a convenient time that works for your schedule.
              </YummyText>
              <ul className="space-y-2">
                {['Flexible scheduling', 'Multiple address management', 'Recurring delivery options', 'Address validation'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Image src="/checkicon.svg" alt="" width={16} height={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step 04 */}
          <div className="bg-[#FF4D00] rounded-2xl p-10 md:p-8 h-[100%] md:h-[410px] text-white">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <YummyText className="text-5xl text-white/60 font-light">04</YummyText>
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                  <Image src="/cardicon.svg" alt="" width={30} height={30} />
                </div>
              </div>
              <YummyText className="text-2xl mb-3 whitespace-nowrap">Secure Payment</YummyText>
              <YummyText className="text-xs opacity-90 mb-6">
                Choose your payment method and complete the transaction securely. We accept all major credit cards, digital wallets and other cash on delivery options.
              </YummyText>
              <ul className="space-y-2">
                {['Multiple payment methods', 'Secure encryption', 'Save payment info', 'Instant confirmation'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Image src="/checkicon.svg" alt="" width={16} height={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step 05 */}
          <div className="bg-red-500 rounded-2xl p-10 md:p-8 h-[100%] md:h-[410px] text-white">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <YummyText className="text-5xl text-white/60 font-light">05</YummyText>
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                  <Image src="/vanicon-white.svg" alt="" width={30} height={30} />
                </div>
              </div>
              <YummyText className="text-2xl mb-3 whitespace-nowrap">Real-Time Tracking</YummyText>
              <YummyText className="text-xs opacity-90 mb-6">
                Track your package every step of the way with live GPS tracking. Get real-time updates at each milestone from pickup to delivery.
              </YummyText>
              <ul className="space-y-2">
                {['Live GPS tracking', 'Driver contact information', 'ETA updates', 'Route visualization'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Image src="/checkicon.svg" alt="" width={16} height={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step 06 */}
          <div className="bg-[#00D68F] rounded-2xl p-10 md:p-8 h-[100%] md:h-[410px] text-white">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <YummyText className="text-5xl text-white/60 font-light">06</YummyText>
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                  <Image src="/checkicon.svg" alt="" width={30} height={30} />
                </div>
              </div>
              <YummyText className="text-2xl mb-3 whitespace-nowrap">Delivery Confirmation</YummyText>
              <YummyText className="text-xs opacity-90 mb-6">
                Receive photos of delivery and electronic signature from your experience and help us maintain our high service standards.
              </YummyText>
              <ul className="space-y-2">
                {['Photo proof of delivery', 'Digital signature', 'Delivery rating system', 'Issue resolution support'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Image src="/checkicon.svg" alt="" width={16} height={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </PageWrapper>

      {/* GPS Tracking Section */}
      <section className="w-full flex justify-center mt-2 px-3 md:px-12">
        <div className="relative w-full max-w-5xl bg-[#1A1A1A] rounded-[24px] md:rounded-[40px] py-8 md:py-12 mb-8 px-6 md:px-14 flex flex-col md:flex-row items-center md:justify-between overflow-hidden">
          <div className="max-w-lg z-10 text-center md:text-left">
            <YummyText className="text-2xl md:text-3xl mb-3 text-[#F9FAFB] flex justify-center md:justify-start">Live GPS Tracking</YummyText>
            <YummyText className="text-xs md:text-sm opacity-90 leading-relaxed mb-6 md:mb-7 text-[#F9FAFB]">
              Our advanced tracking system uses GPS <br className="sm:hidden" /> technology to give you real-time
              updates on <br className="sm:hidden" /> your package location. Watch as your driver <br className="sm:hidden" /> moves closer to
              the destination, with accurate <br className="sm:hidden" /> ETA calculations based on traffic conditions.
            </YummyText>

            <Button
              variant="light"
              className="!bg-[#16A34A] hover:!bg-[#149C46] flex text-xs !text-white mt-4 !px-4 !py-3 rounded-full mx-auto md:mx-0"
            >
              <YummyText>Try Demo Tracking</YummyText>
            </Button>
          </div>

          <div className="flex relative w-full md:w-[40%] items-center justify-center mt-6 md:mt-0">
            <Image
              src="/phonemap-flyingbox.svg"
              alt="Flying Package"
              width={420}
              height={520}
              className="w-64 md:w-full h-auto object-contain z-20"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}