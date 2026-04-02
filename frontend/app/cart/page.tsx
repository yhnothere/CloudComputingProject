"use client";
 
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CartItem,
  getCart,
  saveCart,
  updateQty as storageUpdateQty,
  updateGrind as storageUpdateGrind,
  removeFromCart,
} from "@/lib/cardStorage";
 
const SHIPPING_OPTIONS = [
  { id: "std", label: "Standard", eta: "5–7 business days", price: 4.5 },
  { id: "exp", label: "Express", eta: "2–3 business days", price: 9.0 },
  { id: "next", label: "Next Day", eta: "Next business day", price: 18.0 },
];
 
const GRIND_OPTIONS = ["Whole Bean", "Filter", "Espresso", "French Press", "Moka Pot"];
 
// ─── Helpers ──────────────────────────────────────────────────────────────────
 
function RoastBadge({ roast }: { roast: string }) {
  const map: Record<string, string> = {
    Light: "bg-amber-100 text-amber-800",
    Medium: "bg-amber-500/20 text-amber-400",
    Dark: "bg-stone-700 text-stone-300",
  };
  return (
    <span className={`text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full ${map[roast] ?? "bg-stone-700 text-stone-300"}`}>
      {roast}
    </span>
  );
}
 
// ─── Page ─────────────────────────────────────────────────────────────────────
 
