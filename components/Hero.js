"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ data, metrics }) {
  const containerRef = useRef(null);

  const heroData = data || {
    title1: "FULL STACK",
    title1Hover: "SYSTEM ARCHITECT",
    title2: "DEVELOPER.",
    title2Hover: "CREATOR.",
    tagline: "Scroll"
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for headings
      gsap.fromTo(".hero-line-anim", 
        { y: 150, opacity: 0, rotate: 5 }, 
        { y: 0, opacity: 1, rotate: 0, duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 0.2 }
      );



      // The Cinematic Apple-Style Zoom-Through
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=800", // Smooth scroll zone
          scrub: 1,
          pin: true,
          pinType: "transform",
          pinSpacing: true,
        }
      });

      // Zoom headings away, fade widgets grid down cleanly
      tl.to(".hero-line-1", { scale: 35, y: -400, opacity: 0, ease: "power2.inOut" }, 0);
      tl.to(".hero-line-2", { scale: 35, y: 400, opacity: 0, ease: "power2.inOut" }, 0);
      tl.to(".scroll-indicator", { opacity: 0, duration: 0.1 }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex flex-col justify-between items-center bg-transparent overflow-hidden pt-28 pb-16 z-10">
      
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_75%)] pointer-events-none"></div>

      {/* Main Cinematic Headers */}
      <div className="relative z-10 w-full px-6 pointer-events-auto flex-grow flex flex-col justify-center">
        <div className="w-full flex flex-col items-center mx-auto">
          
          <div className="group relative w-full flex justify-center hover-trigger py-2 overflow-hidden hero-line-1 origin-bottom">
            <div className="hero-line-anim">
              <h1 className="font-display text-[10vw] md:text-[clamp(3.5rem,7vw,12rem)] leading-[0.85] font-bold uppercase tracking-tighter text-foreground relative">
                {/* Default Text */}
                <span className="block transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-full group-active:opacity-0 group-active:-translate-y-full">
                  {heroData.title1}
                </span>
                {/* Hover Text */}
                <span className="absolute top-0 left-0 w-full text-center text-accent transition-all duration-500 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 group-active:opacity-100 group-active:translate-y-0">
                  {heroData.title1Hover}
                </span>
              </h1>
            </div>
          </div>

          <div className="group relative w-full flex justify-center hover-trigger py-2 mt-[-0.5vw] overflow-hidden hero-line-2 origin-top">
            <div className="hero-line-anim">
              <h1 
                className="font-display text-[10vw] md:text-[clamp(3.5rem,7vw,12rem)] leading-[0.85] font-bold uppercase tracking-tighter text-transparent relative" 
                style={{ WebkitTextStroke: "1.5px var(--color-foreground)" }}
              >
                {/* Default Text */}
                <span className="block transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-full group-active:opacity-0 group-active:-translate-y-full">
                  {heroData.title2}
                </span>
                {/* Hover Text */}
                <span 
                  className="absolute top-0 left-0 w-full text-center text-accent2 transition-all duration-500 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 group-active:opacity-100 group-active:translate-y-0"
                  style={{ WebkitTextStroke: "0px" }}
                >
                  {heroData.title2Hover}
                </span>
              </h1>
            </div>
          </div>

        </div>
      </div>

      <div className="scroll-indicator flex flex-col items-center gap-2 text-foreground/30 relative z-10">
        <span className="font-display text-xs tracking-[0.3em] uppercase">{heroData.tagline}</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-foreground/30 to-transparent"></div>
      </div>
    </section>
  );
}

