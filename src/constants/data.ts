import { Product, Category, Review, Coupon } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Spatial Audio & Sound',
    slug: 'audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    itemCount: 42,
    iconName: 'Headphones',
    description: 'Immersive noise-cancelling acoustic studio gear & earware.'
  },
  {
    id: 'cat-2',
    name: 'Cyber Wearables & Chrono',
    slug: 'wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    itemCount: 38,
    iconName: 'Watch',
    description: 'Sapphire glass smart chronographs with biomechanics telemetry.'
  },
  {
    id: 'cat-3',
    name: 'Futuristic Footwear',
    slug: 'footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    itemCount: 29,
    iconName: 'Footprints',
    description: 'Kinetic dampening carbon-plate sneakers engineered for motion.'
  },
  {
    id: 'cat-4',
    name: 'Spatial Workstations',
    slug: 'workstations',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    itemCount: 19,
    iconName: 'Laptop',
    description: 'Pro silicon computers, mechanical decks, and curved displays.'
  },
  {
    id: 'cat-5',
    name: 'Optics & Holographic',
    slug: 'optics',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
    itemCount: 24,
    iconName: 'Eye',
    description: 'AR smart eyewear and polarized aerodynamic visual frames.'
  }
];

export const BRANDS = ['Aura Acoustics', 'Vortex Dynamics', 'Quantum Kinetic', 'Solis Tech', 'Nova Labs', 'Apex Horizon'];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Aura Horizon Spatial Pro X Headphones',
    slug: 'aura-horizon-spatial-pro-x',
    brand: 'Aura Acoustics',
    category: 'Spatial Audio & Sound',
    price: 349,
    originalPrice: 449,
    discount: 22,
    rating: 4.9,
    reviewCount: 384,
    stock: 18,
    isFeatured: true,
    isBestSeller: true,
    isTrending: true,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1000&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1000&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1000&q=80'
    ],
    description: 'Crafted with titanium drivers, magnetic levitation cushions, and ultra-wide spatial audio soundstage. Delivers up to 60 hours of pristine lossless acoustic fidelity with hybrid ANC.',
    features: [
      '45mm Custom Graphene Acoustic Drivers',
      'True Spatial 3D Audio Head-Tracking',
      'Adaptive Hybrid Active Noise Canceling (-42dB)',
      '60-hour Battery with HyperCharge (10 min = 6 hrs)',
      'Multipoint Bluetooth 5.4 + Lossless 24-bit/96kHz USB-C'
    ],
    specifications: {
      'Driver Size': '45mm Graphene Matrix',
      'Frequency Response': '5Hz - 48,000Hz',
      'Impedance': '32 Ohm',
      'Weight': '265g',
      'Bluetooth Codecs': 'LDAC, aptX Adaptive, AAC, SBC',
      'Warranty': '2 Years Comprehensive'
    },
    colors: [
      { name: 'Obsidian Matte', hex: '#111827', imageIndex: 0 },
      { name: 'Titanium Silver', hex: '#94a3b8', imageIndex: 1 },
      { name: 'Desert Sand', hex: '#d97706', imageIndex: 2 }
    ],
    tags: ['wireless', 'spatial-audio', 'noise-cancelling', 'audiophile', 'bestseller'],
    model3DType: 'headphone'
  },
  {
    id: 'prod-2',
    name: 'Chronos Quantum Kinetic 3D Smartwatch',
    slug: 'chronos-quantum-kinetic-smartwatch',
    brand: 'Quantum Kinetic',
    category: 'Cyber Wearables & Chrono',
    price: 429,
    originalPrice: 529,
    discount: 19,
    rating: 4.8,
    reviewCount: 247,
    stock: 22,
    isFeatured: true,
    isBestSeller: true,
    isTrending: true,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=1000&q=80',
      'https://images.unsplash.com/photo-1579586337278-3fac04996924?w=1000&q=80',
      'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=1000&q=80'
    ],
    description: 'Forged in aerospace grade Grade-5 Titanium with a micro-curved sapphire crystal AMOLED display. Features dual-frequency GPS, biometric health tracking, ECG, and 14-day battery endurance.',
    features: [
      '1.5” LTPO Micro-Curved Sapphire AMOLED Display',
      'ECG + Continuous PPG SpO2 & VO2 Max Sensor',
      'Dual-Band L1+L5 Multichannel GPS Precision',
      '100m (10 ATM) Water & Titanium Submersible Resistance',
      'Solar-Boost Kinetic Energy Harvesting Circuit'
    ],
    specifications: {
      'Case Material': 'Grade 5 Aerospace Titanium',
      'Display': '1.5" AMOLED, 480x480, 2000 nits',
      'Battery Life': '14 Days Typical (48 hrs GPS)',
      'Water Rating': '10 ATM (100 meters)',
      'Sensors': 'Optical PPG, ECG, Barometer, Gyro, Compass',
      'OS Compatibility': 'iOS & Android'
    },
    colors: [
      { name: 'Carbon Black', hex: '#0f172a', imageIndex: 0 },
      { name: 'Brushed Platinum', hex: '#cbd5e1', imageIndex: 1 }
    ],
    sizes: ['42mm', '46mm'],
    tags: ['smartwatch', 'titanium', 'fitness', 'ecg', 'gps'],
    model3DType: 'watch'
  },
  {
    id: 'prod-3',
    name: 'Vortex Phantom Kinetic Runner Carbon Sneaker',
    slug: 'vortex-phantom-kinetic-runner',
    brand: 'Vortex Dynamics',
    category: 'Futuristic Footwear',
    price: 189,
    originalPrice: 249,
    discount: 24,
    rating: 4.7,
    reviewCount: 192,
    stock: 14,
    isFeatured: true,
    isTrending: true,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 18).toISOString(),
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&q=80',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=1000&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1000&q=80',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=1000&q=80'
    ],
    description: 'Engineered with curved dual carbon-fiber propulsion plates and supercritical nitrogen-infused foam. Gives 87% energy return per footstrike with featherweight breathability.',
    features: [
      'Dual Dynamic Carbon Fiber Spring Plate',
      'Supercritical Nitrogen Infused Float Foam',
      '3D Seamless Monofilament Breathable Knit Upper',
      'Continental Wet-Traction Grip Outsole',
      'Ortholite 3D Anatomical Arch Insoles'
    ],
    specifications: {
      'Heel-to-Toe Drop': '6mm (38mm heel / 32mm forefoot)',
      'Weight': '195g (Size 9)',
      'Midsole Tech': 'Nitrogen NitroPulse + Carbon Lever',
      'Closure': 'Quick-Lace Tensile Cable System'
    },
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    colors: [
      { name: 'Crimson Surge', hex: '#ef4444', imageIndex: 0 },
      { name: 'Volt Cyber', hex: '#84cc16', imageIndex: 1 },
      { name: 'Stealth Shadow', hex: '#18181b', imageIndex: 2 }
    ],
    tags: ['sneakers', 'running', 'carbon-plate', 'footwear', 'athletic'],
    model3DType: 'sneaker'
  },
  {
    id: 'prod-4',
    name: 'Nova Pro Liquid Matrix Spatial Laptop 16"',
    slug: 'nova-pro-liquid-matrix-laptop',
    brand: 'Nova Labs',
    category: 'Spatial Workstations',
    price: 1999,
    originalPrice: 2399,
    discount: 16,
    rating: 4.9,
    reviewCount: 118,
    stock: 9,
    isFeatured: true,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1000&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1000&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=1000&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=1000&q=80'
    ],
    description: 'Precision milled unibody anodized aluminum. Equipped with 16-Core Neural Engine, 120Hz Mini-LED Liquid Retina display with 1600 nits peak HDR, and vapor chamber cooling.',
    features: [
      '16.2" Mini-LED 3456x2234 120Hz ProMotion Display',
      'Liquid Metal Vapor Cooling Chamber Matrix',
      'Studio Quality 6-Speaker Array with Force-Cancelling Woofers',
      'Up to 22 Hours Real-World Battery Longevity',
      'MagSafe Quick Detach Power + 3x Thunderbolt 5 Ports'
    ],
    specifications: {
      'Processor': 'Nova X1 Ultra (16-Core CPU, 40-Core GPU)',
      'Memory': '32GB Unified LPDDR5X (up to 800GB/s)',
      'Storage': '1TB NVMe PCIe 5.0 SSD (7,500 MB/s)',
      'Display': '16.2" Liquid Retina XDR, 1600 nits peak',
      'Weight': '2.14 kg',
      'Operating System': 'Nova OS / Unix Architecture'
    },
    colors: [
      { name: 'Space Gray', hex: '#374151', imageIndex: 0 },
      { name: 'Silver Lunar', hex: '#e2e8f0', imageIndex: 1 }
    ],
    tags: ['workstation', 'laptop', 'mini-led', 'creator', 'premium'],
    model3DType: 'laptop'
  },
  {
    id: 'prod-5',
    name: 'Solis Vision AR Spatial Prism Smart Glasses',
    slug: 'solis-vision-ar-spatial-glasses',
    brand: 'Solis Tech',
    category: 'Optics & Holographic',
    price: 499,
    originalPrice: 599,
    discount: 17,
    rating: 4.6,
    reviewCount: 94,
    stock: 15,
    isTrending: true,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1000&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1000&q=80',
      'https://images.unsplash.com/photo-1577803645773-f96470509666?w=1000&q=80',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=1000&q=80'
    ],
    description: 'Dual micro-OLED holographic prism projection delivers an equivalent 140-inch floating virtual screen. Directional stereo sound in temples keeps audio crystal clear yet private.',
    features: [
      'Dual Micro-OLED 1080p FHD Per-Eye Display',
      'Directional Acoustic Whispering Temple Drivers',
      'Touch Gesture & Voice Command Interface',
      'Electrochromic Tinting Auto-Dimmable Lenses',
      'Weighs only 72 grams for all-day ergonomic comfort'
    ],
    specifications: {
      'FOV': '46-Degree Virtual Field of View',
      'Display': 'Dual Micro-OLED, 1920x1080 per eye',
      'Connectivity': 'DisplayPort over USB-C & Wi-Fi 6',
      'Battery': 'Integrated 4 Hours (30 hrs with Smart Case)',
      'Weight': '72 grams'
    },
    tags: ['ar', 'smartglasses', 'holographic', 'wearables', 'tech'],
    model3DType: 'gadget'
  },
  {
    id: 'prod-6',
    name: 'Aura Studio Dome 360 Spatial Hi-Fi Speaker',
    slug: 'aura-studio-dome-360-speaker',
    brand: 'Aura Acoustics',
    category: 'Spatial Audio & Sound',
    price: 279,
    originalPrice: 349,
    discount: 20,
    rating: 4.8,
    reviewCount: 165,
    stock: 24,
    isBestSeller: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1000&q=80',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1000&q=80',
      'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=1000&q=80'
    ],
    description: 'Harmonically tuned transparent acoustic glass dome featuring pulsating ambient light synced to soundwaves. 360-degree omnidirectional woofer fills any space with deep bass.',
    features: [
      'Acoustic Waveguide 360-Degree Sound Distribution',
      'Down-firing 130mm Subwoofer with Dual Passive Radiators',
      'Ambient Dynamic Luminescence Ring Visualizer',
      'AirPlay 2, Spotify Connect, and Bluetooth 5.3',
      'Room Calibration Audio Acoustic Sensor'
    ],
    specifications: {
      'Output Power': '130W RMS Continuous',
      'Frequency Response': '38Hz - 22,000Hz',
      'Dimensions': '210mm x 210mm x 280mm',
      'Weight': '3.2 kg'
    },
    tags: ['speaker', 'home-audio', 'hifi', 'spatial', 'design'],
    model3DType: 'gadget'
  },
  {
    id: 'prod-7',
    name: 'Apex Precision Cyber Drone 4K Gimbal',
    slug: 'apex-precision-cyber-drone',
    brand: 'Apex Horizon',
    category: 'Optics & Holographic',
    price: 899,
    originalPrice: 1099,
    discount: 18,
    rating: 4.9,
    reviewCount: 88,
    stock: 11,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1000&q=80',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1000&q=80',
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1000&q=80'
    ],
    description: 'Pocket-folding tri-axis stabilized mechanical gimbal with 1-inch CMOS sensor. Captures cinematic 4K 120fps video and boasts 360-degree omnidirectional LiDAR obstacle avoidance.',
    features: [
      '1-inch 50MP Sony Sensor with 4K/120fps HDR',
      '3-Axis Mechanical Stabilization Gimbal',
      '360-Degree Omnidirectional LiDAR & Infrared Avoidance',
      '42-Minute Extended Flight Time per Intelligent Battery',
      '15km Ultra-Low Latency OcuSync 4.0 Transmission'
    ],
    specifications: {
      'Takeoff Weight': '249 grams (Sub-250g Regulation exempt)',
      'Max Speed': '21 m/s (Sport Mode)',
      'Max Wind Resistance': '12 m/s (Scale 6)',
      'Internal Storage': '64GB High-Speed UFS'
    },
    tags: ['drone', 'camera', '4k', 'photography', 'gimbal'],
    model3DType: 'gadget'
  },
  {
    id: 'prod-8',
    name: 'Quantum HyperDeck Magnetic Mechanical Keyboard',
    slug: 'quantum-hyperdeck-keyboard',
    brand: 'Quantum Kinetic',
    category: 'Spatial Workstations',
    price: 219,
    originalPrice: 279,
    discount: 21,
    rating: 4.9,
    reviewCount: 312,
    stock: 20,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1000&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=1000&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=1000&q=80'
    ],
    description: 'Custom hall-effect magnetic switches with 0.1mm to 4.0mm adjustable rapid trigger actuation. CNC milled 6063 aerospace aluminum case with polycarb sound dampening sheets.',
    features: [
      'Hall Effect Magnetic Switches with 0.1mm Rapid Trigger',
      '8000Hz Ultra-Polling Rate (<0.125ms latency)',
      'Solid CNC Milled Anodized Aluminum Chassis',
      'Gasket Mount with 5-Layer Acoustic Dampening',
      'Per-Key North-Facing RGB + OLED HUD Screen'
    ],
    specifications: {
      'Layout': '75% Compact (82 Keys)',
      'Connectivity': '2.4GHz Wireless, Bluetooth 5.2, Type-C',
      'Battery': '8000mAh (Up to 300 Hours RGB off)',
      'Weight': '1.8 kg Solid Build'
    },
    tags: ['keyboard', 'gaming', 'mechanical', 'hall-effect', 'setup'],
    model3DType: 'gadget'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    userName: 'Marcus Vance',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80',
    rating: 5,
    title: 'The soundstage genuinely blew my mind',
    comment: 'The 3D spatial separation feels as if the orchestra is surrounding you in a live hall. Noise cancellation blocks flight engine hum completely. Build quality is top-tier.',
    date: '3 days ago',
    verifiedPurchase: true,
    likes: 42,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80'
    ]
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    userName: 'Elena Rostova',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
    rating: 5,
    title: 'Super comfortable for 8+ hour editing sessions',
    comment: 'Magnetic ear cushions are like clouds. No clamping fatigue whatsoever. Tested on Mac and PC simultaneously via multipoint bluetooth without a hitch.',
    date: '1 week ago',
    verifiedPurchase: true,
    likes: 19
  },
  {
    id: 'rev-3',
    productId: 'prod-2',
    userName: 'David Chen',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
    rating: 5,
    title: 'Titanium chassis is scratch-proof and looks sleek',
    comment: 'Battery lasted me a full 12 days with continuous heart monitoring and daily workouts. The sapphire glass still looks factory new.',
    date: '2 weeks ago',
    verifiedPurchase: true,
    likes: 31
  }
];

