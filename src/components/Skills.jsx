"use client"

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagicCard } from "./MagicCard";
import { Monitor, Server, Database, Wrench } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    title: "Frontend",
    icon: Monitor,
    description: "Skilled in creating modern, responsive interfaces with technologies like React, Tailwind CSS, and Bootstrap, ensuring engaging and intuitive user experiences.",
    skills: [
      { name: "ReactJS", icon: "/images/react.png" },
      { name: "JavaScript", icon: "/images/js.png" },
      { name: "Tailwindcss", icon: "/images/tailwindcss.png" },
      { name: "Bootstrap", icon: "/images/bootstrap.png" },
      { name: "HTML-CSS", icon: "/images/htmlcss.png" },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    description: "Experienced in building scalable backend services using Node.js and Express, with a strong focus on secure API development and performance optimization.",
    skills: [
      { name: "NodeJS", icon: "/images/nodejs.png" },
      { name: "ExpressJS", icon: "/images/expressjs.png" },
      { name: "NextJS", icon: "/images/nextjs.png" },
      { name: "Firebase", icon: "/images/firebase.png" },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    description: "Proficient in data management with MongoDB, MySQL, and Oracle, ensuring efficient storage solutions and smooth data handling across applications.",
    skills: [
      { name: "MongoDB", icon: "/images/mongodb.png" },
      { name: "MySQL", icon: "/images/mysql.png" },
      { name: "Oracle", icon: "/images/oracle.png" },
      { name: "PostgreSQL", icon: "/images/postresql.png" },
    ],
  },
  {
    title: "Tools & Technologies",
    icon: Wrench,
    description: "Versatile in using tools like Git, GitHub, Postman, Figma, and Photoshop, supporting seamless development, collaboration, and design workflows.",
    skills: [
      { name: "Postman", icon: "/images/postman.png" },
      { name: "GitHub", icon: "/images/github.png" },
      { name: "GitLab", icon: "/images/gitlab.png" },
      { name: "Figma", icon: "/images/figma.png" },
      { name: "Photoshop", icon: "/images/photoshop.png" },
      { name: "Docker", icon: "/images/docker.png" },
    ],
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

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

      // Cards stagger animation
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { 
          y: 100, 
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
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

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div ref={headingRef} className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent inline-block">
            Skills & Expertise
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks for building exceptional web applications
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-4 mx-auto" />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group"
              >
                <MagicCard
                  className="relative overflow-hidden bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300 h-full"
                  gradientColor="#a855f7"
                  gradientOpacity={0.3}
                >
                  {/* Card Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-purple-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {section.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {section.description}
                    </p>
                  </div>

                  {/* Skills Icons Grid */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {section.skills.map((skill, i) => (
                      <div
                        key={i}
                        className="group/skill relative"
                      >
                        {/* Hover glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover/skill:from-purple-600/20 group-hover/skill:to-pink-600/20 rounded-xl blur-xl transition-all duration-300" />
                        
                        {/* Skill card */}
                        <div className="relative bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 flex flex-col items-center justify-center gap-3 h-24">
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-10 h-10 object-contain group-hover/skill:scale-110 transition-transform duration-300"
                          />
                          <span className="text-xs text-gray-300 text-center font-medium">
                            {skill.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Card Footer - Skill Count */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Technologies</span>
                      <span className="text-purple-400 font-semibold">
                        {section.skills.length} tools
                      </span>
                    </div>
                  </div>
                </MagicCard>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-gray-300 text-sm">
              Always learning and exploring new technologies
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
