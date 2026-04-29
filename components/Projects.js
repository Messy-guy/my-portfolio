"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    category: "EVENT APP",
    title: "Eventra",
    desc: "An Event Booking App With an Admin Panel, User Page and attractive UI.",
    tech: ["Flutter", "Firebase", "Firestore", "Cloudinary"],
    link: "https://github.com/Messy-guy/eventra1",
    img: "/images/eventra.png",
    color: "text-accent",
  },
  {
    id: "02",
    category: "GITHUB CLIENT",
    title: "GitPeek",
    desc: "A custom Github App that lets you peek someone's profile, repos, contributions and Top 5 repos.",
    tech: ["Flutter", "Github API", "Bloc", "fl_chart"],
    link: "https://github.com/Messy-guy/gitpeek",
    img: "/images/gitpeek (2).png",
    color: "text-accent2",
  },
  {
    id: "03",
    category: "VOICE AI",
    title: "Voxa",
    desc: "A Voice Assistant App with voice assistant answers and AI image generator.",
    tech: ["Flutter", "OpenRouter API", "HuggingFace"],
    link: "https://github.com/Messy-guy/https---github.com-Messy-guy-voxa_",
    img: "/images/voxa (2).png",
    color: "text-yellow-400",
  },
  {
    id: "04",
    category: "AIR QUALITY",
    title: "AirZone",
    desc: "Real-time AQI, pollutant levels, and a 7-day forecast with live map from nearby cities.",
    tech: ["Flutter", "OpenWeather API", "fl_chart"],
    link: "https://github.com/Messy-guy/AIRZONE",
    img: "/images/AirZone.png",
    color: "text-green-400",
  },
  {
    id: "05",
    category: "CHATBOT",
    title: "BrAIn",
    desc: "A simple and responsive chatbot app for smooth real-time conversations with intelligent message handling.",
    tech: ["Flutter", "Gemini API", "dash_chat_2"],
    link: "https://github.com/Messy-guy/BrAIn",
    img: "/images/brain.png",
    color: "text-purple-400",
  },
];

import { GithubIcon } from "@/components/ui/github";

export default function Projects() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card");
      
      cards.forEach((card, index) => {
        const img = card.querySelector(".img-parallax");
        
        // Inner Image Parallax effect
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
        <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-8">
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-widest text-white">
            Selected Works
          </h2>
          <span className="text-white/50 font-display text-xl">(05)</span>
        </div>
      </div>

      <div className="projects-container relative px-4 md:px-6 flex flex-col" ref={containerRef}>
        {projects.map((p, i) => (
          <div 
            key={p.id} 
            className="project-card sticky top-0 h-[100vh] flex items-center justify-center pt-24 pb-12"
            style={{ zIndex: i }}
          >
            <div className="glass-panel w-full max-w-6xl h-[75vh] md:h-[80vh] flex flex-col md:flex-row rounded-[2rem] overflow-hidden bg-[#111111] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] relative">
              
              <div className="w-full md:w-[45%] p-8 md:p-16 flex flex-col justify-center order-2 md:order-1 h-1/2 md:h-full overflow-y-auto custom-scrollbar z-20 bg-[#111111]">
                <p className={`font-display ${p.color} mb-2 tracking-widest text-xs md:text-sm font-bold uppercase`}>
                  {p.id} — {p.category}
                </p>
                <h3 className="font-display text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">{p.title}</h3>
                <p className="text-gray-400 mb-6 md:mb-8 text-sm md:text-base font-light">{p.desc}</p>
                
                <div className="flex flex-wrap gap-2 mb-8 text-[10px] md:text-xs text-white/80 font-display uppercase tracking-wider">
                  {p.tech.map((t) => (
                    <span key={t} className="border border-white/20 rounded-full px-3 py-1.5 md:px-4 md:py-2 bg-white/5 backdrop-blur-sm">
                      {t}
                    </span>
                  ))}
                </div>
                
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-4 group hover-trigger w-max mt-auto bg-white text-[#050505] px-6 py-3 rounded-full font-display uppercase tracking-widest text-xs font-bold transition-transform hover:scale-105"
                >
                  <span className="relative z-10">View Github</span>
                  <GithubIcon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>
              
              <div className="w-full md:w-[55%] h-1/2 md:h-full order-1 md:order-2 relative overflow-hidden z-10 bg-black">
                <div className="absolute inset-0 bg-black/20 z-10 transition-opacity duration-500 group-hover:opacity-0 pointer-events-none"></div>
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="img-parallax object-cover object-left md:object-center transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
                />
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
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}
