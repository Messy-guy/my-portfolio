"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { GithubIcon } from "@/components/ui/github";
import { InstagramIcon } from "@/components/ui/instagram";
import { FacebookIcon } from "@/components/ui/facebook";

export default function Contact() {
  const containerRef = useRef(null);

  useEffect(() => {
    const magnetBtns = document.querySelectorAll(".magnetic-wrap");
    const ctx = gsap.context(() => {
      
      // Entrance animation for contact section
      gsap.from(".contact-anim", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "power4.out",
        duration: 1.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      magnetBtns.forEach((btn) => {
        const magnetChild = btn.querySelector(".magnetic-btn");

        const handleMouseMove = (e) => {
          const bound = btn.getBoundingClientRect();
          const x = e.clientX - bound.left - bound.width / 2;
          const y = e.clientY - bound.top - bound.height / 2;

          gsap.to(magnetChild, {
            x: x * 0.4,
            y: y * 0.4,
            duration: 1,
            ease: "power3.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(magnetChild, {
            x: 0,
            y: 0,
            duration: 1,
            ease: "elastic.out(1, 0.3)",
          });
        };

        btn.addEventListener("mousemove", handleMouseMove);
        btn.addEventListener("mouseleave", handleMouseLeave);
        
        btn._handleMouseMove = handleMouseMove;
        btn._handleMouseLeave = handleMouseLeave;
      });
    }, containerRef);

    return () => {
      ctx.revert();
      magnetBtns.forEach((btn) => {
        if(btn._handleMouseMove) btn.removeEventListener("mousemove", btn._handleMouseMove);
        if(btn._handleMouseLeave) btn.removeEventListener("mouseleave", btn._handleMouseLeave);
      });
    };
  }, []);

  return (
    <section id="contact" ref={containerRef} className="min-h-screen bg-[#050505] relative flex flex-col items-center justify-center overflow-hidden z-20 pt-32 pb-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="text-center z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center flex-grow justify-center">
        <p className="contact-anim font-display text-white/50 tracking-[0.5em] uppercase mb-12 text-sm md:text-base">Got a project?</p>

        {/* Magnetic Button */}
        <div className="contact-anim magnetic-wrap inline-block p-8 md:p-16 hover-trigger">
          <a
            href="mailto:animeshpoudel6@gmail.com"
            className="magnetic-btn inline-flex items-center justify-center w-48 h-48 md:w-64 md:h-64 rounded-full bg-white text-[#050505] font-display font-bold text-3xl md:text-5xl transition-colors hover:bg-[#ff3366] hover:text-white group"
          >
            <span className="group-hover:scale-110 transition-transform duration-300">SAY HI</span>
          </a>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 mt-auto z-10">
        {/* Contact Info */}
        <div className="contact-anim grid grid-cols-1 md:grid-cols-3 gap-12 text-left border-t border-white/10 pt-12 pb-12 md:pb-6">
          <div>
            <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-display">Location</h4>
            <p className="text-lg md:text-xl font-light">Gyaneshwor, Kathmandu</p>
            <p className="text-xs text-[#ff3366] mt-2 uppercase tracking-widest font-display">Available for remote work</p>
          </div>
          <div>
            <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-display">Contact</h4>
            <p className="text-lg md:text-xl font-light">+977 9761657579</p>
            <a href="mailto:animeshpoudel6@gmail.com" className="text-sm md:text-base text-gray-400 mt-2 hover:text-white transition-colors inline-block relative group">
              animeshpoudel6@gmail.com
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
          <div>
            <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-display">Socials</h4>
            <div className="flex gap-6 pointer-events-auto">
              <a href="https://github.com/Messy-guy" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#050505] text-gray-400 transition-all duration-300 hover-trigger group hover:-translate-y-1">
                <GithubIcon size={22} className="transition-transform group-hover:scale-110" />
              </a>
              <a href="https://www.instagram.com/iam_animeshpoudel/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#ff3366] hover:border-[#ff3366] hover:text-white text-gray-400 transition-all duration-300 hover-trigger group hover:-translate-y-1">
                <InstagramIcon size={22} className="transition-transform group-hover:scale-110" />
              </a>
              <a href="https://www.facebook.com/animesh.poudel.79/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white text-gray-400 transition-all duration-300 hover-trigger group hover:-translate-y-1">
                <FacebookIcon size={22} className="transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-anim flex flex-col justify-center items-center text-xs font-display text-gray-600 uppercase tracking-widest mt-8 border-t border-white/5 pt-8">
          <span>© {new Date().getFullYear()} ANIMESH POUDEL.</span>
        </div>
      </div>
    </section>
  );
}
