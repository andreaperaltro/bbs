"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

// Define a type for portfolio entries
interface PortfolioEntry {
  title: string;
  discipline: string;
  client: string;
  clientUrl?: string;
  description: string;
  images: string[];
  videos?: string[];
}

const defaultSections = [
  { key: "A", label: "About", content: `My final goal is to convey thoughts and stories through different mediums and to raise the level of my creative developments with the constant research and study of new techniques for both client and personal projects. I am an avid observer of the world direction in terms of creativity, art and connections with a deep knowledge of the counterculture and the trends, might that be in design, music, movies, products and services. I believe that design is the ultimate representation of the understanding of human behaviours.` },
  { key: "T", label: "Techniques", content: `<strong>Graphic design:</strong> Adobe Creative Suite, Procreate<br/><strong>Digital design:</strong> Figma, Sketch<br/><strong>Generative:</strong> Processing, Java, Nodebox<br/><strong>3D Design:</strong> Cinema 4D, Blender` },
  { key: "S", label: "Skills", content: `Concept generation // Narrative strategy // Art direction // Typography // Illustration // Pattern design // Generative art // Digital design // User experience // 3D Design // Fashion product development` },
  { key: "C", label: "Clients", content: `<div class='flex flex-wrap gap-2 underline'><a href='https://www.oakley.com/' target='_blank' rel='noopener noreferrer'>Oakley</a>, <a href='https://www.palaceskateboards.com/' target='_blank' rel='noopener noreferrer'>Palace Skateboards</a>, <a href='https://www.ngg.net/' target='_blank' rel='noopener noreferrer'>NGG</a>, <a href='https://www.reebok.com/' target='_blank' rel='noopener noreferrer'>Reebok</a>, <a href='https://www.polimoda.com/' target='_blank' rel='noopener noreferrer'>Polimoda</a>, <a href='https://www.brionvega.it/' target='_blank' rel='noopener noreferrer'>Brionvega</a>, <a href='https://www.fornasetti.com/' target='_blank' rel='noopener noreferrer'>Fornasetti</a>, <a href='https://www.vivoconcerti.com/' target='_blank' rel='noopener noreferrer'>Vivo Concerti</a>, <a href='https://www.canon.com/' target='_blank' rel='noopener noreferrer'>Canon</a>, <a href='https://www.lonelyplanet.com/' target='_blank' rel='noopener noreferrer'>Lonely Planet</a>, <a href='https://www.rittersport.com/' target='_blank' rel='noopener noreferrer'>Ritter Sport</a>, <a href='https://www.zooppa.com/' target='_blank' rel='noopener noreferrer'>Zooppa</a>, <a href='https://www.contraste.com/' target='_blank' rel='noopener noreferrer'>Contraste</a></div>` },
  { key: "L", label: "Links", content: `<div class='flex flex-wrap gap-4 underline'><a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>Instagram</a> <a href='https://www.linkedin.com/' target='_blank' rel='noopener noreferrer'>LinkedIn</a> <a href='https://github.com/' target='_blank' rel='noopener noreferrer'>Github</a></div>` },
  { key: "D", label: "Lecturing", content: `<span>Teaching Digital Design @ <a href='https://www.polimoda.com/' target='_blank' rel='noopener noreferrer' class='underline'>Polimoda, Florence</a></span>` },
  { key: "I", label: "Inspiration", content: `<a href='#' class='underline'>Interesting and inspiring links</a>` },
  { key: "M", label: "Schedule", content: `<span>Schedule a meeting with me </span><a href='https://calendar.app.google/2HhMiVkUSuZTfMWz5' target='_blank' rel='noopener noreferrer' class='underline'>https://calendar.app.google/2HhMiVkUSuZTfMWz5</a>` },
];

