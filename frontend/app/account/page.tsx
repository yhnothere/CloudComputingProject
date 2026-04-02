"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, getUserAttributes, updateDisplayName, logoutUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";

export default function AccountPage() {
  const router = useRouter();
  const [attrs, setAttrs] = useState<Record<string, string> | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getUser().then((user) => {
      if (!user) { router.push("/auth"); return; }
      getUserAttributes().then((a) => {
        if (!a) return;
        const map = a as Record<string, string>;
        setAttrs(map);
        setDisplayName(map.name ?? "");
      });
    });
  }, [router]);

  const handleSave = async () => {
    if (!displayName.trim()) return;
    setSaving(true);
    setError("");
    try {
      await updateDisplayName(displayName.trim());
      setAttrs((prev) => prev ? { ...prev, name: displayName.trim() } : prev);
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e: unknown) {
      if (e instanceof Error) {
          setError(e.message);
      } else {
          setError("Failed to update name");
      }
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await logoutUser();
    router.push("/");
  };

  if (!attrs) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-stone-50 pt-16 flex items-center justify-center">
          <div className="flex gap-2">
            {[0,1,2].map((i) => (
              <span key={i} className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </main>
      </>
    );
  }

  const initials = (attrs.name ?? attrs.email ?? "?")
    .split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-stone-50 pt-16">
        <div className="max-w-2xl mx-auto px-6 py-12 space-y-6">

          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
            <div className="h-24 bg-gradient-to-r from-stone-900 to-amber-950" />

            <div className="px-8 pb-8">
              <div className="-mt-10 mb-4 flex items-end justify-between">
                <div className="w-20 h-20 rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg border-4 border-white">
                  <span className="text-stone-900 font-bold text-2xl">{initials}</span>
                </div>
                {saved && (
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Saved
                  </span>
                )}
              </div>

              <h1 className="text-xl font-bold text-stone-900">
                {attrs.name || "Coffee Lover"}
              </h1>
              <p className="text-stone-400 text-sm">{attrs.email}</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
            <h2 className="font-semibold text-stone-800 text-sm uppercase tracking-wider">
              Profile Details
            </h2>

            <div>
              <label className="text-xs text-stone-400 uppercase tracking-wider font-medium block mb-2">
                Display Name
              </label>
              {editing ? (
                <div className="flex gap-2">
                  <input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    placeholder="How should we call you?"
                    autoFocus
                    maxLength={30}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-stone-100 text-stone-800 text-sm outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-stone-400"
                  />
                  <button
                    onClick={handleSave}
                    disabled={saving || !displayName.trim()}
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-900 text-sm font-semibold rounded-xl transition-colors"
                  >
                    {saving ? "Saving…" : "Save"}
                  </button>
                  <button
                    onClick={() => { setEditing(false); setDisplayName(attrs.name ?? ""); setError(""); }}
                    className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-600 text-sm font-medium rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-stone-700 text-sm">
                    {attrs.name || <span className="text-stone-400 italic">Not set</span>}
                  </span>
                  <button
                    onClick={() => setEditing(true)}
                    className="text-amber-600 hover:text-amber-500 text-sm font-medium flex items-center gap-1"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit
                  </button>
                </div>
              )}
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </div>

            <div>
              <label className="text-xs text-stone-400 uppercase tracking-wider font-medium block mb-2">
                Email Address
              </label>
              <div className="flex items-center justify-between">
                <span className="text-stone-700 text-sm">{attrs.email}</span>
                <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-medium">
                  Verified
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs text-stone-400 uppercase tracking-wider font-medium block mb-2">
                Member Since
              </label>
              <span className="text-stone-700 text-sm">
                {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
            <h2 className="font-semibold text-stone-800 text-sm uppercase tracking-wider mb-4">
              Taste Preferences
            </h2>
            <p className="text-stone-400 text-sm">
              Chat with the Coffee Sommelier to discover your favourites — your recommendations will appear here.
            </p>
            <button
              onClick={() => router.push("/#beans")}
              className="mt-4 text-sm text-amber-600 hover:text-amber-500 font-medium flex items-center gap-1"
            >
              Browse our collection →
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
            <h2 className="font-semibold text-stone-800 text-sm uppercase tracking-wider mb-4">
              Account
            </h2>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign out
            </button>
          </div>

        </div>
      </main>
    </>
  );
}