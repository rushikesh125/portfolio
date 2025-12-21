"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

export const BentoProjectCard = ({ project, index }) => {
  const { title, description, images, demo_link, github_link } = project;
  const cardRef = useRef(null);

  // Mouse Spotlight Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Determine Span based on index for the Bento Layout
  const getSpanClass = (i) => {
    const pattern = i % 5;
    if (pattern === 0) return "md:col-span-2 md:row-span-2"; // Feature Card
    if (pattern === 1) return "md:col-span-2 md:row-span-1"; // Wide Card
    if (pattern === 4) return "md:col-span-2 md:row-span-1"; // Bottom Wide
    return "md:col-span-1 md:row-span-1"; // Square Card
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      onMouseMove={handleMouseMove}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0c] p-6 transition-all duration-500 hover:border-purple-500/50 ${getSpanClass(index)}`}
    >
      {/* Spotlight Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(168, 85, 247, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
              {title}
            </h3>
            <p className="line-clamp-2 text-sm leading-relaxed text-slate-400">
              {description}
            </p>
          </div>
          <div className="flex gap-2">
            {github_link && (
              <a href={github_link} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Project Image / Visual */}
        <div className="relative mt-6 flex-1 overflow-hidden rounded-xl border border-white/5 bg-slate-900/50">
           {images?.poster_img ? (
             <img 
               src={images.poster_img} 
               alt={title} 
               className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110" 
             />
           ) : (
             <div className="flex h-full items-center justify-center italic text-slate-600">Preview arriving soon</div>
           )}
           
           {/* Dark Overlay for text legibility if needed */}
           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-60" />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            {/* Auto-tags logic remains but styled cleaner */}
            {deriveTags(title).map(tag => (
              <span key={tag} className="text-[10px] uppercase tracking-wider text-purple-400 font-semibold bg-purple-500/10 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          
          {demo_link && (
            <a 
              href={demo_link} 
              className="inline-flex items-center gap-1 text-sm font-medium text-white group/link"
            >
              Explore
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

function deriveTags(title = "") {
  const t = title.toLowerCase();
  if (t.includes("ai")) return ["Intelligence"];
  if (t.includes("e-commerce")) return ["Commerce"];
  if (t.includes("dashboard")) return ["Data"];
  return ["Web3"];
}