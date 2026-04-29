"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorDot = useRef(null);
  const cursorGlow = useRef(null);

  useEffect(() => {
    const dot = cursorDot.current;
    const glow = cursorGlow.current;
    if (!dot || !glow) return;

    // Show cursor by default
    gsap.set([dot, glow], { opacity: 1 });

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const xToGlow = gsap.quickTo(glow, "x", { duration: 0.8, ease: "power3" });
    const yToGlow = gsap.quickTo(glow, "y", { duration: 0.8, ease: "power3" });

    const handleMouseMove = (e) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToGlow(e.clientX);
      yToGlow(e.clientY);
    };

    const handleMouseDown = () => gsap.to(dot, { scale: 0.5, duration: 0.2 });
    const handleMouseUp = () => gsap.to(dot, { scale: 1, duration: 0.2, ease: "elastic.out(1, 0.3)" });

    const handleHoverEnter = () => document.body.classList.add("cursor-hover");
    const handleHoverLeave = () => document.body.classList.remove("cursor-hover");

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Reusable trigger binding
    const bindTriggers = () => {
      const triggers = document.querySelectorAll(".hover-trigger, a, button");
      triggers.forEach((t) => {
        t.removeEventListener("mouseenter", handleHoverEnter);
        t.removeEventListener("mouseleave", handleHoverLeave);
        t.addEventListener("mouseenter", handleHoverEnter);
        t.addEventListener("mouseleave", handleHoverLeave);
      });
    };

    bindTriggers();
    setTimeout(bindTriggers, 1000); // Re-bind after load

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.classList.remove("cursor-hover");
    };
  }, []);

  return (
    <>
      <div ref={cursorDot} className="cursor-dot pointer-events-none z-[99999]" />
      <div ref={cursorGlow} className="glow-orb pointer-events-none z-0" />
    </>
  );
}
