'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { 
  ArrowDown, Box, Circle, Hexagon, Layers, Zap, Globe, 
  Cpu, Code, Aperture, Anchor, Fingerprint, Ghost 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function MagnumOpus() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- 1. PRELOADER & LENIS SETUP ---
  useEffect(() => {
    // Smooth Scroll Setup
    const lenis = new Lenis({
      duration: 1.5, // Slower, heavier feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Fake Preloader Logic
    const timer = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0); // Reset scroll on load
    }, 2500); // 2.5s load time

    return () => {
      lenis.destroy();
      clearTimeout(timer);
    };
  }, []);

  // --- 2. CUSTOM MOUSE CURSOR ---
  useEffect(() => {
    const moveCursor = (e) => {
      // Main circle
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: 'power3.out',
      });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // --- 3. MASTER ANIMATION TIMELINE ---
  useLayoutEffect(() => {
    if (isLoading) return; // Wait for loader to finish

    const ctx = gsap.context(() => {
      
      // A. HERO TEXT 3D TILT (Mouse Interaction)
      const heroSection = document.querySelector('#hero');
      heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20; // -10 to 10
        const yPos = (clientY / window.innerHeight - 0.5) * 20;
        gsap.to('.hero-title', {
          rotationY: xPos,
          rotationX: -yPos,
          ease: 'power2.out',
          duration: 1
        });
      });

      // B. BACKGROUND COLOR SHIFTING
      // Change body color based on scroll sections
      const colors = ["#000000", "#0a0a2a", "#1a0520", "#000000"];
      const colorSections = gsap.utils.toArray('.color-shift-trigger');
      
      colorSections.forEach((section, i) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 50%',
            end: 'bottom 50%',
            onEnter: () => gsap.to('body', { backgroundColor: colors[i % colors.length], duration: 1.5 }),
            onEnterBack: () => gsap.to('body', { backgroundColor: colors[(i - 1 + colors.length) % colors.length], duration: 1.5 }),
        });
      });

      // C. TEXT REVEAL (Sliding up from clip-path)
      const splitTexts = gsap.utils.toArray('.split-reveal');
      splitTexts.forEach((text) => {
        gsap.fromTo(text, 
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: text,
              start: 'top 80%',
            }
          }
        );
      });

      // D. HORIZONTAL SCROLL (The "Process" Timeline)
      const horizontalSection = document.querySelector('.horizontal-scroll');
      const panels = gsap.utils.toArray('.h-panel');
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalSection,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + horizontalSection.offsetWidth * 2, // Scroll distance
        }
      });

      // E. PARALLAX GRID IMAGES
      gsap.utils.toArray('.parallax-img').forEach((img, i) => {
        gsap.to(img, {
          y: -150, // Move up as we scroll down
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

      // F. MARQUEE TEXT (Infinite Scroll)
      gsap.to('.marquee-inner', {
        xPercent: -50,
        ease: 'none',
        duration: 20,
        repeat: -1
      });

      // G. PINNED MANIFESTO (Text stays, image fades)
      ScrollTrigger.create({
        trigger: '.pinned-manifesto',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.pinned-left',
      });

      // H. SCALING VORTEX (Circle expanding)
      gsap.to('.vortex-circle', {
        scale: 50,
        opacity: 0,
        scrollTrigger: {
            trigger: '.vortex-container',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            pin: true,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  // --- RENDER ---
  return (
    <div ref={containerRef} className="relative overflow-hidden">
      
      {/* 0. NOISE OVERLAY */}
      <div className="noise-overlay" />
      
      {/* 0. CUSTOM CURSOR */}
      <div ref={cursorRef} className="fixed w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference top-0 left-0 -translate-x-1/2 -translate-y-1/2 hidden md:block" />

      {/* 0. PRELOADER */}
      {isLoading && (
        <div className="fixed inset-0 z-[10000] bg-black flex items-center justify-center text-white">
          <div className="text-center animate-pulse">
            <h1 className="text-6xl font-black mb-4">LOADING_ASSETS</h1>
            <p className="font-mono text-sm">INITIALIZING RENDER ENGINE...</p>
          </div>
        </div>
      )}

      {/* ---------------- SECTION 1: HERO (Interactive 3D) ---------------- */}
      <section id="hero" className="color-shift-trigger h-screen flex flex-col items-center justify-center relative perspective-1000">
        <div className="hero-title text-center z-10 will-change-transform">
          <h1 className="text-[10vw] font-black leading-none tracking-tighter text-white mix-blend-difference">
            ARCHITECT
          </h1>
          <h1 className="text-[10vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">
            OF THE VOID
          </h1>
        </div>
        <div className="absolute bottom-12 text-center">
            <p className="text-xs font-mono mb-2">SCROLL TO INITIALIZE</p>
            <ArrowDown className="mx-auto w-6 h-6 animate-bounce" />
        </div>
      </section>

      {/* ---------------- SECTION 2: MARQUEE ---------------- */}
      <section className="py-20 border-y border-white/10 bg-neutral-900/50 overflow-hidden">
        <div className="marquee-inner flex whitespace-nowrap gap-12 text-8xl font-black text-white/10">
            <span>DESIGN</span><span>•</span>
            <span>DEVELOPMENT</span><span>•</span>
            <span>MOTION</span><span>•</span>
            <span>INTERACTION</span><span>•</span>
            <span>DESIGN</span><span>•</span>
            <span>DEVELOPMENT</span><span>•</span>
            <span>MOTION</span><span>•</span>
            <span>INTERACTION</span><span>•</span>
        </div>
      </section>

      {/* ---------------- SECTION 3: MANIFESTO (Text Split) ---------------- */}
      <section className="color-shift-trigger min-h-screen flex items-center justify-center px-6 md:px-24 py-32">
        <div className="max-w-5xl text-left">
          <div className="overflow-hidden mb-4">
            <h2 className="split-reveal text-5xl md:text-7xl font-bold leading-[1.1]">
              We do not build pages.
            </h2>
          </div>
          <div className="overflow-hidden mb-4">
            <h2 className="split-reveal text-5xl md:text-7xl font-bold leading-[1.1] text-neutral-500">
              We build <span className="text-cyan-400 italic font-serif">ecosystems</span> of
            </h2>
          </div>
          <div className="overflow-hidden mb-4">
            <h2 className="split-reveal text-5xl md:text-7xl font-bold leading-[1.1]">
              digital interaction.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 split-reveal">
            <p className="text-lg text-gray-400 leading-relaxed">
              Traditional web design is static. It treats the user as an observer. We treat the user as a participant. Every scroll, every hover, every click is a dialogue between human and machine.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Utilizing the raw power of WebGL and GSAP, we strip away the bloat and leave only the essence of motion.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 4: HORIZONTAL SCROLL (Process) ---------------- */}
      <section className="horizontal-scroll h-screen w-full bg-white text-black overflow-hidden relative">
        <div className="absolute top-12 left-12 z-20">
            <h3 className="text-4xl font-black uppercase">The Algorithm</h3>
        </div>
        <div className="flex h-full w-[400%]"> {/* 400% width for 4 panels */}
            
            {/* Panel 1 */}
            <div className="h-panel w-screen h-full flex items-center justify-center bg-white border-r border-neutral-200 p-12 relative">
                <div className="max-w-xl">
                    <Fingerprint className="w-24 h-24 mb-8 text-neutral-400" />
                    <h2 className="text-8xl font-black mb-6">01</h2>
                    <h3 className="text-4xl font-bold mb-4">Identify</h3>
                    <p className="text-xl">We analyze the core DNA of the brand. What makes it tick? What is the frequency?</p>
                </div>
            </div>

            {/* Panel 2 */}
            <div className="h-panel w-screen h-full flex items-center justify-center bg-[#f0f0f0] border-r border-neutral-200 p-12">
                <div className="max-w-xl">
                    <Aperture className="w-24 h-24 mb-8 text-orange-500" />
                    <h2 className="text-8xl font-black mb-6">02</h2>
                    <h3 className="text-4xl font-bold mb-4">Focus</h3>
                    <p className="text-xl">We strip away the noise. Minimalist UI does not mean empty; it means intentional.</p>
                </div>
            </div>

            {/* Panel 3 */}
            <div className="h-panel w-screen h-full flex items-center justify-center bg-[#e5e5e5] border-r border-neutral-200 p-12">
                <div className="max-w-xl">
                    <Code className="w-24 h-24 mb-8 text-blue-600" />
                    <h2 className="text-8xl font-black mb-6">03</h2>
                    <h3 className="text-4xl font-bold mb-4">Execute</h3>
                    <p className="text-xl">Clean, semantic code. React Server Components for speed. GSAP for soul.</p>
                </div>
            </div>

            {/* Panel 4 */}
            <div className="h-panel w-screen h-full flex items-center justify-center bg-black text-white p-12">
                <div className="max-w-xl text-center">
                    <Ghost className="w-32 h-32 mx-auto mb-8 animate-pulse" />
                    <h2 className="text-6xl font-bold">THE RESULT IS ALIVE.</h2>
                </div>
            </div>

        </div>
      </section>

      {/* ---------------- SECTION 5: PARALLAX GRID ---------------- */}
      <section className="color-shift-trigger py-32 px-4 md:px-12">
        <div className="text-center mb-24">
            <h2 className="text-sm font-mono tracking-widest uppercase mb-4 text-cyan-500">Case Studies</h2>
            <h3 className="text-6xl font-bold">Selected Works</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Item 1 - Moves Faster */}
            <div className="space-y-4 mt-12 md:mt-0">
                <div className="parallax-img h-[60vh] w-full bg-neutral-800 overflow-hidden relative group">
                     <img src="https://images.unsplash.com/photo-1481487484168-9b930d5b7960?q=80&w=2670&auto=format&fit=crop" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" alt="Work" />
                </div>
                <div className="flex justify-between items-end border-b border-white/20 pb-4">
                    <h4 className="text-3xl font-bold">Project Aether</h4>
                    <span className="text-xs font-mono">2024</span>
                </div>
            </div>

            {/* Item 2 - Moves Slower (Offset) */}
            <div className="space-y-4 md:translate-y-24">
                <div className="parallax-img h-[60vh] w-full bg-neutral-800 overflow-hidden relative group">
                    <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop" 
                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" alt="Work" />
                </div>
                <div className="flex justify-between items-end border-b border-white/20 pb-4">
                    <h4 className="text-3xl font-bold">Cyber Deck</h4>
                    <span className="text-xs font-mono">2023</span>
                </div>
            </div>

             {/* Item 3 */}
             <div className="space-y-4 mt-12 md:mt-24">
                <div className="parallax-img h-[60vh] w-full bg-neutral-800 overflow-hidden relative group">
                     <img src="https://images.unsplash.com/photo-1614728853913-1e22ba815d7b?q=80&w=2670&auto=format&fit=crop" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" alt="Work" />
                </div>
                <div className="flex justify-between items-end border-b border-white/20 pb-4">
                    <h4 className="text-3xl font-bold">Neon Protocol</h4>
                    <span className="text-xs font-mono">2025</span>
                </div>
            </div>
        </div>
      </section>

      {/* ---------------- SECTION 6: THE VORTEX (Scale Effect) ---------------- */}
      <section className="vortex-container h-screen flex items-center justify-center overflow-hidden relative bg-black">
         <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none mix-blend-difference text-white">
            <h2 className="text-4xl md:text-8xl font-black text-center">
                ENTER THE<br/>NEXT PHASE
            </h2>
         </div>
         {/* The circle that grows */}
         <div className="vortex-circle w-64 h-64 rounded-full bg-white z-10"></div>
      </section>

      {/* ---------------- SECTION 7: PINNED MANIFESTO ---------------- */}
      <section className="pinned-manifesto h-[200vh] flex bg-neutral-900 text-white relative">
        <div className="pinned-left w-1/2 h-screen flex flex-col justify-center px-12 border-r border-white/10 bg-black z-10">
            <Anchor className="w-16 h-16 mb-8 text-purple-500" />
            <h2 className="text-6xl font-bold mb-8">Staying Grounded.</h2>
            <p className="text-xl text-gray-400">While the web moves fast, our principles remain rooted in user-centric design.</p>
        </div>
        <div className="w-1/2 ml-auto">
            <div className="h-screen flex items-center justify-center border-b border-white/10">
                <p className="text-3xl font-serif italic text-gray-500">"Simplicity is the ultimate sophistication."</p>
            </div>
            <div className="h-screen flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2670&auto=format&fit=crop" className="w-2/3 h-2/3 object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Landscape" />
            </div>
        </div>
      </section>

      {/* ---------------- SECTION 8: FOOTER ---------------- */}
      <section className="color-shift-trigger h-screen flex flex-col items-center justify-center relative z-10 bg-black">
        <div className="overflow-hidden">
            <h2 className="split-reveal text-[15vw] font-black leading-none text-white mix-blend-difference hover:text-cyan-400 transition-colors duration-300 cursor-pointer">
                CONTACT
            </h2>
        </div>
        <div className="flex flex-col md:flex-row gap-12 mt-12 text-center md:text-left">
            <div>
                <h4 className="text-gray-500 mb-4 text-sm uppercase tracking-widest">Socials</h4>
                <ul className="space-y-2 text-xl">
                    <li><a href="#" className="hover:text-cyan-400 hover:ml-2 transition-all">Instagram</a></li>
                    <li><a href="#" className="hover:text-cyan-400 hover:ml-2 transition-all">Twitter / X</a></li>
                    <li><a href="#" className="hover:text-cyan-400 hover:ml-2 transition-all">LinkedIn</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-gray-500 mb-4 text-sm uppercase tracking-widest">Inquiries</h4>
                <ul className="space-y-2 text-xl">
                    <li><a href="#" className="hover:text-cyan-400 hover:ml-2 transition-all">hello@magnumopus.dev</a></li>
                    <li><a href="#" className="hover:text-cyan-400 hover:ml-2 transition-all">+1 (555) 019-2834</a></li>
                </ul>
            </div>
        </div>
        <p className="absolute bottom-8 text-xs text-gray-700 font-mono">
            MAGNUM OPUS © 2025 . ALL RIGHTS RESERVED
        </p>
      </section>

    </div>
  );
}