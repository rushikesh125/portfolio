'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import React from "react"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Lenis from 'lenis';
import { 
  ArrowRight, Sparkles, Zap, Globe, Box, Layers, Terminal,
  Cpu, Eye, Brain, Infinity, Star, Rocket, Wand2, Lock,
  Fingerprint, Target, TrendingUp, Code, Shield, ChevronDown,
  Play, Maximize, Circle, Triangle, Square, Hexagon, Github,
  Linkedin, Twitter, Mail, ExternalLink, ArrowUpRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// --- SCRAMBLE TEXT COMPONENT ---
const ScrambleText = ({ text, className, delay = 0 }) => {
  const [display, setDisplay] = useState(text);
  const chars = '!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  useEffect(() => {
    let iterations = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplay(
          text.split('').map((letter, index) => {
            if (letter === ' ') return ' ';
            if (index < iterations) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('')
        );
        if (iterations >= text.length) clearInterval(interval);
        iterations += 1 / 3;
      }, 30);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span className={className}>{display}</span>;
};

// --- MAGNETIC BUTTON COMPONENT ---
const MagneticButton = ({ children, className }) => {
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </button>
  );
};

export default function UltimateGSAPShowcase() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // --- PRELOADER ---
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => setIsLoaded(true), 800);
      }
      setLoadingProgress(Math.floor(progress));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // --- SMOOTH SCROLL & CURSOR ---
  useEffect(() => {
    if (!isLoaded) return;

    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Custom Cursor
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out'
      });
      gsap.to(cursorDotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      });
    };

    const hoverLinks = () => {
      document.querySelectorAll('a, button, .hoverable').forEach(el => {
        el.addEventListener('mouseenter', () => {
          gsap.to(cursorRef.current, { scale: 2, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
        });
      });
    };

    window.addEventListener('mousemove', moveCursor);
    hoverLinks();

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [isLoaded]);

  // --- MASTER GSAP ANIMATIONS ---
  useLayoutEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {

      // ===== HERO ANIMATIONS =====
      
      // Title reveal with stagger
      gsap.from('.hero-title .word', {
        y: 200,
        opacity: 0,
        rotationX: -90,
        stagger: 0.1,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.5
      });

      // Floating orbs
      gsap.to('.floating-orb', {
        y: (i) => -50 - (i * 20),
        x: (i) => Math.sin(i) * 50,
        rotation: 360,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.3
      });

      // Hero background parallax
      gsap.to('.hero-bg', {
        yPercent: 50,
        scale: 1.2,
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });

      // Noise grain animation
      gsap.to('.noise-grain', {
        backgroundPosition: '100% 100%',
        duration: 0.2,
        repeat: -1,
        ease: 'steps(10)'
      });

      // ===== STATS COUNTER =====
      
      gsap.utils.toArray('.stat-number').forEach(stat => {
        const target = stat.getAttribute('data-target');
        gsap.to(stat, {
          textContent: target,
          duration: 2,
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: stat,
            start: 'top 80%'
          },
          onUpdate: function() {
            stat.textContent = Math.ceil(stat.textContent).toLocaleString();
          }
        });
      });

      // ===== CARDS STACK EFFECT =====
      
      const cards = gsap.utils.toArray('.stack-card');
      cards.forEach((card, i) => {
        const isLast = i === cards.length - 1;
        
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          pin: true,
          pinSpacing: false,
          endTrigger: isLast ? '.stack-section' : cards[i + 1],
          end: isLast ? 'bottom bottom' : 'top top',
        });

        if (!isLast) {
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.5,
            filter: 'blur(3px)',
            scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top bottom',
              end: 'top top',
              scrub: true
            }
          });
        }
      });

      // ===== HORIZONTAL SCROLL =====
      
      const horizontalSection = document.querySelector('.horizontal-scroll');
      const panels = gsap.utils.toArray('.h-panel');
      
      if (horizontalSection && panels.length) {
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalSection,
            pin: true,
            scrub: 1,
            snap: {
              snapTo: 1 / (panels.length - 1),
              duration: 0.5,
              ease: 'power1.inOut'
            },
            end: () => '+=' + horizontalSection.offsetWidth * 2.5
          }
        });

        // Panel content animations
        panels.forEach((panel, i) => {
          const content = panel.querySelector('.panel-content');
          const image = panel.querySelector('.panel-image');
          
          gsap.from(content, {
            opacity: 0,
            y: 100,
            scale: 0.8,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: gsap.getById('horizontal'),
              start: 'left center',
              end: 'center center',
              scrub: true
            }
          });

          if (image) {
            gsap.from(image, {
              clipPath: 'inset(100% 0% 0% 0%)',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: gsap.getById('horizontal'),
                start: 'left right',
                end: 'left center',
                scrub: true
              }
            });
          }
        });
      }

      // ===== TEXT REVEALS WITH CLIP MASK =====
      
      gsap.utils.toArray('.text-reveal').forEach(text => {
        gsap.from(text, {
          clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 80%'
          }
        });
      });

      // ===== IMAGE PARALLAX =====
      
      gsap.utils.toArray('.parallax-img').forEach(img => {
        gsap.to(img, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

      // ===== SVG PATH DRAWING =====
      
      gsap.utils.toArray('.draw-svg').forEach(path => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: path,
            start: 'top 70%',
            end: 'bottom center',
            scrub: 1
          }
        });
      });

      // ===== MORPHING BLOB =====
      
      const morphTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.morph-section',
          start: 'top center',
          end: 'bottom center',
          scrub: 2,
          pin: true
        }
      });

      morphTimeline
        .to('.morph-blob', {
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          rotate: 120,
          scale: 1.5,
          backgroundColor: '#ec4899'
        })
        .to('.morph-blob', {
          borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
          rotate: 240,
          scale: 1.2,
          backgroundColor: '#8b5cf6'
        })
        .to('.morph-blob', {
          borderRadius: '50% 50% 50% 50%',
          rotate: 360,
          scale: 2,
          backgroundColor: '#3b82f6'
        });

      // ===== GRID ANIMATION =====
      
      gsap.utils.toArray('.grid-item').forEach((item, i) => {
        gsap.from(item, {
          scale: 0,
          opacity: 0,
          rotation: 180,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          duration: 0.5,
          delay: (i % 12) * 0.05,
          ease: 'back.out(1.7)'
        });
      });

      // ===== SPLIT TEXT ANIMATION =====
      
      gsap.utils.toArray('.split-text').forEach(text => {
        const chars = text.textContent.split('');
        text.innerHTML = chars.map(char => 
          `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
        
        gsap.from(text.querySelectorAll('span'), {
          opacity: 0,
          y: 50,
          rotationX: -90,
          stagger: 0.02,
          scrollTrigger: {
            trigger: text,
            start: 'top 75%',
            end: 'top 25%',
            scrub: 1
          }
        });
      });

      // ===== CIRCULAR TEXT =====
      
      gsap.to('.rotate-text', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
      });

      // ===== ACCORDION ITEMS =====
      
      gsap.utils.toArray('.accordion-item').forEach(item => {
        gsap.from(item, {
          x: -100,
          opacity: 0,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          duration: 0.8,
          ease: 'power3.out'
        });
      });

      // ===== STICKY ELEMENTS =====
      
      gsap.utils.toArray('.sticky-item').forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top top',
          end: 'bottom top',
          pin: true,
          pinSpacing: false
        });
      });

      // ===== PARTICLES EXPLOSION =====
      
      gsap.from('.particle-item', {
        scale: 0,
        opacity: 0,
        x: () => gsap.utils.random(-300, 300),
        y: () => gsap.utils.random(-300, 300),
        rotation: () => gsap.utils.random(-360, 360),
        stagger: 0.02,
        scrollTrigger: {
          trigger: '.particle-section',
          start: 'top center',
          end: 'center center',
          scrub: 1
        }
      });

      // ===== FOOTER REVEAL =====
      
      ScrollTrigger.create({
        trigger: '.footer-trigger',
        start: 'top bottom',
        end: 'bottom bottom',
        onEnter: () => {
          gsap.to('.main-footer', {
            yPercent: 0,
            duration: 1,
            ease: 'power3.inOut'
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // --- PRELOADER UI ---
  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="text-[20vw] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            {loadingProgress}%
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
        <p className="text-sm font-mono text-gray-500 mt-8 animate-pulse tracking-[0.5em]">
          <ScrambleText text="INITIALIZING EXPERIENCE" delay={500} />
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-black text-white relative overflow-hidden">
      
      {/* CUSTOM CURSOR */}
      <div 
        ref={cursorRef}
        className="fixed w-10 h-10 border-2 border-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div 
        ref={cursorDotRef}
        className="fixed w-1 h-1 bg-cyan-400 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* NOISE TEXTURE OVERLAY */}
      <div className="noise-grain fixed inset-0 opacity-[0.03] pointer-events-none z-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      {/* ========== SECTION 1: HERO (100vh) ========== */}
      <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="hero-bg absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black" />
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-30"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-colorful-paint-drops-flowing-in-water-51382-large.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0 z-10">
          <div className="floating-orb absolute top-20 left-[10%] w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 blur-3xl opacity-50" />
          <div className="floating-orb absolute top-40 right-[15%] w-40 h-40 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 blur-3xl opacity-50" />
          <div className="floating-orb absolute bottom-32 left-[20%] w-36 h-36 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 blur-3xl opacity-50" />
          <div className="floating-orb absolute bottom-40 right-[25%] w-44 h-44 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 blur-3xl opacity-50" />
        </div>

        {/* Content */}
        <div className="relative z-20 text-center px-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2 border border-cyan-400/50 rounded-full mb-12 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-mono text-cyan-400 tracking-wider">AWARD WINNING STUDIO</span>
          </div>

          {/* Title */}
          <h1 className="hero-title text-[15vw] md:text-[12vw] font-black leading-[0.85] mb-8 tracking-tighter">
            <div className="word overflow-hidden inline-block">
              <div className="inline-block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                CREATE
              </div>
            </div>
            <br />
            <div className="word overflow-hidden inline-block">
              <div className="inline-block font-outline-2 text-transparent border-2 border-white">
                THE
              </div>
            </div>
            <br />
            <div className="word overflow-hidden inline-block">
              <div className="inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                IMPOSSIBLE
              </div>
            </div>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            We architect digital experiences that defy physics, bend reality, 
            and leave lasting impressions. Welcome to the future of web interaction [web:19][web:22].
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <MagneticButton className="hoverable group px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-lg font-bold flex items-center gap-3 hover:shadow-2xl hover:shadow-purple-500/50 transition-shadow">
              View Our Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </MagneticButton>
            <MagneticButton className="hoverable px-10 py-5 border-2 border-white/20 rounded-full text-lg font-bold backdrop-blur-sm hover:bg-white/10 transition-colors">
              Get in Touch
            </MagneticButton>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
            <span className="text-xs font-mono text-gray-500 tracking-widest">SCROLL TO EXPLORE</span>
            <ChevronDown className="w-6 h-6 text-gray-500" />
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: MARQUEE (15vh) ========== */}
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-600 py-8 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="flex">
              {['CUTTING EDGE', 'INNOVATION', 'DESIGN EXCELLENCE', 'PERFORMANCE', 'USER FIRST', 'AWARD WINNING'].map((text, i) => (
                <div key={i} className="inline-flex items-center mx-8">
                  <span className="text-4xl md:text-6xl font-black text-white/20">
                    {text}
                  </span>
                  <Star className="w-8 h-8 mx-8 text-white/20 fill-white/20" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ========== SECTION 3: STATS (60vh) ========== */}
      <section className="min-h-[60vh] flex items-center justify-center bg-black py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24 px-6">
          {[
            { icon: <Target />, value: 147, label: 'Projects Launched', suffix: '+' },
            { icon: <Eye />, value: 98, label: 'Client Satisfaction', suffix: '%' },
            { icon: <Star />, value: 23, label: 'Awards Won', suffix: '' },
            { icon: <Globe />, value: 45, label: 'Countries Reached', suffix: '+' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="flex justify-center mb-6 text-purple-400">
                {React.cloneElement(stat.icon, { size: 48 })}
              </div>
              <div className="text-6xl md:text-7xl font-black mb-3">
                <span className="stat-number bg-gradient-to-br from-cyan-400 to-purple-500 bg-clip-text text-transparent" data-target={stat.value}>
                  0
                </span>
                <span className="bg-gradient-to-br from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== SECTION 4: INTRO STATEMENT (80vh) ========== */}
      <section className="min-h-[80vh] flex items-center justify-center bg-white text-black py-32 px-6">
        <div className="max-w-6xl">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="w-full md:w-1/3">
              <div className="sticky top-32">
                <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center mb-6">
                  <Brain className="w-16 h-16 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Philosophy</h3>
                <p className="text-gray-600">
                  Every pixel matters. Every interaction counts. Every experience should be unforgettable.
                </p>
              </div>
            </div>
            <div className="w-full md:w-2/3 space-y-8">
              <h2 className="text-5xl md:text-7xl font-black leading-[0.95] text-reveal">
                WE DON'T JUST BUILD WEBSITES.
              </h2>
              <p className="text-2xl md:text-4xl font-medium leading-tight text-gray-700">
                We craft <span className="text-blue-600 font-bold">digital symphonies</span> where 
                code meets creativity, where design dances with development, and where 
                <span className="text-purple-600 font-bold"> user experience transcends expectations</span> [web:22][web:25].
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                From Fortune 500 companies to ambitious startups, we've helped brands 
                transform their digital presence into competitive advantages. Our secret? 
                An obsessive attention to detail combined with bleeding-edge technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 5: CARD STACK (300vh) ========== */}
      <section className="stack-section relative bg-black py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-24">
            <ScrambleText text="OUR APPROACH" />
          </h2>
          
          {[
            {
              number: '01',
              title: 'DISCOVER',
              desc: 'We dive deep into your brand, audience, and objectives. Through workshops and research, we uncover opportunities that others miss.',
              icon: <Eye />,
              color: 'from-blue-500 to-cyan-500',
              img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
            },
            {
              number: '02',
              title: 'DESIGN',
              desc: 'Our designers create experiences that are both beautiful and functional. Every element serves a purpose, every interaction tells a story.',
              icon: <Wand2 />,
              color: 'from-purple-500 to-pink-500',
              img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop'
            },
            {
              number: '03',
              title: 'DEVELOP',
              desc: 'We build with cutting-edge technology. From React to WebGL, we use the best tools to create fast, scalable, and maintainable solutions.',
              icon: <Code />,
              color: 'from-green-500 to-emerald-500',
              img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop'
            },
            {
              number: '04',
              title: 'DELIVER',
              desc: 'Launch is just the beginning. We optimize, iterate, and evolve your product to ensure it continues to exceed expectations.',
              icon: <Rocket />,
              color: 'from-orange-500 to-red-500',
              img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop'
            }
          ].map((card, i) => (
            <div key={i} className="stack-card h-screen flex items-center justify-center mb-24 last:mb-0">
              <div className="w-full bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 border border-white/10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center gap-6 mb-6">
                      <span className="text-7xl font-black text-transparent font-outline">
                        {card.number}
                      </span>
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${card.color}`}>
                        {React.cloneElement(card.icon, { size: 40, className: 'text-white' })}
                      </div>
                    </div>
                    <h3 className="text-5xl font-black mb-6">{card.title}</h3>
                    <p className="text-xl text-gray-400 leading-relaxed">{card.desc}</p>
                  </div>
                  <div className="relative h-96 rounded-2xl overflow-hidden">
                    <img 
                      src={card.img} 
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${card.color} opacity-20`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== SECTION 6: HORIZONTAL SCROLL WORK (100vh) ========== */}
      <section className="horizontal-scroll h-screen w-full overflow-hidden bg-neutral-900 relative">
        <div className="absolute top-12 left-12 z-20 mix-blend-difference">
          <h3 className="text-3xl font-black text-white tracking-tight">SELECTED WORKS</h3>
          <p className="text-sm font-mono text-gray-400 mt-2">2024 - 2025</p>
        </div>
        
        <div className="flex h-full w-[500vw]" id="horizontal">
          {[
            {
              title: 'NEXUS',
              category: 'FINTECH',
              tags: ['WebGL', '3D', 'Real-time'],
              img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
              desc: 'Revolutionary banking platform with real-time 3D data visualization'
            },
            {
              title: 'AURORA',
              category: 'E-COMMERCE',
              tags: ['Next.js', 'AR', 'Mobile'],
              img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
              desc: 'Luxury fashion marketplace with augmented reality try-on'
            },
            {
              title: 'VELOCITY',
              category: 'AUTOMOTIVE',
              tags: ['Three.js', 'Configurator', 'AI'],
              img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=800&fit=crop',
              desc: 'Interactive car configurator with AI-powered recommendations'
            },
            {
              title: 'ZENITH',
              category: 'SAAS',
              tags: ['React', 'Dashboard', 'Analytics'],
              img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop',
              desc: 'Enterprise analytics platform with beautiful data storytelling'
            },
            {
              title: 'MANIFESTO',
              category: 'PHILOSOPHY',
              tags: ['Brand', 'Strategy', 'Future'],
              img: null,
              desc: 'The future belongs to those who dare to imagine it differently'
            }
          ].map((work, i) => (
            <div key={i} className="h-panel w-screen h-full flex items-center justify-center relative border-r border-white/5 px-24">
              {work.img ? (
                <>
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={work.img} 
                      alt={work.title}
                      className="panel-image w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 hover:opacity-50 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  </div>
                  
                  <div className="panel-content relative z-10 text-center">
                    <div className="mb-6">
                      <span className="px-6 py-2 border border-white/30 rounded-full text-xs font-mono uppercase tracking-wider">
                        {work.category}
                      </span>
                    </div>
                    <h2 className="text-[12vw] font-black mb-6 leading-none">{work.title}</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">{work.desc}</p>
                    <div className="flex gap-4 justify-center flex-wrap">
                      {work.tags.map((tag, j) => (
                        <span key={j} className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="hoverable mt-12 group px-8 py-4 border-2 border-white rounded-full flex items-center gap-3 mx-auto hover:bg-white hover:text-black transition-all">
                      View Case Study
                      <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="panel-content bg-gradient-to-br from-cyan-400 to-purple-600 w-full h-full flex flex-col items-center justify-center text-black p-24">
                  <Infinity className="w-32 h-32 mb-12" />
                  <h2 className="text-6xl md:text-8xl font-black text-center leading-tight mb-8">
                    {work.desc}
                  </h2>
                  <p className="text-2xl font-medium opacity-80">
                    - Our Manifesto
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========== SECTION 7: MORPH BLOB (100vh) ========== */}
      <section className="morph-section h-screen flex flex-col items-center justify-center bg-black">
        <h2 className="text-6xl font-black mb-16 text-center">
          <ScrambleText text="FLUID DYNAMICS" />
        </h2>
        <div className="morph-blob w-64 h-64 bg-cyan-500 shadow-2xl" />
        <p className="text-xl text-gray-400 mt-16 max-w-2xl text-center px-6">
          Liquid morphing animations that flow like water. This technique creates 
          organic transitions that feel alive and responsive to your scroll [web:21][web:24].
        </p>
      </section>

      {/* ========== SECTION 8: SVG PATH ANIMATION (100vh) ========== */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-blue-900/10 to-black py-32">
        <h2 className="text-6xl font-black mb-16 text-center">
          <ScrambleText text="DRAW THE FUTURE" />
        </h2>
        <svg className="w-full max-w-5xl h-96 px-6" viewBox="0 0 1000 400">
          <defs>
            <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <path 
            className="draw-svg"
            d="M 50 200 Q 150 50 250 200 T 450 200 Q 550 300 650 200 T 850 200 Q 900 100 950 200"
            fill="none"
            stroke="url(#path-gradient)"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
        <p className="text-2xl text-gray-400 max-w-3xl text-center px-6 mt-12">
          Vector paths that draw themselves as you scroll. Perfect for infographics, 
          logos, and creative storytelling [web:21].
        </p>
      </section>

      {/* ========== SECTION 9: GRID SHOWCASE (100vh) ========== */}
      <section className="min-h-screen bg-white text-black py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-black mb-4 text-center">
            <ScrambleText text="TECHNOLOGIES" />
          </h2>
          <p className="text-xl text-gray-600 text-center mb-20 max-w-3xl mx-auto">
            We work with the most advanced tools and frameworks to build 
            experiences that are fast, scalable, and future-proof.
          </p>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {[
              { icon: <Code />, name: 'React', color: 'from-cyan-400 to-blue-500' },
              { icon: <Terminal />, name: 'Next.js', color: 'from-gray-700 to-black' },
              { icon: <Box />, name: 'Three.js', color: 'from-purple-500 to-pink-500' },
              { icon: <Layers />, name: 'GSAP', color: 'from-green-400 to-emerald-500' },
              { icon: <Globe />, name: 'WebGL', color: 'from-orange-400 to-red-500' },
              { icon: <Zap />, name: 'TypeScript', color: 'from-blue-500 to-cyan-400' },
              { icon: <Cpu />, name: 'Node.js', color: 'from-green-600 to-lime-500' },
              { icon: <Shield />, name: 'Security', color: 'from-red-500 to-pink-500' },
              { icon: <Target />, name: 'Testing', color: 'from-yellow-400 to-orange-500' },
              { icon: <TrendingUp />, name: 'Analytics', color: 'from-purple-400 to-indigo-500' },
              { icon: <Lock />, name: 'Auth', color: 'from-rose-500 to-red-600' },
              { icon: <Fingerprint />, name: 'AI/ML', color: 'from-cyan-500 to-purple-600' }
            ].map((tech, i) => (
              <div 
                key={i} 
                className="grid-item aspect-square bg-black text-white rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:scale-105 transition-transform cursor-pointer"
              >
                <div className={`p-4 rounded-xl bg-gradient-to-br ${tech.color}`}>
                  {React.cloneElement(tech.icon, { size: 32 })}
                </div>
                <span className="text-sm font-bold">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 10: SERVICES ACCORDION (100vh) ========== */}
      <section className="min-h-screen bg-black py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20">
            <span className="text-sm font-mono text-cyan-400 uppercase tracking-widest">WHAT WE DO</span>
            <h2 className="text-6xl font-black mt-4 mb-6">
              <ScrambleText text="CAPABILITIES" />
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl">
              From concept to launch, we handle every aspect of digital product development 
              with precision and creativity [web:25].
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                id: '01',
                title: 'Brand Identity & Strategy',
                desc: 'We create cohesive brand systems that resonate with your audience. From logo design to brand guidelines, we ensure every touchpoint reflects your values.',
                tags: ['Logo Design', 'Brand Guidelines', 'Typography', 'Color Systems']
              },
              {
                id: '02',
                title: 'UX/UI Design',
                desc: 'User-centered design that balances aesthetics with functionality. We create interfaces that are intuitive, accessible, and delightful to use.',
                tags: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
              },
              {
                id: '03',
                title: 'Web Development',
                desc: 'Cutting-edge web applications built with modern frameworks. Fast, scalable, and maintainable code that grows with your business.',
                tags: ['React', 'Next.js', 'TypeScript', 'API Integration']
              },
              {
                id: '04',
                title: 'Motion Design',
                desc: 'Animations that enhance user experience and tell your story. From micro-interactions to full-screen experiences, we make your product come alive.',
                tags: ['GSAP', 'Lottie', 'After Effects', 'WebGL']
              },
              {
                id: '05',
                title: 'Performance Optimization',
                desc: 'Speed matters. We optimize every aspect of your site to ensure lightning-fast load times and smooth interactions across all devices.',
                tags: ['Core Web Vitals', 'SEO', 'Caching', 'CDN Setup']
              }
            ].map((service, i) => (
              <div 
                key={i} 
                className="accordion-item group border-t border-white/10 py-8 hover:bg-white/5 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-8">
                  <span className="text-5xl font-black text-transparent font-outline group-hover:text-cyan-400 transition-colors">
                    {service.id}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-5xl font-bold mb-4 group-hover:translate-x-4 transition-transform">
                      {service.title}
                    </h3>
                    <p className="text-lg text-gray-400 mb-6 max-w-3xl">
                      {service.desc}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {service.tags.map((tag, j) => (
                        <span key={j} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronDown className="w-8 h-8 text-cyan-400 -rotate-90 group-hover:rotate-0 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 11: SPLIT TEXT QUOTE (80vh) ========== */}
      <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-blue-900 py-32 px-6">
        <div className="max-w-6xl text-center">
          <blockquote className="text-5xl md:text-7xl font-black leading-tight mb-12">
            <p className="split-text">
              "DESIGN IS NOT JUST WHAT IT LOOKS LIKE. DESIGN IS HOW IT WORKS."
            </p>
          </blockquote>
          <cite className="text-2xl text-gray-400 not-italic">- Steve Jobs</cite>
        </div>
      </section>

      {/* ========== SECTION 12: PARTICLE EXPLOSION (100vh) ========== */}
      <section className="particle-section min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden py-32">
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-4 p-8">
          {Array.from({ length: 100 }).map((_, i) => (
            <div 
              key={i}
              className="particle-item w-full h-full rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600"
            />
          ))}
        </div>
        
        <div className="relative z-10 text-center px-6">
          <h2 className="text-7xl md:text-9xl font-black mb-8">
            INFINITE
          </h2>
          <h3 className="text-5xl md:text-7xl font-black text-transparent font-outline mb-12">
            POSSIBILITIES
          </h3>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            Every project is an opportunity to push boundaries and explore new 
            territories in digital design [web:19][web:22].
          </p>
        </div>
      </section>

      {/* ========== SECTION 13: TESTIMONIALS (100vh) ========== */}
      <section className="min-h-screen bg-white text-black py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-black text-center mb-20">
            <ScrambleText text="CLIENT LOVE" />
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                quote: "They transformed our vision into reality. The attention to detail and creative problem-solving was exceptional.",
                author: "Sarah Chen",
                role: "CEO, TechVision",
                rating: 5
              },
              {
                quote: "Working with this team was a game-changer. Our conversion rates increased by 340% after the redesign.",
                author: "Michael Torres",
                role: "CMO, GrowthLabs",
                rating: 5
              },
              {
                quote: "Not just developers, but true partners in innovation. They understood our goals and exceeded expectations.",
                author: "Emma Williams",
                role: "Director, InnovateCo",
                rating: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-black text-white rounded-3xl p-10 hover:scale-105 transition-transform">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xl mb-8 leading-relaxed">"{testimonial.quote}"</p>
                <div className="border-t border-white/20 pt-6">
                  <p className="font-bold text-lg">{testimonial.author}</p>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 14: CTA (80vh) ========== */}
      <section className="footer-trigger min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-black to-cyan-900 py-32 px-6">
        <div className="text-center max-w-5xl">
          {/* Rotating Text */}
          <div className="relative w-32 h-32 mx-auto mb-12">
            <svg className="rotate-text w-full h-full" viewBox="0 0 100 100">
              <defs>
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
              </defs>
              <text className="text-[8px] fill-cyan-400 font-mono uppercase tracking-wider">
                <textPath href="#circlePath">
                  LET'S CREATE • LET'S INNOVATE • LET'S BUILD • 
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Rocket className="w-12 h-12 text-cyan-400" />
            </div>
          </div>

          <h2 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            READY TO BUILD<br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              THE FUTURE?
            </span>
          </h2>
          
          <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Let's discuss your project and explore how we can bring your vision to life 
            with cutting-edge design and development.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <MagneticButton className="hoverable group px-12 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-xl font-bold flex items-center gap-3 hover:shadow-2xl hover:shadow-purple-500/50 transition-all">
              Start a Project
              <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </MagneticButton>
            <MagneticButton className="hoverable px-12 py-6 border-2 border-white rounded-full text-xl font-bold hover:bg-white hover:text-black transition-all">
              Schedule a Call
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ========== FOOTER (100vh) ========== */}
      <footer className="main-footer fixed bottom-0 left-0 w-full h-screen bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-600 text-black z-0 translate-y-full">
        <div className="h-full flex flex-col justify-between p-12 md:p-20">
          
          {/* Top Row */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-4xl font-black mb-4">STUDIO</h3>
              <p className="text-lg opacity-80 max-w-xs">
                Crafting digital excellence since 2020
              </p>
            </div>
            <nav className="flex gap-8 text-lg font-bold">
              <a href="#" className="hoverable hover:scale-110 transition-transform">WORK</a>
              <a href="#" className="hoverable hover:scale-110 transition-transform">ABOUT</a>
              <a href="#" className="hoverable hover:scale-110 transition-transform">CONTACT</a>
            </nav>
          </div>

          {/* Center */}
          <div className="text-center">
            <h2 className="text-[15vw] md:text-[12vw] font-black leading-none mb-8 hover:scale-105 transition-transform cursor-pointer">
              LET'S TALK
            </h2>
            <a href="mailto:hello@studio.com" className="text-3xl md:text-5xl font-bold hover:underline">
              hello@studio.com
            </a>
          </div>

          {/* Bottom Row */}
          <div className="flex justify-between items-end">
            <div className="max-w-md">
              <p className="text-sm opacity-80 mb-4">
                © 2025 Studio. All rights reserved. Designed and developed with 
                passion, precision, and an unhealthy amount of coffee.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: <Github />, link: '#' },
                  { icon: <Linkedin />, link: '#' },
                  { icon: <Twitter />, link: '#' },
                  { icon: <Mail />, link: '#' }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.link}
                    className="hoverable w-12 h-12 bg-black/20 rounded-full flex items-center justify-center hover:bg-black/40 transition-colors"
                  >
                    {React.cloneElement(social.icon, { size: 20 })}
                  </a>
                ))}
              </div>
            </div>

            <div className="text-9xl font-black opacity-10 pointer-events-none hidden md:block">
              2025
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
