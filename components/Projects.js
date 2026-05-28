"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const fallbackProjects = [
  {
    id: "02",
    category: "AIR QUALITY",
    title: "AirZone",
    desc: "Real-time AQI, pollutant levels, and a 7-day forecast with live map from nearby cities.",
    tech: ["Flutter", "OpenWeather API", "fl_chart"],
    link: "https://github.com/Messy-guy/AIRZONE",
    img: "/images/AirZone.png",
    color: "text-green-400",
  },
];

import { GithubIcon } from "@/components/ui/github";

export default function Projects({ data }) {
  const containerRef = useRef(null);
  
  // Merge Sanity projects with fallback projects, prioritizing Sanity projects by title
  const sanityProjects = data && data.length > 0 ? data : [];
  const sanityTitles = new Set(sanityProjects.map((p) => p.title?.toLowerCase()));
  const filteredFallback = fallbackProjects.filter((p) => !sanityTitles.has(p.title?.toLowerCase()));
  const projectsList = [...sanityProjects, ...filteredFallback];
  
  // Dynamically update the IDs and index so they are sequential (e.g. 01, 02, etc.)
  const sequentialProjects = projectsList.map((p, idx) => ({
    ...p,
    id: String(idx + 1).padStart(2, "0"),
  }));


  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card");
      
      cards.forEach((card, index) => {
        const img = card.querySelector(".img-parallax");
        
        // Inner Image Parallax effect
        if (img) {
          gsap.fromTo(
            img,
            { y: "-10%", scale: 1 },
            {
              y: "10%",
              scale: 1.05,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        // Perfectly timed scale-down and blur effect for the previous card
        if (index !== cards.length - 1) {
          gsap.to(card.querySelector(".glass-panel"), {
            scale: 0.9,
            filter: "blur(15px)", // Blur ONLY, no opacity fade
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top bottom", 
              end: "top 20%",
              scrub: true,
            },
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="relative z-20 bg-transparent pb-[10vh] pt-[10vh]">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="flex justify-between items-end border-b border-foreground/10 pb-6 mb-8">
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-widest text-foreground">
            Selected Works
          </h2>
          <span className="text-foreground/50 font-display text-xl">
            ({String(sequentialProjects.length).padStart(2, "0")})
          </span>
        </div>
      </div>

      <div className="projects-container relative px-4 md:px-6 flex flex-col" ref={containerRef}>
        {sequentialProjects.map((p, i) => (
          <div 
            key={p.id} 
            className="project-card sticky top-0 h-screen flex items-center justify-center pt-20 pb-10"
            style={{ zIndex: i }}
          >
            <div className="glass-panel w-full max-w-6xl h-[85vh] md:h-[80vh] flex flex-col md:flex-row rounded-[2rem] overflow-hidden bg-card border border-foreground/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] relative">
              
              <div className="w-full md:w-[45%] p-8 md:p-16 flex flex-col justify-center order-2 md:order-1 h-[45%] md:h-full overflow-y-auto custom-scrollbar z-20 bg-card">
                <p className={`font-display ${p.color} mb-2 tracking-widest text-[10px] md:text-sm font-bold uppercase`}>
                  {p.id} — {p.category}
                </p>
                <h3 className="font-display text-3xl md:text-6xl font-bold mb-3 md:mb-6 leading-tight">{p.title}</h3>
                <p className="text-gray-400 mb-6 text-xs md:text-base font-light line-clamp-3 md:line-clamp-none">{p.desc}</p>
                
                <div className="flex flex-wrap gap-2 mb-8 text-[9px] md:text-xs text-foreground/80 font-display uppercase tracking-wider">
                  {p.tech.map((t) => (
                    <span key={t} className="border border-foreground/20 rounded-full px-3 py-1 bg-foreground/5 backdrop-blur-sm">
                      {t}
                    </span>
                  ))}
                </div>
                
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 group hover-trigger w-max bg-foreground text-background px-5 py-2.5 rounded-full font-display uppercase tracking-widest text-[10px] font-bold transition-transform hover:scale-105"
                >
                  <span>View Github</span>
                  <GithubIcon size={16} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>
              
              <div 
                className="w-full md:w-[55%] h-[55%] md:h-full order-1 md:order-2 relative overflow-hidden z-10 bg-black"
                data-cursor-text="EXPLORE"
              >
                <div className="absolute inset-0 bg-foreground/5 z-10 transition-opacity duration-500 group-hover:opacity-0 group-active:opacity-0 pointer-events-none"></div>
                {p.video ? (
                  <video
                    src={p.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-contain w-full h-full transition-transform duration-[1.5s] ease-out group-hover:scale-[1.01] group-active:scale-[1.01]"
                  />
                ) : p.img && (p.img.endsWith(".mp4") || p.img.endsWith(".webm") || p.img.includes("video") || p.img.includes(".mov")) ? (
                  <video
                    src={p.img}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-contain w-full h-full transition-transform duration-[1.5s] ease-out group-hover:scale-[1.01] group-active:scale-[1.01]"
                  />
                ) : (
                  <Image
                    src={p.img || "/images/placeholder.png"}
                    alt={p.title}
                    fill
                    className="img-parallax object-cover object-left md:object-center transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03] group-active:scale-[1.03]"
                  />
                )}
              </div>

            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--color-foreground);
          opacity: 0.1;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}
