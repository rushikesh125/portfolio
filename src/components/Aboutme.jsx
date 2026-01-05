"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Rocket, Sparkles, Award, Target, Zap } from "lucide-react";
import AboutSvgme from "./svg/Aboutme";

gsap.registerPlugin(ScrollTrigger);

const Aboutme = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const svgRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef([]);
  const highlightsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // SVG animation
      gsap.fromTo(
        svgRef.current,
        { scale: 0.8, opacity: 0, rotation: -10 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Content paragraphs animation
      const paragraphs =
        contentRef.current.querySelectorAll(".about-paragraph");
      gsap.fromTo(
        paragraphs,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        statsRef.current.filter(Boolean),
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Highlights animation
      gsap.fromTo(
        highlightsRef.current.filter(Boolean),
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Code2, label: "Technologies", value: "15+" },
    { icon: Rocket, label: "Projects", value: "20+" },
    { icon: Award, label: "Hackathons Won", value: "3+" },
  ];

  const highlights = [
    {
      icon: Sparkles,
      title: "AI Integration Expert",
      description:
        "Built AI-powered systems using Google Gemini, RAG, and smart matching algorithms",
    },
    {
      icon: Target,
      title: "Full-Stack Mastery",
      description:
        "Proficient in MERN stack, Next.js, and modern web development practices",
    },
    {
      icon: Zap,
      title: "Problem Solver",
      description:
        "Won multiple hackathons creating innovative, real-world solutions",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div ref={headingRef} className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent inline-block">
            About Me
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                ref={(el) => (statsRef.current[index] = el)}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all duration-300">
                  <IconComponent className="w-8 h-8 text-purple-400 mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="lg:flex lg:gap-12 items-center">
          {/* SVG Illustration */}
          <div ref={svgRef} className="lg:w-1/2 mb-8 lg:mb-0">
            <div className="relative">
              {/* Glow effect behind SVG */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/40 transition-all duration-300">
                <AboutSvgme />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div ref={contentRef} className="lg:w-1/2 space-y-6">
            <p className="about-paragraph text-gray-300 leading-relaxed">
              Hi, I'm{" "}
              <span className="text-white font-semibold">
                Rushikesh Gaikwad
              </span>{" "}
              — a passionate and dynamic{" "}
              <span className="text-purple-400 font-semibold">
                Full-Stack Web Developer
              </span>{" "}
              and{" "}
              <span className="text-pink-400 font-semibold">
                B.Tech Computer Science & Engineering
              </span>{" "}
              student from Maharashtra, India. I specialize in building
              scalable, intelligent, and user-centric web applications that
              solve real-world problems with modern technologies and AI-driven
              innovation.
            </p>

            <p className="about-paragraph text-gray-300 leading-relaxed">
              With a strong foundation in both front-end and back-end
              development, I bring ideas to life through technologies like{" "}
              <span className="text-purple-400">
                React.js, Next.js, Node.js, Express.js, MongoDB, and MySQL
              </span>
              . I love creating intuitive user interfaces with Tailwind CSS,
              Bootstrap, and responsive design best practices.
            </p>

            <p className="about-paragraph text-gray-300 leading-relaxed">
              What truly sets me apart is my enthusiasm for{" "}
              <span className="text-pink-400 font-semibold">
                AI integration
              </span>{" "}
              in web apps. I've worked extensively with LLMs like{" "}
              <span className="text-purple-400">Google Gemini</span>, building
              AI-based systems including a Resume Analyzer, Personalized Course
              Generator, and Career Counsellor — all utilizing RAG and smart
              matching systems.
            </p>

            <p className="about-paragraph text-gray-300 leading-relaxed">
              Driven by curiosity and an entrepreneurial mindset, I'm constantly
              exploring new technologies, frameworks, and problem-solving
              techniques.{" "}
              <span className="text-white font-semibold">
                Let's build something transformative together!
              </span>
            </p>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => {
            const IconComponent = highlight.icon;
            return (
              <div
                key={index}
                ref={(el) => (highlightsRef.current[index] = el)}
                className="group relative"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/20 group-hover:to-pink-600/20 rounded-xl blur-xl transition-all duration-300" />

                <div className="relative bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all duration-300 h-full">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg">
                      <IconComponent className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {highlight.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Aboutme;
