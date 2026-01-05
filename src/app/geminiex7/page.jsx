'use client';

import { useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip'; // Simulating Flip logic with standard GSAP if not installed
import Lenis from '@studio-freight/lenis';
import { 
  ArrowRight, Play, Maximize, Globe, Cpu, Zap, 
  Aperture, Activity, Anchor, Box, Disc, Command,
  ArrowUpRight, X, Menu, Fingerprint, Ghost, Hexagon, 
  Circle, Layers, MousePointer, Infinity, Code, Terminal
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollTrigger);

// --- ASSETS LIBRARY ---
const ASSETS = {
  vid_ink: "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-286-large.mp4",
  vid_city: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4",
  vid_code: "https://assets.mixkit.co/videos/preview/mixkit-matrix-style-code-falling-down-screen-animation-2751-large.mp4",
  vid_warp: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4",
  img_1: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000",
  img_2: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000",
  img_3: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000",
  img_4: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=2000",
  img_5: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000",
  img_6: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000"
};

// --- COMPONENT: MAGNETIC BUTTON ---
const MagneticButton = ({ children, className }) => {
  const btnRef = useRef(null);
  useEffect(() => {
    const el = btnRef.current;
    if(!el) return;
    const move = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - (left + width / 2)) * 0.3;
      const y = (e.clientY - (top + height / 2)) * 0.3;
      gsap.to(el, { x, y, duration: 0.5, ease: 'power2.out' });
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.3)' });
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', leave);
    };
  }, []);
  return <div ref={btnRef} className={className}>{children}</div>;
};

// --- COMPONENT: SCRAMBLE TEXT ---
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

