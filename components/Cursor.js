"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorDot = useRef(null);

  useEffect(() => {
    const dot = cursorDot.current;
    if (!dot) return;

    // Show cursor by default
    gsap.set(dot, { opacity: 1 });

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.02, ease: "none" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.02, ease: "none" });

    const handleMouseMove = (e) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
    };

    const handleMouseDown = () => gsap.to(dot, { scale: 0.5, duration: 0.2 });
    const handleMouseUp = () => gsap.to(dot, { scale: 1, duration: 0.2, ease: "elastic.out(1, 0.3)" });

    // Global Event Delegation for Hover Effects
    const handleMouseOver = (e) => {
      const target = e.target.closest(".hover-trigger, a, button, h1, h2, h3, .reveal-word, [data-cursor-text]");
      if (!target) return;

      document.body.classList.add("cursor-hover");
      const style = window.getComputedStyle(target);
      const fontSize = parseFloat(style.fontSize);
      const cursorTextAttr = target.getAttribute("data-cursor-text");
      const cursorTextEl = dot.querySelector(".cursor-text");

      let newSize = 80; // Standard hover size
      
      if (cursorTextAttr) {
        newSize = 100;
        if (cursorTextEl) {
          cursorTextEl.innerText = cursorTextAttr;
          cursorTextEl.style.opacity = "1";
        }
        gsap.to(dot, { backgroundColor: "white", mixBlendMode: "normal", border: "none" });
      } else {
        if (!isNaN(fontSize) && fontSize > 24) {
          newSize = Math.min(fontSize * 1.2, 80); 
        }
      }
      
      gsap.to(dot, { width: newSize, height: newSize, marginTop: -newSize/2, marginLeft: -newSize/2, duration: 0.3, ease: "back.out(1.5)" });
    };

    const handleMouseOut = (e) => {
      // Revert logic
      document.body.classList.remove("cursor-hover");
      const cursorTextEl = dot.querySelector(".cursor-text");
      if (cursorTextEl) {
        cursorTextEl.style.opacity = "0";
      }
      gsap.to(dot, { width: 24, height: 24, marginTop: -12, marginLeft: -12, backgroundColor: "white", mixBlendMode: "difference", duration: 0.3, ease: "power3.out" }); 
    };

    // Track mouse position to check elements during scroll
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;

    const handleMouseMoveLocal = (e) => {
      currentX = e.clientX;
      currentY = e.clientY;
      handleMouseMove(e);
    };

    const handleScroll = () => {
      // Check what element is currently under the stationary mouse pointer
      const elementUnderCursor = document.elementFromPoint(currentX, currentY);
      if (!elementUnderCursor) return;
      
      const target = elementUnderCursor.closest(".hover-trigger, a, button, h1, h2, h3, .reveal-word, [data-cursor-text]");
      
      // If the element scrolled away, trigger mouseOut
      if (!target && document.body.classList.contains("cursor-hover")) {
        handleMouseOut();
      } else if (target && !document.body.classList.contains("cursor-hover")) {
        // Mock a mouseover event if it scrolled into view
        handleMouseOver({ target: elementUnderCursor });
      }
    };

    window.addEventListener("mousemove", handleMouseMoveLocal);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", (e) => {
      const target = e.target.closest(".hover-trigger, a, button, h1, h2, h3, .reveal-word, [data-cursor-text]");
      if (target) handleMouseOut();
    });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveLocal);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("scroll", handleScroll);
      document.body.classList.remove("cursor-hover");
    };
  }, []);

  return (
    <>
      <div ref={cursorDot} className="cursor-dot pointer-events-none z-[99999] flex items-center justify-center">
        <span className="cursor-text text-black font-display font-bold text-[11px] tracking-widest opacity-0 transition-opacity duration-300 pointer-events-none whitespace-nowrap"></span>
      </div>
    </>
  );
}
