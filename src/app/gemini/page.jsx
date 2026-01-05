'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { ArrowRight, Box, Circle, Hexagon, Layers, Zap, Globe, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HighLevelAnimation() {
  const containerRef = useRef(null);
  const horizontalSectionRef = useRef(null);
  const cursorRef = useRef(null);

  // 1. Setup Smooth Scroll (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // 2. Custom Cursor Logic
  useEffect(() => {
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // 3. GSAP Animation Context
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // A. Hero Animation (Scale Down & Opacity)
      const tlHero = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      tlHero.to('.hero-text', { scale: 0.5, opacity: 0, y: -100 });

      // B. Reveal Text Section (Lines coming up)
      const texts = gsap.utils.toArray('.reveal-text');
      texts.forEach((text) => {
        gsap.from(text, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 85%',
          },
        });
      });

      // C. Horizontal Scroll Section (The "Gallery")
      const sections = gsap.utils.toArray('.panel');
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalSectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          // Clean up the end calculation safely
          end: () => '+=' + (horizontalSectionRef.current ? horizontalSectionRef.current.offsetWidth : 0),
        },
      });

      // D. Parallax Cards Section (Stacking Effect)
      const cards = gsap.utils.toArray('.card');
      cards.forEach((card, i) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top top',
            end: 'bottom top',
            pin: true,
            pinSpacing: false,
            scrub: true,
          },
          scale: 1 - i * 0.05,
          opacity: 1 - i * 0.1,
        });
      });

      // E. Big Image Zoom (Clip Path)
      gsap.to('.clip-image', {
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1,
        scrollTrigger: {
          trigger: '.clip-container',
          start: 'top center',
          end: 'bottom bottom',
          scrub: true,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-black text-white selection:bg-cyan-300 selection:text-black">
      
      {/* Custom Cursor */}
      <div ref={cursorRef} className="fixed w-8 h-8 border-2 border-white rounded-full pointer-events-none z-50 mix-blend-difference top-0 left-0 -translate-x-1/2 -translate-y-1/2 hidden md:block" />

      {/* --- SECTION 1: HERO (100vh) --- */}
      <section id="hero" className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="hero-text text-center z-10 mix-blend-overlay">
          <h1 className="text-[10vw] font-black leading-none tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
            Next Level
          </h1>
          <h2 className="text-[4vw] font-light tracking-[1rem] uppercase mt-4">
            Digital Experience
          </h2>
        </div>
        <div className="absolute bottom-10 animate-bounce">
          <ArrowRight className="rotate-90 w-8 h-8 text-white/50" />
        </div>
      </section>

      {/* --- SECTION 2: TEXT MANIFESTO (100vh) --- */}
      <section className="min-h-screen flex flex-col justify-center px-8 md:px-24 py-24 bg-neutral-950">
        <div className="max-w-6xl mx-auto space-y-12">
          <p className="reveal-text text-4xl md:text-6xl font-bold leading-tight text-neutral-400">
            We don't just build websites. <span className="text-white">We craft digital dimensions.</span> 
          </p>
          <p className="reveal-text text-4xl md:text-6xl font-bold leading-tight text-neutral-400">
            Using the power of <span className="text-cyan-400">GSAP</span> and <span className="text-white">Next.js</span>, we break the barrier between code and art.
          </p>
          <div className="reveal-text flex gap-4 pt-10">
            <button className="px-8 py-4 border border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm font-bold">
              Start The Engine
            </button>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: HORIZONTAL SCROLL (300vh scroll distance, 100vh visual) --- */}
      <section ref={horizontalSectionRef} className="h-screen w-[400%] flex flex-nowrap bg-white text-black overflow-hidden relative">
        
        {/* Panel 1 */}
        <div className="panel w-screen h-full flex flex-col justify-center items-center px-12 border-r border-gray-200">
          <Globe className="w-32 h-32 mb-8 text-blue-600" />
          <h3 className="text-[8vw] font-bold">GLOBAL</h3>
          <p className="text-xl max-w-md text-center">Reaching every corner of the digital infrastructure with minimal latency.</p>
        </div>
        
        {/* Panel 2 */}
        <div className="panel w-screen h-full flex flex-col justify-center items-center px-12 border-r border-gray-200 bg-gray-50">
          <Cpu className="w-32 h-32 mb-8 text-purple-600" />
          <h3 className="text-[8vw] font-bold">PERFORMANCE</h3>
          <p className="text-xl max-w-md text-center">Optimized for 60fps rendering on all devices using WebGL acceleration.</p>
        </div>

        {/* Panel 3 */}
        <div className="panel w-screen h-full flex flex-col justify-center items-center px-12 border-r border-gray-200">
          <Zap className="w-32 h-32 mb-8 text-yellow-500" />
          <h3 className="text-[8vw] font-bold">SPEED</h3>
          <p className="text-xl max-w-md text-center">Instant interactions powered by optimistic UI updates.</p>
        </div>

        {/* Panel 4 (Image) */}
        <div className="panel w-screen h-full relative">
            <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
                alt="Abstract" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <h3 className="text-[8vw] font-bold text-white">VISION</h3>
            </div>
        </div>
      </section>

      {/* --- SECTION 4: CLIP PATH IMAGE REVEAL (150vh) --- */}
      <section className="clip-container min-h-screen flex items-center justify-center bg-black py-24 relative">
        <div 
            className="clip-image w-[80vw] h-[80vh] bg-cover bg-center" 
            style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2894&auto=format&fit=crop')",
                clipPath: 'inset(20% 40% 20% 40%)', 
                scale: 0.8 
            }}
        >
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-center">
                 <h2 className="text-6xl font-bold text-white mb-4">Focus on Quality</h2>
                 <p className="text-xl text-gray-200">As you scroll, the perspective shifts.</p>
            </div>
        </div>
      </section>

      {/* --- SECTION 5: STACKING CARDS (300vh scroll distance) --- */}
      <section className="bg-neutral-900 pb-24">
        <div className="pt-24 pb-12 px-8">
            <h2 className="text-6xl font-bold mb-4">Our Core Pillars</h2>
            <p className="text-xl text-gray-400">Scroll to explore the stack.</p>
        </div>

        {/* Card 1 */}
        <div className="card h-screen sticky top-0 flex items-center justify-center bg-[#111] border-t border-white/10 shadow-2xl">
            <div className="flex flex-col items-center gap-8">
                <Box className="w-24 h-24 text-cyan-500" />
                <h2 className="text-8xl font-black text-white/10">01</h2>
                <h3 className="text-4xl font-bold">Structure</h3>
                <p className="max-w-lg text-center text-gray-400">
                    Solid foundations built with React Server Components.
                </p>
            </div>
        </div>

        {/* Card 2 */}
        <div className="card h-screen sticky top-0 flex items-center justify-center bg-[#161616] border-t border-white/10 shadow-2xl">
            <div className="flex flex-col items-center gap-8">
                <Layers className="w-24 h-24 text-pink-500" />
                <h2 className="text-8xl font-black text-white/10">02</h2>
                <h3 className="text-4xl font-bold">Layering</h3>
                <p className="max-w-lg text-center text-gray-400">
                    Complex z-index management for depth and immersion.
                </p>
            </div>
        </div>

        {/* Card 3 */}
        <div className="card h-screen sticky top-0 flex items-center justify-center bg-[#1a1a1a] border-t border-white/10 shadow-2xl">
            <div className="flex flex-col items-center gap-8">
                <Hexagon className="w-24 h-24 text-lime-500" />
                <h2 className="text-8xl font-black text-white/10">03</h2>
                <h3 className="text-4xl font-bold">Geometry</h3>
                <p className="max-w-lg text-center text-gray-400">
                    Calculated precision in every animation frame.
                </p>
            </div>
        </div>

        {/* Card 4 */}
        <div className="card h-screen sticky top-0 flex items-center justify-center bg-[#202020] border-t border-white/10 shadow-2xl">
            <div className="flex flex-col items-center gap-8">
                <Circle className="w-24 h-24 text-orange-500" />
                <h2 className="text-8xl font-black text-white/10">04</h2>
                <h3 className="text-4xl font-bold">Loop</h3>
                <p className="max-w-lg text-center text-gray-400">
                    Continuous integration and seamless deployment.
                </p>
            </div>
        </div>
      </section>

      {/* --- SECTION 6: FOOTER / END --- */}
      <section className="h-[80vh] flex flex-col items-center justify-center bg-black relative z-10">
        <h2 className="text-[12vw] font-black leading-none text-white mix-blend-difference hover:scale-110 transition-transform duration-500 cursor-pointer">
            LET'S TALK
        </h2>
        <div className="flex gap-8 mt-12">
            <a href="#" className="text-xl hover:text-cyan-400 hover:underline">Twitter</a>
            <a href="#" className="text-xl hover:text-cyan-400 hover:underline">Instagram</a>
            <a href="#" className="text-xl hover:text-cyan-400 hover:underline">LinkedIn</a>
        </div>
        <p className="absolute bottom-8 text-xs text-gray-600">
            © 2024 HIGH LEVEL ANIMATION. MADE WITH NEXT.JS & GSAP.
        </p>
      </section>

    </main>
  );
}