// pages/index.js
"use client"
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import {
  ArrowRight, Play, ChevronDown, Maximize, ArrowUpRight, Globe, Cpu, Zap,
  Aperture, Activity, Anchor, Box, Disc, Command, Fingerprint, Ghost,
  Code, Layers, Hexagon, Circle, ArrowDown, Menu, X, Heart, Star, Rocket, Coffee,
  Download, Settings, Users, Award, Target, CoffeeIcon, HeartIcon, StarIcon,
  ZapIcon, CpuIcon, Palette, GlobeIcon, Smartphone, Tablet, Coffee as CoffeeLucide,
  Heart as HeartLucide, Rocket as RocketLucide, Infinity as InfinityLucide,
  Target as TargetLucide, Award as AwardLucide, Users as UsersLucide,
  Settings as SettingsLucide, ChevronRight, Menu as MenuLucide, X as XLucide,
  Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- ASSETS ---
const VIDEOS = {
  abstract: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-glitch-effect-29758-large.mp4",
  code: "https://assets.mixkit.co/videos/preview/mixkit-matrix-style-code-falling-down-screen-animation-2751-large.mp4",
  ink: "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-286-large.mp4",
  city: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4",
  holographic: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-holographic-interface-902-large.mp4",
  glitch: "https://assets.mixkit.co/videos/preview/mixkit-digital-glitch-video-effect-2340-large.mp4"
};

const IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000",
  "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=1000",
  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000",
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000",
  "https://images.unsplash.com/photo-1481487484168-9b930d5b7960?q=80&w=1000",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000",
  "https://images.unsplash.com/photo-1614728853913-1e22ba815d7b?q=80&w=1000",
  "https://images.unsplash.com/photo-1550745165-9010d4506900?q=80&w=1000"
];

// --- COMPONENT: SPLIT TEXT ---
const SplitText = ({ children, className }) => {
  return (
    <span className={className}>
      {children.split('').map((char, i) => (
        <span key={i} className="inline-block char-reveal">{char === ' ' ? '\u00A0' : char}</span>
      ))}
    </span>
  );
};

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
    <span onMouseEnter={handleOver} className={`${className} cursor-pointer inline-block`}>
      {display}
    </span>
  );
};

