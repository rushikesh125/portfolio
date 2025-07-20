"use client"
import React from "react";
import Drawer from "./Drawer";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="w-full flex justify-between py-5 fixed top-0 px-10 lg:py-4 lg:px-12 z-[999] bg-clip-padding  backdrop-filter backdrop-blur-sm bg-opacity-40 border-b border-slate-50/[0.10]">
        {/* <h1>Rishi</h1> */}
        <Link href={`/`}>Rishi</Link>
        <Drawer/>
      </div>
    </>
  );
};

export default Navbar;
