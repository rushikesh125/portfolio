"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TopProjects } from "@/projects";
import { BentoProjectCard } from "@/components/BentoProjectCard";
import { ArrowLeft, Sparkles, Layers } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const gridVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ProjectsPage() {
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <motion.main
      className="min-h-screen bg-[#0b001a] text-white relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-full blur-[200px]" />
      </div>

      <div className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <div ref={headerRef} className="max-w-7xl mx-auto mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              {/* Breadcrumb */}
              <div className="inline-flex items-center gap-3 mb-4">
                <Layers className="w-5 h-5 text-purple-400" />
                <span className="text-xs sm:text-sm uppercase tracking-[0.15em] text-purple-400/80 font-medium">
                  All Projects
                </span>
                <div className="h-px w-12 bg-gradient-to-r from-purple-500/50 to-transparent" />
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  My Portfolio
                </span>
                <span className="block text-xl sm:text-2xl md:text-3xl text-gray-400 mt-2 font-normal">
                  Building Products That Matter
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed">
                A curated collection of full-stack applications, AI-powered tools, and innovative web experiences.
                Each project showcases modern tech stacks, clean architecture, and attention to detail.
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-400">{TopProjects.length} Projects</span>
                </div>
                <div className="h-4 w-px bg-gray-700" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-gray-400">Always Learning</span>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <Link
              href="/"
              className="group inline-flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 rounded-xl text-sm text-gray-300 hover:text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mt-8" />
        </div>

        {/* Bento Grid */}
        <motion.section
          className="max-w-7xl mx-auto grid gap-4 sm:gap-5 md:gap-6
                     grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[320px] sm:auto-rows-[360px]"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          {TopProjects.map((project, index) => (
            <BentoProjectCard
              key={project.id ?? index}
              project={project}
              layoutVariant={getBentoVariant(index)}
            />
          ))}
        </motion.section>

        {/* Footer CTA */}
        <div className="max-w-7xl mx-auto mt-16 sm:mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4 px-8 py-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-xl border border-purple-500/20 rounded-2xl">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <p className="text-gray-300 text-sm sm:text-base max-w-md">
              Interested in collaborating? Let's build something amazing together!
            </p>
            <Link
              href="/#contact"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white text-sm font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </motion.main>
  );
}

function getBentoVariant(index) {
  if (index === 0) return "hero";
  if (index === 1) return "vertical";
  if (index === 2) return "wide";
  return "compact";
}
