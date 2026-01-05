'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { 
  ArrowRight, Play, Maximize, Globe, Cpu, Zap, 
  Aperture, Activity, Anchor, Box, Disc, Command,
  ArrowUpRight, X, Menu, Fingerprint
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- ASSETS ---
const VIDEOS = {
  abstract: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-glitch-effect-29758-large.mp4",
  code: "https://assets.mixkit.co/videos/preview/mixkit-matrix-style-code-falling-down-screen-animation-2751-large.mp4",
  ink: "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-286-large.mp4",
  city: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4"
};

// --- HELPER: SPLIT TEXT ---
// Breaks text into spans for animation
const SplitText = ({ children, className }) => {
  return (
    <span className={className}>
      {children.split('').map((char, i) => (
        <span key={i} className="inline-block char-reveal">{char === ' ' ? '\u00A0' : char}</span>
      ))}
    </span>
  );
};

export default function ProjectOlympus() {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorLabelRef = useRef(null);

  // --- 1. BOOT SEQUENCE (PRELOADER) ---
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoaded(true);
        window.scrollTo(0, 0);
      }
    });

    tl.to('.boot-bar', { width: '100%', duration: 2, ease: 'power2.inOut' })
      .to('.boot-text', { opacity: 0, duration: 0.2 })
      .to('.boot-screen', { yPercent: -100, duration: 0.8, ease: 'expo.inOut' });

  }, []);

  // --- 2. CORE SETUP (Lenis + Cursor) ---
  useEffect(() => {
    if (!isLoaded) return;

    // Smooth Scroll
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Custom Cursor
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(cursorLabelRef.current, { x: e.clientX, y: e.clientY, duration: 0.2 });
    };
    
    // Hover Effects
    const addHover = (label) => {
      gsap.to(cursorRef.current, { scale: 3, mixBlendMode: 'difference' });
      cursorLabelRef.current.innerText = label;
      gsap.to(cursorLabelRef.current, { opacity: 1, scale: 1 });
    };
    const removeHover = () => {
      gsap.to(cursorRef.current, { scale: 1, mixBlendMode: 'normal' });
      gsap.to(cursorLabelRef.current, { opacity: 0, scale: 0 });
    };

    document.querySelectorAll('a, button, .interactive').forEach(el => {
      el.addEventListener('mouseenter', () => addHover(el.dataset.label || 'VIEW'));
      el.addEventListener('mouseleave', removeHover);
    });
    window.addEventListener('mousemove', moveCursor);

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [isLoaded]);

  // --- 3. MASTER ANIMATION TIMELINE ---
  useLayoutEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {

      // A. HERO 3D TILT
      const hero = document.querySelector('#hero');
      hero.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        gsap.to('.hero-content', { rotationY: x, rotationX: -y, duration: 1 });
      });

      // B. TEXT REVEAL (Staggered Characters)
      gsap.from('.char-reveal', {
        y: 100, opacity: 0, stagger: 0.02, duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: '.text-reveal-section', start: 'top 80%' }
      });

      // C. THE "PIN & ZOOM" WINDOW
      // This pins the section, then expands the inner clip-path to full screen
      const zoomTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.zoom-section',
          start: 'top top',
          end: '+=200%', // 2x height
          pin: true,
          scrub: true,
        }
      });
      zoomTl.to('.zoom-mask', { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1 })
            .to('.zoom-text', { opacity: 1, y: 0 }, '-=0.5');

      // D. HORIZONTAL VELOCITY SCROLL
      // Scrolls sideways, but adds skew based on speed
      const hSection = document.querySelector('.horizontal-wrapper');
      const hContent = document.querySelector('.horizontal-content');
      
      let proxy = { skew: 0 },
          skewSetter = gsap.quickSetter(".h-item", "skewX", "deg"), // fast
          clamp = gsap.utils.clamp(-20, 20); // don't skew too much

      ScrollTrigger.create({
        trigger: hSection,
        start: "top top",
        end: () => "+=" + (hContent.scrollWidth - window.innerWidth),
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          let skew = clamp(self.getVelocity() / -300);
          // Move container
          gsap.set(hContent, { x: -(hContent.scrollWidth - window.innerWidth) * self.progress });
          // Skew items
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
          }
        }
      });

      // E. CARD STACK PARALLAX
      // Cards slide over each other
      const cards = gsap.utils.toArray('.stack-card');
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          pin: true,
          pinSpacing: false,
          snap: 1,
        });
        // Scale effect for previous cards
        gsap.to(card, {
          scale: 0.9, opacity: 0.5,
          scrollTrigger: {
            trigger: cards[i+1], // Next card triggers this one to shrink
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // F. TEXT MASK VIDEO
      // Text grows until video is visible
      gsap.to('.text-mask-container h1', {
        backgroundPosition: "0% 100%",
        ease: "none",
        scrollTrigger: {
            trigger: ".text-mask-container",
            start: "top center",
            end: "bottom top",
            scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);


  // --- RENDER ---
  return (
    <div ref={containerRef} className="bg-[#030303] text-white overflow-hidden relative selection:bg-[#ccff00] selection:text-black">
      
      {/* 0. GLOBAL LAYERS */}
      <div className="noise" />
      
      {/* CUSTOM CURSOR */}
      <div ref={cursorRef} className="fixed w-4 h-4 bg-[#ccff00] rounded-full pointer-events-none z-[9999] top-0 left-0 -translate-x-1/2 -translate-y-1/2 mix-blend-difference" />
      <div ref={cursorLabelRef} className="fixed pointer-events-none z-[9999] top-0 left-0 text-black font-black text-[10px] uppercase opacity-0 -translate-x-1/2 -translate-y-1/2">View</div>

      {/* BOOT SCREEN */}
      <div className="boot-screen fixed inset-0 z-[10000] bg-[#050505] flex flex-col justify-center items-center">
        <div className="font-mono text-[#ccff00] text-sm mb-4 boot-text">INITIALIZING OLYMPUS KERNEL...</div>
        <div className="w-64 h-1 bg-[#111] overflow-hidden">
          <div className="boot-bar w-0 h-full bg-[#ccff00]" />
        </div>
      </div>

      {/* FIXED NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference">
         <div className="font-black text-xl tracking-tighter">OLYMPUS</div>
         <div className="flex gap-4">
             <div className="hidden md:flex gap-8 text-xs font-mono">
                 <button className="hover:text-[#ccff00]">INDEX</button>
                 <button className="hover:text-[#ccff00]">PROJECTS</button>
                 <button className="hover:text-[#ccff00]">SIMULATION</button>
             </div>
             <Menu className="w-6 h-6 md:hidden" />
         </div>
      </nav>

      {/* --- CONTENT START --- */}
      <main className="relative z-10 bg-[#030303] mb-[100vh]"> {/* MB for Footer Reveal */}

        {/* SECTION 1: 3D HERO */}
        <section id="hero" className="h-screen flex items-center justify-center perspective-[1000px] overflow-hidden relative">
            <div className="hero-content text-center z-20 will-change-transform">
                <div className="inline-block border border-[#ccff00]/30 px-3 py-1 rounded-full text-[#ccff00] text-xs font-mono mb-8 backdrop-blur-md">
                    SYSTEM V.9.0
                </div>
                <h1 className="text-[14vw] font-black leading-[0.8] tracking-tighter mix-blend-overlay">
                    DIGITAL
                </h1>
                <h1 className="text-[14vw] font-black leading-[0.8] tracking-tighter text-transparent text-stroke hover:text-[#ccff00] transition-colors duration-500 cursor-none interactive" data-label="ENTER">
                    REALITY
                </h1>
            </div>
            {/* Background Video */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover grayscale">
                    <source src={VIDEOS.ink} type="video/mp4" />
                </video>
            </div>
        </section>

        {/* SECTION 2: MANIFESTO (Text Reveal) */}
        <section className="text-reveal-section min-h-screen flex items-center justify-center px-6 py-24 bg-[#0a0a0a]">
             <div className="max-w-6xl text-left">
                 <h2 className="text-4xl md:text-7xl font-bold leading-[1.1] text-gray-400">
                    <SplitText className="block text-white">We do not adhere to </SplitText>
                    <SplitText className="block">standard physics.</SplitText>
                    <br/>
                    <SplitText className="block text-[#ccff00]">We engineer chaos</SplitText>
                    <SplitText className="block">into structured beauty.</SplitText>
                 </h2>
                 <div className="mt-12 flex gap-8">
                     <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center animate-spin-slow">
                        <Activity className="w-4 h-4 text-[#ccff00]" />
                     </div>
                     <p className="max-w-md text-gray-500 font-mono text-sm">
                        SCROLL TO INITIALIZE SEQUENCE. DATA STREAM ACTIVE.
                     </p>
                 </div>
             </div>
        </section>

        {/* SECTION 3: PIN & ZOOM (The Window) */}
        <section className="zoom-section h-screen w-full relative flex items-center justify-center bg-white text-black overflow-hidden">
             <div className="zoom-mask absolute inset-0 w-[60vw] h-[60vh] m-auto overflow-hidden clip-window scale-75 bg-black">
                 <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80">
                     <source src={VIDEOS.city} type="video/mp4" />
                 </video>
                 <div className="absolute inset-0 flex items-center justify-center">
                     <h2 className="text-white text-[10vw] font-black mix-blend-overlay">VISION</h2>
                 </div>
             </div>
             <div className="zoom-text absolute bottom-12 left-12 opacity-0 translate-y-10">
                 <h3 className="text-4xl font-bold">Total Immersion</h3>
                 <p className="font-mono">Breaking the fourth wall.</p>
             </div>
        </section>

        {/* SECTION 4: VELOCITY HORIZONTAL SCROLL */}
        <section className="horizontal-wrapper h-screen bg-[#111] overflow-hidden relative">
            <div className="absolute top-12 left-12 z-20">
                <h3 className="text-[#ccff00] font-mono text-xl">SELECTED WORKS</h3>
            </div>
            
            <div className="horizontal-content flex h-full w-max items-center px-24 gap-24">
                
                {/* Project 1 */}
                <div className="h-item w-[60vw] h-[70vh] relative group interactive" data-label="OPEN">
                    <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1600" className="w-full h-full object-cover brightness-50 group-hover:brightness-100 transition-all duration-500" />
                    <div className="absolute -bottom-16 left-0">
                        <h2 className="text-8xl font-black text-transparent text-stroke group-hover:text-white transition-colors">01</h2>
                        <p className="font-mono text-sm">CYBERNETICS // WEBGL</p>
                    </div>
                </div>

                {/* Project 2 */}
                <div className="h-item w-[60vw] h-[70vh] relative group interactive" data-label="OPEN">
                    <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600" className="w-full h-full object-cover brightness-50 group-hover:brightness-100 transition-all duration-500" />
                    <div className="absolute -bottom-16 left-0">
                        <h2 className="text-8xl font-black text-transparent text-stroke group-hover:text-white transition-colors">02</h2>
                        <p className="font-mono text-sm">NEURAL LINK // AI</p>
                    </div>
                </div>

                {/* Project 3 */}
                <div className="h-item w-[60vw] h-[70vh] relative group interactive" data-label="OPEN">
                    <img src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=1600" className="w-full h-full object-cover brightness-50 group-hover:brightness-100 transition-all duration-500" />
                    <div className="absolute -bottom-16 left-0">
                        <h2 className="text-8xl font-black text-transparent text-stroke group-hover:text-white transition-colors">03</h2>
                        <p className="font-mono text-sm">QUANTUM // DATA</p>
                    </div>
                </div>

                 {/* Project 4 (Video) */}
                 <div className="h-item w-[60vw] h-[70vh] relative group bg-[#ccff00] flex items-center justify-center interactive" data-label="PLAY">
                    <div className="text-center text-black">
                        <Play className="w-24 h-24 mx-auto mb-8" />
                        <h2 className="text-6xl font-black">SHOWREEL</h2>
                    </div>
                </div>

            </div>
        </section>

        {/* SECTION 5: CARD STACKING PARALLAX */}
        <section className="bg-black py-24">
            <div className="px-12 mb-24 text-center">
                <h2 className="text-4xl font-bold mb-4">The Algorithm</h2>
                <p className="text-gray-500">How we process reality.</p>
            </div>

            {/* CARD 1 */}
            <div className="stack-card h-screen sticky top-0 bg-[#0a0a0a] border-t border-white/10 flex items-center justify-center">
                 <div className="flex gap-12 items-center max-w-6xl w-full px-6">
                     <div className="w-1/2">
                         <h2 className="text-9xl font-black text-[#ccff00] mb-8">I.</h2>
                         <h3 className="text-5xl font-bold mb-4">Analysis</h3>
                         <p className="text-xl text-gray-400">Deep dive into data structures and user behavior patterns.</p>
                     </div>
                     <div className="w-1/2 h-[50vh] bg-white/5 rounded-2xl overflow-hidden relative">
                        <video autoPlay muted loop className="w-full h-full object-cover opacity-50"><source src={VIDEOS.code} /></video>
                     </div>
                 </div>
            </div>

            {/* CARD 2 */}
            <div className="stack-card h-screen sticky top-0 bg-[#111] border-t border-white/10 flex items-center justify-center">
                 <div className="flex gap-12 items-center max-w-6xl w-full px-6 flex-row-reverse">
                     <div className="w-1/2">
                         <h2 className="text-9xl font-black text-blue-500 mb-8">II.</h2>
                         <h3 className="text-5xl font-bold mb-4">Design</h3>
                         <p className="text-xl text-gray-400">Constructing the visual interface using atomic design principles.</p>
                     </div>
                     <div className="w-1/2 h-[50vh] bg-white/5 rounded-2xl overflow-hidden relative">
                         <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 p-4">
                             {Array(36).fill(0).map((_,i) => <div key={i} className="bg-blue-500/20 rounded-sm"></div>)}
                         </div>
                     </div>
                 </div>
            </div>

            {/* CARD 3 */}
            <div className="stack-card h-screen sticky top-0 bg-[#161616] border-t border-white/10 flex items-center justify-center">
                 <div className="flex gap-12 items-center max-w-6xl w-full px-6">
                     <div className="w-1/2">
                         <h2 className="text-9xl font-black text-purple-500 mb-8">III.</h2>
                         <h3 className="text-5xl font-bold mb-4">Deploy</h3>
                         <p className="text-xl text-gray-400">Global edge network distribution with sub-millisecond latency.</p>
                     </div>
                     <div className="w-1/2 h-[50vh] flex items-center justify-center">
                         <Globe className="w-64 h-64 text-purple-500 animate-pulse" />
                     </div>
                 </div>
            </div>
        </section>

        {/* SECTION 6: INTERACTIVE GRID (Hover over cells) */}
        <section className="py-32 px-4 relative overflow-hidden">
             <div className="max-w-7xl mx-auto mb-12 flex justify-between items-end">
                 <h2 className="text-6xl font-black">SYSTEM<br/>NODES</h2>
                 <p className="font-mono text-[#ccff00] animate-pulse">STATUS: ONLINE</p>
             </div>
             
             <div className="grid grid-cols-10 md:grid-cols-12 gap-1 h-[60vh]">
                 {Array(120).fill(0).map((_, i) => (
                     <div key={i} className="bg-[#111] border border-white/5 hover:bg-[#ccff00] hover:scale-110 transition-all duration-0 ease-linear cursor-crosshair"></div>
                 ))}
             </div>
        </section>

        {/* SECTION 7: TEXT MASK VIDEO */}
        <section className="text-mask-container min-h-screen flex items-center justify-center bg-white overflow-hidden relative">
             <div className="absolute inset-0 z-0">
                 <video autoPlay muted loop className="w-full h-full object-cover">
                     <source src={VIDEOS.abstract} />
                 </video>
             </div>
             <div className="relative z-10 bg-white mix-blend-screen w-full h-full flex items-center justify-center">
                 <h1 className="text-[20vw] font-black text-black leading-none tracking-tighter text-center">
                     FUTURE<br/>PROOF
                 </h1>
             </div>
        </section>

      </main> 
      {/* END CONTENT WRAPPER */}

      {/* --- FOOTER (THE CURTAIN REVEAL) --- */}
      <footer className="fixed bottom-0 left-0 w-full h-[100vh] z-0 bg-[#ccff00] text-black flex flex-col justify-between p-8 md:p-16">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full border-b border-black/10 pb-12">
              <div>
                  <h4 className="font-bold mb-4">SITEMAP</h4>
                  <ul className="space-y-2 font-mono text-sm">
                      <li><a href="#" className="hover:underline">HOME</a></li>
                      <li><a href="#" className="hover:underline">WORK</a></li>
                      <li><a href="#" className="hover:underline">ABOUT</a></li>
                      <li><a href="#" className="hover:underline">CONTACT</a></li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-bold mb-4">SOCIALS</h4>
                  <ul className="space-y-2 font-mono text-sm">
                      <li><a href="#" className="hover:underline">INSTAGRAM</a></li>
                      <li><a href="#" className="hover:underline">TWITTER</a></li>
                      <li><a href="#" className="hover:underline">LINKEDIN</a></li>
                      <li><a href="#" className="hover:underline">GITHUB</a></li>
                  </ul>
              </div>
              <div className="md:text-right">
                   <h4 className="font-bold mb-4">OFFICE</h4>
                   <p className="font-mono text-sm">
                       2045 CYBER BLVD<br/>
                       NEO TOKYO, JP<br/>
                       EST. 2025
                   </p>
              </div>
          </div>

          <div className="flex flex-col items-center justify-center flex-grow">
               <p className="font-mono uppercase tracking-widest mb-4">Start a project</p>
               <h2 className="text-[15vw] font-black leading-[0.8] hover:text-white transition-colors duration-300 cursor-pointer interactive" data-label="MAIL">
                   HELLO@
               </h2>
          </div>

          <div className="flex justify-between items-end">
              <div className="text-xs font-mono">
                  OLYMPUS AGENCY &copy; 2025
              </div>
              <ArrowUpRight className="w-12 h-12" />
          </div>

      </footer>

    </div>
  );
}