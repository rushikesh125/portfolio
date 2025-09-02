"use client"
import { useEffect } from 'react';
import Link from 'next/link';
// import rishi from ".";
// import "../../public/style.css";
import GradientText from "./GradientText";
import CodeBlock from "./CodeBlock";
// import BackgroundSVG from ".";
//import ScrollReveal from 'scrollreveal';
// import { fadeUp } from '@/app/utils';
const Home = () => {
  useEffect(() => {
    // Initialize ScrollReveal
    // fadeUp('fade-up',1000);
    // fadeUp('fade-up-1200',1200);
    // ScrollReveal().reveal('.fade-up', {
    //   distance: '50px',
    //   duration: 1000,
    //   easing: 'ease-in-out',
    //   origin: 'bottom',
    //   reset: true, // Optionally resets the animation when scrolling in/out of view
    // });
  }, []);

  return (
    <div className="mt-10 lg:mt-14 lg:flex relative flex-row-reverse">
      <div className="w-full lg:w-1/2  flex justify-center align-center relative overflow-hidden">
        <div
          className="absolute top-10 lg:top-0 w-[350px] h-[350px] lg:w-[600px] lg:h-[600px] rounded-full bg-gradient-to-r from-[#e200ff] to-[#8400ff] -z-10 rotate-45 "
          style={{ boxShadow: "0px 0px 2rem #8400ff" }}
        ></div>
        <img src="/images/rishi3.png" alt="profile img" className="w-[300px] lg:w-[400px]" />
      </div>
      <div className="w-full lg:w-1/2  py-5 px-5 lg:py-20 relative">
        <h1 className="text-4xl font-extrabold">
          Hi , i'm{" "}
          <span className="text-white">Rishi</span>
        </h1>
        <h2 className="text-5xl font-bold">
          <GradientText text="Full-Stack MERN Developer" />
        </h2>
        <CodeBlock />
        <br />
        {/* get Resume Button  */}
        <div className="relative w-full ">
          <img
            src="/images/start-bg.svg"
            alt="background "
            className="absolute  left-1/2 -translate-x-1/2 -bottom-20 -z-10 w-[20rem] blur-sm"
          />
          <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
              <a href='/Resume.pdf' download={`Rushikesh_Gaikwad_Resume.pdf`}>Get Resume</a>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-pink-400/30 via-emerald-400/90 to-violet-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </button>

          {/* Github link Button  */}
          <div className="Social-links   inline-block absolute -top-2 right-0">
            <Link href={`https://github.com/rushikesh125`} target='_blank' className="p-2 fade-up inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-github "
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
            </Link>
            <Link href={`https://www.linkedin.com/in/rushi-gaikwad-643854202/`} target='_blank' className="p-2 fade-up-1200 inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-linkedin"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
