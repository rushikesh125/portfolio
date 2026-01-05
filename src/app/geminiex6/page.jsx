'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { 
  ArrowRight, Play, Maximize, Globe, Cpu, Zap, 
  Aperture, Activity, Anchor, Box, Disc, Command,
  ArrowUpRight, X, Menu, Fingerprint, Ghost, Hexagon, Circle, Layers
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollTrigger);

// --- ASSETS LIBRARY ---
const ASSETS = {
  video_ink: "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-286-large.mp4",
  video_code: "https://assets.mixkit.co/videos/preview/mixkit-matrix-style-code-falling-down-screen-animation-2751-large.mp4",
  video_city: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4",
  video_glitch: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-glitch-effect-29758-large.mp4",
  video_abstract: "https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-a-man-with-heads-like-statues-33502-large.mp4",
  img_1: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000",
  img_2: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000",
  img_3: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000",
  img_4: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=2000",
  img_5: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000",
  img_6: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000"
};

// --- HELPER COMPONENTS ---

// 1. Split Text for Reveals
const SplitText = ({ children, className }) => (
  <span className={className}>
    {children.split('').map((char, i) => (
      <span key={i} className="inline-block char-reveal">{char === ' ' ? '\u00A0' : char}</span>
    ))}
  </span>
);

// 2. Scramble Text Effect
const ScrambleText = ({ text, className }) => {
  const [display, setDisplay] = useState(text);
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
  const handleOver = () => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(text.split('').map((l, i) => {
        if (i < iterations) return text[i];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1/3;
    }, 30);
  };
  return <span onMouseEnter={handleOver} className={twMerge("cursor-pointer", className)}>{display}</span>;
};

