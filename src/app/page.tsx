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
    return <div className="text-bbs-yellow text-xl">Loading portfolio...</div>;
  }
  if (!entries.length) {
    return <div className="text-bbs-yellow text-xl">No portfolio entries found.</div>;
  }
  return (
    <div className="space-y-10">
      {entries.map((entry, idx) => (
        <div key={idx} className="mb-8 border-b border-bbs-magenta pb-8 last:border-b-0 last:pb-0">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-bbs-yellow mb-1">{entry.title}</h2>
              <div className="text-base md:text-lg italic text-bbs-cyan">{entry.discipline}</div>
              <div className="text-base md:text-lg">
                <span className="font-bold text-bbs-yellow">Client: </span>
                {entry.clientUrl ? (
                  <a href={entry.clientUrl} target="_blank" rel="noopener noreferrer" className="underline text-bbs-cyan hover:text-bbs-yellow">{entry.client}</a>
                ) : (
                  <span>{entry.client}</span>
                )}
              </div>
            </div>
            <div className="text-base md:text-lg mt-2 md:mt-0 text-bbs-cyan">{entry.description}</div>
          </div>
          {entry.images && entry.images.length > 0 && (
            <div className="overflow-x-auto">
              <div className="flex flex-row gap-4 min-w-[300px] pb-2">
                {entry.images.map((img) => (
                  <Image
                    key={img}
                    src={img}
                    alt={entry.title + " image"}
                    className="h-48 w-auto rounded border border-bbs-cyan bg-black object-contain shadow-md"
                    style={{ minWidth: '200px' }}
                    width={200}
                    height={192}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [sections, setSections] = useState(defaultSections);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<string>(defaultSections[0].key);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    async function fetchSections() {
      try {
        const querySnapshot = await getDocs(collection(db, "sections"));
        const data = querySnapshot.docs.map(doc => doc.data());
        if (data.length > 0) setSections(data as typeof defaultSections);
      } catch (e) {
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

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-bbs-bg text-bbs-cyan font-[amiga4ever] text-base md:text-lg lg:text-xl">
        <span className="text-bbs-yellow text-2xl">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-bbs-bg text-bbs-fg font-[amiga4ever] text-base md:text-lg lg:text-xl">
      {/* Top Menu Bar */}
      <MenuBar open={open} setOpen={setOpen} position="top" sections={sections} />
      {/* Flex row for main content area */}
      <div className="flex flex-col md:flex-row flex-1 w-full items-stretch">
        {/* Main content area, left-aligned, BBS style only around content */}
        <div className="mt-6 mb-8 ml-0 w-full flex-1">
          {/* Profile image and name always visible */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 flex items-center justify-center rounded overflow-hidden mb-2">
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
                <span className="text-3xl md:text-5xl text-bbs-blue">AP</span>
              )}
            </div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-bbs-yellow">Andrea Perato</h1>
          </div>
          {/* Only show the selected section, with BBS border and background only around the content */}
          <div className="w-full">
            {sections.map((section) => (
              <div key={section.key} className={`${open === section.key ? "block" : "hidden"} border-2 border-bbs-magenta bg-bbs-bg p-2 sm:p-4 md:p-6 shadow-lg rounded-none mb-4`}>
                {section.key === "P" ? (
                  <PortfolioSection />
                ) : (
                  <SectionContent dangerouslySetInnerHTML={{__html: section.content}} />
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Right side empty for now, can be used for future widgets or spacing */}
        <div className="hidden lg:block" />
      </div>
      {/* Bottom Menu Bar */}
      <MenuBar open={open} setOpen={setOpen} position="bottom" sections={sections} />
    </div>
  );
}

function MenuBar({ open, setOpen, position, sections }: { open: string; setOpen: (k: string) => void; position: "top" | "bottom"; sections: { key: string; label: string; content: string }[] }) {
  return (
    <div className={`w-full flex flex-row flex-wrap justify-center items-center gap-x-2 gap-y-1 py-2 px-2 ${position === "top" ? "border-b-2" : "border-t-2"} border-bbs-magenta bg-bbs-bg text-bbs-cyan text-base md:text-xl lg:text-2xl font-[amiga4ever]`}>
      {sections.map((s, i) => (
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

function SectionContent(props: { children?: React.ReactNode; dangerouslySetInnerHTML?: { __html: string } }) {
  if (props.dangerouslySetInnerHTML) {
    return <div className="mt-2 text-base md:text-lg lg:text-xl leading-relaxed break-words" dangerouslySetInnerHTML={props.dangerouslySetInnerHTML} />;
  }
  return <div className="mt-2 text-base md:text-lg lg:text-xl leading-relaxed break-words">{props.children}</div>;
}
