"use client";
import { motion } from "framer-motion";

export default function TechRadar({ data }) {
  // Default values if data not present
  const radarData = data || [
    { subject: "Flutter", A: 120, fullMark: 150 },
    { subject: "React", A: 140, fullMark: 150 },
    { subject: "Next.js", A: 135, fullMark: 150 },
    { subject: "Node.js", A: 95, fullMark: 150 },
    { subject: "TypeScript", A: 110, fullMark: 150 },
  ];

  const totalPoints = radarData.length;
  const size = 300;
  const center = size / 2;
  const maxRadius = 100;

  // Calculate coordinates for a given index and value
  const getCoordinates = (index, value, maxVal) => {
    const angle = (index * 2 * Math.PI) / totalPoints - Math.PI / 2;
    const radius = (value / maxVal) * maxRadius;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y };
  };

  // Concentric grids levels (e.g. 25%, 50%, 75%, 100%)
  const levels = [0.25, 0.5, 0.75, 1];
  const gridPolygons = levels.map((level) => {
    return radarData
      .map((d, i) => {
        const { x, y } = getCoordinates(i, level * d.fullMark, d.fullMark);
        return `${x},${y}`;
      })
      .join(" ");
  });

  // Calculate axis lines
  const axes = radarData.map((d, i) => {
    const start = { x: center, y: center };
    const end = getCoordinates(i, d.fullMark, d.fullMark);
    const labelPos = getCoordinates(i, d.fullMark * 1.35, d.fullMark);
    return { start, end, labelPos, label: d.subject, score: d.A };
  });

  // Calculate the user score polygon points
  const scorePoints = radarData
    .map((d, i) => {
      const { x, y } = getCoordinates(i, d.A, d.fullMark);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="w-full flex flex-col items-center justify-center bg-card/40 backdrop-blur-xl border border-foreground/10 p-6 rounded-3xl relative overflow-hidden group shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
      
      {/* Visual cyber accent lines */}
      <div className="absolute top-0 left-0 w-8 h-[2px] bg-accent"></div>
      <div className="absolute top-0 left-0 w-[2px] h-8 bg-accent"></div>
      <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-accent2"></div>
      <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-accent2"></div>

      <div className="flex justify-between items-center w-full mb-4 border-b border-foreground/5 pb-2">
        <span className="font-display text-[10px] tracking-widest text-accent uppercase font-bold">System Telemetry</span>
        <span className="font-display text-[10px] text-gray-500 uppercase">TECH_RADAR // v1.0.4</span>
      </div>

      <h3 className="font-display text-base font-bold uppercase tracking-wider text-foreground mb-4 text-center">
        Cognitive Capabilities
      </h3>

      <div className="relative w-full aspect-square max-w-[280px]">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
          {/* Grids */}
          {gridPolygons.map((points, idx) => (
            <polygon
              key={idx}
              points={points}
              fill="none"
              stroke="var(--color-foreground)"
              strokeOpacity={0.06}
              strokeWidth={1}
            />
          ))}

          {/* Grid Level Circular Indicators */}
          {levels.map((level, idx) => (
            <circle
              key={idx}
              cx={center}
              cy={center}
              r={level * maxRadius}
              fill="none"
              stroke="var(--color-foreground)"
              strokeOpacity={0.03}
              strokeDasharray="4,4"
            />
          ))}

          {/* Axes */}
          {axes.map((axis, idx) => (
            <g key={idx}>
              {/* Radial axis line */}
              <line
                x1={axis.start.x}
                y1={axis.start.y}
                x2={axis.end.x}
                y2={axis.end.y}
                stroke="var(--color-foreground)"
                strokeOpacity={0.12}
                strokeWidth={1}
              />
              {/* Interactive tech label */}
              <text
                x={axis.labelPos.x}
                y={axis.labelPos.y + 4}
                textAnchor="middle"
                className="fill-foreground/75 font-display font-medium text-[9px] uppercase tracking-wider select-none transition-colors duration-300 group-hover:fill-foreground"
              >
                {axis.label}
              </text>
            </g>
          ))}

          {/* Area under user scores */}
          <motion.polygon
            points={scorePoints}
            fill="url(#radarGradient)"
            stroke="url(#radarStroke)"
            strokeWidth={1.5}
            initial={{ scale: 0.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Glowing Points */}
          {radarData.map((d, i) => {
            const { x, y } = getCoordinates(i, d.A, d.fullMark);
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r={3.5}
                  className="fill-accent2 filter drop-shadow-[0_0_5px_var(--color-accent2)]"
                />
                <circle
                  cx={x}
                  cy={y}
                  r={8}
                  className="stroke-accent2/30 fill-none"
                  strokeWidth={1}
                />
              </g>
            );
          })}

          {/* Defs for gradients */}
          <defs>
            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--color-accent2)" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-accent)" />
              <stop offset="100%" stopColor="var(--color-accent2)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Mini details list */}
      <div className="w-full grid grid-cols-2 gap-2 mt-4 text-[10px] font-display border-t border-foreground/5 pt-4 uppercase text-gray-500 tracking-wider">
        {radarData.slice(0, 4).map((d) => (
          <div key={d.subject} className="flex justify-between items-center">
            <span>{d.subject}:</span>
            <span className="text-foreground font-bold">{Math.round((d.A / d.fullMark) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
