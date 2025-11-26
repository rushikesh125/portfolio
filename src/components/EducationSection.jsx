"use client";

import { useEffect, useRef } from "react";
import { BookOpen, GraduationCap, Calendar, Award, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { my_education } from "@/education";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EducationSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const timelineRef = useRef(null);

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

      // Timeline animation
      gsap.fromTo(
        timelineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <GraduationCap className="w-10 h-10 text-purple-400" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Education
            </h2>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My academic journey and continuous learning path in computer science and technology
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-4" />
        </div>

        {/* Education Timeline */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div 
            ref={timelineRef}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-600 transform -translate-x-1/2 origin-top"
          />

          {/* Education Cards */}
          <div className="space-y-12">
            {my_education.map((edu, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`relative flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot - Desktop */}
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-[#0b001a] shadow-lg shadow-purple-500/50 animate-pulse" />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="group relative bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20">
                    {/* Gradient Blob */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    
                    {/* Institution Logo & Name */}
                    <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                      <div className="flex-shrink-0 w-14 h-14 bg-white/5 rounded-xl p-2 border border-purple-500/20 group-hover:border-purple-500/40 transition-all duration-300">
                        <img
                          src={edu.logoUrl}
                          alt={edu.altText}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-300">
                          {edu.title}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">{edu.subtitle}</p>
                      </div>
                    </div>

                    {/* Period */}
                    <div className={`flex items-center gap-2 mb-4 text-purple-300 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <Calendar size={16} />
                      <span className="text-sm font-medium">{edu.period}</span>
                    </div>

                    {/* Badges */}
                    <div className={`flex flex-wrap gap-2 mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      {edu.badges.map((badge, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-purple-900/30 text-purple-300 border border-purple-700/50 px-3 py-1 hover:bg-purple-900/50 transition-all duration-300"
                        >
                          <Award size={12} className="mr-1" />
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {edu.description}
                    </p>

                    {/* Link */}
                    {edu.href && (
                      <a
                        href={edu.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors ${index % 2 === 0 ? "md:ml-auto" : ""}`}
                      >
                        <span>Visit Website</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Empty Space for Timeline Balance - Desktop */}
                <div className="hidden md:block w-[calc(50%-2rem)]" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl">
            <div className="text-3xl font-bold text-white mb-2">8.6</div>
            <div className="text-sm text-gray-400">Current CGPA</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl">
            <div className="text-3xl font-bold text-white mb-2">2026</div>
            <div className="text-sm text-gray-400">Expected Graduation</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl">
            <div className="text-3xl font-bold text-white mb-2">3+</div>
            <div className="text-sm text-gray-400">Hackathons Won</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
