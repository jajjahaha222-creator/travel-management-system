// seed.js — 50 World-Class Destinations
// Run with: node seed.js

require('dotenv').config()
const mongoose = require('mongoose')
const User     = require('./models/User')
const Package  = require('./models/Package')
const Coupon   = require('./models/Coupon')

// ─── 50 PACKAGES ─────────────────────────────────────────────────────────────
const packages = [

  // ══════════════════════════════════════════════
  // 🏖  BEACH  (8 packages)
  // ══════════════════════════════════════════════
  {
    title: 'Maldives Overwater Paradise',
    destination: 'North Malé Atoll, Maldives',
    category: 'beach',
    description: 'Float above the clearest lagoon on Earth in a private overwater villa. Drift into the warm Indian Ocean from your glass-floor deck, snorkel vibrant coral gardens, dine underwater, and watch manta rays glide silently below you at dusk.',
    duration: 7,
    price: 210000,
    availableSeats: 8,
    totalSeats: 8,
    isFeatured: true,
    tags: ['honeymoon', 'luxury', 'snorkeling', 'overwater'],
    highlights: ['Private overwater bungalow with glass floor', 'Manta ray night snorkeling', 'Underwater restaurant dinner', 'Sunset dolphin cruise', 'Coral reef diving certification'],
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800'
  },
  {
    title: 'Santorini Caldera Escape',
    destination: 'Santorini, Greece',
    category: 'beach',
    description: 'Experience the world-famous blue domes and volcanic sunsets of Santorini. Stay in a cliff-perched cave hotel with a private plunge pool overlooking the caldera, explore ancient Akrotiri, and sail around the volcanic islands at golden hour.',
    duration: 7,
    price: 155000,
    availableSeats: 10,
    totalSeats: 10,
    isFeatured: true,
    tags: ['honeymoon', 'romantic', 'sunset', 'sailing'],
    highlights: ['Cliffside cave hotel with plunge pool', 'Private caldera sunset sailing', 'Akrotiri archaeological site', 'Oia sunset wine tasting', 'Black sand beach at Perissa'],
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800'
  },
  {
    title: 'Bali Beach & Temple Trail',
    destination: 'Seminyak & Nusa Dua, Bali',
    category: 'beach',
    description: 'Bali at its most indulgent — white sand beaches, sacred water temples, and world-class surf. Ride the break at Uluwatu, watch cliff-top Kecak fire dance at sunset, and rejuvenate with traditional Balinese massage in an open-air jungle spa.',
    duration: 10,
    price: 88000,
    availableSeats: 16,
    totalSeats: 16,
    isFeatured: false,
    tags: ['surf', 'wellness', 'spiritual', 'beach'],
    highlights: ['Uluwatu cliff-top Kecak dance', 'Surf lesson at Kuta Beach', 'Tanah Lot water temple sunrise', 'Traditional Balinese spa day', 'Nusa Penida island hopping'],
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800'
  },
  {
    title: 'Phuket & Islands Explorer',
    destination: 'Phuket & Phi Phi Islands, Thailand',
    category: 'beach',
    description: 'Thailand\'s crown jewel — emerald waters, limestone karsts rising from the Andaman Sea, and legendary island nightlife. Snorkel Maya Bay, kayak through sea caves at Phang Nga, and watch the sun melt into the horizon from Promthep Cape.',
    duration: 8,
    price: 72000,
    availableSeats: 20,
    totalSeats: 20,
    isFeatured: false,
    tags: ['island-hopping', 'snorkeling', 'nightlife', 'kayaking'],
    highlights: ['Phi Phi Islands speedboat day trip', 'Sea kayaking Phang Nga Bay', 'Maya Bay snorkeling', 'Old Phuket Town street food walk', 'Similan Islands diving'],
    image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800'
  },
  {
    title: 'Amalfi Coast Road Trip',
    destination: 'Amalfi Coast, Italy',
    category: 'beach',
    description: 'Hug the curves of the world\'s most spectacular coastal road. Pastel villages cling to cliffs above turquoise coves, lemon groves perfume the air, and ancient cathedrals glow gold at noon. A road trip for the soul along Italy\'s most breathtaking shoreline.',
    duration: 9,
    price: 165000,
    availableSeats: 12,
    totalSeats: 12,
    isFeatured: false,
    tags: ['road-trip', 'coastal', 'romantic', 'food'],
    highlights: ['Private boat tour of the coast', 'Positano sunset aperitivo', 'Ravello classical music concert', 'Limoncello distillery visit', 'Grotta dello Smeraldo (Emerald Grotto)'],
    image: 'https://images.unsplash.com/photo-1534445538923-ab38b99be494?w=800'
  },
  {
    title: 'Zanzibar Spice Island',
    destination: 'Zanzibar, Tanzania',
    category: 'beach',
    description: 'An island of intoxicating contrasts — white powdery beaches lapped by turquoise water, narrow spice-scented alleys in UNESCO-listed Stone Town, and coral reefs alive with neon fish. One of East Africa\'s most rewarding and underrated destinations.',
    duration: 8,
    price: 98000,
    availableSeats: 14,
    totalSeats: 14,
    isFeatured: false,
    tags: ['culture', 'beach', 'snorkeling', 'spices'],
    highlights: ['Stone Town heritage walk', 'Spice plantation tour', 'Prison Island giant tortoise visit', 'Nakupenda sandbank picnic', 'Dhow sailing at sunset'],
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800'
  },
  {
    title: 'Seychelles Island Hopper',
    destination: 'Mahé, Praslin & La Digue, Seychelles',
    category: 'beach',
    description: 'Three islands, three entirely different personalities — cosmopolitan Mahé, pristine Praslin with the legendary Vallée de Mai, and fairytale La Digue where granite boulders frame the most photographed beach on Earth.',
    duration: 10,
    price: 248000,
    availableSeats: 6,
    totalSeats: 6,
    isFeatured: true,
    tags: ['luxury', 'island-hopping', 'honeymoon', 'rare'],
    highlights: ['Anse Source d\'Argent — world\'s most beautiful beach', 'Vallée de Mai nature reserve', 'Sea turtle snorkeling at Curieuse', 'Inter-island ferry adventure', 'Private beach picnic'],
    image: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800'
  },
  {
    title: 'Goa Sun & Soul',
    destination: 'North & South Goa, India',
    category: 'beach',
    description: 'India\'s beloved coast — a heady mix of Portuguese heritage, golden beaches, fresh seafood, and endless hospitality. From the energetic shores of Baga to the serene spice gardens of Ponda, Goa is the escape that never gets old.',
    duration: 6,
    price: 32000,
    availableSeats: 24,
    totalSeats: 24,
    isFeatured: false,
    tags: ['budget-friendly', 'beach', 'nightlife', 'heritage'],
    highlights: ['Old Goa churches heritage walk', 'Spice plantation lunch tour', 'Sunset cruise on Mandovi River', 'Anjuna flea market', 'Seafood feast at Calangute'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800'
  },

  // ══════════════════════════════════════════════
  // 🏔  MOUNTAIN  (8 packages)
  // ══════════════════════════════════════════════
  {
    title: 'Swiss Alps Winter Wonderland',
    destination: 'Interlaken & Jungfrau, Switzerland',
    category: 'mountain',
    description: 'Conquer the roof of Europe. Ride the Glacier Express to Jungfraujoch — the "Top of Europe" at 3,454m — ski legendary runs with expert instructors, then warm up over melting cheese fondue in a centuries-old Alpine chalet.',
    duration: 8,
    price: 225000,
    availableSeats: 8,
    totalSeats: 8,
    isFeatured: true,
    tags: ['skiing', 'winter', 'luxury', 'scenic-train'],
    highlights: ['Jungfraujoch summit at 3,454m', 'Glacier Express scenic railway', 'Private ski instructor (3 days)', 'Traditional fondue evening', 'Grindelwald ice cave exploration'],
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800'
  },
  {
    title: 'Nepal Everest Base Camp Trek',
    destination: 'Khumbu Region, Nepal',
    category: 'mountain',
    description: 'The pilgrimage every mountaineer dreams of — a 12-day journey through Sherpa villages, rhododendron forests, and glacial moraines to stand at 5,364m and gaze upon the summit of the world. No technical climbing required, just determination.',
    duration: 14,
    price: 95000,
    availableSeats: 10,
    totalSeats: 10,
    isFeatured: true,
    tags: ['trekking', 'high-altitude', 'adventure', 'bucket-list'],
    highlights: ['Everest Base Camp at 5,364m', 'Namche Bazaar acclimatisation', 'Khumjung monastery visit', 'Tengboche monastery sunrise', 'Gokyo Lakes side trek option'],
    image: 'https://images.unsplash.com/photo-1516302350523-4f4789ac76b3?w=800'
  },
  {
    title: 'Patagonia End of the World',
    destination: 'Torres del Paine, Chile',
    category: 'mountain',
    description: 'The raw, untamed wilderness at the southern tip of the Americas. Granite towers pierce the storm clouds, glaciers calve thunderously into jade lakes, and condors ride thermals high above. The W-Trek is the most spectacular multi-day hike on Earth.',
    duration: 12,
    price: 182000,
    availableSeats: 8,
    totalSeats: 8,
    isFeatured: false,
    tags: ['trekking', 'wilderness', 'photography', 'wildlife'],
    highlights: ['W-Trek with expert mountain guide', 'Perito Moreno glacier walk', 'Grey Lake kayaking', 'Puma & condor wildlife spotting', 'Mirador Las Torres sunrise'],
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800'
  },
  {
    title: 'Dolomites Summer Hiking',
    destination: 'South Tyrol, Italy',
    category: 'mountain',
    description: 'The Alps at their most theatrical. Pink at dawn, blazing at noon, blood-orange at dusk — the Dolomites\' famous Enrosadira glow is unlike anything in the natural world. Via ferrata routes for the adventurous, easy panoramic trails for everyone.',
    duration: 7,
    price: 128000,
    availableSeats: 12,
    totalSeats: 12,
    isFeatured: false,
    tags: ['hiking', 'photography', 'via-ferrata', 'scenic'],
    highlights: ['Tre Cime di Lavaredo circuit', 'Via ferrata with certified guide', 'Rifugio mountain hut overnight', 'Cortina d\'Ampezzo town visit', 'Seceda ridge sunrise hike'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
  },
  {
    title: 'Ladakh Land of High Passes',
    destination: 'Leh & Nubra Valley, India',
    category: 'mountain',
    description: 'The world\'s highest motorable passes, ancient Buddhist monasteries perched on cliff faces, and a sky so clear the Milky Way pours over you like a river. Ladakh is Tibet as it once was — mystical, remote, and utterly transformative.',
    duration: 9,
    price: 58000,
    availableSeats: 14,
    totalSeats: 14,
    isFeatured: false,
    tags: ['high-altitude', 'buddhist', 'motorcycling', 'stargazing'],
    highlights: ['Khardung La pass (5,359m) crossing', 'Nubra Valley camel safari', 'Pangong Tso lake sunrise', 'Hemis monastery festival', 'Magnetic Hill visit'],
    image: 'https://images.unsplash.com/photo-1506038634487-60a69ae4b7b1?w=800'
  },
  {
    title: 'Banff & Canadian Rockies',
    destination: 'Banff National Park, Canada',
    category: 'mountain',
    description: 'Turquoise glacial lakes ringed by snow-capped peaks, elk wandering through mountain towns, and the most iconic scenic drive in the Americas — the Icefields Parkway. Banff is nature\'s masterpiece and Canada\'s most beloved park.',
    duration: 9,
    price: 175000,
    availableSeats: 10,
    totalSeats: 10,
    isFeatured: false,
    tags: ['scenic', 'wildlife', 'hiking', 'road-trip'],
    highlights: ['Lake Louise canoe at sunrise', 'Columbia Icefield Skywalk', 'Icefields Parkway road trip', 'Banff gondola summit hike', 'Johnston Canyon ice walk'],
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800'
  },
  {
    title: 'Kyoto & Japanese Alps',
    destination: 'Kyoto & Kamikochi, Japan',
    category: 'mountain',
    description: 'Ancient imperial gardens meet pristine alpine wilderness. Walk the Nakasendo samurai highway, soak in outdoor hot springs (onsen) as snow falls around you, and hike through the Japanese Alps where crystal rivers carve through primeval forest.',
    duration: 11,
    price: 148000,
    availableSeats: 10,
    totalSeats: 10,
    isFeatured: false,
    tags: ['cultural', 'onsen', 'hiking', 'temples'],
    highlights: ['Kamikochi alpine valley hike', 'Nakasendo Way walking trail', 'Shirakawa-go snow village', 'Traditional ryokan with rotenburo', 'Matsumoto Castle visit'],
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800'
  },
  {
    title: 'Scottish Highlands & Isles',
    destination: 'Highlands & Isle of Skye, Scotland',
    category: 'mountain',
    description: 'Where brooding castles guard misty lochs and ancient clan legends echo through dramatic glens. The Quiraing ridge walk on Skye defies description. Single malt whisky poured by a peat fire at a croft that\'s stood for 400 years — this is Scotland.',
    duration: 8,
    price: 118000,
    availableSeats: 12,
    totalSeats: 12,
    isFeatured: false,
    tags: ['hiking', 'castles', 'whisky', 'scenic'],
    highlights: ['Quiraing ridge walk, Isle of Skye', 'Eilean Donan Castle visit', 'Loch Ness shoreline walk', 'Single malt distillery tour', 'Fairy Pools swim'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
  },

  // ══════════════════════════════════════════════
  // 🦁  WILDLIFE  (8 packages)
  // ══════════════════════════════════════════════
  {
    title: 'Serengeti Great Migration',
    destination: 'Serengeti & Ngorongoro, Tanzania',
    category: 'wildlife',
    description: 'Witness the greatest wildlife spectacle on Earth — 1.5 million wildebeest thundering across the Serengeti plains in their ancient annual migration. Stay in luxury tented camps and wake to the sound of lions calling across the savanna at dawn.',
    duration: 10,
    price: 265000,
    availableSeats: 6,
    totalSeats: 6,
    isFeatured: true,
    tags: ['safari', 'big-five', 'migration', 'luxury'],
    highlights: ['Wildebeest river crossing (in season)', 'Ngorongoro Crater game drive', 'Big Five tracking with expert ranger', 'Hot air balloon over Serengeti', 'Maasai village cultural visit'],
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800'
  },
  {
    title: 'Borneo Orangutan & Rainforest',
    destination: 'Sabah & Sarawak, Malaysia (Borneo)',
    category: 'wildlife',
    description: 'One of the last places on Earth where you can encounter wild orangutans in ancient rainforest. River cruise at night for pygmy elephants, watch proboscis monkeys at dusk, and trek to the summit of Mount Kinabalu — the highest peak in Southeast Asia.',
    duration: 10,
    price: 115000,
    availableSeats: 10,
    totalSeats: 10,
    isFeatured: false,
    tags: ['orangutan', 'rainforest', 'trekking', 'conservation'],
    highlights: ['Wild orangutan encounter, Danum Valley', 'Kinabatangan river wildlife cruise', 'Pygmy elephant sighting', 'Mount Kinabalu summit (4,095m)', 'Mulu caves UNESCO site'],
    image: 'https://images.unsplash.com/photo-1544635808-bab9a52f292d?w=800'
  },
  {
    title: 'Galápagos Islands Expedition',
    destination: 'Galápagos Islands, Ecuador',
    category: 'wildlife',
    description: 'Walk among creatures that have never learned to fear humans. Giant tortoises amble past your feet, marine iguanas bask on lava shores, and blue-footed boobies perform their absurd courtship dance just metres away. Darwin\'s inspiration — your awakening.',
    duration: 10,
    price: 298000,
    availableSeats: 8,
    totalSeats: 8,
    isFeatured: true,
    tags: ['endemic-species', 'snorkeling', 'conservation', 'bucket-list'],
    highlights: ['Giant tortoise encounter, Santa Cruz', 'Snorkel with sea lions & penguins', 'Blue-footed booby nesting colony', 'Marine iguana lava shore walk', 'Naturalist-guided expedition yacht'],
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
  },
  {
    title: 'India Tiger Safari',
    destination: 'Ranthambore & Bandhavgarh, India',
    category: 'wildlife',
    description: 'India\'s biggest cats in their element — hunting through dry grasslands and ancient ruins. Ranthambore\'s tigers are famously bold, often spotted in broad daylight. Expert naturalists decode every paw print and alarm call in one of wildlife photography\'s ultimate arenas.',
    duration: 7,
    price: 68000,
    availableSeats: 12,
    totalSeats: 12,
    isFeatured: false,
    tags: ['tiger', 'safari', 'photography', 'naturalist'],
    highlights: ['Bengal tiger game drives (4 drives)', 'Ranthambore Fort ruins walk', 'Leopard & sloth bear sightings', 'Expert wildlife naturalist guide', 'Bird watching — 300+ species'],
    image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800'
  },
  {
    title: 'Antarctica Polar Expedition',
    destination: 'Antarctic Peninsula',
    category: 'wildlife',
    description: 'The last wilderness. Continent-sized icebergs, penguin rookeries numbering in the hundreds of thousands, and a silence so profound it recalibrates your entire relationship with the planet. Board an expedition vessel from Ushuaia into waters few humans ever see.',
    duration: 14,
    price: 485000,
    availableSeats: 4,
    totalSeats: 4,
    isFeatured: true,
    tags: ['polar', 'penguins', 'expedition', 'rare'],
    highlights: ['Emperor penguin rookery landings', 'Zodiac cruising among icebergs', 'Leopard seal & orca sightings', 'South Georgia Island', 'Midnight sun experience'],
    image: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=800'
  },
  {
    title: 'Kenya Maasai Mara Safari',
    destination: 'Maasai Mara, Kenya',
    category: 'wildlife',
    description: 'Kenya\'s most celebrated reserve — where lions sleep on termite mounds, cheetahs sprint across golden grass, and the horizon is an unbroken sweep of Africa. The July–October migration brings millions of animals and the raw drama of predator and prey.',
    duration: 8,
    price: 195000,
    availableSeats: 8,
    totalSeats: 8,
    isFeatured: false,
    tags: ['big-five', 'safari', 'migration', 'photography'],
    highlights: ['Dawn & dusk game drives', 'Maasai village & culture', 'Hot air balloon over the Mara', 'Cheetah & lion tracking', 'Mara River crossing (seasonal)'],
    image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800'
  },
  {
    title: 'Sri Lanka Wildlife & Culture',
    destination: 'Yala & Udawalawe, Sri Lanka',
    category: 'wildlife',
    description: 'Sri Lanka packs extraordinary wildlife into a remarkably small island — the highest density of leopards in the world at Yala, wild elephant herds bathing at Udawalawe, and blue whales breaching offshore at Mirissa. All within a stunning cultural tapestry.',
    duration: 9,
    price: 78000,
    availableSeats: 14,
    totalSeats: 14,
    isFeatured: false,
    tags: ['leopard', 'elephants', 'whale-watching', 'culture'],
    highlights: ['Yala leopard safari (world\'s best)', 'Udawalawe elephant orphanage', 'Blue whale watching at Mirissa', 'Sigiriya rock fortress climb', 'Train through tea highlands'],
    image: 'https://images.unsplash.com/photo-1556741533-411cf82e4e2d?w=800'
  },
  {
    title: 'Botswana Okavango Delta',
    destination: 'Okavango Delta & Chobe, Botswana',
    category: 'wildlife',
    description: 'The world\'s largest inland delta — a shimmering labyrinth of waterways, papyrus islands, and lagoons where Africa\'s finest wildlife concentrates. Mokoro canoe silently through lily pads past hippos, then track elephant families on foot with a San bushman guide.',
    duration: 10,
    price: 312000,
    availableSeats: 6,
    totalSeats: 6,
    isFeatured: false,
    tags: ['safari', 'delta', 'mokoro', 'luxury'],
    highlights: ['Mokoro canoe through papyrus', 'Chobe elephant boat cruise', 'Walking safari with San guide', 'Night game drive for nocturnal species', 'Small luxury bush camp stay'],
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'
  },

  // ══════════════════════════════════════════════
  // 🏛  CULTURAL  (8 packages)
  // ══════════════════════════════════════════════
  {
    title: 'Rajasthan Royal Circuit',
    destination: 'Jaipur, Jodhpur & Udaipur, India',
    category: 'cultural',
    description: 'Travel the land of maharajas in royal style. Amber Fort glows gold at sunrise, the Blue City spreads beneath Mehrangarh like a watercolour painting, and Udaipur\'s Lake Palace floats dreamlike in the evening mist. The most visually spectacular journey in India.',
    duration: 10,
    price: 75000,
    availableSeats: 16,
    totalSeats: 16,
    isFeatured: true,
    tags: ['heritage', 'forts', 'palaces', 'royal'],
    highlights: ['Amber Fort elephant ride at sunrise', 'Mehrangarh Fort Blue City panorama', 'Lake Pichola boat at sunset', 'Desert safari & folk performance', 'Palace hotel overnight stay'],
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800'
  },
  {
    title: 'Egypt Pharaohs & Nile Cruise',
    destination: 'Cairo, Luxor & Aswan, Egypt',
    category: 'cultural',
    description: 'Step into 5,000 years of history — the Great Pyramid at Giza at dawn before the crowds arrive, the Valley of the Kings where Tutankhamun slept for 3,000 years, and a felucca sailing into sunset on the Nile as it has since the days of Cleopatra.',
    duration: 10,
    price: 118000,
    availableSeats: 12,
    totalSeats: 12,
    isFeatured: true,
    tags: ['ancient', 'nile', 'pyramids', 'archaeology'],
    highlights: ['Pyramids of Giza private sunrise visit', 'Valley of the Kings (Tutankhamun\'s tomb)', 'Nile cruise Luxor to Aswan', 'Abu Simbel temple complex', 'Egyptian Museum royal mummies'],
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800'
  },
  {
    title: 'Japan Sakura & Samurai',
    destination: 'Tokyo, Kyoto & Hiroshima, Japan',
    category: 'cultural',
    description: 'Japan in cherry blossom season — a once-in-a-lifetime collision of ancient and futuristic. Bullet trains, vending machines selling everything, 1,000-year-old shrines, and parks carpeted pink and white. Japan rewards every sense simultaneously.',
    duration: 12,
    price: 158000,
    availableSeats: 10,
    totalSeats: 10,
    isFeatured: false,
    tags: ['sakura', 'temples', 'food', 'bullet-train'],
    highlights: ['Fushimi Inari 10,000 torii gates', 'Bullet train Tokyo to Kyoto', 'Hiroshima Peace Memorial', 'Nara deer park', 'Tea ceremony & origami workshop'],
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800'
  },
  {
    title: 'Morocco Imperial Cities',
    destination: 'Marrakech, Fes & Chefchaouen, Morocco',
    category: 'cultural',
    description: 'Plunge into the labyrinthine medinas of the Maghreb — calls to prayer rising above rooftop terraces, artisans hammering copper in suqs unchanged for centuries, and the blue city of Chefchaouen tumbling down its hillside like a dream.',
    duration: 9,
    price: 88000,
    availableSeats: 14,
    totalSeats: 14,
    isFeatured: false,
    tags: ['medina', 'souks', 'architecture', 'desert'],
    highlights: ['Fes el Bali medina UNESCO walk', 'Sahara desert camel trek & camp', 'Chefchaouen blue city wander', 'Moroccan cooking class', 'Djemaa el-Fna evening show'],
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800'
  },
  {
    title: 'Peru Machu Picchu & Inca Trail',
    destination: 'Cusco & Machu Picchu, Peru',
    category: 'cultural',
    description: 'The lost city of the Incas, hidden in clouds above the Sacred Valley, revealed at dawn through the Sun Gate after a four-day trek. Few moments in travel match the first glimpse of Machu Picchu. Then explore the floating islands of Lake Titicaca.',
    duration: 12,
    price: 145000,
    availableSeats: 10,
    totalSeats: 10,
    isFeatured: false,
    tags: ['inca', 'trekking', 'archaeology', 'altitude'],
    highlights: ['Classic Inca Trail 4-day trek', 'Machu Picchu Sun Gate sunrise', 'Cusco Sacred Valley', 'Lake Titicaca floating islands', 'Peruvian cuisine cooking class'],
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800'
  },
  {
    title: 'Istanbul East Meets West',
    destination: 'Istanbul, Turkey',
    category: 'cultural',
    description: 'The only city on two continents — where minarets pierce a skyline of domes and seagulls wheel between Europe and Asia. The Grand Bazaar\'s 4,000 shops, the Hagia Sophia\'s impossible scale, and the Bosphorus at sunset from a rooftop with a glass of çay.',
    duration: 7,
    price: 82000,
    availableSeats: 16,
    totalSeats: 16,
    isFeatured: false,
    tags: ['architecture', 'food', 'history', 'bazaar'],
    highlights: ['Hagia Sophia & Blue Mosque', 'Grand Bazaar guided exploration', 'Bosphorus sunset cruise', 'Turkish bath (hammam) experience', 'Dolmabahçe Palace tour'],
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800'
  },
  {
    title: 'Angkor Wat & Cambodia',
    destination: 'Siem Reap & Phnom Penh, Cambodia',
    category: 'cultural',
    description: 'The largest religious monument ever built — Angkor Wat at sunrise, its five towers reflected in the still moat as saffron-robed monks pass silently. Then the Bayon\'s 216 enigmatic stone faces peering from the jungle. Cambodia\'s ancient heart is overwhelming.',
    duration: 8,
    price: 65000,
    availableSeats: 14,
    totalSeats: 14,
    isFeatured: false,
    tags: ['temples', 'ancient', 'history', 'sunrise'],
    highlights: ['Angkor Wat sunrise private tour', 'Ta Prohm jungle temple', 'Bayon\'s 216 stone faces', 'Royal Palace Phnom Penh', 'Traditional Apsara dance show'],
    image: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800'
  },
  {
    title: 'Ethiopia Lalibela & Rift Valley',
    destination: 'Lalibela & Addis Ababa, Ethiopia',
    category: 'cultural',
    description: 'Africa\'s most underrated destination. Eleven rock-hewn churches carved underground from solid basalt 800 years ago — still active pilgrimage sites today. Then the ancient kingdom of Axum, the Danakil Depression (hottest place on Earth), and extraordinary coffee ceremonies.',
    duration: 10,
    price: 112000,
    availableSeats: 10,
    totalSeats: 10,
    isFeatured: false,
    tags: ['ancient', 'churches', 'off-beaten-path', 'coffee'],
    highlights: ['Lalibela rock-hewn churches', 'Ethiopian coffee ceremony', 'Simien Mountains trekking', 'Axum obelisks & ark legend', 'Danakil sulphur springs'],
    image: 'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=800'
  },

  // ══════════════════════════════════════════════
  // 🧗  ADVENTURE  (8 packages)
  // ══════════════════════════════════════════════
  {
    title: 'New Zealand South Island Epic',
    destination: 'Queenstown & Fiordland, New Zealand',
    category: 'adventure',
    description: 'The adventure capital of the world delivers — bungee jump over the Kawarau Gorge, jet boat through Shotover Canyon, hike the Milford Track to fiords where waterfalls plunge 600m into black water, and skydive over the Southern Alps. New Zealand goes hard.',
    duration: 12,
    price: 192000,
    availableSeats: 10,
    totalSeats: 10,
    isFeatured: true,
    tags: ['bungee', 'skydiving', 'hiking', 'fiords'],
    highlights: ['Bungy jump, Kawarau Bridge', 'Milford Track 4-day guided hike', 'Milford Sound cruise at dawn', 'Shotover Canyon jet boat', 'Skydive over Lake Wakatipu'],
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800'
  },
  {
    title: 'Iceland Fire & Ice Expedition',
    destination: 'Reykjavik & Golden Circle, Iceland',
    category: 'adventure',
    description: 'A land of violent geological drama — lava fields still warm underfoot, geysers erupting on the hour, and the Northern Lights dancing green and purple above frozen waterfalls. In summer, hike glaciers under the midnight sun. Iceland breaks every expectation.',
    duration: 8,
    price: 168000,
    availableSeats: 10,
    totalSeats: 10,
    isFeatured: true,
    tags: ['northern-lights', 'glacier', 'geysers', 'volcanic'],
    highlights: ['Northern Lights hunting (in season)', 'Vatnajökull glacier hiking', 'Silfra fissure snorkeling', 'Geysir & Gullfoss Golden Circle', 'Blue Lagoon geothermal spa'],
    image: 'https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=800'
  },
  {
    title: 'Amazon Jungle Immersion',
    destination: 'Manaus & Anavilhanas, Brazil',
    category: 'adventure',
    description: 'Disappear into the lungs of the Earth. Navigate black-water tributaries by dugout canoe, fish for piranhas at sunset, spot pink river dolphins at dawn, and sleep in a jungle lodge listening to the rainforest\'s impossible symphony of nocturnal life.',
    duration: 9,
    price: 128000,
    availableSeats: 10,
    totalSeats: 10,
    isFeatured: false,
    tags: ['jungle', 'rainforest', 'canoe', 'wildlife'],
    highlights: ['Dugout canoe through flooded forest', 'Piranha fishing at sunset', 'Pink river dolphin encounter', 'Anaconda spotting night walk', 'Meeting of the Waters (Rio Negro)'],
    image: 'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=800'
  },
  {
    title: 'Bhutan Kingdom in the Clouds',
    destination: 'Thimphu & Paro, Bhutan',
    category: 'adventure',
    description: 'The last Himalayan Buddhist kingdom, where Gross National Happiness is government policy. Hike to the Tiger\'s Nest monastery clinging to a 900m cliff face, attend mask dances at a dzong festival, and wander apple orchards below Himalayan peaks at 7,000m.',
    duration: 8,
    price: 135000,
    availableSeats: 8,
    totalSeats: 8,
    isFeatured: false,
    tags: ['buddhist', 'himalayan', 'trekking', 'unique'],
    highlights: ['Tiger\'s Nest (Paro Taktsang) hike', 'Punakha Dzong river monastery', 'Black-necked crane sanctuary', 'Archery with Bhutanese locals', 'Bhutanese hot stone bath'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'
  },
  {
    title: 'Namibia Desert & Dunes',
    destination: 'Sossusvlei & Skeleton Coast, Namibia',
    category: 'adventure',
    description: 'The oldest desert on Earth, where star-shaped dunes rise 300 metres from orange sand, shipwrecks rust on the Skeleton Coast, and desert-adapted elephants wander dry riverbeds. Climb Dune 45 for sunrise over the world\'s most photogenic landscape.',
    duration: 10,
    price: 155000,
    availableSeats: 8,
    totalSeats: 8,
    isFeatured: false,
    tags: ['desert', 'dunes', 'photography', 'stargazing'],
    highlights: ['Dune 45 & Dune 7 climb at sunrise', 'Deadvlei white clay pan', 'Skeleton Coast shipwreck walk', 'Desert-adapted elephant tracking', 'Etosha salt pan game drive'],
    image: 'https://images.unsplash.com/photo-1509803874385-db7c23652552?w=800'
  },
  {
    title: 'Colombia Cartagena & Coffee',
    destination: 'Cartagena, Medellín & Coffee Region',
    category: 'adventure',
    description: 'Colombia transformed — a country of stunning diversity that rewards early visitors. Zip-line over the Cocora Valley\'s towering wax palms, tour a coffee finca at harvest, dance salsa on Cartagena\'s colonial ramparts, and paraglide over Medellín\'s improbable skyline.',
    duration: 10,
    price: 95000,
    availableSeats: 12,
    totalSeats: 12,
    isFeatured: false,
    tags: ['coffee', 'zip-line', 'colonial', 'salsa'],
    highlights: ['Coffee finca harvest & roasting tour', 'Cocora Valley wax palms zip-line', 'Cartagena colonial walled city', 'Paragliding over Medellín', 'Tayrona National Park hike'],
    image: 'https://images.unsplash.com/photo-1533131741399-be869427e3b0?w=800'
  },
  {
    title: 'Oman Desert & Wadis',
    destination: 'Muscat, Wahiba Sands & Wadi Shab',
    category: 'adventure',
    description: 'Arabia\'s most welcoming and underrated destination. Emerald-green wadis slice through limestone canyons, Bedouin camps dot the Wahiba sand sea, and ancient frankincense trade routes wind past mud-brick mountain villages unchanged for a thousand years.',
    duration: 8,
    price: 88000,
    availableSeats: 12,
    totalSeats: 12,
    isFeatured: false,
    tags: ['desert', 'wadis', 'bedouin', 'snorkeling'],
    highlights: ['Wadi Shab emerald pool swim', 'Wahiba Sands overnight Bedouin camp', 'Jebel Akhdar mountain drive', 'Mutrah Souk spice hunt', 'Turtle nesting beach night visit'],
    image: 'https://images.unsplash.com/photo-1548787590-73e63d96e83a?w=800'
  },
  {
    title: 'Vietnam Top to Toe',
    destination: 'Hanoi, Ha Long Bay & Hội An',
    category: 'adventure',
    description: 'Three thousand kilometres of extraordinary contrast — limestone karsts piercing Ha Long Bay like dragon teeth, ancient lantern-lit Hội An, motorbike chaos on Hanoi\'s streets, and the jaw-dropping Son Doong cave, the world\'s largest, for the truly brave.',
    duration: 12,
    price: 82000,
    availableSeats: 16,
    totalSeats: 16,
    isFeatured: false,
    tags: ['motorbike', 'caves', 'street-food', 'kayaking'],
    highlights: ['Ha Long Bay overnight junk cruise', 'Hội An lantern festival & cooking', 'Phong Nha cave kayaking', 'Hoi An bicycle rice paddy ride', 'Hanoi street food night tour'],
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800'
  },

  // ══════════════════════════════════════════════
  // 🏙  CITY  (7 packages)
  // ══════════════════════════════════════════════
  {
    title: 'New York City in Depth',
    destination: 'New York City, USA',
    category: 'city',
    description: 'The city that defined the modern age — more energy per square kilometre than anywhere else on Earth. Broadway lights, Central Park at dawn, the High Line at golden hour, a rooftop bar above the Brooklyn skyline, and a hot dog from a cart in the Bronx. Nothing compares.',
    duration: 7,
    price: 145000,
    availableSeats: 14,
    totalSeats: 14,
    isFeatured: false,
    tags: ['broadway', 'museums', 'food', 'skyline'],
    highlights: ['Broadway show front-row tickets', 'Central Park sunrise run', 'One World Observatory visit', 'Brooklyn food market tour', 'Jazz club in Harlem'],
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800'
  },
  {
    title: 'Tokyo Neon & Tradition',
    destination: 'Tokyo, Japan',
    category: 'city',
    description: 'The most fascinatingly contradictory city on Earth — seven-Michelin-star ramen, vending machines selling whisky in temple gardens, capsule hotels next to 17th-century shrines, and an obsessive attention to perfection in everything from sushi to subway punctuality.',
    duration: 9,
    price: 138000,
    availableSeats: 12,
    totalSeats: 12,
    isFeatured: true,
    tags: ['food', 'anime', 'technology', 'temples'],
    highlights: ['Tsukiji outer market tuna breakfast', 'Akihabara electronics district', 'Shibuya crossing at night', 'Meiji Shrine sunrise visit', 'Robot restaurant show'],
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800'
  },
  {
    title: 'Paris Romance & Art',
    destination: 'Paris, France',
    category: 'city',
    description: 'The most painted, photographed, romanticised, and visited city on Earth — and it still delivers. The Louvre on a Tuesday morning, croissants still hot from the boulangerie, evening Seine cruise, and the Eiffel Tower sparkling at midnight above a city that never loses its magic.',
    duration: 7,
    price: 128000,
    availableSeats: 14,
    totalSeats: 14,
    isFeatured: false,
    tags: ['art', 'food', 'romantic', 'fashion'],
    highlights: ['Louvre private early-morning access', 'Montmartre artists\' quarter walk', 'Seine River dinner cruise', 'Versailles Palace & gardens', 'Moulin Rouge cabaret show'],
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800'
  },
  {
    title: 'Dubai Ultra-Modern',
    destination: 'Dubai, UAE',
    category: 'city',
    description: 'A city built on audacity — the world\'s tallest building, an indoor ski slope in 40°C heat, a palm-shaped island visible from space, and a gold souk where you buy 24-carat jewellery by weight. Dubai is what happens when there are no limits and unlimited ambition.',
    duration: 6,
    price: 95000,
    availableSeats: 16,
    totalSeats: 16,
    isFeatured: false,
    tags: ['luxury', 'modern', 'shopping', 'skyscrapers'],
    highlights: ['Burj Khalifa At.mosphere dinner', 'Desert dune bashing & BBQ', 'Gold & Spice Souk', 'Abra creek crossing to Old Dubai', 'Ski Dubai indoor slope'],
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800'
  },
  {
    title: 'Barcelona Gaudí & Gastronomy',
    destination: 'Barcelona, Spain',
    category: 'city',
    description: 'Gaudí\'s Sagrada Família still rising after 140 years, tapas at midnight in El Born, the human towers of Castellers, and La Boqueria\'s technicolour produce stalls. Barcelona lives harder, eats later, and celebrates longer than anywhere in Europe.',
    duration: 7,
    price: 112000,
    availableSeats: 14,
    totalSeats: 14,
    isFeatured: false,
    tags: ['architecture', 'food', 'art', 'nightlife'],
    highlights: ['Sagrada Família tower access', 'Park Güell sunrise (before crowds)', 'Pintxos & tapas crawl, El Born', 'Camp Nou stadium tour', 'Flamenco show & dinner'],
    image: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800'
  },
  {
    title: 'Singapore City-State',
    destination: 'Singapore',
    category: 'city',
    description: 'The world\'s most efficiently designed city — an island that became a nation by pure willpower. Marina Bay Sands\' infinity pool above the skyline, Hawker Centre chicken rice that beats every restaurant in the world, Sentosa beaches, and Gardens by the Bay\'s supertrees at night.',
    duration: 6,
    price: 88000,
    availableSeats: 16,
    totalSeats: 16,
    isFeatured: false,
    tags: ['food', 'modern', 'gardens', 'family'],
    highlights: ['Marina Bay Sands skypark swim', 'Gardens by the Bay light show', 'Hawker Centre food tour', 'Sentosa island cable car', 'Little India & Chinatown walk'],
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800'
  },
  {
    title: 'Rio Carnival & Culture',
    destination: 'Rio de Janeiro, Brazil',
    category: 'city',
    description: 'The most joyful city on Earth — Christ the Redeemer opening his arms above a city wedged between jungle-covered mountains and the Atlantic. Carnival samba at the Sambadrome, caipirinhas at sunset on Ipanema, and hang-gliding off Pedra Bonita over the entire breathtaking panorama.',
    duration: 8,
    price: 118000,
    availableSeats: 12,
    totalSeats: 12,
    isFeatured: false,
    tags: ['carnival', 'beaches', 'samba', 'hang-gliding'],
    highlights: ['Christ the Redeemer sunrise visit', 'Sambadrome parade tour', 'Sugarloaf Mountain cable car', 'Hang-gliding over Rio', 'Ipanema sunset & caipirinha'],
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800'
  },

  // ══════════════════════════════════════════════
  // ✦  LUXURY  (6 packages)
  // ══════════════════════════════════════════════
  {
    title: 'Amalfi & Monaco Grand Tour',
    destination: 'Amalfi, Capri & Monaco',
    category: 'luxury',
    description: 'The playground of the ultra-wealthy — yacht charter along the Amalfi Coast with a private chef, aperitivo on Capri\'s Piazzetta, casino in Monte Carlo, and a suite at the Hotel de Paris overlooking the Monaco Grand Prix circuit. Pure indulgence, unapologetically.',
    duration: 10,
    price: 385000,
    availableSeats: 4,
    totalSeats: 4,
    isFeatured: true,
    tags: ['yacht', 'casino', 'supercars', 'ultra-luxury'],
    highlights: ['Private yacht charter, Amalfi Coast', 'Blue Grotto, Capri by private boat', 'Monaco Casino evening', 'Michelin 3-star dinner', 'Helicopter transfer, Nice to Monaco'],
    image: 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=800'
  },
  {
    title: 'Bora Bora Overwater Luxury',
    destination: 'Bora Bora, French Polynesia',
    category: 'luxury',
    description: 'The island romance invented. Mount Otemanu reflected in a lagoon of impossible blue, stingrays gliding below your glass floor, breakfast brought by outrigger canoe. Bora Bora exists at the intersection of nature and absolute indulgence.',
    duration: 8,
    price: 295000,
    availableSeats: 6,
    totalSeats: 6,
    isFeatured: false,
    tags: ['overwater', 'honeymoon', 'snorkeling', 'pacific'],
    highlights: ['Overwater bungalow, private lagoon', 'Manta ray & shark lagoon tour', 'Four Seasons private island dinner', 'Mount Otemanu 4WD summit hike', 'Polynesian cultural evening'],
    image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800'
  },
  {
    title: 'Safari & Cape Town Luxury',
    destination: 'Kruger & Cape Town, South Africa',
    category: 'luxury',
    description: 'Big Five in the morning, world-class wine by afternoon. Track lions at dawn in a private game reserve, then fly to Cape Town for the Cape Winelands, Table Mountain, and penguins on the beach. South Africa is Africa\'s most complete luxury destination.',
    duration: 11,
    price: 268000,
    availableSeats: 6,
    totalSeats: 6,
    isFeatured: false,
    tags: ['safari', 'wine', 'big-five', 'penguins'],
    highlights: ['Sabi Sands private game reserve', 'Table Mountain cable car', 'Cape Winelands wine tour', 'Boulders Beach African penguin colony', 'Cape of Good Hope scenic drive'],
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800'
  },
  {
    title: 'Tuscany Villas & Vineyards',
    destination: 'Florence, Siena & Chianti, Italy',
    category: 'luxury',
    description: 'Italy distilled to its absolute essence. Private villa in the Chianti hills, truffle hunting with a Lagotto Romagnolo, wine masterclass at a 500-year-old cantina, Florence\'s Uffizi Gallery after hours, and white truffles shaved over handmade pasta. La dolce vita, completely.',
    duration: 9,
    price: 198000,
    availableSeats: 8,
    totalSeats: 8,
    isFeatured: false,
    tags: ['wine', 'truffle', 'art', 'food'],
    highlights: ['Uffizi Gallery private after-hours tour', 'Chianti truffle hunt & lunch', 'Barolo wine masterclass', 'Siena Palio neighbourhood tour', 'Cooking class with Michelin chef'],
    image: 'https://images.unsplash.com/photo-1543429257-3eb0b9a2db2e?w=800'
  },
  {
    title: 'Kyoto Imperial Luxury',
    destination: 'Kyoto & Hakone, Japan',
    category: 'luxury',
    description: 'Japan\'s ancient capital at its most rarefied — a private geisha dinner in a historic Gion machiya, a traditional tea ceremony in a 400-year-old garden, ryokan with kaiseki cuisine and Mount Fuji views, and a private sunrise viewing at Fushimi Inari before any other visitor arrives.',
    duration: 10,
    price: 245000,
    availableSeats: 6,
    totalSeats: 6,
    isFeatured: true,
    tags: ['geisha', 'ryokan', 'tea-ceremony', 'mount-fuji'],
    highlights: ['Private geisha dinner, Gion', 'Fushimi Inari private sunrise', 'Traditional kaiseki 12-course dinner', 'Mount Fuji panorama, Hakone', 'Kinkaku-ji private access'],
    image: 'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?w=800'
  },
  {
    title: 'Aman Resorts World Tour',
    destination: 'Bali, Sri Lanka & Bhutan',
    category: 'luxury',
    description: 'Three extraordinary countries, three iconic Aman properties — each one architected to disappear into its landscape. Amandari\'s infinity pool over Bali\'s rice terraces, Amanwella\'s coconut-fringed beach in Sri Lanka, and Amankora\'s Himalayan lodges in Bhutan. The pinnacle.',
    duration: 18,
    price: 650000,
    availableSeats: 2,
    totalSeats: 2,
    isFeatured: true,
    tags: ['aman', 'ultra-luxury', 'multi-country', 'once-in-a-lifetime'],
    highlights: ['Three Aman properties, three countries', 'Private butler throughout', 'Tiger\'s Nest helicopter option', 'Sri Lanka leopard safari', 'Bali temple ceremony blessing'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
  },

  // ══════════════════════════════════════════════
  // 🏔  MISC / POLAR / UNIQUE  (5 packages)
  // ══════════════════════════════════════════════
  {
    title: 'Arctic Norway Northern Lights',
    destination: 'Tromsø & Lofoten Islands, Norway',
    category: 'mountain',
    description: 'Above the Arctic Circle where the Northern Lights paint the sky in spectral green. Dog sled through frozen tundra, snowmobile to a glass igloo, sea kayak under the midnight sun in Lofoten\'s impossibly dramatic fjords, and warm up in a Viking longhouse over reindeer stew.',
    duration: 8,
    price: 178000,
    availableSeats: 10,
    totalSeats: 10,
    isFeatured: false,
    tags: ['northern-lights', 'arctic', 'dog-sled', 'fjords'],
    highlights: ['Glass igloo Northern Lights viewing', 'Dog sled Arctic tundra', 'Lofoten sea kayaking', 'Snowmobile Arctic safari', 'Viking history museum'],
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800'
  },
  {
    title: 'Cuba Before It Changes',
    destination: 'Havana & Trinidad, Cuba',
    category: 'cultural',
    description: 'Havana is a time capsule slowly waking — crumbling colonial grandeur, 1950s Chevrolets rolling on cobblestones, son cubano leaking from every doorway, and the best mojitos on Earth mixed by bartenders who\'ve been doing it for fifty years. Go now.',
    duration: 9,
    price: 115000,
    availableSeats: 12,
    totalSeats: 12,
    isFeatured: false,
    tags: ['vintage', 'music', 'mojitos', 'classic-cars'],
    highlights: ['Havana vintage car city tour', 'Salsa lesson with local maestro', 'Viñales tobacco valley ride', 'Trinidad colonial cobblestones', 'Tropicana cabaret show'],
    image: 'https://images.unsplash.com/photo-1500759285222-a95626b934cb?w=800'
  },
  {
    title: 'Mongolia Eagle Hunters',
    destination: 'Ulaanbaatar & Bayan-Ölgii, Mongolia',
    category: 'adventure',
    description: 'The most remote destination on this list and potentially the most extraordinary. Sleep in a ger (yurt) with a Kazakh eagle hunting family, witness the ancient art of berkutchi, gallop across the steppe on Mongolian horses, and sleep under a sky with zero light pollution.',
    duration: 12,
    price: 142000,
    availableSeats: 8,
    totalSeats: 8,
    isFeatured: false,
    tags: ['nomadic', 'eagles', 'horseback', 'remote'],
    highlights: ['Stay with Kazakh eagle hunting family', 'Golden Eagle Festival (October)', 'Horse trekking across steppe', 'Gobi Desert camel ride', 'Ger camp under Milky Way'],
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800'
  },
  {
    title: 'Madagascar Lemur & Baobabs',
    destination: 'Antananarivo & Morondava, Madagascar',
    category: 'wildlife',
    description: 'The eighth continent — an island so isolated that 90% of its species exist nowhere else on Earth. Dance with ring-tailed lemurs in their forest, photograph the Avenue of the Baobabs at sunset, and snorkel reefs around Nosy Be that rival the Maldives.',
    duration: 11,
    price: 148000,
    availableSeats: 8,
    totalSeats: 8,
    isFeatured: false,
    tags: ['lemurs', 'baobabs', 'endemic', 'rare'],
    highlights: ['Ring-tailed lemur forest encounter', 'Avenue of the Baobabs sunset', 'Tsingy limestone formations', 'Nosy Be snorkeling & whale sharks', 'Chameleon night walk'],
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800'
  },
  {
    title: 'Georgia (Caucasus) Hidden Gem',
    destination: 'Tbilisi, Kazbegi & Kakheti, Georgia',
    category: 'cultural',
    description: 'The Caucasus\'s most exciting destination — a medieval city with a thriving arts scene, ancient cave monasteries perched above the clouds, the Caucasus Mountains offering dramatic hiking, and a winemaking tradition 8,000 years old. Georgia is Europe\'s last great secret.',
    duration: 9,
    price: 68000,
    availableSeats: 14,
    totalSeats: 14,
    isFeatured: false,
    tags: ['wine', 'hiking', 'medieval', 'hidden-gem'],
    highlights: ['Gergeti Trinity Church, Kazbegi', 'Vardzia cave monastery complex', 'Kakheti wine region & amber wine', 'Tbilisi Old Town wander', 'Georgian feast (supra) with family'],
    image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800'
  }
]

// ─── COUPONS ─────────────────────────────────────────────────────────────────
const coupons = [
  { code: 'TRAVEL20',   discountPercent: 20, maxUses: 100, expiresAt: new Date('2026-12-31') },
  { code: 'FIRST10',    discountPercent: 10, maxUses: 500, expiresAt: new Date('2026-12-31') },
  { code: 'SUMMER30',   discountPercent: 30, maxUses: 50,  expiresAt: new Date('2026-09-30') },
  { code: 'ADVENTURE15',discountPercent: 15, maxUses: 80,  expiresAt: new Date('2026-12-31') },
  { code: 'LUXURY25',   discountPercent: 25, maxUses: 30,  expiresAt: new Date('2026-12-31') },
  { code: 'WILDLIFE10', discountPercent: 10, maxUses: 120, expiresAt: new Date('2026-12-31') },
]

// ─── RUN SEED ─────────────────────────────────────────────────────────────────
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Connected to MongoDB\n')

    // ── Admin user ──────────────────────────────────────────
    let admin = await User.findOne({ email: 'admin@travelease.com' })
    if (!admin) {
      admin = await User.create({
        name: 'Admin',
        email: 'admin@travelease.com',
        password: 'admin1234',
        role: 'admin'
      })
      console.log('✅ Admin created')
      console.log('   Email    : admin@travelease.com')
      console.log('   Password : admin1234\n')
    } else {
      console.log('✅ Admin already exists — skipping\n')
    }

    // ── Packages ────────────────────────────────────────────
    await Package.deleteMany({})
    const withAdmin = packages.map(p => ({ ...p, createdBy: admin._id }))
    await Package.insertMany(withAdmin)
    console.log(`✅ ${packages.length} packages seeded across 7 categories:`)

    const cats = {}
    packages.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1 })
    Object.entries(cats).forEach(([cat, count]) => {
      console.log(`   ${cat.padEnd(12)} — ${count} packages`)
    })
    console.log()

    // ── Coupons ─────────────────────────────────────────────
    await Coupon.deleteMany({})
    await Coupon.insertMany(coupons)
    console.log('✅ Coupon codes seeded:')
    coupons.forEach(c => {
      console.log(`   ${c.code.padEnd(14)} — ${c.discountPercent}% off`)
    })
    console.log()

    console.log('══════════════════════════════════════')
    console.log('🎉  Seed complete!')
    console.log('══════════════════════════════════════')
    console.log('Run:  npm run dev')
    console.log('Open: http://localhost:5000')
    console.log()

    await mongoose.disconnect()
    process.exit(0)
  } catch (err) {
    console.error('❌ Seed failed:', err.message)
    process.exit(1)
  }
}

seed()