export const COUPONS: Coupon[] = [
  {
    code: 'VORTEX20',
    discountPercentage: 20,
    maxDiscount: 150,
    minOrderValue: 100,
    description: '20% off orders over $100 (Max $150 save)',
    validUntil: '2026-12-31'
  },
  {
    code: 'CYBERSAVE',
    discountPercentage: 15,
    maxDiscount: 75,
    minOrderValue: 50,
    description: '15% instant discount across all categories',
    validUntil: '2026-12-31'
  },
  {
    code: 'FIRST10',
    discountPercentage: 10,
    minOrderValue: 30,
    description: '10% welcome coupon for new shoppers',
    validUntil: '2026-12-31'
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    quote: 'The 3D product view and inspect feature made it effortless to examine the exact finish before buying. Delivery arrived in 48 hours.',
    name: 'Sarah Jenkins',
    role: 'Product Designer at MetaLab',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    rating: 5
  },
  {
    id: 't-2',
    quote: 'Customer support answered in the live chat within 30 seconds and resolved my address change instantly. Truly next-generation commerce.',
    name: 'Julian Thorne',
    role: 'Creative Director',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    rating: 5
  },
  {
    id: 't-3',
    quote: 'The audio clarity on the Aura Horizon headphones exceeded both my Apple Max and Sony XM5s. Unbelievable precision.',
    name: 'Amara Okafor',
    role: 'Sound Engineer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80',
    rating: 5
  }
];

export const FAQS = [
  {
    q: 'How does the 3D Product Interactive Viewer work?',
    a: 'Every card and detail page features interactive 3D perspective manipulation. You can drag to rotate 360°, inspect specifications in 3D exploded view, or hover to examine light refractions on materials.'
  },
  {
    q: 'What payment methods are supported?',
    a: 'We support Stripe-ready payment simulation including Credit/Debit Cards (Visa, Mastercard, Amex), UPI instant QR & VPA, Net Banking across all major banks, digital wallets (Apple Pay, Google Pay), and Cash on Delivery.'
  },
  {
    q: 'What is your return and refund policy?',
    a: 'We offer a 30-day no-questions-asked return policy. You can initiate a return directly from your Orders page, generate a prepaid shipping label, and receive your refund within 2-3 business days.'
  },
  {
    q: 'How fast is standard and express shipping?',
    a: 'Standard shipping takes 3-5 business days (Free over $99). Express shipping takes 1-2 business days for a flat $15 fee.'
  },
  {
    q: 'Is my transaction secure?',
    a: 'All transactions are encrypted with 256-bit SSL protocols and processed through PCI-DSS Level 1 compliant gateways.'
  }
];
