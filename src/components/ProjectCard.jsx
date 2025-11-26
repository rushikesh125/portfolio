"use client"
import React from "react";
import { useEffect } from "react";
// import { fadeUp } from "@/app/utils";
const ProjectCard = (props) => {
  const infoAlign = props.infoAlign || "right";
  const infoBgColor =
    props.infoBgColor ||
    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500";
  const cardTitle = props.title || "CMS Dashboard";
  const cardDescription =
    props.description ||
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,necessitatibus aliquam. Perspiciatis, obcaecati nulla inventore error totam nam nesciunt fugiat temporibus alias ex iure soluta tenetur repudiandae, autem fugit.";
  const cardTechStack = props.cardTechStack || [
    "React",
    "Node",
    "Express",
    "Tailwindcss",
    "MongoDB",
    "MUI",
  ];
  const poster_img = props?.images?.poster_img || "https://i.ibb.co/8D40B0c/sample-video.png"
  const demoLink = props.demo_link || "#";
  const githubLink = props.githubLink || "#";

  useEffect(() => {
    // fadeUp("fade-up", 800);
  }, []);

  return (
    <>
      <div
        className={`w-full md:w-6xl lg:8/12 fade-up mx-auto relative p-1 md:flex ${
          infoAlign == "right" ? "" : "flex-row-reverse"
        } items-center overflow-hidden my-10`}
      >
        <div
          className={`absolute w-32 h-32  md:w-56 md:h-56  z-0 ${infoBgColor} 
        ${
          infoAlign == "right" ? "right-0" : "left-0"
        } blur-[50px] md:blur-[100px] bottom-0 md:top-1/2 -translate-y-1/2`}
        ></div>
        <div className="w-full md:w-4/6 p-1  aspect-video z-10 md:z-20">
          <img
            src={poster_img}
            alt="project-img"
            className="aspect-video"
          />
        </div>
        <div
          className={`w-full md:w-3/6 p-1 relative md:flex flex-col justify-evenly ${
            infoAlign == "right" ? "items-end" : ""
          }  z-30`}
        >
          {/* <div className="py-4 hidden md:block"></div> */}
          <h1 className="font-bold text-4xl py-1 my-2">{cardTitle}</h1>
          <div className="w-full md:w-[120%]  py-3 my-3 px-2 rounded-sm text-gray-300">
            <p
              className="hidden md:block bg-white/10 backdrop-blur-md rounded-md border border-white/20 shadow-sm px-4 py-2"
              dir={`${infoAlign == "right" ? "rtl" : "ltr"}`}
            >
              {cardDescription}
            </p>
            <p className="md:hidden bg-white/10 backdrop-blur-md rounded-md border border-white/20 shadow-sm px-4 py-2">
              {cardDescription}
            </p>
          </div>

          {/* <div className="flex flex-wrap justify-evenly py-1 ">
           {cardTechStack.map((items)=> <li className="list-none mx-1" key={items}>{items}</li>)}
         
          </div> */}
          <div className="flex my-3">
            {/* <a href={`${githubLink}`} className="mx-3 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
            </a> */}
            <a href={`${demoLink}`} className="mx-3 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-box-arrow-up-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                />
                <path
                  fillRule="evenodd"
                  d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                />
              </svg>
            </a>
          </div>
          {/* <div className="py-4 hidden md:block"></div> */}
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
