'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { 
  ArrowRight, ArrowDown, ArrowUpRight, Box, Circle, Hexagon, Layers, Zap, Globe, Cpu, Code, Aperture, Anchor, Fingerprint, Ghost, Play, ChevronDown, Maximize, Heart, Users, Star, Coffee, Music, Palette, Smartphone, Layout, Database, Menu, X
} from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function UltimateAnimationPage() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorTextRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // --- 1. PRELOADER SEQUENCE (Combined from MagnumOpus & GodMode) ---
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoaded(true);
        setIsLoading(false);
        window.scrollTo(0, 0);
      }
    });
    tl.to('.loader-bar', { width: '100%', duration: 1.5, ease: 'expo.inOut' })
      .to('.loader-text', { opacity: 0, duration: 0.5 })
      .to('.loader-screen', { yPercent: -100, duration: 1, ease: 'power4.inOut' });
  }, []);

  // --- 2. LENIS SMOOTH SCROLL & CUSTOM CURSOR (Combined) ---
  useEffect(() => {
    if (!isLoaded) return;

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

    // Custom Cursor
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
      gsap.to(cursorTextRef.current, { x: e.clientX, y: e.clientY, duration: 0.15 });
    };
    window.addEventListener('mousemove', moveCursor);

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [isLoaded]);

  // --- 3. MASTER GSAP CONTEXT (All Animations Combined) ---
  useLayoutEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // A. Hero Animations (Scale Down, 3D Tilt, Parallax BG from multiple)
      const tlHero = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      tlHero.to('.hero-text', { scale: 0.5, opacity: 0, y: -100 });

      // Hero 3D Tilt (Mouse)
      const heroSection = document.querySelector('#hero');
      heroSection?.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;
        gsap.to('.hero-title', { rotationY: xPos, rotationX: -yPos, ease: 'power2.out', duration: 1 });
      });

      // Hero Parallax BG
      gsap.to('.hero-bg', { y: '20%', scale: 1.1, scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });

      // B. Text Reveals (Staggered, Split, Line-by-Line from multiple)
      const revealTexts = gsap.utils.toArray('.reveal-text, .split-reveal');
      revealTexts.forEach((text) => {
        gsap.fromTo(text, 
          { y: 100, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out', scrollTrigger: { trigger: text, start: 'top 80%' } }
        );
      });

      // C. Horizontal Scrolls (Multiple: Gallery, Process, Projects from all)
      // Horizontal Gallery
      const horizontalSectionRef = containerRef.current?.querySelector('.horizontal-gallery');
      const galleryPanels = gsap.utils.toArray('.panel');
      if (horizontalSectionRef && galleryPanels.length) {
        gsap.to(galleryPanels, {
          xPercent: -100 * (galleryPanels.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalSectionRef,
            pin: true,
            scrub: 1,
            snap: 1 / (galleryPanels.length - 1),
            end: () => '+=' + horizontalSectionRef.offsetWidth,
          },
        });
      }

      // Horizontal Process
      const horizontalProcess = document.querySelector('.horizontal-process');
      const processPanels = gsap.utils.toArray('.h-panel');
      if (horizontalProcess && processPanels.length) {
        gsap.to(processPanels, {
          xPercent: -100 * (processPanels.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalProcess,
            pin: true,
            scrub: 1,
            snap: 1 / (processPanels.length - 1),
            end: () => "+=" + horizontalProcess.offsetWidth * 2,
          }
        });
      }

      // Horizontal Projects (Fixed Logic)
      const horizontalProjects = document.querySelector('.horizontal-projects');
      const projectsContainer = document.querySelector('.horizontal-content');
      if (horizontalProjects && projectsContainer) {
        gsap.to(projectsContainer, {
          x: () => -(projectsContainer.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalProjects,
            pin: true,
            scrub: 1,
            end: () => "+=" + (projectsContainer.scrollWidth - window.innerWidth),
            invalidateOnRefresh: true,
          }
        });
      }

      // D. Parallax Effects (Cards, Grid, Columns from multiple)
      // Parallax Cards Stacking
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

      // Parallax Grid Images
      gsap.utils.toArray('.parallax-img').forEach((img) => {
        gsap.to(img, { y: -150, scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } });
      });

      // Parallax Columns Gallery
      gsap.to('.col-1, .col-3', { y: -200, scrollTrigger: { trigger: '.gallery-section', scrub: 1 } });
      gsap.to('.col-2', { y: 200, scrollTrigger: { trigger: '.gallery-section', scrub: 1 } });

      // E. Clip Path & Zoom (Image Reveal, Video Expand)
      gsap.to('.clip-image', {
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1,
        scrollTrigger: { trigger: '.clip-container', start: 'top center', end: 'bottom bottom', scrub: true },
      });

      gsap.to('.expand-video, .video-card', {
        width: '100%',
        height: '100vh',
        borderRadius: 0,
        scrollTrigger: { trigger: '.video-section, .video-trigger', start: 'top center', end: 'bottom bottom', scrub: true }
      });

      // F. Marquee (Infinite from multiple)
      gsap.to('.marquee-inner, .marquee-track', {
        xPercent: -50,
        ease: 'none',
        duration: 20,
        repeat: -1
      });

      // G. Pinned Sections (Manifesto, Vortex)
      ScrollTrigger.create({
        trigger: '.pinned-manifesto',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.pinned-left',
      });

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

      // H. Interactive Hovers (Magnetic Images, Service Image Follow)
      document.querySelectorAll('.portfolio-image, .service-row').forEach((el) => {
        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          gsap.to(el, { x: (x / rect.width - 0.5) * 20, y: (y / rect.height - 0.5) * 20, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.3 }));
      });

      const serviceImg = document.querySelector('.service-float-img');
      document.querySelectorAll('.service-row').forEach((service) => {
        service.addEventListener('mouseenter', () => {
          const img = service.getAttribute('data-img');
          if (serviceImg) {
            serviceImg.style.backgroundImage = `url(${img})`;
            gsap.to(serviceImg, { scale: 1, opacity: 1, duration: 0.3 });
          }
        });
        service.addEventListener('mouseleave', () => gsap.to(serviceImg, { scale: 0, opacity: 0, duration: 0.3 }));
        service.addEventListener('mousemove', (e) => gsap.to(serviceImg, { x: e.clientX, y: e.clientY - 200, duration: 0.5 }));
      });

      // I. Color Shifts & Global Effects
      const colors = ["#000000", "#0a0a2a", "#1a0520", "#000000", "#ff3333"];
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

      // J. Hero Letter Stagger (from original)
      const heroTitle = document.querySelector('.hero-title');
      if (heroTitle) {
        const chars = heroTitle.querySelectorAll('span');
        gsap.from(chars, { y: 100, opacity: 0, stagger: 0.05, duration: 1.2, ease: 'back.out(1.7)' });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  if (isLoading) {
    return (
      <div className="loader-screen fixed inset-0 z-[10000] bg-black flex flex-col justify-center items-center text-white">
        <div className="text-center">
          <h1 className="text-6xl font-black mb-4 animate-pulse">INITIALIZING GSAP UNIVERSE</h1>
          <div className="w-full max-w-md h-2 bg-gray-800 rounded-full overflow-hidden mt-8">
            <div className="loader-bar w-0 h-full bg-gradient-to-r from-purple-600 to-blue-600"></div>
          </div>
          <p className="font-mono text-sm mt-4 opacity-75">LOADING ASSETS... V.2025</p>
        </div>
      </div>
    );
  }

  return (
    <main ref={containerRef} className="min-h-[1000vh] bg-black text-white selection:bg-cyan-300 selection:text-black overflow-x-hidden relative">
      
      {/* Custom Cursor (Combined) */}
      <div ref={cursorRef} className="fixed w-4 h-4 border-2 border-white rounded-full pointer-events-none z-50 mix-blend-difference top-0 left-0 -translate-x-1/2 -translate-y-1/2 hidden md:block" />
      <div ref={cursorTextRef} className="fixed pointer-events-none z-[100] text-white font-mono text-[10px] top-4 left-4 mix-blend-difference hidden md:block">GSAP MODE</div>

      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

      {/* --- SECTION 1: HERO (Combined Scale, Tilt, Parallax) - 100vh --- */}
      <section id="hero" className="h-screen flex items-center justify-center relative overflow-hidden color-shift-trigger">
        <div className="hero-bg absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="hero-text text-center z-10 px-4 mix-blend-overlay hero-title">
          {Array.from('Ultimate GSAP Odyssey').map((char, i) => (
            <span key={i} className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
          ))}
          <h2 className="text-[4vw] font-light tracking-[1rem] uppercase mt-4">Digital Dimensions Unleashed</h2>
        </div>
        <div className="absolute bottom-10 animate-bounce">
          <ArrowDown className="rotate-90 w-8 h-8 text-white/50" />
        </div>
      </section>

      {/* --- SECTION 2: TEXT MANIFESTO (Reveal + Split) - 100vh --- */}
      <section className="min-h-screen flex flex-col justify-center px-8 md:px-24 py-24 bg-neutral-950 color-shift-trigger">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="overflow-hidden mb-4">
            <p className="reveal-text split-reveal text-4xl md:text-6xl font-bold leading-tight text-neutral-400">
              We craft universes from code. <span className="text-white">GSAP + Next.js = Magic.</span>
            </p>
          </div>
          <div className="overflow-hidden mb-4">
            <p className="reveal-text split-reveal text-4xl md:text-6xl font-bold leading-tight text-neutral-400">
              Breaking barriers between <span className="text-cyan-400">art</span> and <span className="text-white">interaction</span>.
            </p>
          </div>
          <div className="reveal-text flex gap-4 pt-10 justify-center">
            <button className="px-8 py-4 border border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm font-bold">
              Initiate Sequence <ArrowRight className="inline ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: HORIZONTAL GALLERY (From HighLevel) - 100vh visual, 300vh scroll --- */}
      <section ref={(el) => el && (el.className = 'horizontal-gallery')} className="h-screen w-[400%] flex flex-nowrap bg-white text-black overflow-hidden relative">
        <div className="panel w-screen h-full flex flex-col justify-center items-center px-12 border-r border-gray-200">
          <Globe className="w-32 h-32 mb-8 text-blue-600" />
          <h3 className="text-[8vw] font-bold">GLOBAL REACH</h3>
          <p className="text-xl max-w-md text-center">Seamless across devices.</p>
        </div>
        <div className="panel w-screen h-full flex flex-col justify-center items-center px-12 border-r border-gray-200 bg-gray-50">
          <Cpu className="w-32 h-32 mb-8 text-purple-600" />
          <h3 className="text-[8vw] font-bold">PERFORMANCE</h3>
          <p className="text-xl max-w-md text-center">60fps on all screens.</p>
        </div>
        <div className="panel w-screen h-full flex flex-col justify-center items-center px-12 border-r border-gray-200">
          <Zap className="w-32 h-32 mb-8 text-yellow-500" />
          <h3 className="text-[8vw] font-bold">SPEED</h3>
          <p className="text-xl max-w-md text-center">Instant magic.</p>
        </div>
        <div className="panel w-screen h-full relative">
          <Image src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="Vision" fill className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <h3 className="text-[8vw] font-bold text-white">INNOVATION</h3>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: MARQUEE RIBBON (Infinite) - 50vh --- */}
      <section className="py-20 border-y border-white/10 bg-neutral-900/50 overflow-hidden color-shift-trigger">
        <div className="marquee-inner flex whitespace-nowrap gap-12 text-8xl font-black text-white/10">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>GSAP • NEXTJS • MOTION • CHAOS • INNOVATE • {i % 2 === 0 ? 'GSAP' : 'CODE'} •</span>
          ))}
        </div>
      </section>

      {/* --- SECTION 5: HORIZONTAL PROCESS (From MagnumOpus) - 100vh visual, 400vh scroll --- */}
      <section className="horizontal-process h-screen w-full bg-white text-black overflow-hidden relative">
        <div className="absolute top-12 left-12 z-20">
          <h3 className="text-4xl font-black uppercase">The GSAP Algorithm</h3>
        </div>
        <div className="flex h-full w-[400%]">
          <div className="h-panel w-screen h-full flex items-center justify-center bg-white border-r border-neutral-200 p-12 relative">
            <div className="max-w-xl">
              <Fingerprint className="w-24 h-24 mb-8 text-neutral-400" />
              <h2 className="text-8xl font-black mb-6">01</h2>
              <h3 className="text-4xl font-bold mb-4">IDENTIFY</h3>
              <p className="text-xl">Core DNA of motion.</p>
            </div>
          </div>
          <div className="h-panel w-screen h-full flex items-center justify-center bg-[#f0f0f0] border-r border-neutral-200 p-12">
            <div className="max-w-xl">
              <Aperture className="w-24 h-24 mb-8 text-orange-500" />
              <h2 className="text-8xl font-black mb-6">02</h2>
              <h3 className="text-4xl font-bold mb-4">FOCUS</h3>
              <p className="text-xl">Intentional design.</p>
            </div>
          </div>
          <div className="h-panel w-screen h-full flex items-center justify-center bg-[#e5e5e5] border-r border-neutral-200 p-12">
            <div className="max-w-xl">
              <Code className="w-24 h-24 mb-8 text-blue-600" />
              <h2 className="text-8xl font-black mb-6">03</h2>
              <h3 className="text-4xl font-bold mb-4">EXECUTE</h3>
              <p className="text-xl">GSAP soul.</p>
            </div>
          </div>
          <div className="h-panel w-screen h-full flex items-center justify-center bg-black text-white p-12">
            <div className="max-w-xl text-center">
              <Ghost className="w-32 h-32 mx-auto mb-8 animate-pulse" />
              <h2 className="text-6xl font-bold">ALIVE</h2>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 6: CLIP PATH IMAGE REVEAL (From HighLevel) - 150vh --- */}
      <section className="clip-container min-h-[150vh] flex items-center justify-center bg-black py-24 relative color-shift-trigger">
        <div className="clip-image w-[80vw] h-[80vh] bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2894&auto=format&fit=crop')", clipPath: 'inset(20% 40% 20% 40%)', scale: 0.8 }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-center">
            <h2 className="text-6xl font-bold text-white mb-4">Perspective Shift</h2>
            <p className="text-xl text-gray-200">Scroll to expand horizons.</p>
          </div>
        </div>
      </section>

      {/* --- SECTION 7: PARALLAX GRID (From MagnumOpus) - 100vh --- */}
      <section className="py-32 px-4 md:px-12 color-shift-trigger">
        <div className="text-center mb-24">
          <h2 className="text-sm font-mono tracking-widest uppercase mb-4 text-cyan-500">Case Studies</h2>
          <h3 className="text-6xl font-bold">Selected Works</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <div className="space-y-4 mt-12 md:mt-0">
            <div className="parallax-img h-[60vh] w-full bg-neutral-800 overflow-hidden relative group">
              <Image src="https://images.unsplash.com/photo-1481487484168-9b930d5b7960?q=80&w=2670&auto=format&fit=crop" alt="Work 1" fill className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
            </div>
            <div className="flex justify-between items-end border-b border-white/20 pb-4">
              <h4 className="text-3xl font-bold">Aether</h4>
              <span className="text-xs font-mono">2025</span>
            </div>
          </div>
          <div className="space-y-4 md:translate-y-24">
            <div className="parallax-img h-[60vh] w-full bg-neutral-800 overflow-hidden relative group">
              <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop" alt="Work 2" fill className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
            </div>
            <div className="flex justify-between items-end border-b border-white/20 pb-4">
              <h4 className="text-3xl font-bold">Cyber Deck</h4>
              <span className="text-xs font-mono">2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 8: PARALLAX COLUMNS GALLERY (From GodModeUltra) - 150vh --- */}
      <section className="gallery-section min-h-[150vh] bg-[#111] overflow-hidden relative flex justify-center gap-4 md:gap-8 py-24 color-shift-trigger">
        <div className="col-1 w-[25vw] flex flex-col gap-8 -mt-24">
          <Image src="https://picsum.photos/400/600?random=1" alt="Gallery 1" width={400} height={600} className="w-full h-[60vh] object-cover rounded-lg opacity-80" />
          <Image src="https://picsum.photos/400/500?random=2" alt="Gallery 2" width={400} height={500} className="w-full h-[50vh] object-cover rounded-lg opacity-80" />
          <Image src="https://picsum.photos/400/600?random=3" alt="Gallery 3" width={400} height={600} className="w-full h-[60vh] object-cover rounded-lg opacity-80" />
        </div>
        <div className="col-2 w-[25vw] flex flex-col gap-8 mt-24">
          <Image src="https://picsum.photos/400/500?random=4" alt="Gallery 4" width={400} height={500} className="w-full h-[50vh] object-cover rounded-lg opacity-80" />
          <div className="h-[40vh] bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-4xl p-4 text-center">
            CHAOS ENGINE
          </div>
          <Image src="https://picsum.photos/400/600?random=5" alt="Gallery 5" width={400} height={600} className="w-full h-[60vh] object-cover rounded-lg opacity-80" />
        </div>
        <div className="col-3 w-[25vw] flex flex-col gap-8 -mt-12">
          <Image src="https://picsum.photos/400/700?random=6" alt="Gallery 6" width={400} height={700} className="w-full h-[70vh] object-cover rounded-lg opacity-80" />
          <Image src="https://picsum.photos/400/500?random=7" alt="Gallery 7" width={400} height={500} className="w-full h-[50vh] object-cover rounded-lg opacity-80" />
          <Image src="https://picsum.photos/400/400?random=8" alt="Gallery 8" width={400} height={400} className="w-full h-[40vh] object-cover rounded-lg opacity-80" />
        </div>
      </section>

      {/* --- SECTION 9: HORIZONTAL PROJECTS (From GodModeFixed) - 100vh visual, 300vh scroll --- */}
      <section className="horizontal-projects h-screen overflow-hidden bg-neutral-900 relative">
        <div className="absolute top-12 left-12 z-20">
          <h2 className="text-6xl font-black tracking-tighter">Portfolio Odyssey</h2>
        </div>
        <div className="horizontal-content flex h-full w-max">
          <div className="w-screen h-full flex items-center justify-center border-r border-white/10 bg-[#050505] relative p-12 shrink-0 portfolio-image">
            <div className="absolute inset-0 opacity-20 mix-blend-screen">
              <Image src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2600&auto=format&fit=crop" alt="Project 1" fill className="object-cover" />
            </div>
            <div className="text-center relative z-10">
              <h2 className="text-[8vw] font-black uppercase leading-none">Velocity</h2>
              <p className="font-mono text-[#ccff00] mt-4">Fintech Motion</p>
            </div>
          </div>
          <div className="w-screen h-full flex items-center justify-center border-r border-white/10 bg-[#0a0a0a] relative p-12 shrink-0 portfolio-image">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/20"></div>
            <div className="text-center relative z-10">
              <h2 className="text-[8vw] font-black uppercase leading-none">Aether</h2>
              <p className="font-mono text-purple-400 mt-4">E-Commerce 3D</p>
            </div>
          </div>
          <div className="w-screen h-full flex items-center justify-center border-r border-white/10 bg-[#000] relative p-12 shrink-0 portfolio-image">
            <div className="flex gap-12 items-center">
              <div className="w-[30vw] h-[40vh] bg-white/5 rounded-2xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop" alt="Project 3" fill className="object-cover" />
              </div>
              <div>
                <h2 className="text-[6vw] font-black uppercase leading-none">Cipher</h2>
                <p className="font-mono text-blue-400 mt-4">Cyber Art</p>
                <button className="mt-8 px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-all">Explore</button>
              </div>
            </div>
          </div>
          <div className="w-screen h-full flex items-center justify-center bg-[#ccff00] text-black shrink-0">
            <div className="text-center">
              <h2 className="text-[5vw] font-black uppercase leading-none">Break the Grid?</h2>
              <ArrowRight className="w-12 h-12 mt-8 animate-pulse mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 10: VIDEO EXPAND (Combined) - 150vh --- */}
      <section className="video-section video-trigger min-h-[150vh] bg-black flex items-center justify-center relative py-24 color-shift-trigger">
        <div className="video-card expand-video w-[400px] h-[300px] rounded-2xl overflow-hidden relative z-10 shadow-2xl">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-a-man-with-heads-like-statues-33502-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="text-white font-mono text-sm border border-white px-4 py-2 rounded-full backdrop-blur-md">Showreel Activated</span>
          </div>
        </div>
      </section>

      {/* --- SECTION 11: STACKING CARDS (From HighLevel) - 300vh --- */}
      <section className="bg-neutral-900 pb-24 color-shift-trigger">
        <div className="pt-24 pb-12 px-8">
          <h2 className="text-6xl font-bold mb-4">Core Pillars</h2>
          <p className="text-xl text-gray-400">Stacking the future.</p>
        </div>
        <div className="card h-screen sticky top-0 flex items-center justify-center bg-[#111] border-t border-white/10 shadow-2xl">
          <div className="flex flex-col items-center gap-8">
            <Box className="w-24 h-24 text-cyan-500" />
            <h2 className="text-8xl font-black text-white/10">01</h2>
            <h3 className="text-4xl font-bold">STRUCTURE</h3>
            <p className="max-w-lg text-center text-gray-400">React foundations.</p>
          </div>
        </div>
        <div className="card h-screen sticky top-0 flex items-center justify-center bg-[#161616] border-t border-white/10 shadow-2xl">
          <div className="flex flex-col items-center gap-8">
            <Layers className="w-24 h-24 text-pink-500" />
            <h2 className="text-8xl font-black text-white/10">02</h2>
            <h3 className="text-4xl font-bold">LAYERING</h3>
            <p className="max-w-lg text-center text-gray-400">Depth immersion.</p>
          </div>
        </div>
        <div className="card h-screen sticky top-0 flex items-center justify-center bg-[#1a1a1a] border-t border-white/10 shadow-2xl">
          <div className="flex flex-col items-center gap-8">
            <Hexagon className="w-24 h-24 text-lime-500" />
            <h2 className="text-8xl font-black text-white/10">03</h2>
            <h3 className="text-4xl font-bold">GEOMETRY</h3>
            <p className="max-w-lg text-center text-gray-400">Precision frames.</p>
          </div>
        </div>
        <div className="card h-screen sticky top-0 flex items-center justify-center bg-[#202020] border-t border-white/10 shadow-2xl">
          <div className="flex flex-col items-center gap-8">
            <Circle className="w-24 h-24 text-orange-500" />
            <h2 className="text-8xl font-black text-white/10">04</h2>
            <h3 className="text-4xl font-bold">LOOP</h3>
            <p className="max-w-lg text-center text-gray-400">Seamless cycles.</p>
          </div>
        </div>
      </section>

      {/* --- SECTION 12: VORTEX (From MagnumOpus) - 100vh --- */}
      <section className="vortex-container h-screen flex items-center justify-center overflow-hidden relative bg-black color-shift-trigger">
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none mix-blend-difference text-white">
          <h2 className="text-4xl md:text-8xl font-black text-center">Enter the Vortex</h2>
        </div>
        <div className="vortex-circle w-64 h-64 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 z-10 mx-auto"></div>
      </section>

      {/* --- SECTION 13: PINNED MANIFESTO (From MagnumOpus) - 200vh --- */}
      <section className="pinned-manifesto h-[200vh] flex bg-neutral-900 text-white relative color-shift-trigger">
        <div className="pinned-left w-1/2 h-screen flex flex-col justify-center px-12 border-r border-white/10 bg-black z-10">
          <Anchor className="w-16 h-16 mb-8 text-purple-500" />
          <h2 className="text-6xl font-bold mb-8 reveal-text">Grounded in Motion</h2>
          <p className="text-xl text-gray-400">User-centric GSAP symphonies.</p>
        </div>
        <div className="w-1/2 ml-auto">
          <div className="h-screen flex items-center justify-center border-b border-white/10">
            <p className="text-3xl font-serif italic text-gray-500">"Motion is the essence of revelation."</p>
          </div>
          <div className="h-screen flex items-center justify-center">
            <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2670&auto=format&fit=crop" alt="Manifesto" width={800} height={600} className="w-2/3 h-2/3 object-cover grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
        </div>
      </section>

      {/* --- SECTION 14: INTERACTIVE SERVICES (From GodModeUltra) - 200vh --- */}
      <section className="py-32 px-6 bg-[#050505] relative overflow-hidden cursor-none color-shift-trigger">
        <div className="service-float-img fixed top-0 left-0 w-[300px] h-[400px] bg-cover bg-center pointer-events-none z-50 rounded-lg opacity-0 scale-0 origin-center" style={{ transform: 'translate(-50%, -50%)' }}></div>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs font-mono text-gray-500 mb-12 uppercase tracking-[0.5em]">Expertise Matrix</h2>
          {[
            { name: "Art Direction", img: "https://picsum.photos/600/800?random=9" },
            { name: "Motion Design", img: "https://picsum.photos/600/800?random=10" },
            { name: "3D Rendering", img: "https://picsum.photos/600/800?random=11" },
            { name: "WebGL Magic", img: "https://picsum.photos/600/800?random=12" },
            { name: "UI Orchestration", img: "https://picsum.photos/600/800?random=13" },
          ].map((service, i) => (
            <div key={i} className="service-row border-t border-white/10 py-16 group hover:pl-12 transition-all duration-500 cursor-pointer" data-img={service.img}>
              <div className="flex justify-between items-center">
                <h3 className="text-5xl md:text-8xl font-black text-gray-700 group-hover:text-white transition-colors duration-300 uppercase">
                  {service.name}
                </h3>
                <ArrowUpRight className="text-gray-700 group-hover:text-[#FF3333] w-12 h-12 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECTION 15: TEAM CREDITS (From GodModeFixed) - 100vh --- */}
      <section className="py-32 px-6 md:px-24 bg-[#111] border-t border-white/10 color-shift-trigger">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
            <h2 className="text-6xl font-bold mb-6">The Architects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Rogue creators of digital chaos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Alex V.", role: "Motion Maestro", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" },
              { name: "Sarah J.", role: "Code Sorceress", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop" },
              { name: "Davide R.", role: "3D Alchemist", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop" },
            ].map((member, i) => (
              <div key={i} className="group relative h-[60vh] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 portfolio-image">
                <Image src={member.img} alt={member.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-3xl font-bold">{member.name}</h3>
                  <p className="text-[#ccff00] font-mono text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 16: FOOTER (Fixed Reveal, Combined) - 100vh --- */}
      <footer className="h-[100vh] flex flex-col items-center justify-center bg-black relative z-10 color-shift-trigger">
        <div className="text-center">
          <h2 className="text-[12vw] font-black leading-none text-white mix-blend-difference hover:scale-110 transition-transform duration-500 cursor-pointer">
            LET'S COLLABORATE
          </h2>
          <div className="flex gap-8 mt-12">
            <a href="#" className="text-xl hover:text-cyan-400 hover:underline">X</a>
            <a href="#" className="text-xl hover:text-cyan-400 hover:underline">Instagram</a>
            <a href="#" className="text-xl hover:text-cyan-400 hover:underline">LinkedIn</a>
          </div>
          <p className="absolute bottom-8 text-xs text-gray-600 font-mono">
            © 2025 ULTIMATE GSAP ODYSSEY. BUILT WITH NEXT.JS, GSAP & ENDLESS IMAGINATION.
          </p>
        </div>
      </footer>

      {/* Global Styles for Outlines */}
      <style jsx global>{`
        .text-outline { -webkit-text-stroke: 2px rgba(255, 255, 255, 0.5); color: transparent; }
        .text-outline:hover { -webkit-text-stroke: 2px #fff; }
      `}</style>
    </main>
  );
}