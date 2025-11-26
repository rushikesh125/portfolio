"use client";
import React, { useState } from "react";
import { ExternalLink, Github, Sparkles, ChevronRight, ChevronLeft, ChevronRight as ChevronRightIcon, ImageIcon } from "lucide-react";
import gsap from "gsap";

const ProjectCard = (props) => {
  const {
    infoAlign = "right",
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
    if (title.includes("AI")) return ["AI/ML", "Google Gemini", "RAG", "Next.js", "React"];
    if (title.includes("E-Commerce")) return ["MERN", "Redux", "Stripe", "Tailwind CSS", "MongoDB"];
    return ["React", "Node.js", "MongoDB", "Express"];
  };

  const techStack = getTechStack();

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Show max 3 thumbnails + "more" indicator
  const maxThumbnails = 3;
  const visibleThumbnails = allImages.slice(1, maxThumbnails + 1);
  const remainingCount = allImages.length - maxThumbnails - 1;

  return (
    <div 
      className={`flex flex-col ${infoAlign === "right" ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-12 items-start`}
    >
      {/* Image Section */}
      <div className="w-full lg:w-1/2">
        {/* Main Image with Slider */}
        <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm group">
          <div className="relative">
            <img
              src={allImages[currentIndex]}
              alt={`${title} - screenshot ${currentIndex + 1}`}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Image counter badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-lg text-white text-xs font-medium border border-white/20">
              <ImageIcon size={14} />
              {currentIndex + 1} / {allImages.length}
            </div>

            {/* Navigation Arrows - Show on hover for multiple images */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-lg border border-white/20 text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} className="sm:w-8 sm:h-8" strokeWidth={2.5} />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-lg border border-white/20 text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
                  aria-label="Next image"
                >
                  <ChevronRightIcon size={24} className="sm:w-8 sm:h-8" strokeWidth={2.5} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Limited Thumbnail Gallery */}
        {allImages.length > 1 && (
          <div className="grid grid-cols-4 gap-2 mt-4">
            {visibleThumbnails.map((img, index) => (
              <div
                key={index}
                className="relative aspect-video overflow-hidden rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 cursor-pointer group/thumb"
                onClick={() => setCurrentIndex(index + 1)}
              >
                <img
                  src={img}
                  alt={`${title} screenshot ${index + 1}`}
                  className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/20 transition-colors duration-300" />
                {currentIndex === index + 1 && (
                  <div className="absolute inset-0 border-2 border-purple-500 bg-purple-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  </div>
                )}
              </div>
            ))}
            
            {/* More images indicator */}
            {remainingCount > 0 && (
              <div
                className="relative aspect-video overflow-hidden rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 cursor-pointer bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm flex flex-col items-center justify-center group/more"
                onClick={nextImage}
              >
                <span className="text-white font-bold text-base sm:text-lg group-hover/more:scale-110 transition-transform duration-300">
                  +{remainingCount}
                </span>
                <span className="text-white/60 text-xs mt-1">more</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 space-y-4">
        {/* Featured badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full">
          <Sparkles size={14} className="text-purple-400" />
          <span className="text-xs text-gray-300 font-medium">Featured Project</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl lg:text-3xl font-bold text-white hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-purple-600 hover:bg-clip-text transition-all duration-300">
          {title}
        </h3>

        {/* Description */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl blur-xl" />
          <p className="relative text-gray-300 leading-relaxed bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            {description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1.5 text-xs font-medium text-purple-300 bg-purple-600/10 border border-purple-500/20 rounded-lg hover:bg-purple-600/20 hover:border-purple-500/40 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons - Desktop */}
        <div className="hidden lg:flex gap-4 pt-2">
          <a
            href={demo_link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
          >
            Live Demo
            <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
          </a>
          {github_link && github_link !== "#" && (
            <a
              href={github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-purple-500/30 hover:border-purple-500/50 rounded-lg font-medium transition-all duration-300"
            >
              <Github size={18} />
              Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
