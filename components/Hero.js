"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);

  const handleScramble = (e, originalText, hiddenText) => {
    const chars = "!<>-_\\\\/[]{}—=+*^?#_0123456789";
    let iteration = 0;
    const el = e.currentTarget;
    const targetText = e.type === "mouseenter" ? hiddenText : originalText;
    
    clearInterval(el.interval);
    
    el.interval = setInterval(() => {
      el.innerText = targetText
        .split("")
        .map((letter, index) => {
          if(index < iteration) return targetText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      
      if(iteration >= targetText.length) clearInterval(el.interval);
      iteration += 1 / 2;
    }, 30);
  };

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

      <div className="relative z-10 w-full px-6 md:px-12 pointer-events-auto">
        <div className="w-full max-w-[1200px] flex flex-col items-center mx-auto">
          
          <div className="group relative w-full flex justify-center hover-trigger py-2 overflow-hidden hero-line-1 origin-bottom">
            <div className="hero-line-anim">
              <h1 
                className="font-display text-[15vw] md:text-[12vw] leading-none font-bold uppercase tracking-tighter text-white transition-colors duration-500 hover:text-accent active:text-accent"
                onMouseEnter={(e) => handleScramble(e, "FULL STACK", "SYSTEM ARCHITECT")}
                onMouseLeave={(e) => handleScramble(e, "FULL STACK", "FULL STACK")}
                onTouchStart={(e) => handleScramble(e, "FULL STACK", "SYSTEM ARCHITECT")}
                onTouchEnd={(e) => handleScramble(e, "FULL STACK", "FULL STACK")}
              >
                FULL STACK
              </h1>
            </div>
          </div>

          <div className="group relative w-full flex justify-center hover-trigger py-2 mt-[-2vw] overflow-hidden hero-line-2 origin-top">
            <div className="hero-line-anim">
              <h1 
                className="font-display text-[15vw] md:text-[12vw] leading-none font-bold uppercase tracking-tighter text-transparent transition-colors duration-500 hover:text-accent2 active:text-accent2" 
                style={{ WebkitTextStroke: "2px white" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.WebkitTextStroke = "0px";
                  handleScramble(e, "DEVELOPER.", "CREATOR.");
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.WebkitTextStroke = "2px white";
                  handleScramble(e, "DEVELOPER.", "DEVELOPER.");
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.WebkitTextStroke = "0px";
                  handleScramble(e, "DEVELOPER.", "CREATOR.");
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.WebkitTextStroke = "2px white";
                  handleScramble(e, "DEVELOPER.", "DEVELOPER.");
                }}
              >
                DEVELOPER.
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
