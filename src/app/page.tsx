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
    if (imagesLoaded >= 2) {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(1000 - elapsedTime, 0); // Ensure at least 1 second
      setTimeout(() => setIsLoading(false), remainingTime + 500); // Add 500ms delay
    }
  }, [imagesLoaded, startTime]);

  return (
    <div className="min-h-screen text-white">
      {/* Loading Screen */}
      <motion.div
        className="fixed inset-0 bg-white flex items-center justify-center z-[100]"
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
          <Link href="#about" className={`flex flex-col items-center justify-center ${playfairDisplaySC.className}`}>
            <p className="text-3xl sm:text-4xl">Yacht Moment</p>
            <p className="text-sm sm:text-lg">-ADRIATIC YACHT CHARTER-</p>
          </Link>
          <div id="threeItems" className={`flex justify-center text-md items-center gap-8 sm:gap-12 ${playfair.className} text-lg`}>
          <Link href="#about" className="relative inline-block group" onClick={(e) => {e.preventDefault(); const target = document.querySelector('#about'); if (target) target.scrollIntoView({ behavior: 'smooth' });}}>Services</Link>
          <Link href="#yacht" className="relative inline-block group" onClick={(e) => {e.preventDefault(); const target = document.querySelector('#yacht'); if (target) target.scrollIntoView({ behavior: 'smooth' });}}>Greenline 48 Fly</Link>
          <Link href="#contact" className="relative inline-block group" onClick={(e) => {e.preventDefault(); const target = document.querySelector('#contact'); if (target) target.scrollIntoView({ behavior: 'smooth' });}}>Contact</Link>
        </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex justify-center items-center overflow-hidden">
        <div className="absolute inset-0 transform">
          <Image
            src="/images/mainpage.png"
            alt="Main Page Background"
            fill
            style={{ objectFit: 'cover', objectPosition: 'bottom', transform : 'translateY(0%)' }}
            priority
            quality={100}
            sizes="100vw"
            className="z-0"
            onLoad={handleImageLoad}
          />
          <Image
            src="/images/yachtt.png?v=2"
            alt="Main Page Overlay"
            fill
            style={{ objectFit: 'cover', objectPosition: 'bottom' }}
            priority
            quality={100}
            sizes="100vw"
            className="z-10 pointer-events-none"
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
            className="text-white z-30 px-4 py-2 backdrop-blur-sm hover:bg-white/30 cursor-pointer text-lg border border-white rounded-sm transition-all duration-300"
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
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
      </section>

      {/* Yacht Section */}
      <section id="yacht" className="py-20 bg-navy text-cream">
        <div className="w-1/2 h-px absolute -my-11 bg-gray-300 opacity-40 left-1/2 transform -translate-x-1/2"></div>
            <div className="max-w-7xl pt-5 mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="flex justify-center items-center gap-8">
              <Image
              src="/svgs/1.svg"
              alt="SVG 1"
              width={100}
              height={100}
              className="object-contain"
              />
              <Image
              src="/svgs/2.svg"
              alt="SVG 2"
              width={100}
              height={100}
              className="object-contain"
              />
              <Image
              src="/svgs/3.svg"
              alt="SVG 3"
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
                className={`text-2xl text-white border px-3 hover:bg-white/20 transition-color duration-300 py-1 rounded-sm ${playfair.className}`}
                >
                Learn More about the Greenline 48 Fly
                </Link>
            </div>
          </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-1/2 h-px absolute -my-20 bg-gray-300 opacity-40 left-1/2 transform -translate-x-1/2"></div>
        <h1 className={`text-7xl leading-relaxed text-center mb-8 ${playfairDisplay.className}`}>Greenline 48 Fly</h1>
            <p className={`text-xl leading-relaxed text-center mb-8 ${playfair.className}`}>
            Yacht Moment is a premier luxury yacht charter
             service offering a one-of-a-kind experience along
              the Adriatic coast. We specialize in providing
               bespoke journeys aboard the Greenline 48 FLY,
              a state-of-the-art yacht that combines luxury,
               comfort, and sustainability. Our mission is to
                create unforgettable moments for our clients,
                 offering personalized itineraries and impeccable
                service. Whether you’re planning a short getaway
                 or an extended adventure, Yacht Moment ensures 
                 that every journey is tailored to your preferences,
                  making each voyage truly exceptional.
            </p>
        <div className='flex flex-row items-center justify-center gap-12'>
          <div className="flex flex-col items-center justify-center">
            
          </div>
          <div className="flex flex-col items-center justify-center">

          </div>
          <div className="flex flex-col items-center justify-center">

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Get in Touch</h2>
        <div className="max-w-lg mx-auto">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full mt-2 p-3 rounded-md bg-cream border border-navy text-navy focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-2 p-3 rounded-md bg-cream border border-navy text-navy focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full mt-2 p-3 rounded-md bg-cream border border-navy text-navy focus:outline-none focus:ring-2 focus:ring-blue-600"
              ></textarea>
            </div>
            <button className="w-full bg-blue-600 text-cream px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-cream py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg">Yacht Moment © {new Date().getFullYear()}</p>
          <p className="mt-2">Experience the Art of Luxury Yachting</p>
        </div>
      </footer>
    </div>
  );
}