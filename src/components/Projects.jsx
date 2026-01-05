"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import { TopProjects } from "@/projects";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const router = useRouter();

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
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="featured-projects"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Blur Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Showcasing my best work in full-stack development, AI integration,
            and modern web applications
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-5" />
        </div>

        {/* Projects Grid */}
        <div className="space-y-20 lg:space-y-24">
          {TopProjects.map(
            (project, index) =>
              index <= 2 && (
                <div key={index} ref={(el) => (cardsRef.current[index] = el)}>
                  <ProjectCard
                    {...project}
                    infoAlign={index % 2 === 0 ? "right" : "left"}
                  />
                </div>
              )
          )}
        </div>
        <div onClick={()=>router.push("/projects")} className="relative my-10 mx-auto p-[2px] w-fit overflow-hidden text-center flex justify-center items-center rounded-xl cursor-pointer">
          <div className=" absolute  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-[200%] h-8 animate-spin-slow"></div>
          <button className="relative z-30 bg-slate-900 py-2 px-4 rounded-xl">
            Explore All
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
