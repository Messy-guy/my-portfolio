"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function GithubStreak({ username = "Messy-guy" }) {
  const [totalContribs, setTotalContribs] = useState(1324);
  const [streak, setStreak] = useState(42);
  const [activeRepo, setActiveRepo] = useState("my-portfolio");
  const [recentCommitMsg, setRecentCommitMsg] = useState("feat: integrate sanity content lake & telemetry HUD");

  // Generate mock contribution grid data for a cool HUD look
  // 7 rows (days) by 24 columns (weeks) = 168 cells
  const gridRows = 7;
  const gridCols = 22;
  const totalCells = gridRows * gridCols;

  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    // Generate levels: 0 (none), 1 (light), 2 (medium), 3 (high), 4 (extreme/neon)
    const data = Array.from({ length: totalCells }).map(() => {
      const rand = Math.random();
      if (rand < 0.4) return 0;
      if (rand < 0.75) return 1;
      if (rand < 0.9) return 2;
      if (rand < 0.97) return 3;
      return 4;
    });
    setGridData(data);

    // Fetch real GitHub info asynchronously if desired, else use gorgeous pre-hydrated states
    const fetchGithubData = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/events/public`);
        if (!res.ok) return;
        const events = await res.json();
        
        // Find recent commit events
        const pushEvents = events.filter(e => e.type === "PushEvent");
        if (pushEvents.length > 0) {
          const firstPush = pushEvents[0];
          setActiveRepo(firstPush.repo.name.split("/")[1]);
          if (firstPush.payload.commits && firstPush.payload.commits.length > 0) {
            setRecentCommitMsg(firstPush.payload.commits[0].message);
          }
        }
      } catch (err) {
        console.warn("GitHub dynamic activity fetch skipped/failed, using mock telemetry telemetry.", err);
      }
    };
    fetchGithubData();
  }, [username, totalCells]);

  // Color mapping for cyber matrix
  const getCellColor = (level) => {
    switch (level) {
      case 0: return "bg-foreground/[0.03] border border-foreground/5";
      case 1: return "bg-[#003820] border border-emerald-950/20";
      case 2: return "bg-[#006030] border border-emerald-900/30";
      case 3: return "bg-[#10a550] border border-emerald-500/35 shadow-[0_0_4px_rgba(16,165,80,0.3)]";
      case 4: return "bg-accent2 border border-cyan-400/50 shadow-[0_0_10px_var(--color-accent2)]";
      default: return "bg-foreground/[0.03]";
    }
  };

  return (
    <div className="w-full flex flex-col bg-card/40 backdrop-blur-xl border border-foreground/10 p-6 rounded-3xl relative overflow-hidden group shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
      
      {/* Aesthetic Cyber Trims */}
      <div className="absolute top-0 right-0 w-8 h-[2px] bg-accent2"></div>
      <div className="absolute top-0 right-0 w-[2px] h-8 bg-accent2"></div>
      <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-accent"></div>
      <div className="absolute bottom-0 left-0 w-[2px] h-8 bg-accent"></div>

      <div className="flex justify-between items-center w-full mb-4 border-b border-foreground/5 pb-2">
        <span className="font-display text-[10px] tracking-widest text-accent2 uppercase font-bold">Terminal Activity</span>
        <span className="font-display text-[10px] text-gray-500 uppercase">GH_FEED // @{username}</span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-5 text-center">
        <div className="flex flex-col border-r border-foreground/5 py-1">
          <span className="text-[9px] font-display uppercase tracking-wider text-gray-500 mb-1">Total Commits</span>
          <span className="font-display text-2xl font-bold text-foreground">{totalContribs}</span>
        </div>
        <div className="flex flex-col border-r border-foreground/5 py-1">
          <span className="text-[9px] font-display uppercase tracking-wider text-gray-500 mb-1">Active Streak</span>
          <span className="font-display text-2xl font-bold text-accent">{streak} Days</span>
        </div>
        <div className="flex flex-col py-1">
          <span className="text-[9px] font-display uppercase tracking-wider text-gray-500 mb-1">Repo Focus</span>
          <span className="font-display text-sm font-bold text-accent2 uppercase tracking-wide truncate max-w-full block pt-1">{activeRepo}</span>
        </div>
      </div>

      {/* Grid Container */}
      <div className="relative overflow-x-auto custom-scrollbar pb-3 mb-4 select-none">
        <div 
          className="grid grid-flow-col gap-[4px]"
          style={{
            gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`,
            gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`
          }}
        >
          {gridData.map((level, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: (idx % gridCols) * 0.015 + (idx % gridRows) * 0.01, duration: 0.3 }}
              className={`w-2.5 h-2.5 rounded-sm transition-all duration-500 ${getCellColor(level)}`}
            />
          ))}
        </div>
      </div>

      {/* Logging Feed */}
      <div className="w-full bg-black/60 p-3 rounded-xl border border-foreground/5 font-mono text-[9px] text-emerald-400/90 leading-normal overflow-hidden max-h-16 relative">
        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
        <div className="flex gap-2 mb-1">
          <span className="text-gray-500 uppercase tracking-widest text-[8px] font-bold">LOG:</span>
          <span className="text-accent2">SUCCESSFULLY STREAMED</span>
        </div>
        <span className="text-gray-300 font-light truncate block">
          &gt; {recentCommitMsg}
        </span>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--color-foreground);
          opacity: 0.05;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
