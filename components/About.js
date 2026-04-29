"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation
      const words = gsap.utils.toArray(".reveal-word");
      gsap.fromTo(
        words,
        { color: "rgba(255, 255, 255, 0.15)" },
        {
          color: "rgba(255, 255, 255, 1)",
          stagger: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: ".text-reveal-container",
            start: "top 75%",
            end: "bottom 50%",
            scrub: true,
          },
        }
      );

      // Image Parallax
      gsap.fromTo(
        ".about-img",
        { scale: 1 },
        {
          scale: 1.15,
          y: "10%",
          ease: "none",
          scrollTrigger: {
            trigger: ".about-img-container",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const text = "I am Animesh Poudel. An aspiring frontend & mobile developer building immersive software that doesn't just work—it feels alive.";
  const wordsArray = text.split(" ");

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-40 relative z-10 bg-[#050505]">
      <div className="container mx-auto px-6 max-w-7xl relative">
        
        {/* Scrub Reveal Text */}
        <div className="text-reveal-container max-w-5xl mb-16 md:mb-20">
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight uppercase tracking-tight">
            {wordsArray.map((word, i) => (
              <span
                key={i}
                className="reveal-word inline-block mr-[0.3em]"
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

      </div>
    </section>
  );
}