function PortfolioSection() {
  const [entries, setEntries] = React.useState<PortfolioEntry[]>([]);
  const [loading, setLoading] = React.useState(true);
  // Gallery modal state
  const [galleryOpen, setGalleryOpen] = React.useState(false);
  const [galleryEntryIdx, setGalleryEntryIdx] = React.useState<number | null>(null);
  const [galleryMediaIdx, setGalleryMediaIdx] = React.useState<number>(0);

  // Ref to keep current media array in sync for keyboard nav
  const mediaRef = React.useRef<string[]>([]);
  React.useEffect(() => {
    if (galleryOpen && galleryEntryIdx !== null) {
      const entry = entries[galleryEntryIdx];
      mediaRef.current = [
        ...(entry.images || []),
        ...((entry.videos && entry.videos.length > 0) ? entry.videos : [])
      ];
    } else {
      mediaRef.current = [];
    }
  }, [galleryOpen, galleryEntryIdx, entries]);

  // Keyboard navigation for gallery modal
  React.useEffect(() => {
    if (!galleryOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!galleryOpen) return;
      if (e.key === 'ArrowLeft') {
        setGalleryMediaIdx((prev) => (prev === 0 ? mediaRef.current.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setGalleryMediaIdx((prev) => (prev === mediaRef.current.length - 1 ? 0 : prev + 1));
      } else if (e.key === 'Escape') {
        setGalleryOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryOpen]);

  React.useEffect(() => {
    async function fetchPortfolio() {
      try {
        const querySnapshot = await getDocs(collection(db, "portfolio"));
        const data = querySnapshot.docs.map(doc => doc.data() as PortfolioEntry);
        setEntries(data);
      } catch {
        setEntries([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolio();
  }, []);

  if (loading) {
    return <div className="text-bbs-yellow text-base">Loading portfolio...</div>;
  }
  if (!entries.length) {
    return <div className="text-bbs-yellow text-base">No portfolio entries found.</div>;
  }
  return (
    <div className="space-y-10">
      {entries.map((entry, idx) => {
        // Combine images and videos for gallery
        const media = [
          ...(entry.images || []),
          ...((entry.videos && entry.videos.length > 0) ? entry.videos : [])
        ];
        const isVideo = (url: string) => (entry.videos || []).includes(url);
        return (
          <div key={idx} className="mb-8 border-b border-bbs-magenta pb-8 last:border-b-0 last:pb-0">
            <div className="flex flex-col gap-2 mb-4 w-full">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-bbs-yellow mb-1 text-left w-full">{entry.title}</h2>
              <div className="flex flex-row items-center gap-4 text-sm md:text-base lg:text-base italic text-bbs-cyan w-full">
                <span>{entry.discipline}</span>
                <span className="text-bbs-fg">|</span>
                <span>
                  <span className="font-bold text-bbs-yellow not-italic">Client: </span>
                  {entry.clientUrl ? (
                    <a href={entry.clientUrl} target="_blank" rel="noopener noreferrer" className="underline text-bbs-cyan hover:text-bbs-yellow">{entry.client}</a>
                  ) : (
                    <span>{entry.client}</span>
                  )}
                </span>
              </div>
              <div className="text-sm md:text-base lg:text-base mt-1 text-bbs-cyan text-left w-full">{entry.description}</div>
            </div>
            {media.length > 0 && (
              <div className="overflow-x-auto">
                <div className="flex flex-row gap-4 min-w-[300px] pb-2">
                  {media.map((url, mediaIdx) => (
                    <button
                      key={url}
                      type="button"
                      className="focus:outline-none relative"
                      onClick={() => {
                        setGalleryEntryIdx(idx);
                        setGalleryMediaIdx(mediaIdx);
                        setGalleryOpen(true);
                      }}
                    >
                      {isVideo(url) ? (
                        <div className="relative">
                          <video
                            src={url}
                            className="h-48 w-auto object-contain shadow-md !border-none !rounded-none"
                            style={{ minWidth: '200px', border: 'none', borderRadius: 0, background: 'black' }}
                            width={200}
                            height={192}
                            preload="metadata"
                            muted
                            playsInline
                            onMouseOver={e => (e.currentTarget as HTMLVideoElement).play()}
                            onMouseOut={e => { (e.currentTarget as HTMLVideoElement).pause(); (e.currentTarget as HTMLVideoElement).currentTime = 0; }}
                          />
                          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-bbs-yellow opacity-80"><circle cx="24" cy="24" r="24" fill="black" fillOpacity="0.5"/><polygon points="19,16 34,24 19,32" fill="currentColor"/></svg>
                          </span>
                        </div>
                      ) : url.includes('via.placeholder.com') ? (
                        <img
                          src={url}
                          alt={entry.title + " image"}
                          className="h-48 w-auto rounded border border-bbs-cyan bg-black object-contain shadow-md hover:scale-105 transition-transform duration-150"
                          style={{ minWidth: '200px' }}
                          width={200}
                          height={192}
                        />
                      ) : (
                        <Image
                          src={url}
                          alt={entry.title + " image"}
                          className="h-48 w-auto rounded border border-bbs-cyan bg-black object-contain shadow-md hover:scale-105 transition-transform duration-150"
                          style={{ minWidth: '200px' }}
                          width={200}
                          height={192}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
      {/* Gallery Modal */}
      {galleryOpen && galleryEntryIdx !== null && (
        (() => {
          const entry = entries[galleryEntryIdx];
          const media = [
            ...(entry.images || []),
            ...((entry.videos && entry.videos.length > 0) ? entry.videos : [])
          ];
          const isVideo = (url: string) => (entry.videos || []).includes(url);
          const currentUrl = media[galleryMediaIdx];

          return (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
              onClick={() => setGalleryOpen(false)}
            >
              {/* X button - fixed to top right of viewport */}
              <button
                className="fixed top-6 right-8 text-bbs-cyan text-4xl font-bold focus:outline-none hover:text-bbs-yellow z-60"
                onClick={() => setGalleryOpen(false)}
                aria-label="Close gallery"
                style={{ zIndex: 60 }}
              >
                &times;
              </button>
              {/* Left arrow - fixed to left center of viewport */}
              {media.length > 1 && (
                <button
                  className="fixed left-4 top-1/2 -translate-y-1/2 text-bbs-cyan text-5xl px-4 py-2 focus:outline-none hover:text-bbs-yellow z-60"
                  onClick={e => {
                    e.stopPropagation();
                    setGalleryMediaIdx((prev) => (prev === 0 ? media.length - 1 : prev - 1));
                  }}
                  aria-label="Previous media"
                  style={{ zIndex: 60 }}
                >
                  &#8592;
                </button>
              )}
              {/* Right arrow - fixed to right center of viewport */}
              {media.length > 1 && (
                <button
                  className="fixed right-4 top-1/2 -translate-y-1/2 text-bbs-cyan text-5xl px-4 py-2 focus:outline-none hover:text-bbs-yellow z-60"
                  onClick={e => {
                    e.stopPropagation();
                    setGalleryMediaIdx((prev) => (prev === media.length - 1 ? 0 : prev + 1));
                  }}
                  aria-label="Next media"
                  style={{ zIndex: 60 }}
                >
                  &#8594;
                </button>
              )}
              <div
                className="relative flex flex-col items-center"
                onClick={e => e.stopPropagation()}
              >
                {isVideo(currentUrl) ? (
                  <video
                    src={currentUrl}
                    className="max-h-[80vh] max-w-[90vw] bg-black object-contain shadow-lg"
                    width={800}
                    height={600}
                    controls
                    autoPlay
                  />
                ) : currentUrl.includes('via.placeholder.com') ? (
                  <img
                    src={currentUrl}
                    alt={entry.title + " image"}
                    className="max-h-[80vh] max-w-[90vw] rounded border border-bbs-cyan bg-black object-contain shadow-lg"
                    width={800}
                    height={600}
                  />
                ) : (
                  <Image
                    src={currentUrl}
                    alt={entry.title + " image"}
                    className="max-h-[80vh] max-w-[90vw] rounded border border-bbs-cyan bg-black object-contain shadow-lg"
                    width={800}
                    height={600}
                  />
                )}
                {/* Media counter */}
                {media.length > 1 && (
                  <div className="mt-2 text-bbs-cyan text-sm">
                    {galleryMediaIdx + 1} / {media.length}
                  </div>
                )}
              </div>
            </div>
          );
        })()
      )}
    </div>
  );
}

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
        setTimeout(onDone, 200);
      }
    }, 12);
    return () => clearInterval(interval);
  }, [show, text, onDone]);
  return (
    <span className="mt-2 text-sm md:text-base lg:text-base leading-relaxed break-words whitespace-pre-line text-bbs-fg font-[amiga4ever]">{displayed}</span>
  );
}

export default function Home() {
  const [sections, setSections] = useState(defaultSections);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<string>(defaultSections[0].key);
  const [imgError, setImgError] = useState(false);
  // Animation state
  const [playedSections, setPlayedSections] = useState<{ [key: string]: boolean }>({});
  const [showTypewriter, setShowTypewriter] = useState(true);

  useEffect(() => {
    async function fetchSections(force = false) {
      try {
        const lastFetch = localStorage.getItem("lastSectionsFetch");
        const cached = localStorage.getItem("sectionsCache");
        const now = Date.now();
        if (!force && lastFetch && cached && now - parseInt(lastFetch, 10) < 24 * 60 * 60 * 1000) {
          // Use cached content if less than 24h old
          setSections(JSON.parse(cached));
          setLoading(false);
          return;
        }
        // Fetch from Firestore
        const querySnapshot = await getDocs(collection(db, "sections"));
        const data = querySnapshot.docs.map(doc => doc.data());
        if (data.length > 0) {
          setSections(data as typeof defaultSections);
          localStorage.setItem("sectionsCache", JSON.stringify(data));
          localStorage.setItem("lastSectionsFetch", now.toString());
        } else if (cached) {
          setSections(JSON.parse(cached));
        } else {
          setSections(defaultSections);
        }
      } catch {
        // fallback to cache or defaultSections
        const cached = localStorage.getItem("sectionsCache");
        if (cached) {
          setSections(JSON.parse(cached));
        } else {
          setSections(defaultSections);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchSections();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const pressed = e.key.toUpperCase();
      if (sections.some((s) => s.key === pressed)) {
        setOpen((prev) => (prev === pressed ? sections[0].key : pressed));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [sections]);

  // Load playedSections from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("bbs_played_sections");
    if (stored) setPlayedSections(JSON.parse(stored));
  }, []);

  // When section changes, decide if we should animate
  useEffect(() => {
    if (playedSections[open]) {
      setShowTypewriter(false);
    } else {
      setShowTypewriter(true);
    }
  }, [open, playedSections]);

  // When animation finishes, mark section as played
  const handleTypewriterDone = () => {
    setPlayedSections((prev) => {
      const updated = { ...prev, [open]: true };
      sessionStorage.setItem("bbs_played_sections", JSON.stringify(updated));
      return updated;
    });
    setShowTypewriter(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-bbs-bg text-bbs-cyan font-[amiga4ever] text-sm md:text-base lg:text-base">
        <span className="text-bbs-yellow text-base">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-bbs-bg text-bbs-fg font-[amiga4ever] text-sm md:text-base lg:text-base">
      {/* Top Menu Bar */}
      <MenuBar open={open} setOpen={setOpen} position="top" sections={sections} />
      {/* Flex row for main content area */}
      <div className="flex flex-col md:flex-row flex-1 w-full items-stretch overflow-y-auto">
        {/* Main content area, left-aligned, BBS style only around content */}
        <div className="mt-6 mb-8 ml-0 w-full flex-1 px-4 md:px-8 lg:px-16">
          {/* Profile image and name always visible */}
          <div className="flex flex-row items-center gap-4 mb-6">
            <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
              {!imgError ? (
                <Image 
                  src="/profile.png" 
                  alt="Andrea Perato" 
                  width={128} 
                  height={128} 
                  className="object-cover w-full h-full" 
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full bg-bbs-magenta flex items-center justify-center text-bbs-bg">?</div>
              )}
            </div>
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-bbs-yellow font-[amiga4ever] select-text">Andrea Perato</span>
          </div>
          {/* Only show the selected section, with BBS border and background only around the content */}
          <div className="w-full">
            {sections.map((section) => (
              <div key={section.key} className={`${open === section.key ? "block" : "hidden"} border-2 border-bbs-magenta bg-bbs-bg p-2 sm:p-4 md:p-6 shadow-lg rounded-none mb-4`}>
                {section.key === "P" ? (
                  <PortfolioSection />
                ) : (
                  <SectionContentWithTypewriter
                    html={section.content}
                    showTypewriter={showTypewriter && open === section.key}
                    onDone={handleTypewriterDone}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Right side empty for now, can be used for future widgets or spacing */}
        <div className="hidden lg:block" />
      </div>
      {/* Bottom Menu Bar - always fixed */}
      <MenuBar open={open} setOpen={setOpen} position="bottom" sections={sections} />
    </div>
  );
}

function MenuBar({ open, setOpen, position, sections }: { open: string; setOpen: (k: string) => void; position: "top" | "bottom"; sections: { key: string; label: string; content: string }[]; }) {
  return (
    <div className={`w-full flex flex-row flex-wrap justify-center items-center gap-x-2 gap-y-1 py-2 px-2 ${position === "top" ? "border-b-2" : "border-t-2 fixed bottom-0 left-0 right-0 z-50 bg-black hidden sm:flex"} border-bbs-magenta text-bbs-cyan text-sm md:text-base lg:text-base font-[amiga4ever] ${position === "top" ? "" : "hidden sm:flex"}`}>
      {sections.map((s) => (
        <button
          key={s.key}
          onClick={() => setOpen(s.key)}
          className={`px-1 md:px-2 py-1 rounded transition-colors duration-100 text-bbs-cyan ${open === s.key ? "bg-bbs-cyan text-bbs-bg font-bold underline" : "hover:underline"}`}
          aria-current={open === s.key ? "page" : undefined}
        >
          ({s.key}) {s.label}
        </button>
      ))}
    </div>
  );
}

function SectionContentWithTypewriter({ html, showTypewriter, onDone }: { html: string; showTypewriter: boolean; onDone: () => void }) {
  // Strip HTML tags for animation, but render full HTML after
  // Replace tags with a space, then collapse multiple spaces
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  // Debug logging
  console.log('[Typewriter Debug] Raw HTML:', html);
  console.log('[Typewriter Debug] Processed Text:', text);
  if (showTypewriter) {
    return <TypewriterAnimation show={true} text={text} onDone={onDone} />;
  }
  return <div className="mt-2 text-sm md:text-base lg:text-base leading-relaxed break-words" dangerouslySetInnerHTML={{ __html: html }} />;
}
