import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import YummyText from '../components/YummyText';
import PageWrapper from './PageWrapper';
import InstagramIcon from './icons/InstagramIcon';
import FacebookIcon from './icons/FacebookIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white py-12">
      <PageWrapper className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <img src="/swiftly-logo.svg" alt="Swiftly Xpress" className="h-8" />
            </Link>
            <YummyText className="flex text-gray-400 text-sm font-[300] leading-relaxed mb-6">
              Your trusted logistics partner delivering excellence across the nation with speed, security, and reliability.
            </YummyText>

            {/* Social Icons */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center hover:bg-[#10b981] transition-colors text-gray-400 hover:text-white">
                <FacebookIcon width="18" height="18" className="text-current" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center hover:bg-[#10b981] transition-colors text-gray-400 hover:text-white">
                <InstagramIcon width="18" height="18" className="text-current" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center hover:bg-[#10b981] transition-colors text-gray-400 hover:text-white">
                <WhatsAppIcon width="18" height="18" className="text-current" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <YummyText className="text-lg font-medium mb-4">Quick Links</YummyText>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-[#10b981] text-sm font-[300] transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#10b981] text-sm font-[300] transition-colors">Our Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#10b981] text-sm font-[300] transition-colors">Smart Ride</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#10b981] text-sm font-[300] transition-colors">Track Package</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#10b981] text-sm font-[300] transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#10b981] text-sm font-[300] transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <YummyText className="text-lg font-medium mb-4">Services</YummyText>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-[#10b981] text-sm font-[300] transition-colors">Express Delivery</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#10b981] text-sm font-[300] transition-colors">E-commerce Fulfillment</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#10b981] text-sm font-[300] transition-colors">Interstate Logistics</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#10b981] text-sm font-[300] transition-colors">Corporate Delivery</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#10b981] text-sm font-[300] transition-colors">Same-Day Delivery</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <YummyText className="text-lg font-medium mb-4">Contact Us</YummyText>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 mt-1 flex-shrink-0">
                  <Image src="/locationicon.svg" alt="Location" width={24} height={24} className="object-contain" />
                </div>
                <YummyText className="text-gray-400 text-sm font-[300]">123 Logistics Avenue, Suite 100</YummyText>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 mt-1 flex-shrink-0">
                  <Image src="/telephone.svg" alt="Phone" width={24} height={24} className="object-contain" />
                </div>
                <YummyText className="text-gray-400 text-sm font-[300]">+234 08089000013</YummyText>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 mt-1 flex-shrink-0">
                  <Image src="/mailicon.svg" alt="Email" width={24} height={24} className="object-contain" />
                </div>
                <YummyText className="text-gray-400 text-sm font-[300]">support@swiftlyxpress.com</YummyText>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <YummyText className="text-gray-500 text-sm font-[300]">
            © 2025 Swiftly Xpress. All rights reserved.
          </YummyText>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-[#10b981] text-sm font-[300] transition-colors">Privacy Policy</a>
            <Link href="/terms-of-service" className="text-gray-500 hover:text-[#10b981] text-sm font-[300] transition-colors">Terms of Service</Link>
            <a href="#" className="text-gray-500 hover:text-[#10b981] text-sm font-[300] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </PageWrapper>
    </footer>
  );
};

export default Footer;