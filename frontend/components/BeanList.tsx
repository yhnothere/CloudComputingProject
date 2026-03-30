"use client";

import { beans, CoffeeBean } from "@/lib/beans";
import BeanCard from "@/components/BeanCard";
import { useEffect, useState } from "react";

export default function BeanList() {
    const [beans, setBeans] = useState<CoffeeBean[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchBeans() {
        try {
            const res = await fetch("/api/dynamo");

            if (!res.ok) {
            throw new Error("Failed to fetch beans");
            }

            const data = await res.json();
            setBeans(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
        }

        fetchBeans();
    }, []);

    return (
        <main>
        <section id="beans" className="bg-stone-50">
            <div className="bg-stone-900 text-white py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <p className="text-amber-400 text-xs tracking-widest uppercase mb-3">
                Our Collection
                </p>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                20 Carefully Selected Beans
                </h2>
                <p className="text-stone-400 max-w-xl text-base">
                From the misty highlands of Ethiopia to the volcanic slopes of
                Hawaii — each bean tells the story of its origin.
                </p>
            </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
            {loading && (
                <p className="text-stone-600 text-center">Loading beans...</p>
            )}

            {error && (
                <p className="text-red-600 text-center">Error: {error}</p>
            )}

            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {beans.map((bean) => (
                    <BeanCard key={bean.bean_id} bean={bean} />
                ))}
                </div>
            )}
            </div>
        </section>
        </main>
    );
}