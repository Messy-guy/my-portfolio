"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({ text }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray(".reveal-word");
      
      gsap.fromTo(
        words,
        { color: "rgba(255, 255, 255, 0.1)" },
        {
          color: "rgba(255, 255, 255, 1)",
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 50%",
            scrub: true,
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Split text into words
  const words = text.split(" ");

  return (
    <div ref={containerRef} className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight uppercase tracking-tighter">
      {words.map((word, i) => (
        <span key={i} className="reveal-word inline-block mr-[0.3em] transition-colors duration-300 hover:text-accent active:text-accent hover-trigger">
          {word}
        </span>
      ))}
    </div>
  );
}
