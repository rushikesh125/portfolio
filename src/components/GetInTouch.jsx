import React from "react";

const GetInTouch = () => {
  return (
    <>
      <div className="px-2 py-20 relative overflow-hidden">
        <div className="absolute -bottom-40 md:bottom-2/3 left-1/2 -z-10 w-[300px] h-[300px] bg-purple-500 rounded-full -translate-x-1/2 blur-[90px]"></div>
        <div className="absolute -bottom-40 md:-bottom-2/3 left-1/2 -z-10 w-[300px] h-[300px] bg-pink-500 rounded-full -translate-x-1/2 blur-[90px]"></div>
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-6xl text-white">
            Get In Touch
          </h1>
          <p className="mt-6 text-lg leading-8 px-2 md:px-44">
          Let’s turn your vision into reality! If you're seeking a skilled developer passionate about impactful design and functionality, I'd love to connect. Drop me a message at <code className="border-b py-1">rushi7gaikwad@gmail.com</code> —let's build something exceptional together!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="mailto:rushi7gaikwad@gmail.com"
              className="rounded-3xl bg-white text-violet-700 px-3.5 py-2.5 text-sm font-semibold  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Connect me <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetInTouch;
