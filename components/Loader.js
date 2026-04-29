"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const percentRef = useRef(null);
  const textRef = useRef(null);
  const leftPaneRef = useRef(null);
  const rightPaneRef = useRef(null);

  useEffect(() => {
    // Disable scroll initially
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        if (onComplete) onComplete();
      },
    });

    tl.to(percentRef.current, {
      innerHTML: "100%",
      duration: 1.5,
      snap: { innerHTML: 1 },
      ease: "power1.inOut",
    })
      .to(textRef.current, { y: 0, duration: 0.8, ease: "power3.out" }, "-=1")
      .to(".loader-content", { opacity: 0, duration: 0.5, ease: "power2.inOut" })
      .to(leftPaneRef.current, { x: "-100%", duration: 1.2, ease: "power4.inOut" }, "split")
      .to(rightPaneRef.current, { x: "100%", duration: 1.2, ease: "power4.inOut" }, "split")
      .to(loaderRef.current, { display: "none" });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[99998] flex items-center justify-center pointer-events-none w-screen h-screen">
      {/* Background Panes */}
      <div ref={leftPaneRef} className="absolute left-0 top-0 w-1/2 h-full bg-[#050505]"></div>
      <div ref={rightPaneRef} className="absolute right-0 top-0 w-1/2 h-full bg-[#050505]"></div>
      
      {/* Centered Content */}
      <div className="relative z-[99999] mix-blend-difference text-white flex flex-col items-center justify-center">
        <h1 className="font-display text-4xl md:text-8xl font-bold tracking-tighter overflow-hidden">
          <span ref={textRef} className="block translate-y-full">LOADING</span>
        </h1>
        <div ref={percentRef} className="font-display text-xl md:text-3xl mt-4">
          0%
        </div>
      </div>
    </div>
  );
}
