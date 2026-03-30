import Link from "next/link";
import Image from "next/image";
import { CoffeeBean, getTagColor, roastTextColors } from "@/lib/beans";

export default function BeanCard({ bean }: { bean: CoffeeBean }) {
    const textCol = roastTextColors[bean.roast_level] ?? "text-stone-700";

    return (
        <Link
            href={`/beans/${bean.bean_id}`}
            className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-stone-100"
        >
            <div className="relative h-48 overflow-hidden bg-amber-100">
                <Image
                    src={`/beans/${bean.bean_id}.png`}
                    alt={bean.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="eager"
                />
                {/* Roast badge stays on top */}
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