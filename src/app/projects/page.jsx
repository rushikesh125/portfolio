"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TopProjects } from "@/projects";
import { BentoProjectCard } from "@/components/BentoProjectCard";
import { ArrowLeft, Sparkles, Layers, LayoutGrid } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export default function ProjectsPage() {
  const containerRef = useRef(null);
  
  return (
    <main className="min-h-screen bg-[#030014] text-slate-200 selection:bg-purple-500/30">
      {/* Subtle Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-blue-900/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24">
        {/* Header Section */}
        <header className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div className="space-y-4">
              <Link 
                href="/" 
                className="group inline-flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to overview
              </Link>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Works</span>
              </h1>
              
              <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
                A collection of digital experiences at the intersection of 
                design and engineering. Focused on performance, accessibility, and aesthetics.
              </p>
            </div>

            <div className="flex gap-8 border-l border-white/10 pl-8 hidden lg:flex">
              <div>
                <p className="text-2xl font-bold text-white">{TopProjects.length}</p>
                <p className="text-xs uppercase tracking-widest text-slate-500">Projects</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">2025</p>
                <p className="text-xs uppercase tracking-widest text-slate-500">Edition</p>
              </div>
            </div>
          </motion.div>
        </header>

        {/* Dynamic Bento Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 auto-rows-[22rem] gap-4"
        >
          {TopProjects.map((project, index) => (
            <BentoProjectCard
              key={project.id ?? index}
              project={project}
              // This logic creates a repeating 1-2-1 pattern for the Bento look
              index={index}
            />
          ))}
        </motion.section>

        {/* Minimal Footer CTA */}
        <footer className="mt-32 text-center">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />
          <h2 className="text-3xl font-semibold text-white mb-6">Have an idea?</h2>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-purple-500 hover:text-white transition-all duration-300 group"
          >
            Start a Conversation
            <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
          </Link>
        </footer>
      </div>
    </main>
  );
}