"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Playfair_Display_SC, Playfair, Playfair_Display } from 'next/font/google';
import { WindSong} from 'next/font/google';
import { useState, useEffect } from 'react';
import Blueprint from "@/app/components/blueprint";
import Tables from "@/app/components/tables";
import Slideshow from "@/app/components/slideshow";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { FacebookIcon, InstagramIcon } from 'lucide-react';

const playfairDisplaySC = Playfair_Display_SC({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  style: ['italic', 'normal'],
});

const playfair = Playfair({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  style: ['italic', 'normal'],
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  style: ['italic', 'normal'],
});

const windSong = WindSong({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-windsong',
  style: ['normal'],
});

export default function Home() {
  const [isScrolledUp, setIsScrolledUP] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [isInHeroSection, setIsInHeroSection] = useState(true);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroSectionHeight = window.innerHeight-200;
      setIsInHeroSection(currentScrollY <= heroSectionHeight);

      if (currentScrollY <= heroSectionHeight) {
        // Still in hero section: always visible
        setIsVisible(true);
        setIsScrolledUP(false);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down after hero: hide navbar
        setIsVisible(false);
        setIsScrolledUP(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up after hero: show navbar
        setIsVisible(true);
        setIsScrolledUP(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Handle image loading and minimum 1-second display
  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  useEffect(() => {
    if (imagesLoaded >= 1) {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(1000 - elapsedTime, 0); // Ensure at least 1 second
      setTimeout(() => setIsLoading(false), remainingTime + 500); // Add 500ms delay
    }
  }, [imagesLoaded, startTime]);

  return (
    <div className="min-h-screen text-white">
      {/* Loading Screen */}
      <motion.div
        className="fixed inset-0 bg-white flex items-center text-center mx-auto justify-center z-[100]"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={{ duration: 1 }}
        onAnimationComplete={() => {
          if (!isLoading) setShowLoadingScreen(false);
        }}
        style={{ display: showLoadingScreen ? 'flex' : 'none' }}
      >
        <h1 className={`text-5xl text-black ${playfairDisplaySC.className}`}>Yacht Moment</h1>
      </motion.div>

      {/* Header */}
      <motion.header
        className={`fixed top-0 w-full z-100 transition-all duration-500 ${
          (isInHeroSection && lastScrollY > 0) || isScrolledUp || !isVisible
          ? 'backdrop-blur-lg bg-white/100 text-black shadow-md'
          : 'bg-transparent text-white'
        }`}
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : '-100%' }}
        transition={{ duration: 0.1 }}
      >
        <nav className="flex flex-col h-40 items-center justify-center gap-4 py-6">
          <Link href="#services" className={`flex flex-col items-center justify-center ${playfairDisplaySC.className}`}>
            <p className="text-3xl sm:text-4xl">Yacht Moment</p>
            <p className="text-sm sm:text-lg">-ADRIATIC YACHT CHARTER-</p>
          </Link>
          <div id="threeItems" className={`flex justify-center text-md items-center gap-8 sm:gap-12 ${playfair.className} text-lg`}>
          <Link href="#services" className="relative inline-block group" onClick={(e) => {e.preventDefault(); const target = document.querySelector('#services'); if (target) target.scrollIntoView({ behavior: 'smooth' });}}>Services</Link>
          <Link href="#yacht" className="relative inline-block group" onClick={(e) => {e.preventDefault(); const target = document.querySelector('#yacht'); if (target) target.scrollIntoView({ behavior: 'smooth' });}}>Greenline 48 Fly</Link>
          <Link href="#contact" className="relative inline-block group" onClick={(e) => {e.preventDefault(); const target = document.querySelector('#contact'); if (target) target.scrollIntoView({ behavior: 'smooth' });}}>Contact</Link>
        </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex justify-center items-center overflow-hidden">
        <div className="absolute inset-0 transform">
          <Image
            src="/images/mainpage.webp"
            alt="Main Page Background"
            fill
            style={{ objectFit: 'cover', objectPosition: 'bottom', transform : 'translateY(0%)' }}
            priority
            quality={100}
            sizes="100vw"
            className="z-0"
            onLoad={handleImageLoad}
          />
        </div>
        <div
          className={`flex flex-col items-center sm:items-start justify-center sm:text-left text-center relative sm:z-5 z-50 px-4 transform lg:-translate-x-45 lg:-translate-y-0 sm:-translate-x-0 sm:-translate-y-0 md:-translate-x-0 md:-translate-y-0 xl:-translate-x-80 xl:-translate-y-0 ${playfairDisplay.className}`}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 transform text-white">
            Timeless <em className="italic">Dream</em> on <br />the Greenline 48 Fly
          </h1>
          <p className={`text-xl md:text-2xl mb-8 max-w-2xl text-white ${playfair.className}`}>
            Experience unparalleled elegance with Yacht Moment, where sophistication meets the sea.
          </p>
          <Link
            href="#contact"
            className="text-white z-30 px-4 py-2 backdrop-blur-sm hover:bg-white hover:text-black cursor-pointer text-lg border border-white rounded-sm transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              const target = document.querySelector('#contact');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Reserve Your Journey
          </Link>
        </div>
        {isInHeroSection && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-10 animate-[bounce_2s_infinite] z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-8 h-8 text-white"
              aria-label="Scroll down"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
      </section>

      {/* Small About Section */}
      <section className='pt-25'>
                <div className="w-1/3 h-px absolute -my-11 bg-gray-300 opacity-40 left-1/2 transform -translate-x-1/2"></div>
        <div className='flex items-center mb-3 mx-auto max-w-7xl justify-center'>
          <p className={`text-xl leading-relaxed italic w-9/10 sm:w-1/2 text-center mb-8 ${playfair.className}`}>
          Yacht Moment is a premier luxury yacht charter service offering a one-of-a-kind experience along the Adriatic coast. We specialize in providing bespoke journeys aboard the <Link href="#yacht" onClick={(e) => { e.preventDefault(); const target = document.querySelector('#yacht'); if (target) target.scrollIntoView({ behavior: 'smooth' }); }}>Greenline 48 FLY</Link>, a state-of-the-art yacht that combines luxury, comfort, and sustainability.
          </p>
        </div>
        <div className="w-1/3 h-px absolute bg-gray-300 opacity-40 left-1/2 transform -translate-x-1/2"></div>
      </section>

      {/* Yacht Section */}
      <section id="yacht" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/*title*/}
            <h3 className={`text-3xl md:text-4xl transform -translate-x-1 translate-y-2 font-medium text-center ${windSong.className}`}>The Greenline</h3>
            <h2 className={`text-6xl md:text-7xl font-bold text-center mb-8 ${playfairDisplay.className}`}>∙ 48 FLY ∙</h2>
              <p className={`text-xl leading-relaxed text-center mx-auto mb-8 w-9/10 sm:w-1/2 italic ${playfair.className}`}>
              The Greenline 48 Fly blends innovation, elegance, and sustainability. As Greenline’s flagship model, it features next-gen hybrid propulsion, refined interiors, and super performance, setting a new benchmark in luxury yachting.
              </p>
            <div className="flex items-center transform -translate-y-10 justify-center px-10 pt-6">
            <Blueprint />
            </div>
            <div className='py-0'>
            <div className="flex flex-row justify-center items-center gap-3 sm:gap-8">
              <Image
              src="/svgs/1.svg"
              alt="Diesel Drive Icon"
              width={100}
              height={100}
              className="object-contain"
              />
              <Image
              src="/svgs/3.svg?v2"
              alt="Electric Drive Icon"
              width={100}
              height={100}
              className="object-contain"
              />
              <Image
              src="/svgs/2.svg"
              alt="Hybrid Drive Icon"
              width={100}
              height={100}
              className="object-contain"
              />
            </div>
            </div>
            <Tables />
            <Slideshow />
            <div className="text-center">
                <Link
                href="https://www.greenlinehybrid.com/en/yacht/greenline-48-fly"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-white border px-6 py-3 border-white rounded-sm hover:bg-white hover:text-black transition-color duration-300 text-lg ${playfairDisplay.className}`}>
                Learn More About the 48 Fly
                </Link>
            </div>
          </div>
      </section>

      <section id="services" className="py-20 bg-navy">
        <div className="w-1/2 h-px absolute -my-20 bg-gray-300 opacity-40 left-1/2 transform -translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-5xl md:text-6xl -mt-5 font-bold text-center mb-5 text-cream ${playfairDisplay.className}`}>
            Our Services
          </h2>
          <p className={`text-xl leading-relaxed text-center mx-auto mb-8 w-9/10 italic text-cream ${playfair.className}`}>
            Our company specializes in providing tailored luxury travel experiences across the Adriatic, offering private yacht charters, seamless A-to-B transfers between destinations, and custom jet-to-port journeys for direct access to your yacht.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Service 1 - Yacht Charter */}
            <div className="bg-white rounded-lg p-6 flex flex-col items-center shadow-md h-full">
              <div className="text-center">
                <h3 className={`text-2xl font-bold mb-3 text-black ${playfairDisplaySC.className}`}>
                  Luxury Adriatic Charter
                </h3>
                <p className={`text-gray-700 ${playfair.className} mb-4`}>
                  Experience the Adriatic coast at your own pace with our fully customizable luxury yacht charters. 
                </p>
                
                <div className={`w-full border-t border-gray-200 pt-4 ${playfair.className}`}>
                  <h4 className="text-lg mb-2 text-black">Duration Options:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex justify-between">
                      <span>Weekend Getaway</span>
                      <span>€7,500 (3 days)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Week Explorer</span>
                      <span>€15,000 (7 days)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Extended Voyage</span>
                      <span>€25,000 (14 days)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Service 2 - A to B Transfers */}
            <div className="bg-white rounded-lg p-6 flex flex-col items-center shadow-md h-full">
              <div className="text-center">
                <h3 className={`text-2xl font-bold mb-3 text-black ${playfairDisplaySC.className}`}>
                  Luxury Transfers
                </h3>
                <p className={`text-gray-700 ${playfair.className} mb-4`}>
                  Seamless point-to-point transfers offering a refined and comfortable journey between selected Adriatic destinations.
                </p>
                
                <div className={`w-full border-t border-gray-200 pt-4 ${playfair.className}`}>
                  <h4 className="text-lg mb-2 text-black">Transfer Options:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex justify-between">
                      <span>Portorož → Rovinj</span>
                      <span>€3,500</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Portorož → Hvar</span>
                      <span>€4,200</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Custom Route</span>
                      <span>Price on request</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Service 3 - Jet to Port */}
            <div className="bg-white rounded-lg p-6 flex flex-col items-center shadow-md h-full">
              <div className="text-center">
                <h3 className={`text-2xl font-bold mb-3 text-black ${playfairDisplaySC.className}`}>
                  Jet to Port
                </h3>
                <p className={`text-gray-700 ${playfair.className} mb-4`}>
                  Enjoy seamless travel with our Luxury Custom Jet to Port Journeys, offering direct transfers from the airport to your yacht.
                </p>
                
                <div className={`w-full border-t border-gray-200 pt-4 ${playfair.className}`}>
                  <h4 className="text-lg mb-2 text-black">Service Includes:</h4>
                  <ul className="space-y-2 text-sm text-center">
                    <li className="flex text-black justify-center items-center ">
                      <span className="mr-2">•</span>
                      <span>Private airport transfer</span>
                    </li>
                    <li className="flex justify-center text-black items-start">
                      <span className="mr-2">•</span>
                      <span>Immediate yacht boarding</span>
                    </li>
                  </ul>
                  <div className="mt-4 text-center text-black">
                    <span className="text-sm">Starting from €5,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className={`mb-2 transform -translate-y-8 max-w-2xl mx-auto text-cream ${playfair.className}`}>
              <p className="text-lg">All charters include:</p>
              <div className="flex flex-row justify-center gap-4 sm:gap-8 mt-4 text-md">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Professional Skipper
                </span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Luxury Amenities
                </span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Tailored Itinerary
                </span>
              </div>
            </div>
            
            <Link
              href="#contact"
              className={`inline-block px-6 py-3 border border-white text-white rounded-sm hover:bg-white hover:text-black transition-all duration-300 text-lg ${playfairDisplay.className}`}
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector('#contact');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Reserve Your Luxury Experience
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pb-15 pt-15 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-5xl md:text-6xl font-bold mb-4 ${playfairDisplay.className} text-black`}>Contact Us</h2>
            <p className={`text-xl ${playfair.className} italic max-w-2xl mx-auto text-black`}>
              Ready to embark on your luxury journey? Our team is standing by to craft your perfect yachting experience.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl transform -translate-y-5 p-5 max-w-xl mx-auto">
            <div className="flex flex-col items-center">
              <form className="space-y-6 w-full max-w-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={`block mb-2 text-sm uppercase tracking-wider ${playfair.className} text-black`}>Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-black/50 rounded-md text-black placeholder-gray-500 focus:ring-1 focus:ring-black focus:border-black/60 outline-none transition-all"
                      placeholder="Name and Surname"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block mb-2 text-sm uppercase tracking-wider ${playfair.className} text-black`}>Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-black/50 rounded-md text-black placeholder-gray-500 focus:ring-1 focus:ring-black focus:border-black/60 outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={`block mb-2 text-sm uppercase tracking-wider ${playfair.className} text-black`}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-black/50 rounded-md text-black placeholder-gray-500 focus:ring-1 focus:ring-black focus:border-black/60 outline-none transition-all"
                    placeholder="Tell us about your desired journey..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full px-6 cursor-pointer py-3 border border-black rounded-md text-black bg-transparent hover:bg-black hover:text-white transition-colors duration-300 ${playfairDisplay.className} text-lg`}
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </form>

              <div className={`${playfair.className} mt-6 w-full max-w-md`}>
                <h3 className={`text-xl font-medium mb-3 text-center ${playfairDisplaySC.className} text-black`}>Direct Contact</h3>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-6 text-black">
                  <p className="flex items-center gap-3">
                    <PhoneIcon className="h-5 w-5 text-black" />
                    <span>+386 40 123 456</span>
                  </p>
                  <p></p>
                  <p className="flex items-center gap-3">
                    <EnvelopeIcon className="h-5 w-5 text-black" />
                    <span>info@yachtmoment.com</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center -mt-4 mb-12">
            <div>
              <h3 className={`text-xl text-center font-medium ${playfairDisplaySC.className}`}>Yacht Moment</h3>
              <p className={`${playfair.className} text-white/80 max-w-md text-center`}>
                Luxury yacht charters in the Adriatic Sea, offering unforgettable experiences aboard the Greenline 48 Fly.
              </p>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/20">
            <div className="flex flex-col md:flex-row text-center justify-between items-center">
              <p className={`${playfair.className} mb-4 md:mb-0`}>
                © {new Date().getFullYear()} Yacht Moment. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link href="#" aria-label="Instagram">
                  <InstagramIcon className="w-5 h-5 hover:text-white transition-colors" />
                </Link>
                <Link href="#" aria-label="Facebook">
                  <FacebookIcon className="w-5 h-5 hover:text-white transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}