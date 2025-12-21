"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Sparkles, Eye } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const BentoProjectCard = ({ project, layoutVariant = "compact" }) => {
  const {
    title,
    description,
    images = { poster_img: "", carosel_img: [] },
    demo_link = "#",
    github_link = "#",
  } = project;

  const allImages = useMemo(() => {
    const base = images?.poster_img ? [images.poster_img] : [];
    const rest = images?.carosel_img || [];
    return [...base, ...rest.filter((img) => img && img !== images.poster_img)];
  }, [images]);

  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const wrapperClasses = getWrapperClasses(layoutVariant);
  const isLargeCard = layoutVariant === "hero" || layoutVariant === "vertical";

  const shortDescription = isLargeCard
    ? description.length > 180 ? description.slice(0, 177).trim() + "..." : description
    : description.length > 90 ? description.slice(0, 87).trim() + "..." : description;

  const nextImage = (e) => {
    e.stopPropagation();
    if (!allImages.length) return;
    setCurrentImage((prev) => (prev + 1) % allImages.length);
  };

  return (
    <motion.article
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`${wrapperClasses} relative overflow-hidden rounded-3xl group cursor-pointer`}
    >
      {/* Main Card Container with Border */}
      <div className="relative h-full bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-800/95 backdrop-blur-2xl border border-white/10 hover:border-purple-500/40 transition-all duration-500 overflow-hidden">
        
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute -inset-[100%] animate-spin-slow bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20" 
               style={{ animationDuration: '8s' }} />
        </div>

        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-pink-600/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

        {/* Content Wrapper */}
        <div className="relative h-full flex flex-col p-4 sm:p-5 md:p-6">
          
          {/* Image Section */}
          <div className="relative overflow-hidden rounded-2xl mb-4 flex-shrink-0" 
               style={{ height: isLargeCard ? '60%' : '45%' }}>
            
            {/* Image */}
            {allImages.length > 0 ? (
              <motion.div
                key={allImages[currentImage]}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full h-full"
              >
                <img
                  src={allImages[currentImage]}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </motion.div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-white/5">
                <span className="text-xs text-gray-500">No preview</span>
              </div>
            )}

            {/* Top Badge */}
            <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span className="text-xs font-medium text-white">Featured</span>
            </div>

            {/* Image Counter & Navigation */}
            {allImages.length > 1 && (
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                {/* Counter */}
                <div className="px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/20">
                  <span className="text-xs font-medium text-white">
                    {currentImage + 1}/{allImages.length}
                  </span>
                </div>
                
                {/* Next Button */}
                <motion.button
                  onClick={nextImage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border border-white/20 transition-all shadow-lg shadow-purple-500/30"
                >
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            )}

            {/* Hover View Demo Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                <Eye className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">View Project</span>
              </div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="flex-1 flex flex-col">
            {/* Title */}
            <h3 className={`font-bold text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-300 ${
              isLargeCard ? 'text-lg sm:text-xl md:text-2xl' : 'text-base sm:text-lg'
            }`}>
              {title}
            </h3>

            {/* Description */}
            <p className={`text-gray-400 leading-relaxed mb-4 ${
              isLargeCard ? 'text-sm line-clamp-4' : 'text-xs line-clamp-3'
            }`}>
              {shortDescription}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {deriveTagsFromTitle(title).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-[10px] sm:text-xs font-medium bg-gradient-to-r from-purple-900/40 to-pink-900/40 text-purple-300 border border-purple-700/30 hover:border-purple-500/50 transition-all"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="mt-auto flex items-center justify-between gap-3">
              {/* Links */}
              <div className="flex items-center gap-2">
                {github_link && github_link !== "#" && (
                  <motion.a
                    href={github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white transition-all shadow-lg"
                    aria-label="Source code"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                )}

                {demo_link && demo_link !== "#" && (
                  <motion.a
                    href={demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs sm:text-sm font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </motion.a>
                )}
              </div>

              {/* View Count / Status (Optional) */}
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated border shine effect */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
      `}</style>
    </motion.article>
  );
};

/**
 * Layout utility
 */
function getWrapperClasses(variant) {
  switch (variant) {
    case "hero":
      return "col-span-1 sm:col-span-2 lg:col-span-2 row-span-1 sm:row-span-2";
    case "vertical":
      return "col-span-1 row-span-1 sm:row-span-2";
    case "wide":
      return "col-span-1 sm:col-span-2 row-span-1";
    default:
      return "col-span-1 row-span-1";
  }
}

/**
 * Auto-derive tags from title
 */
function deriveTagsFromTitle(title = "") {
  const t = title.toLowerCase();
  const tags = [];
  if (t.includes("ai")) tags.push("AI/ML");
  if (t.includes("resume") || t.includes("analyzer")) tags.push("Career Tech");
  if (t.includes("e-commerce") || t.includes("shop") || t.includes("clothing")) tags.push("E-Commerce");
  if (t.includes("dashboard")) tags.push("Dashboard");
  if (t.includes("course") || t.includes("generator")) tags.push("EdTech");
  if (t.includes("admin")) tags.push("Admin Panel");
  if (tags.length === 0) tags.push("Full-Stack");
  return tags.slice(0, 3);
}
