"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const defaultSections = [
  { key: "A", label: "About", content: `My final goal is to convey thoughts and stories through different mediums and to raise the level of my creative developments with the constant research and study of new techniques for both client and personal projects. I am an avid observer of the world direction in terms of creativity, art and connections with a deep knowledge of the counterculture and the trends, might that be in design, music, movies, products and services. I believe that design is the ultimate representation of the understanding of human behaviours.` },
  { key: "T", label: "Techniques", content: `Art Direction, Creative Direction, Graphic Design, UI/UX, Web Design, Motion Graphics, Video, 3D, Illustration, Coding, Music, Sound Design, Writing, Curation, Research.` },
  { key: "S", label: "Skills", content: `Adobe CC, Figma, Blender, Cinema4D, Ableton Live, TouchDesigner, HTML, CSS, JS, React, Next.js, Firebase, Supabase, Tailwind, Python, C, Max/MSP, Arduino, Notion, Obsidian, and more.` },
  { key: "C", label: "Clients", content: `Nike, Adidas, Red Bull, Universal, Sony, MTV, Vice, Boiler Room, NTS, Warp, Ninja Tune, and many more.` },
  { key: "L", label: "Links", content: `Instagram: @andreaperaltro | Behance: /andreaperaltro | Github: /andreaperaltro | Email: hello@andreaperaltro.com` },
  { key: "E", label: "Lecturing", content: `Visiting lecturer and workshop leader at various universities and institutions across Europe.` },
  { key: "I", label: "Inspiration", content: `Counterculture, underground music, zines, BBS, demo scene, rave flyers, brutalist web, glitch art, and more.` },
  { key: "D", label: "Schedule", content: `Available for freelance, collaborations, and commissions. Get in touch!` },
];

function TypewriterAnimation({ show, text, onDone }: { show: boolean; text: string; onDone: () => void }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!show) {
      setDisplayed("");
      return;
    }
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      setDisplayed((d) => d + text[i]);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(onDone, 200); // call onDone after animation
      }
    }, 12);
    return () => clearInterval(interval);
  }, [show, text, onDone]);
  return (
    <span className="whitespace-pre-line text-bbs-fg font-[amiga4ever] text-base md:text-lg lg:text-xl">{displayed}</span>
  );
}

export default function LoadingPage() {
  const [sectionIdx, setSectionIdx] = useState(0);
  const [playedSections, setPlayedSections] = useState<{ [key: string]: boolean }>({});
  const [showTypewriter, setShowTypewriter] = useState(true);
  const sectionKey = defaultSections[sectionIdx].key;

  // Load playedSections from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("bbs_played_sections");
    if (stored) setPlayedSections(JSON.parse(stored));
  }, []);

  // When section changes, decide if we should animate
  useEffect(() => {
    if (playedSections[sectionKey]) {
      setShowTypewriter(false);
    } else {
      setShowTypewriter(true);
    }
  }, [sectionKey, playedSections]);

  // When animation finishes, mark section as played
  const handleTypewriterDone = () => {
    setPlayedSections((prev) => {
      const updated = { ...prev, [sectionKey]: true };
      sessionStorage.setItem("bbs_played_sections", JSON.stringify(updated));
      return updated;
    });
    setShowTypewriter(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-bbs-bg text-bbs-fg font-[amiga4ever]">
      {/* Menu */}
      <nav className="flex flex-row gap-4 mb-8 text-bbs-cyan text-lg font-bold">
        {defaultSections.map((section, idx) => (
          <button
            key={section.key}
            className={`hover:text-bbs-yellow transition-colors px-2 py-1 ${sectionIdx === idx ? "underline text-bbs-yellow" : ""}`}
            onClick={() => setSectionIdx(idx)}
          >
            {section.label}
          </button>
        ))}
      </nav>
      {/* Profile image and name */}
      <div className="flex flex-col items-center mb-8">
        <Image src="/profile.png" alt="Profile" width={96} height={96} className="rounded-full border-4 border-bbs-magenta mb-2" />
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-bbs-yellow font-[amiga4ever]">Andrea Perato</h1>
        <div className="text-bbs-cyan text-base font-[amiga4ever]">Creative Technologist & Designer</div>
      </div>
      {/* Section content */}
      <div className="w-full max-w-2xl px-4 py-6 border border-bbs-magenta bg-bbs-bg/80 rounded-lg shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold text-bbs-yellow mb-4 font-[amiga4ever]">{defaultSections[sectionIdx].label}</h2>
        {showTypewriter ? (
          <TypewriterAnimation
            show={showTypewriter}
            text={defaultSections[sectionIdx].content}
            onDone={handleTypewriterDone}
          />
        ) : (
          <span className="whitespace-pre-line text-bbs-fg font-[amiga4ever] text-base md:text-lg lg:text-xl">
            {defaultSections[sectionIdx].content}
          </span>
        )}
      </div>
    </div>
  );
} 