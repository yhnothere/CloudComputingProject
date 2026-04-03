"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getUser, getUserAttributes } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { AuthUser } from "aws-amplify/auth";

export default function Navbar() {
    const [cartCount] = useState(0); 

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

    const handleCheckOut=async()=>{
        router.push("/cart");
    };
    const handleAccountClick = () => {
        if (user) {
            router.push("/account"); 
        } else {
            router.push("/auth");
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-900/80 backdrop-blur-md border-b border-stone-700/40">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              
                {/* Brand */}
                <Link 
                    href="/" 
                    className="text-xl font-bold text-amber-400 tracking-wider"
                >
                    Beans WTF
                </Link>

                {/* Nav links */}
                <div className="flex items-center gap-8">
                    <Link
                        href="/#beans"
                        className="text-stone-300 hover:text-amber-400 transition-colors text-sm font-medium"
                    >
                        Our Beans
                    </Link>

                    {/* Cart */}
                    <button 
                        onClick={handleCheckOut}
                        className="relative text-stone-300 hover:text-amber-400 transition-colors">
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
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-amber-500 text-stone-900 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                  
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