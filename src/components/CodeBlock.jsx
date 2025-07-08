"use client"
import React,{useEffect} from "react";
import Typewriter from "typewriter-effect";
//import ScrollReveal from 'scrollreveal';
const CodeBlock = () => {
    // useEffect(()=>{
    //     ScrollReveal().reveal('.fade-in-left', {
    //         distance: '50px',
    //         duration: 1000,
    //         origin: 'left',
    //         opacity: 0,
    //         reset:false
    //       });
    // },[])
  return (
    <div className="fade-in-left relative w-full mt-1 h-auto  rounded-lg flex bg-black overflow-hidden text-wrap flex-wrap border border-slate-500">
     <span className="absolute w-full -bottom-0 left-[1.125rem] h-px  bg-gradient-to-r from-pink-400/30 via-emerald-400/90 to-violet-400/0 transition-opacity duration-500 group-hover:opacity-40" />
      <div className="w-full border-b border-b-slate-500 py-1">
        <div className="w-3 h-3 rounded-full bg-slate-600 inline-block ms-2"></div>
        <div className="w-3 h-3 rounded-full bg-slate-600 inline-block ms-1"></div>
        <div className="w-3 h-3 rounded-full bg-slate-600 inline-block ms-1"></div>
      </div>
      <div className="flex text-gray-400 relative w-full">
        <div className="h-auto w-[10%] lg:w-[5%]  text-wrap flex flex-col">
          <div className=" px-2">1</div>
          <div className=" px-2">2</div>
          <div className=" px-2">3</div>
          <div className=" px-2">4</div>
          <div className=" px-2">5</div>
          <div className=" px-2">6</div>
        </div>

        <div className="relative min-w-[90%] lg:min-w-[95%]">
          <Typewriter
            className="border w-full"
            options={{
              strings: [
                "I am a proficient full-stack developer with expertise in responsive, modern web design using Tailwind CSS and Bootstrap. I specialize in developing scalable backend services with Node.js, Express.js, and MongoDB, delivering enterprise-level applications and websites.",
                "As a passionate problem solver, I create innovative solutions for enterprise-level services, ensuring high-quality software that is both performant and scalable",
                "I am skilled in React, JavaScript, Node.js, Express, MongoDB, RESTful APIs, MySQL, and Git, and I use tools like Postman and GitHub to streamline development. My experience spans various technologies essential for building dynamic and responsive web applications",
                "With strong experience in creating RESTful APIs and backend services, I excel in developing reliable, high-performance web solutions using Node.js, Express.js, MongoDB, MySQL, and Oracle. My skills enable me to tackle complex problems efficiently."
              ],
              autoStart: true,
              loop: true,
              deleteSpeed:2
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
