import React from "react";

export const Button1 = () => {
  return (
    <div className="relative mx-auto p-[2px] w-fit overflow-hidden text-center flex justify-center items-center rounded-xl">
        <div className=" absolute  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-[200%] h-8 animate-spin-slow"></div>
      <button className="relative z-30 bg-slate-900 py-2 px-4 rounded-xl">Explore All</button>
    </div>
  );
};