export default function UltimateAnimationShowcase() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorLabelRef = useRef(null);
  const horizontalSectionRef = useRef(null);
  const cursorRef2 = useRef(null);
  const cursorTextRef = useRef(null);

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

  // --- 3. CUSTOM CURSOR LOGIC ---
  useEffect(() => {
    const moveCursor = (e) => {
      gsap.to(cursorRef2.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
      gsap.to(cursorTextRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
      });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // --- 4. LENIS SMOOTH SCROLL ---
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
    return () => lenis.destroy();
  }, [isLoaded]);

  // --- 5. MASTER ANIMATION TIMELINE ---
  useLayoutEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // A. HERO PARALLAX
      gsap.to('.hero-bg', {
        y: '20%',
        scale: 1.1,
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
      });

      // B. HORIZONTAL SCROLL (FIXED LOGIC)
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
            end: () => "+=" + (horizontalContainer.scrollWidth - window.innerWidth),
            invalidateOnRefresh: true,
          },
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

      // F. PIN & ZOOM WINDOW
      const zoomTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.zoom-section',
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: true,
        }
      });
      zoomTl.to('.zoom-mask', { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1 })
        .to('.zoom-text', { opacity: 1, y: 0 }, '-=0.5');

      // G. HORIZONTAL VELOCITY SCROLL
      const hSection = document.querySelector('.horizontal-wrapper');
      const hContent = document.querySelector('.horizontal-content');
      let proxy = { skew: 0 },
        skewSetter = gsap.quickSetter(".h-item", "skewX", "deg"),
        clamp = gsap.utils.clamp(-20, 20);
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
            gsap.to(proxy, { skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew) });
          }
        }
      });

      // H. CARD STACK PARALLAX
      const cards = gsap.utils.toArray('.stack-card');
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          pin: true,
          pinSpacing: false,
          snap: 1,
        });
        gsap.to(card, {
          scale: 0.9, opacity: 0.5,
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // I. TEXT MASK VIDEO
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

      // J. PARALLAX COLUMNS
      gsap.to('.col-1', { y: -200, scrollTrigger: { trigger: '.gallery-section', scrub: 1 } });
      gsap.to('.col-2', { y: 200, scrollTrigger: { trigger: '.gallery-section', scrub: 1 } });
      gsap.to('.col-3', { y: -200, scrollTrigger: { trigger: '.gallery-section', scrub: 1 } });

      // K. REVEAL TEXT SECTION (Lines coming up)
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

      // L. CLIP PATH IMAGE REVEAL
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

      // M. SCALING VORTEX (Circle expanding)
      gsap.to('.vortex-circle', {
        scale: 50,
        opacity: 0,
        scrollTrigger: {
          trigger: '.vortex-container',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true,
        },
      });

      // N. BACKGROUND COLOR SHIFTING
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

      // O. PARALLAX GRID IMAGES
      gsap.utils.toArray('.parallax-img').forEach((img, i) => {
        gsap.to(img, {
          y: -150,
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

      // P. STAGGERED TEXT REVEAL
      gsap.from('.char-reveal', {
        y: 100, opacity: 0, stagger: 0.02, duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: '.text-reveal-section', start: 'top 80%' }
      });

      // Q. PINNED MANIFESTO
      ScrollTrigger.create({
        trigger: '.pinned-manifesto',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.pinned-left',
      });

      // R. INTERACTIVE SERVICES LIST (Image follows mouse)
      const services = document.querySelectorAll('.service-row');
      const serviceImg = document.querySelector('.service-float-img');
      services.forEach(service => {
        service.addEventListener('mouseenter', () => {
          const img = service.getAttribute('data-img');
          serviceImg.style.backgroundImage = `url(${img})`;
          gsap.to(serviceImg, { scale: 1, opacity: 1, duration: 0.3 });
        });
        service.addEventListener('mouseleave', () => {
          gsap.to(serviceImg, { scale: 0, opacity: 0, duration: 0.3 });
        });
        service.addEventListener('mousemove', (e) => {
          gsap.to(serviceImg, { x: e.clientX, y: e.clientY - 200, duration: 0.5 });
        });
      });

      // S. HERO 3D TILT
      const hero = document.querySelector('#hero');
      hero.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        gsap.to('.hero-content', { rotationY: x, rotationX: -y, duration: 1 });
      });

      // T. HERO TEXT 3D TILT (Mouse Interaction)
      hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;
        gsap.to('.hero-title', {
          rotationY: xPos,
          rotationX: -yPos,
          ease: 'power2.out',
          duration: 1
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // --- FEATURES DATA ---
  const features = [
    { icon: Zap, title: 'Lightning Fast', desc: 'Animations that respond instantly to user interactions' },
    { icon: Sparkles, title: 'Stunning Visuals', desc: 'Eye-catching effects that captivate your audience' },
    { icon: Cpu, title: 'Optimized Performance', desc: 'Smooth animations even on low-end devices' },
    { icon: Palette, title: 'Design Freedom', desc: 'Unlimited creative possibilities with custom easing' },
    { icon: Globe, title: 'Cross-Platform', desc: 'Works seamlessly across all modern browsers' },
    { icon: Target, title: 'Precise Control', desc: 'Fine-tune every aspect of your animations' },
  ];

  const stats = [
    { value: '99.9%', label: 'Performance' },
    { value: '100K+', label: 'Developers' },
    { value: '∞', label: 'Possibilities' },
    { value: '0ms', label: 'Jank' },
  ];

  const services = [
    { name: 'Art Direction', img: IMAGES[0] },
    { name: 'Creative Dev', img: IMAGES[1] },
    { name: 'Motion Design', img: IMAGES[2] },
    { name: '3D Modelling', img: IMAGES[3] },
    { name: 'Sound Design', img: IMAGES[4] },
  ];

  const projects = [
    { name: 'Project Alpha', img: 'https://images.unsplash.com/photo-1481487484168-9b930d5b7960?q=80&w=2000', type: 'Brand Identity' },
    { name: 'Neon Horizon', img: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=2000', type: 'WebGL Experience' },
    { name: 'Cyber Deck', img: 'https://images.unsplash.com/photo-1550745165-9010d4506900?q=80&w=2000', type: 'Hardware Design' },
  ];

  if (!isLoaded) return (
    <div className="h-screen bg-black text-white flex items-center justify-center font-mono text-xs">
      <div className="text-center">
        <div className="text-6xl font-black mb-4">LOADING_ASSETS</div>
        <p className="font-mono text-sm">INITIALIZING RENDER ENGINE...</p>
        <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden mt-4 mx-auto">
          <div className="boot-bar w-0 h-full bg-[#ccff00]"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="bg-black text-white overflow-hidden relative">
      {/* 0. GLOBAL LAYERS */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999]" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>
      
      {/* CUSTOM CURSOR */}
      <div ref={cursorRef} className="fixed w-4 h-4 bg-[#ccff00] rounded-full pointer-events-none z-[9999] top-0 left-0 -translate-x-1/2 -translate-y-1/2 mix-blend-difference" />
      <div ref={cursorLabelRef} className="fixed pointer-events-none z-[9999] top-0 left-0 text-black font-black text-[10px] uppercase opacity-0 -translate-x-1/2 -translate-y-1/2">View</div>
      
      {/* CUSTOM CURSOR 2 */}
      <div ref={cursorRef2} className="fixed w-8 h-8 border-2 border-white rounded-full pointer-events-none z-50 mix-blend-difference top-0 left-0 -translate-x-1/2 -translate-y-1/2 hidden md:block" />
      <div ref={cursorTextRef} className="fixed pointer-events-none z-[100] text-[#FF3333] font-mono text-[10px] top-4 left-4 mix-blend-difference hidden md:block">
        RAW_INPUT
      </div>

      {/* FIXED NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference">
        <div className="font-black text-xl tracking-tighter">OLYMPUS</div>
        <div className="flex gap-4">
          <div className="hidden md:flex gap-8 text-xs font-mono">
            <button className="hover:text-[#ccff00]">INDEX</button>
            <button className="hover:text-[#ccff00]">PROJECTS</button>
            <button className="hover:text-[#ccff00]">SIMULATION</button>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X className="w-6 h-6" /> : <MenuLucide className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex items-center justify-center">
          <div className="text-center">
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-2xl">✕</button>
            <div className="flex flex-col gap-8 text-4xl font-bold">
              <a href="#" className="hover:text-[#ccff00]">HOME</a>
              <a href="#" className="hover:text-[#ccff00]">WORK</a>
              <a href="#" className="hover:text-[#ccff00]">ABOUT</a>
              <a href="#" className="hover:text-[#ccff00]">CONTACT</a>
            </div>
          </div>
        </div>
      )}

      {/* --- CONTENT START --- */}
      <main className="relative z-10 bg-[#030303] mb-[100vh]">
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
              <br />
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
            {projects.map((project, i) => (
              <div key={i} className="h-item w-[60vw] h-[70vh] relative group interactive" data-label="OPEN">
                <img src={project.img} className="w-full h-full object-cover brightness-50 group-hover:brightness-100 transition-all duration-500" />
                <div className="absolute -bottom-16 left-0">
                  <h2 className="text-8xl font-black text-transparent text-stroke group-hover:text-white transition-colors">{i + 1}</h2>
                  <p className="font-mono text-sm">{project.type}</p>
                </div>
              </div>
            ))}
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
                  {Array(36).fill(0).map((_, i) => <div key={i} className="bg-blue-500/20 rounded-sm"></div>)}
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
            <h2 className="text-6xl font-black">SYSTEM<br />NODES</h2>
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
              FUTURE<br />PROOF
            </h1>
          </div>
        </section>

        {/* SECTION 8: PARALLAX COLUMNS GALLERY */}
        <section className="gallery-section min-h-[150vh] bg-[#111] overflow-hidden relative flex justify-center gap-4 md:gap-8 py-24">
          <div className="col-1 w-[25vw] flex flex-col gap-8 -mt-24">
            {IMAGES.slice(0, 3).map((img, i) => (
              <img key={i} src={img} className="w-full h-[60vh] object-cover rounded-lg opacity-80" />
            ))}
          </div>
          <div className="col-2 w-[25vw] flex flex-col gap-8 mt-24">
            <img src={IMAGES[3]} className="w-full h-[50vh] object-cover rounded-lg opacity-80" />
            <div className="h-[40vh] bg-[#FF3333] rounded-lg flex items-center justify-center text-black font-bold text-4xl p-4 text-center">
              PURE<br />CHAOS
            </div>
            <img src={IMAGES[4]} className="w-full h-[60vh] object-cover rounded-lg opacity-80" />
          </div>
          <div className="col-3 w-[25vw] flex flex-col gap-8 -mt-12">
            {IMAGES.slice(5, 8).map((img, i) => (
              <img key={i} src={img} className="w-full h-[60vh] object-cover rounded-lg opacity-80" />
            ))}
          </div>
        </section>

        {/* SECTION 9: HORIZONTAL SCROLL (PROJECTS) */}
        <section className="horizontal-scroll-section h-screen bg-white text-black relative overflow-hidden">
          <div className="absolute top-12 left-12 z-20">
            <h2 className="text-6xl font-black tracking-tighter">SELECTED<br />WORKS</h2>
          </div>
          <div className="horizontal-container flex h-full w-max">
            {projects.map((project, i) => (
              <div key={i} className="w-[80vw] md:w-[60vw] h-full flex items-center justify-center p-12 border-r border-black/10">
                <div className="w-full h-[60%] relative group cursor-pointer">
                  <img src={project.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute -bottom-16 left-0">
                    <h3 className="text-4xl font-bold">{project.name}</h3>
                    <p className="font-mono text-gray-500">{project.type}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="w-[50vw] h-full flex items-center justify-center bg-[#FF3333] text-white">
              <div className="text-center group cursor-pointer">
                <div className="border-4 border-white rounded-full p-8 inline-block mb-8 group-hover:bg-white group-hover:text-[#FF3333] transition-colors">
                  <ArrowUpRight size={64} />
                </div>
                <h3 className="text-6xl font-black">VIEW ALL</h3>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10: MARQUEE RIBBON */}
        <section className="py-20 bg-white text-black overflow-hidden border-y-8 border-black">
          <div className="marquee-track flex whitespace-nowrap gap-12">
            {Array(10).fill("DIGITAL • CREATIVE • MOTION • CODE • ").map((item, i) => (
              <span key={i} className="text-8xl font-black tracking-tighter">{item}</span>
            ))}
          </div>
        </section>

        {/* SECTION 11: VIDEO EXPAND */}
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

        {/* SECTION 12: FEATURES */}
        <section className="color-shift-trigger min-h-screen bg-gradient-to-b from-black to-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Next-Level Features
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Built with the most advanced animation techniques and optimized for performance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 interactive"
                  data-label="LEARN MORE"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 13: STATS */}
        <section className="min-h-screen bg-gradient-to-r from-purple-900/20 to-pink-900/20 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center"
                >
                  <div className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 14: INTERACTIVE SHOWCASE */}
        <section className="min-h-screen bg-black py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Interactive Showcase
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Hover, click, and scroll to experience the magic
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-white/10 overflow-hidden interactive"
                  data-label="VIEW DETAILS"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />

                  <img
                    src={`https://placehold.co/400x300/1f2937/ffffff?text=Demo+${index + 1}`}
                    alt={`Demo ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />

                  <h3 className="text-xl font-bold mb-4 text-white">Animation Demo {index + 1}</h3>
                  <p className="text-gray-400 mb-4">Interactive animation with physics-based motion</p>

                  <button className="flex items-center space-x-2 text-purple-400 hover:text-pink-400 transition-colors">
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 15: PARALLAX GRID */}
        <section className="color-shift-trigger py-32 px-4 md:px-12">
          <div className="text-center mb-24">
            <h2 className="text-sm font-mono tracking-widest uppercase mb-4 text-cyan-500">Case Studies</h2>
            <h3 className="text-6xl font-bold">Selected Works</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {IMAGES.slice(0, 3).map((img, i) => (
              <div key={i} className="space-y-4 mt-12 md:mt-0">
                <div className="parallax-img h-[60vh] w-full bg-neutral-800 overflow-hidden relative group">
                  <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" alt="Work" />
                </div>
                <div className="flex justify-between items-end border-b border-white/20 pb-4">
                  <h4 className="text-3xl font-bold">Project {i + 1}</h4>
                  <span className="text-xs font-mono">202{i + 4}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 16: THE VORTEX (Scale Effect) */}
        <section className="vortex-container h-screen flex items-center justify-center overflow-hidden relative bg-black">
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none mix-blend-difference text-white">
            <h2 className="text-4xl md:text-8xl font-black text-center">
              ENTER THE<br />NEXT PHASE
            </h2>
          </div>
          <div className="vortex-circle w-64 h-64 rounded-full bg-white z-10"></div>
        </section>

        {/* SECTION 17: PINNED MANIFESTO */}
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
              <img src={IMAGES[8]} className="w-2/3 h-2/3 object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Landscape" />
            </div>
          </div>
        </section>

        {/* SECTION 18: INTERACTIVE SERVICES LIST (Hover Trail) */}
        <section className="py-32 px-6 bg-[#050505] relative overflow-hidden cursor-none">
          <div className="service-float-img fixed top-0 left-0 w-[300px] h-[400px] bg-cover bg-center pointer-events-none z-50 rounded-lg opacity-0 scale-0 origin-center" style={{ transform: 'translate(-50%, -50%)' }}></div>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xs font-mono text-gray-500 mb-12 uppercase tracking-[0.5em]">Our Expertise</h2>
            {services.map((service, i) => (
              <div key={i} className="service-row border-t border-white/10 py-16 group hover:pl-12 transition-all duration-500 cursor-pointer" data-img={service.img}>
                <div className="flex justify-between items-center">
                  <h3 className="text-5xl md:text-8xl font-black text-gray-700 group-hover:text-white transition-colors duration-300 uppercase">
                    {service.name}
                  </h3>
                  <ArrowUpRight className="text-gray-700 group-hover:text-[#FF3333] w-12 h-12 transition-colors" />
                </div>
              </div>
            ))}
            <div className="border-t border-white/10"></div>
          </div>
        </section>

        {/* SECTION 19: FOOTER REVEAL */}
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
      </main>

      {/* FOOTER (THE CURTAIN REVEAL) */}
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
              2045 CYBER BLVD<br />
              NEO TOKYO, JP<br />
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

      {/* Global Style for Outline Text */}
      <style jsx global>{`
        .font-outline-2 {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.5);
          color: transparent;
        }
        .font-outline-2:hover {
          -webkit-text-stroke: 2px #fff;
        }
        .text-stroke {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
        }
        .text-stroke:hover {
          -webkit-text-stroke: 1px #ccff00;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .will-change-transform {
          will-change: transform;
        }
        .mix-blend-overlay {
          mix-blend-mode: overlay;
        }
        .mix-blend-difference {
          mix-blend-mode: difference;
        }
        .mix-blend-screen {
          mix-blend-mode: screen;
        }
        .clip-window {
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
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