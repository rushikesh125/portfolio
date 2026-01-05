"use client"

import React, { useState, useEffect, useRef } from "react";
import Drawer from "./Drawer";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);
  
  useEffect(() => {
    // Navbar entrance animation
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Logo animation
    gsap.fromTo(
      logoRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)", delay: 0.3 }
    );

    // Stagger menu items
    gsap.fromTo(
      menuItemsRef.current,
      { y: -20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.1, 
        ease: "power2.out",
        delay: 0.5 
      }
    );

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: 80 },
        ease: "power3.inOut"
      });
    }
  };

  const menuItems = [
    { name: 'Home', id: 'home' ,link:"/"},
    { name: 'About', id: 'about',link:"/#about" },
    { name: 'Skills', id: 'skills',link:"/#skills" },
    { name: 'Featured Projects', id: 'projects',link:"/#featured-projects" },
    { name: 'All Projects', id: 'all-projects',link:"/projects" },
    { name: 'Education', id: 'education',link:"/#education"},
    { name: 'Contact', id: 'contact',link:"/#contact" }
  ];

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0b001a]/95 backdrop-blur-lg border-b border-white/10 shadow-lg shadow-purple-500/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" ref={logoRef} className="group cursor-pointer">
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110 inline-block">
              Rushi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                ref={(el) => (menuItemsRef.current[index] = el)}
                onClick={() => scrollToSection(item.id)}
                className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/5 group overflow-hidden"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            
            {/* CTA Button with GSAP hover effect */}
            <a
              href="/Resume.pdf"
              download="RushikeshGaikwadResume.pdf"
              ref={(el) => (menuItemsRef.current[menuItems.length] = el)}
              className="ml-4 relative px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium overflow-hidden group"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3, ease: "power2.out" });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
              }}
            >
              <span className="relative z-10">Resume</span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Drawer />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
