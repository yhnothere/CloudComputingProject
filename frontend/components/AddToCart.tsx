"use client";
import { useState, useEffect, useCallback } from "react";
import { CoffeeBean } from "@/lib/beans";
import { addToCart, getCart, updateQty } from "@/lib/cardStorage";

export default function AddToCart({ bean }: { bean: CoffeeBean }) {
    const [quantity, setQuantity] = useState(0);

    const syncQty = useCallback(() => {
        const cart = getCart();
        const item = cart.find((i) => i.id === bean.bean_id);
        setQuantity(item?.quantity ?? 0);
    }, [bean.bean_id]);

    useEffect(() => {
        syncQty();
        window.addEventListener("cart-updated", syncQty);
        return () => window.removeEventListener("cart-updated", syncQty);
    }, [syncQty]);

    const handleAdd = () => {
        addToCart(bean);
    };

    const handleIncrement = () => {
        updateQty(bean.bean_id, 1);
    };

    const handleDecrement = () => {
        updateQty(bean.bean_id, -1);
    };

    if (quantity === 0) {
        return (
            <button
                onClick={handleAdd}
                className="flex-1 py-4 px-8 rounded-full font-semibold text-base transition-all duration-300 shadow-lg bg-amber-500 hover:bg-amber-400 text-stone-900 hover:scale-105 shadow-amber-500/30"
            >
                Add to Cart
            </button>
        );
    }

    return (
        <div className="flex-1 flex items-center justify-between bg-stone-100 rounded-full px-2 py-2 shadow-inner">
            <button
                onClick={handleDecrement}
                className="w-10 h-10 rounded-full bg-white shadow text-stone-700 hover:bg-amber-50 hover:text-amber-700 font-bold text-xl flex items-center justify-center transition-all duration-150 active:scale-90"
                aria-label="Decrease quantity"
            >
                −
            </button>
            <span className="text-stone-800 font-semibold text-base w-8 text-center tabular-nums">
                {quantity}
            </span>
            <button
                onClick={handleIncrement}
                className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 shadow text-stone-900 font-bold text-xl flex items-center justify-center transition-all duration-150 active:scale-90"
                aria-label="Increase quantity"
            >
                +
            </button>
        </div>
    );
}