"use client";
import Navbar from "@/components/Navbar";
import BeanCard from "@/components/BeanCard";
import { beans } from "@/lib/beans";
import { useState } from "react";
import ChatBot from "@/components/ChatBot";

export default function HomePage() {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleClick() {
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("/api/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "Suggest a coffee bean for beginners" }),
      });
      const data = await res.json();
      setResponse(data.result);
    } catch {
      setResponse("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900">
          <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-amber-950 to-stone-900" />
          <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-amber-800/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-900/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[700px] h-[700px] border border-amber-800/15 rounded-full pointer-events-none" />
            <div className="absolute w-[500px] h-[500px] border border-amber-700/10 rounded-full pointer-events-none" />
            <div className="absolute w-[300px] h-[300px] border border-amber-600/10 rounded-full pointer-events-none" />
          </div>

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <p className="text-amber-400/80 tracking-[0.35em] uppercase text-xs font-medium mb-6">
              Single Origin · Specialty Grade · Ethically Sourced
            </p>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight leading-none">
              Beans<br />
              <span className="text-amber-400">WTF</span>
            </h1>
            <p className="text-stone-300 text-lg md:text-xl mb-12 max-w-lg mx-auto leading-relaxed">
              Sourced from the world&apos;s finest growing regions. Roasted to reveal every nuance, every note, every story.
            </p>

            <button
              onClick={handleClick}
              disabled={loading}
              className="relative z-50 mt-6 bg-white text-black px-6 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Thinking..." : "Ask AI"}
            </button>

            {response && (
              <p className="mt-4 text-stone-300 text-sm max-w-lg mx-auto leading-relaxed bg-stone-800/60 rounded-xl px-5 py-4 text-left">
                {response}
              </p>
            )}

            <a
              href="#beans"
              className="mt-8 inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold px-10 py-4 rounded-full text-base transition-all duration-300 hover:scale-105 shadow-lg shadow-amber-500/25"
            >
              Explore Our Beans
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          <a
            href="#beans"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-500 hover:text-amber-400 transition-colors"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-stone-500 to-transparent animate-pulse" />
          </a>
        </section>

        {/* ── Info strip ───────────────────────────────────────── */}
        <section className="bg-amber-500 py-4">
          <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-8">
            {["Free shipping over $50", "Roasted to order", "20 origins worldwide", "100% arabica"].map((f) => (
              <span key={f} className="text-sm font-medium text-stone-900 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-stone-900 rounded-full" />
                {f}
              </span>
            ))}
          </div>
        </section>

        {/* ── Beans grid ───────────────────────────────────────── */}
        <section id="beans" className="bg-stone-50">
          <div className="bg-stone-900 text-white py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <p className="text-amber-400 text-xs tracking-widest uppercase mb-3">Our Collection</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                20 Carefully Selected Beans
              </h2>
              <p className="text-stone-400 max-w-xl text-base">
                From the misty highlands of Ethiopia to the volcanic slopes of Hawaii — each bean tells the story of its origin.
              </p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {beans.map((bean) => (
                <BeanCard key={bean.bean_id} bean={bean} />
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── Chatbot ──────────────────────────────────────────── */}
      <ChatBot />
    </>
  );
}