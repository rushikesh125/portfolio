"use client"

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Download, ArrowRight, Sparkles } from 'lucide-react';
import CodeBlock from "./CodeBlock";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const imageContainerRef = useRef(null);
  const textRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const codeBlockRef = useRef(null);
  const buttonsRef = useRef(null);
  const socialRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate glow background
      gsap.fromTo(
        glowRef.current,
        { scale: 0, opacity: 0, rotation: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          rotation: 45,
          duration: 1.2, 
          ease: "power3.out",
          delay: 0.2
        }
      );

      // Animate profile image
      gsap.fromTo(
        imageContainerRef.current,
        { scale: 0, opacity: 0, rotation: -180 },
        { 
          scale: 1, 
          opacity: 1, 
          rotation: 0,
          duration: 1, 
          ease: "back.out(1.7)",
          delay: 0.3
        }
      );

      // Continuous floating animation for image (separate from scroll)
      gsap.to(imageRef.current, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Animate name with letter stagger
      const nameChars = nameRef.current.querySelectorAll('.char');
      gsap.fromTo(
        nameChars,
        { y: 50, opacity: 0, rotationX: -90 },
        { 
          y: 0, 
          opacity: 1, 
          rotationX: 0,
          duration: 0.6, 
          stagger: 0.05,
          ease: "back.out(1.7)",
          delay: 0.5
        }
      );

      // Animate title
      gsap.fromTo(
        titleRef.current,
        { x: -100, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power3.out",
          delay: 0.8
        }
      );

      // Animate code block
      gsap.fromTo(
        codeBlockRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power2.out",
          delay: 1
        }
      );

      // Animate buttons
      gsap.fromTo(
        buttonsRef.current.children,
        { y: 30, opacity: 0, scale: 0.8 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.6, 
          stagger: 0.15,
          ease: "back.out(1.7)",
          delay: 1.2
        }
      );

      // Animate social links
      gsap.fromTo(
        socialRef.current.children,
        { x: 50, opacity: 0, rotation: 180 },
        { 
          x: 0, 
          opacity: 1, 
          rotation: 0,
          duration: 0.6, 
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 1.4
        }
      );

      // REMOVED: The problematic scroll-triggered parallax that was hiding the image
      // If you want subtle parallax, use this instead:
      /*
      gsap.to(imageContainerRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        },
        y: 50, // Much smaller value so image doesn't disappear
        scale: 0.95 // Subtle scale instead of opacity change
      });
      */

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="min-h-screen pt-20 lg:pt-28 pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12 lg:gap-20">
          
          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center items-center relative">
            {/* Animated Glow */}
            <div 
              ref={glowRef}
              className="absolute w-[350px] h-[350px] lg:w-[600px] lg:h-[600px] rounded-full bg-gradient-to-r from-purple-600 to-pink-600 -z-10 blur-3xl opacity-40"
              style={{ boxShadow: '0px 0px 80px rgba(132, 0, 255, 0.6)' }}
            />
            
            {/* Profile Image Container */}
            <div ref={imageContainerRef} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-50 animate-pulse" />
              <img 
                ref={imageRef}
                src="/images/rishi3.png" 
                alt="Rushikesh Gaikwad - Full Stack Developer" 
                className="w-[300px] lg:w-[450px] relative z-10 drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Content Section */}
          <div ref={textRef} className="w-full lg:w-1/2 space-y-6">
            {/* Greeting */}
            <div ref={nameRef} className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-300 flex flex-wrap gap-2">
                <span className="char">H</span>
                <span className="char">i</span>
                <span className="char">,</span>
                <span className="char mx-2">I</span>
                <span className="char">'</span>
                <span className="char">m</span>
                <span className="text-white char ml-3">R</span>
                <span className="text-white char">u</span>
                <span className="text-white char">s</span>
                <span className="text-white char">h</span>
                <span className="text-white char">i</span>
              </h1>
            </div>

            {/* Title with Gradient */}
            <div ref={titleRef}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent leading-tight">
                Full-Stack MERN Developer
              </h2>
              <div className="flex items-center gap-2 mt-3 text-gray-400">
                <Sparkles size={18} className="text-purple-400" />
                <span className="text-sm">Crafting digital experiences with modern tech</span>
              </div>
            </div>

            {/* Code Block */}
            <div ref={codeBlockRef}>
              <CodeBlock />
            </div>

            {/* Buttons */}
            <div ref={buttonsRef} className="flex flex-wrap gap-4 pt-4">
              {/* Resume Button */}
              <a
                href="/Resume.pdf"
                download="RushikeshGaikwadResume.pdf"
                className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium overflow-hidden shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Download size={18} />
                  Get Resume
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>

              {/* View Projects Button */}
              <button
                onClick={() => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 flex items-center gap-2"
              >
                View Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Social Links */}
            <div ref={socialRef} className="flex items-center gap-4 pt-4">
              <span className="text-gray-400 text-sm">Connect with me:</span>
              <Link
                href="https://github.com/rushikesh125"
                target="_blank"
                className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110 group border border-white/10 hover:border-purple-500/30"
              >
                <Github size={20} className="text-gray-300 group-hover:text-white transition-colors" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/rushi7gaikwad"
                target="_blank"
                className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110 group border border-white/10 hover:border-purple-500/30"
              >
                <Linkedin size={20} className="text-gray-300 group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>

  
    </section>
  );
};

export default Home;
