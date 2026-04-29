"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { SmartphoneChargingIcon } from "@/components/ui/smartphone-charging";
import { AtomIcon } from "@/components/ui/atom";
import { LayersIcon } from "@/components/ui/layers";
import { TerminalIcon } from "@/components/ui/terminal";
import { WindIcon } from "@/components/ui/wind";
import { FlameIcon } from "@/components/ui/flame";

const skills = [
  { name: "Flutter", icon: SmartphoneChargingIcon, color: "text-[#02569B]", colSpan: "col-span-2 md:col-span-2", rowSpan: "row-span-2", bg: "bg-[#02569B]/10", border: "hover:border-[#02569B]/50", desc: "Cross-platform Magic" },
  { name: "React", icon: AtomIcon, color: "text-[#61DAFB]", colSpan: "col-span-1 md:col-span-1", rowSpan: "row-span-1", bg: "bg-[#61DAFB]/10", border: "hover:border-[#61DAFB]/50" },
  { name: "Next.js", icon: LayersIcon, color: "text-white", colSpan: "col-span-1 md:col-span-1", rowSpan: "row-span-1", bg: "bg-white/10", border: "hover:border-white/50" },
  { name: "TypeScript", icon: TerminalIcon, color: "text-[#3178C6]", colSpan: "col-span-2 md:col-span-1", rowSpan: "row-span-2", bg: "bg-[#3178C6]/10", border: "hover:border-[#3178C6]/50", desc: "Type-safe Code" },
  { name: "React Native", icon: AtomIcon, color: "text-[#61DAFB]", colSpan: "col-span-2 md:col-span-1", rowSpan: "row-span-1", bg: "bg-[#61DAFB]/10", border: "hover:border-[#61DAFB]/50" },
  { name: "JavaScript", icon: TerminalIcon, color: "text-[#F7DF1E]", colSpan: "col-span-1 md:col-span-1", rowSpan: "row-span-1", bg: "bg-[#F7DF1E]/10", border: "hover:border-[#F7DF1E]/50" },
  { name: "Tailwind CSS", icon: WindIcon, color: "text-[#06B6D4]", colSpan: "col-span-1 md:col-span-1", rowSpan: "row-span-1", bg: "bg-[#06B6D4]/10", border: "hover:border-[#06B6D4]/50" },
  { name: "Firebase", icon: FlameIcon, color: "text-[#FFCA28]", colSpan: "col-span-2 md:col-span-2", rowSpan: "row-span-1", bg: "bg-[#FFCA28]/10", border: "hover:border-[#FFCA28]/50" },
];

export default function Skills() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Use fromTo to strictly define start and end states so it doesn't get stuck at opacity: 0
      gsap.fromTo(
        ".bento-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power3.out",
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%", // Triggers slightly earlier to ensure it fires
            toggleActions: "play none none none"
          },
        }
      );

      // Hover glow follow effect
      const bentoItems = document.querySelectorAll('.bento-item');
      bentoItems.forEach(item => {
        item.addEventListener('mousemove', e => {
          const rect = item.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          item.style.setProperty('--mouse-x', `${x}px`);
          item.style.setProperty('--mouse-y', `${y}px`);
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="py-24 md:py-32 relative z-10 bg-[#050505]">
      <div className="container mx-auto px-6 max-w-5xl" ref={containerRef}>
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 uppercase">The Stack</h2>
            <p className="text-gray-400 text-lg md:text-xl">Technologies I use to bring ideas to life.</p>
          </div>
          <div className="hidden md:flex gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span className="w-2 h-2 rounded-full bg-accent2 animate-pulse delay-75"></span>
            <span className="w-2 h-2 rounded-full bg-white animate-pulse delay-150"></span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[140px] md:auto-rows-[180px]">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`bento-item opacity-0 ${skill.colSpan} ${skill.rowSpan} rounded-3xl border border-white/10 bg-[#0f0f0f]/80 backdrop-blur-md overflow-hidden group relative hover-trigger flex flex-col justify-between p-6 md:p-8 transition-transform duration-500 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 ${skill.border} shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]`}
            >
              {/* Animated Background gradient that follows mouse */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)`
                }}
              ></div>
              
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 z-0 ${skill.bg}`}></div>
              
              <div className="relative z-10 mb-4 transition-transform duration-500 group-hover:scale-110 group-active:scale-110 group-hover:-rotate-3 group-active:-rotate-3 origin-bottom-left">
                <skill.icon size={48} className={skill.color} />
              </div>
              
              <div className="relative z-10 mt-auto">
                <h3 className="font-display font-bold text-xl md:text-2xl tracking-wide">{skill.name}</h3>
                {skill.desc && (
                  <p className="text-xs md:text-sm text-gray-400 mt-2 uppercase tracking-wider font-light">{skill.desc}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
