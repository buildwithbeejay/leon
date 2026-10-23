import { Destination, TravelStory, Product } from '../types';
import { pacoImages } from '../assets/images';

export const DESTINATIONS: Destination[] = [
  {
    id: 'machu-picchu',
    name: 'Machu Picchu & Cusco',
    country: 'Peru',
    flag: '🇵🇪',
    lat: -13.1631,
    lng: -72.545,
    heroImage: pacoImages.machuPicchu,
    thumbnail: pacoImages.machuPicchu,
    tagline: 'The Ancestral Highlands & Ancient Clouds',
    season: 'May - October (Dry Andean Season)',
    fluffRating: 5,
    snackScore: 5,
    favoriteSnack: 'Choclo con Queso (Giant Andean Corn & Fresh Cheese)',
    elevation: '2,430 m / 7,972 ft',
    coordinatesLabel: '13°09′48″S 72°32′44″W',
    diarySnippet: 'Returning to the high Andes feels like coming home. The local wild alpacas looked at my knitted headband with mild confusion, but mutual respect was achieved within minutes.',
    fullDiary: `The morning fog rolled off the granite terraces of Huayna Picchu like spun fleece. Being only 8 inches tall made the Inca steps quite a challenge—each stone felt like climbing an entire mountain range! 
    
    When we reached the Sun Gate (Inti Punku), the sun broke through and bathed the citadel in pure gold. I met a herd of local alpacas grazing freely on the agricultural terraces. One named Inti sniffed my backpack, deemed me friendly, and showed me the prime vantage point away from the crowd. Peru is where my spirit resides; there is no feeling quite like watching sunrise over the Sacred Valley with high-altitude wind rustling your wool.`,
    pacoTip: 'Take the altitude seriously! Drink muña (Andean mint) and coca tea, chew slow, and remember that uphill steps take twice as long when your legs are 4 inches tall.',
    packingList: ['Warm knit chullo hat', 'High-SPF nose balm', 'Lightweight waterproof poncho', 'Electrolyte hydration tablets']
  },
  {
    id: 'kyoto',
    name: 'Kyoto & Arashiyama',
    country: 'Japan',
    flag: '🇯🇵',
    lat: 35.0116,
    lng: 135.768,
    heroImage: pacoImages.kyoto,
    thumbnail: pacoImages.kyoto,
    tagline: 'Temple Moss, Cherry Blossoms & Zen Silence',
    season: 'Late March - April (Sakura) or November (Koyo)',
    fluffRating: 5,
    snackScore: 5,
    favoriteSnack: 'Matcha Warabi Mochi & Warm Dango',
    elevation: '50 m / 164 ft',
    coordinatesLabel: '35°00′42″N 135°46′06″E',
    diarySnippet: 'I sat in the stone garden at Ryoan-ji for two straight hours. An elderly monk offered me a tiny wooden crane. I bowed three times until my ears touched the tatami.',
    fullDiary: `Kyoto during peak sakura season is a dream painted in pink. We woke at 5:30 AM to walk through Fushimi Inari before the morning crowds. Thousands of vermilion torii gates winding up the sacred mountain created a rhythmic tunnel of morning light.
    
    In Gion, we stepped into a 200-year-old teahouse. When the matcha master prepared the ceremonial whisked tea, he noticed me peeking out from the front chest pocket of the coat. With utmost seriousness, he set down a miniature lacquer saucer with a single pink sugar drop just for me. True hospitality has no language barrier.`,
    pacoTip: 'Visit the famous bamboo groves and Kiyomizu-dera at first light. By 8:00 AM the magic gives way to tour buses, but at dawn, the rustling bamboo leaves sound like ancient whispers.',
    packingList: ['Easy slip-on walking shoes', 'Coin pouch for temple shrines', 'Furoshiki wrapping cloth', 'Silk pocket scarf']
  },
  {
    id: 'amalfi',
    name: 'Positano & Amalfi Coast',
    country: 'Italy',
    flag: '🇮🇹',
    lat: 40.6281,
    lng: 14.485,
    heroImage: pacoImages.amalfi,
    thumbnail: pacoImages.amalfi,
    tagline: 'Lemon Groves, Pastel Cliffs & Mediterranean Salt',
    season: 'May - June or September (Avoid August heat)',
    fluffRating: 4,
    snackScore: 5,
    favoriteSnack: 'Lemon Granita with fresh brioche & Pistachio Gelato',
    elevation: '15 m / 49 ft',
    coordinatesLabel: '40°37′40″N 14°29′06″E',
    diarySnippet: 'Salt air does wonders for alpaca fleece volume! We hopped onto a vintage wooden ferry from Salerno to Positano and let the sea spray do its magic.',
    fullDiary: `The cliffside drive along the SS163 is not for the faint-hearted, especially when your seat is the dashboard of a Fiat 500! Every hairpin bend reveals pastel villas cascading down to the sparkling cobalt sea.
    
    We stayed in a cliffside home surrounded by terrace gardens smelling of ripe lemons and wild rosemary. In the afternoons, I donned my round sunglasses and lounged on the terracotta ledge beside blooming bougainvillea. A local restaurant owner named Giuseppe came out with freshly churned limoncello sorbet and declared me "Il più soffice viaggiatore d'Italia" (the softest traveler in Italy)!`,
    pacoTip: 'Hike the Path of the Gods (Sentiero degli Dei) from Bomerano to Nocelle. Pack plenty of water, stop for lemonade freshly squeezed by shepherds along the cliffs, and finish with a cold dip at Arienzo beach.',
    packingList: ['Vintage round sunglasses', 'Linen beach towel', 'Sturdy trail trainers', 'Canvas tote bag']
  },
  {
    id: 'paris',
    name: 'Paris & Montmartre',
    country: 'France',
    flag: '🇫🇷',
    lat: 48.8566,
    lng: 2.3522,
    heroImage: pacoImages.paris,
    thumbnail: pacoImages.paris,
    tagline: 'Croissant Crumbs, River Benches & Bohemian Soul',
    season: 'April - June or September - October',
    fluffRating: 4,
    snackScore: 5,
    favoriteSnack: 'Beurre AOP Croissant & Pain au Chocolat',
    elevation: '35 m / 115 ft',
    coordinatesLabel: '48°51′24″N 2°21′07″E',
    diarySnippet: 'I purchased a navy beret in Montmartre. Suddenly waiters in bistro aprons started greeting me with "Bonjour, petit monsieur!" and offering buttered baguettes.',
    fullDiary: `There is no morning ritual on earth quite like sitting at a marble cafe table along the Boulevard Saint-Germain with morning sunlight filtering through chestnut trees. 
    
    We spent an entire Tuesday afternoon wandering along the bouquinistes green book stalls by the Seine, hunting for vintage maps and botanical prints. Later, we climbed the steep cobblestone stairs of Montmartre up to Sacré-Cœur just as the street accordionist began playing. Paris reminds you that the greatest adventures often happen when you have no destination at all.`,
    pacoTip: 'Skip the massive midday line at the Eiffel Tower summit. Instead, pack a picnic of Comté cheese, fresh baguette, and grapes, and relax on the Champ de Mars as the lights sparkle on the hour.',
    packingList: ['Classic wool beret', 'Striped marinière scarf', 'Moleskine sketchbook', 'Small umbrella']
  },
  {
    id: 'swiss-alps',
    name: 'Lauterbrunnen & Zermatt',
    country: 'Switzerland',
    flag: '🇨🇭',
    lat: 46.5935,
    lng: 7.9077,
    heroImage: pacoImages.hero,
    thumbnail: pacoImages.hero,
    tagline: '72 Waterfalls, Alpine Meadows & Icy Peaks',
    season: 'June - September (Wildflowers) or Dec - March (Snow)',
    fluffRating: 5,
    snackScore: 5,
    favoriteSnack: 'Warm Gruyère Raclette & Roasted Hazelnuts',
    elevation: '1,608 m / 5,276 ft',
    coordinatesLabel: '46°35′36″N 7°54′27″E',
    diarySnippet: 'The crisp alpine air makes my fleece puff up to double its normal size! Cowbells clinking in the distance sound like an ongoing symphony.',
    fullDiary: `Lauterbrunnen Valley looks like it fell out of Tolkien’s sketchbook. Vertical limestone cliffs flank the valley floor with dozens of roaring glacial waterfalls plummeting from dizzying heights.
    
    We rode the cogwheel railway up to Kleine Scheidegg right beneath the sheer north face of the Eiger. Sitting on an old sun-bleached wooden bench, watching the golden hour bathe the glacier in apricot and lavender hues, was one of the most grounding moments of my travel life. High mountains have a way of putting every tiny worry in perspective.`,
    pacoTip: 'Purchase a Swiss Travel Pass for limitless scenic train rides. The panoramic window trains from Interlaken to Grindelwald offer views that make you gasp at every turn.',
    packingList: ['Thermal fleece wrap', 'Insulated hot tea flask', 'Swiss army knife keychain', 'Polarized shades']
  }
];

