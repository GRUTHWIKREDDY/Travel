import { AppContent } from '../types';

export const defaultContent: AppContent = {
  business: {
    name: "SM Tours & Travels",
    contactPerson: "Sonika",
    phone: "+91 8977820246",
    email: "sonika@safarsaarthi.com",
    address: "Moosarambagh, Malakpet, Hyderabad, Telangana 500036",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.0450942095945!2d78.513727!3d17.371217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb98ff4fe39b19%3A0x6e902bcdf3de9e0e!2sMoosarambagh%2C%20Malakpet%2C%20Hyderabad%2C%20Telangana%20500036!5e0!3m2!1sen!2sin!4v1717650000000!5m2!1sen!2sin",
    whatsappNumber: "+918977820246",
    defaultWhatsappMessage: "Hello SM Tours & Travels, I would like to know more about your travel packages and services."
  },
  hero: {
    title: "Crafting Your Perfect Journeys",
    subtitle: "Experience luxury travel curation, seamless flight bookings, and hassle-free visa processed by experts. Your travel, our passion.",
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80"
  },
  profile: {
    history: "Founded in Hyderabad, SM Tours & Travels has emerged as a premier travel boutique designed to provide seamless end-to-end travel experiences. Guided by our founder Sonika, we started with a mission to simplify travel logistics for domestic and international explorations. Over the years, we have built strong associations with airline operators, luxury hotel chains, and visa processing consulates. Today, we stand as a trusted travel companion for families, corporate professionals, and honeymooners looking for exceptional, curated adventures.",
    mission: "To deliver hassle-free, premium, and personally vetted travel solutions—from flight tickets and robust tour itineraries to complex visa validations—ensuring ultimate convenience, luxury service, and beautiful lifetime memories.",
    vision: "To evolve into India's leading technology-backed personalized travel platform, where luxury curation meets automated booking precision, without losing the human warmth that defines exceptional travel guidance.",
    commitment: "We commit to absolute pricing transparency, round-the-clock emergency travel support, rigorous quality standards for all international and domestic flight options, and personalized itinerary modifications to suit unique traveler paces."
  },
  packages: [
    {
      id: "pkg-kashmir",
      title: "Kashmir Delight: Heaven on Earth",
      description: "Immerse yourself in the serene beauty of Srinagar, Pahalgam, and Gulmarg. Experience an authentic luxury houseboat stay on Dal Lake, walk past beautiful Mughal Gardens, and enjoy a thrilling gondola ride surrounded by snow-capped peaks.",
      imageUrl: "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&w=800&q=80",
      duration: "5 Nights / 6 Days",
      price: "₹24,999 onwards",
      highlights: [
        "Luxury Houseboat Stay on serene Dal Lake",
        "Scenic Shikara Ride in Srinagar at Sunset",
        "Gulmarg Gondola Ride (Asia's highest cable car)",
        "Excursion to beautiful Betaab & Aru Valleys in Pahalgam",
        "Premium Private AC Vehicle transfers"
      ],
      category: "domestic",
      isPopular: true,
      rating: 4.8,
      itinerary: [
        { day: 1, title: "Srinagar Arrival & Scenic Sunset Shikara Ride", activities: "Touch down at Srinagar airport where your luxury Chauffeur awaits. Experience a warm traditional welcome before checking in to your premium decorated wooden Houseboat anchored on Dal Lake. In the evening, drift across the pristine waters on an authentic Gondola-style Shikara ride as the sun sets over the snow-kissed Pir Panjal mountains." },
        { day: 2, title: "Mughal Gardens & Historical Srinagar Sightseeing", activities: "Savor a fresh lakeside Kashmiri breakfast. Drive down the boulevard to explore the magnificent terraced gardens—Nishat Bagh (Garden of Pleasure) and Shalimar Bagh (Abode of Love)—replete with water fountains, vibrant rose bushes, and towering chinar trees, followed by a visit to the ancient Shankaracharya Hill temple." },
        { day: 3, title: "Scenic Drive to Snowy Gulmarg & Gondola Ascent", activities: "Embark on an enchanting drive to Gulmarg ('Meadow of Flowers'). Walk through sprawling pine forests and ascend the skies with the world-famous Gulmarg Gondola Ride (Phase 1 & 2), soaring over 13,000 feet to witness breathtaking panoramic views of the high Himalayan peaks." },
        { day: 4, title: "Saffron Fields Drive to Pahalgam (Valley of Shepherds)", activities: "Journey to Pahalgam, stopping along the highway to breathe in the aroma of blooming purple Saffron fields in Pampore. Cross the scenic ruins of Avantipur temples. Upon checking in at your luxury valley resort, relax by the roaring, turquoise Lidder River." },
        { day: 5, title: "Exquisite Betaab, Aru & Chandanwari Valley Excursions", activities: "Board custom local mountain vehicles to explore the raw untouched valleys of Kashmir. Visit Betaab Valley (named after the famous Bollywood film), hike across beautiful meadows in Aru Valley, and wander near frozen glaciers at Chandanwari, the historical gateway of the holy Amarnath Yatra." },
        { day: 6, title: "Pre-morning Srinagar Return & Fly Back to Hyderabad", activities: "Say goodbye to the magical valley. Transfer from Pahalgam back to Srinagar Airport for your return domestic flight pre-booked by Sonika. Return home with beautiful memories of absolute paradise." }
      ]
    },
    {
      id: "pkg-kerala",
      title: "Kerala Backwaters & Mist-Clad Munnar",
      description: "Discover Munnar's iconic lush tea plantations, watch classical Kathakali performances, and stay in an exquisite private luxury houseboat cruising through the tranquil, palm-fringed backwaters of Alleppey.",
      imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
      duration: "6 Nights / 7 Days",
      price: "₹18,500 onwards",
      highlights: [
        "Premium Tea Garden Walk and spice plantation tours",
        "Private Air-Conditioned Houseboat stay in Alleppey",
        "Scenic mist views and waterfalls of Valara & Cheeyappara",
        "Wildlife exploration at Periyar Lake in Thekkady",
        "All traditional gourmet Kerala dinners included"
      ],
      category: "domestic",
      isPopular: true,
      rating: 4.9,
      itinerary: [
        { day: 1, title: "Cochin Arrival & Mountain Ascent to Munnar", activities: "Land at Cochin International Airport. Get picked up in a luxury private car and commence a scenic, winding ascent to the mist-laden hills of Munnar. Stop along the route to capture photographs at Valara and Cheeyappara waterfalls tumbling down rich emerald cliffs." },
        { day: 2, title: "Munnar Tea Gardens Exploration & Spice Hike", activities: "Wander through the endlessly rolling, emerald Munnar Tea Estates. Take a guided tour showing the processing of tea leaves, hike through an organic spice garden smelling pure black pepper and cardamom cloves, and visit Mattupetty Dam to spot wild elephants drinking at the lake edge." },
        { day: 3, title: "Eravikulam Alpine Sanctuary & Nilgiri Tahr Walk", activities: "Explore the misty heights of Eravikulam National Park (Rajamalai). Climb aboard forest shuttle vans to view the rare, endangered Nilgiri Tahr mountain goats grazing peacefully. Witness panoramic mountain vistas engulfed in drifting clouds." },
        { day: 4, title: "Drive to Thekkady Wilderness & Kathakali Performing Arts", activities: "Travel along winding spice routes to Thekkady. Take a serene afternoon boat safari over the Periyar Wildlife Sanctuary lake to spot wild boars, bison, and exotic birds. In the evening, appreciate a live, high-energy Kathakali traditional dance drama." },
        { day: 5, title: "Scenic Journey to Alleppey & Houseboat Boarding", activities: "Drive down to Alleppey, the 'Venice of the East'. Board your private luxury floating Houseboat. Sail across water lily-laden canals, observe rustic local villages, and relish authentic Kerala meals freshly prepared on-board by your private chef." },
        { day: 6, title: "Marari Beach Tranquility & Cherai Sunset Walk", activities: "Disembark from your houseboat and transfer to Marari or Cherai Beach resort. Spend a leisurely day swinging on coconut tree hammocks, feeling the warm Arabian Sea sands, and enjoying an evening seafood dinner adjacent to the splashing waves." },
        { day: 7, title: "Classical Kochi City Tour & Return Flight", activities: "Explore historical Fort Kochi: photograph the giant ancient Chinese Fishing Nets, wander around Jewish Synagogue streets, and buy aromatic spices before catching your evening flight back from Cochin Airport." }
      ]
    },
    {
      id: "pkg-goa",
      title: "Goa Beach Escape & Heritage Trails",
      description: "Relax on golden shoreline beaches, visit historic Portuguese cathedrals, taste delicious sea-to-table cuisine, and enjoy water sports in our handpicked beachside resort packages.",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      duration: "3 Nights / 4 Days",
      price: "₹12,499 onwards",
      highlights: [
        "Handpicked 4-Star Beachfront Resort with Swimming Pool",
        "Half-day tours of old UNESCO churches & Basilica of Bom Jesus",
        "Sunset River Cruise across Mandovi River with live music",
        "Thrilling water sports at Calangute Beach",
        "Welcome drinks & complimentary breakfast buffet"
      ],
      category: "domestic",
      isPopular: false,
      rating: 4.6,
      itinerary: [
        { day: 1, title: "Goa Flight Arrival & Beachside Check-in", activities: "Touch down at Mopa/Dabolim Goa airport. Transfer straight to your premium beachfront resort. Unwind under shading cabana gazebos with refreshing mocktails, and step out in the evening to explore the lively beach shacks of Baga or Calangute." },
        { day: 2, title: "Old Goa UNESCO Heritage Tour & Mandovi Cruise", activities: "Journey into Old Goa's rich colonial history. Walk inside the awe-inspiring Basilica of Bom Jesus, which houses the sacred relics of St. Francis Xavier. In the twilight, enjoy a scenic cruise down the beautiful Mandovi River with live Goan folk music and dances." },
        { day: 3, title: "Calangute Adrenaline Watersports & Flea Market", activities: "Get ready for water thrills! Indulge in an action-packed watersports session including speed boating, jet-skiing, and parasailing at Calangute Beach under expert guidance. Later, shop for funky souvenirs, shell necklaces, and boho outfits at the Anjuna flea market." },
        { day: 4, title: "Traditional Spice Farm Lunch & Airport Sayonara", activities: "Visit an ancient Goan Organic Spice Plantation. Enjoy a traditional welcome, take a guided herbal walk, feast on a traditional buffet cooked in clay pots, and check in at the airport for your flight home." }
      ]
    },
    {
      id: "pkg-rajasthan",
      title: "Rajasthan Heritage Tour of Royals",
      description: "Travel through Jaipur, Jodhpur, and Udaipur to unlock majestic forts, luxury palaces, desert dunes, and authentic folklore music under the starry skies.",
      imageUrl: "https://images.unsplash.com/photo-1477584308802-e26c7136d833?auto=format&fit=crop&w=800&q=80",
      duration: "6 Nights / 7 Days",
      price: "₹21,999 onwards",
      highlights: [
        "Unforgettable camel safari and overnight camp in Sam Sand Dunes",
        "Private boat cruise on Lake Pichola in Udaipur",
        "Guided heritage walks inside Amer Fort & Mehrangarh Fort",
        "Stay at signature Royal Haveli converted heritage boutique hotels",
        "Authentic Rajasthani feast (Dal Baati Churma) included"
      ],
      category: "domestic",
      isPopular: false,
      rating: 4.7,
      itinerary: [
        { day: 1, title: "Arrive in Jaipur - The Pink City of Maharajas", activities: "Begin your royal odyssey upon arrival in Jaipur. Check in to your heritage hotel. Visit the unique, honeycombed Hawa Mahal (Palace of Winds) and indulge in an authentic Rajasthani village dinner show at Chokhi Dhani." },
        { day: 2, title: "Amer Fort Hill Climb & City Palace Museums", activities: "Climb Jaleb Chowk at Amer Fort. Explore the magnificent Sheesh Mahal (Mirror Palace) shimmering in candlelight. Later, visit the spectacular City Palace Museum and the cosmic Jantar Mantar astronomical observatory." },
        { day: 3, title: "Drive to Blue-Tinged Jodhpur & Mehrangarh Fort", activities: "Travel across Rajasthan to the blue-colored city, Jodhpur. Gaze up at the formidable Mehrangarh Fort towering on rocky cliffs. Explore the beautiful Jaswant Thada white marble memorial and colorways of Sadar Bazaar." },
        { day: 4, title: "Scenic Highway to Romantic Udaipur (The Venice of East)", activities: "Drive south through the Aravalli range with a stopover at the stunning 1,444-pillar Ranakpur Jain Temple. Arrive in the romantic lake city, Udaipur, and check in to your resort near Lake Pichola." },
        { day: 5, title: "Udaipur Lakes Tour & Sunset Boat Cruise", activities: "Explore the vast, magnificent City Palace complex overlooking Lake Pichola. Visit the decorative Saheliyon-ki-Bari gardens, and enjoy a private sunset cruise past the dreamy Lake Palace floating on water." },
        { day: 6, title: "Sam Sand Dunes Desert Safari & Thar Night Camp", activities: "Drive into Jaisalmer/Thar region. Ride camels into the golden Sam Sand Dunes to catch a spectacular desert sunset. Dine on heritage hot meals while folk musicians and fire dancers perform adjacent to a high bonfire." },
        { day: 7, title: "Fort Shopping & Departure Flight Transfer", activities: "Check out from your desert camp, shop for gorgeous bandhani textiles and leather crafts, and catch your return flight home from Udaipur/Jodhpur Airport." }
      ]
    },
    {
      id: "pkg-andaman",
      title: "Andaman Adventure & Coral Wonders",
      description: "Explore the untouched white sands of Radhanagar Beach on Havelock Island, and snorkel among vibrant coral reefs in the crystal-clear turquoise waters of Neil Island.",
      imageUrl: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
      duration: "5 Nights / 6 Days",
      price: "₹28,500 onwards",
      highlights: [
        "High-Speed private Makruzz Cruise to Havelock & Neil Island",
        "Tours of historic Cellular Jail & spectacular Light and Sound Show",
        "Snorkeling session with certified instructors in Coral Reefs",
        "Relaxation at UNESCO top-ranked Radhanagar Beach",
        "Candlelight beach Side dinner for couples"
      ],
      category: "domestic",
      isPopular: true,
      rating: 4.9,
      itinerary: [
        { day: 1, title: "Port Blair Arrival & Cellular Jail Light Show", activities: "Fly into Port Blair. Visit the national heritage site Cellular Jail (Kala Pani) and learn about the struggles of Indian freedom fighters in a deeply moving evening Light and Sound Show." },
        { day: 2, title: "High-Speed Makruzz Cruise to Havelock Island", activities: "Board the luxury private high-speed Makruzz catamaran cruise to Havelock Island. Check in to your tropical beachfront resort. Experience a magical sunset at Radhanagar Beach, rated as Asia's finest stretch of white-packed sand." },
        { day: 3, title: "Elephant Beach Snorkeling & Coral Treasures", activities: "Embark on a dynamic boat ride to Elephant Beach. Put on snorkel masks to discover underwater coral colonies, rare clownfish, and marine life under the supervision of your expert guide." },
        { day: 4, title: "Tropical Cruise to Neil Island & Natural Bridge", activities: "Sail further to Neil Island. Wander over to Bharatpur Beach for glass-bottom boat rides, explore the unique natural coral rock archway (Howrah Bridge), and enjoy the sunset at Lakshmanpur Beach." },
        { day: 5, title: "Return to Port Blair & Souvenir Gathering", activities: "Take your return cruise to Port Blair. Enjoy an active evening shopping tour for decorative sea-shell lamps, bamboo crafts, and pearl jewelry." },
        { day: 6, title: "Departure Flight from Andaman Islands", activities: "Transfer to Port Blair's Veer Savarkar Airport with scenic final views and capture photos before taking your flight back to Hyderabad." }
      ]
    },
    {
      id: "pkg-ladakh",
      title: "Ladakh Leh Odyssey & High Passes",
      description: "Embark on an adventure of a lifetime. Drive through the scenic Khardung La Pass, interact with warm Tibetan monks, and marvel at the salt water Pangong Lake altering colors.",
      imageUrl: "https://images.unsplash.com/photo-1626082895617-2c6de34faf5e?auto=format&fit=crop&w=800&q=80",
      duration: "6 Nights / 7 Days",
      price: "₹31,000 onwards",
      highlights: [
        "Exquisite view of Pangong Tso Lake from luxury tent camps",
        "Interactive walk in Nubra Valley & double-humped camel ride",
        "Passage across Khardung La Pass (one of highest motorable roads)",
        "Visits to peaceful Thiksey and Hemis Monasteries",
        "Local Oxygen cylinder kits on-call inside private vehicles"
      ],
      category: "domestic",
      isPopular: false,
      rating: 4.8,
      itinerary: [
        { day: 1, title: "Landing in Leh & Acclimatization Rest Day", activities: "Touch down at Leh Airport. Check in to your cozy town hotel. Due to the high altitude of Leh (11,500 feet), spend your entire first day resting and hydrating to adapt smoothly to the rarefied atmosphere." },
        { day: 2, title: "Magnetic Hill, Sangam Rivers & Hall of Fame Museum", activities: "Witness the gravity-defying Magnetic Hill where cars roll uphill on neutral gear. Photo-capture the majestic Sangam (confluence of Indus and Zanskar rivers) and pay homage to legendary soldiers at the Kargil War Memorial Hall of Fame." },
        { day: 3, title: "Leh to Nubra Valley via the Khardung La Pass", activities: "Drive up the high mountains. Cross the iconic Khardung La Pass, located at an altitude of 17,582 feet. Descend into the scenic sand dunes of Nubra Valley and check in to your adventure camp." },
        { day: 4, title: "Hunder Sand Dunes Bactrian Camel Ride & Diskit", activities: "Climb aboard the rare double-humped Bactrian Camels at Hunder sand dunes. Visit the majestic Diskit Monastery to stand beneath the gigantic 106-foot statue of the Maitreya Buddha facing the valley." },
        { day: 5, title: "Shyok River Ride to Deep Blue Pangong Tso Lake", activities: "Traverse alongside the sparkling Shyok River to reach Pangong Tso, a breathtaking salt-water lake split between India and China. Watch the lake water paint itself in shifting shades of neon blue, turquoise, and violet under the afternoon sun." },
        { day: 6, title: "Pangong Sunrise Shoot & Return to Leh Town", activities: "Wake up early for a spectacular sunrise photo-shoot across the peaceful salt lake. Drive back to Leh via Chang La Pass (17,590 ft), stopping to purchase woolens at local craft bazaars." },
        { day: 7, title: "Departure Transfer to Kushok Bakula Airport", activities: "Unwind your Himalayan adventure as you transfer to Leh airport for your morning departure flight, taking in the snowy peaks from your aircraft window." }
      ]
    },
    {
      id: "pkg-dubai",
      title: "Dubai Explorer: Futuristic Luxury",
      description: "Step into modern opulence. Ascend the world's tallest tower, the Burj Khalifa, witness the dancing fountains, and enjoy a thrilling desert safari followed by an Arabic BBQ dinner.",
      imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      duration: "4 Nights / 5 Days",
      price: "₹45,999 onwards",
      highlights: [
        "Burj Khalifa 124th floor entry tickets with observatory deck",
        "Thrilling 4x4 Land Cruiser desert dune-dashing adventure",
        "BBQ dinner, belly dance, and Tanoura show under desert stars",
        "Traditional Creek Dhow Cruise with international buffet",
        "Half-day Dubai city tour covering Gold Souk & Marina"
      ],
      category: "international",
      isPopular: true,
      rating: 4.9,
      itinerary: [
        { day: 1, title: "Arrival in Dubai & Romantic Marina Dhow Cruise", activities: "Fly into Dubai International Airport. In the evening, board an illuminated double-decker wooden Dhow Cruise sailing past the glittering skyscrapers of Dubai Marina, while enjoying a gourmet dinner." },
        { day: 2, title: "Dubai City Tour & High-Altitude Burj Khalifa", activities: "Take a city tour of Jumeirah Mosque, Burj Al Arab backdrop, and the Palm Islands. Elevate to the 124th Observatory Deck of Burj Khalifa—the world's tallest structure—to witness the spectacular dancing fountains." },
        { day: 3, title: "Thrilling Desert Sand Dune Safari & BBQ Camp", activities: "In the afternoon, board a 4x4 Land Cruiser. Experience adrenaline-pumping sand dune bashing over red desert peaks. Arrive at a traditional Bedouin camp for camel riding, sandboarding, live belly dancing, and an authentic barbecue feast." },
        { day: 4, title: "Museum of Future & Atlantis Aquaventure Waterpark", activities: "Step into tomorrow at the breathtaking Museum of the Future. Spend your afternoon catching massive pool waves and water rides inside the premium Atlantis Aquaventure theme park on Palm Jumeirah." },
        { day: 5, title: "Gold Souk Shopping & Flight to Hyderabad", activities: "Walk past the sprawling storefronts of the Gold Souk and Spice Souk. Pick up luxury dates and perfumes before catching your return flight from Dubai." }
      ]
    },
    {
      id: "pkg-thailand",
      title: "Thailand Escape: Islands & Temples",
      description: "Blend the high-energy luxury shopping of Bangkok with pristine crystal blue waters of Phuket and Phi Phi Island. A tropical paradise loaded with rich cultural temples.",
      imageUrl: "https://images.unsplash.com/photo-1528181304800-2f190854897d?auto=format&fit=crop&w=800&q=80",
      duration: "5 Nights / 6 Days",
      price: "₹32,500 onwards",
      highlights: [
        "Premium Speedboat tour to Phi Phi islands with buffet lunch",
        "Fascinating Bangkok Temple tour (Golden Buddha & Wat Pho)",
        "Standard 4-Star hotels with daily breakfast arrays",
        "Convenient private airport pick-ups and drops",
        "Exclusive shopping vouchers for major Bangkok malls"
      ],
      category: "international",
      isPopular: true,
      rating: 4.7,
      itinerary: [
        { day: 1, title: "Fly to Phuket & Sunset Seaside Leisure", activities: "Arrive in Phuket. Check in to your tropical beachfront resort. Take a relaxing evening stroll along the sand at Patong Beach, stopping for tropical mocktails and local street-style pancakes." },
        { day: 2, title: "Premium Speedboat Tour of Phi Phi Islands", activities: "Board a high-power twin-engine speedboat. Snorkel inside Maya Bay (where 'The Beach' was filmed), watch wild monkeys at Monkey Beach, jump into Pileh Lagoon, and feast on a beach buffet lunch." },
        { day: 3, title: "Phuket Cultural Tour & Tiger Kingdom Visit", activities: "Explore the giant hill-top Big Buddha temple with scenic 360-degree views of the island. Walk around historical old Phuket town Sino-Portuguese streets and optionally visit the Tiger Kingdom." },
        { day: 4, title: "Fly to High-Life Bangkok & Chao Phraya River Cruise", activities: "Catch a quick domestic flight to Bangkok. In the evening, sail on the luxury Grand Pearl Cruise down the historical Chao Phraya River, feasting on international buffet courses under the stars." },
        { day: 5, title: "Bangkok Temples Tour & Platinum Mall Shopping", activities: "Visit Wat Traimit to view the solid 5.5-ton Golden Buddha, marvel at the Reclining Buddha at Wat Pho, and shop at MBK Center and Platinum Fashion Mall." },
        { day: 6, title: "Bangkok Departure to Hyderabad Airport", activities: "Have a delicious hot breakfast before taking your private airport transfer to Suvarnabhumi Airport for your flight back to India." }
      ]
    },
    {
      id: "pkg-bali",
      title: "Bali Honeymoon & Ubud Cultural Retreat",
      description: "Stay in private pool villas overlooking terraced rice paddies. Chase hidden waterfalls, watch traditional fire dances on Tanah Lot cliffs, and swinging at famous Bali swings.",
      imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      duration: "6 Nights / 7 Days",
      price: "₹38,000 onwards",
      highlights: [
        "2 Nights Luxury private pool villa stay in Ubud",
        "Full-day Kintamani Volcano & spectacular Mount Batur tour",
        "Instagram tour including Lempuyang Temple (Gates of Heaven)",
        "Traditional Balinese couple massage at premium spa",
        "Waterworks explorations at Tanah Lot and Nusa Penida Island"
      ],
      category: "international",
      isPopular: true,
      rating: 4.9,
      itinerary: [
        { day: 1, title: "Ngurah Rai Landing & Private Ubud Pool Villa", activities: "Arrive in Bali. Meet your personal guide and check in to an exquisite private Pool Villa in Ubud, framed by lush tropical jungle and tranquil terraced paddy fields." },
        { day: 2, title: "Ubud Monkey Forest Walk & Bali Swings Adventure", activities: "Walk past ancient trees in the sacred Ubud Monkey Forest. Visit Tegallalang Rice Terrace and buckle up to swing high above the palm valley on the famous Bali Swing." },
        { day: 3, title: "Kintamani Volcano Overlook & Mount Batur Springs", activities: "Marvel at the active Mount Batur Volcano and Lake Batur from Kintamani peak. Soak in healing volcanic natural hot springs pools later in the afternoon." },
        { day: 4, title: "Kelingking Beach Expedition in Nusa Penida", activities: "Board a private speedboat to Nusa Penida Island. Capture the famous T-Rex-shaped cliff at Kelingking Beach, swim at Angel's Billabong, and snorkel with giant manta rays." },
        { day: 5, title: "Lempuyang Temple Gates of Heaven & Tirta Gangga", activities: "Stand at Lempuyang Temple's 'Gates of Heaven' with Mt. Agung reflecting in the glass. Walk past koi fish pools at the historical royal water palace, Tirta Gangga." },
        { day: 6, title: "Couple Flower Botanical Spa & Tanah Lot Sunset", activities: "Indulge in a 2-hour signature Couple's Balinese Spa with flower-infused baths. End your day visiting Tanah Lot Temple perched on a massive sea rock surrounded by crashing waves." },
        { day: 7, title: "Krisna Shopping & Afternoon Departure Fly-Out", activities: "Buy authentic local coffee, batik clothes, and wooden crafts at Krisna Outlet before taking your airport shuttle for your return flight." }
      ]
    },
    {
      id: "pkg-singapore",
      title: "Singapore Family Tour & Cruise Extravaganza",
      description: "A futuristic retreat for the family. Marvel at the supertrees of Gardens by the Bay, scream with joy at Universal Studios, and walk in the world-class Changi Jewel waterfall complex.",
      imageUrl: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
      duration: "4 Nights / 5 Days",
      price: "₹49,999 onwards",
      highlights: [
        "Universal Studios Singapore full day adventure tickets",
        "Double dome visit to Gardens by the Bay (Flower & Cloud Forest)",
        "Night Safari tour with luxury tram ride guided in English",
        "Scenic Sentosa Island cable car with Madame Tussauds entry",
        "Complimentary Singapore tourist eSIM cards for connectivity"
      ],
      category: "international",
      isPopular: false,
      rating: 4.8,
      itinerary: [
        { day: 1, title: "Changi Jewel Trek & Night Safari Thrills", activities: "Arrive at Changi Airport and see the majestic Rain Vortex, the world's tallest indoor waterfall. In the evening, explore the world's first Night Safari, boarding open trams to witness active nocturnal jungle predators." },
        { day: 2, title: "Universal Studios Singapore Full-Day Adventure", activities: "Spend a thrilling day at Sentosa's Universal Studios! Ride the world's tallest dueling roller coasters (Battlestar Galactica), meet Madagascar characters, and dive into 3D cinematic rides." },
        { day: 3, title: "Sentosa Island Cable Car, SEA Aquarium & Wings of Time", activities: "Ride the scenic cable car from Mt. Faber. Visit the vast SEA Aquarium holding massive manta rays and hammerhead sharks. In the evening, enjoy the Wings of Time water, laser, and fire light show." },
        { day: 4, title: "Gardens by the Bay Cloud Forest & Marina Bay Sands", activities: "Explore Gardens by the Bay's incredible Flower Dome and misty Cloud Forest containing a 35-meter indoor mountain. Walk across the Marina Bay Sands SkyPark observatory deck for sprawling metropolis skyline views." },
        { day: 5, title: "Merlion Park Shoot & Flight back to Hyderabad", activities: "Gather for photos at the iconic half-lion, half-fish Merlion statue. Wrap up shopping for electronics and Swiss chocolates at Mustafa Centre before your departure flight of SM Tours." }
      ]
    },
    {
      id: "pkg-europe",
      title: "Europe Highlights: Alpine Peaks & Historic Capitals",
      description: "Traverse the magical capitals of Western Europe. Glide along the romantic Parisian Seine River, scale the snowy peaks of Mount Titlis in Switzerland, and explore Venetian waterways.",
      imageUrl: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=800&q=80",
      duration: "9 Nights / 10 Days",
      price: "₹1,85,000 onwards",
      highlights: [
        "Eiffel Tower 2nd Floor tickets and dreamy Seine Cruise",
        "Switzerland Jungfrau or Titlis mountain excursion by cable car",
        "Gondola ride through picturesque canals of Venice, Italy",
        "Schengen visa guidance and processing voucher support",
        "Inter-city high speed business-class Eurail journeys included"
      ],
      category: "international",
      isPopular: true,
      rating: 4.9,
      itinerary: [
        { day: 1, title: "Bonjour Paris! Luxury Seine River Sunset Cruise", activities: "Arrive at Charles de Gaulle Airport Paris. Get transported in comfort to your executive hotel. In the evening, drift along the romantic Seine River on a glass-dome cruise viewing illuminated monuments like Notre Dame and the Eiffel Tower." },
        { day: 2, title: "Eiffel Tower Ascent, Louvre Museum & Champs-Élysées", activities: "Ascend to the second floor of the legendary Eiffel Tower to marvel at the Parisian landscape. Take a curated walking tour of the historical Louvre Museum to see the classic Mona Lisa, and explore the avenue des Champs-Élysées." },
        { day: 3, title: "High-Speed Eurail to Switzerland (Interlaken)", activities: "Board a premium high-speed TGV Lyria train crossing borders into Switzerland. Journey through breathtaking Swiss countryside, past clear blue lakes, wooden chalets, and rising mountain ranges to reach Interlaken." },
        { day: 4, title: "Mount Titlis Snow Excursion & Engelberg Cable Car", activities: "Climb Engelberg's glaciers. Ascend via the world's first rotating cable car (TITLIS Rotair) to the snow-covered summit. Cross the terrifying Titlis Cliff Walk rope-bridge suspends 10,000 feet in the skies." },
        { day: 5, title: "Jungfraujoch - Top of Europe Mountain Cogwheel Rail", activities: "Board an alpine cogwheel train to Jungfraujoch, the highest railway station in Europe. Experience a white winter wonderland, explore walk-through ice palaces, and step onto Sphinx Observatory decks." },
        { day: 6, title: "Scenic Swiss Trans-Continental Rail to Venice (Italy)", activities: "Cross gorgeous Italian Swiss lakes on credit routes via Milan to reach the canal city of Venice. Check in to your Venetian boutique hotel and enjoy authentic artisan pasta courses." },
        { day: 7, title: "Venice Canal Gondola Ride & Historic St. Mark's Square", activities: "Glide along quiet Venetian canals inside an authentic hand-carved gondola. Walk across St. Mark's Square, photograph Doge’s Palace, and visit a live Murano glass blowing workshop." },
        { day: 8, title: "Frecciarossa Train to Rome (The Eternal Ancient Capital)", activities: "Board a high-speed Italian Frecciarossa train to Rome. Check in to your central city hotel, and walk over to marvel at the spectacular Baroque Trevi Fountain at night." },
        { day: 9, title: "Colosseum Roman Walk & Vatican Sistine Chapel Tour", activities: "Skip-the-line to explore the Colosseum amphitheater of ancient gladiators. In the afternoon, cross borders into the sovereign Vatican City, exploring St. Peter’s Basilica and the Michelangelo-painted Sistine Chapel." },
        { day: 10, title: "Rome Departure Transfer to Hyderabad Flight", activities: "Savor a fresh macchiato and cornetto croissant before transferring to Rome Fiumicino Airport for your flight back home." }
      ]
    },
    {
      id: "pkg-maldives",
      title: "Maldives Luxury Resort & Overwater Retreat",
      description: "Experience absolute paradise. Wake up in a private overwater bungalow on a pristine private island, step into the ocean to swim with colorful sea turtles, and dine under spectacular stars.",
      imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
      duration: "4 Nights / 5 Days",
      price: "₹89,999 onwards",
      highlights: [
        "Premium All-Inclusive meal options (Unlimited beverages & meals)",
        "Complimentary high-speed speedboat or seaplane transfers",
        "Overwater Villa with private lagoon steps directly to ocean",
        "Complimentary snorkeling gear & kayaking rentals",
        "Champagne welcoming basket upon check-in"
      ],
      category: "international",
      isPopular: false,
      rating: 4.8,
      itinerary: [
        { day: 1, title: "Malé Arrival & Speedboat Transfer to Island Villa", activities: "Land at Velana International Airport in Malé. Board your high-speed resort speedboat and watch deep oceans fade into beautiful turquoise lagoons. Check in to a luxurious Overwater Villa with steps descending directly into the warm water." },
        { day: 2, title: "Coral Snorkeling Safari & Swimming with Sea Turtles", activities: "Strap on complimentary masks and fins. Swim directly from your villa deck into the house coral reef to encounter friendly sea turtles, colorful anemone clusters, and harmless reef sharks." },
        { day: 3, title: "Sunset Dolphin Sightseeing Cruise & Beachside Dining", activities: "Embark on an open catamaran boat cruise to spot hundreds of spinner dolphins jumping in the ocean waves. In the evening, enjoy a private candlelight seafood dinner directly on the sandy beach." },
        { day: 4, title: "Resort Wellness Massage & Lagoon Paddleboarding", activities: "Pamper yourself with a 60-minute signature Balinese massage at the oceanfront spa bungalow. In the afternoon, enjoy paddleboarding, windsurfing, or kayaking in the lagoon." },
        { day: 5, title: "Island Departure Flight Back to India", activities: "Pack your bags, take a final swim in the pool, and ride the speedboat back to Male Airport for your short flight back to Hyderabad." }
      ]
    }
  ],
  testimonials: [
    {
      id: "test-1",
      name: "Sandeep Reddy",
      location: "Gachibowli, Hyderabad",
      rating: 5,
      comment: "Our family Kashmir trip curated by Sonika was absolutely flawless! From beautiful hotel stays overlooking snow cliffs to top-notch private transport, her alignment and care was exceptional. Highly recommend SM Tours!",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "test-2",
      name: "Priscilla D'Souza",
      location: "Secunderabad",
      rating: 5,
      comment: "Getting international visa approvals can be extremely stressful, but SM Tours & Travels managed our Singapore and Bali passport processing seamlessly. Sonika was extremely patient with our extensive documents.",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "test-3",
      name: "Rajesh Kumar",
      location: "Kondapur, Hyderabad",
      rating: 5,
      comment: "Booked my flights and Dubai holiday itinerary with SM Travels. The price was significantly lower than the standard online portals, and we received complimentary lounge passes and personalized transfers too. Truly professional service!",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "test-4",
      name: "Anjali Sharma",
      location: "Jubilee Hills, Hyderabad",
      rating: 5,
      comment: "Our Bali honeymoon villa arrangement was a dream. Sonika's attention to detail, like pre-booking speedboats and confirming complimentary candlelight dinners, made it incredibly romantic and entirely stress-free.",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    }
  ],
  faqs: [
    {
      id: "faq-1",
      question: "How do I book a tour or get a customized itinerary quote?",
      answer: "Submit an inquiry on our contact form or chat with us on WhatsApp at +91 8977820246. Sonika will discuss your destination interests, passenger count, travel dates, and budget to draft a tailored premium itinerary."
    },
    {
      id: "faq-2",
      question: "Do you provide passport and complex visa processing assistance?",
      answer: "Yes, we specialize in comprehensive passport applications, renewals, and tourist visa documentation support for international travel, including Schengen, USA, UK, UAE, Southeast Asia, and Australia visas."
    },
    {
      id: "faq-3",
      question: "Can I book domestic and international flight tickets with you?",
      answer: "Absolutely! We booking flights for both domestic and international destinations. By leveraging our group operator commissions, we often secure prices cheaper than direct public ticketing platforms."
    },
    {
      id: "faq-4",
      question: "Are your packages customizable to separate travel paces?",
      answer: "Yes, customized luxury flows are our signature. You can add extra days, upgrade standard rooms to private villas, select specific airlines, or schedule free days in any package."
    },
    {
      id: "faq-5",
      question: "What is your emergency travel assistance structure?",
      answer: "Every client gets our VIP concierge contact for live support. Whether you encounter flight rescheduling, local hotel query blocks, or need visa consultation, Sonika is directly accessible 24/7."
    }
  ]
};
