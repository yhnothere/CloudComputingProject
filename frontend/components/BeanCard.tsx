import Link from "next/link";
import { CoffeeBean, getTagColor, roastGradients, roastTextColors } from "@/lib/beans";

export default function BeanCard({ bean }: { bean: CoffeeBean }) {
    const grad = roastGradients[bean.roast_level] ?? "from-amber-300 to-amber-500";
    const textCol = roastTextColors[bean.roast_level] ?? "text-stone-700";

    return (
        <Link
            href={`/beans/${bean.bean_id}`}
            className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-stone-100"
        >
            {/* Image placeholder — swap this div for a real <Image /> when you have photos */}
            <div className={`relative h-48 bg-gradient-to-br ${grad} flex items-center justify-center`}>
                {/* Simple coffee bean icon */}
                <svg 
                    className={`w-16 h-16 opacity-20 ${textCol}`} 
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
                {/* Roast badge */}
                <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm ${textCol}`}>
                    {bean.roast_level}
                </span>
            </div>

            {/* Card body */}
            <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-stone-800 text-sm leading-tight group-hover:text-amber-700 transition-colors line-clamp-2">
                        {bean.name}
                    </h3>
                    <span className="text-amber-700 font-bold text-sm whitespace-nowrap">${bean.price}</span>
                </div>
                <p className="text-xs text-stone-400 mb-3">
                    {bean.origin_country} · {bean.origin_region}
                </p>

                {/* Tasting note tags */}
                <div className="flex flex-wrap gap-1.5">
                    {bean.tasting_notes.map((note) => (
                    <span
                        key={note}
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${getTagColor(note)}`}
                    >
                        {note}
                    </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}