"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mail, Send, Github, Linkedin, Twitter, MapPin, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GetInTouch = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const socialRef = useRef([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Social links stagger
      gsap.fromTo(
        socialRef.current.filter(Boolean),
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("rushi7gaikwad@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/rushikesh125", label: "GitHub", color: "hover:text-gray-400" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/rushi7gaikwad", label: "LinkedIn", color: "hover:text-blue-400" },
    // { icon: Twitter, href: "https://twitter.com/rushikesh125", label: "Twitter", color: "hover:text-sky-400" },
  ];

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Let's Work Together
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's turn your vision into reality!
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-4" />
        </div>

        {/* Main Content Card */}
        <div 
          ref={contentRef}
          className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          {/* Gradient Blob */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl -z-10" />
          
          {/* Content */}
          <div className="space-y-8">
            {/* Message */}
            <div className="text-center">
              <Mail className="w-16 h-16 mx-auto mb-4 text-purple-400" />
              <p className="text-gray-300 text-lg leading-relaxed">
                If you're seeking a skilled developer passionate about impactful design and functionality, 
                I'd love to connect. Let's build something exceptional together!
              </p>
            </div>

            {/* Email CTA */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div className="flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl flex-1 max-w-md">
                <Mail className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span className="text-white font-medium truncate">rushi7gaikwad@gmail.com</span>
              </div>
              <Button
                onClick={copyEmail}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/30 transition-all hover:scale-105 whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Copy Email
                  </>
                )}
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900/80 text-gray-400">Or connect with me on</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    ref={(el) => (socialRef.current[index] = el)}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 rounded-xl transition-all duration-300 hover:scale-110 group ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon className="w-6 h-6 text-gray-300 group-hover:text-current transition-colors" />
                  </a>
                );
              })}
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-400">Location</div>
                  <div className="text-sm text-white">Maharashtra, India</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-400">Availability</div>
                  <div className="text-sm text-white">Open to opportunities</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-8">
          © 2025 Rushikesh Gaikwad. Built with Next.js & Tailwind CSS
        </p>
      </div>
    </section>
  );
};

export default GetInTouch;
