"use client";

import React, { useState } from "react";

const animations = [
  {
    key: "v1",
    label: "Typewriter",
    render: (show: boolean) => (
      <TypewriterAnimation show={show} text="WELCOME TO THE BBS PORTFOLIO..." />
    ),
  },
  {
    key: "v2",
    label: "Blinking Cursor",
    render: (show: boolean) => (
      <BlinkingCursorAnimation show={show} text="LOADING DATA FROM MAINFRAME" />
    ),
  },
  {
    key: "v3",
    label: "Scrolling Bar",
    render: (show: boolean) => (
      <ScrollingBarAnimation show={show} />
    ),
  },
  {
    key: "v4",
    label: "ANSI Dots",
    render: (show: boolean) => (
      <ANSIDotsAnimation show={show} />
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
    }, 40);
    return () => clearInterval(interval);
  }, [show, text]);
  return (
    <span className="text-bbs-cyan text-lg md:text-xl font-mono tracking-widest">
      {displayed}
      <span className="animate-pulse">_</span>
    </span>
  );
}

function BlinkingCursorAnimation({ show, text }: { show: boolean; text: string }) {
  return (
    <span className="text-bbs-yellow text-lg md:text-xl font-mono tracking-widest">
      {show ? text : ""}
      <span className="ml-2 animate-blink">█</span>
    </span>
  );
}

function ScrollingBarAnimation({ show }: { show: boolean }) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full h-4 bg-bbs-bg border border-bbs-cyan overflow-hidden relative">
        {show && <div className="absolute left-0 top-0 h-full bg-bbs-cyan animate-scrollbar" style={{ width: '30%' }} />}
      </div>
      <div className="mt-4 text-bbs-cyan font-mono">LOADING...</div>
    </div>
  );
}

function ANSIDotsAnimation({ show }: { show: boolean }) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-row gap-2 mb-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`w-4 h-4 rounded-full ${show ? `animate-bounce${i % 4}` : ""} ${i % 2 === 0 ? "bg-bbs-cyan" : "bg-bbs-yellow"}`} />
        ))}
      </div>
      <div className="text-bbs-yellow font-mono">CONNECTING TO BBS...</div>
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