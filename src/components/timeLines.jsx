import React, { useEffect, useRef, useState } from "react";
// import { fadeDown } from "../utils";
import "./svgstyle.css";
export const TimeLine1 = () => {
  const svgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (svgRef.current) {
      observer.observe(svgRef.current);
    }
    return () => {
      if (svgRef.current) observer.unobserve(svgRef.current);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 812 218"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` w-full animated-svg ${isVisible ? 'visible' : ''}`}
    >
      <defs>
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3498db" stopOpacity="1" />
          <stop offset="100%" stopColor="#9b59b6" stopOpacity="1" />
        </linearGradient>
      </defs>
      <circle cx="406" cy="48" r="25" fill="url(#pathGradient)" />
      <path
        d="M406 47V121C405.5 126.167 401.4 135.7 389 132.5H295.5C295.5 132.5 281.5 132.5 281.5 143V218"
        stroke="url(#pathGradient)"
        strokeWidth="3"
      />
    </svg>
  );
};

export const TimeLine2 = () => {
  const svgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (svgRef.current) {
      observer.observe(svgRef.current);
    }
    return () => {
      if (svgRef.current) observer.unobserve(svgRef.current);
    };
  }, []);

  return (
    <>
      <svg
        ref={svgRef}
        className={`timeline-svg ms-10 md:ms-32 ${isVisible ? "visible" : ""}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3498db" stopOpacity="1" />
            <stop offset="100%" stopColor="#9b59b6" stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle cx="13.5" cy="0.5" r="12" stroke="url(#pathGradient)" />
        <circle
          cx="13.5"
          cy="0.5"
          r="9"
          fill="url(#pathGradient)"
          stroke="url(#pathGradient)"
        />
        <path
          d="M13 1V44C13 44 12 50.5 19 52H93.5C93.5 52 99 51.5 100 57.5V76.5V106.5V150.5"
          stroke="url(#pathGradient)"
          strokeWidth="3"
        />
      </svg>
    </>
  );
};

export const TimeLine3 = () => {
  const svgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (svgRef.current) {
      observer.observe(svgRef.current);
    }
    return () => {
      if (svgRef.current) observer.unobserve(svgRef.current);
    };
  }, []);

  return (
    <>
      <svg
        ref={svgRef}
        width="726"
        height="171"
        viewBox="0 0 726 171"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`timeline3-svg w-full  ${isVisible ? "visible" : ""}`}
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3498db" stopOpacity="1" />
            <stop offset="100%" stopColor="#9b59b6" stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle cx="363" r="31.5" stroke="url(#pathGradient)" />
        <circle
          cx="363"
          r="19.5"
          fill="url(#pathGradient)"
          stroke="url(#pathGradient)"
        />
        <path
          d="M363 0V48.5C362.524 51.3333 359.951 57.2 353.471 58C346.991 58.8 231.976 58.3333 175.278 58C175.278 58 160.509 55 163.367 66.5V165.5"
          stroke="url(#pathGradient)"
          strokeWidth="3"
        />
        <path
          d="M363 0V48.6465C363.476 51.4884 366.049 57.3728 372.529 58.1752C379.009 58.9776 494.024 58.5096 550.722 58.1752C550.722 58.1752 565.491 55.1662 562.633 66.7009V166"
          stroke="url(#pathGradient)"
          strokeWidth="3"
        />
      </svg>
    </>
  );
};

export const TimeLine3ForMobile = () => {
  const svgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (svgRef.current) {
      observer.observe(svgRef.current);
    }
    return () => {
      if (svgRef.current) observer.unobserve(svgRef.current);
    };
  }, []);

  return (
    <>
      <svg
        ref={svgRef}
        viewBox="0 0 397 166"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`timeline3-svg ms-5 w-1/2  ${isVisible ? "visible" : ""}`}
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3498db" stopOpacity="1" />
            <stop offset="100%" stopColor="#9b59b6" stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle cx="365" r="31.5" stroke="url(#pathGradient)" />
        <circle
          cx="365"
          r="19.5"
          fill="url(#pathGradient)"
          stroke="url(#pathGradient)"
        />
        <path
          d="M365 0V48.5C364.524 51.3333 361.951 57.2 355.471 58C348.991 58.8 233.976 58.3333 177.278 58C177.278 58 162.509 55 165.367 66.5V165.5"
          stroke="url(#pathGradient)"
          strokeWidth="3"
        />
      </svg>
    </>
  );
};
