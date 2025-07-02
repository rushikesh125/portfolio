import React, { useEffect } from "react";
import { MagicCard } from "./MagicCard";
// import reactpng from "../images/react.png";
// import nodejspng from "../images/nodejs.png";
// import jspng from "../images/js.png"
// import tailwindcsspng from "../images/tailwindcss.png"
// import bootstrappng from "../images/bootstrap.png"
// import htmlcss from "../images/htmlcss.png"
// import expreesjs from "../images/expressjs.png"
// import nextjspng from "../images/nextjs.png"
// import gopng from "../images/go.png"
// import mongodbpng from "../images/mongodb.png"
// import mysqlpng from "../images/mysql.png"
// import oraclepng from "../images/oracle.png"
// import postresqlpng from "../images/postresql.png"
// import postmanpng from "../images/postman.png"
// import githubpng from "../images/github.png"
// import figmapng from "../images/figma.png"
// import photoshoppng from "../images/photoshop.png"
import { fadeLeft } from "@/app/utils";
const Skills = () => {

  useEffect(()=>{
    // fadeLeft('fade-left',1000,1200);
    // fadeLeft('fade-left-1400',1000,1400);
    // fadeLeft('fade-left-1600',1000,1600);
    // fadeLeft('fade-left-1800',1000,1800);
    // fadeLeft('fade-left-2000',1000,2000);
  })
  return (
    <>
      {/* <div className=" p-1 relative ">
        <div className="w-full p-1">
          <h1 className="font-bold text-3xl  inline-block heading ms-5 md:ms-20">
            Skills
          </h1>

          <div className="md:flex gap-4 justify-center flex-wrap">
            <div className="relative z-10 flex flex-col justify-start items-start overflow-hidden md:w-3/6 lg:w-5/12 mt-10 p-[2px] ">
              <div className="absolute w-[120%] h-28  -left-20 animate-spin-slow origin-center -z-10  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hidden lg:block "></div>
              <MagicCard>
                <h1 className="font-semibold text-xl border-b inline-block">
                  Frontend
                </h1>
                <p className="py-2 text-gray-300">
                  Skilled in creating modern, responsive interfaces with
                  technologies like React, Tailwind CSS, and Bootstrap, ensuring
                  engaging and intuitive user experiences.
                </p>
                <div className="flex flex-wrap justify-evenly items-center gap-4">
                  <div className="bg-slate-900 shadow-2xl w-20 h-20 my-2 text-center flex flex-col items-center justify-center fade-left ">
                    <img src={reactpng} alt="pnglogo" className="w-10 h-10" />
                    ReactJS
                  </div>
                  <div className="bg-slate-900 shadow-2xl w-20 h-20 my-2 text-center flex flex-col items-center justify-center fade-left-1400">
                    <img src={jspng} alt="pnglogo" className="w-10 h-10" />
                    JavaScript
                  </div>
                  <div className="bg-slate-900 shadow-2xl w-20 h-20 my-2 text-center flex flex-col items-center justify-center fade-left-1600">
                    <img src={tailwindcsspng} alt="pnglogo" className="w-10 h-10" />
                    Tailwindcss
                  </div>
                  <div className="bg-slate-900 shadow-2xl w-20 h-20 my-2 text-center flex flex-col items-center justify-center fade-left-1800">
                    <img src={bootstrappng} alt="pnglogo" className="w-10 h-10" />
                    Bootstrap
                  </div>
                  <div className="bg-slate-900 shadow-2xl w-20 h-20 my-2 text-center flex flex-col items-center justify-center fade-left-2000 ">
                    <img src={htmlcss} alt="pnglogo" className="w-10 h-10" />
                    HTML-CSS
                  </div>
                </div>
              </MagicCard>
            </div>
            <div className="relative z-10 flex flex-col justify-start items-start overflow-hidden md:w-3/6 lg:w-5/12 mt-10 p-[2px] shadow-2xl">
              <div className="absolute w-[120%] h-28  -left-20 animate-spin-slow origin-center -z-10  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hidden lg:block"></div>
              <MagicCard>
                <h1 className="font-semibold text-xl border-b inline-block">
                  Backend
                </h1>
                <p className="py-2 text-gray-300">
                  Experienced in building scalable backend services using
                  Node.js and Express, with a strong focus on secure API
                  development and performance optimization.
                </p>
                <div className="flex flex-wrap justify-evenly items-center gap-4">
                  <div className="bg-slate-900 shadow-2xl w-20 h-20 my-2 text-center flex flex-col items-center justify-center fade-left ">
                    <img src={nodejspng} alt="pnglogo" className="w-10 h-10" />
                    NodeJS
                  </div>
                  <div className="bg-slate-900 shadow-2xl w-20 h-20 my-2 text-center flex flex-col items-center justify-center fade-left-1400">
                    <img src={expreesjs} alt="pnglogo" className="w-10 h-10" />
                    ExpreesJS
                  </div>
                  <div className="bg-slate-900 shadow-2xl w-20 h-20 my-2 text-center flex flex-col items-center justify-center fade-left-1600">
                    <img src={nextjspng} alt="pnglogo" className="w-10 h-10" />
                    NextJS
                  </div>
                  <div className="bg-slate-900 shadow-2xl w-20 h-20 my-2 text-center flex flex-col items-center justify-center fade-left-1800">
                    <img src={gopng} alt="pnglogo" className="w-10 h-10" />
                    Go 
                  </div>
                  
                </div>
              </MagicCard>
            </div>

            <div className="relative z-10 flex flex-col justify-start items-start overflow-hidden md:w-3/6 lg:w-5/12 mt-10 p-[2px] ">
              <div className="absolute w-[120%] h-28  -left-20 animate-spin-slow origin-center -z-10  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hidden lg:block "></div>
              <MagicCard>
                <h1 className="font-semibold text-xl border-b inline-block">
                  Databases
                </h1>
                <p className="py-2 text-gray-300">
                  Proficient in data management with MongoDB, MySQL, and Oracle,
                  ensuring efficient storage solutions and smooth data handling
                  across applications.
                </p>
                <div className="flex flex-wrap justify-evenly items-center gap-4">
                  <div className="bg-slate-900 shadow-2xl w-20 h-20 my-2 text-center flex flex-col items-center justify-center fade-left">
                    <img src={mongodbpng} alt="pnglogo" className="w-10 h-10" />
                    MongoDB
                  </div>
                  <div className="bg-slate-900 shadow-2xl w-20 h-20 my-2 text-center flex flex-col items-center justify-center fade-left-1400">
                    <img src={mysqlpng} alt="pnglogo" className="w-10 h-10" />
                    MySQL
                  </div>
                  <div className="bg-slate-900 shadow-2xl w-20 h-20 my-2 text-center flex flex-col items-center justify-center fade-left-1600">
                    <img src={oraclepng} alt="pnglogo" className="w-10 h-10" />
                    oracle
                  </div>
                  <div className="bg-slate-900 shadow-2xl w-20 h-20 my-2 text-center flex flex-col items-center justify-center fade-left-1800">
                    <img src={postresqlpng} alt="pnglogo" className="w-10 h-10" />
                    PostreSQL
                  </div>
                </div>
              </MagicCard>
            </div>

            <div className="relative z-10 flex flex-col justify-start items-center overflow-hidden md:w-3/6 lg:w-5/12 mt-10 p-[2px] ">
              <div className="absolute w-[120%] h-28  -left-20 animate-spin-slow origin-center -z-10  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hidden lg:block "></div>
              <MagicCard>
                <h1 className="font-semibold text-xl border-b inline-block">
                Tools and Technologies
                </h1>
                <p className="py-2 text-gray-300">
                Versatile in using tools like Git, GitHub, Postman, Figma, and Photoshop, supporting seamless development, collaboration, and design workflows.
                </p>
                <br />
                <div className="flex flex-wrap justify-evenly items-center gap-4">
                  <div className="bg-slate-900 shadow-2xl w-20 h-20 my-2 text-center flex flex-col items-center justify-center fade-left">
                    <img src={postmanpng} alt="pnglogo" className="w-10 h-10" />
                    Postman
                  </div>
                  <div className="bg-slate-900 shadow-2xl w-20 h-20 my-2 text-center flex flex-col items-center justify-center fade-left-1400">
                    <img src={githubpng} alt="pnglogo" className="w-10 h-10" />
                    Github
                  </div>
                  <div className="bg-slate-900 shadow-2xl w-20 h-20 my-2 text-center flex flex-col items-center justify-center fade-left-1600">
                    <img src={figmapng} alt="pnglogo" className="w-10 h-10" />
                    Figma
                  </div>
                  <div className="bg-slate-900 shadow-2xl w-20 h-20 my-2 text-center flex flex-col items-center justify-center fade-left-1800">
                    <img src={photoshoppng} alt="pnglogo" className="w-10 h-10" />
                    Photoshop
                  </div>
                 
                </div>
              </MagicCard>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Skills;
