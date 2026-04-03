"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getUser, getUserAttributes } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { AuthUser } from "aws-amplify/auth";
import { CartItem, getCart } from "@/lib/cardStorage"; // adjust path

export default function Navbar() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [hovered, setHovered] = useState(false);

    const router = useRouter();
    const [user, setUser] = useState<AuthUser | null>(null);
    const [displayName, setDisplayName] = useState<string>("");

    useEffect(() => {
        getUser().then((u) => {
            setUser(u);
            if (u) {
                getUserAttributes().then((attributes) => {
                    setDisplayName(attributes?.name ?? "");
                });
            }
        });
    }, []);

    useEffect(() => {
        setCart(getCart());
    }, []);

    const handleCheckOut = async () => { router.push("/cart"); };
    const handleAccountClick = () => { router.push(user ? "/account" : "/auth"); };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-900/80 backdrop-blur-md border-b border-stone-700/40">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Brand — home icon */}
                <Link href="/" className="text-stone-300 hover:text-amber-400 transition-colors" aria-label="Home">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </Link>

                {/* Nav links */}
                <div className="flex items-center gap-8">

                    {/* Our Beans — coffee bean icon + label */}
                    <Link
                        href="/#beans"
                        className="flex items-center gap-2 text-stone-300 hover:text-amber-400 transition-colors text-sm font-medium"
                    >
                        {/* Coffee bean SVG */}
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                            <ellipse cx="12" cy="12" rx="9" ry="5.5" transform="rotate(-35 12 12)" />
                            <path strokeLinecap="round" d="M12 12c-2.5-2.5-2.5-5 0-7" transform="rotate(-35 12 12)" />
                        </svg>
                        Our Beans
                    </Link>

                    {/* Cart */}
                    <div
                    className="relative"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    >
                    {/* Cart button */}
                    <button
                        onClick={handleCheckOut}
                        className="relative text-stone-300 hover:text-amber-400 transition-colors"
                        aria-label="Cart"
                    >
                        <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                        </svg>

                        {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-amber-500 text-stone-900 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                            {cart.length}
                        </span>
                        )}
                    </button>

                    {/* 🛒 Hover dropdown */}
                    {hovered && (
                        <div className="absolute right-0 mt-3 w-64 bg-white border border-stone-200 rounded-xl shadow-lg p-4 z-50">
                        <h4 className="text-sm font-semibold mb-3 text-stone-700">
                            Your Cart
                        </h4>

                        {cart.length === 0 ? (
                            <p className="text-sm text-stone-400">Cart is empty</p>
                        ) : (
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                            {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between gap-2 text-sm"
                        >
                            {/* LEFT: image + name */}
                            <div className="flex items-center gap-2 min-w-0">
                            <div className="relative w-8 h-8 rounded-md overflow-hidden bg-stone-100">
                                <Image
                                src={`/beans/${item.id}.png`}
                                alt={item.name}
                                fill
                                sizes="32px"
                                className="object-cover"
                                />
                            </div>

                            <span className="text-stone-700 truncate">
                                {item.name}
                            </span>
                            </div>

                            {/* RIGHT: quantity */}
                            <span className="text-stone-500 shrink-0">
                            x{item.quantity}
                            </span>
                        </div>
                        ))} 
                            </div>
                        )}
                        </div>
                    )}
                    </div>

                    {/* Account */}
                    <button onClick={handleAccountClick} className="flex items-center gap-2 text-stone-300 hover:text-amber-400 transition-colors">
                        {user ? (
                            <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center">
                                <span className="text-stone-900 text-xs font-bold">
                                    {(displayName || user.username)?.split("@")[0]?.slice(0, 2).toUpperCase()}
                                </span>
                            </div>
                        ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}