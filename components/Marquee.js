"use client";

export default function Marquee() {
  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a] overflow-hidden flex flex-col gap-4 md:gap-8 z-30 relative border-y border-white/5">
      
      {/* Top Marquee (Moves Left) */}
      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="flex animate-[marqueeLeft_20s_linear_infinite]">
          <h2 className="font-display text-[12vw] md:text-[8vw] font-bold uppercase leading-none text-transparent px-4" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
            FRONTEND &nbsp;&bull;&nbsp; BACKEND &nbsp;&bull;&nbsp; MOBILE &nbsp;&bull;&nbsp;
          </h2>
          <h2 className="font-display text-[12vw] md:text-[8vw] font-bold uppercase leading-none text-transparent px-4" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
            FRONTEND &nbsp;&bull;&nbsp; BACKEND &nbsp;&bull;&nbsp; MOBILE &nbsp;&bull;&nbsp;
          </h2>
          <h2 className="font-display text-[12vw] md:text-[8vw] font-bold uppercase leading-none text-transparent px-4" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
            FRONTEND &nbsp;&bull;&nbsp; BACKEND &nbsp;&bull;&nbsp; MOBILE &nbsp;&bull;&nbsp;
          </h2>
        </div>
      </div>

      {/* Bottom Marquee (Moves Right) */}
      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="flex animate-[marqueeRight_20s_linear_infinite]">
          <h2 className="font-display text-[12vw] md:text-[8vw] font-bold uppercase leading-none text-white px-4">
            CREATIVE DEVELOPER &nbsp;&bull;&nbsp; UI/UX DESIGN &nbsp;&bull;&nbsp;
          </h2>
          <h2 className="font-display text-[12vw] md:text-[8vw] font-bold uppercase leading-none text-white px-4">
            CREATIVE DEVELOPER &nbsp;&bull;&nbsp; UI/UX DESIGN &nbsp;&bull;&nbsp;
          </h2>
          <h2 className="font-display text-[12vw] md:text-[8vw] font-bold uppercase leading-none text-white px-4">
            CREATIVE DEVELOPER &nbsp;&bull;&nbsp; UI/UX DESIGN &nbsp;&bull;&nbsp;
          </h2>
        </div>
      </div>

      <style jsx>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
