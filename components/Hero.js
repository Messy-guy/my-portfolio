"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroWrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for hero lines
      gsap.fromTo(".hero-line-anim", 
        { y: 150, opacity: 0, rotate: 5 }, 
        { y: 0, opacity: 1, rotate: 0, duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 0.2 }
      );

      // Hero Parallax (Text moves slightly up on scroll)
      gsap.to(heroWrapperRef.current, {
        y: -200,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroWrapperRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroWrapperRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="h-[100dvh] relative flex items-center justify-center overflow-hidden pt-20 bg-[#050505]">
      <div
        ref={heroWrapperRef}
        className="container mx-auto px-4 z-10 relative pointer-events-auto flex flex-col items-center mix-blend-difference w-full"
      >
        
        {/* Clean, Massive Typography with Elegant Hover Tag Reveal */}
        <div className="w-full max-w-[1200px] flex flex-col items-center">
          
          <div className="group relative w-full flex justify-center hover-trigger cursor-none py-2 overflow-hidden">
            <div className="hero-line-anim">
              <h1 className="font-display text-[15vw] md:text-[12vw] leading-none font-bold uppercase tracking-tighter text-white transition-all duration-500 group-hover:opacity-10 group-hover:blur-sm">
                FULL STACK
              </h1>
            </div>
            
            {/* Hidden Tags that fade in on hover */}
            <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 scale-95 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 pointer-events-none">
              <span className="px-6 py-3 rounded-full border border-white/30 text-white font-display uppercase tracking-widest text-sm md:text-xl backdrop-blur-md bg-white/5">Flutter</span>
              <span className="px-6 py-3 rounded-full border border-[#61DAFB]/50 text-[#61DAFB] font-display uppercase tracking-widest text-sm md:text-xl backdrop-blur-md bg-[#61DAFB]/5">React</span>
              <span className="px-6 py-3 rounded-full border border-[#06B6D4]/50 text-[#06B6D4] font-display uppercase tracking-widest text-sm md:text-xl backdrop-blur-md bg-[#06B6D4]/5">Tailwind</span>
            </div>
          </div>

          <div className="group relative w-full flex justify-center hover-trigger cursor-none py-2 mt-[-2vw] overflow-hidden">
            <div className="hero-line-anim">
              <h1 className="font-display text-[15vw] md:text-[12vw] leading-none font-bold uppercase tracking-tighter text-transparent transition-all duration-500 group-hover:opacity-10 group-hover:blur-sm" style={{ WebkitTextStroke: "2px white" }}>
                DEVELOPER.
              </h1>
            </div>

            {/* Hidden Tags that fade in on hover */}
            <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 scale-95 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 pointer-events-none">
              <span className="px-6 py-3 rounded-full border border-white/30 text-white font-display uppercase tracking-widest text-sm md:text-xl backdrop-blur-md bg-white/5">UI / UX</span>
              <span className="px-6 py-3 rounded-full border border-[#FFCA28]/50 text-[#FFCA28] font-display uppercase tracking-widest text-sm md:text-xl backdrop-blur-md bg-[#FFCA28]/5">Firebase</span>
              <span className="px-6 py-3 rounded-full border border-accent/50 text-accent font-display uppercase tracking-widest text-sm md:text-xl backdrop-blur-md bg-accent/5">App Maker</span>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50 pointer-events-none">
        <span className="font-display text-[10px] md:text-xs uppercase tracking-[0.3em]">
          Scroll
        </span>
        <div className="w-[1px] h-12 md:h-16 bg-white/20 relative overflow-hidden">
          <div className="w-full h-full bg-white absolute top-0 left-0 animate-[scrolldown_2s_cubic-bezier(0.77,0,0.175,1)_infinite]"></div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scrolldown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
