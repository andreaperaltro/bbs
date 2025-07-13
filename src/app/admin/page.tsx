"use client";

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { supabase } from "../supabaseClient";
import Image from "next/image";

// Types
interface Section {
  id?: string;
  key: string;
  label: string;
  content: string;
}
interface PortfolioEntry {
  id?: string;
  title: string;
  discipline: string;
  client: string;
  clientUrl?: string;
  description: string;
  images: string[];
}

type Tab = "sections" | "portfolio";

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("sections");
  // Sections state
  const [sections, setSections] = useState<Section[]>([]);
  const [sectionForm, setSectionForm] = useState<Section>({ key: "", label: "", content: "" });
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  // Portfolio state
  const [portfolio, setPortfolio] = useState<PortfolioEntry[]>([]);
  const [portfolioForm, setPortfolioForm] = useState<PortfolioEntry>({ title: "", discipline: "", client: "", clientUrl: "", description: "", images: [] });
  const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  // Loading
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Fetch data
  useEffect(() => {
    fetchSections();
    fetchPortfolio();
  }, []);

  async function fetchSections() {
    const querySnapshot = await getDocs(collection(db, "sections"));
    setSections(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Section)));
  }
  async function fetchPortfolio() {
    const querySnapshot = await getDocs(collection(db, "portfolio"));
    setPortfolio(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PortfolioEntry)));
  }

  // Section handlers
  async function handleSectionSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (editingSectionId) {
      await updateDoc(doc(db, "sections", editingSectionId), { ...sectionForm });
    } else {
      await addDoc(collection(db, "sections"), { ...sectionForm });
    }
    setSectionForm({ key: "", label: "", content: "" });
    setEditingSectionId(null);
    fetchSections();
    setLoading(false);
  }
  function handleSectionEdit(section: Section) {
    setSectionForm(section);
    setEditingSectionId(section.id!);
  }
  async function handleSectionDelete(id: string) {
    setLoading(true);
    await deleteDoc(doc(db, "sections", id));
    fetchSections();
    setLoading(false);
  }

  // Portfolio handlers
  async function handlePortfolioSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (editingPortfolioId) {
      await updateDoc(doc(db, "portfolio", editingPortfolioId), { ...portfolioForm });
    } else {
      await addDoc(collection(db, "portfolio"), { ...portfolioForm });
    }
    setPortfolioForm({ title: "", discipline: "", client: "", clientUrl: "", description: "", images: [] });
    setEditingPortfolioId(null);
    fetchPortfolio();
    setLoading(false);
  }
  function handlePortfolioEdit(entry: PortfolioEntry) {
    setPortfolioForm(entry);
    setEditingPortfolioId(entry.id!);
  }
  async function handlePortfolioDelete(id: string) {
    setLoading(true);
    await deleteDoc(doc(db, "portfolio", id));
    fetchPortfolio();
    setLoading(false);
  }

  // Helper for image upload
  async function handleImageUpload(files: FileList | null, onSuccess: (urls: string[]) => void) {
    if (!files) return;
    setUploading(true);
    setUploadError(null);
    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = `portfolio-images/${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage.from('portfolio-images').upload(filePath, file, { upsert: true });
        if (uploadError) throw uploadError;
        // Get public URL
        const { data } = supabase.storage.from('portfolio-images').getPublicUrl(filePath);
        if (!data || !data.publicUrl) throw new Error('Could not get public URL');
        urls.push(data.publicUrl);
      }
      onSuccess(urls);
    } catch {
      // nothing here
    } finally {
      setUploading(false);
    }
  }

  // UI
  return (
    <div className="min-h-screen bg-bbs-bg text-bbs-fg font-[amiga4ever] p-4">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
      <div className="flex gap-4 mb-6">
        <button onClick={() => setTab("sections")}
          className={`px-3 py-1 rounded border font-bold transition-colors duration-100 ${tab === "sections" ? "border-bbs-cyan text-bbs-cyan bg-bbs-bg" : "bg-bbs-cyan text-bbs-bg border-transparent"}`}>Sections</button>
        <button onClick={() => setTab("portfolio")}
          className={`px-3 py-1 rounded border font-bold transition-colors duration-100 ${tab === "portfolio" ? "border-bbs-cyan text-bbs-cyan bg-bbs-bg" : "bg-bbs-cyan text-bbs-bg border-transparent"}`}>Portfolio</button>
      </div>
      {tab === "sections" && (
        <div>
          <h2 className="text-lg font-bold mb-2">Sections</h2>
          <form onSubmit={handleSectionSubmit} className="mb-4 space-y-2">
            <div className="flex gap-2">
              <input className="border border-bbs-cyan bg-bbs-bg text-bbs-fg px-2 py-1 flex-1" required placeholder="Key" value={sectionForm.key} onChange={e => setSectionForm(f => ({ ...f, key: e.target.value }))} />
              <input className="border border-bbs-cyan bg-bbs-bg text-bbs-fg px-2 py-1 flex-1" required placeholder="Label" value={sectionForm.label} onChange={e => setSectionForm(f => ({ ...f, label: e.target.value }))} />
            </div>
            <textarea className="border border-bbs-cyan bg-bbs-bg text-bbs-fg px-2 py-1 w-full" required placeholder="Content (HTML allowed)" value={sectionForm.content} onChange={e => setSectionForm(f => ({ ...f, content: e.target.value }))} />
            <button
              type="submit"
              className="bg-bbs-yellow text-bbs-bg border border-bbs-yellow font-bold px-4 py-2 rounded shadow hover:bg-bbs-bg hover:text-bbs-yellow hover:border-bbs-yellow transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              disabled={loading}
            >
              {editingSectionId ? "Update" : "Add"} Section
            </button>
            {editingSectionId && <button type="button" className="ml-2 px-3 py-1 border border-bbs-cyan text-bbs-cyan rounded" onClick={() => { setSectionForm({ key: "", label: "", content: "" }); setEditingSectionId(null); }}>Cancel</button>}
          </form>
          <ul className="space-y-2">
            {sections.map(section => (
              <li key={section.id} className="border border-bbs-cyan p-2 rounded flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <span className="font-bold">{section.key}</span>: {section.label}
                </div>
                <div className="flex gap-2">
                  <button className="px-2 py-1 bg-bbs-yellow text-bbs-bg rounded" onClick={() => handleSectionEdit(section)}>Edit</button>
                  <button className="px-2 py-1 bg-bbs-red text-bbs-bg rounded" onClick={() => handleSectionDelete(section.id!)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {tab === "portfolio" && (
        <div>
          <h2 className="text-lg font-bold mb-2">Portfolio Entries</h2>
          <form onSubmit={handlePortfolioSubmit} className="mb-4 space-y-2">
            <div className="flex gap-2 flex-wrap">
              <input className="border border-bbs-cyan bg-bbs-bg text-bbs-fg px-2 py-1 flex-1" required placeholder="Title" value={portfolioForm.title} onChange={e => setPortfolioForm(f => ({ ...f, title: e.target.value }))} />
              <input className="border border-bbs-cyan bg-bbs-bg text-bbs-fg px-2 py-1 flex-1" required placeholder="Discipline" value={portfolioForm.discipline} onChange={e => setPortfolioForm(f => ({ ...f, discipline: e.target.value }))} />
              <input className="border border-bbs-cyan bg-bbs-bg text-bbs-fg px-2 py-1 flex-1" required placeholder="Client" value={portfolioForm.client} onChange={e => setPortfolioForm(f => ({ ...f, client: e.target.value }))} />
              <input className="border border-bbs-cyan bg-bbs-bg text-bbs-fg px-2 py-1 flex-1" placeholder="Client URL" value={portfolioForm.clientUrl} onChange={e => setPortfolioForm(f => ({ ...f, clientUrl: e.target.value }))} />
            </div>
            <textarea className="border border-bbs-cyan bg-bbs-bg text-bbs-fg px-2 py-1 w-full" required placeholder="Description" value={portfolioForm.description} onChange={e => setPortfolioForm(f => ({ ...f, description: e.target.value }))} />
            <div className="flex flex-col gap-2">
              <label className="font-bold">Upload Images</label>
              <input type="file" multiple accept="image/*" className="border border-bbs-cyan bg-bbs-bg text-bbs-fg px-2 py-1" onChange={async (e) => {
                handleImageUpload(
                  e.target.files,
                  (urls) => setPortfolioForm(f => ({ ...f, images: [...f.images, ...urls] }))
                );
              }} />
              {uploading && <span className="text-bbs-yellow">Uploading...</span>}
              {uploadError && <div className="text-bbs-red text-xs mt-1">Upload error: {uploadError}</div>}
              {portfolioForm.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {portfolioForm.images.map((img, idx) => (
                    <div key={idx} className="relative">
                      <Image src={img} alt="Portfolio" className="w-16 h-16 object-cover border border-bbs-cyan" width={64} height={64} />
                      <button type="button" className="absolute top-0 right-0 bg-bbs-red text-bbs-bg px-1 rounded" onClick={() => setPortfolioForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) }))}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-bbs-yellow text-bbs-bg border border-bbs-yellow font-bold px-4 py-2 rounded shadow hover:bg-bbs-bg hover:text-bbs-yellow hover:border-bbs-yellow transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              disabled={loading || uploading}
            >
              {editingPortfolioId ? "Update" : "Add"} Entry
            </button>
            {editingPortfolioId && <button type="button" className="ml-2 px-3 py-1 border border-bbs-cyan text-bbs-cyan rounded" onClick={() => { setPortfolioForm({ title: "", discipline: "", client: "", clientUrl: "", description: "", images: [] }); setEditingPortfolioId(null); }}>Cancel</button>}
          </form>
          <ul className="space-y-2">
            {portfolio.map(entry => (
              <li key={entry.id} className="border border-bbs-cyan p-2 rounded flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <span className="font-bold">{entry.title}</span> — {entry.discipline} — {entry.client}
                </div>
                <div className="flex gap-2">
                  <button className="px-2 py-1 bg-bbs-yellow text-bbs-bg rounded" onClick={() => handlePortfolioEdit(entry)}>Edit</button>
                  <button className="px-2 py-1 bg-bbs-red text-bbs-bg rounded" onClick={() => handlePortfolioDelete(entry.id!)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 