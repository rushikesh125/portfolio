"use client";
import { useEffect } from "react";
import { BookOpen, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge"; // Shadcn UI
import { motion, useAnimation } from "framer-motion"; // For animations (Aceternity UI style)
import { my_education } from "@/education";

const EducationSection = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
    }));
  }, [controls]);

  return (
    <section className=" px-5 relative ">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center ">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-10 text-white">
          My Education
        </h2>

        <div className="flex flex-col gap-6 max-w-4xl justify-center ">
          {my_education.map((edu, index) => (
            <motion.div
              key={index}
              custom={index}
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
            >
              <div className="bg-black border-none  group relative rounded-3xl overflow-hidden">
                <div className="absolute bg-purple-600 w-20 h-20 blur-[50px] rounded-full z-0 right-0 top-0"></div>
                <div className="absolute bg-pink-700 w-20 h-20 blur-[50px] rounded-full z-0 left-0 bottom-0"></div>
                <div className="flex items-center space-x-4 p-6">
                  <img
                    src={edu.logoUrl}
                    alt={edu.altText}
                    className="w-12 h-12 object-contain rounded-full bg-white/10 p-1"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {edu.title}
                    </h3>
                    <p className="text-sm text-gray-300">{edu.subtitle}</p>
                  </div>
                </div>
                <div className="relative p-6 pt-0">
                  <div className="flex items-center space-x-2 mb-4">
                    <GraduationCap className="w-5 h-5 text-[#e200ff]" />
                    <p className="text-sm text-gray-200">{edu.period}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {edu.badges.map((badge, idx) => (
                      <Badge
                        key={idx}
                        className="bg-gradient-to-r from-pink-400/30 to-violet-400/30 text-white hover:from-pink-400/50 hover:to-violet-400/50 transition-colors"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{edu.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;