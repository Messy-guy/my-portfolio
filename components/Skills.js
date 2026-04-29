"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { SmartphoneChargingIcon } from "@/components/ui/smartphone-charging";
import { AtomIcon } from "@/components/ui/atom";
import { LayersIcon } from "@/components/ui/layers";
import { TerminalIcon } from "@/components/ui/terminal";
import { WindIcon } from "@/components/ui/wind";
import { FlameIcon } from "@/components/ui/flame";

const skills = [
  { 
    name: "Flutter", 
    code: "Widget build() {\n  return MaterialApp(\n    home: Scaffold(),\n  );\n}", 
    icon: SmartphoneChargingIcon, 
    color: "text-[#02569B]", 
    hoverAnim: { rotate: [0, -10, 10, -10, 10, 0], scale: 1.1, transition: { repeat: Infinity, duration: 1, ease: "easeInOut" } } 
  },
  { 
    name: "React", 
    code: "const App = () => {\n  const [s, set] = useState();\n  return <UI />;\n}", 
    icon: AtomIcon, 
    color: "text-[#61DAFB]", 
    hoverAnim: { rotate: 360, scale: 1.1, transition: { repeat: Infinity, duration: 3, ease: "linear" } } 
  },
  { 
    name: "Next.js", 
    code: "export async function \ngetServerSideProps() {\n  return { props: {} }\n}", 
    icon: LayersIcon, 
    color: "text-white", 
    hoverAnim: { y: [0, -10, 0], scale: 1.1, transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } } 
  },
  { 
    name: "TypeScript", 
    code: "interface AppProps {\n  id: string;\n  data: UserData[];\n}", 
    icon: TerminalIcon, 
    color: "text-[#3178C6]", 
    hoverAnim: { opacity: [1, 0.4, 1], scale: 1.1, transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } } 
  },
  { 
    name: "React Native", 
    code: "<View style={styles.app}>\n  <Text>Mobile UI</Text>\n</View>", 
    icon: AtomIcon, 
    color: "text-[#61DAFB]", 
    hoverAnim: { rotate: -360, scale: 1.1, transition: { repeat: Infinity, duration: 3, ease: "linear" } } 
  },
  { 
    name: "JavaScript", 
    code: "async function init() {\n  await fetch('/api');\n  console.log('done');\n}", 
    icon: TerminalIcon, 
    color: "text-[#F7DF1E]", 
    hoverAnim: { opacity: [1, 0.4, 1], scale: 1.1, transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } } 
  },
  { 
    name: "Tailwind", 
    code: "<div className=\"\n flex w-full h-screen \n bg-black/50 rounded-xl\n\" />", 
    icon: WindIcon, 
    color: "text-[#06B6D4]", 
    hoverAnim: { x: [0, 8, -4, 8, 0], scale: 1.1, transition: { repeat: Infinity, duration: 1, ease: "easeInOut" } } 
  },
  { 
    name: "Firebase", 
    code: "const doc = await \ngetDocs(collection(db));\nauth.signIn();", 
    icon: FlameIcon, 
    color: "text-[#FFCA28]", 
    hoverAnim: { scale: [1.1, 1.25, 1.05, 1.2, 1.1], transition: { repeat: Infinity, duration: 0.8, ease: "easeInOut" } } 
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)", scale: 0.9 },
  visible: { 
    opacity: 1, y: 0, filter: "blur(0px)", scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
};

function Typewriter({ text, color }) {
  const characters = text.split("");
  return (
    <motion.div className={`font-mono text-xs md:text-sm whitespace-pre-wrap text-left ${color} opacity-90 leading-relaxed tracking-wider`}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.05, delay: index * 0.02 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}

function SkillItem({ skill }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col items-center justify-start cursor-none hover-trigger relative h-[280px] md:h-[320px] w-full z-10 hover:z-50"
    >
      {/* Background Editor Window Reveal */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, borderRadius: "100%" }}
            animate={{ opacity: 1, scale: 1, borderRadius: "1rem" }}
            exit={{ opacity: 0, scale: 0.8, borderRadius: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-[-20px] left-[-20px] right-[-20px] bottom-[-40px] md:top-[-30px] md:left-[-30px] md:right-[-30px] md:bottom-[-60px] bg-[#0a0a0a] border border-white/5 shadow-2xl z-0 overflow-hidden"
          >
            {/* macOS window dots */}
            <div className="absolute top-4 left-4 flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full flex flex-col items-center justify-start h-full pt-8">
        {/* Icon & Title Container */}
        <motion.div 
          animate={{ 
            y: isHovered ? -10 : 45,
            scale: isHovered ? 0.75 : 1
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center w-full"
        >
          {/* Animated Icon */}
          <motion.div 
            animate={isHovered ? skill.hoverAnim : { scale: 1, rotate: 0, x: 0, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={`mb-5 md:mb-6 text-[#555] transition-colors duration-500 group-hover:${skill.color}`}
          >
            <skill.icon size={80} className="md:w-24 md:h-24" strokeWidth={1} />
          </motion.div>
          
          <h3 className={`font-display font-medium text-lg md:text-xl uppercase tracking-[0.25em] transition-colors duration-500 ${isHovered ? skill.color : 'text-[#666]'}`}>
            {skill.name}
          </h3>
        </motion.div>

        {/* Code Editor Typing Reveal */}
        <div className="w-full flex-1 flex items-start justify-center pt-4 md:pt-6 pointer-events-none px-4 md:px-0">
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                className="w-full max-w-[90%] mx-auto"
              >
                <Typewriter text={skill.code} color={skill.color} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

const hoverTexts = [
  "I speak these fluently →",
  "My weapons of choice →",
  "What powers my builds →",
  "Tools I think in →",
];

function HeaderTitle() {
  const [isHovered, setIsHovered] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  // Cycle through taglines on each hover
  const handleHover = () => {
    setIsHovered(true);
    setTextIndex((prev) => (prev + 1) % hoverTexts.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={handleHover}
      onMouseLeave={() => setIsHovered(false)}
      className="mb-6 cursor-none hover-trigger overflow-hidden h-[60px] md:h-[110px] flex items-center justify-center"
    >
      <AnimatePresence mode="wait">
        {!isHovered ? (
          <motion.h2
            key="title"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter text-white"
          >
            Tech Stack
          </motion.h2>
        ) : (
          <motion.p
            key="tagline"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-2xl md:text-5xl font-light italic tracking-tight text-white/70"
          >
            {hoverTexts[textIndex]}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-40 relative z-10 bg-[#050505]">
      <div className="container mx-auto px-6 max-w-7xl relative z-20">
        
        {/* Header */}
        <div className="mb-20 md:mb-32 flex flex-col items-center text-center">
          <HeaderTitle />
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-24 h-[2px] bg-white/20"
          />
        </div>

        {/* Animated Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-y-24 md:gap-y-32 gap-x-8 md:gap-x-12"
        >
          {skills.map((skill) => (
            <SkillItem key={skill.name} skill={skill} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
