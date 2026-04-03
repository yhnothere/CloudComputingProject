export type RoastLevel = "Light" | "Medium-Light" | "Medium" | "Medium-Dark" | "Dark";
export type OriginRegion = "Africa" | "Asia Pacific" | "Central America" | "South America" | "Caribbean" | "Middle East" | "Pacific";

export interface CoffeeBean {
    bean_id: string;
    name: string;
    price: number;
    roast_level: RoastLevel;
    origin_region: OriginRegion;
    origin_country: string;
    tasting_notes: string[];
    acidity_score: number;   // out of 10
    bitterness_score: number;
    body_score: number;
    description: string;
    history: string;
    altitude: string;
    process: string;
    weight_g: number;
}

export function getTagColor(note: string): string {
    if (typeof note !== "string") {
        return "bg-stone-200 text-stone-700"; // fallback style
    }
    const n = note.toLowerCase();
    if (["jasmine", "rose", "floral", "orange blossom", "bergamot"].some((k) => n.includes(k)))                                         return "bg-purple-100 text-purple-700";
    if (["lemon", "citrus", "lime", "grapefruit", "orange zest"].some((k) => n.includes(k)))                                            return "bg-yellow-100 text-yellow-700";
    if (["blueberry", "raspberry", "strawberry", "red berry", "wild berry", "black currant", "stone fruit"].some((k) => n.includes(k))) return "bg-rose-100 text-rose-700";
    if (["peach", "tropical fruit", "red apple"].some((k) => n.includes(k)))                                                            return "bg-orange-100 text-orange-700";
    if (["caramel", "honey", "toffee", "brown sugar", "vanilla", "sweet cream"].some((k) => n.includes(k)))                             return "bg-amber-100 text-amber-700";
    if (["chocolate", "dark chocolate", "milk chocolate", "bittersweet chocolate"].some((k) => n.includes(k)))                          return "bg-yellow-900/10 text-amber-900";
    if (["walnut", "hazelnut", "almond", "macadamia", "nutty"].some((k) => n.includes(k)))                                              return "bg-orange-50 text-orange-800";
    if (["earthy", "cedar", "tobacco", "wine"].some((k) => n.includes(k)))                                                              return "bg-green-100 text-green-800";
    if (["spice", "cardamom", "subtle spice"].some((k) => n.includes(k)))                                                               return "bg-red-100 text-red-700";
    if (["black tea"].some((k) => n.includes(k)))                                                                                       return "bg-teal-100 text-teal-700";
    return "bg-stone-100 text-stone-600";
}

export const roastGradients: Record<string, string> = {
    "Light": "from-amber-100 to-yellow-200",
    "Medium-Light": "from-amber-200 to-amber-300",
    "Medium": "from-amber-400 to-amber-500",
    "Medium-Dark": "from-amber-600 to-amber-700",
    "Dark": "from-stone-700 to-stone-900",
};

export const roastTextColors: Record<string, string> = {
    "Light": "text-amber-700",
    "Medium-Light": "text-amber-800",
    "Medium": "text-amber-900",
    "Medium-Dark": "text-amber-100",
    "Dark": "text-stone-200",
};