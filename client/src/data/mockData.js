// Realistic data for Camellia Leaf Tea Shop
export const INITIAL_CATEGORIES = [
  {
    id: "green-tea",
    name: "Green Tea",
    description: "Fresh, grassy, and antioxidant-rich handpicked spring buds.",
    image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=600&q=80",
    itemCount: 14,
  },
  {
    id: "matcha",
    name: "Ceremonial Matcha",
    description: "Stone-ground shade-grown tencha from Uji, Kyoto.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    itemCount: 8,
  },
  {
    id: "black-tea",
    name: "Black Tea",
    description: "Robust, malty, and brisk single-estate harvests.",
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=600&q=80",
    itemCount: 12,
  },
  {
    id: "oolong-tea",
    name: "Oolong Tea",
    description: "Complex floral and honey notes, artfully semi-oxidized.",
    image: "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?auto=format&fit=crop&w=600&q=80",
    itemCount: 10,
  },
  {
    id: "white-tea",
    name: "White Tea",
    description: "Subtle, velvety downy silver buds dried under natural sunlight.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
    itemCount: 6,
  },
  {
    id: "herbal",
    name: "Herbal & Tisane",
    description: "Caffeine-free botanical blends of calming blossoms and herbs.",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80",
    itemCount: 11,
  },
  {
    id: "pu-erh",
    name: "Vintage Pu-erh",
    description: "Post-fermented aged cakes with deep earthy and woody resonance.",
    image: "https://images.unsplash.com/photo-1576092762791-dd9e2220abd1?auto=format&fit=crop&w=600&q=80",
    itemCount: 7,
  },
  {
    id: "chai-spiced",
    name: "Chai & Spiced",
    description: "Warming whole spices infused with bold orthodox leaf.",
    image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=600&q=80",
    itemCount: 9,
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: "tea-01",
    name: "Uji Ceremonial Grade Matcha",
    category: "matcha",
    price: 34.00,
    originalPrice: 42.00,
    rating: 4.9,
    reviewsCount: 128,
    stock: 42,
    tag: "Bestseller",
    featured: true,
    bestSeller: true,
    origin: "Uji, Kyoto, Japan",
    harvestSeason: "First Flush Spring 2024",
    caffeine: "Medium-High",
    description: "Stone-ground ceremonial grade matcha harvested from single-estate tea bushes in historic Uji. Shaded for 30 days prior to pluck, yielding rich umami, emerald vibrance, and zero astringency.",
    ingredients: "100% Pure Japanese Tencha Green Tea Leaves.",
    benefits: ["Rich in EGCG antioxidants and L-theanine", "Sustained calm mental focus without caffeine crash", "Boosts metabolism and immune vitality"],
    brewingGuide: {
      temperature: "80°C (175°F)",
      steepTime: "Whisk briskly for 45 seconds",
      dosage: "2 bamboo scoops (approx 2g) in 70ml water"
    },
    tastingNotes: ["Sweet umami", "Fresh young bamboo", "Silky cream finish"],
    images: [
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=900&q=80"
    ],
    reviews: [
      { id: "rev-1", author: "Emi Tanaka", rating: 5, date: "2024-05-12", title: "Pure perfection", comment: "The color is so vibrant electric green! Incredible natural sweetness with no bitterness at all.", status: "approved" },
      { id: "rev-2", author: "Julian V.", rating: 5, date: "2024-06-03", title: "Daily morning ritual", comment: "Froths up into a cloud of microfoam easily with a chasen. Far superior to supermarket brands.", status: "approved" }
    ]
  },
  {
    id: "tea-02",
    name: "Imperial Jasmine Dragon Pearls",
    category: "green-tea",
    price: 26.50,
    originalPrice: 31.00,
    rating: 4.8,
    reviewsCount: 94,
    stock: 65,
    tag: "Staff Pick",
    featured: true,
    bestSeller: true,
    origin: "Fujian Province, China",
    harvestSeason: "Spring Harvest",
    caffeine: "Medium",
    description: "Tender green tea buds hand-rolled into delicate pearls and scented seven consecutive nights with freshly bloomed night-blooming jasmine petals. Unfurls gracefully in your cup.",
    ingredients: "Green tea leaves naturally scented with fresh jasmine blossom.",
    benefits: ["Gentle digestive aid", "Promotes calm and stress relief", "High in polyphenols"],
    brewingGuide: {
      temperature: "85°C (185°F)",
      steepTime: "2 - 3 minutes",
      dosage: "5-7 pearls per cup (3g)"
    },
    tastingNotes: ["Intoxicating floral bouquet", "Honeyed melon", "Crisp dew finish"],
    images: [
      "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80"
    ],
    reviews: [
      { id: "rev-3", author: "Clara Bennett", rating: 5, date: "2024-04-18", title: "Breathtaking aroma", comment: "The smell fills the entire kitchen when you pour hot water. Watching the pearls unfurl is hypnotic.", status: "approved" }
    ]
  },
  {
    id: "tea-03",
    name: "Himalayan Silver Needle White Tea",
    category: "white-tea",
    price: 29.00,
    originalPrice: 35.00,
    rating: 4.9,
    reviewsCount: 67,
    stock: 28,
    tag: "Rare Reserve",
    featured: true,
    bestSeller: false,
    origin: "Darjeeling High Elevations, India",
    harvestSeason: "Early Spring First Flush",
    caffeine: "Low",
    description: "Consisting exclusively of intact downy white buds harvested within a 48-hour window before opening. Gently sun-wilted without bruising for the purest celestial infusion.",
    ingredients: "100% Unopened White Tea Spring Buds.",
    benefits: ["Highest level of untouched antioxidants", "Very gentle on sensitive stomachs", "Hydrating and soothing"],
    brewingGuide: {
      temperature: "75°C - 80°C (170°F)",
      steepTime: "4 - 5 minutes",
      dosage: "1 heaping tablespoon (2.5g)"
    },
    tastingNotes: ["Wild white peach", "Sweet clover honey", "Subtle cucumber water"],
    images: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?auto=format&fit=crop&w=900&q=80"
    ],
    reviews: [
      { id: "rev-4", author: "Marcus Thorne", rating: 5, date: "2024-06-20", title: "Delicate and ethereal", comment: "So gentle yet profound. Re-steeps 4-5 times beautifully.", status: "approved" }
    ]
  },
  {
    id: "tea-04",
    name: "Dong Ding Charcoal Roasted Oolong",
    category: "oolong-tea",
    price: 24.00,
    originalPrice: 28.00,
    rating: 4.7,
    reviewsCount: 81,
    stock: 50,
    tag: "Artisanal",
    featured: true,
    bestSeller: true,
    origin: "Nantou County, Taiwan",
    harvestSeason: "Winter Harvest",
    caffeine: "Medium",
    description: "Master-roasted over longan wood charcoal for 24 hours. Strikes an exquisite balance between caramelized nutty warmth, baked peach, and lingering mineral sweetness.",
    ingredients: "Traditional charcoal-baked semi-oxidized oolong leaf.",
    benefits: ["Aids lipid digestion after rich meals", "Warm grounding body sensation", "Rich in theaflavins"],
    brewingGuide: {
      temperature: "95°C (205°F)",
      steepTime: "45s for gongfu, 3m for western",
      dosage: "5g in 120ml gaiwan"
    },
    tastingNotes: ["Roasted chestnut", "Caramelized plum", "Honeyed woody warmth"],
    images: [
      "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80"
    ],
    reviews: []
  },
  {
    id: "tea-05",
    name: "Royal Golden Assam CTC & Orthodox",
    category: "black-tea",
    price: 18.50,
    originalPrice: 22.00,
    rating: 4.8,
    reviewsCount: 112,
    stock: 90,
    tag: "Breakfast Classic",
    featured: false,
    bestSeller: true,
    origin: "Brahmaputra River Valley, Assam",
    harvestSeason: "Second Flush Summer Harvest",
    caffeine: "High",
    description: "Deep copper liquor with generous golden leaf tips. Uncompromisingly bold, malty, and brisk. The definitive luxury morning cup that pairs gloriously with creamy milk.",
    ingredients: "100% Single-Estate Assam Orthodox Black Tea Leaf.",
    benefits: ["Invigorating natural energy boost", "Supports cardiovascular health", "Stimulates morning clarity"],
    brewingGuide: {
      temperature: "100°C (212°F)",
      steepTime: "3 - 4 minutes",
      dosage: "1 teaspoon (3g) per 250ml"
    },
    tastingNotes: ["Malty cocoa", "Ripe molasses", "Toasted brioche"],
    images: [
      "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=900&q=80"
    ],
    reviews: []
  },
  {
    id: "tea-06",
    name: "Wild Lavender Chamomile Blossom",
    category: "herbal",
    price: 19.50,
    originalPrice: 23.00,
    rating: 4.9,
    reviewsCount: 145,
    stock: 75,
    tag: "Caffeine-Free",
    featured: true,
    bestSeller: true,
    origin: "Provence & Nile River Delta",
    harvestSeason: "Summer Harvest",
    caffeine: "Zero (Caffeine-Free)",
    description: "Whole whole-head Egyptian chamomile florets blended with French high-altitude lavender buds, sweet lemon verbena, and organic spearmint. The ultimate evening slumber cup.",
    ingredients: "Chamomile flowers, French lavender, spearmint leaves, lemon verbena, blue cornflowers.",
    benefits: ["Induces peaceful restorative sleep", "Soothes evening tension and muscle tightness", "Anti-inflammatory botanical relief"],
    brewingGuide: {
      temperature: "100°C (212°F)",
      steepTime: "5 - 7 minutes",
      dosage: "1.5 tablespoons per cup"
    },
    tastingNotes: ["Crisp sweet apple", "Aromatic lavender breeze", "Gentle cooling mint"],
    images: [
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80"
    ],
    reviews: []
  },
  {
    id: "tea-07",
    name: "10-Year Aged Menghai Pu-erh Cake",
    category: "pu-erh",
    price: 48.00,
    originalPrice: 58.00,
    rating: 4.9,
    reviewsCount: 52,
    stock: 18,
    tag: "Collector's Item",
    featured: false,
    bestSeller: false,
    origin: "Menghai, Yunnan Province",
    harvestSeason: "Aged Vintage 2014",
    caffeine: "Medium",
    description: "Naturally post-fermented raw (sheng) pu-erh compressed into a 100g mini cake. Cellared under controlled mountain humidity to develop smooth camphor, forest loam, and dark cacao notes.",
    ingredients: "Fermented wild arbor tea leaves from centenary trees.",
    benefits: ["Rich in natural fermentation probiotics", "Celebrated in TCM for digestive balance", "Sustained smooth energy"],
    brewingGuide: {
      temperature: "100°C (212°F)",
      steepTime: "Rinse once, then 15s to 1min intervals",
      dosage: "5-7g chipped carefully from cake"
    },
    tastingNotes: ["Forest floor petrichor", "Aged oak and camphor", "Sweet dried dates finish"],
    images: [
      "https://images.unsplash.com/photo-1576092762791-dd9e2220abd1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?auto=format&fit=crop&w=900&q=80"
    ],
    reviews: []
  },
  {
    id: "tea-08",
    name: "Kashmiri Saffron Cardamom Chai",
    category: "chai-spiced",
    price: 22.00,
    originalPrice: 26.00,
    rating: 4.8,
    reviewsCount: 98,
    stock: 60,
    tag: "Warming Blend",
    featured: true,
    bestSeller: true,
    origin: "Kashmir Valley & Kerala, India",
    harvestSeason: "Autumn 2024",
    caffeine: "Medium-High",
    description: "An opulent royal spice chai featuring crushed green cardamom pods, cinnamon quills, crushed cloves, crushed ginger, black peppercorns, and precious crimson Kashmiri saffron threads.",
    ingredients: "Assam black tea, green cardamom, Kashmiri saffron, cinnamon, clove, crushed ginger root, star anise.",
    benefits: ["Warms peripheral circulation", "Stimulates digestion and gut motility", "Saffron mood enhancement"],
    brewingGuide: {
      temperature: "Simmer in 50/50 water & whole milk for 5m",
      steepTime: "Strain into cup and sweeten with raw honey",
      dosage: "2 teaspoons per mug"
    },
    tastingNotes: ["Velvety saffron aroma", "Warm sweet cinnamon", "Crushed peppery zest"],
    images: [
      "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=900&q=80"
    ],
    reviews: []
  }
];