export default function SingularityBuild() {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorLabelRef = useRef(null);

  // --- 1. SYSTEM BOOT SEQUENCE (PRELOADER) ---
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoaded(true);
        window.scrollTo(0, 0);
      }
    });

    tl.to('.boot-bar', { width: '100%', duration: 2.5, ease: 'power2.inOut' })
      .to('.boot-text', { opacity: 0, duration: 0.3 })
      .to('.boot-screen', { yPercent: -100, duration: 1, ease: 'expo.inOut' });

  }, []);

  // --- 2. CORE ENGINE (Lenis + Cursor + Global Listeners) ---
  useEffect(() => {
    if (!isLoaded) return;

    // A. Smooth Scroll
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      orientation: 'vertical', 
      gestureOrientation: 'vertical',
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // B. Custom Cursor Logic
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(cursorLabelRef.current, { x: e.clientX, y: e.clientY, duration: 0.15 });
    };
    
    // C. Interactive Elements Hover
    const addHover = (label) => {
      gsap.to(cursorRef.current, { scale: 3, mixBlendMode: 'difference' });
      cursorLabelRef.current.innerText = label || '';
      if(label) gsap.to(cursorLabelRef.current, { opacity: 1, scale: 1 });
    };
    const removeHover = () => {
      gsap.to(cursorRef.current, { scale: 1, mixBlendMode: 'normal' });
      gsap.to(cursorLabelRef.current, { opacity: 0, scale: 0 });
    };

    document.querySelectorAll('.interactive').forEach(el => {
      el.addEventListener('mouseenter', () => addHover(el.dataset.label));
      el.addEventListener('mouseleave', removeHover);
    });
    window.addEventListener('mousemove', moveCursor);

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [isLoaded]);


  // --- 3. MASTER GSAP TIMELINE ---
  useLayoutEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {

      // --- SYSTEM 1: HERO 3D TILT ---
      const hero = document.querySelector('#hero');
      hero.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        gsap.to('.hero-3d', { rotationY: x, rotationX: -y, duration: 1.5, ease: 'power2.out' });
      });

      // --- SYSTEM 2: MANIFESTO REVEAL ---
      gsap.from('.char-reveal', {
        y: 100, opacity: 0, stagger: 0.015, duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: '.manifesto-section', start: 'top 80%' }
      });

      // --- SYSTEM 3: PIN & ZOOM WINDOW ---
      const zoomTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.zoom-section',
          start: 'top top',
          end: '+=250%', 
          pin: true,
          scrub: true,
        }
      });
      zoomTl.to('.zoom-mask', { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1 })
            .to('.zoom-content', { opacity: 1, y: 0 }, '-=0.5');

      // --- SYSTEM 4: VELOCITY SKEW HORIZONTAL SCROLL ---
      const hSection = document.querySelector('.horizontal-wrapper');
      const hContent = document.querySelector('.horizontal-content');
      
      let proxy = { skew: 0 },
          skewSetter = gsap.quickSetter(".h-item", "skewX", "deg"),
          clamp = gsap.utils.clamp(-15, 15);

      if (hSection && hContent) {
        ScrollTrigger.create({
          trigger: hSection,
          start: "top top",
          end: () => "+=" + (hContent.scrollWidth - window.innerWidth),
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            let skew = clamp(self.getVelocity() / -300);
            gsap.set(hContent, { x: -(hContent.scrollWidth - window.innerWidth) * self.progress });
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
              proxy.skew = skew;
              gsap.to(proxy, {skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
            }
          }
        });
      }

      // --- SYSTEM 5: COLOR SHIFT BACKGROUND ---
      const colors = ["#030303", "#0a0a2a", "#1a0520", "#000000"];
      gsap.utils.toArray('.color-trigger').forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => gsap.to('body', { backgroundColor: colors[i % colors.length], duration: 1 }),
          onEnterBack: () => gsap.to('body', { backgroundColor: colors[(i - 1 + colors.length) % colors.length], duration: 1 }),
        });
      });

      // --- SYSTEM 6: CARD STACK PARALLAX ---
      const cards = gsap.utils.toArray('.stack-card');
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card, start: "top top", pin: true, pinSpacing: false,
        });
        gsap.to(card, {
          scale: 0.9, opacity: 0.4,
          scrollTrigger: {
            trigger: cards[i+1], start: "top top", end: "bottom top", scrub: true
          }
        });
      });

      // --- SYSTEM 7: CLIP PATH IMAGE REVEAL (VORTEX) ---
      gsap.to('.vortex-circle', {
        scale: 60, opacity: 1,
        scrollTrigger: {
            trigger: '.vortex-container', start: 'top top', end: 'bottom top', scrub: true, pin: true
        }
      });

      // --- SYSTEM 8: TEXT MASK VIDEO ---
      gsap.to('.text-mask-bg', {
        backgroundPosition: "0% 100%", ease: "none",
        scrollTrigger: {
            trigger: ".text-mask-section", start: "top center", end: "bottom top", scrub: true
        }
      });

      // --- SYSTEM 9: INTERACTIVE GRID ---
      // No GSAP needed here, purely CSS hover + state

      // --- SYSTEM 10: VIDEO EXPAND ---
      gsap.to('.expand-video-player', {
        width: '100%', height: '100vh', borderRadius: 0,
        scrollTrigger: {
            trigger: '.video-expand-section', start: 'top center', end: 'bottom bottom', scrub: true
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, [isLoaded]);

  // --- RENDER START ---
  return (
    <div ref={containerRef} className="bg-[#030303] text-white selection:bg-[#ccff00] selection:text-black relative">
      
      {/* 0. GLOBAL LAYERS */}
      <div className="noise" />
      <div ref={cursorRef} className="fixed w-4 h-4 bg-[#ccff00] rounded-full pointer-events-none z-[9999] top-0 left-0 -translate-x-1/2 -translate-y-1/2 mix-blend-difference" />
      <div ref={cursorLabelRef} className="fixed pointer-events-none z-[9999] top-0 left-0 text-black font-black text-[10px] uppercase opacity-0 -translate-x-1/2 -translate-y-1/2 bg-[#ccff00] px-2 py-1 rounded-sm"></div>

      {/* 0. BOOT SCREEN */}
      <div className="boot-screen fixed inset-0 z-[10000] bg-[#000] flex flex-col justify-center items-center">
        <div className="font-mono text-[#ccff00] text-sm mb-4 boot-text">INITIALIZING SINGULARITY KERNEL...</div>
        <div className="w-64 h-1 bg-[#111] overflow-hidden">
          <div className="boot-bar w-0 h-full bg-[#ccff00]" />
        </div>
      </div>

      {/* 1. FIXED NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference">
         <div className="font-black text-xl tracking-tighter">SINGULARITY</div>
         <div className="flex gap-4 items-center">
             <div className="hidden md:flex gap-8 text-xs font-mono">
                 <button className="hover:text-[#ccff00] interactive" data-label="NAV">INDEX</button>
                 <button className="hover:text-[#ccff00] interactive" data-label="NAV">SIMULATION</button>
                 <button className="hover:text-[#ccff00] interactive" data-label="NAV">CONTACT</button>
             </div>
             <Menu className="w-6 h-6 md:hidden" />
         </div>
      </nav>

      {/* --- MAIN CONTENT WRAPPER (Z-10, MB for Footer) --- */}
      <main className="relative z-10 bg-[#030303] mb-[100vh] shadow-[0_50px_100px_rgba(0,0,0,1)]">

        {/* SECTION 1: 3D HERO */}
        <section id="hero" className="h-screen w-full flex items-center justify-center perspective-1000 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover grayscale">
                    <source src={ASSETS.video_ink} type="video/mp4" />
                </video>
            </div>
            <div className="hero-3d text-center z-10 will-change-transform">
                <div className="inline-block border border-[#ccff00]/30 px-3 py-1 rounded-full text-[#ccff00] text-xs font-mono mb-8 backdrop-blur-md animate-pulse">
                    SYSTEM ONLINE V.10.0
                </div>
                <h1 className="text-[15vw] font-black leading-[0.8] tracking-tighter mix-blend-overlay">
                    DIGITAL
                </h1>
                <h1 className="text-[15vw] font-black leading-[0.8] tracking-tighter text-transparent text-stroke hover:text-[#ccff00] transition-colors duration-500 cursor-none interactive" data-label="START">
                    REALITY
                </h1>
            </div>
            <div className="absolute bottom-10 animate-bounce">
                <ArrowRight className="rotate-90 w-6 h-6 text-white/50" />
            </div>
        </section>

        {/* SECTION 2: MANIFESTO */}
        <section className="manifesto-section color-trigger min-h-screen flex items-center justify-center px-6 py-24 bg-[#0a0a0a]">
             <div className="max-w-6xl text-left">
                 <h2 className="text-4xl md:text-7xl font-bold leading-[1.1] text-gray-500">
                    <SplitText className="block text-white">We do not adhere to </SplitText>
                    <SplitText className="block">standard physics.</SplitText>
                    <br/>
                    <SplitText className="block text-[#ccff00]">We engineer chaos</SplitText>
                    <SplitText className="block">into structured beauty.</SplitText>
                 </h2>
                 <div className="mt-12 flex gap-8 items-center">
                     <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center animate-spin-slow">
                        <Activity className="w-4 h-4 text-[#ccff00]" />
                     </div>
                     <p className="max-w-md text-gray-400 font-mono text-sm uppercase">
                        Data stream active. <br/>Scroll to initialize sequence.
                     </p>
                 </div>
             </div>
        </section>

        {/* SECTION 3: PIN & ZOOM WINDOW */}
        <section className="zoom-section h-screen w-full relative flex items-center justify-center bg-white text-black overflow-hidden">
             <div className="zoom-mask absolute inset-0 w-[60vw] h-[60vh] m-auto overflow-hidden clip-window scale-75 bg-black">
                 <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80">
                     <source src={ASSETS.video_city} type="video/mp4" />
                 </video>
                 <div className="absolute inset-0 flex items-center justify-center">
                     <h2 className="text-white text-[12vw] font-black mix-blend-overlay">VISION</h2>
                 </div>
             </div>
             <div className="zoom-content absolute bottom-12 left-12 opacity-0 translate-y-10">
                 <h3 className="text-5xl font-bold mb-2">Total Immersion</h3>
                 <p className="font-mono text-gray-600">Breaking the fourth wall.</p>
             </div>
        </section>

        {/* SECTION 4: HORIZONTAL VELOCITY SCROLL */}
        <section className="horizontal-wrapper h-screen bg-[#111] overflow-hidden relative">
            <div className="absolute top-12 left-12 z-20">
                <h3 className="text-[#ccff00] font-mono text-xl">SELECTED WORKS // DRAG</h3>
            </div>
            
            <div className="horizontal-content flex h-full w-max items-center px-24 gap-24">
                {/* Project 1 */}
                <div className="h-item w-[60vw] h-[70vh] relative group interactive" data-label="PROJECT 01">
                    <img src={ASSETS.img_1} className="w-full h-full object-cover brightness-50 group-hover:brightness-100 transition-all duration-500 grayscale group-hover:grayscale-0" />
                    <div className="absolute -bottom-16 left-0">
                        <h2 className="text-8xl font-black text-transparent text-stroke group-hover:text-white transition-colors">VELOCITY</h2>
                        <p className="font-mono text-sm text-[#ccff00]">WEBGL // FINANCE</p>
                    </div>
                </div>
                {/* Project 2 */}
                <div className="h-item w-[60vw] h-[70vh] relative group interactive" data-label="PROJECT 02">
                    <img src={ASSETS.img_5} className="w-full h-full object-cover brightness-50 group-hover:brightness-100 transition-all duration-500 grayscale group-hover:grayscale-0" />
                    <div className="absolute -bottom-16 left-0">
                        <h2 className="text-8xl font-black text-transparent text-stroke group-hover:text-white transition-colors">AETHER</h2>
                        <p className="font-mono text-sm text-[#ccff00]">E-COMMERCE // 3D</p>
                    </div>
                </div>
                {/* Project 3 */}
                <div className="h-item w-[60vw] h-[70vh] relative group interactive" data-label="PROJECT 03">
                    <img src={ASSETS.img_4} className="w-full h-full object-cover brightness-50 group-hover:brightness-100 transition-all duration-500 grayscale group-hover:grayscale-0" />
                    <div className="absolute -bottom-16 left-0">
                        <h2 className="text-8xl font-black text-transparent text-stroke group-hover:text-white transition-colors">QUANTUM</h2>
                        <p className="font-mono text-sm text-[#ccff00]">AI // DATA</p>
                    </div>
                </div>
                {/* Project 4 (Video) */}
                <div className="h-item w-[60vw] h-[70vh] relative group bg-[#ccff00] flex items-center justify-center interactive text-black" data-label="WATCH">
                    <div className="text-center">
                        <Play className="w-24 h-24 mx-auto mb-8" />
                        <h2 className="text-6xl font-black">SHOWREEL</h2>
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 5: CARD STACK PARALLAX */}
        <section className="bg-black py-24 color-trigger">
            <div className="px-12 mb-24 text-center">
                <h2 className="text-4xl font-bold mb-4">The Process</h2>
                <p className="text-gray-500">How we construct reality.</p>
            </div>

            {/* CARD 1 */}
            <div className="stack-card h-screen sticky top-0 bg-[#0a0a0a] border-t border-white/10 flex items-center justify-center">
                 <div className="flex gap-12 items-center max-w-6xl w-full px-6 flex-col md:flex-row">
                     <div className="w-full md:w-1/2">
                         <h2 className="text-9xl font-black text-[#ccff00] mb-8">01</h2>
                         <h3 className="text-5xl font-bold mb-4">Analysis</h3>
                         <p className="text-xl text-gray-400">Deep dive into data structures and user behavior patterns. We find the signal in the noise.</p>
                     </div>
                     <div className="w-full md:w-1/2 h-[50vh] bg-white/5 rounded-2xl overflow-hidden relative interactive" data-label="CODE">
                        <video autoPlay muted loop className="w-full h-full object-cover opacity-60"><source src={ASSETS.video_code} /></video>
                     </div>
                 </div>
            </div>

            {/* CARD 2 */}
            <div className="stack-card h-screen sticky top-0 bg-[#111] border-t border-white/10 flex items-center justify-center">
                 <div className="flex gap-12 items-center max-w-6xl w-full px-6 flex-col md:flex-row-reverse">
                     <div className="w-full md:w-1/2">
                         <h2 className="text-9xl font-black text-blue-500 mb-8">02</h2>
                         <h3 className="text-5xl font-bold mb-4">Design</h3>
                         <p className="text-xl text-gray-400">Constructing the visual interface using atomic design principles and WebGL shaders.</p>
                     </div>
                     <div className="w-full md:w-1/2 h-[50vh] bg-white/5 rounded-2xl overflow-hidden relative interactive" data-label="GRID">
                         <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 p-4">
                             {Array(36).fill(0).map((_,i) => <div key={i} className="bg-blue-500/20 rounded-sm animate-pulse"></div>)}
                         </div>
                     </div>
                 </div>
            </div>

            {/* CARD 3 */}
            <div className="stack-card h-screen sticky top-0 bg-[#161616] border-t border-white/10 flex items-center justify-center">
                 <div className="flex gap-12 items-center max-w-6xl w-full px-6 flex-col md:flex-row">
                     <div className="w-full md:w-1/2">
                         <h2 className="text-9xl font-black text-purple-500 mb-8">03</h2>
                         <h3 className="text-5xl font-bold mb-4">Deploy</h3>
                         <p className="text-xl text-gray-400">Global edge network distribution with sub-millisecond latency. The world is your server.</p>
                     </div>
                     <div className="w-full md:w-1/2 h-[50vh] flex items-center justify-center interactive" data-label="GLOBAL">
                         <Globe className="w-64 h-64 text-purple-500 animate-spin-slow" />
                     </div>
                 </div>
            </div>
        </section>

        {/* SECTION 6: INTERACTIVE GRID */}
        <section className="py-32 px-4 relative overflow-hidden bg-[#050505]">
             <div className="max-w-7xl mx-auto mb-12 flex justify-between items-end">
                 <h2 className="text-6xl font-black">SYSTEM<br/>NODES</h2>
                 <p className="font-mono text-[#ccff00] animate-pulse">STATUS: ONLINE</p>
             </div>
             <div className="grid grid-cols-10 md:grid-cols-12 gap-1 h-[60vh] opacity-60">
                 {Array(120).fill(0).map((_, i) => (
                     <div key={i} className="bg-[#111] border border-white/5 hover:bg-[#ccff00] hover:scale-110 transition-all duration-0 ease-linear cursor-crosshair"></div>
                 ))}
             </div>
        </section>

        {/* SECTION 7: VORTEX REVEAL */}
        <section className="vortex-container h-screen flex items-center justify-center overflow-hidden relative bg-black">
             <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none mix-blend-difference text-white">
                <h2 className="text-4xl md:text-8xl font-black text-center">
                    ENTER THE<br/>NEXT PHASE
                </h2>
             </div>
             <div className="vortex-circle w-10 h-10 rounded-full bg-white z-10 opacity-0"></div>
        </section>

        {/* SECTION 8: VIDEO EXPAND */}
        <section className="video-expand-section min-h-[150vh] bg-black flex items-center justify-center py-24 relative">
             <div className="expand-video-player w-[400px] h-[300px] rounded-2xl overflow-hidden relative z-10 shadow-2xl">
                 <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                     <source src={ASSETS.video_abstract} type="video/mp4" />
                 </video>
                 <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-transparent transition-colors">
                    <span className="text-white font-mono text-sm border border-white px-4 py-2 rounded-full backdrop-blur-md">THE REEL</span>
                 </div>
             </div>
        </section>

        {/* SECTION 9: TEXT MASK PARALLAX */}
        <section className="text-mask-section min-h-screen flex items-center justify-center bg-white overflow-hidden relative">
             <div className="absolute inset-0 z-0">
                 <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                     <source src={ASSETS.video_glitch} type="video/mp4" />
                 </video>
             </div>
             <div className="relative z-10 bg-white mix-blend-screen w-full h-full flex items-center justify-center">
                 <h1 className="text-[20vw] font-black text-black leading-none tracking-tighter text-center">
                     FUTURE<br/>PROOF
                 </h1>
             </div>
        </section>

        {/* SECTION 10: MARQUEE */}
        <section className="py-24 bg-[#ccff00] text-black overflow-hidden border-t-8 border-black">
            <div className="flex whitespace-nowrap gap-12 animate-marquee">
                {Array(10).fill("DIGITAL • CREATIVE • MOTION • CODE • ").map((item, i) => (
                    <span key={i} className="text-9xl font-black tracking-tighter">{item}</span>
                ))}
            </div>
        </section>

      </main> 
      {/* END MAIN CONTENT */}

      {/* --- FIXED FOOTER (CURTAIN REVEAL) --- */}
      <footer className="fixed bottom-0 left-0 w-full h-[100vh] bg-[#111] text-white z-0 flex flex-col justify-between p-8 md:p-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full border-b border-white/10 pb-12">
              <div>
                  <h4 className="font-bold mb-4 text-[#ccff00]">SITEMAP</h4>
                  <ul className="space-y-2 font-mono text-sm text-gray-400">
                      <li><a href="#" className="hover:text-white transition-colors">HOME</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">WORK</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">ABOUT</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">CONTACT</a></li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-bold mb-4 text-[#ccff00]">SOCIALS</h4>
                  <ul className="space-y-2 font-mono text-sm text-gray-400">
                      <li><a href="#" className="hover:text-white transition-colors">INSTAGRAM</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">TWITTER</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">LINKEDIN</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">GITHUB</a></li>
                  </ul>
              </div>
              <div className="md:text-right">
                   <h4 className="font-bold mb-4 text-[#ccff00]">OFFICE</h4>
                   <p className="font-mono text-sm text-gray-400">
                       2045 CYBER BLVD<br/>
                       NEO TOKYO, JP<br/>
                       EST. 2025
                   </p>
              </div>
          </div>

          <div className="flex flex-col items-center justify-center flex-grow text-center">
               <p className="font-mono uppercase tracking-widest mb-4 text-gray-500">Start a project</p>
               <h2 className="text-[15vw] font-black leading-[0.8] hover:text-[#ccff00] transition-colors duration-300 cursor-pointer interactive" data-label="MAIL">
                   <ScrambleText text="HELLO@" />
               </h2>
          </div>

          <div className="flex justify-between items-end">
              <div className="text-xs font-mono text-gray-600">
                  SINGULARITY &copy; 2025
              </div>
              <ArrowUpRight className="w-12 h-12 text-[#ccff00]" />
          </div>
      </footer>

      {/* Styles for marquee animation */}
      <style jsx>{`
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
}