"use client";
import { useState } from "react";
import { registerUser, confirmUser, loginUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

type Mode = "login" | "register" | "confirm";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setError("");
    setLoading(true);
    try {
      if (mode === "register") {
        await registerUser(email, password);
        setMode("confirm"); // move to verification step
      } else if (mode === "confirm") {
        await confirmUser(email, code);
        setMode("login");
      } else {
        await loginUser(email, password);
        router.push("/"); // back to homepage after login
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
          setError(e.message);
      } else {
          setError("Something went wrong");
      }
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-stone-900 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-amber-600 text-xs tracking-widest uppercase font-medium mb-2">
            Bean & Bloom
          </p>
          <h1 className="text-2xl font-bold text-stone-900">
            {mode === "login" && "Welcome back"}
            {mode === "register" && "Create account"}
            {mode === "confirm" && "Check your email"}
          </h1>
          <p className="text-stone-400 text-sm mt-1">
            {mode === "confirm"
              ? `We sent a verification code to ${email}`
              : mode === "login"
              ? "Sign in to your account"
              : "Join the Bean & Bloom family"}
          </p>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          {mode !== "confirm" && (
            <>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-stone-100 text-stone-800 text-sm outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-stone-400"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handle()}
                className="w-full px-4 py-3 rounded-xl bg-stone-100 text-stone-800 text-sm outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-stone-400"
              />
            </>
          )}
          {mode === "confirm" && (
            <input
              type="text"
              placeholder="6-digit verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handle()}
              className="w-full px-4 py-3 rounded-xl bg-stone-100 text-stone-800 text-sm outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-stone-400 tracking-widest text-center"
            />
          )}

          {error && (
            <p className="text-red-500 text-xs text-center">{error}</p>
          )}

          <button
            onClick={handle}
            disabled={loading}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-900 font-semibold rounded-xl transition-colors"
          >
            {loading
              ? "Please wait…"
              : mode === "login"
              ? "Sign In"
              : mode === "register"
              ? "Create Account"
              : "Verify Email"}
          </button>
        </div>

        {/* Toggle */}
        {mode !== "confirm" && (
          <p className="text-center text-sm text-stone-400 mt-6">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-amber-600 hover:text-amber-500 font-medium"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        )}
      </div>
    </main>
  );
}