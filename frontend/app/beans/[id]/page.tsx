import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import AddToCart from "@/components/AddToCart";
import { getBeanById, getTagColor, roastGradients, roastTextColors } from "@/lib/beans";

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
    return (
        <div>
            <div className="flex justify-between text-sm mb-1.5">
                <span className="text-stone-600 font-medium">{label}</span>
                <span className="text-stone-400 text-xs">{score} / 10</span>
            </div>
            <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full ${color}`}
                    style={{ width: `${score * 10}%` }}
                />
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const { beans } = await import("@/lib/beans");
    return beans.map((b) => ({ id: b.bean_id }));
}

export default async function BeanDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const bean = getBeanById(id);
    if (!bean) notFound();

    const grad = roastGradients[bean.roast_level] ?? "from-amber-300 to-amber-500";
    const textCol = roastTextColors[bean.roast_level] ?? "text-stone-700";

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-stone-50 pt-16">

                {/* Back link */}
                <div className="max-w-5xl mx-auto px-6 pt-8">
                    <Link
                        href="/#beans"
                        className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-amber-700 transition-colors"
                    >
                        <svg 
                            className="w-4 h-4" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth={2}
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                            />
                        </svg>
                        Back to all beans
                    </Link>
                </div>

                {/* Main 2-column layout */}
                <div className="max-w-5xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-10">

                    {/* LEFT: visual + flavour profile */}
                    <div>
                        {/* Image placeholder — replace with <Image /> when you have photos */}
                        <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${grad} aspect-square flex items-center justify-center mb-6`}>
                            <svg 
                                className={`w-28 h-28 opacity-20 ${textCol}`} 
                                viewBox="0 0 100 100" 
                                fill="currentColor"
                            >
                                <ellipse 
                                    cx="50" 
                                    cy="50" 
                                    rx="40" 
                                    ry="25" 
                                />
                                <path 
                                    d="M10 50 Q50 25 90 50" 
                                    stroke="currentColor" 
                                    strokeWidth="4" 
                                    fill="none" 
                                />
                            </svg>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-stone-700">
                                {bean.roast_level} Roast
                            </span>
                            <span className="absolute bottom-4 left-4 text-xs font-medium text-white/70">
                                {bean.origin_country} · {bean.origin_region}
                            </span>
                        </div>

                        {/* Flavour profile scores */}
                        <div className="bg-white rounded-2xl p-6 border border-stone-200 space-y-4">
                            <h3 className="text-xs text-stone-400 uppercase tracking-wider font-semibold mb-4">
                                Flavour Profile
                            </h3>
                            <ScoreBar 
                                label="Acidity"    
                                score={bean.acidity_score}    
                                color="bg-amber-400" 
                            />
                            <ScoreBar 
                                label="Bitterness" 
                                score={bean.bitterness_score} 
                                color="bg-stone-500" 
                            />
                            <ScoreBar 
                                label="Body"       
                                score={bean.body_score}       
                                color="bg-amber-700" 
                            />
                        </div>
                    </div>

                    {/* RIGHT: info */}
                    <div>
                        <p className="text-xs text-amber-600 uppercase tracking-wider font-medium mb-2">
                            {bean.origin_country}
                        </p>
                        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3">{bean.name}</h1>
                        <p className="text-stone-500 text-base leading-relaxed mb-6">{bean.description}</p>

                        {/* Tasting notes */}
                        <div className="mb-8">
                            <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold mb-3">
                                Tasting Notes
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {bean.tasting_notes.map((note) => (
                                    <span
                                        key={note}
                                        className={`text-sm px-3 py-1.5 rounded-full font-medium ${getTagColor(note)}`}
                                    >
                                        {note}
                                    </span>
                                ))}
                            </div>
                        </div>
                          
                        {/* Detail chips */}
                        <div className="grid grid-cols-2 gap-3 mb-8">
                            {[
                                { label: "Process",  value: bean.process },
                                { label: "Altitude", value: bean.altitude },
                                { label: "Region",   value: bean.origin_region },
                                { label: "Weight",   value: `${bean.weight_g}g` },
                            ].map(({ label, value }) => (
                                <div key={label} className="bg-stone-100 rounded-xl p-4">
                                    <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">{label}</p>
                                    <p className="font-semibold text-stone-700 text-sm">{value}</p>
                                </div>
                            ))}
                        </div>
                        
                        {/* Price + Add to Cart */}
                        <div className="flex items-center gap-4">
                            <div>
                                <p className="text-xs text-stone-400 mb-0.5">Price</p>
                                <p className="text-3xl font-bold text-amber-700">${bean.price}</p>
                            </div>
                            <AddToCart bean={bean} />
                        </div>
                    </div>
                </div>
                    
                {/* History section */}
                <div className="max-w-5xl mx-auto px-6 pb-16">
                    <div className="bg-stone-900 rounded-3xl p-8 md:p-12 text-white">
                        <p className="text-amber-400 text-xs tracking-widest uppercase font-medium mb-4">
                            Origin & History
                        </p>
                        <p className="text-stone-200 text-base md:text-lg leading-relaxed max-w-3xl">
                            {bean.history}
                        </p>
                    </div>
                </div>
                  
            </main>
        </>
    );
}