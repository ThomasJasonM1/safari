import { DestinationId } from './itinerary';

export interface Destination {
  id: DestinationId;
  name: string;
  country: string;
  region: string;
  dates: string;
  nights: number;
  hotel: string;
  tagline: string;
  overview: string;
  history: string;
  landscape: string;
  highlights: string[];
  practicalTips: PracticalTip[];
  localPhrases: LocalPhrase[];
  insiderTip: string;
  image: string;
}

export interface PracticalTip {
  icon: string;
  title: string;
  body: string;
}

export interface LocalPhrase {
  language: string;
  phrase: string;
  pronunciation: string;
  meaning: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'capeTown',
    name: 'Cape Town',
    country: 'South Africa',
    region: 'Western Cape',
    dates: 'Sep 15–18',
    nights: 3,
    hotel: 'Commodore Hotel, V&A Waterfront',
    tagline: 'The Mother City, Where Mountains Meet the Ocean',
    overview:
      'Cape Town is one of the most dramatically beautiful cities on earth, pinned between a flat-topped mountain and two colliding oceans. The Victoria & Alfred Waterfront (your base at the Commodore Hotel) sits at the heart of one of Africa\'s liveliest harbour precincts, with Table Mountain as a near-constant backdrop. In September, Cape Town is waking up from winter: the days are crisp and clear, wildflowers carpet the hillsides, and the city\'s famous coastal roads are perfect for driving.\n\nYour three days will cover two of the Cape\'s greatest day-trip circuits: the Cape Peninsula (Cape Point, Boulders penguin colony, Hout Bay, Chapman\'s Peak) and the Cape Winelands (Franschhoek, Stellenbosch, Constantia). Both routes reward early starters. The city is cosmopolitan, walkable, and safe in the tourist areas, enjoy the restaurants and bars of the Waterfront on your first evening.',
    history:
      'The Cape of Good Hope was first rounded by Portuguese navigator Bartolomeu Dias in 1488, and the route to the East was opened by Vasco da Gama ten years later. The Dutch East India Company (VOC) established a refreshment station here in 1652. The founding date of what would become Cape Town. French Huguenot refugees arrived in the 1680s, settling the Franschhoek valley and bringing winemaking expertise that shaped the Cape Winelands to this day.\n\nBritish control from 1806 cemented Cape Town\'s role as a strategic imperial port. Robben Island (visible from the Commodore Hotel\'s upper floors) served for centuries as a place of exile, most famously incarcerating Nelson Mandela for 18 of his 27 prison years. Today\'s Cape Town is the legislative capital of democratic South Africa, one of the country\'s most visited destinations and a cultural hub of the African continent.\n\nCape Town\'s urban fabric tells its own complex story. District Six (just east of the city centre) was a vibrant, racially mixed neighbourhood whose 60,000 residents were forcibly removed under apartheid\'s Group Areas Act in the 1970s; today its cleared lots remain a deliberate memorial to displacement. The Bo-Kaap neighbourhood, with its vivid painted houses climbing Signal Hill, was settled by enslaved workers brought by the Dutch East India Company from Malaysia, Indonesia, and East Africa. And remains the heart of a rich Cape Malay Islamic culture. The cuisine of the Cape (bobotie, koesisters, denningvleis) is one of the world\'s great fusion food traditions, born from this forced meeting of cultures.',
    landscape:
      'Cape Town occupies one of the most dramatically beautiful geological settings of any city on earth. Table Mountain is a fragment of ancient sandstone, roughly 600 million years old, sitting atop a granite base almost twice as old. The flat summit was formed by differential erosion, the hard sandstone resisting where softer surrounding rock wore away. The Cape Peninsula narrows to a mountainous finger of land running south from the city, flanked by two contrasting ocean systems: the cold Benguela Current (averaging 13°C) sweeping up from Antarctica along the Atlantic coast, and the warmer Agulhas Current rounding the eastern side. This thermal collision creates Cape Town\'s famously fickle weather (four seasons in one day) and one of the most biologically productive marine environments on the planet.\n\nThe vegetation cloaking the slopes is fynbos, a globally unique shrubland biome found only in the extreme southwestern tip of Africa. The Cape Floristic Region covers just 90,000 km² but contains over 9,000 plant species, of which 69% grow nowhere else on earth. Proteas, ericas, restios, and buchus carpet the hillsides in a mosaic of textures and colours. September is the flowering season: yellow daisies and orange gazanias blaze across the roadsides after winter rains, and the botanical gardens at Kirstenbosch reach their spectacular annual peak. It is this botanical richness (not the megafauna) that makes the Cape Peninsula one of the world\'s most extraordinary biodiversity hotspots.',
    highlights: [
      'Cape Point & Cape of Good Hope, the meeting of the Atlantic and Indian Oceans',
      'Boulders Beach Penguin Colony, thousands of African penguins in their natural habitat',
      'Chapman\'s Peak Drive, one of the world\'s most scenic coastal roads',
      'Table Mountain Aerial Cableway, panoramic views of the city and peninsula',
      'Cape Winelands: Franschhoek, Stellenbosch, and Constantia wine estates',
      'Kirstenbosch National Botanical Garden, against the slopes of Table Mountain',
      'V&A Waterfront: restaurants, craft market, and Robben Island ferry',
      'Bo-Kaap, the vividly painted Cape Malay neighbourhood on Signal Hill',
      'Robben Island, tour the prison where Mandela spent 18 years',
    ],
    practicalTips: [
      {
        icon: '🌡️',
        title: 'Weather in September',
        body:
          'September is the end of the Cape winter and start of spring. Days average 16–19°C with some rain possible: bring a light waterproof layer. Morning drives can be fresh (12°C). The Cape is notoriously windy; the "Cape Doctor" southeaster blows hard in spring. Table Mountain cable car closes when winds exceed 40 km/h.',
      },
      {
        icon: '👗',
        title: 'What to Pack',
        body:
          'Layers are essential. A waterproof jacket, light fleece, and comfortable walking shoes for coastal hikes. Smart-casual clothes for Winelands dining. Sun cream. The Southern Hemisphere spring sun is deceptively strong. Comfortable trainers for the Kirstenbosch gardens and Chapman\'s Peak walks.',
      },
      {
        icon: '💰',
        title: 'Currency & Money',
        body:
          'South African Rand (ZAR). Credit cards are widely accepted throughout Cape Town. ATMs widely available. Tipping: 10–15% at restaurants if service charge not included; R20–50 per bag for porters; R50–100 per day for tour guides. Petrol station attendants expect R5–10 for filling up.',
      },
      {
        icon: '🔒',
        title: 'Safety',
        body:
          'The V&A Waterfront and tourist areas are generally safe during the day. Stay aware of your surroundings after dark. Don\'t leave valuables visible in a parked car. Use Uber or hotel-arranged transfers rather than unlicensed taxis. The tour guides from Wilderness Touring will handle all logistics on your excursion days.',
      },
      {
        icon: '🏥',
        title: 'Health',
        body:
          'Cape Town is malaria-free. No special health precautions beyond standard travel hygiene. Tap water is safe to drink. Sunscreen is important. UV index is high even in September. The Commodore Hotel can recommend local medical services if needed.',
      },
      {
        icon: '📱',
        title: 'Connectivity',
        body:
          'Excellent 4G/LTE coverage throughout Cape Town. Hotel Wi-Fi at the Commodore is reliable. Local SIM cards (Vodacom, MTN) are available at Cape Town International Airport if needed.',
      },
      {
        icon: '🚗',
        title: 'Getting Around',
        body:
          'Cape Town is best explored with a rental car or pre-booked shuttle for the Peninsula and Winelands. Uber is reliable and safe in all tourist areas. The MyCiti BRT bus serves the Waterfront, City Bowl, and Sea Point, but the Peninsula route requires private transport. Do not use unlicensed minibus taxis. Parking in the city requires a registered parking marshal (tip R5–10).',
      },
      {
        icon: '🍷',
        title: 'Dining & Drink',
        body:
          'Cape Town\'s food scene rivals any African city. At the Waterfront: Quay Four (excellent seafood and atmosphere), Den Anker (Belgian, outstanding mussels). Waterfront restaurants are walk-in friendly. South African wines by the glass are excellent value: look for Chenin Blanc, Pinotage, and Syrah from the Winelands estates. Many upscale city bowl restaurants require advance bookings.',
      },
      {
        icon: '🐧',
        title: 'Wildlife Encounters',
        body:
          'The Cape Peninsula has genuine wildlife that requires respect. Baboon troops near Cape Point can be bold: keep car windows closed, never display food. Baboon monitors (rangers) are stationed at key spots. Never make eye contact or smile at a baboon. It reads as a threat display. Along the seafront, maintain at least 1m distance from penguins and seals at all times.',
      },
    ],
    localPhrases: [
      { language: 'Afrikaans', phrase: 'Goeie môre', pronunciation: 'HOO-ee MOR-uh', meaning: 'Good morning' },
      { language: 'Afrikaans', phrase: 'Baie dankie', pronunciation: 'BY-ee DUNK-ee', meaning: 'Thank you very much' },
      { language: 'Afrikaans', phrase: 'Lekker', pronunciation: 'LECK-er', meaning: 'Great / delicious / nice (used for absolutely everything)' },
      { language: 'Afrikaans', phrase: 'Howzit', pronunciation: 'HOW-zit', meaning: 'Hi / How are you? (ubiquitous South African greeting used across all cultures)' },
      { language: 'Afrikaans', phrase: 'Braai', pronunciation: 'BRAY', meaning: 'Barbecue, the great South African institution. Being invited to a braai is a genuine social honour.' },
      { language: 'Afrikaans', phrase: 'Now now', pronunciation: 'now now', meaning: 'In a little while (not immediately, a flexible South African time concept)' },
      { language: 'Afrikaans', phrase: 'Jislaaik!', pronunciation: 'YIS-like', meaning: 'Wow! / Oh my! (general exclamation of surprise or disbelief)' },
      { language: 'Zulu', phrase: 'Sawubona', pronunciation: 'Sah-woo-BOH-nah', meaning: 'Hello (literally "I see you", a profound greeting acknowledging the person\'s presence)' },
      { language: 'Xhosa', phrase: 'Molo', pronunciation: 'MOH-loh', meaning: 'Hello (to one person)' },
      { language: 'Xhosa', phrase: 'Enkosi', pronunciation: 'En-KOH-see', meaning: 'Thank you' },
      { language: 'Xhosa', phrase: 'Ewe', pronunciation: 'Eh-weh', meaning: 'Yes' },
      { language: 'Xhosa', phrase: 'Hayi', pronunciation: 'Ha-yee', meaning: 'No' },
      { language: 'Cape slang', phrase: 'Sharp sharp', pronunciation: 'sharp sharp', meaning: 'Everything is great / goodbye / agreed (positive affirmation used across all South African cultures)' },
    ],
    insiderTip:
      'Sunday buffet lunches are available in The Clipper restaurant and you can enjoy pre-dinner drinks in the Cocktail Bar & Lounge at the Commodore.',
    image: 'cape-town.jpg',
  },
  {
    id: 'timbavati',
    name: 'Timbavati & Kings Camp',
    country: 'South Africa',
    region: 'Greater Kruger National Park',
    dates: 'Sep 18–21',
    nights: 3,
    hotel: 'Kings Camp, Timbavati Private Nature Reserve',
    tagline: 'The Land of White Lions. Big Five in an Open Wilderness',
    overview:
      'The Timbavati Private Nature Reserve shares an unfenced boundary with Kruger National Park, giving wildlife the freedom to roam across a combined area of nearly 20,000 km². Kings Camp sits at the heart of this vast wilderness, facing open savannah and a busy waterhole where elephant, buffalo, and predators come to drink. The camp reflects the romance of classic African safari: colonial suites, Victorian baths, candlelit dinners at the boma.\n\nSeptember is one of the best months for game viewing in the greater Kruger: the bush is dry and leafless, animals congregate around water sources, and the absence of summer rains means clear skies and excellent visibility. Each day at Kings Camp follows the classic safari rhythm: pre-dawn game drive, full bush breakfast, midday rest, and a sunset drive that extends into the night with spotlights. Your rangers and trackers know this bush intimately.',
    history:
      'The Timbavati ("the place where something sacred came down from the heavens" in the local Tsonga language) has been a private game reserve since 1956, making it one of South Africa\'s oldest. The removal of fences between Timbavati and Kruger in the 1990s created a Greater Kruger wilderness allowing genuine wildlife migration across an enormous area.\n\nThe reserve became world-famous through the 1977 book "The White Lions of Timbavati" by Chris McBride, documenting the first recorded appearance of white lions in the wild. These lions carry a recessive gene (leucism) unique to this specific region, not albinism, but a natural colour variation found nowhere else on earth. Kings Camp sits within the core territory where white lions have been documented for decades.\n\nThe greater Kruger was originally established as the Saabi Game Reserve in 1898 under President Paul Kruger, one of Africa\'s first protected areas. The expansion of private reserves like Timbavati adjacent to Kruger, and the subsequent removal of boundary fences, created the modern Greater Kruger system. Today the Timbavati Association manages lion, elephant, and buffalo populations collaboratively with Kruger\'s Scientific Services. The reserve forms part of the Greater Limpopo Transfrontier Park, extending into Mozambique. One of the world\'s great conservation success stories.',
    landscape:
      'The Timbavati sits in the Lowveld at 350–600 metres elevation, in the broad geological terrace between the ancient Drakensberg escarpment and the Mozambique coastal plain. The underlying rock is primarily pink and grey granites and gneisses, worn flat over hundreds of millions of years and occasionally interrupted by rocky outcrops called kopjes (favourite resting spots for leopards, klipspringers, and monitor lizards that rise from the flat red-brown sand like islands.\n\nThe rivers that drain the reserve) the Timbavati, Nhlaralumi, and Klaserie. Flow green after summer rains but in September are sandy-channelled and largely dry, concentrating game around their remaining waterholes. The vegetation is a mosaic: dense mopane scrub in the north, leadwood and marula savannah in the central areas, and tall riverine woodland of sycamore fig and jackalberry along the watercourses. Termite mounds punctuate the entire landscape, some standing 4 metres tall and centuries old, each one an ecological keystone supporting dozens of species. In September the bush is stripped of leaves and golden-brown: visibility is excellent, shadows are long and amber, and the entire landscape has the austere, ancient beauty of Africa stripped to its essence.',
    highlights: [
      'Big Five game drives: lion, leopard, elephant, rhino, buffalo',
      'White lion sightings, the only naturally occurring white lions in the world',
      'Guided bush walks, tracking animals on foot with expert rangers',
      'Night drives with spotlights, encountering nocturnal species',
      'Camp waterhole at sunset, a living wildlife spectacle from your veranda',
      'Boma dinners under the stars, traditional African campfire setting',
      'Star gazing from the game vehicle, Milky Way and Southern Cross visible',
      'Kings Camp spa, glass-fronted treatment rooms in the bush',
    ],
    practicalTips: [
      {
        icon: '🌡️',
        title: 'Weather in September',
        body:
          'September in the Lowveld is the end of the dry season: warm days of 25–30°C, cool mornings down to 10°C at pre-dawn game drive time. Pack a warm fleece for the open game vehicle. It can feel very cold at dawn at speed. Afternoons are pleasant with excellent visibility. No rain expected.',
      },
      {
        icon: '👗',
        title: 'What to Pack',
        body:
          'Neutral-coloured clothing (khaki, olive, beige, grey): avoid white, bright colours, or black (attracts bees and tsetse flies). Warm fleece or jacket for dawn drives. Long sleeves and trousers for evening (mosquitoes). Closed shoes for bush walks. Wide-brimmed hat, sunglasses, sunscreen, camera. Avoid dark blue or black garments.',
      },
      {
        icon: '⚖️',
        title: 'Luggage Allowance',
        body:
          'The Federal Air charter flight has a strict 7kg soft bag limit per person. Hard-sided suitcases are not permitted: use a soft duffel or canvas safari bag. Excess luggage can be stored securely at Kruger Mpumalanga International (MQP) airport.',
      },
      {
        icon: '💰',
        title: 'Currency & Tipping',
        body:
          'South African Rand (ZAR). Kings Camp is all-inclusive. Tipping: rangers and trackers approximately R300–500 per person per day (shared between them); housekeeping R100–150 per room per day; bar staff R50 per day. Leave tips in the communal tip box at checkout.',
      },
      {
        icon: '🦟',
        title: 'Malaria',
        body:
          'The greater Kruger is a malaria zone. Consult your doctor before travel and start anti-malarials as directed. Use DEET-based insect repellent (50% DEET), cover exposed skin at dawn and dusk, and sleep under the mosquito net provided. September risk is lower than summer months but precautions are essential.',
      },
      {
        icon: '📸',
        title: 'Photography Tips',
        body:
          'A zoom lens (100–400mm) is ideal from the game vehicle. Beanbags rested on the vehicle side reduce camera shake. Shoot in burst mode during action. The golden hours (first 30 minutes after sunrise and last 30 before sunset) produce extraordinary light. Night drives require fast lenses (f/2.8 or wider) or raise ISO significantly.',
      },
      {
        icon: '🦁',
        title: 'Bush Walk Safety',
        body:
          'Guided bush walks are led by armed professional rangers. Follow their hand signals immediately. A raised fist means stop and freeze. Walk single file, stay quiet, and wait for the ranger\'s instruction before moving. The experience of tracking animals on foot is entirely different from a vehicle: quieter, more intimate, and unforgettable.',
      },
      {
        icon: '🌙',
        title: 'Night Drives',
        body:
          'Night drives are among the best chances to see nocturnal predators. Speak in quiet tones, limit phone screens (white light disrupts night vision), and let the tracker handle the spotlight. Temperatures below 15°C after sunset are common. Your warmest layer is not optional. Bring a headlamp for boarding and disembarking in the dark.',
      },
      {
        icon: '⭐',
        title: 'Stargazing',
        body:
          'The Timbavati is in a dark sky zone, on a clear September night the Milky Way stretches overhead in extraordinary detail. The Southern Cross (Crux) sits low in the south, pointing toward the South Pole. Ask your ranger to point it out. The lack of light pollution means visibility is rarely better anywhere in South Africa.',
      },
    ],
    localPhrases: [
      { language: 'Tsonga / Shangaan', phrase: 'Ndza khensa', pronunciation: 'N-jah KEN-sah', meaning: 'Thank you' },
      { language: 'Tsonga / Shangaan', phrase: 'Avuxeni', pronunciation: 'Ah-voo-SHEH-nee', meaning: 'Good morning' },
      { language: 'Tsonga / Shangaan', phrase: 'U njhani?', pronunciation: 'oo N-jah-nee', meaning: 'How are you?' },
      { language: 'Tsonga / Shangaan', phrase: 'Ndlela yavela', pronunciation: 'N-dleh-lah yah-VEH-lah', meaning: 'Goodbye / go well (literally: the road has come)' },
      { language: 'Zulu', phrase: 'Sawubona', pronunciation: 'Sah-woo-BOH-nah', meaning: 'Hello (I see you)' },
      { language: 'Zulu', phrase: 'Ngiyabonga', pronunciation: 'Ngee-ah-BONG-ah', meaning: 'Thank you' },
      { language: 'Zulu', phrase: 'Yebo', pronunciation: 'YEH-boh', meaning: 'Yes' },
      { language: 'Zulu', phrase: 'Unjani?', pronunciation: 'oo-N-jah-nee', meaning: 'How are you?' },
      { language: 'Zulu', phrase: 'Hamba kahle', pronunciation: 'HAM-bah KAH-leh', meaning: 'Go well (said to someone who is leaving)' },
      { language: 'Zulu', phrase: 'Sala kahle', pronunciation: 'SAH-lah KAH-leh', meaning: 'Stay well (said by the person leaving to those staying behind)' },
    ],
    insiderTip:
      'The Timbavati is home to the only naturally bred white lions in the world. Keep your camera ready on every game drive. And tell your ranger on day one that a white lion sighting is a priority.',
    image: 'timbavati.jpg',
  },
  {
    id: 'victoriaFalls',
    name: 'Victoria Falls',
    country: 'Zimbabwe',
    region: 'Matabeleland North',
    dates: 'Sep 21–22',
    nights: 1,
    hotel: 'Palm River Hotel, on the Zambezi River',
    tagline: '"Mosi-oa-Tunya", The Smoke That Thunders',
    overview:
      'Victoria Falls is one of the Seven Natural Wonders of the World, a curtain of water stretching 1,708 metres wide and plunging over 100 metres into the Batoka Gorge below. In the local Tonga language, the falls are called Mosi-oa-Tunya: "The Smoke that Thunders." Even before you see the falls, you\'ll hear the roar and see the permanent cloud of mist rising above the rainforest on the gorge rim.\n\nYou\'ll arrive at the Palm River Hotel (right on the banks of the Zambezi) in the afternoon of September 21st. An included afternoon tour gives you your first view of the falls. September falls in the low-water period: the falls are accessible and dramatic, the spray lighter than in peak flood season, and many of the viewpoints that are flooded in January are walk-able. The Zimbabwe side offers the best frontal views.',
    history:
      'The Batoka Gorge was formed over millions of years as the Zambezi River cut through ancient basalt rock. The San people and later the Tonga people of the Zambezi Valley knew these falls for millennia before European contact. Scottish missionary David Livingstone became the first European to see the falls in November 1855, naming them after Queen Victoria (a moment of colonial naming that the local name "Mosi-oa-Tunya" has never been fully displaced.\n\nZimbabwe) formerly Rhodesia, gained independence in 1980 after a prolonged liberation struggle. The Victoria Falls area spans the border between Zimbabwe and Zambia; the Palm River Hotel and the falls themselves are on the Zimbabwean side. Victoria Falls town is a compact, walkable tourist hub with curio markets, restaurants, and operators offering activities from bungee jumping to game drives and helicopter flights.\n\nThe colonial-era Victoria Falls Bridge (completed 1905) was part of Cecil Rhodes\'s audacious Cape-to-Cairo railway ambition, a continuous British rail line from Cape Town to Cairo. The bridge was manufactured in England, shipped in sections, and assembled above the gorge without any scaffolding touching the ground below. The Bulawayo railway line still runs across it today, and the bridge itself is a working monument to an imperial era.',
    landscape:
      'Victoria Falls owes its existence to a fracture: a weakness in the ancient basalt bedrock where the Zambezi, 1,700 metres wide above the falls, drops 108 metres into a gorge barely 60 metres across. The gorge zigzags in sharp right-angle bends for 20 kilometres downstream, each bend marking a former position of the falls as the river progressively cut upstream through the basalt over tens of thousands of years. The next fracture line, visible a few kilometres upstream, shows where the falls will eventually retreat in the geological future.\n\nThe spray plume rises up to 400 metres into the air and is visible 40 kilometres away. On both gorge rim walls, the perpetual mist maintains a permanent pocket of rainforest: tree ferns, ebony trees, and lush tropical vegetation in what is otherwise a hot, dry, semi-arid landscape. On the upper Zambezi above the falls, the river spreads across flat basalt in braided channels separated by large wooded islands colonised by riverine figs, sausage trees, and date palms. Hippos and crocodiles occupy these islands. The calm, island-dotted river above the falls makes the sudden roaring edge all the more dramatic, one of nature\'s great contrasts.',
    highlights: [
      'Victoria Falls, frontal views from the Zimbabwean rim path (September: best accessible viewpoints)',
      'Zambezi River sunset cruise: hippos, crocodiles, elephants at the bank, cold Zambezi lager',
      'The Victoria Falls Bridge, the historic 1905 railway bridge straddling the Batoka Gorge',
      'Rainforest walk along the gorge rim: mist, rainbows, and the constant roar of the falls',
      'Helicopter flight "Flight of Angels". 15-minute aerial view of the falls and gorge',
      'Town curio market: carvings, textiles, stone sculptures, and local crafts',
      'Palm River Hotel infinity pool, Zambezi River at eye level',
      'Devil\'s Pool (Zambian side, low water season). Swimming at the very lip of the falls',
    ],
    practicalTips: [
      {
        icon: '🌡️',
        title: 'Weather in September',
        body:
          'September is the end of the dry season: hot days (30–35°C), cool nights (15°C). Low water season means the falls are dramatic but accessible, viewpoints not flooded by mist. Bring sunscreen and a hat. The rainforest walk alongside the falls can still be damp; a light waterproof is useful.',
      },
      {
        icon: '💵',
        title: 'Currency',
        body:
          'Zimbabwe uses USD as its primary tourist currency. Carry small USD notes (ones, fives, tens). USD is essential for entrance fees, tips, and the curio market. Zimbabwe Gold (ZiG) is in circulation but less useful for tourists. Cards are accepted at the hotel and some restaurants; carry USD cash for tips and the market.',
      },
      {
        icon: '🛂',
        title: 'Entry & Visas',
        body:
          'Most nationalities can obtain a Zimbabwean visa on arrival at VFA airport or the land border. Cost is typically USD $50 for a single-entry visa. Confirm current requirements before travel. Your TMAC liaison will advise on the latest entry requirements. Have your passport and payment ready on arrival.',
      },
      {
        icon: '🦟',
        title: 'Malaria',
        body:
          'Victoria Falls is a malaria zone. Continue anti-malarial medication, use DEET-based repellent, and cover up at dawn and dusk. September risk is lower than the rainy season but precautions remain important. The Palm River Hotel provides mosquito nets.',
      },
      {
        icon: '💰',
        title: 'Tipping',
        body:
          'Standard tipping in Zimbabwe: USD $1–2 per bag for porters; 10–15% at restaurants; USD $5–10 per day for guides. Falls entrance guides deserve USD $5–10 per person for a well-guided walk. Sunset cruise guides: USD $5 per person.',
      },
      {
        icon: '⚠️',
        title: 'Safety',
        body:
          'Victoria Falls town is safe for tourists in main areas. Use hotel-recommended shuttles. Keep valuables secure. Don\'t walk the road to the falls alone at night. Swim only in designated areas. Crocodile and hippo are present throughout the Zambezi; the hotel pool is your safe option.',
      },
      {
        icon: '🎯',
        title: 'Activities',
        body:
          'Beyond the falls, the area offers bungee jumping from the 111m Victoria Falls Bridge, white-water rafting through the Batoka Gorge (world-class rapids), helicopter flights, and game drives into Zambezi National Park. Devil\'s Pool (swimming at the falls\' lip on the Zambian side) is open in low-water season. Book activities through your hotel in advance.',
      },
      {
        icon: '💦',
        title: 'The Falls in September',
        body:
          'September is low-water season. The falls are dramatic and the spray is manageable without a poncho. More viewpoints are accessible than in peak flood season (March–May). The Zimbabwe rim walk path is about 1.2 km from the entrance gate to Main Falls viewpoint, taking 30–45 minutes at a relaxed pace.',
      },
      {
        icon: '📷',
        title: 'Photography',
        body:
          'Morning is best for falls photography, the sun lights the mist from the east and rainbows form in the spray. Bring a wide-angle lens for the falls and a telephoto for wildlife on the sunset cruise. A waterproof cover for your camera is sensible even in September when mist patches remain. The lookout points on the rim walk are the prime shooting locations.',
      },
    ],
    localPhrases: [
      { language: 'Shona', phrase: 'Mhoro', pronunciation: 'M-HOH-roh', meaning: 'Hello' },
      { language: 'Shona', phrase: 'Maswera sei', pronunciation: 'Mah-SWEH-rah SAY', meaning: 'Good afternoon / How are you?' },
      { language: 'Shona', phrase: 'Maswera zvakanaka', pronunciation: 'Mah-SWEH-rah zvah-kah-NAH-kah', meaning: 'I am fine, thank you' },
      { language: 'Shona', phrase: 'Ndatenda', pronunciation: 'N-dah-TEN-dah', meaning: 'Thank you' },
      { language: 'Shona', phrase: 'Shamwari', pronunciation: 'Sham-WAH-ree', meaning: 'Friend (a warm way to address someone, genuine affection)' },
      { language: 'Shona', phrase: 'Chete chete', pronunciation: 'CHEH-teh CHEH-teh', meaning: 'Exactly / no problem / that\'s right (warm positive affirmation)' },
      { language: 'Shona', phrase: 'Zvakwana', pronunciation: 'zvah-KWAH-nah', meaning: 'That\'s enough / it\'s fine (polite way to decline more food or drink)' },
      { language: 'Ndebele', phrase: 'Sawubona', pronunciation: 'Sah-woo-BOH-nah', meaning: 'Hello (I see you)' },
      { language: 'Ndebele', phrase: 'Ngiyabonga', pronunciation: 'Ngee-yah-BONG-gah', meaning: 'Thank you' },
      { language: 'Ndebele', phrase: 'Yebo', pronunciation: 'YEH-boh', meaning: 'Yes (also used as a general positive affirmation)' },
      { language: 'Ndebele', phrase: 'Hamba kahle', pronunciation: 'HAM-bah KAH-leh', meaning: 'Go well / goodbye' },
      { language: 'Zimbabwe English', phrase: 'Sharp!', pronunciation: 'sharp', meaning: 'Everything is fine / agreed / goodbye (the universal Zimbabwean positive reply)' },
    ],
    insiderTip:
      'Book a private dining experience in the garden overlooking the mighty Zambezi at Palm River Hotel, an unforgettable dinner. And don\'t miss the curio market in town for Zimbabwe\'s extraordinary soapstone and wood carving traditions.',
    image: 'victoria-falls.jpg',
  },
  {
    id: 'manaPools',
    name: 'Mana Pools & Ruckomechi',
    country: 'Zimbabwe',
    region: 'Zambezi Valley',
    dates: 'Sep 22–25',
    nights: 3,
    hotel: 'Wilderness Ruckomechi, Mana Pools National Park',
    tagline: 'Wild Walking Safaris on the Banks of the Mighty Zambezi',
    overview:
      'Mana Pools is one of Africa\'s last truly wild places, a UNESCO World Heritage Site and one of the continent\'s finest walking safari destinations. Situated on the floodplains of the Zambezi Valley, the park is named for its four permanent pools (mana means "four" in Shona) that attract extraordinary concentrations of wildlife during the dry season. Wilderness Ruckomechi sits at the far western end of the park, looking out across the Zambezi toward Zambia and the Rift Valley escarpment.\n\nMana Pools in September is at its peak: the floodplains are parched, animals crowd around the river and pools, and game viewing is exceptional. Ruckomechi offers the full range of activities: game drives, guided walking safaris, boat cruises, and canoeing on the Zambezi. This is a remote, unplugged, deeply immersive experience.',
    history:
      'The Zambezi Valley has been inhabited for thousands of years by the BaTonga people, who fished the river and farmed its seasonal floodplains. The construction of Kariba Dam upstream (completed 1959) flooded the lower Zambezi Valley and displaced over 50,000 BaTonga people. Submerging their ancestral villages and sacred sites in what remains one of the most traumatic events in the valley\'s history. Operation Noah, conducted as the dam filled, rescued thousands of animals from the rising waters, one of Africa\'s first large-scale wildlife relocation operations.\n\nMana Pools was declared a National Park in 1963 and became a UNESCO World Heritage Site in 1984, cited for its extraordinary ecosystem and the remarkable concentrations of wildlife along the Zambezi. It is particularly famous for large herds of elephant, lion prides, wild dog packs, and an astonishing density of hippos and crocodiles. The park is strictly protected and visitor numbers are deliberately limited (making it one of the most exclusive and unspoilt wilderness experiences in Africa.\n\nThe BaTonga oral tradition holds the Zambezi as a living entity) Nyaminyami, the river god, a serpentine spirit whose separation from his wife by the Kariba Dam is said to explain the regular floods that have tested the dam\'s walls. Tonga elders still conduct ceremonies at the river\'s edge, maintaining a cultural connection to the Zambezi that predates any national park boundary.',
    landscape:
      'Mana Pools sits at the floor of the mid-Zambezi Rift Valley, a deep tectonic depression flanked by escarpments rising 600–900 metres above the valley floor. This creates an almost enclosed, intensely hot microclimate at the bottom: Ruckomechi in September regularly reaches 38–40°C in the afternoon, yet remains compelling because the game concentrations are extraordinary. The valley floor sits at around 330 metres above sea level, with Zambia\'s blue escarpment visible across the river to the north.\n\nThe landscape is entirely defined by the Zambezi and its history. The four permanent pools are ancient palaeochannels, river courses abandoned as the Zambezi shifted northward over thousands of years. These pools, fringed by massive winter thorn albida trees, sycamore figs, and mahogany, are the ecological heart of the park. The albida tree is uniquely important: it drops its nutritious seed pods in the dry season (the reverse of almost every other tree) providing critical food for elephants, nyala, and impala exactly when everything else has failed. On the open floodplain in September, the grass is bleached white, the leadwood trees are skeletal and silver against a cobalt sky, and the entire landscape is oriented toward the river, the only water for kilometres. At sunrise and sunset, this sparse, austere beauty becomes something extraordinary.',
    highlights: [
      'Guided walking safaris, tracking lion and elephant on foot with armed professionals',
      'Zambezi River boat cruise: hippos, crocodiles, waterbirds, elephants drinking at dusk',
      'Canoeing the Zambezi, a world-class paddling experience in a wilderness setting',
      'Wild dog sightings. Mana Pools has some of Africa\'s highest densities of African wild dog',
      'Elephant herds on the floodplains, including bulls standing on hind legs for albida pods',
      'Star Bed at Ruckomechi. Sleeping under an open sky by a floodlit waterhole',
      'Carmine bee-eater colony. September is breeding season along the Zambezi river banks',
      'Birding: African fish eagle, saddle-billed stork, Goliath heron, carmine bee-eater',
    ],
    practicalTips: [
      {
        icon: '🌡️',
        title: 'Weather in September',
        body:
          'Hot and dry, the classic dry season. Days reach 33–38°C in the afternoon. Mornings are cool and game drive weather is perfect. No rain. Sunscreen, hat, and constant hydration are essential. The heat intensifies from 10 AM; midday rest at the pool or shade is sensible. Evenings are pleasant at 20–22°C.',
      },
      {
        icon: '👗',
        title: 'What to Wear',
        body:
          'Neutral bush colours (khaki, beige, green, grey). Long sleeves and trousers for walking and evenings. Closed, sturdy shoes for game walks. No sandals. Light quick-dry fabrics. Wide-brimmed hat. Dark colours (especially blue and black) attract tsetse flies: avoid them completely.',
      },
      {
        icon: '⚖️',
        title: 'Luggage',
        body:
          'Wilderness Air Zimbabwe has a 7kg soft bag limit per person on charter flights. Pack light. Hard-sided suitcases are not permitted. Ruckomechi does laundry daily, so you need fewer changes of clothing than you might think.',
      },
      {
        icon: '🦟',
        title: 'Malaria & Health',
        body:
          'Mana Pools is in a malaria zone. Continue your anti-malarials throughout the stay. DEET repellent is essential. Tsetse flies are active in the bush. Their bite is painful but does not carry malaria risk for short-term visitors. Drink only bottled or purified water. The camp has basic medical supplies; the nearest hospital is 3+ hours away.',
      },
      {
        icon: '💰',
        title: 'Currency & Tipping',
        body:
          'USD cash preferred. Ruckomechi is all-inclusive but tipping is warmly expected: guides and trackers USD $10–15 per person per day; camp staff USD $5 per person per day. Leave tips in the communal tip envelope at checkout.',
      },
      {
        icon: '🐘',
        title: 'Wildlife Safety',
        body:
          'Walking safaris are conducted by professional armed guides: follow their instructions immediately and without question. Do not leave your tent at night unescorted (elephant, hippo, and lion walk through camp regularly). Keep your tent zipped at all times. Never wade into the Zambezi. Crocodiles are present in large numbers.',
      },
      {
        icon: '🦶',
        title: 'Walking Safari Preparation',
        body:
          'Wear closed, sturdy boots (not sandals), muted-colour clothing, and bring water, a hat, and sunscreen. The pace is slow and deliberate. It\'s about reading tracks, scent, and behaviour at animal level. Never walk ahead of the guide, never run if confronted (wait for the guide\'s instruction), and enjoy the extraordinary privilege of being on foot in genuinely wild Africa.',
      },
      {
        icon: '🐦',
        title: 'Birdlife',
        body:
          'September is exceptional for birds. Carmine bee-eaters (bright red and turquoise) breed in Zambezi riverbanks, one of Africa\'s most spectacular avian spectacles. African fish eagles, saddle-billed storks, and Goliath herons are daily sightings. White-fronted bee-eaters, open-billed storks, and African skimmers are all present. Bring binoculars and ask your guide to help identify species.',
      },
      {
        icon: '📡',
        title: 'Remote Location & Communications',
        body:
          'Ruckomechi is genuinely remote. Karoi (nearest town) is 3+ hours away. Mobile phone coverage is extremely limited or absent. The camp has satellite communication and emergency medical facilities. Ensure your travel insurance includes comprehensive emergency medical evacuation cover before departing. Download offline maps of Zimbabwe before arriving.',
      },
    ],
    localPhrases: [
      { language: 'Shona', phrase: 'Mhoro', pronunciation: 'M-HOH-roh', meaning: 'Hello' },
      { language: 'Shona', phrase: 'Ndatenda', pronunciation: 'N-dah-TEN-dah', meaning: 'Thank you' },
      { language: 'Shona', phrase: 'Zvakanaka', pronunciation: 'Zvah-kah-NAH-kah', meaning: 'Very good / okay / that\'s fine' },
      { language: 'Shona', phrase: 'Shamwari', pronunciation: 'Sham-WAH-ree', meaning: 'Friend (the warmest way to address a guide or camp staff member)' },
      { language: 'Shona', phrase: 'Makadii?', pronunciation: 'mah-kah-DEE', meaning: 'How are you all? (plural, use to greet a group of staff)' },
      { language: 'Shona', phrase: 'Tiripo', pronunciation: 'Tee-REE-poh', meaning: 'We are well (the standard reply to Makadii)' },
      { language: 'Shona', phrase: 'Tatenda zvakanyanya', pronunciation: 'Tah-TEN-dah zvah-kah-N-YAN-yah', meaning: 'Thank you very much (for exceptional service, guides love to hear this)' },
      { language: 'BaTonga', phrase: 'Mubonwa', pronunciation: 'Moo-BON-wah', meaning: 'Hello / greetings (the traditional river people\'s greeting)' },
      { language: 'BaTonga', phrase: 'Kamubotu', pronunciation: 'kah-moo-BOH-too', meaning: 'Good / that is good' },
      { language: 'BaTonga', phrase: 'Bweendo', pronunciation: 'BWEN-doh', meaning: 'Journey / travel (acknowledging the long journey someone has made to reach this remote place)' },
    ],
    insiderTip:
      'A boat cruise along the mighty Zambezi is a wonderful way to see wildlife and waterbirds. For the adventurous, there\'s the option of canoeing along this famous river! And ask about the Star Bed experience. Sleeping under an open African sky is something you\'ll never forget.',
    image: 'mana-pools.jpg',
  },
];
