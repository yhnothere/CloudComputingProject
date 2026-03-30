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

export const beans: CoffeeBean[] = [
    {
        bean_id: "ethiopia_yirgacheffe_01",
        name: "Ethiopian Yirgacheffe",
        price: 18.99,
        roast_level: "Light",
        origin_region: "Africa",
        origin_country: "Ethiopia",
        tasting_notes: ["Jasmine", "Lemon", "Blueberry"],
        acidity_score: 8, bitterness_score: 2, body_score: 4,
        description: "A luminous cup bursting with floral aromatics and vibrant citrus brightness, finishing with a delicate blueberry sweetness.",
        history: "Yirgacheffe, nestled in the Gedeo Zone of southern Ethiopia, is the heartland of arabica coffee. The region's ancient wild coffee forests and high-altitude farms produce what many consider the world's most complex and elegant coffees. The washed processing method, popularised here, preserves remarkable clarity of flavour.",
        altitude: "1,700–2,200m", process: "Washed", weight_g: 250,
    },
    {
        bean_id: "colombia_huila_01",
        name: "Colombian Huila",
        price: 16.99,
        roast_level: "Medium",
        origin_region: "South America",
        origin_country: "Colombia",
        tasting_notes: ["Caramel", "Red Apple", "Hazelnut"],
        acidity_score: 6, bitterness_score: 3, body_score: 6,
        description: "A beautifully balanced cup with warm caramel sweetness, crisp apple acidity, and a smooth, nutty finish.",
        history: "The Huila department in southwestern Colombia is one of the country's most celebrated coffee-growing regions. Flanked by the Andes, small-scale farmers cultivate coffee on steep hillsides where altitude and fertile volcanic soil produce consistently high-scoring beans. Colombia's second-largest department by coffee output, Huila earns specialty premiums year after year.",
        altitude: "1,500–2,000m", process: "Washed", weight_g: 250,
    },
    {
        bean_id: "guatemala_antigua_01",
        name: "Guatemalan Antigua",
        price: 15.99,
        roast_level: "Medium-Dark",
        origin_region: "Central America",
        origin_country: "Guatemala",
        tasting_notes: ["Dark Chocolate", "Spice", "Brown Sugar"],
        acidity_score: 5, bitterness_score: 6, body_score: 7,
        description: "A full-bodied, robust coffee with rich dark chocolate depth, a subtle spice note, and a lingering brown sugar sweetness.",
        history: "Antigua sits in a highland valley surrounded by three volcanoes — Agua, Fuego, and Acatenango. Volcanic ash soil, consistent temperatures, and cool nights have produced award-winning coffees for centuries. Antigua beans are renowned globally for their full body and complex smoky sweetness, and the region holds one of Guatemala's strictest geographic certifications.",
        altitude: "1,500–1,700m", process: "Washed", weight_g: 250,
    },
    {
        bean_id: "brazil_santos_01",
        name: "Brazilian Santos",
        price: 13.99,
        roast_level: "Medium",
        origin_region: "South America",
        origin_country: "Brazil",
        tasting_notes: ["Chocolate", "Walnut", "Honey"],
        acidity_score: 4, bitterness_score: 4, body_score: 7,
        description: "A classic, approachable cup with smooth chocolate notes, gentle nuttiness, and a honeyed sweetness in the finish.",
        history: "Brazil is the world's largest coffee producer, and Santos — the primary port of export — lends its name to some of Brazil's most iconic beans. Grown on vast plateaus at lower altitudes, Brazilian coffees are prized for their low acidity, creamy body, and consistent reliability, making them the backbone of many espresso blends worldwide.",
        altitude: "800–1,200m", process: "Natural", weight_g: 250,
    },
    {
        bean_id: "jamaica_blue_mountain_01",
        name: "Jamaican Blue Mountain",
        price: 49.99,
        roast_level: "Medium",
        origin_region: "Caribbean",
        origin_country: "Jamaica",
        tasting_notes: ["Sweet Cream", "Citrus Zest", "Nutty"],
        acidity_score: 5, bitterness_score: 2, body_score: 6,
        description: "One of the world's rarest and most prized coffees — silky, mild, and supremely balanced with virtually no bitterness.",
        history: "Grown in the misty Blue Mountains of Jamaica at elevations up to 2,256m, this legendary coffee has been prized since the 18th century. Strict Jamaican government regulations control its production and certification, ensuring only the finest beans earn the Blue Mountain designation. Japan imports the majority of the crop, where it remains a mark of prestige.",
        altitude: "1,200–2,256m", process: "Washed", weight_g: 250,
    },
    {
        bean_id: "kenya_aa_01",
        name: "Kenyan AA",
        price: 19.99,
        roast_level: "Medium-Light",
        origin_region: "Africa",
        origin_country: "Kenya",
        tasting_notes: ["Black Currant", "Grapefruit", "Tomato"],
        acidity_score: 9, bitterness_score: 3, body_score: 5,
        description: "An electrifying cup with wine-like acidity, bold black currant fruit, and a distinctive savoury tomato finish.",
        history: "Kenya's AA designation refers to the largest screen size of beans — dense berries that deliver intense, complex flavours. Grown on rich red volcanic soils of the Central Highlands, Kenyan coffees undergo a unique double-washed process at cooperative wet mills, concentrating flavour and producing their signature winey brightness.",
        altitude: "1,400–2,000m", process: "Double-Washed", weight_g: 250,
    },
    {
        bean_id: "panama_gesha_01",
        name: "Panama Gesha",
        price: 54.99,
        roast_level: "Light",
        origin_region: "Central America",
        origin_country: "Panama",
        tasting_notes: ["Bergamot", "Peach", "Jasmine"],
        acidity_score: 8, bitterness_score: 1, body_score: 3,
        description: "The world's most celebrated varietal — impossibly delicate and tea-like, with an aromatic complexity unlike any other coffee.",
        history: "The Gesha varietal originated in the Gori Gesha forest of Ethiopia and arrived in Panama's Boquete region in the 1960s. It went largely unnoticed until 2004, when Hacienda La Esmeralda caused a sensation at the Best of Panama competition. Today, Panama Gesha commands auction prices rivalling fine wine, revered for its extraordinary floral complexity.",
        altitude: "1,600–2,000m", process: "Washed", weight_g: 100,
    },
    {
        bean_id: "costa_rica_tarrazu_01",
        name: "Costa Rican Tarrazú",
        price: 16.49,
        roast_level: "Medium",
        origin_region: "Central America",
        origin_country: "Costa Rica",
        tasting_notes: ["Honey", "Orange", "Milk Chocolate"],
        acidity_score: 6, bitterness_score: 4, body_score: 6,
        description: "A well-rounded, approachable cup with natural honey sweetness, bright citrus acidity, and a smooth milk chocolate body.",
        history: "The Tarrazú region south of San José is Costa Rica's most acclaimed coffee-growing area. Strict environmental laws spurred innovation in honey and natural processing here. The result is a clean, sweet, and vibrant cup that showcases the region's ideal altitude and rich volcanic soils, consistently ranking among Central America's finest.",
        altitude: "1,200–1,900m", process: "Honey", weight_g: 250,
    },
    {
        bean_id: "sumatra_mandheling_01",
        name: "Sumatra Mandheling",
        price: 15.49,
        roast_level: "Dark",
        origin_region: "Asia Pacific",
        origin_country: "Indonesia",
        tasting_notes: ["Earthy", "Cedar", "Dark Chocolate"],
        acidity_score: 2, bitterness_score: 7, body_score: 9,
        description: "A bold, deeply satisfying cup with a syrupy body, low acidity, and complex earthy, woody notes that linger long.",
        history: "Mandheling refers to coffees grown in the highlands of North Sumatra, named after the Mandailing people. Indonesia's unique Giling Basah (wet-hulling) process — where beans are hulled at high moisture content — creates Sumatra's distinctive earthy, full-bodied character. These coffees have been a global favourite for over a century.",
        altitude: "900–1,500m", process: "Wet-Hulled (Giling Basah)", weight_g: 250,
    },
    {
        bean_id: "yemen_mocha_01",
        name: "Yemen Mocha Mattari",
        price: 32.99,
        roast_level: "Medium",
        origin_region: "Middle East",
        origin_country: "Yemen",
        tasting_notes: ["Wine", "Wild Berry", "Cardamom"],
        acidity_score: 6, bitterness_score: 5, body_score: 6,
        description: "A wild, ancient cup — complex and characterful, with a wine-like depth, exotic spice, and a rustic, untamed character.",
        history: "Yemen is the original home of cultivated coffee, and the port of Mocha gave its name to the world's entire coffee trade centuries ago. Yemeni farmers still grow heirloom varieties on ancient terraced hillsides using methods unchanged for 500 years. The dry climate and natural sun-drying on rooftops produce a uniquely wine-forward cup unlike anything else.",
        altitude: "1,500–2,200m", process: "Natural (Sun-Dried)", weight_g: 250,
    },
    {
        bean_id: "hawaii_kona_01",
        name: "Hawaiian Kona Extra Fancy",
        price: 39.99,
        roast_level: "Medium",
        origin_region: "Pacific",
        origin_country: "USA (Hawaii)",
        tasting_notes: ["Macadamia", "Honey", "Brown Sugar"],
        acidity_score: 5, bitterness_score: 3, body_score: 6,
        description: "A smooth, rich, and mellow coffee with gentle macadamia nuttiness, warm honey sweetness, and a clean, elegant finish.",
        history: "Kona coffee is grown on the volcanic slopes of Mauna Loa on Hawaii's Big Island. The unique microclimate — sunny mornings, cloudy afternoons, and mild evenings — creates ideal conditions for slow cherry ripening. 'Extra Fancy' is the highest grade designation, reserved for the largest, densest beans, protected by strict Hawaiian state labelling laws.",
        altitude: "600–900m", process: "Washed", weight_g: 250,
    },
    {
        bean_id: "mexico_chiapas_01",
        name: "Mexican Chiapas",
        price: 14.49,
        roast_level: "Medium",
        origin_region: "Central America",
        origin_country: "Mexico",
        tasting_notes: ["Almond", "Caramel", "Orange Zest"],
        acidity_score: 5, bitterness_score: 4, body_score: 5,
        description: "A gentle, approachable cup with pleasant almond nuttiness, soft caramel sweetness, and a bright citrus lift.",
        history: "Chiapas, Mexico's southernmost state bordering Guatemala, produces the country's finest specialty coffees. Grown by indigenous smallholders in the Sierra Madre highlands, many farms are organic and shade-grown under a diverse forest canopy. The high altitude and cool mountain climate produce more complexity and brightness than most other Mexican origins.",
        altitude: "1,000–1,700m", process: "Washed", weight_g: 250,
    },
    {
        bean_id: "peru_cajamarca_01",
        name: "Peruvian Cajamarca",
        price: 15.99,
        roast_level: "Medium",
        origin_region: "South America",
        origin_country: "Peru",
        tasting_notes: ["Chocolate", "Vanilla", "Tropical Fruit"],
        acidity_score: 5, bitterness_score: 4, body_score: 6,
        description: "A smooth, sweet cup with comforting chocolate depth, creamy vanilla undertones, and a lively tropical fruit brightness.",
        history: "Cajamarca, in Peru's northern highlands, has emerged as one of South America's most exciting specialty origins. The region's ancient Inca terracing systems and cloud-forest microclimates create exceptional growing conditions. Most coffee here is grown organically by small cooperatives of indigenous farmers who have earned Fair Trade certification.",
        altitude: "1,400–2,000m", process: "Washed", weight_g: 250,
    },
    {
        bean_id: "honduras_copan_01",
        name: "Honduras Copán",
        price: 14.99,
        roast_level: "Medium",
        origin_region: "Central America",
        origin_country: "Honduras",
        tasting_notes: ["Peach", "Toffee", "Hazelnut"],
        acidity_score: 6, bitterness_score: 3, body_score: 6,
        description: "A sweet and fruit-forward cup with juicy peach character, buttery toffee sweetness, and a warm hazelnut finish.",
        history: "Honduras has rapidly become Central America's largest coffee producer, with the Copán region producing some of its most celebrated lots. Named after the ancient Maya city within its borders, Copán's combination of altitude, volcanic soil, and reliable rainfall creates a distinctive microclimate. A new generation of producers is elevating Honduras into specialty coffee's elite tier.",
        altitude: "1,100–1,500m", process: "Washed", weight_g: 250,
    },
    {
        bean_id: "rwanda_bourbon_01",
        name: "Rwanda Bourbon",
        price: 17.99,
        roast_level: "Medium-Light",
        origin_region: "Africa",
        origin_country: "Rwanda",
        tasting_notes: ["Raspberry", "Orange Blossom", "Honey"],
        acidity_score: 7, bitterness_score: 2, body_score: 4,
        description: "A delicate and luminous cup with vibrant raspberry brightness, perfumed floral notes, and a clean honey sweetness.",
        history: "Rwanda's coffee industry was rebuilt from near-zero following the 1994 genocide, and today stands as one of Africa's great success stories. The country's thousand hills (mille collines) provide exceptional altitude and drainage for Bourbon varietal coffee. Washing stations here are technically advanced, producing coffees of extraordinary clarity and precision.",
        altitude: "1,700–2,000m", process: "Fully Washed", weight_g: 250,
    },
    {
        bean_id: "burundi_kayanza_01",
        name: "Burundi Kayanza",
        price: 17.49,
        roast_level: "Light",
        origin_region: "Africa",
        origin_country: "Burundi",
        tasting_notes: ["Black Tea", "Strawberry", "Lime"],
        acidity_score: 8, bitterness_score: 2, body_score: 3,
        description: "A bright, effervescent cup with black tea elegance, fresh strawberry sweetness, and a zesty citrus finish.",
        history: "Burundi's Kayanza province sits on the same great rift valley highlands that produce some of Africa's finest coffees. Growing above 1,800m, Kayanza's Bourbon and Jackson varietals develop slowly, concentrating sugars for exceptional sweetness and complexity. Despite being landlocked and small, Burundi is producing some of specialty coffee's most exciting microlots.",
        altitude: "1,800–2,000m", process: "Fully Washed", weight_g: 250,
    },
    {
        bean_id: "nicaragua_jinotega_01",
        name: "Nicaraguan Jinotega",
        price: 14.49,
        roast_level: "Medium",
        origin_region: "Central America",
        origin_country: "Nicaragua",
        tasting_notes: ["Caramel", "Red Berry", "Subtle Spice"],
        acidity_score: 5, bitterness_score: 4, body_score: 6,
        description: "A warm, inviting cup with rich caramel sweetness, lively red berry fruit, and a gentle spice note in the background.",
        history: "Jinotega is Nicaragua's most important coffee-growing department, accounting for a large share of the country's specialty output. The region's cloud forests provide natural shade, and altitude combined with fertile volcanic soil produces coffees of surprising depth and sweetness. Many farms in Jinotega are women-led cooperatives that have won international recognition.",
        altitude: "1,100–1,700m", process: "Washed", weight_g: 250,
    },
    {
        bean_id: "png_sigri_01",
        name: "Papua New Guinea Sigri",
        price: 16.49,
        roast_level: "Medium",
        origin_region: "Asia Pacific",
        origin_country: "Papua New Guinea",
        tasting_notes: ["Earthy", "Tropical Fruit", "Brown Sugar"],
        acidity_score: 4, bitterness_score: 5, body_score: 7,
        description: "A rich, rustic cup with a full body, lush tropical fruit character, and a sweet brown sugar depth.",
        history: "Papua New Guinea's Sigri Estate in the Waghi Valley of the Western Highlands is one of the Pacific's most respected coffee producers. Coffee was introduced to PNG in the 1920s and Sigri has been farming it since the 1950s. The estate's unique combination of altitude, generous rainfall, and volcanic soil produces a coffee with both tropical character and earthy depth.",
        altitude: "1,500–1,700m", process: "Washed", weight_g: 250,
    },
    {
        bean_id: "india_monsoon_malabar_01",
        name: "Indian Monsoon Malabar",
        price: 15.49,
        roast_level: "Dark",
        origin_region: "Asia Pacific",
        origin_country: "India",
        tasting_notes: ["Earthy", "Tobacco", "Bittersweet Chocolate"],
        acidity_score: 2, bitterness_score: 7, body_score: 8,
        description: "A bold, brooding, low-acid cup with a powerful earthy depth, tobacco warmth, and a bittersweet chocolate finish.",
        history: "Monsoon Malabar is one of the world's most unusual coffees, produced by a centuries-old accident of history. When green coffee was shipped from India's Malabar Coast to Europe in wooden sailing vessels, the months-long journey through monsoon seas swelled the beans and stripped their acidity. Today, this effect is deliberately recreated by exposing harvested beans to monsoon winds on the Malabar coast for 12–16 weeks.",
        altitude: "1,000–1,500m", process: "Monsooned", weight_g: 250,
    },
    {
        bean_id: "bolivia_caranavi_01",
        name: "Bolivian Caranavi",
        price: 18.49,
        roast_level: "Medium-Light",
        origin_region: "South America",
        origin_country: "Bolivia",
        tasting_notes: ["Vanilla", "Stone Fruit", "Floral"],
        acidity_score: 7, bitterness_score: 2, body_score: 4,
        description: "A rare and graceful cup with creamy vanilla sweetness, delicate stone fruit, and a gentle floral lift.",
        history: "Bolivia produces tiny amounts of specialty coffee relative to its neighbours, making Caranavi beans genuinely rare. Grown in the subtropical Yungas region east of the Andes, Bolivian coffee benefits from dramatic elevation changes and diverse microclimates. The country's remoteness means only the most dedicated roasters can source these exceptional, expressive beans.",
        altitude: "1,200–2,000m", process: "Washed", weight_g: 250,
    },
];

export function getBeanById(id: string): CoffeeBean | undefined {
    return beans.find((b) => b.bean_id === id);
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