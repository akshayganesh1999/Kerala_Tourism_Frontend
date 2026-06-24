export const KERALA_DISTRICTS = {
  Kannur: {
    places: ['Payyambalam Beach', 'Muzhappilangad Drive Beach', 'St Angelo Fort', 'Parassinikkadavu Temple', 'Ezhimala Beach'],
    description: 'Land of looms and lores',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
  },
  Kozhikode: {
    places: ['Kappad Beach', 'Beypore', 'SM Street', 'Mananchira Square', 'Thusharagiri Waterfalls'],
    description: 'City of spices and history',
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800',
  },
  Wayanad: {
    places: ['Edakkal Caves', 'Banasura Sagar Dam', 'Soochipara Falls', 'Chembra Peak', 'Muthanga Wildlife Sanctuary'],
    description: 'Land of forests and spice gardens',
    image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800',
  },
  Ernakulam: {
    places: ['Fort Kochi', 'Marine Drive', 'Cherai Beach', 'Mattancherry Palace', 'Jewish Town'],
    description: 'Commercial capital by the sea',
    image: 'https://images.unsplash.com/photo-1619546952812-520e98064a52?w=800',
  },
  Idukki: {
    places: ['Munnar', 'Thekkady', 'Ramakkalmedu', 'Vagamon', 'Eravikulam National Park'],
    description: 'Jewel of the Western Ghats',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  },
};

export const DISTRICTS = Object.keys(KERALA_DISTRICTS);

export const DESTINATIONS = [
  {
    id: 1,
    name: 'Munnar',
    district: 'Idukki',
    category: 'Hill Station',
    description: 'Tea-carpeted rolling hills and misty valleys of the Western Ghats.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
    tag: 'Hill Station',
    tagColor: 'emerald',
  },
  {
    id: 2,
    name: 'Alleppey',
    district: 'Alappuzha',
    category: 'Backwaters',
    description: 'Timeless houseboats gliding through emerald backwater networks.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
    tag: 'Backwaters',
    tagColor: 'blue',
  },
  {
    id: 3,
    name: 'Wayanad',
    district: 'Wayanad',
    category: 'Wildlife',
    description: 'Ancient caves, coffee estates, and dense wildlife sanctuaries.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    tag: 'Wildlife',
    tagColor: 'amber',
  },
  {
    id: 4,
    name: 'Fort Kochi',
    district: 'Ernakulam',
    category: 'Heritage',
    description: 'Colonial spice port where Chinese fishing nets meet Portuguese churches.',
    image: 'https://images.unsplash.com/photo-1619546952812-520e98064a52?w=800&q=80',
    tag: 'Heritage',
    tagColor: 'purple',
  },
  {
    id: 5,
    name: 'Bekal Fort',
    district: 'Kasaragod',
    category: 'Heritage',
    description: "Kerala's largest fort perched dramatically over the Arabian Sea.",
    image: "https://s7ap1.scene7.com/is/image/incredibleindia/bekal-fort-bekal-kerala-1-attr-hero?qlt=82&ts=1773829900016",
    tag: 'Heritage',
    tagColor: 'purple',
  },
  {
    id: 6,
    name: 'Vagamon',
    district: 'Idukki',
    category: 'Hill Station',
    description: 'Pristine meadows and pine forests above the clouds.',
    image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800&q=80',
    tag: 'Hill Station',
    tagColor: 'emerald',
  },
  {
    id: 7,
    name: 'Kovalam',
    district: 'Thiruvananthapuram',
    category: 'Beach',
    description: 'Crescent-shaped lagoon beaches framed by red-rock headlands.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    tag: 'Beach',
    tagColor: 'cyan',
  },
  {
    id: 8,
    name: 'Athirappilly',
    district: 'Thrissur',
    category: 'Nature',
    description: "India's own Niagara — Kerala's mightiest waterfall in dense rainforest.",
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    tag: 'Waterfall',
    tagColor: 'teal',
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Nair',
    location: 'Bangalore',
    rating: 5,
    text: 'The Kerala backwater experience was beyond anything I had imagined. Waking up on a houseboat to misty waters and birdsong — absolutely magical. Explore Kerala made every detail effortless.',
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
  {
    id: 2,
    name: 'Arjun Menon',
    location: 'Mumbai',
    rating: 5,
    text: "Munnar in monsoon is an experience words struggle to capture. The team's local expertise took us to viewpoints that don't appear on any tourist map. Genuinely unforgettable.",
    avatar: 'https://i.pravatar.cc/80?img=12',
  },
  {
    id: 3,
    name: 'Ananya Krishnan',
    location: 'Delhi',
    rating: 5,
    text: 'From Wayanad\'s wildlife to Fort Kochi\'s colonial streets — this trip covered everything. The personalised itinerary felt tailor-made. Kerala truly is God\'s Own Country.',
    avatar: 'https://i.pravatar.cc/80?img=48',
  },
  {
    id: 4,
    name: 'Rahul Varma',
    location: 'Hyderabad',
    rating: 5,
    text: 'Bekal Fort at sunset with the Arabian Sea crashing below — Explore Kerala gave us moments we will carry forever. Exceptional planning, exceptional experience.',
    avatar: 'https://i.pravatar.cc/80?img=65',
  },
];

export const FEATURES = [
  {
    icon: '🌊',
    title: 'Backwaters',
    description: "Float through 900km of interconnected canals on Kerala's legendary houseboat network.",
    color: 'from-blue-900/60 to-emerald-900/40',
    accent: '#3b82f6',
  },
  {
    icon: '🏔️',
    title: 'Hill Stations',
    description: 'Breathe in cool mountain air across Munnar, Wayanad, and Vagamon\'s tea-kissed peaks.',
    color: 'from-emerald-900/60 to-teal-900/40',
    accent: '#059669',
  },
  {
    icon: '🏖️',
    title: 'Beaches',
    description: 'Discover unspoiled shores from Kovalam to Muzhappilangad — Kerala\'s 590km coastline.',
    color: 'from-cyan-900/60 to-blue-900/40',
    accent: '#06b6d4',
  },
  {
    icon: '🐘',
    title: 'Wildlife',
    description: 'Encounter wild elephants, leopards, and tigers across 23 protected forest reserves.',
    color: 'from-amber-900/60 to-orange-900/40',
    accent: '#d97706',
  },
];

export const WHY_US = [
  { icon: '✅', title: 'Verified Destinations', desc: 'Every listing personally verified by our Kerala-based team.', stat: '200+', label: 'Destinations' },
  { icon: '🗺️', title: 'Local Travel Expertise', desc: 'Born-and-raised Kerala guides who know every hidden path.', stat: '15+', label: 'Years Experience' },
  { icon: '⚡', title: 'Easy Planning', desc: 'Submit your interest and get a personalised itinerary in 24 hours.', stat: '24h', label: 'Response Time' },
  { icon: '🎯', title: 'Personalized Journeys', desc: 'No cookie-cutter tours — every trip built around your pace and interests.', stat: '5000+', label: 'Happy Travellers' },
];
