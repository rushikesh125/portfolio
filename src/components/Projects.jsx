import React from 'react'
import ProjectCard from './ProjectCard'
import { TopProjects } from '@/projects'
const Projects = () => {
  
  return (
   <>
   <div className="w-full relative  p-2 min-h-[500px] z-50">
        <div className="relative w-full  h-full   rounded-2xl p-[1px] overflow-hidden">

          <div className=" w-full relative px-2 lg:px-28  rounded-2xl bg-[#0b001a] ">
            <h1 className="font-bold text-3xl py-4 inline-block heading">
              Some Things I've Build
            </h1>
            <ProjectCard {...TopProjects[0]}/>
            <ProjectCard {...TopProjects[1]} infoAlign="left" cardTechStack={["Nodejs","NextJS","TailwindCSS","ExpressJS"]}/>
            <ProjectCard {...TopProjects[2]} />
            
          </div>
        </div>
      </div>
   </>
  )
}

export default Projects