import React, { useEffect } from "react";
import { fadeUp } from "@/app/utils";
const Aboutme = () => {
  useEffect(()=>{
    fadeUp('fade-up',800)
  },[])
  return (
    <>
      <div className="w-full  relative p-2 min-h-[500px] z-50 fade-up">
        {/* <div className="relative w-full  h-full   rounded-2xl p-[1px] overflow-hidden"> */}
          {/* <div className="absolute border-rotation  origin-center  bg-slate-50/[0.30]  "></div> */}

          <div className=" w-full relative px-2 lg:px-28  rounded-2xl bg-[#0b001a] ">
            <h1 className="font-bold text-3xl py-4 inline-block heading">
              About me
            </h1>
            <div className="lg:flex flex-row-reverse text-slate-400">
              <div className="lg:w-1/2 ">
                <div className="relative min-h-[350px] md:min-h[450px]">
                  <img
                    src="https://i.ibb.co/1ZWyjxN/profile-img.png"
                    className="absolute w-1/2 md:w-[200px] lg:w-1/2 z-30 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
                    alt="profile-img"
                    border="0"
                  />
                  <img
                    src="/images/bg-shapre.svg"
                    className="absolute w-[200%] md:w-2/4 lg:w-11/12 z-20 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 "
                    alt="profile-img"
                    border="0"
                  />
                </div>
              </div>
              <div className="lg:w-1/2">
                <p>
                  Hello! I’m a passionate web developer and a current B.Tech
                  student in Computer Science and Engineering, blending
                  creativity with technical expertise to build modern,
                  responsive web applications. My journey in tech is fueled by a
                  deep enthusiasm for learning and exploring new tools and
                  technologies.
                </p>
                <br />
                <p>
                  With a strong foundation in JavaScript and Node.js, I’m adept
                  at both front-end and back-end development, creating seamless,
                  interactive user experiences and robust backend services. On
                  the front end, I excel in designing responsive, visually
                  appealing interfaces using React, Tailwind CSS, and Bootstrap.
                  For the back end, I leverage tools like Node.js, Express.js,
                  MongoDB, and MySQL to build scalable and efficient APIs and
                  databases.
                </p>
                <br />

                <p>
                  I’m also skilled with essential development tools such as Git,
                  GitHub, Postman, Figma, and Photoshop, ensuring streamlined
                  workflows and visually compelling designs. Whether it’s a
                  single-page application or a full-scale web platform, I’m
                  excited to turn ideas into reality with code. Driven by a
                  constant curiosity, I enjoy diving into new technologies,
                  enhancing my skills, and crafting projects that solve
                  real-world problems. Let’s build something great together!
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
