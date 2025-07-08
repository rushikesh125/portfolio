"use client"
import React, { useEffect } from "react";
import { fadeUp } from "@/app/utils";
import AboutSvgme from "./svg/Aboutme";
const Aboutme = () => {
  useEffect(() => {
    // fadeUp("fade-up", 800);
  }, []);
  return (
    <>
      <div className="w-full  relative p-2 min-h-[500px] z-50 fade-up">
        {/* <div className="relative w-full  h-full   rounded-2xl p-[1px] overflow-hidden"> */}
        {/* <div className="absolute border-rotation  origin-center  bg-slate-50/[0.30]  "></div> */}

        <div className=" w-full relative px-2 lg:px-28  rounded-2xl bg-[#0b001a] ">
          <h1 className="font-bold text-3xl py-4 inline-block heading">
            About me
          </h1>
          <div className="lg:flex flex-row-reverse text-slate-200">
            <div className="lg:w-1/2 ">
              <div className="relative min-h-[350px] md:min-h[450px] overflow-hidden flex justify-center items-center">
                
                <AboutSvgme/>
                
              </div>
            </div>
            <div className="lg:w-1/2">
              <p>
                Hi, I'm Rushikesh Gaikwad — a passionate and dynamic Full-Stack
                Web Developer and B.Tech Computer Science & Engineering student
                from Maharashtra, India. I specialize in building scalable,
                intelligent, and user-centric web applications that solve
                real-world problems with modern technologies and AI-driven
                innovation.
                <br />
                With a strong foundation in both front-end and back-end
                development, I bring ideas to life through technologies like
                React.js, Next.js, Node.js, Express.js, MongoDB, and MySQL. I
                love creating intuitive user interfaces with Tailwind CSS,
                Bootstrap, and responsive design best practices, ensuring a
                seamless experience across devices.
              </p>
              <br />
              <p>
                But what truly sets me apart is my enthusiasm for AI integration
                in web apps. I’ve worked extensively with LLMs like Google
                Gemini, building AI-based systems including a Resume Analyzer,
                Personalized Course Generator, and Career Counsellor — all
                utilizing Retrieval-Augmented Generation (RAG) and smart
                matching systems to empower users with actionable insights. I’ve
                won multiple hackathons for developing innovative, AI-powered
                platforms — blending creativity, strategy, and cutting-edge
                tools. My development workflow is efficient and collaborative,
                powered by tools like GitHub, Postman, Figma, Docker, and
                Photoshop.
              </p>
              <br />

              <p>
                Driven by curiosity and an entrepreneurial mindset, I'm
                constantly exploring new technologies, frameworks, and
                problem-solving techniques. Whether it’s a next-gen e-commerce
                platform, an intelligent learning assistant, or a career
                guidance system — I love crafting solutions that make a
                difference. 
                <br/>Let’s build something transformative together!
              </p>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Aboutme;
