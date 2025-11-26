"use client"

import React, { useState, useEffect, useRef } from "react";
import { X, Menu, Home, User, Zap, Briefcase, GraduationCap, Mail, Github, Linkedin, Download } from "lucide-react";
import gsap from "gsap";

const Drawer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);
  const menuItemsRef = useRef([]);

  const openDrawer = () => {
    setIsVisible(true);
  };

  const closeDrawer = () => {
    if (!drawerRef.current || !overlayRef.current) return;
    
    // Animate out
    gsap.to(drawerRef.current, {
      x: "100%",
      duration: 0.3,
      ease: "power2.in"
    });
    
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setIsVisible(false);
      }
    });
  };

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      
      // Animate in
      if (overlayRef.current && drawerRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.2 }
        );
        
        gsap.fromTo(
          drawerRef.current,
          { x: "100%" },
          { x: "0%", duration: 0.3, ease: "power2.out" }
        );

        // Stagger menu items
        gsap.fromTo(
          menuItemsRef.current.filter(Boolean),
          { x: 30, opacity: 0 },
          { 
            x: 0, 
            opacity: 1, 
            duration: 0.3, 
            stagger: 0.05,
            ease: "power2.out",
            delay: 0.15
          }
        );
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      closeDrawer();
      setTimeout(() => {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }, 400);
    }
  };

  const menuItems = [
    { name: 'Home', id: 'home', icon: Home },
    { name: 'About', id: 'about', icon: User },
    { name: 'Skills', id: 'skills', icon: Zap },
    { name: 'Projects', id: 'projects', icon: Briefcase },
    { name: 'Education', id: 'education', icon: GraduationCap },
    { name: 'Contact', id: 'contact', icon: Mail }
  ];

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={openDrawer}
        className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay and Drawer */}
      {isVisible && (
        <>
          {/* Overlay */}
          <div
            ref={overlayRef}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[998]"
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <div
            ref={drawerRef}
            className="fixed top-0 right-0 h-screen w-[320px] sm:w-[360px] max-w-[90vw] bg-[#0b001a] border-l border-purple-500/20 z-[999] shadow-2xl shadow-purple-900/50"
          >
            {/* Header */}
            <div className="h-[100px] p-6 border-b border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-pink-900/20 flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Menu
                </span>
                <p className="text-xs text-gray-400 mt-1">Navigate through sections</p>
              </div>
              <button
                onClick={closeDrawer}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 hover:rotate-90"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Navigation Area */}
            <div className="h-[calc(100vh-160px)] overflow-y-auto overflow-x-hidden p-6 space-y-2">
              {/* Menu Items */}
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    ref={(el) => (menuItemsRef.current[index] = el)}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left px-4 py-3.5 text-gray-300 hover:text-white rounded-lg transition-all duration-300 group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/0 hover:border-purple-500/30"
                  >
                    {/* Hover gradient background */}
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                    
                    <span className="relative flex items-center gap-3">
                      <IconComponent size={20} className="text-purple-400 group-hover:text-pink-400 transition-colors duration-300" />
                      <span className="font-medium">{item.name}</span>
                    </span>
                  </button>
                );
              })}

              {/* Resume Button */}
              <a
                href="/Resume.pdf"
                download="RushikeshGaikwadResume.pdf"
                ref={(el) => (menuItemsRef.current[menuItems.length] = el)}
                className="flex items-center justify-center gap-2 w-full mt-6 px-4 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-center rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 group"
              >
                <Download size={18} className="group-hover:animate-bounce" />
                <span>Download Resume</span>
              </a>

              {/* Social Links */}
              <div 
                ref={(el) => (menuItemsRef.current[menuItems.length + 1] = el)}
                className="flex justify-center gap-4 mt-8 pt-6 border-t border-purple-500/20"
              >
                <a
                  href="https://github.com/rushikesh125"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110 group border border-white/10 hover:border-purple-500/30"
                >
                  <Github size={20} className="text-gray-300 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rushi7gaikwad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110 group border border-white/10 hover:border-purple-500/30"
                >
                  <Linkedin size={20} className="text-gray-300 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Bottom Footer - Fixed at bottom */}
            <div className="h-[60px] p-4 border-t border-purple-500/20 bg-gradient-to-t from-purple-900/20 to-transparent flex items-center justify-center">
              <p className="text-center text-xs text-gray-500">
                © 2025 Rushikesh Gaikwad
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Drawer;
