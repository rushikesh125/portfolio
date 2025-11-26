"use client"

import React from "react";
import Typewriter from "typewriter-effect";

const CodeBlock = () => {
  return (
    <div className="relative w-full mt-4 rounded-xl  bg-gradient-to-br from-black/40 to-purple-900/20 overflow-hidden border border-purple-500/20 backdrop-blur-sm shadow-xl">
      {/* Gradient bottom line */}
      <span className="absolute w-full bottom-0 left-0 h-[2px] bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600" />
      
      {/* Header dots */}
      <div className="w-full border-b border-purple-500/20 py-2 px-4 bg-black/20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
      </div>

      {/* Code content */}
      <div className="flex text-gray-300 relative w-full p-4">
        {/* Line numbers */}
        <div className="flex flex-col text-gray-600 text-sm font-mono pr-4 border-r border-purple-500/20 select-none">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>

        {/* Typewriter text */}
        <div className="flex-1 pl-4 text-sm lg:text-base font-mono">
          <Typewriter
            options={{
              strings: [
                'I build <span style="color: #a855f7;">scalable</span> full-stack applications with <span style="color: #ec4899;">React, Node.js & MongoDB</span>.',
                'Passionate about creating <span style="color: #a855f7;">modern web experiences</span> with <span style="color: #ec4899;">AI integration</span>.',
                'Specialized in <span style="color: #a855f7;">responsive design</span> using <span style="color: #ec4899;">Tailwind CSS & Next.js</span>.',
              ],
              autoStart: true,
              loop: true,
              deleteSpeed: 30,
              delay: 50,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