export const INITIAL_COUPONS = [
  { code: "TEA10", discountPercent: 10, minSpend: 25, expires: "2026-12-31", usageCount: 42, active: true },
  { code: "MATCHA20", discountPercent: 20, minSpend: 50, expires: "2026-12-31", usageCount: 18, active: true },
  { code: "FREESHIP", discountPercent: 0, freeShipping: true, minSpend: 30, expires: "2026-12-31", usageCount: 89, active: true },
  { code: "WELCOME15", discountPercent: 15, minSpend: 20, expires: "2026-12-31", usageCount: 110, active: true }
];

export const INITIAL_ORDERS = [
  {
    id: "ORD-94281",
    userId: "cust-1",
    date: "2025-05-10",
    customerName: "Eleanor Vance",
    email: "eleanor.tea@example.com",
    status: "Delivered",
    paymentMethod: "Stripe (Card ending in 4242)",
    paymentStatus: "Paid",
    trackingNumber: "TRK-8819204US",
    carrier: "FedEx Express",
    items: [
      { id: "tea-01", name: "Uji Ceremonial Grade Matcha", price: 34.00, quantity: 1, image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=300&q=80" },
      { id: "tea-06", name: "Wild Lavender Chamomile Blossom", price: 19.50, quantity: 2, image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=300&q=80" }
    ],
    subtotal: 73.00,
    discount: 7.30,
    shippingFee: 0.00,
    tax: 4.60,
    total: 70.30,
    shippingAddress: {
      fullName: "Eleanor Vance",
      street: "742 Evergreen Botanical Way",
      city: "Portland",
      state: "OR",
      zip: "97201",
      country: "United States",
      phone: "+1 (503) 555-0194"
    },
    timeline: [
      { status: "Order Placed", date: "May 10, 09:30 AM", completed: true },
      { status: "Payment Confirmed", date: "May 10, 09:32 AM", completed: true },
      { status: "Artisan Packed", date: "May 10, 02:15 PM", completed: true },
      { status: "In Transit", date: "May 11, 08:00 AM", completed: true },
      { status: "Delivered", date: "May 12, 01:45 PM", completed: true }
    ]
  },
  {
    id: "ORD-94282",
    userId: "cust-1",
    date: "2025-05-14",
    customerName: "Eleanor Vance",
    email: "eleanor.tea@example.com",
    status: "In Transit",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending on Delivery",
    trackingNumber: "TRK-9903112US",
    carrier: "DHL Green Courier",
    items: [
      { id: "tea-02", name: "Imperial Jasmine Dragon Pearls", price: 26.50, quantity: 2, image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=300&q=80" },
      { id: "tea-08", name: "Kashmiri Saffron Cardamom Chai", price: 22.00, quantity: 1, image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=300&q=80" }
    ],
    subtotal: 75.00,
    discount: 0.00,
    shippingFee: 5.00,
    tax: 5.60,
    total: 85.60,
    shippingAddress: {
      fullName: "Eleanor Vance",
      street: "742 Evergreen Botanical Way",
      city: "Portland",
      state: "OR",
      zip: "97201",
      country: "United States",
      phone: "+1 (503) 555-0194"
    },
    timeline: [
      { status: "Order Placed", date: "May 14, 11:20 AM", completed: true },
      { status: "Payment Pending", date: "May 14, 11:20 AM", completed: true },
      { status: "Artisan Packed", date: "May 14, 04:00 PM", completed: true },
      { status: "In Transit", date: "May 15, 09:15 AM", completed: true },
      { status: "Delivered", date: "Expected Tomorrow", completed: false }
    ]
  }
];

export const INITIAL_USERS = [
  {
    id: "cust-1",
    name: "Eleanor Vance",
    email: "customer@teashop.com",
    role: "customer",
    joinedDate: "2024-01-15",
    phone: "+1 (503) 555-0194",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    status: "active",
    emailVerified: true,
    ordersCount: 4,
    totalSpent: 284.50,
    defaultAddressId: "addr-1",
    addresses: [
      {
        id: "addr-1",
        label: "Home Sanctuary",
        fullName: "Eleanor Vance",
        street: "742 Evergreen Botanical Way",
        city: "Portland",
        state: "OR",
        zip: "97201",
        country: "United States",
        phone: "+1 (503) 555-0194",
        isDefault: true
      },
      {
        id: "addr-2",
        label: "Design Studio",
        fullName: "Eleanor Vance",
        street: "120 Pearl District Blvd Suite 4B",
        city: "Portland",
        state: "OR",
        zip: "97209",
        country: "United States",
        phone: "+1 (503) 555-0194",
        isDefault: false
      }
    ]
  },
  {
    id: "admin-1",
    name: "Master Tea Sommelier (Admin)",
    email: "admin@teashop.com",
    role: "admin",
    joinedDate: "2023-11-01",
    phone: "+1 (415) 555-0822",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    status: "active",
    emailVerified: true,
    ordersCount: 0,
    totalSpent: 0
  }
];

export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Dr. Alistair Finch",
    role: "Sensory Chemist & Tea Scholar",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    quote: "The transparency of single-estate origins and harvest flush dates at Camellia Leaf is unmatched in modern commerce. The Uji matcha has the sweetest umami depth I've tasted outside Japan.",
    rating: 5,
    favorite: "Uji Ceremonial Grade Matcha"
  },
  {
    id: "t2",
    name: "Sophia Rossi",
    role: "Wellness Lifestyle Author",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    quote: "Every tin arrives sealed with nitrogen freshness and an informative brewing card specifying water temperature down to the degree. My evening chamomile rituals have transformed completely.",
    rating: 5,
    favorite: "Wild Lavender Chamomile Blossom"
  },
  {
    id: "t3",
    name: "Kenji Sato",
    role: "Ceramics Artist & Tea Host",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    quote: "The Charcoal Roasted Dong Ding withstands over eight re-steeps without collapsing. A rare standard of ethical sourcing and packaging aesthetics.",
    rating: 5,
    favorite: "Dong Ding Charcoal Roasted Oolong"
  }
];

export const TEAM_MEMBERS = [
  {
    name: "Kenzo Moriyama",
    title: "Founder & Chief Tea Buyer",
    bio: "Spent two decades trekking the misty ridges of Yunnan, Shizuoka, and Darjeeling establishing direct-trade farmer relationships.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Aurelia Chen",
    title: "Lead Master Herbalist",
    bio: "Botanical doctor specializing in traditional infusions, adaptogenic roots, and aromatic whole-flower blending.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Devon Thorne",
    title: "Quality Control & Sommelier",
    bio: "Licensed Q-Grader and cupping judge evaluating leaf moisture, aroma curves, and seasonal oxidation levels.",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=500&q=80"
  }
];
