import { DestinationId } from './itinerary';

export type ConservationStatus = 'LC' | 'NT' | 'VU' | 'EN' | 'CR';

export interface Animal {
  id: string;
  commonName: string;
  scientificName: string;
  destinations: DestinationId[];
  conservationStatus: ConservationStatus;
  conservationLabel: string;
  description: string;
  habitat: string;
  bestSpotting: string;
  facts: string[];
  image: string;
}

export const CONSERVATION_LABELS: Record<ConservationStatus, string> = {
  LC: 'Least Concern',
  NT: 'Near Threatened',
  VU: 'Vulnerable',
  EN: 'Endangered',
  CR: 'Critically Endangered',
};

export const ANIMALS: Animal[] = [
  // ─── CAPE TOWN ────────────────────────────────────────────────────────────
  {
    id: 'african-penguin',
    commonName: 'African Penguin',
    scientificName: 'Spheniscus demersus',
    destinations: ['capeTown'],
    conservationStatus: 'CR',
    conservationLabel: 'Critically Endangered',
    description:
      'The only penguin species that breeds in Africa, these charismatic birds waddle, bray (earning the nickname "jackass penguin"), and nest in burrows along the rocky Western Cape coastline. Boulders Beach near Simon\'s Town hosts a colony of several thousand, giving visitors the extraordinary experience of walking among wild penguins on a sandy beach. Their distinctive black-and-white tuxedo pattern is unique to each individual. The speckle pattern on their chest acts like a fingerprint.',
    habitat: 'Rocky coastlines, beaches, and cold upwelling ocean waters of the Benguela Current.',
    bestSpotting: 'Boulders Penguin Colony, Simons Town. Included on your Sep 16 Peninsula Discovery tour. Morning visits are best before the beach gets crowded.',
    facts: [
      'African penguins can swim at up to 20 km/h underwater.',
      'They are monogamous and often return to the same nest burrow each year.',
      'In October 2024 the African penguin became the first penguin species ever listed as Critically Endangered. The breeding population has fallen below 10,000 pairs.',
      'The population has declined by roughly 97% over the last century, driven by competition with commercial purse-seine fisheries and shifting prey stocks.',
      'They regulate body temperature through bare pink patches of skin above their eyes.',
    ],
    image: 'african-penguin.jpg',
  },
  {
    id: 'cape-fur-seal',
    commonName: 'Cape Fur Seal',
    scientificName: 'Arctocephalus pusillus',
    destinations: ['capeTown'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'Cape fur seals are the largest of the fur seal species and one of the most abundant marine mammals in South African waters. Boisterous colonies of hundreds to thousands haul out on rocky outcrops along the coast, filling the air with barking and the smell of the sea. Males can weigh up to 300 kg. They are agile predators underwater, capable of diving to 200 metres in pursuit of fish and squid. Great white sharks prey on them at Seal Island in False Bay, one of nature\'s most dramatic wildlife spectacles.',
    habitat: 'Rocky coastlines, offshore islands, and cold Benguela Current waters.',
    bestSpotting: 'Commonly seen from the V&A Waterfront and along the Cape Peninsula coast. Lookout Point in Hout Bay has a small viewing area above the harbour colony.',
    facts: [
      'Cape fur seals can live up to 25 years in the wild.',
      'Males arrive at breeding colonies in October to establish territories. September is just before peak season.',
      'They can hold their breath for up to 7 minutes while diving.',
      'The Cape fur seal was the species that first made the word "seal" synonymous with rich coastal wildlife for European explorers.',
    ],
    image: 'cape-fur-seal.jpg',
  },
  {
    id: 'southern-right-whale',
    commonName: 'Southern Right Whale',
    scientificName: 'Eubalaena australis',
    destinations: ['capeTown'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'Southern right whales are among the most celebrated wildlife sightings in South Africa. From June to November, mothers and calves come close inshore to the bays of the Western Cape (Walker Bay near Hermanus and False Bay near Cape Town) to nurse their young in sheltered waters. These enormous animals (up to 17 metres long, 80 tonnes) are recognised by the distinctive white callosities on their heads, which are unique to each individual. In September you have a good chance of spotting them from the Cape Peninsula coastline.',
    habitat: 'Open oceans of the Southern Hemisphere; inshore bays of South Africa in winter and spring for calving.',
    bestSpotting: 'Look for blows (the distinctive V-shaped double blow) from coastal viewpoints along the False Bay coast, especially Boulders Beach and Muizenberg.',
    facts: [
      'They were named "right whales" by whalers who considered them the "right" whale to hunt, easy to approach and floating when dead.',
      'Southern right whales were hunted to near-extinction; their current population of ~17,000 is a conservation success story.',
      'They communicate using a variety of low-frequency moans and can detect sounds across hundreds of kilometres.',
      'Calves are born at 4–5 metres long and can gain 50–100kg per day while nursing.',
    ],
    image: 'southern-right-whale.jpg',
  },
  {
    id: 'chacma-baboon',
    commonName: 'Chacma Baboon',
    scientificName: 'Papio ursinus',
    destinations: ['capeTown', 'timbavati', 'victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'Chacma baboons are the largest baboons in the world and are a regular sight along the Cape Peninsula. Troops of 20–100 individuals roam the slopes of Table Mountain National Park, foraging for roots, bulbs, berries, insects, and the occasional stolen tourist sandwich. They are highly intelligent and have learned that human food is an easy calorie source. Never feed them, and keep car windows closed. The dominant male is a formidable animal capable of injuring humans. Observe from a respectful distance.',
    habitat: 'Fynbos scrubland, rocky hillsides, and coastal margins of the Cape Peninsula.',
    bestSpotting: 'Cape Point Nature Reserve and the Peninsula coastal road near Scarborough on Sep 16. Then again at every safari stop - troops raid the Palm River Hotel grounds at Victoria Falls, and Ruckomechi has resident troops that forage along the Zambezi bank at dawn. Keep tent and room doors zipped.',
    facts: [
      'Chacma baboons live in complex social hierarchies where females inherit their mother\'s social rank.',
      'They sleep on cliff ledges at night to avoid predators like leopard and caracal.',
      'A baboon\'s canine teeth can be longer than a lion\'s proportionally.',
      'The Cape Peninsula baboon population is actively managed to reduce conflict with humans.',
    ],
    image: 'baboon.jpg',
  },
  {
    id: 'rock-hyrax',
    commonName: 'Rock Hyrax (Dassie)',
    scientificName: 'Procavia capensis',
    destinations: ['capeTown'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The rock hyrax (known locally as a "dassie" (from Afrikaans)) is a small, rotund mammal that looks like a large guinea pig but is, remarkably, the closest living relative of the elephant. The genetic connection is evidenced by their toenails (rather than claws), teeth structure, and internal anatomy. Hyraxes live in colonies on rocky outcrops, communicating with a wide repertoire of sounds. They are a favourite prey of the Verreaux\'s eagle. On Table Mountain, hyraxes are completely unfazed by tourists and can be observed at close range at the cable car station.',
    habitat: 'Rocky outcrops, cliff faces, and boulder-strewn slopes throughout southern Africa.',
    bestSpotting: 'Top of Table Mountain cable car station. Hyraxes are abundant and approachable. Also common at Cape Point.',
    facts: [
      'Despite their size (~4kg), hyraxes are the closest living relatives of the elephant and manatee.',
      'Their feet have special moist pads with excellent grip, allowing them to climb almost vertical rock faces.',
      'Hyrax colonies post sentinels who give alarm calls when predators approach.',
      'They are poor at regulating body temperature and sunbathe in groups for warmth each morning.',
    ],
    image: 'dassie.jpg',
  },

  // ─── TIMBAVATI / KRUGER ───────────────────────────────────────────────────
  {
    id: 'lion',
    commonName: 'African Lion',
    scientificName: 'Panthera leo',
    destinations: ['timbavati', 'manaPools'],
    conservationStatus: 'VU',
    conservationLabel: 'Vulnerable',
    description:
      'The apex predator of the African savannah, lions are the only truly social big cats. Prides of 2–40 individuals are led by coalitions of related males, while related females hunt cooperatively. The Timbavati and greater Kruger host some of southern Africa\'s largest and most stable lion populations. At Mana Pools, the lions are adapted to the woodland and riverine environment, sometimes climbing trees to scan the floodplains. A lion\'s roar carries over 8 kilometres and serves both to communicate with pride members and to advertise territorial boundaries.',
    habitat: 'Open savannah, bushveld, and riverine woodland throughout sub-Saharan Africa.',
    bestSpotting: 'Best seen on early-morning and late-afternoon game drives when they are active. Kings Camp guides monitor pride locations daily. At Mana Pools, river pools attract lions drinking at dusk.',
    facts: [
      'Lions can sleep up to 20 hours a day, conserving energy for hunts.',
      'Female lions do approximately 85–90% of the hunting in most prides.',
      'A lion\'s roar can be heard from 8 km away.',
      'The distinctive black-tipped tail tuft conceals a sharp spur, possibly used in communication or during mating.',
    ],
    image: 'lion.jpg',
  },
  {
    id: 'white-lion',
    commonName: 'White Lion (Timbavati)',
    scientificName: 'Panthera leo (leucistic morph)',
    destinations: ['timbavati'],
    conservationStatus: 'VU',
    conservationLabel: 'Vulnerable',
    description:
      'The white lions of Timbavati are one of Africa\'s greatest wildlife marvels. They are not albinos but rather carry a recessive gene (leucism) that produces a creamy white or pale golden coat. They were unknown to Western science until the 1970s, when Chris McBride documented them in his book "The White Lions of Timbavati." The gene is unique to this specific region, meaning Timbavati is the only place on earth where white lions occur naturally in the wild. They hunt, breed, and behave identically to their tawny relatives.',
    habitat: 'Open savannah and bushveld of the Timbavati Private Nature Reserve and adjacent Kruger.',
    bestSpotting: 'Extremely special and not guaranteed, perhaps 5–10% of game drives encounter white lions in the Timbavati. Tell your ranger it\'s a priority and they will coordinate with trackers across the reserve.',
    facts: [
      'White lions were considered sacred messengers of the gods by the local Tsonga people for centuries.',
      'The white colouring is caused by a recessive gene called leucism, not albinism (their eyes are normal coloured).',
      'Despite popular belief, white lions are not more vulnerable in the wild. They are successful hunters.',
      'Captive white lions have been bred selectively; wild white lions are found only in Timbavati.',
    ],
    image: 'white-lion.jpg',
  },
  {
    id: 'leopard',
    commonName: 'Leopard',
    scientificName: 'Panthera pardus',
    destinations: ['timbavati', 'manaPools'],
    conservationStatus: 'VU',
    conservationLabel: 'Vulnerable',
    description:
      'The most secretive and adaptable of the big cats, the leopard is a master of concealment and power. Largely solitary and nocturnal, leopards are famous for hoisting entire carcasses into tree branches out of reach of lions and hyenas. Their spotted rosette pattern provides perfect camouflage in dappled light. The Timbavati hosts a healthy leopard population; your night drives with spotlights greatly increase the chances of a sighting. Mana Pools leopards are present but rarely seen. A walking safari in the riverine woodland is your best chance.',
    habitat: 'Forest margins, kopjes, riverine woodland, and thick bush throughout sub-Saharan Africa.',
    bestSpotting: 'Night drives at Kings Camp with spotlights. Look for their distinctive eye-shine (amber-green). During the day, scan tree branches along dry riverbeds where they rest with kills.',
    facts: [
      'A leopard can haul prey twice its own body weight up a vertical tree trunk.',
      'Each leopard\'s rosette pattern is unique. Researchers use them like fingerprints to identify individuals.',
      'Leopards are the most widespread of all the big cats, ranging from sub-Saharan Africa to the Russian Far East.',
      'Their spotted coats turn into perfect camouflage. Large animals can walk within metres without noticing a resting leopard.',
    ],
    image: 'leopard.jpg',
  },
  {
    id: 'elephant',
    commonName: 'African Elephant',
    scientificName: 'Loxodonta africana',
    destinations: ['timbavati', 'victoriaFalls', 'manaPools'],
    conservationStatus: 'EN',
    conservationLabel: 'Endangered',
    description:
      'The largest land animal on earth, African elephants are a cornerstone species of the bushveld and a highlight of any safari. The Timbavati and Kruger host large herds regularly passing through on ancient migration routes. At Mana Pools, elephants have learned a remarkable behaviour. Some bulls stand on their hind legs to reach the seed pods of the tall albida (winter thorn) trees. Matriarchs lead family groups of 10–30 related females, while bull elephants live mostly solitary lives or in small bachelor groups.',
    habitat: 'Savannah, bushveld, riverine forest, and semi-arid scrub across sub-Saharan Africa.',
    bestSpotting: 'Near certain at all three safari stops. The Kings Camp waterhole draws them through the day; the Zambezi above Victoria Falls holds breeding herds that cross to the islands. Mana Pools is the highlight - herds feed across the floodplain all day and individual bulls famously stand on their hind legs to reach albida pods.',
    facts: [
      'Elephants are the only animals that have death rituals. They grieve, revisit bones, and mourn their dead.',
      'An elephant\'s trunk has over 40,000 individual muscles and can lift up to 350 kg.',
      'They communicate over distances of up to 10 km using infrasound, frequencies too low for humans to hear.',
      'Mana Pools elephants are uniquely known for standing bipedally on their hind legs to reach albida tree pods.',
    ],
    image: 'elephant.jpg',
  },
  {
    id: 'white-rhino',
    commonName: 'White Rhinoceros',
    scientificName: 'Ceratotherium simum',
    destinations: ['timbavati'],
    conservationStatus: 'NT',
    conservationLabel: 'Near Threatened',
    description:
      'The white rhino is the world\'s largest rhino species and the second-largest land animal after the elephant. Despite their name, white rhinos are grey. The name likely derives from the Afrikaans word "weit" (wide), referring to their broad, square mouth adapted for grazing. The greater Kruger supports the largest white rhino population in the world, though numbers are severely threatened by the ongoing poaching crisis. Encountering a mother and calf on a game drive is a deeply moving experience.',
    habitat: 'Open savannah and grassland with access to water. Strictly a grazer, preferring short-grass plains.',
    bestSpotting: 'Kings Camp rangers track resident rhinos. Early morning drives along open grassland sections of the reserve. Rhinos are most active in the cooler morning hours.',
    facts: [
      'White rhinos have the largest horns of any rhino. The front horn can reach 1.5 metres in length.',
      'They are gregarious for rhinos, often seen in groups (called "crashes") of 2–10.',
      'A rhino\'s skin is up to 5 cm thick but is sensitive to sunburn. They wallow in mud to protect themselves.',
      'Despite being largely near-sighted, rhinos have an excellent sense of smell that compensates for poor vision.',
    ],
    image: 'white-rhino.jpg',
  },
  {
    id: 'cape-buffalo',
    commonName: 'Cape Buffalo',
    scientificName: 'Syncerus caffer',
    destinations: ['timbavati', 'victoriaFalls', 'manaPools'],
    conservationStatus: 'NT',
    conservationLabel: 'Near Threatened',
    description:
      'One of Africa\'s "Big Five" and arguably its most dangerous. Buffalo kill more hunters each year than any other animal. Herds of hundreds or thousands roam the greater Kruger, creating a thundering spectacle when on the move. Old solitary bulls, called "dagga boys" (from a Zulu word for mud), are notoriously ill-tempered and responsible for most buffalo-related fatalities. Despite this, buffalo grazing calmly in the golden afternoon light are a scene of pure Africa.',
    habitat: 'Dense bushveld, grassland, and riverine forest throughout sub-Saharan Africa.',
    bestSpotting: 'Large herds cross Kings Camp territory regularly. Mana Pools is the standout though - herds of several hundred come down to the Zambezi floodplain to drink in the late afternoon, and Ruckomechi walking safaris often approach them on foot. Also present in Zambezi National Park at Victoria Falls.',
    facts: [
      'Buffalo have never been domesticated. They are not related to domestic cattle despite the similar appearance.',
      'A buffalo herd will collectively decide which direction to travel each day through a "voting" behaviour involving the direction each animal points its body.',
      'They have excellent memories and have been known to ambush and kill former threats.',
      'Buffalo are one of the few prey animals that will turn and actively hunt a predator that attacks them.',
    ],
    image: 'buffalo.jpg',
  },
  {
    id: 'cheetah',
    commonName: 'Cheetah',
    scientificName: 'Acinonyx jubatus',
    destinations: ['timbavati'],
    conservationStatus: 'VU',
    conservationLabel: 'Vulnerable',
    description:
      'The fastest land animal on earth, cheetahs reach 112 km/h in 3 seconds during a sprint, but sustain this for only 200–300 metres before overheating. Unlike other big cats, cheetahs hunt in full daylight, typically in the cooler morning hours. They rely entirely on speed and precision rather than strength, using their distinctive black "tear marks" from eye to mouth to reduce sun glare during daytime hunts. Slender and built like greyhounds, cheetahs are often lost to lions and hyenas who steal their hard-earned kills.',
    habitat: 'Open savannah and lightly wooded grassland where visibility allows high-speed chases.',
    bestSpotting: 'Cheetahs are scarce in the greater Kruger due to competition from lions. Tell your ranger it\'s a priority. Open plains sections and elevated termite mounds where cheetahs scan for prey are the best spots.',
    facts: [
      'Cheetahs cannot roar. Instead they chirp, purr, and make a high-pitched chirping call to communicate.',
      'A cheetah\'s spine acts like a coiled spring, allowing massive stride lengths at full speed.',
      'Cheetah cubs have a distinctive silver mantle of fur on their backs, thought to mimic the honey badger to deter predators.',
      'Unlike other big cats, cheetahs have semi-retractable claws that provide grip like running spikes.',
    ],
    image: 'cheetah.jpg',
  },
  {
    id: 'wild-dog',
    commonName: 'African Wild Dog',
    scientificName: 'Lycaon pictus',
    destinations: ['timbavati', 'manaPools'],
    conservationStatus: 'EN',
    conservationLabel: 'Endangered',
    description:
      'The African wild dog (also called the painted dog for its unique coat of irregular ochre, black, and white blotches) is one of the continent\'s most endangered and charismatic predators. Fewer than 6,600 remain in the wild. They are highly social, living in packs of 2–27 individuals with an exceptional level of cooperation and care. Injured or sick pack members are fed and looked after by the group. Their hunts have the highest success rate of any predator (~80%) and their high-pitched twitter calls are extraordinarily distinctive.',
    habitat: 'Open savannah, woodland, and semi-arid scrub. Require large territories of hundreds to thousands of km².',
    bestSpotting: 'Mana Pools has one of the highest densities of wild dog in Africa. Pack sightings are common, especially on morning game drives. The Timbavati/Kruger also has resident packs; the guides track them actively.',
    facts: [
      'Wild dogs communicate using a unique twittering call that is one of the most distinctive sounds in the African bush.',
      'They vote democratically on when to initiate a hunt (through sneezing) and the majority rules.',
      'Wild dog pups are always allowed to feed first on a kill, even before the alpha pair.',
      'They are the only canids in Africa without dew claws (the fifth claw), making their tracks unmistakable.',
    ],
    image: 'wild-dog.jpg',
  },
  {
    id: 'giraffe',
    commonName: 'Southern Giraffe',
    scientificName: 'Giraffa giraffa',
    destinations: ['timbavati', 'victoriaFalls'],
    conservationStatus: 'VU',
    conservationLabel: 'Vulnerable',
    description:
      'The tallest animal on earth, a large male giraffe stands up to 5.8 metres high. Their long necks alone can reach 1.8 metres. In the greater Kruger, the South African giraffe (a subspecies of the southern giraffe) roams in small groups called "towers," browsing the top canopy of acacia trees that no other herbivore can reach. The southern giraffe\'s coat is a mosaic of rounded, star-edged tan patches running all the way down the legs, a useful way to tell them apart from the sharply geometric reticulated giraffe of East Africa. The patches sit over a network of blood vessels and help regulate body temperature. Drinking water requires an awkward splaying of front legs and makes them extremely vulnerable to lion attacks.',
    habitat: 'Open savannah and bushveld with scattered tall trees (particularly acacias) throughout sub-Saharan Africa.',
    bestSpotting: 'Common throughout the Timbavati wherever there are tall acacia and knobthorn, and present in Zambezi National Park at Victoria Falls. Do not look for them at Mana Pools - giraffe are genuinely absent from the Zambezi valley floor, so Sep 18-22 is your window.',
    facts: [
      'Giraffes have the same number of neck vertebrae as humans (7). Each one is just much larger.',
      'In August 2025 the IUCN split giraffe into four separate species. The animals you will see in the Timbavati and at Victoria Falls are southern giraffe (Giraffa giraffa): the most numerous of the four, at roughly 69,000 animals.',
      'Their heart weighs approximately 11 kg and generates double the blood pressure of a human to pump blood to the brain.',
      'Calves are born at about 1.8 metres tall and can stand within 30 minutes of birth.',
      'Giraffes sleep for only 4–5 hours per day, often in short standing naps of a few minutes.',
    ],
    image: 'giraffe.jpg',
  },
  {
    id: 'plains-zebra',
    commonName: 'Plains Zebra',
    scientificName: 'Equus quagga',
    destinations: ['timbavati', 'victoriaFalls', 'manaPools'],
    conservationStatus: 'NT',
    conservationLabel: 'Near Threatened',
    description:
      'Plains zebras are one of Africa\'s most iconic animals. Their bold black-and-white stripes are unmistakable across the savannah. No two zebras have the same stripe pattern; each individual is as unique as a human fingerprint. Stripes are thought to confuse biting flies (which seem unable to navigate the optical illusion), assist with temperature regulation, and help in individual recognition. Zebras form large herds and are important prey for lions, leopards, and hyenas. They are often found in mixed herds with wildebeest.',
    habitat: 'Open grassland, lightly wooded savannah, and floodplain margins across sub-Saharan Africa.',
    bestSpotting: 'Common in open Timbavati grassland, often mixed in with impala, and regular in Zambezi National Park near Victoria Falls. Genuinely uncommon on the Ruckomechi floodplain at Mana Pools - zebra there keep to drier ground inland, so treat a Mana Pools sighting as a bonus rather than an expectation.',
    facts: [
      'Zebra stripes are on their skin, not just their fur. If you shaved a zebra, it would still be striped.',
      'A group of zebras is called a "dazzle", a reference to the optical effect their stripes create in motion.',
      'Zebras can run at speeds of up to 65 km/h over short distances to evade predators.',
      'Foals can stand within 15 minutes of birth and run with the herd within an hour.',
    ],
    image: 'zebra.jpg',
  },
  {
    id: 'hippopotamus',
    commonName: 'Common Hippopotamus',
    scientificName: 'Hippopotamus amphibius',
    destinations: ['timbavati', 'victoriaFalls', 'manaPools'],
    conservationStatus: 'VU',
    conservationLabel: 'Vulnerable',
    description:
      'Despite their seemingly placid appearance basking in rivers, hippos are responsible for more human fatalities in Africa than any other large animal. Highly territorial and unpredictable, they can run at 30 km/h on land and open their massive jaws to expose canine tusks that can be 50 cm long. By day, hippos rest in water to keep cool and protect their sensitive skin. At night they emerge to graze, eating up to 40 kg of grass. The Zambezi River hosts enormous pods; their nightly chorus of grunts and bellows is one of the most evocative sounds of Africa.',
    habitat: 'Rivers, lakes, and swamps throughout sub-Saharan Africa.',
    bestSpotting: 'Zambezi River boat cruises at Victoria Falls and Mana Pools guarantee hippo sightings. Pods of 20–50 are common. Keep well clear of river exits where hippos emerge after dark.',
    facts: [
      'Hippos secrete a red oily substance that acts as a natural moisturiser and sunscreen, often mistaken for sweating blood.',
      'They cannot swim. They walk or run along riverbeds, rising to the surface to breathe every 3–5 minutes.',
      'A hippo\'s canine teeth grow throughout its life and are used as weapons in combat between bulls.',
      'Baby hippos are born underwater and must learn to swim immediately.',
    ],
    image: 'hippo.jpg',
  },
  {
    id: 'nile-crocodile',
    commonName: 'Nile Crocodile',
    scientificName: 'Crocodylus niloticus',
    destinations: ['timbavati', 'victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The largest freshwater predator in Africa, Nile crocodiles can exceed 6 metres in length and 1,000 kg in weight. Masters of ambush, they lie virtually motionless at the water\'s edge or just below the surface, exploding forward with terrifying speed to seize prey that comes to drink. Their bite is the most powerful of any living animal, producing up to 5,000 pounds per square inch of force. The Zambezi River at Mana Pools and Victoria Falls is home to thousands of crocodiles. Never wade into any African river without local guidance.',
    habitat: 'Rivers, lakes, swamps, and estuaries throughout sub-Saharan Africa and the Nile.',
    bestSpotting: 'Zambezi River banks at Ruckomechi and during boat cruises. Look for large individuals basking with mouths open to thermoregulate on sandy banks.',
    facts: [
      'Crocodiles have the most acidic stomach of any vertebrate and can digest bones, hooves, and teeth.',
      'They have been largely unchanged in form for over 200 million years.',
      'Crocodile mothers guard their eggs carefully and carry hatchlings to the water in their mouths.',
      'They can hold their breath for up to 2 hours and stay submerged for days if necessary.',
    ],
    image: 'crocodile.jpg',
  },
  {
    id: 'spotted-hyena',
    commonName: 'Spotted Hyena',
    scientificName: 'Crocuta crocuta',
    destinations: ['timbavati', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'Far more than the scavenger they are popularly portrayed as, spotted hyenas are highly efficient predators that kill up to 95% of their own food. They are the most abundant large carnivore in Africa. Hyena clans are led by dominant females. In a rare mammalian reversal, females are larger than males and socially dominant. Their haunting whooping calls and maniacal cackle are two of the most distinctive sounds of the African night. Hyena jaws are powerful enough to crush thick bones to access marrow.',
    habitat: 'Savannah, open woodland, bushveld, and desert margins across sub-Saharan Africa.',
    bestSpotting: 'Night drives at Kings Camp are the best opportunity, often around lion kills. At Mana Pools, listen for the whooping contact call after dark from camp - clans patrol the floodplain at night and den in the jesse bush.',
    facts: [
      'Spotted hyenas have the strongest jaws (relative to body size) of any mammal, able to crush hippo bones.',
      'Both male and female hyenas have nearly identical external genitalia, making sex determination extremely difficult.',
      'Hyenas live in female-dominated clans of up to 80 individuals with strict linear dominance hierarchies.',
      'Their haunting whooping call can be heard up to 5 km away and is used to coordinate clan members.',
    ],
    image: 'hyena.jpg',
  },
  {
    id: 'warthog',
    commonName: 'Common Warthog',
    scientificName: 'Phacochoerus africanus',
    destinations: ['timbavati', 'victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The warthog is Africa\'s comedy character: a boxy, bristled, tusked pig that trots briskly across the bush with its ridiculous antenna-tail held stiffly vertical. Warthogs are found throughout the bushveld of the Timbavati and Kruger in family groups. Despite their comical appearance, they are tough and surprisingly fast (55 km/h), and their ivory-yellow tusks are effective weapons against predators. They are famous for entering their burrow backwards, ready to defend themselves with their tusks against anything attempting to follow.',
    habitat: 'Open savannah and lightly wooded grassland throughout sub-Saharan Africa.',
    bestSpotting: 'Almost impossible to miss anywhere on this trip. Families trot across the Timbavati tracks all day, graze the verges around Victoria Falls town, and kneel to root on the Mana Pools floodplain. Watch for the vertical tail as they run.',
    facts: [
      'Warthogs kneel on their padded front knees to graze on short grass, a distinctive posture.',
      'They enter their burrows backwards so their tusks face any incoming predator.',
      'Despite being pigs, warthogs have no sweat glands and roll in mud to cool down.',
      'The warthog\'s "warts" are actually protective pads of cartilage, not actual warts.',
    ],
    image: 'warthog.jpg',
  },
  {
    id: 'impala',
    commonName: 'Impala',
    scientificName: 'Aepyceros melampus',
    destinations: ['timbavati', 'victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The impala is the most abundant antelope in the greater Kruger and a cornerstone of the food web: prey for lion, leopard, cheetah, wild dog, hyena, and even large eagles and pythons. Their speed (90 km/h) and extraordinary jumping ability (up to 3 metres high, 10 metres long) make them exceptionally agile escapees. Males carry distinctive lyre-shaped horns. In the rutting season, males roar and snort continuously as they herd females. Impala are often called "the McDonald\'s of the bush" because every predator eats them.',
    habitat: 'Lightly wooded savannah and bushveld near water throughout eastern and southern Africa.',
    bestSpotting: 'Virtually guaranteed on every game drive at all three safari stops. September is the tail end of the dry season, so look for large herds concentrated near water. The rut runs around May, so expect calmer mixed herds in September.',
    facts: [
      'Impala can leap up to 3 metres high and 10 metres long, often leaping in seemingly random directions to confuse predators.',
      'They are one of the few African antelopes that clean themselves like cats, using specialised incisor teeth to groom their coats.',
      'Their colouring (reddish-brown above, pale below) is a form of countershading camouflage.',
      'A unique scent gland on the back of each rear foot leaves a chemical trail, helping the herd stay together.',
    ],
    image: 'impala.jpg',
  },
  {
    id: 'greater-kudu',
    commonName: 'Greater Kudu',
    scientificName: 'Tragelaphus strepsiceros',
    destinations: ['timbavati', 'victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The greater kudu is among the most majestic of African antelopes, with males carrying spectacular spiral horns that can reach 1.8 metres along the spiral. The tall, grey-brown body bears distinctive white vertical stripes that break up the outline in dappled bush. Despite their size (up to 270 kg), kudu are shy and secretive, most active at dawn and dusk. Their spiralling horns are extraordinarily sought-after trophies, leading to legal and illegal hunting pressure. Their deep, resonant bark is one of the distinctive alarm calls of the African bush.',
    habitat: 'Woodland and dense bushveld with good tree cover throughout southern and eastern Africa.',
    bestSpotting: 'Denser combretum and mixed woodland in the Timbavati; riverine thicket at Victoria Falls. Mana Pools is the classic though - kudu gather under the winterthorn (albida) trees on the floodplain for the fallen pods, the same trees that draw the standing elephants. Most active at dawn and dusk.',
    facts: [
      'Male kudu use their impressive spiral horns for "horn wrestling" battles that can last over 30 minutes.',
      'Kudu horns are used in traditional culture as musical instruments (kuduzela), hunting calls, and sacred objects.',
      'When threatened, kudu sometimes attempt to leap fences (even high ones) they are exceptional jumpers.',
      'The stripes on a kudu\'s body are individual. Researchers use them to identify specific animals.',
    ],
    image: 'kudu.jpg',
  },

  // ─── VICTORIA FALLS (unique to this destination) ─────────────────────────
  {
    id: 'nile-monitor',
    commonName: 'Nile Monitor',
    scientificName: 'Varanus niloticus',
    destinations: ['timbavati', 'victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The Nile monitor is Africa\'s largest lizard, reaching up to 2 metres in length and 9 kg in weight. It is a powerful, opportunistic predator found along rivers and wetlands throughout sub-Saharan Africa. Nile monitors eat almost anything: fish, frogs, rodents, birds\' eggs, carrion, and even young crocodiles. They swim powerfully using their flattened tails and can stay submerged for long periods. Their forked, yellow tongue is used to "taste" the air for prey scents. Common along the Zambezi banks, they are often seen basking on rocks and logs near the water.',
    habitat: 'Riverbanks, lakeshores, wetlands, and coastal mangroves throughout sub-Saharan Africa.',
    bestSpotting: 'Zambezi riverbanks at Victoria Falls and the Ruckomechi river edge; also along the drainage lines and dams in the Timbavati. Look on rocks and logs near water in the morning while they bask to warm up.',
    facts: [
      'Nile monitors are the second-largest lizard in Africa after the Nile crocodile.',
      'They can swim powerfully, using their flattened tail like an oar, and often escape predators by diving into water.',
      'Monitor lizards are related to the Komodo dragon, members of the same Varanidae family.',
      'They play an important ecological role by scavenging carcasses and controlling crocodile egg numbers.',
    ],
    image: 'nile-monitor.jpg',
  },
  {
    id: 'african-fish-eagle',
    commonName: 'African Fish Eagle',
    scientificName: 'Icthyophaga vocifer',
    destinations: ['victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The African fish eagle is the national bird of Zimbabwe (and several other African nations) and one of the most iconic sounds of Africa. Its haunting, yelping call (thrown back with its head) is universally known as "the voice of Africa." This powerful raptor soars on thermals above rivers and lakes, scanning the water below with its extraordinary eyesight, then plunging talons-first to snatch fish from the surface. Unmistakable with its rich chestnut body, white head, and clean black wings. Common on the Zambezi at both Victoria Falls and Mana Pools.',
    habitat: 'Rivers, lakes, reservoirs, and coastal lagoons throughout sub-Saharan Africa.',
    bestSpotting: 'Look on tall dead trees and exposed branches along the Zambezi River. Their call (a loud, yelping cry) is heard constantly along the river: look up and find the calling bird perched or circling.',
    facts: [
      'The African fish eagle is the national bird of Zimbabwe, Zambia, South Sudan, and Namibia.',
      'It can spot a fish from 300+ metres altitude, then dive at 70 km/h to snatch it from the water.',
      'Pairs bond for life and use the same nest year after year, adding material until it becomes enormous.',
      'Its scientific name "vocifer" means "screaming" in Latin, a reference to its distinctive loud call.',
    ],
    image: 'african-fish-eagle.jpg',
  },

  // ─── MANA POOLS (unique species) ─────────────────────────────────────────
  {
    id: 'nyala',
    commonName: 'Nyala',
    scientificName: 'Tragelaphus angasii',
    destinations: ['manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The nyala is one of Africa\'s most beautiful antelopes, displaying extreme sexual dimorphism. Males and females look like entirely different species. Males are shaggy, dark chocolate-grey with yellow legs and white vertical stripes, carrying long twisted horns with yellow tips. Females are bright chestnut with bold white stripes and no horns. Nyalas are browsers of woodland undergrowth and are found in the riverine woodland of Mana Pools, where they are a common sight along the camp\'s edges at dusk. Males perform spectacular "lateral display" posturing to impress females.',
    habitat: 'Dense lowland woodland, thickets, and riverine forest in eastern and southern Africa.',
    bestSpotting: 'Common in the woodland near Ruckomechi camp. Often seen in the early morning and late evening feeding on fallen pods and new growth. Males frequently come near the camp perimeter.',
    facts: [
      'Nyala are one of Africa\'s most sexually dimorphic antelopes. Males and females look so different that early naturalists described them as separate species.',
      'Males raise their white dorsal crest and lower their horns during dominance displays against rivals.',
      'Nyala are dependent on permanent water and are never found far from rivers or waterholes.',
      'They are skilled at standing on their hind legs to browse leaves from branches above their normal reach.',
    ],
    image: 'nyala.jpg',
  },
  {
    id: 'waterbuck',
    commonName: 'Waterbuck',
    scientificName: 'Kobus ellipsiprymnus',
    destinations: ['victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The waterbuck is a large, robust antelope immediately identifiable by the distinctive white ring on its rump (in the Common waterbuck subspecies), said to look as though the animal sat down on a freshly painted toilet seat. Males carry long, curved, ridged horns. As their name suggests, waterbucks are never far from permanent water and are strong swimmers, often escaping into rivers or standing chest-deep to evade predators. They secrete a musky oily substance from their coat that is thought to deter insects and repel water.',
    habitat: 'Riverine woodland and grassy floodplains adjacent to permanent water.',
    bestSpotting: 'Common along the Zambezi at both Victoria Falls and Mana Pools. Look in the shade near water through the midday heat, and along the pool margins at Ruckomechi in the early morning. The white ring on the rump is unmistakable.',
    facts: [
      'Waterbuck secrete a strong-smelling oily substance from their skin. Their meat is notoriously tough and pungent.',
      'They will stand in water up to chest depth or swim to escape lions, predators often decline to follow.',
      'Bulls are territorial near water but are generally peaceable outside the breeding season.',
      'The ring of white on the rump is unique to each individual and is used by researchers to identify animals.',
    ],
    image: 'waterbuck.jpg',
  },
  {
    id: 'common-eland',
    commonName: 'Common Eland',
    scientificName: 'Tragelaphus oryx',
    destinations: ['capeTown', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The common eland is the largest antelope in Africa, a massive ox-like creature that can stand 1.7 metres at the shoulder and weigh up to 942 kg. Despite this bulk, eland can jump over 2-metre fences from a standing start. Both males and females carry twisted V-shaped horns. A distinctive loose dewlap hangs from the throat. Eland are nomadic browsers and grazers that wander widely across open woodland; at Mana Pools they are seen on the floodplains and in the mopane woodland, often in herds. The loud clicking sound of their hooves (from a tendon snapping) is audible from a distance.',
    habitat: 'Open woodland, bushveld, and savannah throughout eastern and southern Africa.',
    bestSpotting: 'Two very different chances on this trip: a reintroduced population roams the fynbos of Cape Point Nature Reserve, which you pass through on Sep 16, and herds of 25-60 move across the open Mana Pools floodplain. Listen for the distinctive clicking of their knee tendons - you often hear eland before you see them.',
    facts: [
      'Eland are the only African antelope that have been semi-domesticated. They are herded for milk and meat in southern Africa.',
      'The clicking sound of eland hooves is caused by a tendon in the foreleg snapping over a bone with each step.',
      'Old male eland develop a distinctive blue-grey colouring on their face and shoulders as they age.',
      'Despite their size, eland can jump fences of 2+ metres from a standing start, a remarkable athletic feat.',
    ],
    image: 'eland.jpg',
  },
  {
    id: 'saddle-billed-stork',
    commonName: 'Saddle-billed Stork',
    scientificName: 'Ephippiorhynchus senegalensis',
    destinations: ['manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The saddle-billed stork is arguably the most spectacular wading bird in Africa: a huge, striking bird over 1.5 metres tall with a vivid tricoloured bill (red, black, and yellow "saddle"), jet-black and brilliant white plumage, and long red legs. They stalk the shallow margins of rivers and floodplains, hunting fish, frogs, and aquatic invertebrates with their powerful bill. Mana Pools\' Zambezi floodplains are excellent habitat and the species is regularly seen wading in the shallows or standing sentinel-like on an exposed sandbank.',
    habitat: 'Large rivers, floodplains, marshes, and wetlands throughout sub-Saharan Africa.',
    bestSpotting: 'The Zambezi floodplains and pool margins at Mana Pools. Walk the riverbank in the early morning. Saddle-bills are often feeding in the shallows at dawn.',
    facts: [
      'The saddle-billed stork is one of the tallest flying birds in Africa, reaching 1.5 metres tall with a 2.4-metre wingspan.',
      'Males have yellow eyes; females have yellow irises with a red ring, one of the few African birds with clear sex-based eye colour differences.',
      'They are monogamous and pairs often mate for life, using the same nest tree for years.',
      'Chicks in the nest turn their backs to the sun and spread their wings to create shade for their siblings.',
    ],
    image: 'saddle-billed-stork.jpg',
  },

  // ─── CAPE TOWN — SPIDERS, INSECTS & SMALL CREATURES ───────────────────────
  {
    id: 'cape-rain-spider',
    commonName: 'Cape Rain Spider',
    scientificName: 'Palystes superciliosus',
    destinations: ['capeTown'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The Cape rain spider is one of South Africa\'s largest spiders and a creature that reliably stops first-time visitors dead in their tracks. A large female has a body 3.5 cm long and a leg span approaching 12 cm. Despite their alarming appearance, they are docile and non-aggressive; their bite is painful but not dangerous to healthy adults. They are named for their tendency to enter homes before rain, attracted by rising humidity. Females build spectacular silk nursery webs (large tent-like structures in garden bushes) to guard their egg sacs, which they defend ferociously against any intruder. Common in Cape Town gardens, fynbos hillsides, and inside homes around Table Mountain.',
    habitat: 'Fynbos scrubland, gardens, rocky hillsides, and suburban areas throughout the Cape Peninsula and Western Cape.',
    bestSpotting: 'Garden walls, window frames, and fynbos vegetation around the Cape Peninsula, especially after warm evenings or before rain. Common in the Kirstenbosch garden surrounds and along the coastal fynbos walks.',
    facts: [
      'Cape rain spiders are among the largest free-roaming (non-web-building) spiders in South Africa.',
      'Females can live up to 8 years; males die shortly after mating and are sometimes eaten by the female.',
      'The nursery web a female builds to protect her egg sac can be the size of a rugby ball. She guards it aggressively.',
      'Despite their size, their venom is mild compared to many smaller spider species and poses no danger to healthy adults.',
    ],
    image: 'cape-rain-spider.jpg',
  },
  {
    id: 'table-mountain-scorpion',
    commonName: 'Table Mountain Scorpion',
    scientificName: 'Uroplectes triangulifer',
    destinations: ['capeTown'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The Table Mountain scorpion is a compact, pale-yellow species endemic to the fynbos and rocky slopes of the Cape Peninsula. Reaching just 5–7 cm in length, these nocturnal hunters pursue insects and other invertebrates through the rocky terrain. Despite their fierce appearance, their venom is only mildly toxic, painful but not life-threatening to adults. They share an extraordinary property with all scorpions: under ultraviolet light they fluoresce a vivid blue-green, a fact researchers use to locate them after dark. Finding one sheltering under a rock on the Table Mountain plateau is a genuinely memorable moment.',
    habitat: 'Rocky outcrops, under stones and bark in fynbos scrubland throughout the Cape Peninsula.',
    bestSpotting: 'Carefully turn rocks on Table Mountain (always replace them afterwards). A UV torch after dark is the most reliable method. Also found at Cape Point and under loose bark near the Boulders penguin colony.',
    facts: [
      'All scorpions fluoresce vivid blue-green under ultraviolet light. A UV torch at night is the best way to find them.',
      'The Table Mountain scorpion is relatively mild-venomed. Its sting is painful but not medically serious for healthy adults.',
      'Scorpions give birth to live young, which the mother carries on her back until they moult for the first time.',
      'They can survive without food for over a year by dramatically slowing their metabolism.',
    ],
    image: 'table-mountain-scorpion.jpg',
  },
  {
    id: 'cape-baboon-spider',
    commonName: 'Cape Baboon Spider',
    scientificName: 'Harpactira cafreriana',
    destinations: ['capeTown'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The Cape baboon spider is South Africa\'s equivalent of a tarantula, a large, hairy theraphosid spider that lives in silk-lined burrows in sandy fynbos soil. With a body length up to 4 cm and a leg span of 8–10 cm, they are imposing creatures. The name "baboon spider" comes from the large hairy pads on their feet that superficially resemble a baboon\'s fingers. Despite their fearsome appearance, they are slow-growing, long-lived (females up to 25 years), reluctant to bite, and their venom is not life-threatening. They are rarely seen outside their burrows but their silk-lined entrance holes are visible in suitable habitat.',
    habitat: 'Sandy fynbos and scrubland soils throughout the Cape Peninsula and broader Western Cape. Burrows are typically on slopes with loose, well-drained soil.',
    bestSpotting: 'Baboon spider burrows (circular silk-lined holes up to 3 cm diameter) can be spotted in sandy fynbos soil on the Cape Peninsula. Look in late afternoon or after rain when they are most active at burrow entrances.',
    facts: [
      'Cape baboon spiders are the South African equivalent of tarantulas, members of the same broad theraphosid family.',
      'Females can live up to 25 years; males rarely survive more than a year after reaching sexual maturity.',
      'They hunt entirely by ambush, sitting at their burrow entrance and grabbing passing insects and invertebrates.',
      'South Africa has around 42 baboon spider species, many of which are poorly studied and some undescribed by science.',
    ],
    image: 'cape-baboon-spider.jpg',
  },

  // ─── TIMBAVATI — INSECTS, SPIDERS & SMALL CREATURES ────────────────────────
  {
    id: 'dung-beetle',
    commonName: 'African Dung Beetle',
    scientificName: 'Pachylomera femoralis',
    destinations: ['timbavati', 'victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The dung beetle is one of Africa\'s most remarkable and underappreciated animals, an unmissable sight on any game drive. Within minutes of an elephant or buffalo depositing dung, dozens of beetles appear from nowhere, fashioning perfectly spherical balls and rolling them away with extraordinary determination. The ball is used both as food and as a brood ball in which females lay eggs. What makes dung beetles truly extraordinary is their navigation: they orient by the Milky Way, the only known insect proven to navigate by the stars. Ancient Egyptians considered the scarab (a closely related genus) sacred.',
    habitat: 'Open savannah, bushveld, and grassland throughout sub-Saharan Africa, wherever large herbivores are present.',
    bestSpotting: 'Watch near any fresh elephant or buffalo dung on a game drive. Beetles appear within minutes. Look on open sandy tracks in the afternoon heat where rolling balls are most visible. A slow approach gives excellent close-up views.',
    facts: [
      'Dung beetles are the only known insect to navigate by the Milky Way. They use the galaxy\'s light band to roll their ball in a straight line.',
      'A dung beetle can roll a ball over 10 times its own weight over long distances.',
      'Ancient Egyptians worshipped the scarab as a symbol of the sun, the rolling dung ball representing the sun crossing the sky.',
      'Dung beetles play a critical ecological role: removing dung improves soil fertility, reduces parasite loads, and benefits grass growth.',
    ],
    image: 'dung-beetle.jpg',
  },
  {
    id: 'giant-millipede',
    commonName: 'Giant African Millipede',
    scientificName: 'Archispirostreptus gigas',
    destinations: ['timbavati', 'victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The giant African millipede is the world\'s largest millipede species. Adults reach 28–38 cm in length and 3 cm in width, a glistening black cylinder of dozens of leg pairs moving with surprising grace. Despite their alarming appearance, they are entirely harmless to humans. They are detritivores, feeding on rotting vegetation, fungi, and organic matter. When threatened, they curl into a tight spiral and secrete a mildly irritating defensive fluid. Finding one on a bush walk is a genuine highlight. Children and adults alike are fascinated.',
    habitat: 'Forest floors, riverine woodland, and moist savannah throughout sub-Saharan Africa.',
    bestSpotting: 'Most commonly encountered on bush walks after rain. They emerge to feed when the ground is moist. Look in leaf litter beneath acacia and mopane trees. Common at both Kings Camp and Ruckomechi after late-afternoon showers.',
    facts: [
      'Giant African millipedes can have up to 400 legs. Each body segment carries two pairs.',
      'They do not bite but secrete a defensive fluid from pores along their sides that can irritate skin and eyes.',
      'They live up to 7 years and are entirely vegetarian, important recyclers of plant material in the ecosystem.',
      'Despite their imposing appearance, they are docile enough to be safely handled briefly, a popular highlight for children on bush walks.',
    ],
    image: 'giant-millipede.jpg',
  },
  {
    id: 'golden-orb-spider',
    commonName: 'Golden Orb-Web Spider',
    scientificName: 'Trichonephila senegalensis',
    destinations: ['timbavati', 'victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The golden orb-web spider builds some of the largest and strongest webs of any spider, up to 1.5 metres in diameter, with silk that catches morning sunlight in a literal golden gleam. Walking through the bush, you regularly encounter these webs strung at face height between trees. The large central spider (always the female, up to 5 cm body length) is unmistakable: a torpedo-shaped body with vivid yellow and black markings. Multiple tiny males cluster at the web margins. The silk of this species is stronger than steel by weight and has been studied for medical and aerospace applications.',
    habitat: 'Open woodland, forest margins, and bush throughout sub-Saharan Africa wherever suitable anchoring trees exist.',
    bestSpotting: 'Look for golden-lit webs between trees on early morning game drives. The silk catches the sunrise. Common along woodland paths near Kings Camp\'s main structure and along the riverside vegetation at Ruckomechi.',
    facts: [
      'Golden orb-web silk is stronger than high-grade steel by weight and has been studied for surgical suture and aerospace applications.',
      'The web\'s golden colour attracts bees and reflects UV light in a way that helps the spider capture flying insects.',
      'The tiny males cluster at the edges of the female\'s web, waiting for mating opportunities. If they move too boldly, the female may eat them.',
      'The web can catch prey as large as small birds or bats, though insects are the primary target.',
    ],
    image: 'golden-orb-spider.jpg',
  },
  {
    id: 'mound-termite',
    commonName: 'Mound-Building Termite',
    scientificName: 'Macrotermes natalensis',
    destinations: ['timbavati', 'victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'Termites are the invisible architects of the African savannah: and their monumental mounds, rising 3–6 metres from the red earth, are one of the defining features of the Timbavati and Mana Pools landscape. A single Macrotermes colony can contain up to 3 million individuals, all descended from a queen who may lay 30,000 eggs per day. The mound is a feat of collective engineering: internally temperature-controlled, ventilated through a network of chimneys, and structured with nurseries, fungal gardens, and a royal chamber. Aardvarks, pangolins, aardwolves, banded mongooses, and many raptor species depend entirely on termite mounds.',
    habitat: 'Open savannah, woodland, and bushveld throughout sub-Saharan Africa.',
    bestSpotting: 'Termite mounds are impossible to miss. They dot the entire Timbavati and Mana Pools landscape. Look for fresh activity (pale sand and wet mud around the base) after rain. At dusk, winged reproductive termites (alates) swarm in enormous clouds after the first summer rains.',
    facts: [
      'A Macrotermes queen can live for 45 years and lay up to 30,000 eggs per day throughout her life.',
      'Termite mounds maintain an internal temperature of around 30°C regardless of outside conditions, through an intricate ventilation system.',
      'Termites cultivate Termitomyces fungus inside the mound in specialised gardens. The fungus breaks down cellulose the termites cannot digest directly.',
      'The total biomass of termites in African savannah exceeds the combined biomass of all large herbivores.',
    ],
    image: 'mound-termite.jpg',
  },

  // ─── VICTORIA FALLS / MANA POOLS — INSECTS & SMALL CREATURES ──────────────
  {
    id: 'mopane-worm',
    commonName: 'Mopane Worm',
    scientificName: 'Gonimbrasia belina',
    destinations: ['victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The mopane worm is the caterpillar of the Emperor Moth and one of the most culturally significant insects in southern Africa: a vital protein source eaten by millions across Zimbabwe, Zambia, Botswana, and South Africa. Up to 10 cm long, vivid with bristles of white, black, and red-orange, they feed exclusively on mopane tree leaves. In peak years they can completely defoliate enormous tracts of mopane woodland. Dried or fried mopane worms are sold in markets throughout Victoria Falls town: genuinely delicious, crunchy, earthy, and high in protein. Trying them is one of the more adventurous food experiences of the trip.',
    habitat: 'Mopane woodland throughout southern Africa, particularly Zimbabwe, Zambia, Botswana, and northern South Africa.',
    bestSpotting: 'Look on mopane trees throughout the Victoria Falls area and at Mana Pools. Best seen in late summer (Jan–Mar) when caterpillars are active, but dried specimens are sold year-round in Victoria Falls curio markets.',
    facts: [
      'Mopane worms are around 60% protein by dry weight, more protein per gram than beef.',
      'They represent a significant food security resource, sustainably harvested by local communities across southern Africa.',
      'The gut contents are squeezed out before eating, then the caterpillar is dried or fried, a traditional staple for centuries.',
      'The adult Emperor Moth (Gonimbrasia belina) has spectacular eye-spotted wings, though it is far less famous than its caterpillar stage.',
    ],
    image: 'mopane-worm.jpg',
  },
  {
    id: 'african-mantis',
    commonName: 'African Praying Mantis',
    scientificName: 'Sphodromantis gastrica',
    destinations: ['timbavati', 'victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The African praying mantis is the large, vivid green (or cryptic brown) insect seen posing with its characteristic "prayer" posture (front legs raised and folded) throughout the hotel gardens and riverine vegetation of Victoria Falls and the Timbavati. Master ambush predators, they sit motionless for hours before striking at insects with lightning speed. Their triangular head can rotate 180°, the only insects capable of this. Females sometimes consume the male during or after mating, a behaviour that is genuinely more widespread than popular culture suggests.',
    habitat: 'Grassland, bushveld, garden vegetation, and riverine woodland throughout sub-Saharan Africa.',
    bestSpotting: 'Garden vegetation around the Palm River Hotel and the Victoria Falls rainforest walk. Also common in the bush near Kings Camp. Look on flower heads and leaf tips where they wait to ambush pollinating insects.',
    facts: [
      'Mantids are the only insects with a single ear (located on the underside of their thorax) used to detect bat echolocation and evade capture.',
      'They can rotate their head 180° to track prey without moving their body, the only insects capable of this.',
      'A mantis can catch prey up to three times its own size, including small frogs, lizards, and even hummingbirds.',
      'Female mantis sometimes eat the male during mating. Studies show this actually increases the number of eggs fertilised.',
    ],
    image: 'african-mantis.jpg',
  },
  {
    id: 'tsetse-fly',
    commonName: 'Tsetse Fly',
    scientificName: 'Glossina morsitans',
    destinations: ['manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The tsetse fly is the most immediately relevant insect for visitors to Mana Pools, a constant companion on bush walks and game drives. Larger than a housefly, with folded scissor-like wings and a distinctly painful bite, tsetse flies feed on blood in daylight hours. They transmit sleeping sickness in humans (requiring sustained exposure, not a risk to short-term visitors) and Nagana in cattle, a disease that historically prevented cattle ranching in the Zambezi Valley and inadvertently preserved its wildlife. For visitors, bites are painful but not medically dangerous. Long sleeves and avoiding dark blue or black clothing (which strongly attract them) are the best defences.',
    habitat: 'Dense woodland, riverine forest, and jesse bush throughout the Zambezi Valley and across central Africa.',
    bestSpotting: 'Unavoidable in the mopane and jesse bush around Ruckomechi. Most active in daylight, particularly in shaded woodland. They will follow the vehicle. Wearing neutral-coloured clothing significantly reduces the number of bites.',
    facts: [
      'Tsetse flies are strongly attracted to dark blue and black colours. Wearing neutral bush colours is the single most effective prevention.',
      'They give birth to live larvae, one at a time, nourished inside the mother. Extraordinarily unusual for an insect.',
      'The tsetse\'s historical range prevented cattle ranching across vast areas of Africa, inadvertently preserving enormous tracts of wildlife habitat.',
      'Unlike mosquitoes, both male and female tsetse flies feed on blood, making both equally determined biters.',
    ],
    image: 'tsetse-fly.jpg',
  },
  {
    id: 'goliath-beetle',
    commonName: 'Southern Goliath Beetle',
    scientificName: 'Goliathus albosignatus',
    destinations: ['manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The southern Goliath is the only member of the goliath beetle genus to reach subtropical southern Africa. The giant 11 cm Goliathus goliatus of the guidebooks is a West and Central African species that does not occur anywhere on this itinerary. This one is smaller, at roughly 4 to 5 cm, but still an extraordinary insect: a heavy, chunky scarab patterned in bold black-and-white geometry, flying with a deep buzzing that announces it well before it comes into view. Adults feed on oozing tree sap and fermenting fallen fruit, and the mopane and riverine woodland around Ruckomechi is good habitat.',
    habitat: 'Subtropical woodland and riverine forest of Zimbabwe, Mozambique, Malawi and northeastern South Africa.',
    bestSpotting: 'Look on large trees (particularly sycamore figs and albida) where sap is oozing, and on fermenting fruits fallen to the ground. Morning is best when beetles emerge to feed. Less common than other insects but spectacular when found.',
    facts: [
      'The genus contains the heaviest insects in the world; this southern species is the smallest of the six, at around 4 to 5 cm.',
      'The larvae are even bulkier than the adults and feed underground on decaying wood for up to two years.',
      'Named after the biblical giant. Its range runs from Zimbabwe and Mozambique into northeastern South Africa. Mana Pools sits comfortably inside it.',
      'In flight it produces a deep buzzing audible from several metres away. You generally hear one before you find it.',
    ],
    image: 'goliath-beetle.jpg',
  },
  // ─── ADDED SEP 2026 — species the original guide was missing ──────────────
  {
    id: 'vervet-monkey',
    commonName: 'Vervet Monkey',
    scientificName: 'Chlorocebus pygerythrus',
    destinations: ['timbavati', 'victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'Small, grey-bodied monkeys with black faces framed in white, vervets live in troops of ten to fifty across the whole of southern Africa\'s woodland and riverine country. They are among the most-studied primates on earth: researchers established that vervets use distinct alarm calls for leopard, eagle and snake, and that other troop members respond appropriately to each, running up a tree for a leopard call, but looking up and diving into cover for an eagle. Adult males are unmistakable at close range for their vivid blue scrotum, a signal of rank. Around camps and lodges they are relentless opportunists, and a moment of inattention at breakfast is usually all it takes.',
    habitat: 'Riverine woodland, savannah with tall trees, and the edges of human settlement across sub-Saharan Africa.',
    bestSpotting:
      'Guaranteed at all three safari stops, and the species you are most likely to see stealing something. The Palm River Hotel grounds at Victoria Falls and the mahogany trees around Ruckomechi both hold habituated troops. Never leave food, sunglasses or an open tent unattended.',
    facts: [
      'Vervets have separate alarm calls for leopards, eagles and snakes. One of the first documented cases of semantic communication in a non-human animal.',
      'Troops are matrilineal: females stay in the troop they are born into for life, while males transfer out at maturity.',
      'They can survive on a remarkably broad diet. Fruit, leaves, seeds, insects, eggs and, given the chance, whatever is on your plate.',
      'The blue colouring of a dominant male is structural, not pigment. The same physics that makes a blue jay blue.',
    ],
    image: 'vervet-monkey.jpg',
  },
  {
    id: 'blue-wildebeest',
    commonName: 'Blue Wildebeest',
    scientificName: 'Connochaetes taurinus',
    destinations: ['timbavati'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The blue wildebeest (gnu) is the archetypal African plains antelope: a heavy-shouldered, narrow-hipped grazer with a shaggy black mane, a beard, and the sloping profile that makes a herd on the skyline instantly recognisable. The Kruger population does not undertake the famous Serengeti migration, but moves locally between grazing and water. Wildebeest are the great commensal of the savannah, almost always found alongside zebra: zebra crop the tall, coarse grass tops, opening up the shorter green growth that wildebeest prefer, and between them the two species pool a great deal of predator vigilance.',
    habitat: 'Open short-grass plains and lightly wooded savannah, always within reach of drinking water.',
    bestSpotting:
      'Open clearings in the Timbavati, very often mixed in with zebra and impala. Watch the herd\'s heads rather than the grass, a line of wildebeest all facing one direction is usually facing a predator.',
    facts: [
      'Around 80% of a season\'s calves are born within a three-week window, a survival strategy that swamps predators with more young than they can possibly take.',
      'Calves can stand and run within minutes of birth, faster than almost any other ungulate.',
      'The Afrikaans name "wildebees" simply means wild ox; "gnu" comes from the Khoikhoi rendering of their grunting call.',
      'They are absent from the Zambezi valley floor at Mana Pools, so the Timbavati is your window for this one.',
    ],
    image: 'blue-wildebeest.jpg',
  },
  {
    id: 'common-ostrich',
    commonName: 'Common Ostrich',
    scientificName: 'Struthio camelus',
    destinations: ['capeTown', 'timbavati'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The largest and heaviest living bird, and the fastest animal on two legs. A male ostrich stands up to 2.7 metres and can sustain 70 km/h, with a stride of nearly five metres. Flightlessness freed the ostrich to invest everything in running: it is the only bird with two toes rather than three or four, the larger one hooved like a horse\'s, and its legs can deliver a forward kick powerful enough to kill a lion. Males are black with white wing and tail plumes; females are a plain dusty brown that vanishes against dry grass while sitting on the nest.',
    habitat: 'Open semi-desert, short grassland and fynbos scrub with long sightlines.',
    bestSpotting:
      'Cape Point Nature Reserve holds a free-ranging population that you will very likely drive past on Sep 16, an odd and memorable sight against the Atlantic. Also present, though less common, in the open sections of the Timbavati.',
    facts: [
      'An ostrich eye is about 50 mm across, the largest of any land vertebrate, and bigger than its own brain.',
      'A communal nest holds eggs from several females, but the dominant hen arranges her own eggs in the centre where they are safest.',
      'They do not bury their heads in sand. A sitting bird lowers its neck flat to the ground to avoid being seen, which is where the story comes from.',
      'A single ostrich egg weighs about 1.4 kg, the equivalent of roughly two dozen chicken eggs.',
    ],
    image: 'common-ostrich.jpg',
  },
  {
    id: 'bontebok',
    commonName: 'Bontebok',
    scientificName: 'Damaliscus pygargus pygargus',
    destinations: ['capeTown'],
    conservationStatus: 'VU',
    conservationLabel: 'Vulnerable',
    description:
      'A strikingly marked antelope found nowhere on earth but the coastal lowlands of the Western Cape: rich chocolate-purple flanks, a brilliant white blaze running the length of the face, and white stockings and rump. The bontebok is one of conservation\'s great near-misses. By the 1830s, hunting and the ploughing of its narrow band of coastal fynbos had reduced the entire world population to fewer than twenty animals, kept alive on a handful of private Overberg farms. Every bontebok alive today descends from that remnant. Numbers now stand in the low thousands, and the animal appears on the coat of arms of the Western Cape.',
    habitat: 'Coastal renosterveld and fynbos of the southwestern Cape, one of the smallest natural ranges of any African antelope.',
    bestSpotting:
      'Cape Point Nature Reserve, which you drive through on the Sep 16 Peninsula tour. Look on the open fynbos flats rather than in scrub, bontebok favour short grazing with long views, and the white face blaze catches the light from a long way off.',
    facts: [
      'The entire species passed through a bottleneck of fewer than 20 animals in the 1830s, and every bontebok today descends from them.',
      'The species as a whole (Damaliscus pygargus) is assessed as Least Concern; it is this bontebok subspecies that carries the Vulnerable listing.',
      'Bontebok National Park near Swellendam was proclaimed in 1931 specifically to save the animal, one of the world\'s earliest single-species reserves.',
      'Unusually for antelope, both sexes carry ringed horns of a similar size.',
    ],
    image: 'bontebok.jpg',
  },
  {
    id: 'cape-sugarbird',
    commonName: 'Cape Sugarbird',
    scientificName: 'Promerops cafer',
    destinations: ['capeTown'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'A fynbos endemic found nowhere else on earth, and the bird most worth learning before you reach Cape Town. The male trails a tail up to three times his body length, streaming behind him as he displays over the proteas, clapping his wings audibly. Sugarbirds and proteas are locked together: the bird drinks nectar from the great cone-shaped flower heads and carries pollen from plant to plant on its forehead feathers, and the protea in turn provides the only food source rich enough to support it. Where the fynbos goes, the sugarbird goes.',
    habitat: 'Protea-rich mountain fynbos of the Western and Eastern Cape, a range of only a few hundred kilometres.',
    bestSpotting:
      'Kirstenbosch National Botanical Garden and the protea stands on the slopes of Table Mountain, both on your Sep 17 itinerary. Watch the tallest flower head in a stand and wait. Males use a favourite perch repeatedly. September is peak protea flowering, which is the best time of year for this.',
    facts: [
      'One of only two species in the family Promeropidae, which is endemic to southern Africa and found nowhere else.',
      'Breeding is timed to the winter protea flowering, so September birds are feeding young.',
      'The forehead feathers turn orange with protea pollen. A visible sign of the job they do for the plant.',
      'The Cape Floristic Region it depends on has over 9,000 plant species, nearly 70% of which grow nowhere else on earth.',
    ],
    image: 'cape-sugarbird.jpg',
  },
  {
    id: 'african-black-oystercatcher',
    commonName: 'African Oystercatcher',
    scientificName: 'Haematopus moquini',
    destinations: ['capeTown'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'An entirely sooty-black wader with a heavy carrot-orange bill, a red eye-ring and thick pink legs, unmistakable against the dark rocks of the Cape coast. It is one of southern Africa\'s genuine conservation successes: the total population was under 5,000 birds in the 1980s, and protection of breeding beaches, control of off-road vehicles and, unexpectedly, an abundant invasive Mediterranean mussel have together pushed numbers up enough for the species to be downlisted from Near Threatened. Pairs hold the same stretch of shoreline for years and are noisily intolerant of intruders.',
    habitat: 'Rocky shores, mussel beds and undisturbed sandy beaches of the South African and Namibian coast.',
    bestSpotting:
      'The rocks at Boulders Beach and around the Cape Point coastline on Sep 16, often the second-most-noticeable bird there after the penguins. Listen first: a loud, sharp "kleeep" carrying over the surf usually gives them away before you see them.',
    facts: [
      'The entire world population is only around 6,000 birds, almost all of them in South Africa and Namibia.',
      'Chicks are left on open beaches and rely on stillness for camouflage, which makes the birds acutely vulnerable to foot and vehicle traffic above the high-water mark.',
      'The heavy bill is used two ways: some individuals hammer mussels open, others stab between the shells to cut the muscle. The technique is learned from the parents.',
      'Pairs can hold the same territory for more than a decade.',
    ],
    image: 'african-black-oystercatcher.jpg',
  },
  {
    id: 'lilac-breasted-roller',
    commonName: 'Lilac-breasted Roller',
    scientificName: 'Coracias caudatus',
    destinations: ['timbavati', 'victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The bird everyone photographs, and with reason: a lilac breast, turquoise belly, chestnut back and two shades of blue in the wing, all on one animal, perched in the open on a bare branch beside the track. The name comes from the male\'s courtship flight, a steep climb followed by a rolling, tumbling dive with a harsh rasping call. Rollers are sit-and-wait hunters, dropping from an exposed perch onto grasshoppers, beetles, scorpions and small lizards. That habit of choosing the most conspicuous perch available is exactly why they are so easy to see.',
    habitat: 'Open woodland and savannah with scattered dead trees and good perches; avoids dense forest.',
    bestSpotting:
      'On the roadside perches during every game drive at all three safari stops. The colours only really fire when the bird opens its wings, so if one is perched, wait for it to drop on prey. The flash of deep blue and turquoise is the whole point.',
    facts: [
      'The full colour range only shows in flight; a perched bird hides the brightest blues in the folded wing.',
      'They will take on prey close to their own size, including scorpions and small snakes, beating it against a branch before swallowing.',
      'Fiercely territorial in the breeding season, and known to mob raptors many times their size.',
      'Long the unofficial national bird of both Kenya and Botswana, though neither country has ever formally designated one.',
    ],
    image: 'lilac-breasted-roller.jpg',
  },
  {
    id: 'southern-ground-hornbill',
    commonName: 'Southern Ground Hornbill',
    scientificName: 'Bucorvus leadbeateri',
    destinations: ['timbavati'],
    conservationStatus: 'VU',
    conservationLabel: 'Vulnerable',
    description:
      'A turkey-sized black bird that walks rather than flies, with a heavy casqued bill and startling bare red skin on the face and throat. Ground hornbills live in co-operative groups of two to nine, all of them helping raise a single chick, and they are among the slowest-reproducing birds in the world. A group raises roughly one surviving young per nine years. That, combined with their need for very large old trees to nest in, makes them acutely vulnerable outside protected areas. Their booming pre-dawn call carries for kilometres and is one of the defining sounds of the Kruger bushveld.',
    habitat: 'Open savannah and grassland with large mature trees for nesting; needs enormous home ranges of 100 km² or more.',
    bestSpotting:
      'Walking in file across open ground in the Timbavati, usually in the early morning. Listen at dawn from Kings Camp. The deep four-note booming duet carries a very long way and is often the first thing you hear. They are absent from the Zambezi valley floor, so this is a Timbavati bird for you.',
    facts: [
      'A breeding group raises only about one chick to independence every nine years, one of the lowest reproductive rates of any bird.',
      'They are long-lived to compensate, reaching 50–60 years in the wild.',
      'The red throat pouch is inflated to produce the booming call, which is often mistaken for a lion at a distance.',
      'Regarded as a protected bird in Zulu and Venda tradition, where harming one is held to bring drought.',
    ],
    image: 'southern-ground-hornbill.jpg',
  },
  {
    id: 'southern-carmine-bee-eater',
    commonName: 'Southern Carmine Bee-eater',
    scientificName: 'Merops nubicoides',
    destinations: ['victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'Deep carmine-pink with a turquoise crown and long tail streamers, and (for your trip specifically) the single best-timed sighting on the itinerary. Carmine bee-eaters arrive on the Zambezi in August and September to breed, excavating nest tunnels a metre deep into the vertical sand banks of the river and gathering in colonies that can run to several thousand pairs. They hunt on the wing, and habitually ride on the backs of elephant, buffalo and kudu to snap up the insects the animals flush from the grass as they walk.',
    habitat: 'Vertical sandy riverbanks for breeding; open floodplain and woodland for hunting.',
    bestSpotting:
      'This is the right trip at the right time. September is peak breeding season on the Zambezi: ask specifically about the bank colonies on the Ruckomechi boat cruise and on the Victoria Falls river stretch. Watch, too, for birds riding on the backs of elephant and kudu out on the Mana Pools floodplain.',
    facts: [
      'Colonies on the Zambezi can exceed 10,000 birds, riddling a single bank with nest tunnels.',
      'They ride on large mammals (and even on bustards) to catch the insects flushed from the grass.',
      'Bee-eaters de-sting bees by beating them against a perch and wiping the abdomen before swallowing.',
      'August to November is the breeding window; by December most have dispersed north, so a September visit is well timed.',
    ],
    image: 'southern-carmine-bee-eater.jpg',
  },
  {
    id: 'bushbuck',
    commonName: 'Bushbuck',
    scientificName: 'Tragelaphus sylvaticus',
    destinations: ['victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'A shy, solitary antelope of thick riverine cover: rich chestnut in the female, darkening almost to slate in an old ram, with white spots and stripes scattered over the flanks and a white throat patch. Unlike almost every other African antelope, bushbuck do not herd; they live alone in small overlapping home ranges and rely on freezing and slipping away rather than running. A disturbed animal gives a single explosive bark that sounds far too large for the animal making it. Rams are considered among the most dangerous of the smaller antelope when cornered, and will use their short straight horns.',
    habitat: 'Dense riverine thicket, forest edge and reed beds. Almost never far from water and cover.',
    bestSpotting:
      'The riverine thicket along the Zambezi at both Victoria Falls and Ruckomechi, at first and last light. Look for movement at the edge of cover rather than scanning the open ground, bushbuck rarely step far from a thicket they can vanish into.',
    facts: [
      'The only African antelope that is neither territorial nor herd-forming.',
      'Recent genetics split the old "bushbuck" into two species; the animal here is the northern or Cape bushbuck, Tragelaphus sylvaticus.',
      'Rams darken with age, so the darkest animal in an area is usually the oldest.',
      'They are strong swimmers and will take to water to escape wild dogs.',
    ],
    image: 'bushbuck.jpg',
  },
  {
    id: 'banded-mongoose',
    commonName: 'Banded Mongoose',
    scientificName: 'Mungos mungo',
    destinations: ['timbavati', 'victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'Small, grizzled-brown carnivores marked with a dozen dark bars across the back, banded mongooses move through the bush in noisy packs of ten to forty, chirring constantly to keep contact as they dig for beetles, millipedes and eggs. They are one of the most co-operative mammals in Africa: the pack raises its young communally, individual adults form long-term "escort" bonds with particular pups, and the whole group will mob a predator many times its size. Packs have been recorded driving off jackals and even lion. Termite mounds serve as dens, lookout posts and playgrounds.',
    habitat: 'Savannah and open woodland with termite mounds for denning; often near water.',
    bestSpotting:
      'Around termite mounds and fallen logs at all three safari stops, usually in the morning. You will hear them before you see them, a continuous low chirring from a moving patch of grass. They are also bold around lodge grounds.',
    facts: [
      'All the pack\'s females give birth within a day or two of each other, and the pups are raised in a single communal litter.',
      'Each pup is looked after by a specific adult "escort" that is usually not its parent.',
      'They crack open eggs and snails by hurling them backwards between their legs against a rock.',
      'Packs regularly follow warthog to feed on the ticks in their skin, a genuine cleaning partnership.',
    ],
    image: 'banded-mongoose.jpg',
  },
  {
    id: 'helmeted-guineafowl',
    commonName: 'Helmeted Guineafowl',
    scientificName: 'Numida meleagris',
    destinations: ['capeTown', 'timbavati', 'victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'A plump, slate-grey bird finely spotted all over in white, with a bare blue-and-red head and a bony horn-coloured casque. Guineafowl are everywhere on this itinerary and are almost impossible not to see: they walk in flocks along the roads, refuse to leave the track until the last possible moment, and then run rather than fly. Their harsh, mechanical "kek-kek-kek-kaaaa" alarm is one of the most useful sounds in the bush, a guineafowl flock that suddenly goes up into the trees calling has almost always seen a predator, and guides listen for it.',
    habitat: 'Grassland, farmland, open woodland and the verges of just about every road in southern Africa.',
    bestSpotting:
      'Everywhere, Cape farmland on the winelands drive, and on every game-drive track at all three safari stops. Worth paying attention to rather than dismissing: a flock alarm-calling is a reliable early warning that a leopard or serval is moving nearby.',
    facts: [
      'The bony casque on the head grows throughout life and differs slightly in shape between the sexes.',
      'Flocks that roost in trees at night walk considerable distances by day, always on foot where they can.',
      'They are voracious tick eaters, which is why farms across southern Africa tolerate and encourage them.',
      'Domesticated from wild African stock thousands of years ago; the birds in the Cape farmland are wild, not escapees.',
    ],
    image: 'helmeted-guineafowl.jpg',
  },
];

export const getAnimalsByDestination = (destinationId: DestinationId): Animal[] =>
  ANIMALS.filter((a) => a.destinations.includes(destinationId));
