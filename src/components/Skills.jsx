import React from "react";
import { MagicCard } from "./MagicCard";

const skillsData = [
  {
    title: "Frontend",
    description:
      "Skilled in creating modern, responsive interfaces with technologies like React, Tailwind CSS, and Bootstrap, ensuring engaging and intuitive user experiences.",
    skills: [
      { name: "ReactJS", icon: "/images/react.png" },
      { name: "JavaScript", icon: "/images/js.png" },
      { name: "Tailwindcss", icon: "/images/tailwindcss.png" },
      { name: "Bootstrap", icon: "/images/bootstrap.png" },
      { name: "HTML-CSS", icon: "/images/htmlcss.png" },
    ],
  },
  {
    title: "Backend",
    description:
      "Experienced in building scalable backend services using Node.js and Express, with a strong focus on secure API development and performance optimization.",
    skills: [
      { name: "NodeJS", icon: "/images/nodejs.png" },
      { name: "ExpressJS", icon: "/images/expressjs.png" },
      { name: "NextJS", icon: "/images/nextjs.png" },
      { name: "Firebase", icon: "/images/firebase.png" },
    ],
  },
  {
    title: "Databases",
    description:
      "Proficient in data management with MongoDB, MySQL, and Oracle, ensuring efficient storage solutions and smooth data handling across applications.",
    skills: [
      { name: "MongoDB", icon: "/images/mongodb.png" },
      { name: "MySQL", icon: "/images/mysql.png" },
      { name: "Oracle", icon: "/images/oracle.png" },
      { name: "PostgreSQL", icon: "/images/postresql.png" },
    ],
  },
  {
    title: "Tools and Technologies",
    description:
      "Versatile in using tools like Git, GitHub, Postman, Figma, and Photoshop, supporting seamless development, collaboration, and design workflows.",
    skills: [
      { name: "Postman", icon: "/images/postman.png" },
      { name: "GitHub", icon: "/images/github.png" },
      { name: "GitLab", icon: "/images/gitlab.png" },
      { name: "Figma", icon: "/images/figma.png" },
      { name: "Photoshop", icon: "/images/photoshop.png" },
      { name: "Docker", icon: "/images/docker.png" },
    ],
  },
];

const Skills = () => {
  return (
    <div className="p-1 relative">
      <div className="w-full p-1">
        <h1 className="font-bold text-3xl inline-block heading ms-5 md:ms-20">
          Skills
        </h1>

        <div className="md:flex gap-4 justify-center flex-wrap">
          {skillsData.map((section, index) => (
            <div
              key={index}
              className="relative z-10 flex flex-col justify-start items-start overflow-hidden md:w-3/6 lg:w-5/12 mt-10 p-[2px]"
            >
              <div className="absolute w-[120%] h-28 -left-20 animate-spin-slow origin-center -z-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hidden lg:block"></div>
              <MagicCard>
                <h1 className="font-semibold text-xl border-b inline-block">
                  {section.title}
                </h1>
                <p className="py-2 text-gray-300">{section.description}</p>
                <div className="flex flex-wrap justify-evenly items-center gap-4">
                  {section.skills.map((skill, i) => (
                    <div
                      key={i}
                      className="bg-slate-900 shadow-2xl w-20 h-20 my-2 text-center flex flex-col items-center justify-center"
                    >
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-10 h-10"
                      />
                      {skill.name}
                    </div>
                  ))}
                </div>
              </MagicCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