export const TRAVEL_STORIES: TravelStory[] = [
  {
    id: 'machu-picchu-expedition',
    title: 'High-Altitude Heartbeats: How an 8-Inch Alpaca Conquered the Inca Trail',
    slug: 'high-altitude-machu-picchu',
    location: 'Cusco & Machu Picchu',
    country: 'Peru',
    flag: '🇵🇪',
    category: 'Mountain Treks',
    date: 'March 14, 2026',
    readTime: '6 min read',
    image: pacoImages.machuPicchu,
    summary: 'From chewing muña leaves with highland porters to standing nose-to-nose with a wild herd at Dead Woman’s Pass—the story of returning to my Andean roots.',
    fullArticle: {
      lead: 'Every alpaca feels a primordial pull toward the clouds of Cusco. For three years, I had traveled across four continents, but I had never set my tiny wool paws on the sacred stone of my ancestors.',
      sections: [
        {
          heading: 'Acclimatization & Giant Corn',
          content: 'We landed in Cusco at 3,400 meters. The air was thin, sharp, and smelling of eucalyptus woodsmoke. While human travelers were reaching for oxygen tanks, I took a gentle nap inside a woven alpaca pouch. Our first meal was at San Pedro market: giant Andean choclo kernels the size of poker chips paired with salty highland cheese.',
          quote: '“You don’t rush Cusco; Cusco teaches you the rhythm of the mountains.”'
        },
        {
          heading: 'The Summit of Dead Woman’s Pass',
          content: 'At 4,215 meters (Warmiwañusqa), the wind howls like a freight train. The porters, wearing sandals made from recycled tires, cheered when they saw me peeking out from the top zipper of our daypack. When we crested the summit, the clouds parted for thirty seconds to reveal jagged snowcapped peaks piercing a cerulean sky.'
        },
        {
          heading: 'Meeting the Locals',
          content: 'At the ruins of Winay Wayna, a herd of real llamas and alpacas was tending the ancient grass. A curious huacaya alpaca with a topknot that rivaled my own gave me a slow, philosophical stare. We didn’t need words. We both knew the Andean grasses taste sweeter at 8,000 feet.'
        }
      ],
      pacoDosAndDonts: {
        dos: [
          'Spend at least 2 full days resting in Cusco or the Sacred Valley before any hiking.',
          'Bring small soles coins for photos with the Quechua weavers in Chinchero.',
          'Wake up for the first 6:00 AM bus up to Machu Picchu to experience the morning mist.'
        ],
        donts: [
          'Never run up stone steps at 3,500 meters—your lungs will stage an immediate protest.',
          'Do not feed processed human snacks to the wild llamas grazing the terraces.',
          'Never buy synthetic plastic souvenirs when authentic women-led weaving cooperatives exist.'
        ]
      }
    }
  },
  {
    id: 'parisian-croissant-chronicles',
    title: 'The Great Parisian Croissant Heist: A Fluffy Memoir from Saint-Germain',
    slug: 'parisian-croissant-chronicles',
    location: 'Paris',
    country: 'France',
    flag: '🇫🇷',
    category: 'Culinary Quests',
    date: 'February 28, 2026',
    readTime: '5 min read',
    image: pacoImages.paris,
    summary: 'A tiny navy beret, a flaky pastry layered with Brittany butter, and an afternoon eavesdropping on literary debates by the Seine.',
    fullArticle: {
      lead: 'They say Paris is always a good idea, but Paris in the golden chill of early spring with a freshly baked croissant is an absolute moral imperative.',
      sections: [
        {
          heading: 'The Beret Transformation',
          content: 'The moment we purchased a miniature wool beret from a maker in Montmartre, everything changed. In New York, people walk past you. In Paris, waiters adjust your seat at the cafe terrace so you have an unobstructed view of the street fashion.'
        },
        {
          heading: 'The Architecture of Flake',
          content: 'We conducted an uncompromising 7-bakery tasting test across the 5th and 6th arrondissements. The winning croissant came from a tiny boulangerie on Rue Monge. Shards of golden pastry rained down like confetti onto my fleece. It was messy, buttery, and transcendent.',
          quote: '“A croissant without crumbs on your collar is a tragedy of insufficient butter.”'
        },
        {
          heading: 'Twilight at the Pont des Arts',
          content: 'As dusk set in, the Eiffel Tower started its hourly diamond sparkle. A street violinist began playing Debussy’s Clair de Lune. Two students were sharing a bottle of wine on the bridge. I realized then that Paris doesn’t just show you sights; it gives you permission to feel romantic about existence.'
        }
      ],
      pacoDosAndDonts: {
        dos: [
          'Always say “Bonjour Madame/Monsieur” immediately upon entering any Parisian shop.',
          'Order your cafe au lait at the counter (au comptoir) for half the terrace price.',
          'Spend an afternoon getting lost in the Covered Passages (Passages Couverts).'
        ],
        donts: [
          'Never ask for a croissant to go if you have twenty minutes to sit and people-watch.',
          'Do not waste time standing in 3-hour museum queues on sunny days—Paris is the museum.'
        ]
      }
    }
  },
  {
    id: 'kyoto-zen-and-sakura',
    title: 'Whispering Bamboo & Falling Petals: Paco’s Kyoto Temple Diaries',
    slug: 'kyoto-zen-and-sakura',
    location: 'Kyoto',
    country: 'Japan',
    flag: '🇯🇵',
    category: 'Culture & Temples',
    date: 'January 19, 2026',
    readTime: '7 min read',
    image: pacoImages.kyoto,
    summary: 'Learning the discipline of quiet contemplation, ceremonial tea etiquette, and why alpacas naturally excel at slow Zen gardening.',
    fullArticle: {
      lead: 'In a world that constantly rushes to the next notification, Kyoto asks you to do something radical: stop, listen to the water dripping into a stone basin, and notice a single cherry blossom petal touching the ground.',
      sections: [
        {
          heading: 'The Dawn Walk at Fushimi Inari',
          content: 'We arrived at the torii gates at 5:45 AM. The mountain was silent save for the crows and the wind in the cedar trees. As we climbed higher past the fox shrines with their bright red bibs, mist curled through the cedar forest.'
        },
        {
          heading: 'The Geometry of Ryoan-ji',
          content: 'Fifteen stones resting in raked white gravel. No matter where you sit along the temple veranda, you can only see fourteen at once. An elderly Japanese visitor leaned over and whispered that the fifteenth stone can only be seen with your mind’s eye. As an alpaca made of yarn and cotton, I felt that profoundly.',
          quote: '“Silence isn’t empty; it is full of answers you were too loud to hear.”'
        }
      ],
      pacoDosAndDonts: {
        dos: [
          'Take off your shoes quietly and place them facing outward at temple entrances.',
          'Try seasonal sakura soft-serve or roasted hojicha ice cream near the Philosopher’s Path.',
          'Carry a small plastic bag for your trash—public bins are rare in Japan.'
        ],
        donts: [
          'Never chase, touch, or take non-consensual photos of Geiko or Maiko in Gion.',
          'Do not speak loudly on public buses or bullet trains.'
        ]
      }
    }
  },
  {
    id: 'amalfi-cliffside-secrets',
    title: 'Sunsets, Steps & Lemons: The Art of Slow Mediterranean Living',
    slug: 'amalfi-cliffside-secrets',
    location: 'Amalfi Coast',
    country: 'Italy',
    flag: '🇮🇹',
    category: 'Culinary Quests',
    date: 'December 10, 2025',
    readTime: '5 min read',
    image: pacoImages.amalfi,
    summary: 'Trading Andean cold winds for Mediterranean warmth. 1,700 cliffside stairs, giant sfogliatella, and the timeless magic of Positano.',
    fullArticle: {
      lead: 'There are two kinds of people on the Amalfi Coast: those who hurry to catch the next ferry, and those who order another glass of lemon granita and let the boat sail without them. We firmly chose the latter.',
      sections: [
        {
          heading: 'The 1,700 Steps of Positano',
          content: 'Every vertical meter of Positano has been carved into stone over centuries. The walls are covered in magenta bougainvillea and hand-painted ceramic tiles. By midday, the scent of wild oregano and sea salt hangs thick in the air.'
        },
        {
          heading: 'Giuseppe’s Kitchen',
          content: 'At a cliffside trattoria in Praiano, chef Giuseppe brought out a plate of handmade scialatielli pasta tossed with fresh clams and cherry tomatoes. He set me up on a tiny olive wood stand next to the olive oil bottle so I could overlook the Tyrrhenian Sea.',
          quote: '“Life is too short to eat bad tomatoes or rush through Italy.”'
        }
      ],
      pacoDosAndDonts: {
        dos: [
          'Travel between coastal towns by boat instead of the congested narrow road.',
          'Wake up early to catch fishermen bringing in their daily catch at Marina Grande.',
          'Buy hand-painted ceramic tiles directly from local family workshops.'
        ],
        donts: [
          'Don’t bring massive rolling hard-case suitcases—you will carry them up 400 stone stairs.',
          'Never drink a cappuccino after 11:00 AM if you want to respect Italian tradition!'
        ]
      }
    }
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'paco-calendar-2026',
    name: 'The Official 2026 Paco World Travel Calendar',
    priceUSD: 24,
    category: 'Stationery',
    image: pacoImages.calendar,
    badge: 'Best Seller · Limited Edition',
    rating: 4.98,
    reviewCount: 312,
    description: '12 months of wanderlust, joy, and breathtaking photography! Each page features high-gloss archival prints of Paco at iconic landmarks, national holiday notations, monthly alpaca travel wisdom, and secret coordinates.',
    features: [
      'Heavyweight 250gsm FSC-certified textured archival paper',
      'Twin-wire spiral binding with built-in brass wall hook',
      'Exclusive bonus January 2027 pull-out poster',
      '12 QR codes unlocking Paco’s secret audio travel dispatches'
    ],
    inStock: true,
    calendarPreviewMonths: [
      { month: 'January', title: 'Winter Solitude in the Swiss Alps', image: pacoImages.hero },
      { month: 'April', title: 'Sakura Blossoms at Kiyomizu-dera, Kyoto', image: pacoImages.kyoto },
      { month: 'June', title: 'Sunset Terraces of Positano, Amalfi Coast', image: pacoImages.amalfi },
      { month: 'October', title: 'Autumn Fog over Machu Picchu, Peru', image: pacoImages.machuPicchu },
      { month: 'December', title: 'Cafe Lights by the Seine, Paris', image: pacoImages.paris }
    ]
  },
  {
    id: 'pocket-paco-plushie',
    name: 'Handcrafted Pocket Paco Travel Companion',
    priceUSD: 28,
    category: 'Collectibles',
    image: pacoImages.hero,
    badge: '100% Organic Highland Cotton',
    rating: 4.99,
    reviewCount: 640,
    description: 'Your new favorite travel partner! Handcrafted by female artisan cooperatives in the Sacred Valley of Peru using 100% organic cotton and hypoallergenic alpaca fleece. Sits happily in your backpack pocket or on dashboard.',
    features: [
      'Hand-stitched rainbow mini-scarf and removable travel tag',
      '7 inches tall—compact enough to travel carry-on everywhere',
      'Weighted bead bottom so Paco stays upright on rock ledges',
      'Every purchase funds school supplies in highland Andean villages'
    ],
    inStock: true
  },
  {
    id: 'wanderlust-canvas-tote',
    name: '“Fluff & Wander” Heavyweight Field Tote',
    priceUSD: 19,
    category: 'Gear',
    image: pacoImages.amalfi,
    badge: 'Eco-Friendly',
    rating: 4.92,
    reviewCount: 184,
    description: 'Screen-printed on 16oz unbleached organic canvas with reinforced cross-stitched handles and an interior zippered passport pocket. Built for market strolls, beach towels, and world adventures.',
    features: [
      '16oz heavy organic cotton canvas',
      'Interior zip pocket for phone, keys & passport',
      'Antique brass key ring clip inside',
      'Machine washable cold'
    ],
    inStock: true
  },
  {
    id: 'leather-passport-cover',
    name: 'Embossed “World Traveler” Passport Cover',
    priceUSD: 22,
    category: 'Gear',
    image: pacoImages.calendar,
    badge: 'Travel Essential',
    rating: 4.95,
    reviewCount: 220,
    description: 'Rich cognac brown vegan leather with gold foil debossed Paco alpaca silhouette and world compass. Features dual card slots, boarding pass sleeve, and RFID protection.',
    features: [
      'Universal fit for all standard worldwide passports',
      'RFID blocking inner security membrane',
      'Gold foil stamped coordinates and mascot icon',
      'Soft microfiber interior lining'
    ],
    inStock: true
  },
  {
    id: 'vintage-postcard-set',
    name: 'Collector Postcard Box Set (12 Cards + Stamps)',
    priceUSD: 15,
    category: 'Stationery',
    image: pacoImages.paris,
    badge: 'Gift Ready',
    rating: 4.90,
    reviewCount: 95,
    description: 'A curated collection of 12 thick, matte-finish postcards featuring Paco’s journeys through Peru, Japan, France, Italy, Switzerland, and beyond. Packaged in a wax-sealed envelope with decorative travel stickers.',
    features: [
      '350gsm premium cotton stock',
      'Includes 12 gold-foil faux postage stamps',
      'Back printed with vintage postal lines and trivia',
      'Eco-friendly compostable packaging'
    ],
    inStock: true
  },
  {
    id: 'wanderer-enamel-pins',
    name: 'Paco Explorer Enamel Pin Trio',
    priceUSD: 16,
    category: 'Collectibles',
    image: pacoImages.machuPicchu,
    badge: 'Collector Pin',
    rating: 4.96,
    reviewCount: 142,
    description: 'Trio of hard enamel pins with polished gold plating and rubber clutch backs. Includes: Explorer Paco with Backpack, Andean Peak, and “Keep Calm & Fluff On” banner.',
    features: [
      'Hard enamel with polished gold metal finish',
      'Double rubber pin backs to prevent spinning on bags',
      'Presented on illustrated backing card'
    ],
    inStock: true
  }
];

