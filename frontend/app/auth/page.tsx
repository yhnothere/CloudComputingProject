"use client";
import { useState } from "react";
import { registerUser, confirmUser, loginUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

type Mode = "login" | "register" | "confirm";

// Each rule: label shown to user + test function
const PASSWORD_RULES = [
  { label: "At least 8 characters",       test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter (A–Z)",   test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter (a–z)",   test: (p: string) => /[a-z]/.test(p) },
  { label: "One number (0–9)",             test: (p: string) => /[0-9]/.test(p) },
  { label: "One symbol (!@#$…)",           test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const allRulesPassed = PASSWORD_RULES.every((r) => r.test(password));

  const handle = async () => {
    setError("");
    if (mode === "register" && !allRulesPassed) {
      setError("Please meet all password requirements.");
      return;
    }
    setLoading(true);
    try {
      if (mode === "register") {
        await registerUser(email, password);
        setMode("confirm");
      } else if (mode === "confirm") {
        await confirmUser(email, code);
        setMode("login");
      } else {
        await loginUser(email, password);
        router.push("/");
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
        <div className="text-center mb-8">
          <p className="text-amber-600 text-xs tracking-widest uppercase font-medium mb-2">
            Bean WTF
          </p>
          <h1 className="text-2xl font-bold text-stone-900">
            {mode === "login" && "Welcome back"}
            {mode === "register" && "Create account"}
            {mode === "confirm" && "Check your email"}
          </h1>
          <p className="text-stone-400 text-sm mt-1">
            {mode === "confirm"
              ? `We sent a 6-digit code to ${email}`
              : mode === "login"
              ? "Sign in to your account"
              : "Join the Bean WTF family"}
          </p>
        </div>
        <div className="space-y-4">
          {mode !== "confirm" && (
            <>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-stone-100 text-stone-800 text-sm outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-stone-400"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={
                    mode === "register"
                      ? "Password (min. 8 chars, A-Z, a-z, 0-9, symbol)"
                      : "Password"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handle()}
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-stone-100 text-stone-800 text-sm outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-stone-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {mode === "register" && password.length > 0 && (
                <ul className="space-y-1.5 px-1">
                  {PASSWORD_RULES.map((rule) => {
                    const passed = rule.test(password);
                    return (
                      <li key={rule.label} className={`flex items-center gap-2 text-xs transition-colors ${passed ? "text-green-600" : "text-stone-400"}`}>
                        {passed ? (
                          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <circle cx="12" cy="12" r="9" />
                          </svg>
                        )}
                        {rule.label}
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          )}

          {mode === "confirm" && (
            <input
              type="text"
              placeholder="6-digit verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handle()}
              maxLength={6}
              className="w-full px-4 py-3 rounded-xl bg-stone-100 text-stone-800 text-sm outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-stone-400 tracking-widest text-center"
            />
          )}

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <button
            onClick={handle}
            disabled={loading || (mode === "register" && password.length > 0 && !allRulesPassed)}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-stone-900 font-semibold rounded-xl transition-colors"
          >
            {loading
              ? "Please wait…"
              : mode === "login" ? "Sign In"
              : mode === "register" ? "Create Account"
              : "Verify Email"}
          </button>
        </div>

        {mode !== "confirm" && (
          <p className="text-center text-sm text-stone-400 mt-6">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); setPassword(""); }}
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