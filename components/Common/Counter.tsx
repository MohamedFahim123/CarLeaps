"use client";

import React, { useEffect, useRef, useState } from "react";

interface CounterProps {
  parentClass?: string;
  min?: number;
  max: number;
}

const Counter: React.FC<CounterProps> = ({ parentClass = "", min = 0, max }) => {
  const targetElement = useRef<HTMLSpanElement | null>(null);
  const [counted, setCounted] = useState<number>(min);

  const startCountup = () => {
    const intervalId = setInterval(() => {
      setCounted((prevCount) => {
        const tempCount = prevCount + Math.ceil(max / 20);
        if (tempCount >= max) {
          clearInterval(intervalId);
          return max;
        }
        return tempCount;
      });
    }, 50);
  };

  useEffect(() => {
    const handleIntersection = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCountup();
          observer.unobserve(entry.target);
        }
      });
    };

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    if (targetElement.current) {
      observer.observe(targetElement.current);
    }

    return () => {
      if (targetElement.current) {
        observer.unobserve(targetElement.current);
      }
    };
  }, []);

  return (
    <span ref={targetElement} className={parentClass}>
      {counted}
    </span>
  );
};

export default Counter;
