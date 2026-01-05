'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { 
  ArrowUpRight, Menu, X, Globe, Cpu, Zap, 
  Aperture, Hexagon, Fingerprint, Play 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- ASSETS (High Quality Placeholders) ---
const IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000",
  "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=1000",
  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000",
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000",
];

export default function GodModeUltra() {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorTextRef = useRef(null);
  const menuRef = useRef(null);

  // --- 1. PRELOADER SEQUENCE ---
  useEffect(() => {
    // A fake "boot sequence"
    const tl = gsap.timeline({
      onComplete: () => setIsLoaded(true)
    });
    tl.to('.loader-bar', { width: '100%', duration: 1.5, ease: 'expo.inOut' })
      .to('.loader-text', { opacity: 0, duration: 0.5 })
      .to('.loader-screen', { yPercent: -100, duration: 1, ease: 'power4.inOut' });
  }, []);

  // --- 2. SMOOTH SCROLL & CURSOR ---
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

    // Custom Cursor Logic
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(cursorTextRef.current, { x: e.clientX, y: e.clientY, duration: 0.15 });
    };
    window.addEventListener('mousemove', moveCursor);

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [isLoaded]);

  // --- 3. MASTER ANIMATIONS ---
  useLayoutEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {

      // A. HERO REVEAL (Scale up from center)
      gsap.from('.hero-title span', {
        y: 200, skewY: 10, duration: 1.5, stagger: 0.1, ease: 'power4.out'
      });

      // B. PARALLAX COLUMNS (The "Gallery" Effect)
      // Column 1 moves UP, Column 2 moves DOWN, Column 3 moves UP
      gsap.to('.col-1', { y: -200, scrollTrigger: { trigger: '.gallery-section', scrub: 1 } });
      gsap.to('.col-2', { y: 200, scrollTrigger: { trigger: '.gallery-section', scrub: 1 } });
      gsap.to('.col-3', { y: -200, scrollTrigger: { trigger: '.gallery-section', scrub: 1 } });

      // C. HORIZONTAL SCROLL (Massive Width)
      const horizontalSection = document.querySelector('.horizontal-wrapper');
      gsap.to('.horizontal-content', {
        x: () => -(document.querySelector('.horizontal-content').scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalSection,
          pin: true,
          scrub: 1,
          end: () => "+=" + document.querySelector('.horizontal-content').scrollWidth,
          invalidateOnRefresh: true,
        }
      });

      // D. VIDEO EXPAND (Viewport Fill)
      gsap.to('.expand-video', {
        width: '100%', height: '100vh', borderRadius: 0,
        scrollTrigger: {
          trigger: '.video-trigger', start: 'top center', end: 'bottom bottom', scrub: true
        }
      });

      // E. SERVICE HOVER REVEAL (Image follows mouse)
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
           gsap.to(serviceImg, { x: e.clientX, y: e.clientY - 200, duration: 0.5 }); // Offset for visibility
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <div ref={containerRef} className="bg-black text-white relative">
      
      {/* 0. GLOBAL ASSETS */}
      <div className="noise" />
      <div ref={cursorRef} className="fixed w-3 h-3 bg-[#FF3333] rounded-full pointer-events-none z-[100] mix-blend-difference top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
      <div ref={cursorTextRef} className="fixed pointer-events-none z-[100] text-[#FF3333] font-mono text-[10px] top-4 left-4 mix-blend-difference hidden md:block">
          RAW_INPUT
      </div>

      {/* 0. PRELOADER */}
      <div className="loader-screen fixed inset-0 z-[9999] bg-[#FF3333] flex flex-col justify-between p-10 text-black">
        <div className="text-6xl font-black">INITIALIZING...</div>
        <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
          <div className="loader-bar w-0 h-full bg-black"></div>
        </div>
        <div className="loader-text font-mono text-xs flex justify-between">
           <span>LOADING ASSETS</span>
           <span>V.10.0.0</span>
        </div>
      </div>

      {/* 1. FLOATING NAVIGATION */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 mix-blend-difference">
         <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-4 flex gap-8 items-center">
            <span className="font-bold tracking-tighter">AGENCY®</span>
            <div className="h-4 w-[1px] bg-white/20"></div>
            <div className="flex gap-6 text-xs font-mono">
               <a href="#" className="hover:text-[#FF3333] transition-colors">WORK</a>
               <a href="#" className="hover:text-[#FF3333] transition-colors">STUDIO</a>
               <a href="#" className="hover:text-[#FF3333] transition-colors">CONTACT</a>
            </div>
         </div>
      </nav>

      {/* --- CONTENT WRAPPER --- */}
      <main className="relative z-10 bg-black mb-[100vh]">

        {/* SECTION 1: HERO */}
        <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
           <div className="absolute inset-0 opacity-40">
              <video autoPlay muted loop playsInline className="w-full h-full object-cover grayscale">
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-286-large.mp4" type="video/mp4"/>
              </video>
           </div>
           <div className="z-10 text-center mix-blend-difference hero-title">
              <h1 className="text-[13vw] leading-[0.8] font-black tracking-tighter overflow-hidden">
                 <span className="inline-block">VISUAL</span><br/>
                 <span className="inline-block text-transparent text-outline">NOISE</span>
              </h1>
           </div>
           <div className="absolute bottom-12 right-12 text-right hidden md:block">
              <p className="font-mono text-xs text-[#FF3333]">SCROLL TO EXPLORE</p>
              <p className="font-mono text-xs">Based in San Francisco</p>
           </div>
        </section>

        {/* SECTION 2: INTRO MANIFESTO */}
        <section className="min-h-screen flex items-center justify-center py-24 px-6">
           <p className="text-4xl md:text-6xl font-medium text-center max-w-5xl leading-tight text-neutral-400">
              We operate at the intersection of <span className="text-white">art</span> and <span className="text-white">code</span>. 
              We don't just design interfaces; we engineer <span className="text-[#FF3333]">emotional responses</span>.
              <br/><br/>
              <span className="text-sm font-mono tracking-widest uppercase text-white block mt-8 animate-pulse">
                  System Status: Optimal
              </span>
           </p>
        </section>

        {/* SECTION 3: PARALLAX COLUMNS GALLERY */}
        <section className="gallery-section min-h-[150vh] bg-[#111] overflow-hidden relative flex justify-center gap-4 md:gap-8 py-24">
            {/* COL 1 */}
            <div className="col-1 w-[25vw] flex flex-col gap-8 -mt-24">
                <img src={IMAGES[0]} className="w-full h-[60vh] object-cover rounded-lg opacity-80" />
                <img src={IMAGES[1]} className="w-full h-[50vh] object-cover rounded-lg opacity-80" />
                <img src={IMAGES[2]} className="w-full h-[60vh] object-cover rounded-lg opacity-80" />
            </div>
            {/* COL 2 (Moves Opposite) */}
            <div className="col-2 w-[25vw] flex flex-col gap-8 mt-24">
                <img src={IMAGES[3]} className="w-full h-[50vh] object-cover rounded-lg opacity-80" />
                <div className="h-[40vh] bg-[#FF3333] rounded-lg flex items-center justify-center text-black font-bold text-4xl p-4 text-center">
                    PURE<br/>CHAOS
                </div>
                <img src={IMAGES[4]} className="w-full h-[60vh] object-cover rounded-lg opacity-80" />
            </div>
            {/* COL 3 */}
            <div className="col-3 w-[25vw] flex flex-col gap-8 -mt-12">
                <img src={IMAGES[5]} className="w-full h-[70vh] object-cover rounded-lg opacity-80" />
                <img src={IMAGES[0]} className="w-full h-[50vh] object-cover rounded-lg opacity-80" />
                <img src={IMAGES[1]} className="w-full h-[40vh] object-cover rounded-lg opacity-80" />
            </div>
        </section>

        {/* SECTION 4: HORIZONTAL SCROLL (PROJECTS) */}
        <section className="horizontal-wrapper h-screen bg-white text-black relative overflow-hidden">
             <div className="absolute top-12 left-12 z-20">
                <h2 className="text-6xl font-black tracking-tighter">SELECTED<br/>WORKS</h2>
             </div>
             
             <div className="horizontal-content flex h-full w-max">
                 {/* Item 1 */}
                 <div className="w-[80vw] md:w-[60vw] h-full flex items-center justify-center p-12 border-r border-black/10">
                     <div className="w-full h-[60%] relative group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1481487484168-9b930d5b7960?q=80&w=2000" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute -bottom-16 left-0">
                           <h3 className="text-4xl font-bold">Project Alpha</h3>
                           <p className="font-mono text-gray-500">Brand Identity</p>
                        </div>
                     </div>
                 </div>
                 {/* Item 2 */}
                 <div className="w-[80vw] md:w-[60vw] h-full flex items-center justify-center p-12 border-r border-black/10 bg-neutral-100">
                     <div className="w-full h-[60%] relative group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=2000" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute -bottom-16 left-0">
                           <h3 className="text-4xl font-bold">Neon Horizon</h3>
                           <p className="font-mono text-gray-500">WebGL Experience</p>
                        </div>
                     </div>
                 </div>
                 {/* Item 3 */}
                 <div className="w-[80vw] md:w-[60vw] h-full flex items-center justify-center p-12 border-r border-black/10">
                     <div className="w-full h-[60%] relative group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1550745165-9010d4506900?q=80&w=2000" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute -bottom-16 left-0">
                           <h3 className="text-4xl font-bold">Cyber Deck</h3>
                           <p className="font-mono text-gray-500">Hardware Design</p>
                        </div>
                     </div>
                 </div>
                 {/* Item 4 (CTA) */}
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

        {/* SECTION 5: VIDEO EXPAND */}
        <section className="video-trigger min-h-[150vh] bg-black flex items-center justify-center py-24 relative z-20">
            <div className="expand-video w-[600px] h-[400px] rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
                    <Play className="w-20 h-20 text-white fill-white opacity-50" />
                </div>
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-holographic-interface-902-large.mp4" type="video/mp4" />
                </video>
                <div className="absolute bottom-8 left-8 z-20">
                    <h2 className="text-white text-4xl font-bold">THE PROCESS</h2>
                </div>
            </div>
        </section>

        {/* SECTION 6: INTERACTIVE SERVICES LIST (Hover Trail) */}
        <section className="py-32 px-6 bg-[#050505] relative overflow-hidden cursor-none">
            {/* Floating Image Container */}
            <div className="service-float-img fixed top-0 left-0 w-[300px] h-[400px] bg-cover bg-center pointer-events-none z-50 rounded-lg opacity-0 scale-0 origin-center" style={{transform: 'translate(-50%, -50%)'}}></div>

            <div className="max-w-7xl mx-auto">
                 <h2 className="text-xs font-mono text-gray-500 mb-12 uppercase tracking-[0.5em]">Our Expertise</h2>
                 
                 {[
                     { name: "Art Direction", img: IMAGES[0] },
                     { name: "Creative Dev", img: IMAGES[1] },
                     { name: "Motion Design", img: IMAGES[2] },
                     { name: "3D Modelling", img: IMAGES[3] },
                     { name: "Sound Design", img: IMAGES[4] },
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
                 <div className="border-t border-white/10"></div>
            </div>
        </section>

      </main>

      {/* SECTION 7: FIXED FOOTER REVEAL */}
      <footer className="fixed bottom-0 left-0 w-full h-[100vh] bg-[#FF3333] text-black z-0 flex flex-col justify-between p-8 md:p-12">
           <div className="flex justify-between items-start">
               <div className="text-lg font-bold">AGENCY®</div>
               <div className="text-right font-mono text-sm">
                   <p>TOKYO — 23:45</p>
                   <p>LONDON — 14:45</p>
                   <p>NYC — 09:45</p>
               </div>
           </div>

           <div className="text-center space-y-4">
               <p className="font-mono uppercase tracking-widest text-sm">Ready to scale?</p>
               <h2 className="text-[12vw] font-black leading-[0.8] hover:text-white transition-colors duration-500 cursor-pointer">
                   GET IN TOUCH
               </h2>
           </div>

           <div className="flex justify-between items-end font-bold text-lg">
               <div className="flex gap-8">
                   <a href="#" className="hover:underline">INSTAGRAM</a>
                   <a href="#" className="hover:underline">BEHANCE</a>
                   <a href="#" className="hover:underline">LINKEDIN</a>
               </div>
               <div>© 2025</div>
           </div>
      </footer>

    </div>
  );
}