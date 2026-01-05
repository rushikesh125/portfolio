"use client";
import React, { useState } from "react";
import { Github, Sparkles, ChevronRight, ChevronLeft, ChevronRight as ChevronRightIcon, ImageIcon } from "lucide-react";

const ProjectCard2 = (props) => {
  const {
    title = "Project Title",
    description = "Project description goes here...",
    images = { poster_img: "", carosel_img: [] },
    demo_link = "#",
    github_link = "#",
  } = props;

  // Combine poster + carousel images
  const allImages = images.carosel_img?.length > 0 
    ? [images.poster_img, ...images.carosel_img.filter(img => img !== images.poster_img)]
    : [images.poster_img];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Extract tech stack
  const getTechStack = () => {
    if (title.includes("AI")) return ["AI/ML", "Gemini", "Next.js"]; // Shortened for card view
    if (title.includes("E-Commerce")) return ["MERN", "Redux", "Stripe"];
    return ["React", "Node.js", "Express"];
  };

  const techStack = getTechStack();

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Show max 3 thumbnails
  const maxThumbnails = 3;
  const visibleThumbnails = allImages.slice(1, maxThumbnails + 1);
  const remainingCount = allImages.length - maxThumbnails - 1;

  return (
    // MAIN CONTAINER: Fixed width (max-w-sm) to simulate mobile device size on desktop
    <div className="flex flex-col w-full max-w-[400px] mx-auto  rounded-3xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 shadow-xl group">
      
      {/* Image Section - Full Width Top */}
      <div className="w-full p-4 pb-0">
        <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
          <div className="relative aspect-video"> 
            <img
              src={allImages[currentIndex]}
              alt={`${title} - screenshot ${currentIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Image counter badge */}
            <div className="absolute top-3 right-3 flex items-center gap-2 px-2 py-1 bg-black/70 backdrop-blur-md rounded-lg text-white text-[10px] font-medium border border-white/20">
              <ImageIcon size={12} />
              {currentIndex + 1} / {allImages.length}
            </div>

            {/* Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ChevronRightIcon size={20} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Thumbnails - Compact */}
        {allImages.length > 1 && (
          <div className="grid grid-cols-4 gap-2 mt-3">
            {visibleThumbnails.map((img, index) => (
              <div
                key={index}
                className={`relative aspect-video overflow-hidden rounded-md border cursor-pointer ${currentIndex === index + 1 ? 'border-purple-500' : 'border-white/10 hover:border-purple-500/50'}`}
                onClick={() => setCurrentIndex(index + 1)}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            
            {remainingCount > 0 && (
              <div
                className="relative aspect-video rounded-md border border-white/10 bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10"
                onClick={nextImage}
              >
                <span className="text-white text-xs font-bold">+{remainingCount}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content Section - Bottom */}
      <div className="flex flex-col flex-grow p-5 space-y-4">
        
        {/* Header: Badge & Title */}
        <div className="space-y-2">
          
          <h3 className="text-xl font-bold text-white leading-tight">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-[10px] font-medium text-purple-300 bg-purple-900/20 border border-purple-500/20 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Push buttons to bottom if container grows */}
        <div className="pt-2 mt-auto">
          <div className="flex gap-3">
            <a
              href={demo_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm rounded-lg font-medium shadow-lg shadow-purple-900/20 transition-all duration-300"
            >
              Live Demo
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard2;