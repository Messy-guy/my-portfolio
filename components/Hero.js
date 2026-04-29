"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);



  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(".hero-line-anim", 
        { y: 150, opacity: 0, rotate: 5 }, 
        { y: 0, opacity: 1, rotate: 0, duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 0.2 }
      );

      // The Cinematic Apple-Style Zoom-Through
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600", // Significantly reduced the gap!
          scrub: 1,
          pin: true,
          pinType: "transform", // Fixes layout shifting on unpin
          pinSpacing: false, // Prevents the empty padding gap at the bottom
        }
      });

      // Snappy scaling and quick fade to reveal the next section faster
      tl.to(".hero-line-1", { scale: 50, y: -500, opacity: 0, ease: "power2.inOut" }, 0);
      tl.to(".hero-line-2", { scale: 50, y: 500, opacity: 0, ease: "power2.inOut" }, 0);
      tl.to(".scroll-indicator", { opacity: 0, duration: 0.1 }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex flex-col justify-center items-center bg-transparent overflow-hidden pt-20 z-10">
      
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>

      <div className="relative z-10 w-full px-4 md:px-12 pointer-events-auto">
        <div className="w-full flex flex-col items-center mx-auto">
          
          <div className="group relative w-full flex justify-center hover-trigger py-2 overflow-hidden hero-line-1 origin-bottom">
            <div className="hero-line-anim">
              <h1 className="font-display text-[14vw] md:text-[clamp(5rem,11vw,16rem)] leading-[0.85] font-bold uppercase tracking-tighter text-white relative">
                {/* Default Text */}
                <span className="block transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-full group-active:opacity-0 group-active:-translate-y-full">
                  FULL STACK
                </span>
                {/* Hover Text */}
                <span className="absolute top-0 left-0 w-full text-center text-accent transition-all duration-500 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 group-active:opacity-100 group-active:translate-y-0">
                  SYSTEM ARCHITECT
                </span>
              </h1>
            </div>
          </div>

          <div className="group relative w-full flex justify-center hover-trigger py-2 mt-[-1vw] overflow-hidden hero-line-2 origin-top">
            <div className="hero-line-anim">
              <h1 
                className="font-display text-[14vw] md:text-[clamp(5rem,11vw,16rem)] leading-[0.85] font-bold uppercase tracking-tighter text-transparent relative" 
                style={{ WebkitTextStroke: "1.5px white" }}
              >
                {/* Default Text */}
                <span className="block transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-full group-active:opacity-0 group-active:-translate-y-full">
                  DEVELOPER.
                </span>
                {/* Hover Text */}
                <span 
                  className="absolute top-0 left-0 w-full text-center text-accent2 transition-all duration-500 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 group-active:opacity-100 group-active:translate-y-0"
                  style={{ WebkitTextStroke: "0px" }}
                >
                  CREATOR.
                </span>
              </h1>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-indicator">
        <div className="flex flex-col items-center gap-2 text-white/30">
          <span className="font-display text-xs tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
