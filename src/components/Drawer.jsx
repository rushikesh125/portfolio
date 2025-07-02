import React, { useState } from "react";

const Drawer = () => {
  // State to manage drawer visibility
  const [isVisible, setIsVisible] = useState(false);

  // Function to open and hide the drawer
  const openDrawer = () => {
    setIsVisible(true);
  };
  const closeDrawer = () => {
    setIsVisible(false);
  };

  return (
    <>
      {/* Button to open the drawer */}
      <div >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 cursor-pointer"
          onClick={openDrawer}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 9h16.5m-16.5 6.75h16.5"
          />
        </svg>
      </div>

      {/* Drawer with smooth transition */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen bg-slate-500 w-full lg:w-1/2 transform transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h1 className="py-10 px-12">Hello</h1>
        {/* Close button */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 fixed top-0 right-0 m-4 cursor-pointer hover:text-gray-300"
          onClick={closeDrawer}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
    </>
  );
};

export default Drawer;
