"use client";

import React, { useState } from "react";

const aboutText = `My final goal is to convey thoughts and stories through different mediums and to raise the level of my creative developments with the constant research and study of new techniques for both client and personal projects. I am an avid observer of the world direction in terms of creativity, art and connections with a deep knowledge of the counterculture and the trends, might that be in design, music, movies, products and services. I believe that design is the ultimate representation of the understanding of human behaviours.`;

const animations = [
  {
    key: "v1",
    label: "Typewriter",
    render: (show: boolean) => (
      <TypewriterAnimation show={show} text={aboutText} />
    ),
  },
  {
    key: "v2",
    label: "Blinking Cursor",
    render: (show: boolean) => (
      <BlinkingCursorAnimation show={show} text={aboutText} />
    ),
  },
  {
    key: "v3",
    label: "Scrolling Bar",
    render: (show: boolean) => (
      <ScrollingBarAnimation show={show} text={aboutText} />
    ),
  },
  {
    key: "v4",
    label: "ANSI Dots",
    render: (show: boolean) => (
      <ANSIDotsAnimation show={show} text={aboutText} />
    ),
  },
];

export default function LoadingShowcase() {
  const [active, setActive] = useState(0);
  const [show, setShow] = useState(true);

  const handleSwitch = (idx: number) => {
    setShow(false);
    setTimeout(() => {
      setActive(idx);
      setShow(true);
    }, 100);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-bbs-bg text-bbs-fg font-[amiga4ever]">
      <div className="flex flex-row gap-2 mb-8">
        {animations.map((a, idx) => (
          <button
            key={a.key}
            className={`px-4 py-2 rounded border border-bbs-cyan text-bbs-cyan font-bold bg-bbs-bg hover:bg-bbs-cyan hover:text-bbs-bg transition-colors duration-150 ${active === idx ? "bg-bbs-cyan text-bbs-bg" : ""}`}
            onClick={() => handleSwitch(idx)}
          >
            {a.label}
          </button>
        ))}
      </div>
      <div className="w-full max-w-xl min-h-[120px] flex items-center justify-center border-2 border-bbs-magenta bg-black p-6 shadow-lg">
        {animations[active].render(show)}
      </div>
      <div className="mt-8 text-bbs-yellow text-xs opacity-60">Try the different BBS loading animations above!</div>
    </div>
  );
}

// --- Animation Components ---

function TypewriterAnimation({ show, text }: { show: boolean; text: string }) {
  const [displayed, setDisplayed] = React.useState("");
  React.useEffect(() => {
    if (!show) return setDisplayed("");
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      setDisplayed((d) => d + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 12);
    return () => clearInterval(interval);
  }, [show, text]);
  return (
    <span className="text-bbs-cyan text-base md:text-lg tracking-widest font-[amiga4ever]">
      {displayed}
      <span className="animate-pulse">_</span>
    </span>
  );
}

function BlinkingCursorAnimation({ show, text }: { show: boolean; text: string }) {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    if (!show) return setVisible(false);
    setVisible(true);
    const timeout = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(timeout);
  }, [show]);
  return (
    <span className="text-bbs-yellow text-base md:text-lg tracking-widest font-[amiga4ever]">
      {show ? text : ""}
      <span className="ml-2 animate-blink">█</span>
    </span>
  );
}

function ScrollingBarAnimation({ show, text }: { show: boolean; text: string }) {
  return (
    <div className="w-full flex flex-col items-center font-[amiga4ever]">
      <div className="w-full h-4 bg-bbs-bg border border-bbs-cyan overflow-hidden relative mb-4">
        {show && <div className="absolute left-0 top-0 h-full bg-bbs-cyan animate-scrollbar" style={{ width: '30%' }} />}
      </div>
      <div className="text-bbs-cyan mb-2 font-[amiga4ever]">LOADING...</div>
      <div className="text-bbs-fg text-sm md:text-base text-left w-full font-[amiga4ever]">{text}</div>
    </div>
  );
}

function ANSIDotsAnimation({ show, text }: { show: boolean; text: string }) {
  return (
    <div className="flex flex-col items-center w-full font-[amiga4ever]">
      <div className="flex flex-row gap-2 mb-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`w-4 h-4 rounded-full ${show ? `animate-bounce${i % 4}` : ""} ${i % 2 === 0 ? "bg-bbs-cyan" : "bg-bbs-yellow"}`} />
        ))}
      </div>
      <div className="text-bbs-yellow mb-2 font-[amiga4ever]">CONNECTING TO BBS...</div>
      <div className="text-bbs-fg text-sm md:text-base text-left w-full font-[amiga4ever]">{text}</div>
    </div>
  );
}

// --- Tailwind Animations ---
// Add these to your tailwind.config.js:
//   animation: {
//     blink: 'blink 1s steps(2, start) infinite',
//     scrollbar: 'scrollbar 1.2s linear infinite',
//     bounce0: 'bounce 0.8s 0s infinite',
//     bounce1: 'bounce 0.8s 0.1s infinite',
//     bounce2: 'bounce 0.8s 0.2s infinite',
//     bounce3: 'bounce 0.8s 0.3s infinite',
//   },
//   keyframes: {
//     blink: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
//     scrollbar: { '0%': { left: '-30%' }, '100%': { left: '100%' } },
//     bounce: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-1.5rem)' } },
//   }, 