export const VIBE_QUIZ = [
  {
    id: 'rhythm',
    question: 'What is your dream travel cadence?',
    options: [
      { text: 'Slow, contemplative & tea-filled', trait: 'zen', match: 'kyoto' },
      { text: 'Sun-drenched, seaside & gelato-fueled', trait: 'coastal', match: 'amalfi' },
      { text: 'Challenging high-altitude mountain trails', trait: 'adventure', match: 'machu-picchu' },
      { text: 'Cozy cafes, cobblestone streets & bakeries', trait: 'bohemian', match: 'paris' }
    ]
  },
  {
    id: 'snack',
    question: 'Which mid-afternoon snack calls to your soul?',
    options: [
      { text: 'Warm, flaky butter croissant fresh from the oven', trait: 'bohemian', match: 'paris' },
      { text: 'Iced matcha latte with chewy warabi mochi', trait: 'zen', match: 'kyoto' },
      { text: 'Cold lemon sorbet served inside a frozen lemon', trait: 'coastal', match: 'amalfi' },
      { text: 'Roasted Andean maize & mountain herbal tea', trait: 'adventure', match: 'machu-picchu' }
    ]
  },
  {
    id: 'view',
    question: 'What vista makes your heart beat fastest?',
    options: [
      { text: 'Ancient stone ruins floating above emerald clouds', trait: 'adventure', match: 'machu-picchu' },
      { text: 'Pastel villas cascading into turquoise ocean water', trait: 'coastal', match: 'amalfi' },
      { text: 'A thousand vermilion torii gates winding up misty woods', trait: 'zen', match: 'kyoto' },
      { text: 'The Eiffel Tower sparkling under twilight rain', trait: 'bohemian', match: 'paris' }
    ]
  }
];
