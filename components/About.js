"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

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

      // Stats Reveal
      gsap.from(".stat-item", {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".stats-wrapper",
          start: "top 85%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const text = "I am Animesh Poudel. An aspiring frontend & mobile developer building immersive software that doesn't just work—it feels alive.";
  const wordsArray = text.split(" ");

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-40 relative z-10 bg-[#050505]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Scrub Reveal Text */}
        <div className="text-reveal-container max-w-5xl mb-24 md:mb-32">
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight uppercase tracking-tight">
            {wordsArray.map((word, i) => (
              <span key={i} className="reveal-word inline-block mr-[0.3em] transition-colors duration-100">
                {word}
              </span>
            ))}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">
          
          {/* Parallax Image */}
          <div className="about-img-container w-full lg:w-[45%] h-[50vh] md:h-[70vh] rounded-[2rem] overflow-hidden relative border border-white/10 shadow-2xl">
            <Image
              src="/images/MyImage.jpg"
              alt="Animesh Poudel"
              fill
              className="about-img object-cover object-center"
            />
          </div>

          {/* Bio & Stats */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center">
            <div className="space-y-6 md:space-y-8 text-base md:text-xl text-gray-400 font-light leading-relaxed">
              <p>
                Based in <strong className="text-white">Kathmandu</strong>, I specialize in crafting cross-platform mobile applications using <strong className="text-[#02569B]">Flutter</strong> and dynamic web experiences with the <strong className="text-[#61DAFB]">React ecosystem</strong>.
              </p>
              <p>
                My philosophy is simple: engineering and design are not separate disciplines. Beautiful UI without flawless logic is useless, and a robust backend without an intuitive interface is frustrating. I bridge the gap to create complete digital experiences.
              </p>
            </div>

            <div className="stats-wrapper grid grid-cols-2 gap-8 mt-16 pt-12 border-t border-white/10">
              <div className="stat-item">
                <h4 className="font-display text-5xl md:text-6xl font-bold text-white mb-2">03+</h4>
                <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest font-display">Years Experience</p>
              </div>
              <div className="stat-item">
                <h4 className="font-display text-5xl md:text-6xl font-bold text-accent2 mb-2">15+</h4>
                <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest font-display">Projects Delivered</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
