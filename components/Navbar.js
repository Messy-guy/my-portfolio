"use client";
import { useState, useEffect } from "react";
import gsap from "gsap";

import { MenuIcon } from "@/components/ui/menu";
import { XIcon } from "@/components/ui/x";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(".mobile-menu", { y: 0, duration: 0.8, ease: "power4.out" });
      gsap.fromTo(".menu-link", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2 });
    } else {
      document.body.style.overflow = "";
      gsap.to(".mobile-menu", { y: "-100%", duration: 0.6, ease: "power4.in" });
    }
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-[100] mix-blend-difference text-white pointer-events-none">
        <a href="#" className="font-display font-bold text-2xl tracking-widest uppercase hover-trigger pointer-events-auto">
          ANIMESH.
        </a>
        <div className="flex gap-10 font-display text-sm uppercase tracking-widest hidden md:flex pointer-events-auto">
          {["About", "Skills", "Work", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover-trigger relative group overflow-hidden">
              <span className="block transition-transform duration-300 group-hover:-translate-y-full">{item}</span>
              <span className="absolute top-0 left-0 w-full h-full block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-accent2">{item}</span>
            </a>
          ))}
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden flex justify-center items-center pointer-events-auto z-[101] hover-trigger text-white transition-all duration-300 hover:scale-110"
        >
          {isOpen ? <XIcon size={32} /> : <MenuIcon size={32} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className="mobile-menu fixed inset-0 bg-dark z-[90] -translate-y-full flex items-center justify-center pointer-events-auto">
        <div className="flex flex-col items-center gap-8 font-display text-4xl uppercase tracking-widest">
          {["About", "Skills", "Work", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={() => setIsOpen(false)}
              className="menu-link overflow-hidden relative group hover-trigger"
            >
              <span className="text-white group-hover:text-transparent group-hover:[-webkit-text-stroke:1px_white] transition-all duration-300">
                {item}
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
