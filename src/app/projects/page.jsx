import React from "react";
import { TopProjects } from "@/projects";
import ProjectCard from "@/components/ProjectCard";
const ProjectsPage = () => {
  return (
    <div className="p-3 md:p-6 min-h-[90vh]">
      <div className="mt-10">
        <h1 className="font-bold text-3xl py-4 inline-block heading">
         My Projects
        </h1>
        <div className="flex flex-wrap gap-2 md:gap-4 lg:gap-6">
           {TopProjects?.length >= 1 && TopProjects?.map((project,ind)=> (
             <ProjectCard key={project?.id} infoAlign={ind%2 == 0?"":"left"} {...project}/>
           ))} 
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
