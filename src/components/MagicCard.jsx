"use client"
import React, { useCallback, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/app/utils"; // Ensure this utility is defined in your project
import { fadeUp } from "@/app/utils";
// Create the MagicCard component
export const MagicCard = ({
  children,
  className,
  gradientSize = 200,
  gradientColor = "#bd4ff0",
  gradientOpacity = 0.8,
}) => {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  // Handle mouse movement within the card
  const handleMouseMove = useCallback(
    (e) => {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    },
    [mouseX, mouseY]
  );

  // Reset mouse position when leaving the card
  const handleMouseLeave = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  // Set initial mouse position when the component mounts
  useEffect(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  useEffect(()=>{
    fadeUp('fade-up',800)
  },[])

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative p-[1px] w-full h-full  overflow-hidden bg-slate-950 fade-up",
        className
      )}
    >
      <div className="relative z-10 p-4 flex flex-col">
        {children}
        </div>
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
          `,
          opacity: gradientOpacity,
        }}
      />
    </div>
  );
};