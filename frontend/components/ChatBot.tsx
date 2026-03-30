"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { beans } from "@/lib/beans";

type Message = {
  role: "user" | "assistant";
  content: string;
  recommendedBeanId?: string | null;
};

const SUGGESTIONS = [
  "I love fruity and floral flavours 🌸",
  "Something bold and chocolatey ☕",
  "Low acidity, smooth and nutty 🌰",
  "I want something rare and unique ✨",
];
 
const CATALOG = beans.map((b) => ({
  bean_id: b.bean_id,
  name: b.name,
  roast: b.roast_level,
  origin: b.origin_country,
  notes: b.tasting_notes,
  acidity: b.acidity_score,
  bitterness: b.bitterness_score,
  body: b.body_score,
  price: b.price,
}));

const SYSTEM_PROMPT = `You are a warm, knowledgeable Coffee Sommelier for Bean & WTF, a specialty coffee store.

STRICT RULES:
1. You may ONLY recommend beans from the catalog below. Never invent or suggest beans outside this list.
2. When making a recommendation, always append a hidden tag at the very end of your response in this exact format on its own line: [RECOMMEND:bean_id_here]. Example: [RECOMMEND:ethiopia_yirgacheffe_01]. Never mention the bean_id anywhere else in your readable text — only use the bean's proper name.
3. If the customer's flavour preferences have NO reasonable match in the catalog, honestly say so and suggest the closest available option with an explanation of how it differs.
4. Keep responses friendly, concise, and conversational — like a great barista, not a textbook.
5. If you need more info, ask one short follow-up question before recommending.

CATALOG (all available beans):
${JSON.stringify(CATALOG, null, 2)}`;

function extractBeanId(text: string): string | null {
  const match = text.match(/\[RECOMMEND:([\w_]+)\]/);
  return match ? match[1] : null;
}

function stripTag(text: string): string {
  return text.replace(/\[RECOMMEND:[\w_]+\]/g, "").trim();
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your personal Coffee Sommelier 🫘\nTell me what flavours you enjoy and I'll find your perfect bean from our collection.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && !minimized) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, open, minimized]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    const history = messages.map(({ role, content }) => ({ role, content }));
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: text,
          history,
          systemPrompt: SYSTEM_PROMPT,
        }),
      });
      const data = await res.json();
      const raw: string = data.result ?? "Sorry, I couldn't get a response. Please try again.";
      const recommendedBeanId = extractBeanId(raw);
      const reply = stripTag(raw); // clean text shown to user
      setMessages((prev) => [...prev, { role: "assistant", content: reply, recommendedBeanId }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Make sure Ollama is running and try again." },
      ]);
    }
    setLoading(false);
  };

  const showSuggestions = messages.length === 1; // only on first message

  return (
    <>
      {/* ── Floating button ───────────────────────────────────── */}
      <button
        onClick={() => {
          if (open && !minimized) {
            setMinimized(true);
          } else {
            setOpen(true);
            setMinimized(false);
          }
        }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-amber-500 hover:bg-amber-400 text-stone-900 rounded-full shadow-xl shadow-amber-500/30 flex items-center justify-center transition-all duration-200 hover:scale-110"
        aria-label="Coffee Sommelier"
      >
        {open && !minimized ? (
          // Minimise icon
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          // Coffee cup icon
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
          </svg>
        )}
      </button>

      {/* ── Chat window ───────────────────────────────────────── */}
      {open && (
        <div
          className={`fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden transition-all duration-300 ${
            minimized ? "h-0 opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{ maxHeight: "min(600px, calc(100vh - 120px))" }}
        >
          {/* Header */}
          <div className="bg-stone-900 px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">Coffee Sommelier</p>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span className="text-stone-400 text-xs">Online</span>
                </span>
              </div>
            </div>
            {/* Close entirely */}
            <button
              onClick={() => setOpen(false)}
              className="text-stone-500 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {/* Sommelier avatar on left */}
                {m.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-3 h-3 text-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
                    </svg>
                  </div>
                )}
                <div className="flex flex-col gap-1 max-w-[80%]">
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      m.role === "user"
                        ? "bg-amber-500 text-stone-900 rounded-br-sm"
                        : "bg-white text-stone-700 border border-stone-200 rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                  {/* Recommendation CTA */}
                  {m.recommendedBeanId && (
                    <Link
                      href={`/beans/${m.recommendedBeanId}`}
                      className="self-start flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-3 py-2 rounded-xl hover:bg-amber-100 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View this bean →
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center shrink-0 mt-1">
                  <svg className="w-3 h-3 text-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
                  </svg>
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Suggestion chips — only shown before first user message */}
            {showSuggestions && !loading && (
              <div className="pt-1 flex flex-col gap-2">
                <p className="text-xs text-stone-400 text-center">Try asking…</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-xs bg-white border border-amber-200 text-amber-800 px-3 py-1.5 rounded-full hover:bg-amber-50 hover:border-amber-400 transition-colors font-medium shadow-sm"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div className="p-3 border-t border-stone-200 flex gap-2 bg-white shrink-0">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Describe your ideal cup…"
              className="flex-1 text-sm bg-stone-100 rounded-full px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-400 text-stone-800 placeholder:text-stone-400"
            />
            <button
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              className="w-9 h-9 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors shrink-0"
            >
              <svg className="w-4 h-4 text-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}