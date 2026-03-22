"use client";
import { useState } from "react";
import { CoffeeBean } from "@/lib/beans";

export default function AddToCart({ bean }: { bean: CoffeeBean }) {
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        setAdded(true);
        // TODO: dispatch to cart context / state manager
        console.log("Added to cart:", bean.bean_id);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAdd}
            className={`flex-1 py-4 px-8 rounded-full font-semibold text-base transition-all duration-300 shadow-lg ${
                added
                    ? "bg-green-500 text-white scale-95"
                    : "bg-amber-500 hover:bg-amber-400 text-stone-900 hover:scale-105 shadow-amber-500/30"
            }`}
        >
            {added ? "Added to Cart ✓" : "Add to Cart"}
        </button>
    );
}