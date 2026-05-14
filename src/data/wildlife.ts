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
  image: any;
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
    conservationStatus: 'EN',
    conservationLabel: 'Endangered',
    description:
      'The only penguin species that breeds in Africa, these charismatic birds waddle, bray (earning the nickname "jackass penguin"), and nest in burrows along the rocky Western Cape coastline. Boulders Beach near Simon\'s Town hosts a colony of several thousand, giving visitors the extraordinary experience of walking among wild penguins on a sandy beach. Their distinctive black-and-white tuxedo pattern is unique to each individual — the speckle pattern on their chest acts like a fingerprint.',
    habitat: 'Rocky coastlines, beaches, and cold upwelling ocean waters of the Benguela Current.',
    bestSpotting: 'Boulders Penguin Colony, Simons Town — included on your Sep 16 Peninsula Discovery tour. Morning visits are best before the beach gets crowded.',
    facts: [
      'African penguins can swim at up to 20 km/h underwater.',
      'They are monogamous and often return to the same nest burrow each year.',
      'Their population has declined by over 70% since the 1970s due to overfishing and oil spills.',
      'They regulate body temperature through bare pink patches of skin above their eyes.',
    ],
    image: require('../../assets/images/wildlife/african-penguin.jpg'),
  },
  {
    id: 'cape-fur-seal',
    commonName: 'Cape Fur Seal',
    scientificName: 'Arctocephalus pusillus',
    destinations: ['capeTown'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'Cape fur seals are the largest of the fur seal species and one of the most abundant marine mammals in South African waters. Boisterous colonies of hundreds to thousands haul out on rocky outcrops along the coast, filling the air with barking and the smell of the sea. Males can weigh up to 300 kg. They are agile predators underwater, capable of diving to 200 metres in pursuit of fish and squid. Great white sharks prey on them at Seal Island in False Bay — one of nature\'s most dramatic wildlife spectacles.',
    habitat: 'Rocky coastlines, offshore islands, and cold Benguela Current waters.',
    bestSpotting: 'Commonly seen from the V&A Waterfront and along the Cape Peninsula coast. Lookout Point in Hout Bay has a small viewing area above the harbour colony.',
    facts: [
      'Cape fur seals can live up to 25 years in the wild.',
      'Males arrive at breeding colonies in October to establish territories — September is just before peak season.',
      'They can hold their breath for up to 7 minutes while diving.',
      'The Cape fur seal was the species that first made the word "seal" synonymous with rich coastal wildlife for European explorers.',
    ],
    image: require('../../assets/images/wildlife/cape-fur-seal.jpg'),
  },
  {
    id: 'southern-right-whale',
    commonName: 'Southern Right Whale',
    scientificName: 'Eubalaena australis',
    destinations: ['capeTown'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'Southern right whales are among the most celebrated wildlife sightings in South Africa. From June to November, mothers and calves come close inshore to the bays of the Western Cape — Walker Bay near Hermanus and False Bay near Cape Town — to nurse their young in sheltered waters. These enormous animals (up to 17 metres long, 80 tonnes) are recognised by the distinctive white callosities on their heads, which are unique to each individual. In September you have a good chance of spotting them from the Cape Peninsula coastline.',
    habitat: 'Open oceans of the Southern Hemisphere; inshore bays of South Africa in winter and spring for calving.',
    bestSpotting: 'Look for blows (the distinctive V-shaped double blow) from coastal viewpoints along the False Bay coast, especially Boulders Beach and Muizenberg.',
    facts: [
      'They were named "right whales" by whalers who considered them the "right" whale to hunt — easy to approach and floating when dead.',
      'Southern right whales were hunted to near-extinction; their current population of ~17,000 is a conservation success story.',
      'They communicate using a variety of low-frequency moans and can detect sounds across hundreds of kilometres.',
      'Calves are born at 4–5 metres long and can gain 50–100kg per day while nursing.',
    ],
    image: require('../../assets/images/wildlife/southern-right-whale.jpg'),
  },
  {
    id: 'chacma-baboon',
    commonName: 'Chacma Baboon',
    scientificName: 'Papio ursinus',
    destinations: ['capeTown'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'Chacma baboons are the largest baboons in the world and are a regular sight along the Cape Peninsula. Troops of 20–100 individuals roam the slopes of Table Mountain National Park, foraging for roots, bulbs, berries, insects, and the occasional stolen tourist sandwich. They are highly intelligent and have learned that human food is an easy calorie source — never feed them, and keep car windows closed. The dominant male is a formidable animal capable of injuring humans. Observe from a respectful distance.',
    habitat: 'Fynbos scrubland, rocky hillsides, and coastal margins of the Cape Peninsula.',
    bestSpotting: 'Cape Point Nature Reserve and the road through the reserve. Also commonly seen on the Cape Peninsula coastal road near Scarborough and Kommetjie.',
    facts: [
      'Chacma baboons live in complex social hierarchies where females inherit their mother\'s social rank.',
      'They sleep on cliff ledges at night to avoid predators like leopard and caracal.',
      'A baboon\'s canine teeth can be longer than a lion\'s proportionally.',
      'The Cape Peninsula baboon population is actively managed to reduce conflict with humans.',
    ],
    image: require('../../assets/images/wildlife/baboon.jpg'),
  },
  {
    id: 'rock-hyrax',
    commonName: 'Rock Hyrax (Dassie)',
    scientificName: 'Procavia capensis',
    destinations: ['capeTown'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The rock hyrax — known locally as a "dassie" (from Afrikaans) — is a small, rotund mammal that looks like a large guinea pig but is, remarkably, the closest living relative of the elephant. The genetic connection is evidenced by their toenails (rather than claws), teeth structure, and internal anatomy. Hyraxes live in colonies on rocky outcrops, communicating with a wide repertoire of sounds. They are a favourite prey of the Verreaux\'s eagle. On Table Mountain, hyraxes are completely unfazed by tourists and can be observed at close range at the cable car station.',
    habitat: 'Rocky outcrops, cliff faces, and boulder-strewn slopes throughout southern Africa.',
    bestSpotting: 'Top of Table Mountain cable car station — hyraxes are abundant and approachable. Also common at Cape Point.',
    facts: [
      'Despite their size (~4kg), hyraxes are the closest living relatives of the elephant and manatee.',
      'Their feet have special moist pads with excellent grip, allowing them to climb almost vertical rock faces.',
      'Hyrax colonies post sentinels who give alarm calls when predators approach.',
      'They are poor at regulating body temperature and sunbathe in groups for warmth each morning.',
    ],
    image: require('../../assets/images/wildlife/dassie.jpg'),
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
      'The distinctive black-tipped tail tuft conceals a sharp spur — possibly used in communication or during mating.',
    ],
    image: require('../../assets/images/wildlife/lion.jpg'),
  },
  {
    id: 'white-lion',
    commonName: 'White Lion (Timbavati)',
    scientificName: 'Panthera leo (leucistic morph)',
    destinations: ['timbavati'],
    conservationStatus: 'VU',
    conservationLabel: 'Vulnerable',
    description:
      'The white lions of Timbavati are one of Africa\'s greatest wildlife marvels. They are not albinos but rather carry a recessive gene — leucism — that produces a creamy white or pale golden coat. They were unknown to Western science until the 1970s, when Chris McBride documented them in his book "The White Lions of Timbavati." The gene is unique to this specific region, meaning Timbavati is the only place on earth where white lions occur naturally in the wild. They hunt, breed, and behave identically to their tawny relatives.',
    habitat: 'Open savannah and bushveld of the Timbavati Private Nature Reserve and adjacent Kruger.',
    bestSpotting: 'Extremely special and not guaranteed — perhaps 5–10% of game drives encounter white lions in the Timbavati. Tell your ranger it\'s a priority and they will coordinate with trackers across the reserve.',
    facts: [
      'White lions were considered sacred messengers of the gods by the local Tsonga people for centuries.',
      'The white colouring is caused by a recessive gene called leucism — not albinism (their eyes are normal coloured).',
      'Despite popular belief, white lions are not more vulnerable in the wild — they are successful hunters.',
      'Captive white lions have been bred selectively; wild white lions are found only in Timbavati.',
    ],
    image: require('../../assets/images/wildlife/white-lion.jpg'),
  },
  {
    id: 'leopard',
    commonName: 'Leopard',
    scientificName: 'Panthera pardus',
    destinations: ['timbavati', 'manaPools'],
    conservationStatus: 'VU',
    conservationLabel: 'Vulnerable',
    description:
      'The most secretive and adaptable of the big cats, the leopard is a master of concealment and power. Largely solitary and nocturnal, leopards are famous for hoisting entire carcasses into tree branches out of reach of lions and hyenas. Their spotted rosette pattern provides perfect camouflage in dappled light. The Timbavati hosts a healthy leopard population; your night drives with spotlights greatly increase the chances of a sighting. Mana Pools leopards are present but rarely seen — a walking safari in the riverine woodland is your best chance.',
    habitat: 'Forest margins, kopjes, riverine woodland, and thick bush throughout sub-Saharan Africa.',
    bestSpotting: 'Night drives at Kings Camp with spotlights. Look for their distinctive eye-shine (amber-green). During the day, scan tree branches along dry riverbeds where they rest with kills.',
    facts: [
      'A leopard can haul prey twice its own body weight up a vertical tree trunk.',
      'Each leopard\'s rosette pattern is unique — researchers use them like fingerprints to identify individuals.',
      'Leopards are the most widespread of all the big cats, ranging from sub-Saharan Africa to the Russian Far East.',
      'Their spotted coats turn into perfect camouflage — large animals can walk within metres without noticing a resting leopard.',
    ],
    image: require('../../assets/images/wildlife/leopard.jpg'),
  },
  {
    id: 'elephant',
    commonName: 'African Elephant',
    scientificName: 'Loxodonta africana',
    destinations: ['timbavati', 'manaPools'],
    conservationStatus: 'EN',
    conservationLabel: 'Endangered',
    description:
      'The largest land animal on earth, African elephants are a cornerstone species of the bushveld and a highlight of any safari. The Timbavati and Kruger host large herds regularly passing through on ancient migration routes. At Mana Pools, elephants have learned a remarkable behaviour — some bulls stand on their hind legs to reach the seed pods of the tall albida (winter thorn) trees. Matriarchs lead family groups of 10–30 related females, while bull elephants live mostly solitary lives or in small bachelor groups.',
    habitat: 'Savannah, bushveld, riverine forest, and semi-arid scrub across sub-Saharan Africa.',
    bestSpotting: 'Almost certain at both Kings Camp (especially the waterhole) and Wilderness Ruckomechi. At Mana Pools, elephant herds gather on the floodplains throughout the day and drink from the Zambezi at dusk.',
    facts: [
      'Elephants are the only animals that have death rituals — they grieve, revisit bones, and mourn their dead.',
      'An elephant\'s trunk has over 40,000 individual muscles and can lift up to 350 kg.',
      'They communicate over distances of up to 10 km using infrasound — frequencies too low for humans to hear.',
      'Mana Pools elephants are uniquely known for standing bipedally on their hind legs to reach albida tree pods.',
    ],
    image: require('../../assets/images/wildlife/elephant.jpg'),
  },
  {
    id: 'white-rhino',
    commonName: 'White Rhinoceros',
    scientificName: 'Ceratotherium simum',
    destinations: ['timbavati'],
    conservationStatus: 'NT',
    conservationLabel: 'Near Threatened',
    description:
      'The white rhino is the world\'s largest rhino species and the second-largest land animal after the elephant. Despite their name, white rhinos are grey — the name likely derives from the Afrikaans word "weit" (wide), referring to their broad, square mouth adapted for grazing. The greater Kruger supports the largest white rhino population in the world, though numbers are severely threatened by the ongoing poaching crisis. Encountering a mother and calf on a game drive is a deeply moving experience.',
    habitat: 'Open savannah and grassland with access to water. Strictly a grazer, preferring short-grass plains.',
    bestSpotting: 'Kings Camp rangers track resident rhinos. Early morning drives along open grassland sections of the reserve. Rhinos are most active in the cooler morning hours.',
    facts: [
      'White rhinos have the largest horns of any rhino — the front horn can reach 1.5 metres in length.',
      'They are gregarious for rhinos, often seen in groups (called "crashes") of 2–10.',
      'A rhino\'s skin is up to 5 cm thick but is sensitive to sunburn — they wallow in mud to protect themselves.',
      'Despite being largely near-sighted, rhinos have an excellent sense of smell that compensates for poor vision.',
    ],
    image: require('../../assets/images/wildlife/white-rhino.jpg'),
  },
  {
    id: 'cape-buffalo',
    commonName: 'Cape Buffalo',
    scientificName: 'Syncerus caffer',
    destinations: ['timbavati'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'One of Africa\'s "Big Five" and arguably its most dangerous — buffalo kill more hunters each year than any other animal. Herds of hundreds or thousands roam the greater Kruger, creating a thundering spectacle when on the move. Old solitary bulls, called "dagga boys" (from a Zulu word for mud), are notoriously ill-tempered and responsible for most buffalo-related fatalities. Despite this, buffalo grazing calmly in the golden afternoon light are a scene of pure Africa.',
    habitat: 'Dense bushveld, grassland, and riverine forest throughout sub-Saharan Africa.',
    bestSpotting: 'Large herds regularly cross through Kings Camp territory. Look for buffalo and the oxpecker birds that ride on their backs picking ticks. Dagga boys are often found wallowing in mud near water sources.',
    facts: [
      'Buffalo have never been domesticated — they are not related to domestic cattle despite the similar appearance.',
      'A buffalo herd will collectively decide which direction to travel each day through a "voting" behaviour involving the direction each animal points its body.',
      'They have excellent memories and have been known to ambush and kill former threats.',
      'Buffalo are one of the few prey animals that will turn and actively hunt a predator that attacks them.',
    ],
    image: require('../../assets/images/wildlife/buffalo.jpg'),
  },
  {
    id: 'cheetah',
    commonName: 'Cheetah',
    scientificName: 'Acinonyx jubatus',
    destinations: ['timbavati'],
    conservationStatus: 'VU',
    conservationLabel: 'Vulnerable',
    description:
      'The fastest land animal on earth, cheetahs reach 112 km/h in 3 seconds during a sprint — but sustain this for only 200–300 metres before overheating. Unlike other big cats, cheetahs hunt in full daylight, typically in the cooler morning hours. They rely entirely on speed and precision rather than strength, using their distinctive black "tear marks" from eye to mouth to reduce sun glare during daytime hunts. Slender and built like greyhounds, cheetahs are often lost to lions and hyenas who steal their hard-earned kills.',
    habitat: 'Open savannah and lightly wooded grassland where visibility allows high-speed chases.',
    bestSpotting: 'Cheetahs are scarce in the greater Kruger due to competition from lions. Tell your ranger it\'s a priority. Open plains sections and elevated termite mounds where cheetahs scan for prey are the best spots.',
    facts: [
      'Cheetahs cannot roar — instead they chirp, purr, and make a high-pitched chirping call to communicate.',
      'A cheetah\'s spine acts like a coiled spring, allowing massive stride lengths at full speed.',
      'Cheetah cubs have a distinctive silver mantle of fur on their backs — thought to mimic the honey badger to deter predators.',
      'Unlike other big cats, cheetahs have semi-retractable claws that provide grip like running spikes.',
    ],
    image: require('../../assets/images/wildlife/cheetah.jpg'),
  },
  {
    id: 'wild-dog',
    commonName: 'African Wild Dog',
    scientificName: 'Lycaon pictus',
    destinations: ['timbavati', 'manaPools'],
    conservationStatus: 'EN',
    conservationLabel: 'Endangered',
    description:
      'The African wild dog — also called the painted dog for its unique coat of irregular ochre, black, and white blotches — is one of the continent\'s most endangered and charismatic predators. Fewer than 6,600 remain in the wild. They are highly social, living in packs of 2–27 individuals with an exceptional level of cooperation and care — injured or sick pack members are fed and looked after by the group. Their hunts have the highest success rate of any predator (~80%) and their high-pitched twitter calls are extraordinarily distinctive.',
    habitat: 'Open savannah, woodland, and semi-arid scrub. Require large territories of hundreds to thousands of km².',
    bestSpotting: 'Mana Pools has one of the highest densities of wild dog in Africa — pack sightings are common, especially on morning game drives. The Timbavati/Kruger also has resident packs; the guides track them actively.',
    facts: [
      'Wild dogs communicate using a unique twittering call that is one of the most distinctive sounds in the African bush.',
      'They vote democratically on when to initiate a hunt — through sneezing — and the majority rules.',
      'Wild dog pups are always allowed to feed first on a kill, even before the alpha pair.',
      'They are the only canids in Africa without dew claws (the fifth claw), making their tracks unmistakable.',
    ],
    image: require('../../assets/images/wildlife/wild-dog.jpg'),
  },
  {
    id: 'giraffe',
    commonName: 'Giraffe',
    scientificName: 'Giraffa camelopardalis',
    destinations: ['timbavati'],
    conservationStatus: 'VU',
    conservationLabel: 'Vulnerable',
    description:
      'The tallest animal on earth, a large male giraffe stands up to 5.8 metres high — their long necks alone can reach 1.8 metres. In the greater Kruger, the South African giraffe subspecies roams in small groups called "towers," browsing the top canopy of acacia trees that no other herbivore can reach. Their distinctive reticulated coat pattern — a mosaic of irregular dark patches separated by pale lines — helps regulate body temperature. Drinking water requires an awkward splaying of front legs and makes them extremely vulnerable to lion attacks.',
    habitat: 'Open savannah and bushveld with scattered tall trees (particularly acacias) throughout sub-Saharan Africa.',
    bestSpotting: 'Commonly seen throughout the Timbavati, especially in open areas with tall acacia trees. Easy to spot from a distance due to their height.',
    facts: [
      'Giraffes have the same number of neck vertebrae as humans (7) — each one is just much larger.',
      'Their heart weighs approximately 11 kg and generates double the blood pressure of a human to pump blood to the brain.',
      'Calves are born at about 1.8 metres tall and can stand within 30 minutes of birth.',
      'Giraffes sleep for only 4–5 hours per day, often in short standing naps of a few minutes.',
    ],
    image: require('../../assets/images/wildlife/giraffe.jpg'),
  },
  {
    id: 'plains-zebra',
    commonName: 'Plains Zebra',
    scientificName: 'Equus quagga',
    destinations: ['timbavati'],
    conservationStatus: 'NT',
    conservationLabel: 'Near Threatened',
    description:
      'Plains zebras are one of Africa\'s most iconic animals — their bold black-and-white stripes are unmistakable across the savannah. No two zebras have the same stripe pattern; each individual is as unique as a human fingerprint. Stripes are thought to confuse biting flies (which seem unable to navigate the optical illusion), assist with temperature regulation, and help in individual recognition. Zebras form large herds and are important prey for lions, leopards, and hyenas — they are often found in mixed herds with wildebeest.',
    habitat: 'Open grassland, lightly wooded savannah, and floodplain margins across sub-Saharan Africa.',
    bestSpotting: 'Common throughout the Timbavati reserve. Look for zebra in open grassland clearings, often associating with wildebeest and impala.',
    facts: [
      'Zebra stripes are on their skin, not just their fur — if you shaved a zebra, it would still be striped.',
      'A group of zebras is called a "dazzle" — a reference to the optical effect their stripes create in motion.',
      'Zebras can run at speeds of up to 65 km/h over short distances to evade predators.',
      'Foals can stand within 15 minutes of birth and run with the herd within an hour.',
    ],
    image: require('../../assets/images/wildlife/zebra.jpg'),
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
    bestSpotting: 'Zambezi River boat cruises at Victoria Falls and Mana Pools guarantee hippo sightings — pods of 20–50 are common. Keep well clear of river exits where hippos emerge after dark.',
    facts: [
      'Hippos secrete a red oily substance that acts as a natural moisturiser and sunscreen, often mistaken for sweating blood.',
      'They cannot swim — they walk or run along riverbeds, rising to the surface to breathe every 3–5 minutes.',
      'A hippo\'s canine teeth grow throughout its life and are used as weapons in combat between bulls.',
      'Baby hippos are born underwater and must learn to swim immediately.',
    ],
    image: require('../../assets/images/wildlife/hippo.jpg'),
  },
  {
    id: 'nile-crocodile',
    commonName: 'Nile Crocodile',
    scientificName: 'Crocodylus niloticus',
    destinations: ['timbavati', 'victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The largest freshwater predator in Africa, Nile crocodiles can exceed 6 metres in length and 1,000 kg in weight. Masters of ambush, they lie virtually motionless at the water\'s edge or just below the surface, exploding forward with terrifying speed to seize prey that comes to drink. Their bite is the most powerful of any living animal — producing up to 5,000 pounds per square inch of force. The Zambezi River at Mana Pools and Victoria Falls is home to thousands of crocodiles. Never wade into any African river without local guidance.',
    habitat: 'Rivers, lakes, swamps, and estuaries throughout sub-Saharan Africa and the Nile.',
    bestSpotting: 'Zambezi River banks at Ruckomechi and during boat cruises. Look for large individuals basking with mouths open to thermoregulate on sandy banks.',
    facts: [
      'Crocodiles have the most acidic stomach of any vertebrate and can digest bones, hooves, and teeth.',
      'They have been largely unchanged in form for over 200 million years.',
      'Crocodile mothers guard their eggs carefully and carry hatchlings to the water in their mouths.',
      'They can hold their breath for up to 2 hours and stay submerged for days if necessary.',
    ],
    image: require('../../assets/images/wildlife/crocodile.jpg'),
  },
  {
    id: 'spotted-hyena',
    commonName: 'Spotted Hyena',
    scientificName: 'Crocuta crocuta',
    destinations: ['timbavati'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'Far more than the scavenger they are popularly portrayed as, spotted hyenas are highly efficient predators that kill up to 95% of their own food. They are the most abundant large carnivore in Africa. Hyena clans are led by dominant females — in a rare mammalian reversal, females are larger than males and socially dominant. Their haunting whooping calls and maniacal cackle are two of the most distinctive sounds of the African night. Hyena jaws are powerful enough to crush thick bones to access marrow.',
    habitat: 'Savannah, open woodland, bushveld, and desert margins across sub-Saharan Africa.',
    bestSpotting: 'Night drives at Kings Camp are the best opportunity. Hyenas are often found around lion kills at night. Listen for the characteristic "whoop" call at dusk to locate a clan.',
    facts: [
      'Spotted hyenas have the strongest jaws (relative to body size) of any mammal, able to crush hippo bones.',
      'Both male and female hyenas have nearly identical external genitalia — making sex determination extremely difficult.',
      'Hyenas live in female-dominated clans of up to 80 individuals with strict linear dominance hierarchies.',
      'Their haunting whooping call can be heard up to 5 km away and is used to coordinate clan members.',
    ],
    image: require('../../assets/images/wildlife/hyena.jpg'),
  },
  {
    id: 'warthog',
    commonName: 'Common Warthog',
    scientificName: 'Phacochoerus africanus',
    destinations: ['timbavati'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The warthog is Africa\'s comedy character — a boxy, bristled, tusked pig that trots briskly across the bush with its ridiculous antenna-tail held stiffly vertical. Warthogs are found throughout the bushveld of the Timbavati and Kruger in family groups. Despite their comical appearance, they are tough and surprisingly fast (55 km/h), and their ivory-yellow tusks are effective weapons against predators. They are famous for entering their burrow backwards, ready to defend themselves with their tusks against anything attempting to follow.',
    habitat: 'Open savannah and lightly wooded grassland throughout sub-Saharan Africa.',
    bestSpotting: 'Almost impossible to miss in the Timbavati — warthog families are among the most commonly seen animals on every game drive. Watch for the vertical tail as they trot away.',
    facts: [
      'Warthogs kneel on their padded front knees to graze on short grass, a distinctive posture.',
      'They enter their burrows backwards so their tusks face any incoming predator.',
      'Despite being pigs, warthogs have no sweat glands and roll in mud to cool down.',
      'The warthog\'s "warts" are actually protective pads of cartilage — not actual warts.',
    ],
    image: require('../../assets/images/wildlife/warthog.jpg'),
  },
  {
    id: 'impala',
    commonName: 'Impala',
    scientificName: 'Aepyceros melampus',
    destinations: ['timbavati'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The impala is the most abundant antelope in the greater Kruger and a cornerstone of the food web — prey for lion, leopard, cheetah, wild dog, hyena, and even large eagles and pythons. Their speed (90 km/h) and extraordinary jumping ability (up to 3 metres high, 10 metres long) make them exceptionally agile escapees. Males carry distinctive lyre-shaped horns. In the rutting season, males roar and snort continuously as they herd females. Impala are often called "the McDonald\'s of the bush" because every predator eats them.',
    habitat: 'Lightly wooded savannah and bushveld near water throughout eastern and southern Africa.',
    bestSpotting: 'Impala are virtually guaranteed on every game drive. Look for large mixed herds of ewes and young, with dominant rams chasing rivals during the rut.',
    facts: [
      'Impala can leap up to 3 metres high and 10 metres long — often leaping in seemingly random directions to confuse predators.',
      'They are one of the few African antelopes that clean themselves like cats, using specialised incisor teeth to groom their coats.',
      'Their colouring — reddish-brown above, pale below — is a form of countershading camouflage.',
      'A unique scent gland on the back of each rear foot leaves a chemical trail, helping the herd stay together.',
    ],
    image: require('../../assets/images/wildlife/impala.jpg'),
  },
  {
    id: 'greater-kudu',
    commonName: 'Greater Kudu',
    scientificName: 'Tragelaphus strepsiceros',
    destinations: ['timbavati'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The greater kudu is among the most majestic of African antelopes, with males carrying spectacular spiral horns that can reach 1.8 metres along the spiral. The tall, grey-brown body bears distinctive white vertical stripes that break up the outline in dappled bush. Despite their size (up to 270 kg), kudu are shy and secretive, most active at dawn and dusk. Their spiralling horns are extraordinarily sought-after trophies, leading to legal and illegal hunting pressure. Their deep, resonant bark is one of the distinctive alarm calls of the African bush.',
    habitat: 'Woodland and dense bushveld with good tree cover throughout southern and eastern Africa.',
    bestSpotting: 'Look in denser mopane and combretum woodland areas of the Timbavati. Kudu are most active at dawn and dusk; they rest in dense cover during the day.',
    facts: [
      'Male kudu use their impressive spiral horns for "horn wrestling" battles that can last over 30 minutes.',
      'Kudu horns are used in traditional culture as musical instruments (kuduzela), hunting calls, and sacred objects.',
      'When threatened, kudu sometimes attempt to leap fences — even high ones — they are exceptional jumpers.',
      'The stripes on a kudu\'s body are individual — researchers use them to identify specific animals.',
    ],
    image: require('../../assets/images/wildlife/kudu.jpg'),
  },

  // ─── VICTORIA FALLS (unique to this destination) ─────────────────────────
  {
    id: 'nile-monitor',
    commonName: 'Nile Monitor',
    scientificName: 'Varanus niloticus',
    destinations: ['victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The Nile monitor is Africa\'s largest lizard, reaching up to 2 metres in length and 9 kg in weight. It is a powerful, opportunistic predator found along rivers and wetlands throughout sub-Saharan Africa. Nile monitors eat almost anything — fish, frogs, rodents, birds\' eggs, carrion, and even young crocodiles. They swim powerfully using their flattened tails and can stay submerged for long periods. Their forked, yellow tongue is used to "taste" the air for prey scents. Common along the Zambezi banks, they are often seen basking on rocks and logs near the water.',
    habitat: 'Riverbanks, lakeshores, wetlands, and coastal mangroves throughout sub-Saharan Africa.',
    bestSpotting: 'Zambezi riverbanks near Victoria Falls and the Ruckomechi river edge. Look on rocks and logs near the water, particularly in the morning when they bask to warm up.',
    facts: [
      'Nile monitors are the second-largest lizard in Africa after the Nile crocodile.',
      'They can swim powerfully, using their flattened tail like an oar, and often escape predators by diving into water.',
      'Monitor lizards are related to the Komodo dragon — members of the same Varanidae family.',
      'They play an important ecological role by scavenging carcasses and controlling crocodile egg numbers.',
    ],
    image: require('../../assets/images/wildlife/nile-monitor.jpg'),
  },
  {
    id: 'african-fish-eagle',
    commonName: 'African Fish Eagle',
    scientificName: 'Haliaeetus vocifer',
    destinations: ['victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The African fish eagle is the national bird of Zimbabwe (and several other African nations) and one of the most iconic sounds of Africa. Its haunting, yelping call — thrown back with its head — is universally known as "the voice of Africa." This powerful raptor soars on thermals above rivers and lakes, scanning the water below with its extraordinary eyesight, then plunging talons-first to snatch fish from the surface. Unmistakable with its rich chestnut body, white head, and clean black wings. Common on the Zambezi at both Victoria Falls and Mana Pools.',
    habitat: 'Rivers, lakes, reservoirs, and coastal lagoons throughout sub-Saharan Africa.',
    bestSpotting: 'Look on tall dead trees and exposed branches along the Zambezi River. Their call (a loud, yelping cry) is heard constantly along the river — look up and find the calling bird perched or circling.',
    facts: [
      'The African fish eagle is the national bird of Zimbabwe, Zambia, South Sudan, and Namibia.',
      'It can spot a fish from 300+ metres altitude, then dive at 70 km/h to snatch it from the water.',
      'Pairs bond for life and use the same nest year after year, adding material until it becomes enormous.',
      'Its scientific name "vocifer" means "screaming" in Latin — a reference to its distinctive loud call.',
    ],
    image: require('../../assets/images/wildlife/african-fish-eagle.jpg'),
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
      'The nyala is one of Africa\'s most beautiful antelopes, displaying extreme sexual dimorphism — males and females look like entirely different species. Males are shaggy, dark chocolate-grey with yellow legs and white vertical stripes, carrying long twisted horns with yellow tips. Females are bright chestnut with bold white stripes and no horns. Nyalas are browsers of woodland undergrowth and are found in the riverine woodland of Mana Pools, where they are a common sight along the camp\'s edges at dusk. Males perform spectacular "lateral display" posturing to impress females.',
    habitat: 'Dense lowland woodland, thickets, and riverine forest in eastern and southern Africa.',
    bestSpotting: 'Common in the woodland near Ruckomechi camp. Often seen in the early morning and late evening feeding on fallen pods and new growth. Males frequently come near the camp perimeter.',
    facts: [
      'Nyala are one of Africa\'s most sexually dimorphic antelopes — males and females look so different that early naturalists described them as separate species.',
      'Males raise their white dorsal crest and lower their horns during dominance displays against rivals.',
      'Nyala are dependent on permanent water and are never found far from rivers or waterholes.',
      'They are skilled at standing on their hind legs to browse leaves from branches above their normal reach.',
    ],
    image: require('../../assets/images/wildlife/nyala.jpg'),
  },
  {
    id: 'waterbuck',
    commonName: 'Waterbuck',
    scientificName: 'Kobus ellipsiprymnus',
    destinations: ['manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The waterbuck is a large, robust antelope immediately identifiable by the distinctive white ring on its rump (in the Common waterbuck subspecies) — said to look as though the animal sat down on a freshly painted toilet seat. Males carry long, curved, ridged horns. As their name suggests, waterbucks are never far from permanent water and are strong swimmers, often escaping into rivers or standing chest-deep to evade predators. They secrete a musky oily substance from their coat that is thought to deter insects and repel water.',
    habitat: 'Riverine woodland and grassy floodplains adjacent to permanent water.',
    bestSpotting: 'Common along the Zambezi floodplains and near the pools at Mana Pools. Look in the shade near water in the midday heat.',
    facts: [
      'Waterbuck secrete a strong-smelling oily substance from their skin — their meat is notoriously tough and pungent.',
      'They will stand in water up to chest depth or swim to escape lions — predators often decline to follow.',
      'Bulls are territorial near water but are generally peaceable outside the breeding season.',
      'The ring of white on the rump is unique to each individual and is used by researchers to identify animals.',
    ],
    image: require('../../assets/images/wildlife/waterbuck.jpg'),
  },
  {
    id: 'common-eland',
    commonName: 'Common Eland',
    scientificName: 'Tragelaphus oryx',
    destinations: ['manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The common eland is the largest antelope in Africa — a massive ox-like creature that can stand 1.7 metres at the shoulder and weigh up to 942 kg. Despite this bulk, eland can jump over 2-metre fences from a standing start. Both males and females carry twisted V-shaped horns. A distinctive loose dewlap hangs from the throat. Eland are nomadic browsers and grazers that wander widely across open woodland; at Mana Pools they are seen on the floodplains and in the mopane woodland, often in herds. The loud clicking sound of their hooves (from a tendon snapping) is audible from a distance.',
    habitat: 'Open woodland, bushveld, and savannah throughout eastern and southern Africa.',
    bestSpotting: 'Look on the open Mana Pools floodplains and in mopane woodland. Eland are often in herds of 25–60, making them visible across large distances. The clicking of their hooves often announces their presence before they\'re visible.',
    facts: [
      'Eland are the only African antelope that have been semi-domesticated — they are herded for milk and meat in southern Africa.',
      'The clicking sound of eland hooves is caused by a tendon in the foreleg snapping over a bone with each step.',
      'Old male eland develop a distinctive blue-grey colouring on their face and shoulders as they age.',
      'Despite their size, eland can jump fences of 2+ metres from a standing start — a remarkable athletic feat.',
    ],
    image: require('../../assets/images/wildlife/eland.jpg'),
  },
  {
    id: 'saddle-billed-stork',
    commonName: 'Saddle-billed Stork',
    scientificName: 'Ephippiorhynchus senegalensis',
    destinations: ['manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The saddle-billed stork is arguably the most spectacular wading bird in Africa — a huge, striking bird over 1.5 metres tall with a vivid tricoloured bill (red, black, and yellow "saddle"), jet-black and brilliant white plumage, and long red legs. They stalk the shallow margins of rivers and floodplains, hunting fish, frogs, and aquatic invertebrates with their powerful bill. Mana Pools\' Zambezi floodplains are excellent habitat and the species is regularly seen wading in the shallows or standing sentinel-like on an exposed sandbank.',
    habitat: 'Large rivers, floodplains, marshes, and wetlands throughout sub-Saharan Africa.',
    bestSpotting: 'The Zambezi floodplains and pool margins at Mana Pools. Walk the riverbank in the early morning — saddle-bills are often feeding in the shallows at dawn.',
    facts: [
      'The saddle-billed stork is one of the tallest flying birds in Africa, reaching 1.5 metres tall with a 2.4-metre wingspan.',
      'Males have yellow eyes; females have yellow irises with a red ring — one of the few African birds with clear sex-based eye colour differences.',
      'They are monogamous and pairs often mate for life, using the same nest tree for years.',
      'Chicks in the nest turn their backs to the sun and spread their wings to create shade for their siblings.',
    ],
    image: require('../../assets/images/wildlife/saddle-billed-stork.jpg'),
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
      'The Cape rain spider is one of South Africa\'s largest spiders and a creature that reliably stops first-time visitors dead in their tracks — a large female has a body 3.5 cm long and a leg span approaching 12 cm. Despite their alarming appearance, they are docile and non-aggressive; their bite is painful but not dangerous to healthy adults. They are named for their tendency to enter homes before rain, attracted by rising humidity. Females build spectacular silk nursery webs — large tent-like structures in garden bushes — to guard their egg sacs, which they defend ferociously against any intruder. Common in Cape Town gardens, fynbos hillsides, and inside homes around Table Mountain.',
    habitat: 'Fynbos scrubland, gardens, rocky hillsides, and suburban areas throughout the Cape Peninsula and Western Cape.',
    bestSpotting: 'Garden walls, window frames, and fynbos vegetation around the Cape Peninsula — especially after warm evenings or before rain. Common in the Kirstenbosch garden surrounds and along the coastal fynbos walks.',
    facts: [
      'Cape rain spiders are among the largest free-roaming (non-web-building) spiders in South Africa.',
      'Females can live up to 8 years; males die shortly after mating and are sometimes eaten by the female.',
      'The nursery web a female builds to protect her egg sac can be the size of a rugby ball — she guards it aggressively.',
      'Despite their size, their venom is mild compared to many smaller spider species and poses no danger to healthy adults.',
    ],
    image: require('../../assets/images/wildlife/cape-rain-spider.jpg'),
  },
  {
    id: 'table-mountain-scorpion',
    commonName: 'Table Mountain Scorpion',
    scientificName: 'Uroplectes triangulifer',
    destinations: ['capeTown'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The Table Mountain scorpion is a compact, pale-yellow species endemic to the fynbos and rocky slopes of the Cape Peninsula. Reaching just 5–7 cm in length, these nocturnal hunters pursue insects and other invertebrates through the rocky terrain. Despite their fierce appearance, their venom is only mildly toxic — painful but not life-threatening to adults. They share an extraordinary property with all scorpions: under ultraviolet light they fluoresce a vivid blue-green, a fact researchers use to locate them after dark. Finding one sheltering under a rock on the Table Mountain plateau is a genuinely memorable moment.',
    habitat: 'Rocky outcrops, under stones and bark in fynbos scrubland throughout the Cape Peninsula.',
    bestSpotting: 'Carefully turn rocks on Table Mountain (always replace them afterwards). A UV torch after dark is the most reliable method. Also found at Cape Point and under loose bark near the Boulders penguin colony.',
    facts: [
      'All scorpions fluoresce vivid blue-green under ultraviolet light — a UV torch at night is the best way to find them.',
      'The Table Mountain scorpion is relatively mild-venomed — its sting is painful but not medically serious for healthy adults.',
      'Scorpions give birth to live young, which the mother carries on her back until they moult for the first time.',
      'They can survive without food for over a year by dramatically slowing their metabolism.',
    ],
    image: require('../../assets/images/wildlife/table-mountain-scorpion.jpg'),
  },
  {
    id: 'cape-baboon-spider',
    commonName: 'Cape Baboon Spider',
    scientificName: 'Harpactira cafreriana',
    destinations: ['capeTown'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The Cape baboon spider is South Africa\'s equivalent of a tarantula — a large, hairy theraphosid spider that lives in silk-lined burrows in sandy fynbos soil. With a body length up to 4 cm and a leg span of 8–10 cm, they are imposing creatures. The name "baboon spider" comes from the large hairy pads on their feet that superficially resemble a baboon\'s fingers. Despite their fearsome appearance, they are slow-growing, long-lived (females up to 25 years), reluctant to bite, and their venom is not life-threatening. They are rarely seen outside their burrows but their silk-lined entrance holes are visible in suitable habitat.',
    habitat: 'Sandy fynbos and scrubland soils throughout the Cape Peninsula and broader Western Cape. Burrows are typically on slopes with loose, well-drained soil.',
    bestSpotting: 'Baboon spider burrows — circular silk-lined holes up to 3 cm diameter — can be spotted in sandy fynbos soil on the Cape Peninsula. Look in late afternoon or after rain when they are most active at burrow entrances.',
    facts: [
      'Cape baboon spiders are the South African equivalent of tarantulas — members of the same broad theraphosid family.',
      'Females can live up to 25 years; males rarely survive more than a year after reaching sexual maturity.',
      'They hunt entirely by ambush — sitting at their burrow entrance and grabbing passing insects and invertebrates.',
      'South Africa has around 42 baboon spider species, many of which are poorly studied and some undescribed by science.',
    ],
    image: require('../../assets/images/wildlife/cape-baboon-spider.jpg'),
  },

  // ─── TIMBAVATI — INSECTS, SPIDERS & SMALL CREATURES ────────────────────────
  {
    id: 'dung-beetle',
    commonName: 'African Dung Beetle',
    scientificName: 'Pachylomerus femoralis',
    destinations: ['timbavati', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The dung beetle is one of Africa\'s most remarkable and underappreciated animals — an unmissable sight on any game drive. Within minutes of an elephant or buffalo depositing dung, dozens of beetles appear from nowhere, fashioning perfectly spherical balls and rolling them away with extraordinary determination. The ball is used both as food and as a brood ball in which females lay eggs. What makes dung beetles truly extraordinary is their navigation: they orient by the Milky Way — the only known insect proven to navigate by the stars. Ancient Egyptians considered the scarab (a closely related genus) sacred.',
    habitat: 'Open savannah, bushveld, and grassland throughout sub-Saharan Africa, wherever large herbivores are present.',
    bestSpotting: 'Watch near any fresh elephant or buffalo dung on a game drive — beetles appear within minutes. Look on open sandy tracks in the afternoon heat where rolling balls are most visible. A slow approach gives excellent close-up views.',
    facts: [
      'Dung beetles are the only known insect to navigate by the Milky Way — they use the galaxy\'s light band to roll their ball in a straight line.',
      'A dung beetle can roll a ball over 10 times its own weight over long distances.',
      'Ancient Egyptians worshipped the scarab as a symbol of the sun — the rolling dung ball representing the sun crossing the sky.',
      'Dung beetles play a critical ecological role: removing dung improves soil fertility, reduces parasite loads, and benefits grass growth.',
    ],
    image: require('../../assets/images/wildlife/dung-beetle.jpg'),
  },
  {
    id: 'giant-millipede',
    commonName: 'Giant African Millipede',
    scientificName: 'Archispirostreptus gigas',
    destinations: ['timbavati', 'victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The giant African millipede is the world\'s largest millipede species — adults reach 28–38 cm in length and 3 cm in width, a glistening black cylinder of dozens of leg pairs moving with surprising grace. Despite their alarming appearance, they are entirely harmless to humans. They are detritivores, feeding on rotting vegetation, fungi, and organic matter. When threatened, they curl into a tight spiral and secrete a mildly irritating defensive fluid. Finding one on a bush walk is a genuine highlight — children and adults alike are fascinated.',
    habitat: 'Forest floors, riverine woodland, and moist savannah throughout sub-Saharan Africa.',
    bestSpotting: 'Most commonly encountered on bush walks after rain — they emerge to feed when the ground is moist. Look in leaf litter beneath acacia and mopane trees. Common at both Kings Camp and Ruckomechi after late-afternoon showers.',
    facts: [
      'Giant African millipedes can have up to 400 legs — each body segment carries two pairs.',
      'They do not bite but secrete a defensive fluid from pores along their sides that can irritate skin and eyes.',
      'They live up to 7 years and are entirely vegetarian — important recyclers of plant material in the ecosystem.',
      'Despite their imposing appearance, they are docile enough to be safely handled briefly — a popular highlight for children on bush walks.',
    ],
    image: require('../../assets/images/wildlife/giant-millipede.jpg'),
  },
  {
    id: 'golden-orb-spider',
    commonName: 'Golden Orb-Web Spider',
    scientificName: 'Trichonephila senegalensis',
    destinations: ['timbavati', 'victoriaFalls', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The golden orb-web spider builds some of the largest and strongest webs of any spider — up to 1.5 metres in diameter, with silk that catches morning sunlight in a literal golden gleam. Walking through the bush, you regularly encounter these webs strung at face height between trees. The large central spider (always the female — up to 5 cm body length) is unmistakable: a torpedo-shaped body with vivid yellow and black markings. Multiple tiny males cluster at the web margins. The silk of this species is stronger than steel by weight and has been studied for medical and aerospace applications.',
    habitat: 'Open woodland, forest margins, and bush throughout sub-Saharan Africa wherever suitable anchoring trees exist.',
    bestSpotting: 'Look for golden-lit webs between trees on early morning game drives — the silk catches the sunrise. Common along woodland paths near Kings Camp\'s main structure and along the riverside vegetation at Ruckomechi.',
    facts: [
      'Golden orb-web silk is stronger than high-grade steel by weight and has been studied for surgical suture and aerospace applications.',
      'The web\'s golden colour attracts bees and reflects UV light in a way that helps the spider capture flying insects.',
      'The tiny males cluster at the edges of the female\'s web, waiting for mating opportunities — if they move too boldly, the female may eat them.',
      'The web can catch prey as large as small birds or bats, though insects are the primary target.',
    ],
    image: require('../../assets/images/wildlife/golden-orb-spider.jpg'),
  },
  {
    id: 'mound-termite',
    commonName: 'Mound-Building Termite',
    scientificName: 'Macrotermes bellicosus',
    destinations: ['timbavati', 'manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'Termites are the invisible architects of the African savannah — and their monumental mounds, rising 3–6 metres from the red earth, are one of the defining features of the Timbavati and Mana Pools landscape. A single Macrotermes colony can contain up to 3 million individuals, all descended from a queen who may lay 30,000 eggs per day. The mound is a feat of collective engineering: internally temperature-controlled, ventilated through a network of chimneys, and structured with nurseries, fungal gardens, and a royal chamber. Aardvarks, pangolins, aardwolves, banded mongooses, and many raptor species depend entirely on termite mounds.',
    habitat: 'Open savannah, woodland, and bushveld throughout sub-Saharan Africa.',
    bestSpotting: 'Termite mounds are impossible to miss — they dot the entire Timbavati and Mana Pools landscape. Look for fresh activity (pale sand and wet mud around the base) after rain. At dusk, winged reproductive termites (alates) swarm in enormous clouds after the first summer rains.',
    facts: [
      'A Macrotermes queen can live for 45 years and lay up to 30,000 eggs per day throughout her life.',
      'Termite mounds maintain an internal temperature of around 30°C regardless of outside conditions, through an intricate ventilation system.',
      'Termites cultivate Termitomyces fungus inside the mound in specialised gardens — the fungus breaks down cellulose the termites cannot digest directly.',
      'The total biomass of termites in African savannah exceeds the combined biomass of all large herbivores.',
    ],
    image: require('../../assets/images/wildlife/mound-termite.jpg'),
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
      'The mopane worm is the caterpillar of the Emperor Moth and one of the most culturally significant insects in southern Africa — a vital protein source eaten by millions across Zimbabwe, Zambia, Botswana, and South Africa. Up to 10 cm long, vivid with bristles of white, black, and red-orange, they feed exclusively on mopane tree leaves. In peak years they can completely defoliate enormous tracts of mopane woodland. Dried or fried mopane worms are sold in markets throughout Victoria Falls town — genuinely delicious, crunchy, earthy, and high in protein. Trying them is one of the more adventurous food experiences of the trip.',
    habitat: 'Mopane woodland throughout southern Africa, particularly Zimbabwe, Zambia, Botswana, and northern South Africa.',
    bestSpotting: 'Look on mopane trees throughout the Victoria Falls area and at Mana Pools. Best seen in late summer (Jan–Mar) when caterpillars are active, but dried specimens are sold year-round in Victoria Falls curio markets.',
    facts: [
      'Mopane worms are around 60% protein by dry weight — more protein per gram than beef.',
      'They represent a significant food security resource, sustainably harvested by local communities across southern Africa.',
      'The gut contents are squeezed out before eating, then the caterpillar is dried or fried — a traditional staple for centuries.',
      'The adult Emperor Moth (Gonimbrasia belina) has spectacular eye-spotted wings, though it is far less famous than its caterpillar stage.',
    ],
    image: require('../../assets/images/wildlife/mopane-worm.jpg'),
  },
  {
    id: 'african-mantis',
    commonName: 'African Praying Mantis',
    scientificName: 'Sphodromantis gastrica',
    destinations: ['timbavati', 'victoriaFalls'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The African praying mantis is the large, vivid green (or cryptic brown) insect seen posing with its characteristic "prayer" posture — front legs raised and folded — throughout the hotel gardens and riverine vegetation of Victoria Falls and the Timbavati. Master ambush predators, they sit motionless for hours before striking at insects with lightning speed. Their triangular head can rotate 180° — the only insects capable of this. Females sometimes consume the male during or after mating, a behaviour that is genuinely more widespread than popular culture suggests.',
    habitat: 'Grassland, bushveld, garden vegetation, and riverine woodland throughout sub-Saharan Africa.',
    bestSpotting: 'Garden vegetation around the Palm River Hotel and the Victoria Falls rainforest walk. Also common in the bush near Kings Camp. Look on flower heads and leaf tips where they wait to ambush pollinating insects.',
    facts: [
      'Mantids are the only insects with a single ear — located on the underside of their thorax — used to detect bat echolocation and evade capture.',
      'They can rotate their head 180° to track prey without moving their body — the only insects capable of this.',
      'A mantis can catch prey up to three times its own size, including small frogs, lizards, and even hummingbirds.',
      'Female mantis sometimes eat the male during mating — studies show this actually increases the number of eggs fertilised.',
    ],
    image: require('../../assets/images/wildlife/african-mantis.jpg'),
  },
  {
    id: 'tsetse-fly',
    commonName: 'Tsetse Fly',
    scientificName: 'Glossina morsitans',
    destinations: ['manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The tsetse fly is the most immediately relevant insect for visitors to Mana Pools — a constant companion on bush walks and game drives. Larger than a housefly, with folded scissor-like wings and a distinctly painful bite, tsetse flies feed on blood in daylight hours. They transmit sleeping sickness in humans (requiring sustained exposure, not a risk to short-term visitors) and Nagana in cattle — a disease that historically prevented cattle ranching in the Zambezi Valley and inadvertently preserved its wildlife. For visitors, bites are painful but not medically dangerous. Long sleeves and avoiding dark blue or black clothing (which strongly attract them) are the best defences.',
    habitat: 'Dense woodland, riverine forest, and jesse bush throughout the Zambezi Valley and across central Africa.',
    bestSpotting: 'Unavoidable in the mopane and jesse bush around Ruckomechi. Most active in daylight, particularly in shaded woodland. They will follow the vehicle. Wearing neutral-coloured clothing significantly reduces the number of bites.',
    facts: [
      'Tsetse flies are strongly attracted to dark blue and black colours — wearing neutral bush colours is the single most effective prevention.',
      'They give birth to live larvae, one at a time, nourished inside the mother — extraordinarily unusual for an insect.',
      'The tsetse\'s historical range prevented cattle ranching across vast areas of Africa, inadvertently preserving enormous tracts of wildlife habitat.',
      'Unlike mosquitoes, both male and female tsetse flies feed on blood — making both equally determined biters.',
    ],
    image: require('../../assets/images/wildlife/tsetse-fly.jpg'),
  },
  {
    id: 'goliath-beetle',
    commonName: 'Goliath Beetle',
    scientificName: 'Goliathus goliatus',
    destinations: ['manaPools'],
    conservationStatus: 'LC',
    conservationLabel: 'Least Concern',
    description:
      'The goliath beetle is one of the largest and heaviest insects in the world — an adult male can reach 11 cm in length and weigh up to 100 grams. With bold black-and-white geometric patterns and enormous size, it looks almost too large to fly — yet takes to the air readily, with a deep, loud buzzing that announces its presence before it is seen. Found in tropical and subtropical woodland, goliath beetles feed on tree sap and fruit. Ruckomechi and the Mana Pools woodland are excellent habitat, and an encounter with one of these extraordinary beetles on a morning walk is genuinely unforgettable.',
    habitat: 'Tropical and subtropical woodland, riverine forest, and savannah throughout central and southern Africa.',
    bestSpotting: 'Look on large trees (particularly sycamore figs and albida) where sap is oozing, and on fermenting fruits fallen to the ground. Morning is best when beetles emerge to feed. Less common than other insects but spectacular when found.',
    facts: [
      'Goliath beetles are among the heaviest insects in the world — adult males can weigh up to 100 grams, comparable to a small bird.',
      'Goliath beetle larvae are even larger than adults and feed underground on decaying wood for up to two years.',
      'They are named after the biblical giant Goliath — an apt name for an insect that must be seen to be believed in size.',
      'In flight, a goliath beetle produces a sound comparable to a small model aircraft — audible from several metres away.',
    ],
    image: require('../../assets/images/wildlife/goliath-beetle.jpg'),
  },
];

export const getAnimalsByDestination = (destinationId: DestinationId): Animal[] =>
  ANIMALS.filter((a) => a.destinations.includes(destinationId));
