 'use client';

import React, { useState } from 'react';
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

}

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

  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

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
                if (typeof window !== 'undefined' && (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1') || process.env.NODE_ENV !== 'production')) {
                  window.location.href = '/';
                  return;
                }
                window.location.href = 'https://dashboard.swiftlyxpress.com/auth/customer/signup';
              }}
            >
              <YummyText>Book a delivery</YummyText>
            </Button>
            
            <Button
              variant="dark"
              className="px-4 py-3 text-medium rounded-full font-[300] text-[10px]"
              onClick={() => {
                if (typeof window !== 'undefined' && (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1') || process.env.NODE_ENV !== 'production')) {
                  window.location.href = '/';
                  return;
                }
                window.location.href = 'https://dashboard.swiftlyxpress.com/auth/role-select';
              }}
            >
              <YummyText>Get Started</YummyText>
            </Button>
          </div>
          
        </PageWrapper>
      </div>

      <PageWrapper className="relative w-full overflow-hidden">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 items-center max-w-6xl mx-auto px-6 md:px-10 py-14">

          {/* LEFT SIDE TEXT */}
          <div className="space-y-6">
            {/* text badge */}
            <div className="inline-flex items-center gap-2 bg-[#D8FFEB] border border-dashed border-[#00B75A] rounded-full px-3 py-1.5 z-10 mt-0 mb-0">
              <YummyText className="text-[#059669] text-[9px] font-medium whitespace-nowrap">
                SMART RIDES - Same day Delivery
              </YummyText>
            </div>

            <YummyText className="text-4xl md:text-4xl font-[300] leading-tight text-black">
              Lightning-Fast Delivery on <br /> Two Wheels
            </YummyText>

            <YummyText className="text-gray-600 text-sm md:text-base leading-relaxed">
              Skip the traffic and beat the clock with our Same-Day Smart Rides.
              Our motorcycles weave through the city with speed and precision,
              ensuring your packages arrive today — and on time.
            </YummyText>

            <button className="flex items-center gap-2 bg-[#00B75A] hover:bg-green-600 text-white text-xs px-5 py-3 rounded-full transition-all">
              Send A Package Now
            </button>
          </div>

          {/* RIGHT SIDE IMAGE CLUSTER */}
          <div className="relative flex justify-center items-center lg:-mr-10">

            {/* GREEN CARD: contains both images and hides overflow */}
            <div className="relative w-[300px] h-[300px] sm:w-[320px] sm:h-[320px] lg:w-[420px] lg:h-[420px] rounded-full bg-[#00B75A] flex items-center justify-center overflow-hidden">

              {/* phone-street image - placed behind the bike */}
              <div className="absolute inset-0 z-10 left-2 top-11 pointer-events-none">
                <Image
                  src="/phonestreet-icon.svg"
                  alt="Street phone background"
                  width={270}
                  height={270}
                  className="object-cover object-center opacity-100"
                  priority
                />
              </div>

              {/* delivery bike image - sits in front */}
              <div className="relative top-14 left-5 z-20 w-[70%] md:w-[90%] lg:w-[90%] pointer-events-none">
                <Image
                  src="/deliverybike.svg"
                  alt="Delivery bike"
                  width={600}
                  height={600}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>

            </div>

            {/* Avatar bubbles (desktop) - clickable to reveal reviews */}
            {/* We'll render these from a local array so each has a popup position and review content */}
            {/** Desktop avatars **/}
            {
              (() => {
                const avatars = [
                  {
                    id: 0,
                    src: '/lockedhair.svg',
                    alt: 'Reviewer 1',
                    pos: 'absolute hidden lg:block left-[40%] top-[-6%]',
                    popup: 'absolute -top-20 left-1/2 -translate-x-1/2',
                    review: '"Incredible speed — my package arrived within 15 minutes. Highly recommend Smart Ride!"'
                  },
                  {
                    id: 1,
                    src: '/afrowig.svg',
                    alt: 'Reviewer 2',
                    pos: 'absolute hidden lg:block left-[8%] top-[24%]',
                    popup: 'absolute left-full top-0 ml-3',
                    review: '"Fantastic service. The rider was professional and my delivery was flawless."'
                  },
                  {
                    id: 2,
                    src: '/roundcuthair.svg',
                    alt: 'Reviewer 3',
                    pos: 'absolute hidden lg:block right-8 top-[48%]',
                    popup: 'absolute -right-64 top-0 w-56',
                    review: '"Quick, reliable, and convenient. Smart Ride saved my day."'
                  },
                  {
                    id: 3,
                    src: '/normalwig.svg',
                    alt: 'Reviewer 4',
                    pos: 'absolute hidden lg:block right-[12%] bottom-[-3%]',
                    popup: 'absolute -right-48 -bottom-24 w-56',
                    review: '"Excellent communication from pickup to delivery — no surprises."'
                  },
                  {
                    id: 4,
                    src: '/blackchic.svg',
                    alt: 'Reviewer 5',
                    pos: 'absolute hidden lg:block left-[12%] bottom-[-3%]',
                    popup: 'absolute -left-48 -bottom-24 w-56',
                    review: '"Affordable and fast. I use Smart Ride for urgent errands."'
                  },
                  {
                    id: 5,
                    src: '/lightcolorwig.svg',
                    alt: 'Reviewer 6',
                    // position this avatar near the left edge of the delivery bike
                    pos: 'absolute hidden lg:block left-[34%] z-20 top-[40%] -translate-y-1/2',
                    popup: 'absolute -left-64 top-0 w-56',
                    review: '"Seamless experience from booking to delivery — great app!"'
                  }
                ];

                return avatars.map((a, i) => (
                  <div key={a.id} className={a.pos}>
                    {selectedAvatar !== a.id && (
                      <button
                        onClick={() => setSelectedAvatar(prev => prev === a.id ? null : a.id)}
                        className="w-16 h-16 rounded-full border-[2px] border-[#00B75A] bg-sky-500 overflow-hidden focus:outline-none cursor-pointer flex items-center justify-center"
                        data-index={i}
                        aria-label={`Open review ${i + 1}`}
                      >
                        <Image src={a.src} alt={a.alt} width={65} height={65} className="rounded-full" />
                      </button>
                    )}

                    {selectedAvatar === a.id && (
                      <div className={`${a.popup} z-50`}>
                        <div className="bg-white text-sm text-gray-800 p-3 rounded-lg shadow-lg max-w-xs flex items-start gap-3 cursor-pointer" onClick={() => setSelectedAvatar(null)}>
                          <div className="w-10 h-10 flex-shrink-0 bg-sky-200 rounded-full overflow-hidden border-2 border-[#00B75A] flex items-center justify-center">
                              <Image src={a.src} alt={a.alt} width={30} height={30} className="rounded-full" />
                            </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Customer Review</div>
                            <div className="text-sm">{a.review}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ));
              })()
            }

            {/* overlay to close popups when clicking anywhere (covers cluster area) */}
            {selectedAvatar !== null && (
              <div className="absolute inset-0 z-40" onClick={() => setSelectedAvatar(null)} />
            )}

            {/* ⭐ MOBILE VERSION (cluster tight, smaller) */}
            <div className="flex lg:hidden gap-3 absolute bottom-[-50px]">
              <div className="w-10 h-10 rounded-full bg-sky-200 border-2 border-[#00B75A] overflow-hidden">
                <Image src="/roundcuthair.svg" alt="testimonial" width={40} height={40} className="rounded-full" />
              </div>
              <div className="w-10 h-10 rounded-full bg-sky-200 border-2 border-[#00B75A] overflow-hidden">
                <Image src="/normalwig.svg" alt="testimonial" width={40} height={40} className="rounded-full" />
              </div>
              <div className="w-10 h-10 rounded-full bg-sky-200 border-2 border-[#00B75A] overflow-hidden">
                <Image src="/lockedhair.svg" alt="testimonial" width={40} height={40} className="rounded-full" />
              </div>
              <div className="w-10 h-10 rounded-full bg-sky-200 border-2 border-[#00B75A] overflow-hidden">
                <Image src="/afrowig.svg" alt="testimonial" width={40} height={40} className="rounded-full" />
              </div>
              <div className="w-10 h-10 rounded-full bg-sky-200 border-2 border-[#00B75A] overflow-hidden">
                <Image src="/avatar5.svg" alt="testimonial" width={40} height={40} className="rounded-full" />
              </div>
              <div className="w-10 h-10 rounded-full bg-sky-200 border-2 border-[#00B75A] overflow-hidden">
                <Image src="/avatar6.svg" alt="testimonial" width={40} height={40} className="rounded-full" />
              </div>
            </div>

          </div>
        </section>
      </PageWrapper>


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