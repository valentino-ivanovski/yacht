"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Playfair_Display_SC } from 'next/font/google';
import { Playfair } from 'next/font/google';
import { Playfair_Display } from 'next/font/google';

const playfairDisplaySC = Playfair_Display_SC({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
});

const playfair = Playfair({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
});

export default function Home() {

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full text-white z-50 transition-all duration-500">
        <nav className="flex flex-col items-center justify-center gap-4 py-6">
            <Link href="#about" className={`flex flex-col items-center justify-center ${playfairDisplaySC.className}`}>
            <p className='text-3xl'>Yacht Moments</p>
            <p className='text-md'>Yacht rental</p>
            </Link>
          <div id='threeItems' className={`flex justify-center items-center gap-12 ${playfair.className} text-lg`}>
            <Link href="#about">
              Services
            </Link>
            <Link href="#yacht">
              The 48 FLY
            </Link>
            <Link href="#contact">
              Contact
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex justify-center items-center overflow-hidden">
      <div className="absolute inset-0 transform">
        <Image
          src="/images/mainpage.png"
          alt="Main Page Background"
          fill
          style={{ objectFit: 'cover', objectPosition: 'bottom' }}
          priority
          className="z-0"
        />
        <Image
          src="/images/yacht.png"
          alt="Main Page Overlay"
          fill
          style={{ objectFit: 'cover', objectPosition: 'bottom' }}
          priority
          className="z-10"
          quality={100}
        />
      </div>
      <div className={`flex flex-col items-start justify-center text-left relative z-5 px-4 transform sm:-translate-x-85 sm:-translate-y-5 -translate-x-10 -translate-y-0 ${playfairDisplay.className}`}>
        <h1 className="text-5xl md:text-7xl mb-6 transform text-white">
          Timeless <i className="italic">Dream</i> <br /> Aboard the 48 FLY
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-white">
          Experience unparalleled elegance with Yacht Moments, where sophistication meets the sea.
        </p>
        <Link
          href="#contact"
          className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg hover:bg-blue-700 transition-colors"
        >
          Reserve Your Journey
        </Link>
      </div>
    </section>

      {/* About Section */}
      <section id="about" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Yacht Moments</h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <p className="text-lg leading-relaxed">
              Inspired by the timeless elegance of old-world luxury, Yacht Moments offers an exclusive escape aboard our meticulously crafted 48 FLY. Our heritage is rooted in sophistication, delivering bespoke experiences that echo the grandeur of a bygone era.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/yacht-deck.jpg"
              alt="Yacht Moments Deck"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Yacht Section */}
      <section id="yacht" className="py-20 bg-navy text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">The 48 FLY</h2>
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2">
              <p className="text-lg leading-relaxed">
                The 48 FLY is the epitome of nautical opulence, blending classic design with modern amenities. With spacious decks, luxurious interiors, and state-of-the-art navigation, it offers an unrivaled yachting experience for discerning travelers.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/48-fly.jpg"
                alt="48 FLY Yacht"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
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
          <p className="text-lg">Yacht Moments © {new Date().getFullYear()}</p>
          <p className="mt-2">Experience the Art of Luxury Yachting</p>
        </div>
      </footer>
    </div>
  );
}