export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [shipping, setShipping] = useState("std");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const [step, setStep] = useState<"cart" | "success">("cart");
 
  // ── Hydrate from localStorage ──
  useEffect(() => {
    setItems(getCart());
    const onUpdate = () => setItems(getCart());
    window.addEventListener("cart-updated", onUpdate);
    return () => window.removeEventListener("cart-updated", onUpdate);
  }, []);
 
  // ── Cart mutations ──
  const updateQty = (id: string, delta: number) => {
    storageUpdateQty(id, delta);
    setItems(getCart());
  };
 
  const updateGrind = (id: string, grind: string) => {
    storageUpdateGrind(id, grind);
    setItems(getCart());
  };
 
  const removeItem = (id: string) => {
    removeFromCart(id);
    setItems(getCart());
  };
 
  // ── Totals ──
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const selectedShipping = SHIPPING_OPTIONS.find((o) => o.id === shipping)!;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + selectedShipping.price - discount;
 
  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "BEANS10") {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoApplied(false);
    }
  };
 
  const handleCheckout = () => {
    saveCart([]);
    setStep("success");
  };
 
  // ── Success screen ──
  if (step === "success") {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center px-6 text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center text-4xl animate-bounce">
            ☕
          </div>
          <svg className="absolute inset-0 w-full h-full animate-spin-slow opacity-20" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="38" stroke="#f59e0b" strokeWidth="1" fill="none" strokeDasharray="6 4" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-amber-400 mb-2 tracking-tight">Order placed!</h1>
        <p className="text-stone-400 mb-1 text-sm">
          Confirmation sent to your inbox.
        </p>
        <p className="text-stone-500 text-xs mb-8">
          Your beans are being roasted to order — shipping in 1–2 days.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold text-sm rounded-lg transition-colors"
        >
          Back to shop
        </Link>
      </div>
    );
  }
 
  // ── Empty cart ──
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center px-6 text-center">
        <span className="text-5xl mb-4">🫙</span>
        <h2 className="text-xl font-bold text-stone-200 mb-2">Your cart is empty</h2>
        <p className="text-stone-500 text-sm mb-6">Looks like you haven't added any beans yet.</p>
        <Link
          href="/#beans"
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold text-sm rounded-lg transition-colors"
        >
          Browse Beans
        </Link>
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {/* ── Top bar ── */}
      <div className="fixed top-0 inset-x-0 z-40 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
 
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        {/* Page header */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-stone-500 hover:text-amber-400 text-xs font-medium transition-colors mb-4"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Continue shopping
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Cart
            <span className="ml-3 text-base font-normal text-stone-500">
              {items.reduce((s, i) => s + i.quantity, 0)} items
            </span>
          </h1>
        </div>
 
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* ── Left: Items ── */}
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="group bg-stone-900/60 border border-stone-800/60 rounded-2xl p-5 flex gap-4 hover:border-stone-700/80 transition-colors"
              >
             
 
                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h3 className="font-semibold text-stone-100 text-sm leading-tight">{item.name}</h3>
                      <p className="text-stone-500 text-xs mt-0.5">{item.origin}</p>
                    </div>
                    <RoastBadge roast={item.roast} />
                  </div>
 
                  {/* Grind selector */}
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <select
                      value={item.grind}
                      onChange={(e) => updateGrind(item.id, e.target.value)}
                      className="bg-stone-800 border border-stone-700 text-stone-300 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500 transition-colors"
                    >
                      {GRIND_OPTIONS.map((g) => (
                        <option key={g}>{g}</option>
                      ))}
                    </select>
 
                    {/* Qty stepper */}
                    <div className="flex items-center gap-1 bg-stone-800 rounded-lg border border-stone-700 overflow-hidden">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:bg-stone-700 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-7 text-center text-sm font-medium text-stone-200 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:bg-stone-700 transition-colors"
                      >
                        +
                      </button>
                    </div>
 
                    {/* Line price */}
                    <span className="ml-auto text-sm font-semibold text-amber-400 tabular-nums">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
 
                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="self-start mt-0.5 text-stone-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Remove item"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
 
            {/* ── Shipping ── */}
            <div className="bg-stone-900/60 border border-stone-800/60 rounded-2xl p-5 mt-6">
              <h2 className="text-sm font-semibold text-stone-300 mb-4 uppercase tracking-widest">
                Shipping
              </h2>
              <div className="space-y-2">
                {SHIPPING_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      shipping === opt.id
                        ? "border-amber-500/50 bg-amber-500/5"
                        : "border-stone-800 hover:border-stone-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={opt.id}
                      checked={shipping === opt.id}
                      onChange={() => setShipping(opt.id)}
                      className="accent-amber-500"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-stone-200">{opt.label}</p>
                      <p className="text-xs text-stone-500">{opt.eta}</p>
                    </div>
                    <span className="text-sm font-semibold text-stone-300 tabular-nums">
                      ${opt.price.toFixed(2)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
 
          {/* ── Right: Summary ── */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-stone-900/70 border border-stone-800/60 rounded-2xl p-6 space-y-5">
              <h2 className="text-sm font-semibold text-stone-300 uppercase tracking-widest">
                Order Summary
              </h2>
 
              {/* Line items */}
              <div className="space-y-2 text-sm">
                {items.map((i) => (
                  <div key={i.id} className="flex justify-between text-stone-400">
                    <span className="truncate mr-2">
                      {i.name} <span className="text-stone-600">×{i.quantity}</span>
                    </span>
                    <span className="tabular-nums flex-shrink-0">${(i.price * i.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
 
              <div className="border-t border-stone-800 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-stone-400">
                  <span>Subtotal</span>
                  <span className="tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Shipping · {selectedShipping.label}</span>
                  <span className="tabular-nums">${selectedShipping.price.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-400">
                    <span>Promo (BEANS10)</span>
                    <span className="tabular-nums">−${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>
 
              <div className="border-t border-stone-800 pt-4 flex justify-between items-baseline">
                <span className="font-semibold text-stone-200">Total</span>
                <span className="text-xl font-bold text-amber-400 tabular-nums">${total.toFixed(2)}</span>
              </div>
 
              {/* Promo code */}
              <div className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoError(false);
                    }}
                    className={`flex-1 bg-stone-800 border text-stone-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-stone-600 ${
                      promoError ? "border-red-500/60" : "border-stone-700"
                    }`}
                  />
                  <button
                    onClick={applyPromo}
                    disabled={!promoCode.trim() || promoApplied}
                    className="px-3 py-2 text-xs font-semibold bg-stone-800 hover:bg-stone-700 disabled:opacity-40 border border-stone-700 text-stone-300 rounded-lg transition-colors"
                  >
                    {promoApplied ? "✓" : "Apply"}
                  </button>
                </div>
                {promoError && (
                  <p className="text-xs text-red-400">Invalid promo code. Try BEANS10!</p>
                )}
                {promoApplied && (
                  <p className="text-xs text-green-400">10% discount applied 🎉</p>
                )}
              </div>
 
              {/* CTA */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 active:scale-[.98] text-stone-900 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Proceed to Checkout
              </button>
 
              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 pt-1">
                {["🔒 Secure", "↩️ Free returns", "🫘 Fresh roast"].map((badge) => (
                  <span key={badge} className="text-[10px] text-stone-600 font-medium">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}