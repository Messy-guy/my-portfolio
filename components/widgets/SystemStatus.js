"use client";
import { useState, useEffect } from "react";

export default function SystemStatus() {
  const [timeStr, setTimeStr] = useState("10:24:39 AM");
  const [activeSeconds, setActiveSeconds] = useState(0);
  const [latency, setLatency] = useState(48);
  const [cpuLoad, setCpuLoad] = useState(12);
  const [memoryLoad, setMemoryLoad] = useState(38.4);
  const [buildStatus, setBuildStatus] = useState("ACTIVE");

  useEffect(() => {
    // Live Nepalese Clock update (Nepal is UTC+5:45)
    const updateNepaleseTime = () => {
      try {
        const utcDate = new Date();
        const nepalOffset = 5.75 * 60 * 60 * 1000; // 5 hours 45 mins in milliseconds
        const nepalDate = new Date(utcDate.getTime() + nepalOffset + utcDate.getTimezoneOffset() * 60 * 1000);
        
        let hours = nepalDate.getHours();
        const minutes = String(nepalDate.getMinutes()).padStart(2, "0");
        const seconds = String(nepalDate.getSeconds()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const hoursStr = String(hours).padStart(2, "0");
        
        setTimeStr(`${hoursStr}:${minutes}:${seconds} ${ampm}`);
      } catch (err) {
        // Fallback standard clock
        setTimeStr(new Date().toLocaleTimeString());
      }
    };

    updateNepaleseTime();
    const interval = setInterval(() => {
      updateNepaleseTime();
      setActiveSeconds((prev) => prev + 1);

      // Random slight telemetry oscillations to feel fully alive!
      setLatency((prev) => Math.max(12, Math.min(120, prev + (Math.random() > 0.5 ? 4 : -4))));
      setCpuLoad((prev) => Math.max(2, Math.min(98, prev + (Math.random() > 0.5 ? 1.5 : -1.5))));
      setMemoryLoad((prev) => Math.max(30, Math.min(80, prev + (Math.random() > 0.5 ? 0.2 : -0.2))));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col bg-card/40 backdrop-blur-xl border border-foreground/10 p-6 rounded-3xl relative overflow-hidden group shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
      
      {/* Visual Cyber Accents */}
      <div className="absolute top-0 left-0 w-8 h-[2px] bg-accent"></div>
      <div className="absolute top-0 left-0 w-[2px] h-8 bg-accent"></div>
      <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-accent2"></div>
      <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-accent2"></div>

      <div className="flex justify-between items-center w-full mb-4 border-b border-foreground/5 pb-2">
        <span className="font-display text-[10px] tracking-widest text-accent uppercase font-bold">Node Telemetry</span>
        <span className="font-display text-[10px] text-gray-500 uppercase">SYS_MON // ID_099x</span>
      </div>

      {/* Main Clock Grid */}
      <div className="flex items-center gap-4 mb-5 select-none">
        <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-emerald-500/20 bg-emerald-500/5">
          <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-display uppercase tracking-widest text-emerald-500 font-bold">ALL SYSTEMS OPERATIONAL</span>
          <span className="font-display text-lg font-bold text-foreground tracking-wider">{timeStr} <span className="text-[10px] font-light text-gray-500">NPT (UTC+5:45)</span></span>
        </div>
      </div>

      {/* Telemetry metrics rows */}
      <div className="w-full space-y-3 font-display uppercase tracking-wider text-[10px]">
        {/* Latency metric */}
        <div className="flex justify-between items-center text-gray-500">
          <span>Server Ping:</span>
          <span className="text-foreground font-bold flex items-center gap-1.5">
            <span className={`w-1 h-1.5 rounded-sm bg-accent2 ${latency > 90 ? 'bg-red-500' : 'bg-accent2'}`}></span>
            {latency} MS
          </span>
        </div>
        
        {/* Cpu Load Slider */}
        <div className="flex flex-col gap-1 text-gray-500">
          <div className="flex justify-between items-center">
            <span>Client CPU Load:</span>
            <span className="text-foreground font-bold">{cpuLoad.toFixed(1)}%</span>
          </div>
          <div className="w-full h-1 bg-foreground/5 rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-accent transition-all duration-500" 
              style={{ width: `${cpuLoad}%` }}
            ></div>
          </div>
        </div>

        {/* Memory Load Slider */}
        <div className="flex flex-col gap-1 text-gray-500">
          <div className="flex justify-between items-center">
            <span>Memory Allocated:</span>
            <span className="text-foreground font-bold">{memoryLoad.toFixed(2)} MB</span>
          </div>
          <div className="w-full h-1 bg-foreground/5 rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-accent2 transition-all duration-500" 
              style={{ width: `${(memoryLoad / 256) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Deployment Status */}
        <div className="flex justify-between items-center text-gray-500 border-t border-foreground/5 pt-3 mt-1">
          <span>Vercel Build:</span>
          <span className="text-emerald-400 font-bold tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            {buildStatus}
          </span>
        </div>
      </div>
    </div>
  );
}
