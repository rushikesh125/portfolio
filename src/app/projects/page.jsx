import React from "react";
import ProjectCard2 from "@/components/ProjectCard2";
import { TopProjects } from "@/projects"; // Adjust path if needed

const ProjectsPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white py-20 px-4 sm:px-6">
      
      {/* --- BACKGROUND EFFECTS --- */}
      
      {/* 1. Base Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* 2. Top Center Glow (Purple) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[100px] opacity-50 pointer-events-none"></div>
      
      {/* 3. Bottom Right Glow (Pink) */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-900/20 rounded-full blur-[120px] opacity-40 pointer-events-none"></div>

      
      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        
        {/* Page Header */}
        <div className="text-center space-y-6">
          <div className="inline-block">
            <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-purple-100 to-gray-400 bg-clip-text text-transparent tracking-tight pb-2">
              Featured Projects
            </h1>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2"></div>
          </div>
          
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            A showcase of my recent work in <span className="text-purple-400">Full Stack Development</span> and <span className="text-pink-400">AI integration</span>.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 justify-items-center">
          {TopProjects.map((project, index) => (
            <ProjectCard2
              key={index}
              title={project.title}
              description={project.description}
              images={project.images}
              demo_link={project.demo_link}
              // github_link={project.github_link} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;