'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { 
  ArrowRight, Play, ChevronDown, Maximize, 
  ArrowUpRight, Globe, Cpu, Zap 
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollTrigger);

// --- COMPONENT: GLITCH TEXT ---
const ScrambleText = ({ text, className }) => {
  const [display, setDisplay] = useState(text);
  const chars = 'ABCDEF0123456789!@#$%^&*()';
  
  const handleOver = () => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split('').map((letter, index) => {
          if (index < iterations) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 2;
    }, 30);
  };

  return (
    <span onMouseEnter={handleOver} className={twMerge("cursor-pointer inline-block", className)}>
      {display}
    </span>
  );
};

export default function GodModeFixed() {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // --- 1. PRELOADER & SETUP ---
  useEffect(() => {
    // Simulate asset loading
    const timer = setTimeout(() => {
        setIsLoaded(true);
        window.scrollTo(0,0);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // --- 2. LENIS SMOOTH SCROLL ---
  useEffect(() => {
    if(!isLoaded) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [isLoaded]);

  // --- 3. ANIMATIONS ---
  useLayoutEffect(() => {
    if(!isLoaded) return;
    
    const ctx = gsap.context(() => {
      
      // A. HERO PARALLAX
      gsap.to('.hero-bg', {
        y: '20%',
        scale: 1.1,
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
      });

      // B. HORIZONTAL SCROLL (FIXED LOGIC)
      // We animate the CONTAINER left, not the individual panels.
      const horizontalSection = document.querySelector('.horizontal-scroll-section');
      const horizontalContainer = document.querySelector('.horizontal-container');
      
      if (horizontalSection && horizontalContainer) {
        gsap.to(horizontalContainer, {
          x: () => -(horizontalContainer.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalSection,
            pin: true,
            scrub: 1,
            // Calculate scroll distance based on width
            end: () => "+=" + (horizontalContainer.scrollWidth - window.innerWidth),
            invalidateOnRefresh: true, // Recalculate on resize
          }
        });
      }

      // C. MARQUEE RIBBON (Infinite)
      gsap.to('.marquee-track', {
        xPercent: -50,
        ease: 'none',
        duration: 15,
        repeat: -1
      });

      // D. VIDEO EXPAND
      gsap.to('.video-card', {
        width: '100%',
        height: '100vh',
        borderRadius: 0,
        scrollTrigger: {
          trigger: '.video-section',
          start: 'top center',
          end: 'bottom bottom',
          scrub: true
        }
      });

      // E. FOOTER REVEAL SETUP
      // The footer is fixed at z-0. The content is z-10. 
      // We don't need GSAP for this, just CSS logic (margin-bottom).

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // --- LOADING SCREEN ---
  if (!isLoaded) return <div className="h-screen bg-black text-white flex items-center justify-center font-mono text-xs">LOADING PROTOCOLS...</div>;

  return (
    <div ref={containerRef} className="bg-black text-white selection:bg-[#ccff00] selection:text-black">
      
      {/* GLOBAL BACKGROUND NOISE */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999]" style={{backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`}}></div>

      {/* --- CONTENT WRAPPER (Z-INDEX 20 to cover footer) --- */}
      <main className="relative z-20 bg-black mb-[100vh] shadow-[0_50px_100px_rgba(0,0,0,1)]">
        
        {/* 1. HERO SECTION */}
        <section id="hero" className="h-screen w-full relative overflow-hidden flex flex-col justify-center items-center">
            <div className="hero-bg absolute inset-0 z-0 opacity-50">
                <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Hero" />
            </div>
            <div className="z-10 text-center mix-blend-difference">
                <div className="mb-4 flex justify-center">
                    <span className="border border-white/50 px-3 py-1 rounded-full text-xs font-mono backdrop-blur-sm">AGENCY V5.0</span>
                </div>
                <h1 className="text-[14vw] font-black leading-[0.8] tracking-tighter">
                    DIGITAL<br/><span className="text-transparent font-outline-2">ALCHEMY</span>
                </h1>
            </div>
            <div className="absolute bottom-12 left-12 z-10 hidden md:block">
                <p className="text-xs font-mono max-w-[200px]">
                    WE TRANSMUTE CODE INTO EXPERIENCES. SCROLL TO INITIATE.
                </p>
            </div>
        </section>

        {/* 2. STATEMENT SECTION */}
        <section className="py-32 px-6 md:px-24 bg-[#0a0a0a]">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                        We don't build websites.<br/>
                        <span className="text-[#ccff00]">We build worlds.</span>
                    </h2>
                </div>
                <div className="flex flex-col justify-between">
                    <p className="text-xl text-gray-400 leading-relaxed">
                        In an era of templates and AI-generated mediocrity, we choose chaos. We choose hand-crafted, high-performance, physics-defying interactions that leave a dent in the digital universe.
                    </p>
                    <div className="mt-8 flex gap-4">
                        <div className="h-[1px] w-24 bg-[#ccff00] self-center"></div>
                        <span className="font-mono text-xs uppercase tracking-widest text-[#ccff00]">Established 2025</span>
                    </div>
                </div>
            </div>
        </section>

        {/* 3. HORIZONTAL SCROLL (THE FIX) */}
        <section className="horizontal-scroll-section h-screen overflow-hidden bg-neutral-900 relative">
            {/* The Container that moves Left */}
            <div className="horizontal-container flex h-full w-max">
                
                {/* Panel 1: Velocity */}
                <div className="w-screen h-full flex items-center justify-center border-r border-white/10 bg-[#050505] relative p-12 shrink-0">
                    <div className="absolute top-12 left-12 text-6xl font-black text-white/10">01</div>
                    <div className="text-center">
                        <h2 className="text-[8vw] font-black uppercase leading-none">Velocity</h2>
                        <p className="font-mono text-[#ccff00] mt-4">FINTECH / WEBGL</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen pointer-events-none" />
                </div>

                {/* Panel 2: Aether */}
                <div className="w-screen h-full flex items-center justify-center border-r border-white/10 bg-[#0a0a0a] relative p-12 shrink-0">
                    <div className="absolute top-12 left-12 text-6xl font-black text-white/10">02</div>
                    <div className="text-center relative z-10">
                        <h2 className="text-[8vw] font-black uppercase leading-none text-transparent font-outline-2 hover:text-white transition-colors duration-500 cursor-pointer">Aether</h2>
                        <p className="font-mono text-purple-400 mt-4">E-COMMERCE / 3D</p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/20"></div>
                </div>

                {/* Panel 3: Cipher */}
                <div className="w-screen h-full flex items-center justify-center border-r border-white/10 bg-[#000] relative p-12 shrink-0">
                    <div className="absolute top-12 left-12 text-6xl font-black text-white/10">03</div>
                    <div className="flex gap-12 items-center">
                        <div className="w-[30vw] h-[40vh] bg-white/5 rounded-2xl overflow-hidden">
                             <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover" />
                        </div>
                        <div>
                             <h2 className="text-[6vw] font-black uppercase leading-none">Cipher</h2>
                             <p className="font-mono text-blue-400 mt-4">CYBERSECURITY</p>
                             <button className="mt-8 px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-all">View Case Study</button>
                        </div>
                    </div>
                </div>

                 {/* Panel 4: Call to Action */}
                 <div className="w-screen h-full flex flex-col items-center justify-center bg-[#ccff00] text-black shrink-0">
                    <h2 className="text-[5vw] font-black uppercase leading-none text-center">
                        READY TO<br/>BREAK THE GRID?
                    </h2>
                    <ArrowRight className="w-12 h-12 mt-8 animate-pulse" />
                </div>

            </div>
        </section>

        {/* 4. MARQUEE RIBBON */}
        <section className="py-20 bg-white text-black overflow-hidden border-y-8 border-black">
            <div className="marquee-track flex whitespace-nowrap gap-12">
                {Array(10).fill("DIGITAL • CREATIVE • MOTION • CODE • ").map((item, i) => (
                    <span key={i} className="text-8xl font-black tracking-tighter">{item}</span>
                ))}
            </div>
        </section>

        {/* 5. VIDEO EXPAND SECTION */}
        <section className="video-section min-h-[150vh] bg-black flex items-center justify-center relative py-24">
             <div className="video-card w-[400px] h-[300px] rounded-2xl overflow-hidden relative z-10 shadow-2xl">
                 <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                     <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-a-man-with-heads-like-statues-33502-large.mp4" type="video/mp4" />
                 </video>
                 <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-transparent transition-colors">
                    <span className="text-white font-mono text-sm border border-white px-4 py-2 rounded-full backdrop-blur-md">THE SHOWREEL</span>
                 </div>
             </div>
        </section>

        {/* 6. TEAM / CREDITS SECTION */}
        <section className="py-32 px-6 md:px-24 bg-[#111] border-t border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="mb-24">
                    <h2 className="text-6xl font-bold mb-6">The Architects</h2>
                    <p className="text-gray-400 max-w-2xl">A collective of rogue designers and developers obsessed with performance.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { name: "Alex V.", role: "Creative Director", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" },
                        { name: "Sarah J.", role: "Lead Developer", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop" },
                        { name: "Davide R.", role: "3D Artist", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop" }
                    ].map((member, i) => (
                        <div key={i} className="group relative h-[60vh] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                            <img src={member.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
                                <h3 className="text-3xl font-bold">{member.name}</h3>
                                <p className="text-[#ccff00] font-mono text-sm">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

      </main>

      {/* --- FIXED FOOTER (Revealed behind) --- */}
      <footer className="fixed bottom-0 left-0 w-full h-[100vh] bg-[#ccff00] text-black z-10 flex flex-col justify-between p-8 md:p-12">
            <div className="flex justify-between items-start">
                <div className="text-2xl font-black tracking-tight">MAGNUM OPUS</div>
                <div className="flex flex-col text-right gap-1 font-bold text-lg">
                    <a href="#" className="hover:underline">TWITTER / X</a>
                    <a href="#" className="hover:underline">INSTAGRAM</a>
                    <a href="#" className="hover:underline">LINKEDIN</a>
                </div>
            </div>

            <div className="flex flex-col items-center text-center">
                <p className="text-sm font-mono uppercase tracking-widest mb-4">Have an impossible project?</p>
                <div className="relative group cursor-pointer">
                    <h2 className="text-[15vw] font-black leading-[0.8] group-hover:text-white transition-colors duration-300">
                        LET'S TALK
                    </h2>
                    <ArrowUpRight className="absolute top-0 right-0 w-[10vw] h-[10vw] group-hover:rotate-45 transition-transform duration-500" />
                </div>
            </div>

            <div className="flex justify-between items-end">
                <div className="max-w-sm text-sm font-medium">
                    &copy; 2025 ALL RIGHTS RESERVED.<br/>
                    BUILT WITH NEXT.JS, GSAP & TAILWIND.
                </div>
                <div className="hidden md:block text-9xl font-black opacity-10">2025</div>
            </div>
      </footer>

      {/* Global Style for Outline Text */}
      <style jsx global>{`
        .font-outline-2 {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.5);
          color: transparent;
        }
        .font-outline-2:hover {
          -webkit-text-stroke: 2px #fff;
        }
      `}</style>

    </div>
  );
}