// --- MAIN PAGE COMPONENT ---
export default function SingularityX() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // --- 1. BOOT SEQUENCE ---
  useEffect(() => {
    const tl = gsap.timeline({ onComplete: () => { setIsLoaded(true); window.scrollTo(0, 0); } });
    tl.to('.boot-bar', { width: '100%', duration: 2, ease: 'power4.inOut' })
      .to('.boot-logo', { scale: 1.5, opacity: 0, duration: 0.5 })
      .to('.boot-screen', { yPercent: -100, duration: 1, ease: 'expo.inOut' });
  }, []);

  // --- 2. CORE SETUP (Lenis, Cursor, WebGL Starfield) ---
  useEffect(() => {
    if (!isLoaded) return;

    // A. LENIS SMOOTH SCROLL (Extended Duration)
    const lenis = new Lenis({
      duration: 2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // B. CUSTOM CURSOR
    const moveCursor = (e) => gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
    window.addEventListener('mousemove', moveCursor);

    // C. CANVAS STARFIELD (The Warp)
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let stars = Array(500).fill().map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width,
      o: '0.'+Math.floor(Math.random() * 99)
    }));

    function drawStars() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        star.z -= 2; // Warp speed
        if (star.z <= 0) star.z = canvas.width;
        const x = (star.x - canvas.width / 2) * (canvas.width / star.z) + canvas.width / 2;
        const y = (star.y - canvas.height / 2) * (canvas.width / star.z) + canvas.height / 2;
        const size = (1 - star.z / canvas.width) * 3;
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(drawStars);
    }
    drawStars();

    return () => lenis.destroy();
  }, [isLoaded]);

  // --- 3. MASTER GSAP TIMELINE ---
  useLayoutEffect(() => {
    if (!isLoaded) return;
    const ctx = gsap.context(() => {
      
      // SECTION 1: HERO TILT
      document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        gsap.to('.hero-3d', { rotationY: x, rotationX: -y, duration: 1 });
      });

      // SECTION 2: THE TIME WARP (Canvas Opacity Link)
      ScrollTrigger.create({
        trigger: '.warp-section',
        start: 'top top',
        end: 'bottom bottom',
        onEnter: () => gsap.to(canvasRef.current, { opacity: 1 }),
        onLeave: () => gsap.to(canvasRef.current, { opacity: 0 }),
        onEnterBack: () => gsap.to(canvasRef.current, { opacity: 1 }),
        onLeaveBack: () => gsap.to(canvasRef.current, { opacity: 0 }),
      });

      // SECTION 3: VELOCITY SKEW
      let proxy = { skew: 0 }, skewSetter = gsap.quickSetter(".skew-item", "skewY", "deg"), clamp = gsap.utils.clamp(-20, 20);
      ScrollTrigger.create({
        trigger: '.velocity-grid',
        onUpdate: (self) => {
          let skew = clamp(self.getVelocity() / -100);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {skew: 0, duration: 1, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
          }
        }
      });

      // SECTION 4: HORIZONTAL DRAG
      const hWrapper = document.querySelector('.h-wrapper');
      const hContent = document.querySelector('.h-content');
      if(hWrapper && hContent) {
        gsap.to(hContent, {
          x: () => -(hContent.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: hWrapper, start: 'top top', end: () => `+=${hContent.scrollWidth}`, pin: true, scrub: 1
          }
        });
      }

      // SECTION 5: PIN & ZOOM (MASK)
      const zoomTl = gsap.timeline({
        scrollTrigger: { trigger: '.zoom-mask-section', start: 'top top', end: '+=200%', pin: true, scrub: true }
      });
      zoomTl.to('.mask-layer', { clipPath: 'circle(100% at 50% 50%)' });

      // SECTION 6: PHYSICS GRAVITY (Simulated)
      // Elements fall into place
      gsap.from('.physics-ball', {
        y: -1000,
        rotation: 360,
        stagger: 0.1,
        duration: 2,
        ease: 'bounce.out',
        scrollTrigger: { trigger: '.physics-section', start: 'top 60%' }
      });

      // SECTION 7: IMAGE TRAIL
      const trailContainer = document.querySelector('.trail-container');
      const trailImg = document.querySelector('.trail-img');
      if(trailContainer) {
        trailContainer.addEventListener('mousemove', (e) => {
          gsap.to(trailImg, { x: e.clientX, y: e.clientY, opacity: 1, scale: 1, duration: 0.2 });
        });
        trailContainer.addEventListener('mouseleave', () => {
          gsap.to(trailImg, { opacity: 0, scale: 0 });
        });
      }

      // SECTION 8: STICKY SIDEBAR
      ScrollTrigger.create({
        trigger: '.sticky-wrapper', start: 'top top', end: 'bottom bottom', pin: '.sticky-sidebar',
      });

      // SECTION 9: COLOR SYNC
      const colors = ['#050505', '#1a0b0b', '#0b1a1a', '#050505'];
      gsap.utils.toArray('.color-section').forEach((sec, i) => {
        ScrollTrigger.create({
          trigger: sec, start: 'top 50%', end: 'bottom 50%',
          onEnter: () => gsap.to('body', { backgroundColor: colors[i % colors.length] }),
          onEnterBack: () => gsap.to('body', { backgroundColor: colors[(i-1 + colors.length) % colors.length] })
        });
      });

      // SECTION 10: PARALLAX STACK
      const cards = gsap.utils.toArray('.stack-card');
      cards.forEach((card, i) => {
        ScrollTrigger.create({ trigger: card, start: "top top", pin: true, pinSpacing: false });
        gsap.to(card, { scale: 0.9, opacity: 0.5, scrollTrigger: { trigger: cards[i+1], start: "top top", end: "bottom top", scrub: true }});
      });

      // SECTION 11: TEXT DISTORTION
      gsap.to('.distort-text', {
        scaleX: 2, opacity: 0, filter: 'blur(10px)',
        scrollTrigger: { trigger: '.distort-wrapper', start: 'top center', end: 'bottom top', scrub: true }
      });

      // SECTION 12: VIDEO SCRUBBER
      const vidScrub = document.querySelector('.scrub-video');
      if(vidScrub) {
        // Ensure video metadata is loaded
        vidScrub.onloadedmetadata = function() {
          let tl = gsap.timeline({ scrollTrigger: { trigger: ".video-scrub-section", start: "top top", end: "bottom bottom", scrub: true }});
          tl.fromTo(vidScrub, { currentTime: 0 }, { currentTime: vidScrub.duration || 10 });
        };
      }

      // SECTION 13: THE VORTEX FINALE
      gsap.to('.vortex-circle', {
        scale: 100,
        scrollTrigger: { trigger: '.vortex-section', start: 'top top', end: '+=100%', pin: true, scrub: true }
      });

    }, containerRef);
    return () => ctx.revert();
  }, [isLoaded]);

  // --- RENDER ---
  return (
    <div ref={containerRef} className="bg-[#050505] text-white selection:bg-[#ff003c] selection:text-white relative">
      
      {/* GLOBAL LAYERS */}
      <div className="noise" />
      <canvas ref={canvasRef} className="canvas-layer fixed top-0 left-0 w-full h-full z-0 opacity-0 pointer-events-none" />
      
      {/* CUSTOM CURSOR */}
      <div ref={cursorRef} className="fixed w-4 h-4 bg-[#ff003c] rounded-full pointer-events-none z-[9999] top-0 left-0 -translate-x-1/2 -translate-y-1/2 mix-blend-difference" />

      {/* BOOT SCREEN */}
      <div className="boot-screen fixed inset-0 z-[10000] bg-black flex flex-col justify-center items-center">
        <div className="boot-logo text-[#ff003c] text-6xl font-black mb-8 tracking-tighter">SINGULARITY X</div>
        <div className="w-64 h-1 bg-[#111] overflow-hidden"><div className="boot-bar w-0 h-full bg-[#ff003c]" /></div>
      </div>

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between mix-blend-difference">
         <div className="font-black tracking-tight text-xl">SG-X</div>
         <Menu />
      </nav>

      <main className="relative z-10 mb-[100vh]">

        {/* 1. HERO 3D TILT */}
        <section className="h-screen flex items-center justify-center perspective-1000 relative overflow-hidden">
             <div className="hero-3d text-center z-10">
                 <div className="text-[#00f3ff] font-mono text-sm mb-4 tracking-[1em]">SYSTEM_READY</div>
                 <h1 className="text-[12vw] font-black leading-[0.8]">
                    <span className="block text-stroke">BEYOND</span>
                    <span className="block text-white">LIMITS</span>
                 </h1>
             </div>
             <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none mix-blend-screen"><source src={ASSETS.vid_ink} /></video>
        </section>

        {/* 2. WARP TUNNEL (HEIGHT FILLER) */}
        <section className="warp-section h-[300vh] relative">
            <div className="sticky top-0 h-screen flex items-center justify-center">
                <h2 className="text-4xl font-mono bg-black/50 p-4 backdrop-blur-md border border-white/10">
                    <ScrambleText text="ENTERING HYPERSPACE" />
                </h2>
            </div>
        </section>

        {/* 3. VELOCITY SKEW GRID */}
        <section className="velocity-grid py-32 px-8 overflow-hidden">
            <h2 className="text-[10vw] font-black mb-12 text-[#ff003c]">MOMENTUM</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1,2,3,4].map((i) => (
                    <div key={i} className="skew-item h-[60vh] bg-[#111] relative overflow-hidden border border-white/10 group">
                        <img src={ASSETS[`img_${i}`]} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                        <div className="absolute bottom-8 left-8 text-4xl font-bold">NODE {i}</div>
                    </div>
                ))}
            </div>
        </section>

        {/* 4. HORIZONTAL DRAG TIMELINE */}
        <section className="h-wrapper h-screen bg-white text-black overflow-hidden relative">
            <div className="h-content flex h-full w-max items-center pl-24 pr-[50vw]">
                {/* Intro Card */}
                <div className="w-[40vw] h-[60vh] shrink-0 mr-24 flex flex-col justify-center">
                    <h2 className="text-8xl font-black">THE<br/>TIMELINE</h2>
                    <p className="text-xl mt-8 max-w-md">A chronological exploration of digital evolution.</p>
                </div>
                {/* Gallery Items */}
                {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="w-[60vw] h-[80vh] bg-[#eee] shrink-0 mr-12 relative overflow-hidden">
                        <img src={ASSETS[`img_${i}`]} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute top-4 left-4 text-9xl font-black text-white mix-blend-overlay">0{i}</div>
                    </div>
                ))}
            </div>
        </section>

        {/* 5. PIN ZOOM MASK */}
        <section className="zoom-mask-section h-screen w-full relative bg-black flex items-center justify-center overflow-hidden">
             <div className="mask-layer absolute inset-0 bg-[#ff003c] z-10 flex items-center justify-center" style={{clipPath: 'circle(10% at 50% 50%)'}}>
                 <video autoPlay muted loop className="w-full h-full object-cover opacity-50"><source src={ASSETS.vid_code} /></video>
                 <h2 className="absolute text-[15vw] font-black text-white mix-blend-overlay">DECODE</h2>
             </div>
             <div className="absolute inset-0 flex items-center justify-center z-0">
                 <h2 className="text-[20vw] font-black text-[#222]">HIDDEN</h2>
             </div>
        </section>

        {/* 6. PHYSICS GRAVITY SIMULATION */}
        <section className="physics-section h-[150vh] bg-[#0a0a0a] relative overflow-hidden border-t border-white/20">
            <div className="absolute inset-0 flex flex-wrap content-end justify-center gap-8 p-12 pointer-events-none">
                {Array(15).fill("PHYSICS").map((t, i) => (
                    <div key={i} className="physics-ball w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#111] border border-white/20 flex items-center justify-center text-xs font-mono">
                        {t}_{i}
                    </div>
                ))}
            </div>
            <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center">
                 <ArrowRight className="rotate-90 w-12 h-12 mx-auto mb-4 text-[#ff003c]" />
                 <p>GRAVITY SIMULATION ACTIVE</p>
            </div>
        </section>

        {/* 7. IMAGE TRAIL & MAGNETIC BUTTONS */}
        <section className="trail-container min-h-screen flex flex-col items-center justify-center relative cursor-none bg-white text-black">
            <img src={ASSETS.img_2} className="trail-img fixed w-64 h-80 object-cover pointer-events-none z-50 opacity-0 scale-0 rounded-lg" />
            
            <h2 className="text-[8vw] font-black z-10 mix-blend-difference mb-12">INTERACTION</h2>
            
            <div className="flex gap-8 z-10">
                <MagneticButton className="px-12 py-6 border-2 border-black rounded-full text-xl font-bold hover:bg-black hover:text-white transition-colors cursor-pointer">
                    HOVER ME
                </MagneticButton>
                <MagneticButton className="px-12 py-6 border-2 border-black rounded-full text-xl font-bold bg-[#ff003c] border-none text-white cursor-pointer">
                    MAGNETIC
                </MagneticButton>
            </div>
        </section>

        {/* 8. STICKY SIDEBAR SCROLL */}
        <section className="sticky-wrapper flex bg-[#050505] text-white">
            <div className="sticky-sidebar w-1/2 h-screen sticky top-0 flex flex-col justify-center p-12 border-r border-white/10">
                <h2 className="text-6xl font-bold mb-8 text-[#00f3ff]">DUAL PANE</h2>
                <p className="text-xl text-gray-400 max-w-md">While the right side flows through time, the left side remains grounded in the present. This creates a contextual anchor.</p>
                <div className="mt-12">
                     <Terminal className="w-12 h-12 text-[#ff003c]" />
                </div>
            </div>
            <div className="w-1/2">
                {[ASSETS.img_3, ASSETS.img_4, ASSETS.img_5].map((img, i) => (
                    <div key={i} className="h-screen flex items-center justify-center p-12 border-b border-white/10">
                        <img src={img} className="w-full h-2/3 object-cover rounded-xl" />
                    </div>
                ))}
            </div>
        </section>

        {/* 9. COLOR SYNC SECTIONS */}
        <div className="color-section h-screen flex items-center justify-center">
            <h2 className="text-9xl font-black text-[#ff003c]">RED</h2>
        </div>
        <div className="color-section h-screen flex items-center justify-center">
            <h2 className="text-9xl font-black text-[#00f3ff]">CYAN</h2>
        </div>
        <div className="color-section h-screen flex items-center justify-center">
            <h2 className="text-9xl font-black text-white">WHITE</h2>
        </div>

        {/* 10. PARALLAX CARD STACK */}
        <section className="py-24 bg-black">
             {[1,2,3,4].map((i) => (
                 <div key={i} className="stack-card h-screen sticky top-0 flex items-center justify-center bg-[#111] border-t border-white/20">
                     <div className="w-[80vw] h-[60vh] bg-black flex items-center justify-center border border-[#333] relative overflow-hidden group">
                         <div className="absolute top-4 left-4 text-6xl font-black text-[#333] group-hover:text-white transition-colors">0{i}</div>
                         <img src={ASSETS[`img_${i}`]} className="w-1/2 h-full object-cover ml-auto opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                     </div>
                 </div>
             ))}
        </section>

        {/* 11. TEXT DISTORTION */}
        <section className="distort-wrapper h-[150vh] flex items-center justify-center bg-white text-black overflow-hidden">
             <h2 className="distort-text text-[20vw] font-black leading-none tracking-tighter origin-center">
                 STRETCH
             </h2>
        </section>

        {/* 12. VIDEO SCRUBBER */}
        <section className="video-scrub-section h-[300vh] bg-black relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <video className="scrub-video w-full h-full object-cover" muted playsInline preload="auto">
                    <source src={ASSETS.vid_city} type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h2 className="text-white text-6xl bg-black/50 p-4 font-mono">SCROLL TO PLAY</h2>
                </div>
            </div>
        </section>

        {/* 13. VORTEX FINALE */}
        <section className="vortex-section h-[200vh] bg-[#ff003c] relative flex items-center justify-center overflow-hidden">
             <div className="vortex-circle w-10 h-10 bg-black rounded-full z-10"></div>
             <h2 className="absolute text-white text-4xl font-bold z-0">INTO THE VOID</h2>
        </section>

        {/* 14. INFINITE MARQUEE */}
        <section className="py-12 bg-black border-y border-white/20">
             <div className="flex whitespace-nowrap overflow-hidden">
                 <div className="animate-marquee flex gap-12 text-8xl font-black text-white/20">
                     {Array(10).fill("SINGULARITY X • ENDLESS • ").map((t, i) => <span key={i}>{t}</span>)}
                 </div>
             </div>
        </section>

      </main>

      {/* FOOTER REVEAL */}
      <footer className="fixed bottom-0 left-0 w-full h-[100vh] bg-[#000] text-white z-0 flex flex-col justify-between p-12">
           <div className="flex justify-between items-start">
               <div className="text-2xl font-black">SG-X</div>
               <div className="text-right text-gray-500 font-mono">
                   <p>SYSTEM STATUS: OFFLINE</p>
                   <p>END OF LINE</p>
               </div>
           </div>
           <div className="text-center">
               <h2 className="text-[15vw] font-black leading-none text-[#ff003c] hover:text-white transition-colors cursor-pointer">
                   REBOOT
               </h2>
           </div>
           <div className="flex justify-between items-end">
               <p className="text-xs text-gray-600">COPYRIGHT 2025</p>
               <Fingerprint className="w-12 h-12 text-[#ff003c]" />
           </div>
      </footer>

      {/* CUSTOM STYLES */}
      <style jsx global>{`
        .animate-marquee { animation: marquee 20s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}