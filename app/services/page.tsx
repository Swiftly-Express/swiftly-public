'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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



// ServiceCard Component
interface ServiceCardProps {
  imageSrc: string;
  title: string;
  desc: string;
  bullets: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ imageSrc, title, desc, bullets }) => (
  <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg p-5 md:p-8 text-left flex flex-col items-start h-auto md:h-[360px] transition-all duration-300 hover:shadow-md hover:-translate-y-1">
    {/* Icon */}
    <div className="w-full flex justify-start mb-4 md:mb-6">
      <Image src={imageSrc} alt={title} width={40} height={40} className="md:w-[44px] md:h-[44px] object-contain" />
    </div>

    {/* Title & Description */}
    <div className="flex flex-col">
      <YummyText className="text-[#111827] text-xl md:text-2xl !font-sm mb-1 -mt-1">{title}</YummyText>
      <YummyText className="text-[#4A5563] text-xs md:text-sm leading-tight md:leading-tighter">{desc}</YummyText>
    </div>

    {/* Bullet points */}
    <ul className="space-y-1.5 md:space-y-2 text-left text-xs md:text-sm text-[#4B5563] mt-3 leading-tight">
      {bullets.map((bullet, i) => (
        <li key={i} className="flex items-start">
          <span className="text-green-500 mr-2">✓</span>
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Main Services Component
export default function Services() {
  const router = useRouter();
  const [sectionVisibility, setSectionVisibility] = useState<{ [key: string]: boolean }>({});
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target.getAttribute('data-section');
          if (section && entry.isIntersecting) {
            setSectionVisibility(prev => ({ ...prev, [section]: true }));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Per-card reveal for elements with `data-reveal` attribute (services cards)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const animateClass = isDesktop ? 'animate-revealUp' : 'animate-revealUpMobile';
            el.classList.remove('reveal-hidden');
            el.classList.add(animateClass);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -15% 0px' }
    );

    const els = Array.from(document.querySelectorAll('[data-reveal]')) as HTMLElement[];
    els.forEach((el) => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, [isDesktop]);

  const getRevealClass = (section: string) => {
    if (!sectionVisibility[section]) return 'reveal-hidden';
    if (section === 'hero') {
      return isDesktop ? 'animate-fall' : 'animate-fallMobile';
    }
    return isDesktop ? 'animate-revealUp' : 'animate-revealUpMobile';
  };

  const services = [
    {
      title: 'Same Day Delivery',
      desc: 'Need it today? Our same-day delivery service ensures your packages are delivered within hours of pickup. Perfect for urgent documents, gifts, or business deliveries.',
      imageSrc: '/blockicon.svg',
      bullets: [
        'Pickup within 2 hours',
        'Delivery within 12 hours',
        'Real-time tracking',
        'SMS notifications'
      ]
    },
    {
      title: 'Next Day Delivery',
      desc: 'Our most popular service for non-urgent deliveries. Schedule a pickup today and receive your package tomorrow at a competitive rate.',
      imageSrc: '/vanicon.svg',
      bullets: [
        'Affordable pricing',
        'Guaranteed next-day arrival',
        'Package insurance included',
        'Evening delivery available'
      ]
    },
    {
      title: 'Scheduled Delivery',
      desc: 'Plan ahead with our scheduled delivery service. Choose your preferred pickup and delivery dates up to 30 days in advance.',
      imageSrc: '/clockicon.svg',
      bullets: [
        'Flexible scheduling',
        'Calendar integration',
        'Automatic reminders',
        'Volume discounts available'
      ]
    },
    {
      title: 'International Shipping',
      desc: 'Ship globally with confidence. We partner with major carriers to deliver your packages to over 50 countries worldwide.',
      imageSrc: '/planeicon.svg',
      bullets: [
        'Customs clearance assistance',
        'Door-to-door service',
        'International tracking',
        'Competitive rates'
      ]
    },
    {
      title: 'Secure Delivery',
      desc: 'Enhanced security for valuable items. All packages are tracked, insured up to $5,000, and require signatures on delivery.',
      imageSrc: '/shieldicon.svg',
      bullets: [
        'Enhanced security',
        'Signature required',
        'Photo proof of delivery',
        'Dedicated support'
      ]
    },
    {
      title: 'Business Solutions',
      desc: 'Tailored delivery solutions for businesses of all sizes, Volume discounts, API integration, and dedicated management.',
      imageSrc: '/peopleicon.svg',
      bullets: [
        'Volume discounts',
        'API integration',
        'Monthly billing',
        'Dedicated account manager'
      ]
    }
  ];

  const features = [
    {
      icon: '/locationicon.svg',
      title: 'Nationwide delivery',
      desc: 'Available in all 50 states'
    },
    {
      icon: '/shieldicon.svg',
      title: 'Fully insured',
      desc: 'All shipments up to $500'
    },
    {
      icon: '/clockicon.svg',
      title: 'On-Time Guarantee',
      desc: '95% on-time delivery rate'
    },
    {
      icon: '/staricon.svg',
      title: 'Rated 4.8/5',
      desc: 'Trusted by over 50,000 users'
    }
  ];

  return (
    <div className="bg-[#ffffff] min-h-screen">
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <PageWrapper className="py-3 flex items-center justify-between">
          {/* <YummyText className="text-2xl md:text-3xl px-2 md:px-3 font-sm text-black">
            Swiftly
          </YummyText> */}
          <NavBar />
          <div className="hidden md:flex items-center px-4 gap-3">
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

      <PageWrapper>
        {/* Hero Section */}
        <section
          data-section="hero"
          ref={el => sectionRefs.current['hero'] = el}
          className="relative min-h-[50vh] md:min-h-[calc(75vh-55px)] flex items-center justify-center md:left-16 md:gap-14 px-4 md:px-6 lg:px-20 py-8 md:py-0">
          {/* Left Content */}
          <div className={`flex flex-col justify-center items-center md:items-start text-center md:text-left w-full max-w-md space-y-3 ${getRevealClass('hero')}`}>
            <YummyText className="text-4xl md:text-4xl leading-tight md:leading-snug font-medium text-[#1E1E1E]">
              Delivery Services for <br className="hidden md:block" /> Every Need
            </YummyText>

            <YummyText className="text-[#4B5563] font-[500] text-sm md:text-base leading-6 !mt-3">
              From same-day xpress to international shipping, we have got
              you covered with reliable, <br className="sm:hidden" /> affordable delivery solutions.
            </YummyText>

            <div className="pt-2">
              <Button
                variant="primary"
                className="!px-6 md:!px-4 !py-3 !bg-[#00B75A] shadow-sm rounded-full hover:shadow-md transition-all duration-300"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1') || process.env.NODE_ENV !== 'production')) {
                    window.location.href = '/';
                    return;
                  }
                  window.location.href = 'https://dashboard.swiftlyxpress.com/auth/role-select';
                }}
              >
                <YummyText className="font-[300] text-sm">Get Started</YummyText>
              </Button>
            </div>

            <div className="block md:hidden !mt-10 sm:mt-6 md:mt-8 w-full flex justify-center">
              <Image
                src="/drone.svg"
                alt="Drone Delivery"
                width={220}
                height={140}
                className="w-56 sm:w-48 md:w-48 h-auto object-contain drop-shadow-lg"
              />
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden lg:flex w-[35%] justify-center items-center relative">
            <Image
              src="/drone.svg"
              alt="Drone Delivery"
              width={300}
              height={300}
              className="w-[300px] h-auto object-contain drop-shadow-lg"
            />
          </div>
        </section>

        <div className="relative w-full h-0">
          <div className="absolute -left-8 md:left-4 -top-24 md:-top-32 w-42 md:w-60 h-42 md:h-60 pointer-events-none z-10">
            <Image
              src="/cartonback.svg"
              alt="Carton Box"
              width={240}
              height={240}
              className="w-full h-full object-contain"
              style={{
                transform: "translateX(-30%)",
                filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
              }}
            />
          </div>
        </div>

        {/* Services Section */}
        <section
          data-section="services"
          ref={el => sectionRefs.current['services'] = el}
          className="py-6 md:py-8 lg:py-8 px-2 md:px-16 bg-[#FFFFFF] rounded-3xl">
          <div className={`text-center mb-6 ${getRevealClass('services')}`}>
            <YummyText className="text-2xl md:text-3xl font-sm text-[#111827] mb-3 md:mb-4">
              Our Services
            </YummyText>
            <YummyText className="text-[#4A5565] font-[500] text-sm md:text-base px-4 md:px-0 leading-relaxed">
              Choose from our comprehensive range of delivery services designed to
              <br className="hidden md:block" /> meet your specific needs.
            </YummyText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 sm:px-0 md:px-0">
            {services.map((service, index) => (
              <div key={index} data-reveal className={`reveal-hidden reveal-stagger-${index + 1}`}>
                <ServiceCard
                  imageSrc={service.imageSrc}
                  title={service.title}
                  desc={service.desc}
                  bullets={service.bullets}
                />
              </div>
            ))}
          </div>
        </section>


        <div className="absolute right-0 md:right-0 top-50 md:top-50 z-20 -translate-y-1/2 w-32 md:w-60 h-32 md:h-60 pointer-events-none overflow-hidden">
          <Image
            src="/carton.svg"
            alt="Carton Box"
            width={240}
            height={240}
            className="w-full h-full object-contain"
            style={{
              transform: "translateX(30%) rotate(1deg)",
              filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
            }}
          />
        </div>

        {/* Why Choose Swiftly */}
        <section
          data-section="why-choose"
          ref={el => sectionRefs.current['why-choose'] = el}
          className="bg-[#1E1E1E] text-white rounded-2xl mt-4 md:mt-6 lg:mt-4 mx-3 py-6 md:py-8 lg:py-6 px-2 md:px-6 lg:px-8">
          <div className={`flex justify-center items-center ${getRevealClass('why-choose')}`}>
            <YummyText className="text-4xl md:text-[45px] font-[500] tracking-tight text-center">
              Why Choose <br className="sm:hidden" /> Swiftly?
            </YummyText>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 px-0 md:px-8 mt-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center text-center transition-all duration-300 ${getRevealClass('why-choose')} reveal-stagger-${index + 1}`}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#00D68F1A] mb-4">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={28}
                    height={28}
                    className="item-center"
                  />
                </div>
                <YummyText className="text-xl sm:text-lg md:text-lg lg:text-lg font-medium">
                  {feature.title}
                </YummyText>
                <YummyText className="text-medium sm:text-xs md:text-sm lg:text-sm text-[#4B5563]">
                  {feature.desc}
                </YummyText>
              </div>
            ))}
          </div>
        </section>
      </PageWrapper>

      {/* CTA Section - Full width */}
      <section
        data-section="cta"
        ref={el => sectionRefs.current['cta'] = el}
        className="relative w-full overflow-hidden mt-10">
        <div className="absolute inset-0">
          <Image
            src="/happylady.svg"
            alt="Happy Customer"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-green-800/95 mix-blend-multiply"></div>
        </div>

        {/* Centered Content */}
        <div className={`relative text-center text-white !py-12 md:!py-20 px-4 md:px-6 max-w-5xl mx-auto ${getRevealClass('cta')}`}>
          <YummyText className="text-3xl md:text-3xl font-[500] mb-4 md:mb-5">
            Ready to Get <br className="sm:hidden" /> Started?
          </YummyText>

          <YummyText className="mb-2 text-base md:text-lg font-[200] leading-tight md:leading-tight px-4">
            Join thousands of satisfied customers <br className="sm:hidden" /> who trust Swiftly for their
            delivery <br className="sm:hidden" /> needs.
          </YummyText>

          <div className="flex justify-center gap-3 md:gap-4 mt-6 px-4">
            <Button
              variant="light"
              className="!bg-[#16A34A] hover:!bg-[#149C46] !text-white !px-6 md:!px-3 text-sm !py-3 md:!py-2 rounded-full transition-all duration-300 w-full sm:w-auto"
            >
              <YummyText>Contact Us</YummyText>
            </Button>

            <Button
              variant="outline"
              className="!px-6 md:!px-3 !py-3 md:!py-2 !border-white text-sm bg-[#F9FAFB] !text-[#1E1E1E] hover:!bg-white hover:!text-green-700 rounded-full transition-all duration-300 w-full sm:w-auto"
            >
              <YummyText>View Pricing</YummyText>
            </Button>
          </div>
        </div>
      </section>

      <div className="mt-9"></div>

      {/* Footer */}
      <Footer />
    </div>
  );
}