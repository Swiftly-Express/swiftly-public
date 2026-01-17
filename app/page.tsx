"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronUp, ChevronDown } from 'lucide-react';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Image from 'next/image';
import YummyText from '../components/YummyText';
import HandDrawnSvg from '../components/HandDrawnSvg';
import StoreButtons from '../components/StoreButtons';
import SmartRideModal from '../components/SmartRideModal';
import Link from 'next/link'
import './home.css';

const Button: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'dark' | 'light';
  className?: string;
  onClick?: () => void;
}> = ({ children, variant = 'primary', className = '', onClick }) => {
  const baseStyles = 'px-4 py-2 rounded';
  const variantStyles = {
    primary: 'bg-[#10b981] text-white hover:bg-[#059669]',
    dark: 'bg-black text-white hover:bg-gray-800',
    light: 'bg-white text-black hover:bg-gray-100'
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


interface Step {
  title: string;
  description: string;
  image: string;
}

interface Service {
  image: string;
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const steps: Step[] = [
  {
    title: "Book",
    description:
      "Schedule your pickup online or via our mobile app in just a few clicks Choose your service type and delivery speed.",
    image: "/palmphone.svg",
  },
  {
    title: "Track",
    description:
      "Monitor your package in real-time with our advanced tracking system. Get update at every milestone of the journey.",
    image: "/laptopbox.svg",
  },
  {
    title: "Deliver",
    description:
      "Receive your package safely and on time. Get instant delivery confirmation with photo proof and signature.",
    image: "/humanbox.svg",
  },
];

export default function SwiftlyLanding() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showSmartRideModal, setShowSmartRideModal] = useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setShowSmartRideModal(true), 3000);
    return () => clearTimeout(t);
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Show modal after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const services: Service[] = [
    {
      image: "/drone.svg",
      title: "Express Delivery",
      description:
        "Lightning-fast delivery within hours. Perfect for urgent packages and time-sensitive documents.",
    },
    {
      image: "/giftcard.svg",
      title: "E-commerce Fulfillment",
      description:
        "Complete fulfillment solutions for online stores. From secure warehousing to fast, reliable last-mile delivery service.",
    },
    {
      image: "/parachute.svg",
      title: "Interstate Logistics",
      description:
        "Reliable cross-country shipping with real-time tracking, full insurance, and guaranteed safety for total peace of mind.",
    },
    {
      image: "/24hrs.svg",
      title: "Corporate Delivery",
      description:
        "Tailored logistics solutions for businesses. Bulk shipping, scheduled deliveries, and dedicated support.",
    },
  ];


  const testimonials = [
    {
      name: "Chinonso Eze",
      location: "Lagos",
      avatar: "/lockedhair.svg",
      message:
        "Swiftly saved my day! My client needed documents in less than an hour, and these guys showed up sharp-sharp. Very reliable!",
    },
    {
      name: "Ngozi Eze",
      location: "Abuja",
      avatar: "/normalwig.svg",
      message:
        "Exceptional service! Delivery was smooth and the rider was very professional. Highly recommended!",
    },
    {
      name: "Emmanuel Udoh",
      location: "Uyo",
      avatar: "/roundcuthair.svg",
      message:
        "Fast and secure! I've used them multiple times and they’ve never disappointed. Perfect for urgent tasks.",
    },
    {
      name: "Adaeze Nwoko",
      location: "PH",
      avatar: "/afrowig.svg",
      message:
        "Great experience! They communicate well and deliver exactly on time. Will definitely use again.",
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);

  // Auto-rotate every 5s
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const active = testimonials[activeIndex];


  const faqs: FAQ[] = [
    {
      question: "How fast can I get a delivery?",
      answer:
        "Swiftly ensures deliveries within minutes depending on your location and distance. Most local deliveries arrive in less than 60 minutes.",
    },
    {
      question: "Can I track my delivery in real-time?",
      answer:
        "Absolutely! You can track your delivery in real-time through the app. You'll see your driver's location and estimated arrival time.",
    },
    {
      question: "Do you deliver outside my city?",
      answer:
        "We currently operate across major cities and are expanding rapidly. Check the app to see if we're available in your area.",
    },
    {
      question: "Is Swiftly available 24/7?",
      answer:
        "Yes, we're always on! Swiftly runs 24/7 so you can send or receive deliveries anytime, day or night.",
    },
  ];

  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      title: "Swiftly Xpress",
      subtitle: "Package secured!",
      message: "You've successfully picked up the package. Update the delivery status when you're on the move."
    },
    {
      id: 2,
      title: "Swiftly Xpress",
      subtitle: "Delivery Reminder",
      message: "Don't forget to update your delivery progress to keep customers informed."
    },
    {
      id: 3,
      title: "Swiftly Xpress",
      subtitle: "New Assignment",
      message: "A new package has been assigned to you. Check your route to get started."
    }
  ]);

  // Hero animation state: 'enter' | 'exit'
  const [heroAnimation, setHeroAnimation] = React.useState<'enter' | 'exit'>('enter');
  const [isDesktopAnim, setIsDesktopAnim] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const onResize = () => setIsDesktopAnim(window.innerWidth >= 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Trigger enter animation on mount
  React.useEffect(() => {
    const t = setTimeout(() => setHeroAnimation('enter'), 80);
    return () => clearTimeout(t);
  }, []);

  // Reveal animations for sections
  const [sectionVisibility, setSectionVisibility] = React.useState<{ [key: string]: boolean }>({});
  const sectionRefs = React.useRef<{ [key: string]: HTMLElement | null }>({});

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute('data-section');
          // Only mark sections as visible when they enter the viewport.
          // Do not set them back to hidden when they leave (no reverse animation).
          if (sectionId && entry.isIntersecting) {
            setSectionVisibility((prev) => ({
              ...prev,
              [sectionId]: true,
            }));
          }
        });
      },
      {
        threshold: 0.01,
        // trigger slightly before section fully appears to feel more responsive
        rootMargin: '0px 0px -20% 0px',
      }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Per-card reveal for elements with `data-reveal` attribute (home page cards).
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const animateClass = isDesktopAnim ? 'animate-revealUp' : 'animate-revealUpMobile';
            el.classList.remove('reveal-hidden');
            el.classList.add(animateClass);
            // stop observing after revealing (no reverse)
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -15% 0px' }
    );

    const els = Array.from(document.querySelectorAll('[data-reveal]')) as HTMLElement[];
    els.forEach((el) => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, [isDesktopAnim]);

  const getRevealClass = (sectionId: string) => {
    const isVisible = sectionVisibility[sectionId];
    if (isVisible) {
      return isDesktopAnim ? 'animate-revealUp' : 'animate-revealUpMobile';
    }
    return 'reveal-hidden';
  };

  const [initialLoad, setInitialLoad] = React.useState(true);
  const prevNotificationCountRef = React.useRef(3); // Track initial count

  // Function to play notification sound
  const playSound = React.useCallback(() => {
    try {
      const audio = new Audio("/notify.mp3");
      audio.volume = 0.95;
      audio.play().catch(err => {
        console.log("Audio playback failed:", err);
      });
    } catch (error) {
      console.log("Audio error:", error);
    }
  }, []);

  // Function to vibrate device
  const vibrate = React.useCallback(() => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }, []);

  // Sample notification templates for dynamic addition
  // const notificationTemplates = [
  //   {
  //     title: "Swiftly Xpress",
  //     subtitle: "Package Delivered!",
  //     message: "Your package has been successfully delivered to the recipient."
  //   },
  //   {
  //     title: "Swiftly Xpress",
  //     subtitle: "Pickup Request",
  //     message: "New pickup request from Lagos. Tap to view details."
  //   },
  //   {
  //     title: "Swiftly Xpress",
  //     subtitle: "Payment Received",
  //     message: "Payment of ₦5,000 has been credited to your account."
  //   },
  //   {
  //     title: "Swiftly Xpress",
  //     subtitle: "Route Update",
  //     message: "Traffic detected on your route. Consider alternative path."
  //   }
  // ];

  // // Function to add new notification dynamically
  // const addNewNotification = React.useCallback(() => {
  //   const randomTemplate = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)];
  //   const newNotification = {
  //     id: Date.now(),
  //     ...randomTemplate
  //   };
  //   setNotifications(prev => [...prev, newNotification]);
  //   if (typeof window !== 'undefined' && 'vibrate' in navigator) {
  //     navigator.vibrate(50);
  //   }
  // }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications(prev => {
        const updated = [...prev];
        const first = updated.shift(); // Remove first card
        if (first) {
          updated.push(first); // Move it to the bottom
        }
        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Play sound only when new notifications are added (not on rotation or page load)
  useEffect(() => {
    // Skip on initial load
    if (initialLoad) {
      setInitialLoad(false);
      prevNotificationCountRef.current = notifications.length;
      return;
    }

    // Only play sound if count actually increased (new notification added)
    if (notifications.length > prevNotificationCountRef.current) {
      playSound();
    }

    // Update the ref with current count
    prevNotificationCountRef.current = notifications.length;
  }, [notifications.length, playSound, initialLoad]);

  return (
    <div className="bg-[#f5f5f5] min-h-screen fullscreen">

      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <PageWrapper className="py-0 flex items-center justify-between">
          {/* <YummyText className="text-3xl px-3 font-sm text-black">
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

      <SmartRideModal isOpen={showSmartRideModal} onClose={() => setShowSmartRideModal(false)} />
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 w-full h-full z-10">
          <div className="relative w-full h-full">
            {/* Bike Image */}
            <div className="absolute inset-0 w-full bg-gradient-to-b from-white via-white/100 to-transparent">
              <Image
                src="/bike.svg"
                alt="bike"
                fill
                className="w-full h-full object-cover object-bottom"
                style={{
                  filter: "drop-shadow(0 20px 36px rgba(0,0,0,0.08))",
                }}
                priority
                unoptimized
              />
            </div>
            {/* White gradient overlay on top of image */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/100 to-transparent" style={{ height: "70%" }} />

          </div>
        </div>

        {/* Content positioned at top */}
        <div className={`min-h-screen z-10 w-full max-w-5xl ${heroAnimation === 'enter' ? (isDesktopAnim ? 'hero-enter-desktop' : 'hero-enter-mobile') : (isDesktopAnim ? 'hero-exit-desktop' : 'hero-exit-mobile')}`}>
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-[#d1fae5] border border-[#008C45] rounded-full px-3 py-1.5 z-10 mt-16 md:mt-8 lg:mt-8 mb-1">
            <div className="flex -space-x-2 mr-2">
              <Image
                src="/roundcuthair.svg"
                alt="Customer 1"
                width={32}
                height={32}
                className="rounded-full bg-purple-600 object-cover"
              />
              <Image
                src="/normalwig.svg"
                alt="Customer 2"
                width={32}
                height={32}
                className="rounded-full bg-rose-500 object-cover"
              />
              <Image
                src="/lockedhair.svg"
                alt="Customer 3"
                width={32}
                height={32}
                className="rounded-full bg-amber-500 object-cover"
              />
              <Image
                src="/afrowig.svg"
                alt="Customer 4"
                width={32}
                height={32}
                className="rounded-full bg-teal-600 object-cover"
              />
            </div>
            <YummyText className="text-[#059669] text-sm font-[300] whitespace-nowrap">
              Trusted by 10,000+ customers
            </YummyText>
          </div>

          {/* Main Heading */}
          <YummyText className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4 sm:mb-6 text-black px-2 mt-4 md:mt-4">
            Delivering <span className="text-[#008C45]">Swiftly</span>,<br />
            Anywhere, Anytime
          </YummyText>

          {/* CTA Button */}
          <div className="flex justify-center mt-10 md:mt-1 sm:mt-6 mb-8 sm:mb-12">
            <div className="group relative inline-block">
              <Button
                variant="dark"
                className="px-6 sm:px-10 py-3 sm:py-4 text-xs sm:text-sm font-[300] rounded-full overflow-hidden transition-[padding] duration-[9000ms] ease-out group-hover:px-12 sm:group-hover:px-16"
                onClick={() => {
                  const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL;
                  window.location.href = `${dashboardUrl}/auth/role-select`;
                }}
              >
                <div className="flex items-center justify-center duration-[6000ms] transition-all ease-out">
                  {/* Icons Container - Slides in from left */}
                  <div className="flex items-center absolute left-6 top-1/2 -translate-y-1/2 opacity-0 -translate-x-4 transition-all duration-[6000ms] ease-out group-hover:opacity-100 group-hover:translate-x-0">
                    {/* App Store Icon */}
                    <div className="w-7 h-7 flex-shrink-0">
                      <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                    </div>

                    {/* Google Play Icon */}
                    <div className="w-7 h-7 flex-shrink-0">
                      <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                      </svg>
                    </div>
                  </div>

                  {/* Text - Stays centered, slides slightly right on hover */}
                  <div className="overflow-hidden whitespace-nowrap relative">
                    {/* Default Text */}
                    <YummyText className="transition-all duration-[1000ms] ease-out group-hover:opacity-0 group-hover:translate-x-4">
                      Get app now
                    </YummyText>

                    {/* Hover Text */}
                    <YummyText className="absolute text-nowrap flex inset-0 items-center !justify-center opacity-0 -translate-x-6 transition-all duration-[2000ms] ease-out group-hover:translate-x-0 group-hover:opacity-100 group-hover:pl-4">
                      Store Download
                    </YummyText>
                  </div>
                </div>
              </Button>
            </div>
          </div>

          {/* Notification Stack */}
          <div className="relative md:absolute md:bottom-20 md:left-1/2 md:transform md:-translate-x-1/2 z-20 mt-52 md:mt-0">
            <div className="relative w-full max-w-[280px] sm:w-[280px] md:w-[260px] h-[100px] sm:h-[120px] mx-auto">
              {notifications.map((item, index) => (
                <div
                  key={item.id}
                  onMouseEnter={vibrate}
                  onTouchStart={vibrate}
                  className="notification-card absolute w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl p-2 sm:p-3 flex items-center gap-2 sm:gap-3"
                  style={{
                    transform: `translateY(${index * 14}px) scale(${1 - index * 0.07})`,
                    opacity: index === 0 ? 1 : 0.95 - index * 0.05,
                    zIndex: notifications.length - index,
                  }}
                >
                  {/* Icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00D68F] to-[#00B876] rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl sm:text-2xl font-bold">S</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-left">
                    <h3 className="text-[10px] sm:text-xs font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-[9px] sm:text-[10px] font-medium text-gray-700 mb-0.5 sm:mb-1">{item.subtitle}</p>
                    <p className="text-[7px] sm:text-[7px] text-[#1E1E1E] font-light leading-tight">{item.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>

      {/* Services Section */}
      <section
        id="services"
        className="bg-white py-0 sm:py-0 md:py-0 lg:py-0"
        data-section="services"
        ref={(el) => { if (el) sectionRefs.current['services'] = el; }}
      >
        <PageWrapper className="max-w-7xl mx-auto">
          <div className={`flex flex-col items-center text-center mb-6 sm:mb-8 space-y-1 px-4 ${getRevealClass('services')}`}>
            <YummyText className="text-[#10b981] text-xs font-xs -mb-1">
              What we do best.
            </YummyText>
            <YummyText className="text-xl sm:text-2xl font-medium text-black">
              Our Services
            </YummyText>
            <YummyText className="text-gray-600 text-base font-[400] max-w-2xl">
              Comprehensive logistics solutions designed to meet <br /> your
              every delivery need
            </YummyText>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
            {services.map((service, index) => (
              <div
                key={index}
                data-reveal
                className={`reveal-hidden bg-[#1E1E1E] rounded-3xl p-5 text-left flex flex-col items-start h-[350px] sm:h-[420px] relative overflow-hidden reveal-stagger-${index + 1}`}
                style={{
                  background:
                    "radial-gradient(circle at center, #1a1a1a, #0d0d0d)",
                }}
              >
                <div className="flex flex-col">
                  <YummyText className="text-[#F9FAFB] text-lg sm:text-xl font-[400]">
                    {service.title}
                  </YummyText>
                  <YummyText className="text-[#E5E7EB] font-[400] text-[14px] sm:text-[14px] leading-snug mt-2">
                    {service.description}
                  </YummyText>
                </div>
                <div className="mt-auto w-full flex justify-center">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={220}
                    height={220}
                    className="sm:max-w-[220px] max-w-[180px] h-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </PageWrapper>
      </section>

      {/* No Hassle Section */}
      <section
        className="hidden bg-[#ffffff] md:block px-4 mt-4 md:mt-6 lg:mt-4 mb-6 md:mb-8 lg:mb-6"
        data-section="nohassle"
        ref={(el) => { if (el) sectionRefs.current['nohassle'] = el; }}
      >
        <PageWrapper className="max-w-7xl">
          <div className={`relative rounded-3xl overflow-hidden h-[430px] flex items-center ${getRevealClass('nohassle')}`}>
            <div
              className="absolute inset-0 bg-cover opacity-100 bg-center"
              style={{
                backgroundImage: "url(/lady.svg)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5" />
            <div className="relative z-10 w-full flex flex-row items-center justify-between md:px-11">
              <div className="flex flex-col justify-center text-left text-white max-w-full">
                <YummyText className="text-5xl font-[600] leading-tight mb-3 -mt-12 -ml-3">
                  No Hassle. Just
                  <br />
                  Swiftly Am.
                </YummyText>
                <StoreButtons className="-ml-3" />
              </div>
              <div className="hidden md:flex flex-col justify-center max-w-sm pr-4 -mr-6 text-right">
                <YummyText className="text-white text-lg md:text-[18px] leading-relaxed font-light">
                  Swiftly makes delivery effortless — from pickup to drop-off,
                  we handle it all with speed and care.
                </YummyText>
              </div>
            </div>
          </div>
        </PageWrapper>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-8 bg-[#ffffff] sm:py-12 md:-mt-4 md:md:-mt-6 lg:-mt-4"
        data-section="howitworks"
        ref={(el) => { if (el) sectionRefs.current['howitworks'] = el; }}
      >
        <PageWrapper className="max-w-6xl mx-auto text-center">
          <div className={`flex flex-col items-center mb-6 md:mb-8 lg:mb-6 px-4 ${getRevealClass('howitworks')}`}>
            <div className="flex justify-center mt-4 md:mt-6 lg:mt-4">
              <YummyText className="px-4 sm:px-6 py-1.5 bg-[#A7F3D0] text-[#00B75A] rounded-full text-xs font-[400]">
                How It Works
              </YummyText>
            </div>
            <YummyText className="text-xl sm:text-3xl md:text-4xl font-semibold text-[#1E1E1E] mb-1 mt-4 leading-tight">
              Three simple steps to get your <br /> package delivered
            </YummyText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:px-4 md:ml-3.5 md:-mt-6 md:md:-mt-7 lg:-mt-6 mb-4 md:mb-5 lg:mb-4 md:px-3 md:mx-2">
            {steps.map((step, index) => (
              <div
                key={index}
                data-reveal
                className={`reveal-hidden bg-[#1E1E1E] rounded-3xl p-6 sm:p-8 md:p-14 md:px-12 !h-[460px] !sm:h-[400px] !md:h-[460px] text-left flex flex-col items-start relative overflow-hidden reveal-stagger-${index + 1}`}
              >
                <div className="flex flex-col">
                  <YummyText className="text-[#F9FAFB] text-3xl sm:text-2xl md:text-3xl font-sm">
                    {step.title}
                  </YummyText>
                  <YummyText className="text-[#E5E7EB] text-sm sm:text-sm font-[200] leading-snug mt-2">
                    {step.description}
                  </YummyText>
                </div>
                <div className="absolute bottom-0 md:bottom-0 left-0 right-0 w-full flex justify-center">
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={240}
                    height={220}
                    className="w-full max-w-[260px] sm:max-w-[200px] md:max-w-[240px] h-auto object-contain"
                    style={{
                      maxHeight: "200px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </PageWrapper>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="relative bg-[#ffffff] py-8 md:py-12 lg:py-8 overflow-hidden"
        data-section="testimonials"
        ref={(el) => { if (el) sectionRefs.current['testimonials'] = el; }}
      >
        <div className="absolute right-2 md:right-14 top-10 md:top-16 z-20 -translate-y-1/2 w-32 md:w-60 h-32 md:h-60 pointer-events-none">
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

        <PageWrapper className="max-w-5xl mx-auto relative -mb-8 z-10 px-4">
          <div className={`flex flex-col items-center text-center mb-8 sm:mb-12 md:-mt-6 ${getRevealClass('testimonials')}`}>
            <YummyText className="px-4 sm:px-6 py-1.5 bg-green-200 text-green-700 rounded-full text-xs font-[400] mb-2 sm:mb-1">
              Testimonials
            </YummyText>
            <YummyText className="text-4xl sm:text-3xl font-medium text-black mb-2 sm:mb-0.5">
              Results that <br className="sm:hidden" /> speaks volumes
            </YummyText>
            <YummyText className="text-gray-600 text-sm sm:text-[12.5px] lg:text-sm -mb-5 sm:-mb-12">
              Don't just take our word for it, hear from our <br className="sm:hidden" /> satisfied clients
            </YummyText>
          </div>

          <div className="rounded-2xl text-center max-w-2xl mx-auto">
            <YummyText className="text-xl sm:text-lg md:text-xl font-medium text-black leading-relaxed px-3 transition-all duration-500">
              {active.message}
            </YummyText>

            <div className="flex flex-col items-center mt-2">
              <YummyText className="text-gray-700 text-base mb-1 mt-3 transition-all duration-500">
                {active.name},{" "}
                <span className="text-[#10b981] font-medium">{active.location}</span>
              </YummyText>

              <HandDrawnSvg className="-mb-3 mr-0 -mt-2" />

              {/* Avatar cluster with concave positioning - responsive sizes */}
              <div className="flex items-center justify-center mb-4 sm:mb-6 md:mb-8 scale-100 sm:scale-75 md:scale-90 lg:scale-100 relative">
                {/* Small Avatar 1 - Top Left */}
                <button
                  onClick={() => setActiveIndex(0)}
                  className={`w-14 h-14 sm:w-11 sm:h-11 mr-2 -mb-3 rounded-full mt-8 overflow-hidden transition-all duration-500 cursor-pointer hover:scale-110 ${activeIndex === 0
                    ? 'border-2 border-[#10b981] opacity-100'
                    : 'border-2 border-white opacity-30 hover:opacity-60'
                    }`}
                  aria-label={`View ${testimonials[0].name}'s testimonial`}
                >
                  <Image src={testimonials[0].avatar} alt={testimonials[0].name} width={56} height={56} className="w-full h-full object-cover" />
                </button>

                {/* Small Avatar 2 - Top Right */}
                <button
                  onClick={() => setActiveIndex(1)}
                  className={`w-14 h-14 sm:w-11 sm:h-11 mt-40 sm:mt-6 md:mt-32 mb-5 -mr-3 rounded-full overflow-hidden transition-all duration-500 cursor-pointer hover:scale-110 ${activeIndex === 1
                    ? 'border-2 border-[#10b981] opacity-100'
                    : 'border-2 border-white opacity-30 hover:opacity-60'
                    }`}
                  aria-label={`View ${testimonials[1].name}'s testimonial`}
                >
                  <Image src={testimonials[1].avatar} alt={testimonials[1].name} width={56} height={56} className="w-full h-full object-cover" />
                </button>

                {/* Big Avatar Display - Center (active testimonial) */}
                <div className="w-[95px] h-[95px] sm:w-[75px] sm:h-[75px] rounded-full bg-purple-200 border-2 border-[#10b981] overflow-hidden relative -ml-5 -mt-12 -mb-5 z-10 transition-all duration-500">
                  <Image
                    src={active.avatar}
                    alt={active.name}
                    width={95}
                    height={95}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                </div>

                {/* Small Avatar 3 - Bottom Left */}
                <button
                  onClick={() => setActiveIndex(2)}
                  className={`w-14 h-14 sm:w-11 sm:h-11 rounded-full mt-[52%] -ml-8 overflow-hidden transition-all duration-500 cursor-pointer hover:scale-110 -ml-1 ${activeIndex === 2
                    ? 'border-2 border-[#10b981] opacity-100'
                    : 'border-2 border-white opacity-30 hover:opacity-60'
                    }`}
                  aria-label={`View ${testimonials[2].name}'s testimonial`}
                >
                  <Image src={testimonials[2].avatar} alt={testimonials[2].name} width={56} height={56} className="w-full h-full object-cover" />
                </button>

                {/* Small Avatar 4 - last Right */}
                <button
                  onClick={() => setActiveIndex(3)}
                  className={`w-14 h-14 sm:w-11 sm:h-11 rounded-full overflow-hidden ml-1.5 mt-9 transition-all duration-500 cursor-pointer hover:scale-110 ${activeIndex === 3
                    ? 'border-2 border-[#10b981] opacity-100'
                    : 'border-2 border-white opacity-30 hover:opacity-60'
                    }`}
                  aria-label={`View ${testimonials[3].name}'s testimonial`}
                >
                  <Image src={testimonials[3].avatar} alt={testimonials[3].name} width={56} height={56} className="w-full h-full object-cover" />
                </button>

                {/* Small Avatar 5 - If exists */}
                {testimonials[4] && (
                  <button
                    onClick={() => setActiveIndex(4)}
                    className={`w-14 h-14 sm:w-11 sm:h-11 rounded-full overflow-hidden ml-1.5 mt-9 transition-all duration-500 cursor-pointer hover:scale-110 ${activeIndex === 4
                      ? 'border-2 border-[#10b981] opacity-100'
                      : 'border-2 border-white opacity-30 hover:opacity-60'
                      }`}
                    aria-label={`View ${testimonials[4].name}'s testimonial`}
                  >
                    <Image src={testimonials[4].avatar} alt={testimonials[4].name} width={56} height={56} className="w-full h-full object-cover" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </PageWrapper>
      </section>

      {/* Carton between Testimonials and FAQ */}
      <div className="relative w-full h-0">
        <div className="absolute left-2 md:left-8 -top-24 md:-top-32 w-32 md:w-60 h-32 md:h-60 pointer-events-none z-10">
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

      {/* FAQ Section */}
      <section
        id="faq"
        className="bg-[#1a1a1a] h-auto relative overflow-hidden"
        data-section="faq"
        ref={(el) => { if (el) sectionRefs.current['faq'] = el; }}
      >

        <PageWrapper className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-2 md:px-6">
            <div className={`space-y-4 md:space-y-6 ${getRevealClass('faq')}`}>
              <div className="flex flex-col">
                <YummyText className="text-[#10b981] font-[400] text-xs md:text-sm mb-3 md:mb-4 mt-8 md:mt-12 md:py-10">
                  FAQs - Frequently asked questions
                </YummyText>
                <YummyText className="text-2xl md:text-4xl text-[#F9FAFB] font-medium leading-tight mb-3 md:-mt-14 md:mb-6">
                  Got questions?
                </YummyText>
                <YummyText className="text-xs md:text-sm text-[#F9FAFB] font-[300] mb-4 md:mb-18 md:-mt-6">
                  Here are a few things people always ask — and our <br className="hidden md:block" /> answers to them
                </YummyText>
              </div>
              <div className="space-y-2 md:space-y-3 pb-8 md:pb-0">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-[#F9FAFB] rounded-lg overflow-hidden bg-[#1a1a1a]"
                  >
                    <button
                      onClick={() =>
                        setOpenIndex(openIndex === index ? null : index)
                      }
                      className="w-full flex justify-between items-center px-4 md:px-5 py-3 md:py-3 text-left focus:outline-none hover:bg-[#222] transition-colors"
                    >
                      <YummyText className="text-sm md:text-base font-[300] text-[#10b981] pr-2">
                        {faq.question}
                      </YummyText>
                      {openIndex === index ? (
                        <ChevronUp className="text-[#10b981] w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="text-[#10b981] w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      )}
                    </button>

                    {openIndex === index && (
                      <div className="px-4 md:px-5 pb-3 md:pb-4">
                        <YummyText className="text-gray-400 text-xs md:text-sm font-[300] leading-relaxed">
                          {faq.answer}
                        </YummyText>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="sticky md:sticky md:top-24 flex items-center justify-center w-full">
                <Image
                  src="/deliverybike.svg"
                  alt="Delivery Bike"
                  width={520}
                  height={300}
                  className="object-contain w-70 mr-20 sm:w-72 md:w-[520px] mx-auto"
                />
              </div>
            </div>
          </div>
        </PageWrapper>
      </section>

      {/* Download App & Quote Section */}
      <section
        className="bg-white py-6 sm:py-10"
        data-section="download"
        ref={(el) => { if (el) sectionRefs.current['download'] = el; }}
      >
        <PageWrapper className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 lg:w-[106%] lg:-ml-7 ${getRevealClass('download')}`}>
            {/* Download App Card */}
            <div className="bg-[#1a1a1a] rounded-3xl p-8 sm:p-10 lg:p-14 relative overflow-hidden min-h-[450px] sm:min-h-[500px] lg:h-[668px]">
              <div className="relative z-10 lg:-mt-5">
                <YummyText className="text-white text-3xl sm:text-4xl lg:text-5xl font-[300] mb-3 sm:mb-4 leading-tight">
                  Download Our
                  <br />
                  Mobile App
                </YummyText>
                <YummyText className="text-[#FFEDD4] flex text-xs sm:text-sm font-[300] mb-4 sm:mb-6 max-w-xs mt-3 sm:mt-4 leading-relaxed">
                  Book deliveries, track packages, and manage your shipments on the go. Available for iOS and Android.
                </YummyText>
                <StoreButtons />
              </div>
              <div className="absolute bottom-0 right-0 w-full max-w-full sm:max-w-full">
                <Image
                  src="/orderbox.svg"
                  alt="Mobile App"
                  width={600}
                  height={300}
                  className="w-full object-contain"
                />
              </div>
            </div>

            {/* Quote Card */}
            <div className="bg-[#10b981] rounded-3xl p-8 sm:p-10 relative overflow-hidden min-h-[450px] sm:min-h-[500px] lg:h-[668px]">
              <div className="relative z-10">
                <YummyText className="text-white text-3xl sm:text-4xl lg:text-5xl font-[300] mb-3 sm:mb-4 leading-tight">
                  Get a Free
                  <br />
                  Quote
                </YummyText>
                <YummyText className="text-[#FFEDD4] flex text-xs sm:text-sm font-[300] mb-4 sm:mb-6 max-w-xs mt-3 sm:mt-4 leading-relaxed">
                  Need a custom logistics solution? Contact us for a personalized quote tailored to your business needs.
                </YummyText>
                <Button
                  variant="light"
                  className="!bg-white !text-[#10b981] hover:!bg-gray-100 !px-4 sm:!px-5 !py-2 sm:!py-2.5 !rounded-full text-xs sm:text-sm"
                  onClick={() => {
                    const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL;
                    window.location.href = `${dashboardUrl}/auth/customer/signup`;
                  }}
                >
                  <YummyText className="font-[400] text-[#001900]">
                    Book a delivery
                  </YummyText>
                </Button>
              </div>
              <div className="absolute bottom-0 right-4 sm:right-9 w-[75%] sm:w-[70%] h-[150px] sm:h-[200px]">
                <Image
                  src="/quotes.svg"
                  alt="Quotes"
                  width={600}
                  height={200}
                  className="w-full h-full object-contain absolute bottom-14 left-16 sm:left-32"
                />
                <Image
                  src="/quotation.svg"
                  alt="Quotation"
                  width={500}
                  height={220}
                  className="w-[85%] h-auto object-contain absolute bottom-0 left-7 sm:left-16 z-10"
                />
              </div>
            </div>
          </div>
        </PageWrapper>
      </section>

      <Footer />
    </div>
  );
}


