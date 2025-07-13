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
  const [galleryImgIdx, setGalleryImgIdx] = React.useState<number>(0);

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
      {entries.map((entry, idx) => (
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
          {entry.images && entry.images.length > 0 && (
            <div className="overflow-x-auto">
              <div className="flex flex-row gap-4 min-w-[300px] pb-2">
                {entry.images.map((img, imgIdx) => (
                  img.includes('via.placeholder.com') ? (
                    <button
                      key={img}
                      type="button"
                      className="focus:outline-none"
                      onClick={() => {
                        setGalleryEntryIdx(idx);
                        setGalleryImgIdx(imgIdx);
                        setGalleryOpen(true);
                      }}
                    >
                      <img
                        src={img}
                        alt={entry.title + " image"}
                        className="h-48 w-auto rounded border border-bbs-cyan bg-black object-contain shadow-md hover:scale-105 transition-transform duration-150"
                        style={{ minWidth: '200px' }}
                        width={200}
                        height={192}
                      />
                    </button>
                  ) : (
                    <button
                      key={img}
                      type="button"
                      className="focus:outline-none"
                      onClick={() => {
                        setGalleryEntryIdx(idx);
                        setGalleryImgIdx(imgIdx);
                        setGalleryOpen(true);
                      }}
                    >
                      <Image
                        src={img}
                        alt={entry.title + " image"}
                        className="h-48 w-auto rounded border border-bbs-cyan bg-black object-contain shadow-md hover:scale-105 transition-transform duration-150"
                        style={{ minWidth: '200px' }}
                        width={200}
                        height={192}
                      />
                    </button>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      {/* Gallery Modal */}
      {galleryOpen && galleryEntryIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setGalleryOpen(false)}
        >
          <div
            className="relative flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-bbs-cyan text-3xl font-bold focus:outline-none hover:text-bbs-yellow"
              onClick={() => setGalleryOpen(false)}
              aria-label="Close gallery"
            >
              &times;
            </button>
            {entries[galleryEntryIdx].images[galleryImgIdx].includes('via.placeholder.com') ? (
              <img
                src={entries[galleryEntryIdx].images[galleryImgIdx]}
                alt={entries[galleryEntryIdx].title + " image"}
                className="max-h-[80vh] max-w-[90vw] rounded border border-bbs-cyan bg-black object-contain shadow-lg"
                width={800}
                height={600}
              />
            ) : (
              <Image
                src={entries[galleryEntryIdx].images[galleryImgIdx]}
                alt={entries[galleryEntryIdx].title + " image"}
                className="max-h-[80vh] max-w-[90vw] rounded border border-bbs-cyan bg-black object-contain shadow-lg"
                width={800}
                height={600}
              />
            )}
            {/* Navigation */}
            {entries[galleryEntryIdx].images.length > 1 && (
              <>
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-bbs-cyan text-4xl px-4 py-2 focus:outline-none hover:text-bbs-yellow"
                  onClick={e => {
                    e.stopPropagation();
                    setGalleryImgIdx((prev) => (prev === 0 ? entries[galleryEntryIdx].images.length - 1 : prev - 1));
                  }}
                  aria-label="Previous image"
                >
                  &#8592;
                </button>
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-bbs-cyan text-4xl px-4 py-2 focus:outline-none hover:text-bbs-yellow"
                  onClick={e => {
                    e.stopPropagation();
                    setGalleryImgIdx((prev) => (prev === entries[galleryEntryIdx].images.length - 1 ? 0 : prev + 1));
                  }}
                  aria-label="Next image"
                >
                  &#8594;
                </button>
              </>
            )}
            {/* Image counter */}
            {entries[galleryEntryIdx].images.length > 1 && (
              <div className="mt-2 text-bbs-cyan text-sm">
                {galleryImgIdx + 1} / {entries[galleryEntryIdx].images.length}
              </div>
            )}
          </div>
        </div>
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
    async function fetchSections() {
      try {
        const querySnapshot = await getDocs(collection(db, "sections"));
        const data = querySnapshot.docs.map(doc => doc.data());
        if (data.length > 0) setSections(data as typeof defaultSections);
      } catch {
        // fallback to defaultSections
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
    <div className={`w-full flex flex-row flex-wrap justify-center items-center gap-x-2 gap-y-1 py-2 px-2 ${position === "top" ? "border-b-2" : "border-t-2 fixed bottom-0 left-0 right-0 z-50 bg-bbs-bg"} border-bbs-magenta text-bbs-cyan text-sm md:text-base lg:text-base font-[amiga4ever] ${position === "bottom" ? "bg-bbs-bg" : ""}`}>
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
  const text = html.replace(/<[^>]+>/g, "");
  if (showTypewriter) {
    return <TypewriterAnimation show={true} text={text} onDone={onDone} />;
  }
  return <div className="mt-2 text-sm md:text-base lg:text-base leading-relaxed break-words" dangerouslySetInnerHTML={{ __html: html }} />;
}
