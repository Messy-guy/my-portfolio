"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const deliverables = [
  {
    id: "ui",
    title: "Interfaces",
    subtitle: "Pixel Perfect Precision",
    description: "I design and build user interfaces where every single pixel is deliberate. No blurs, no misalignments—just pure, sharp clarity.",
    color: "#ff3366"
  },
  {
    id: "perf",
    title: "Performance",
    subtitle: "Optimization is a Feature",
    description: "Performance isn't an afterthought. I engineer frontends that stay at a constant 60fps, even under heavy load.",
    color: "#06B6D4"
  },
  {
    id: "scale",
    title: "Scalability",
    subtitle: "Architected for Growth",
    description: "Modular systems that don't just work today, but scale indefinitely as your product and team expand.",
    color: "#02569B"
  },
  {
    id: "exp",
    title: "Experience",
    subtitle: "The Human Journey",
    description: "Digital experiences are journeys. I orchestrate every micro-interaction to ensure a cohesive, fluid user flow.",
    color: "#FFCA28"
  }
];

// Re-integrating the Literal Visuals into the horizontal panels
const Visuals = {
  ui: () => (
    <div className="relative w-full aspect-video bg-[#09090b] border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center">
      <div className="px-10 py-5 bg-white/5 border border-white/20 rounded-xl text-white font-mono text-xs uppercase tracking-widest">
        Precision
      </div>
      <motion.div 
        className="absolute w-32 h-32 rounded-full border-2 border-[#ff3366] bg-[#09090b]/80 shadow-[0_0_30px_rgba(255,51,102,0.3)] overflow-hidden pointer-events-none z-50 flex items-center justify-center"
        animate={{ x: [0, 60, -60, 0], y: [0, -30, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="grid grid-cols-6 gap-0.5 opacity-60">
          {[...Array(36)].map((_, i) => (
            <div key={i} className={`w-4 h-4 ${i % 7 === 0 ? 'bg-[#ff3366]' : 'bg-white/20'}`} />
          ))}
        </div>
      </motion.div>
    </div>
  ),
  perf: () => (
    <div className="w-full aspect-video bg-[#09090b] border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center p-12">
      <div className="w-full h-full relative">
        <svg className="w-full h-full" viewBox="0 0 320 100">
          <motion.path
            d="M 0 50 Q 80 10 160 50 T 320 50"
            fill="none"
            stroke="#06B6D4"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ filter: "drop-shadow(0 0 8px #06B6D4)" }}
          />
        </svg>
        <div className="absolute top-0 right-0 text-[10px] text-[#06B6D4] font-mono animate-pulse uppercase tracking-widest">60FPS Peak</div>
      </div>
    </div>
  ),
  scale: () => (
    <div className="w-full aspect-video bg-[#09090b] border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center">
       <div className="relative">
        <motion.div 
          className="w-4 h-4 bg-[#02569B] rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {[0, 90, 180, 270].map(angle => (
          <div key={angle} className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="w-px bg-gradient-to-t from-[#02569B] to-transparent origin-bottom"
              animate={{ height: [0, 120, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: angle / 360 }}
              style={{ transform: `rotate(${angle}deg) translateY(-50%)` }}
            />
          </div>
        ))}
      </div>
    </div>
  ),
  exp: () => {
    const [points, setPoints] = useState([{ x: 50, y: 50 }]);
    return (
      <div 
        className="w-full aspect-video bg-[#09090b] border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center relative cursor-crosshair"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          setPoints(prev => [...prev.slice(-15), { x, y }]);
        }}
      >
        <svg className="absolute inset-0 w-full h-full">
          <motion.path
            d={`M ${points.map(p => `${p.x}% ${p.y}%`).join(' L ')}`}
            fill="none"
            stroke="#FFCA28"
            strokeWidth="2"
            strokeOpacity="0.4"
          />
        </svg>
        <div className="text-[10px] text-white/20 uppercase tracking-[0.4em] select-none">Experience Trail</div>
      </div>
    )
  }
};

export default function Deliverables() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const scrollWidth = track.scrollWidth;
      const amountToScroll = scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinSpacing: true,
          pinType: "fixed",
          scrub: 1,
          start: "top top",
          end: () => `+=${amountToScroll}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      });
    });

    // Critical: Refresh ScrollTrigger after a short delay to ensure hydration is complete
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative z-10 bg-[#050505] overflow-hidden">
      <div className="absolute top-10 left-6 md:left-16 z-20 pointer-events-none">
        <p className="font-display text-[10px] uppercase tracking-[0.5em] text-white/30">What I Deliver</p>
      </div>

      <div ref={trackRef} className="flex h-screen w-max items-center">
        {deliverables.map((item) => {
          const Visual = Visuals[item.id];
          return (
            <div key={item.id} className="w-screen h-screen flex items-center px-6 md:px-20 lg:px-40">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center w-full max-w-7xl mx-auto">
                {/* Content */}
                <div className="flex flex-col gap-6">
                  <span className="font-mono text-[#444] text-xs tracking-widest">/0{deliverables.indexOf(item) + 1}</span>
                  <h2 className="text-5xl md:text-8xl font-bold text-white uppercase tracking-tighter">
                    {item.title}
                  </h2>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl md:text-2xl font-medium text-white/90" style={{ color: item.color }}>
                      {item.subtitle}
                    </h3>
                    <p className="text-white/50 text-lg leading-relaxed max-w-md">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Visual */}
                <div className="relative w-full">
                  <Visual />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
