export interface PackingItem {
  id: string;
  label: string;
  notes?: string;
}

export interface PackingCategory {
  id: string;
  title: string;
  icon: string;
  items: PackingItem[];
}

export const PACKING_LIST: PackingCategory[] = [
  {
    id: 'clothing',
    title: 'Safari Clothing',
    icon: '👕',
    items: [
      { id: 'long-sleeve-shirts', label: 'Long-sleeve shirts, neutral colours (3–4)', notes: 'Khaki, olive, stone, brown. Avoid dark blue and black on game drives. They attract tsetse flies, which matters at Mana Pools. No camouflage or military-pattern clothing: it is prohibited for travellers in Zimbabwe' },
      { id: 'tshirts', label: 'T-shirts, neutral colours (3–4)' },
      { id: 'trousers', label: 'Lightweight safari trousers or zip-offs (2 pairs)', notes: 'Long trousers protect against insects and thorn bush' },
      { id: 'shorts', label: 'Shorts (2 pairs)', notes: 'For Cape Town days and lodge pool time' },
      { id: 'fleece', label: 'Fleece or warm mid-layer jacket', notes: 'Open-vehicle game drives are cold before sunrise, essential at Timbavati and Mana Pools' },
      { id: 'windproof', label: 'Windproof / light rain jacket', notes: 'September brings occasional showers at Victoria Falls and Mana Pools' },
      { id: 'down-gilet', label: 'Down gilet or warm jumper for night drives', notes: 'Vehicles have no windscreen. Temperatures drop sharply after dark' },
      { id: 'evening-wear', label: 'Smart casual evening outfits (2–3)', notes: 'Lodge dinners are "resort smart". No need for formal wear, but not full bush kit either' },
      { id: 'underwear', label: 'Underwear (7+ pairs)' },
      { id: 'socks', label: 'Socks (7+ pairs, including a wool pair for cold mornings)' },
      { id: 'swimwear', label: 'Swimwear (2 sets)', notes: 'All lodges have pools; Cape Town beaches are swimmable in September' },
      { id: 'sun-hat', label: 'Wide-brimmed sun hat', notes: 'Compulsory. The African sun is intense even in early spring' },
      { id: 'sunglasses', label: 'Polarised sunglasses, UV protected', notes: 'TMAC ask for polarised rather than tinted fashion glasses, the glare off the Zambezi and the Cape water is severe' },
      { id: 'sleepwear', label: 'Sleepwear', notes: 'Warm for the camps. Timbavati and Mana Pools nights are cold in September' },
      { id: 'buff', label: 'Buff or neck gaiter', notes: 'Dust on game drives; doubles as ear warmer on cold mornings' },
      { id: 'gloves', label: 'Lightweight gloves', notes: 'For early morning drives at Timbavati and Mana Pools' },
    ],
  },
  {
    id: 'footwear',
    title: 'Footwear',
    icon: '👟',
    items: [
      { id: 'boots', label: 'Closed-toe ankle boots or walking boots', notes: 'Required for bush walks. Ankle support recommended; no open-toed shoes on any walk' },
      { id: 'trainers', label: 'Comfortable walking shoes or trainers', notes: 'For Cape Town sightseeing and casual lodge wear' },
      { id: 'sandals', label: 'Sandals or flip-flops', notes: 'Pool and lodge relaxing only' },
    ],
  },
  {
    id: 'documents',
    title: 'Documents & Money',
    icon: '📄',
    items: [
      { id: 'passport', label: 'Passport, valid at least 6 months beyond Sep 25', notes: 'Zimbabwe requires minimum 2 blank pages for entry stamps' },
      { id: 'kaza-visa', label: 'Zimbabwe KAZA UniVisa or eVisa', notes: 'Covers Zimbabwe and Zambia; available on arrival at VFA airport or online in advance (~$50 USD)' },
      { id: 'insurance-docs', label: 'Travel insurance certificate', notes: 'Must include emergency medical evacuation, essential for remote Mana Pools' },
      { id: 'yellow-fever', label: 'Yellow fever vaccination certificate', notes: 'Required if arriving from an endemic country; advisable to carry regardless' },
      { id: 'booking-confirmations', label: 'Printed/saved booking confirmations', notes: 'Ref: Ryan x 6, 927743. Saved in this app under Docs.' },
      { id: 'credit-cards', label: 'Credit/debit cards (Visa & Mastercard)', notes: 'SA: widely accepted. Zimbabwe: USD cash strongly preferred at most venues' },
      { id: 'usd-cash', label: 'USD cash ($300–$400)', notes: 'For tips, Victoria Falls activities, souvenirs and Zimbabwe incidentals' },
      { id: 'zar-cash', label: 'South African Rand (ZAR)', notes: 'Useful for Cape Town tips and small purchases; most places also accept USD and cards' },
      { id: 'copies', label: 'Copies of all key documents', notes: 'Kept separate from originals, photograph them and save to this app as well' },
    ],
  },
  {
    id: 'health',
    title: 'Health & Medicine',
    icon: '💊',
    items: [
      { id: 'malaria-meds', label: 'Malaria prophylaxis (prescribed)', notes: 'Timbavati, Victoria Falls, and Mana Pools are malaria zones. Consult your doctor 4–6 weeks before travel, Malarone or Doxycycline most commonly prescribed' },
      { id: 'deet', label: 'DEET insect repellent 50%+', notes: 'Apply to skin and clothing every evening at all bush destinations. Mosquitoes are most active at dusk and dawn' },
      { id: 'sunscreen', label: 'Sunscreen SPF 50+ (generous supply)', notes: 'The African sun at altitude and on open-vehicle drives is extremely intense; reapply every 2 hours' },
      { id: 'antihistamine', label: 'Antihistamine tablets and cream', notes: 'For bites, pollen (September is spring) and general allergic reactions' },
      { id: 'imodium', label: 'Imodium or anti-diarrhoeal medication', notes: 'Change of diet and water; always useful while travelling' },
      { id: 'rehydration', label: 'Oral rehydration sachets', notes: 'Heat, long game drives and alcohol can cause dehydration quickly' },
      { id: 'ibuprofen', label: 'Ibuprofen and paracetamol' },
      { id: 'plasters', label: 'Plasters, blister pads and antiseptic wipes' },
      { id: 'prescriptions', label: 'Prescription medicines, full course plus extra', notes: 'Carry in hand luggage; pharmacies at Mana Pools and Timbavati do not exist' },
      { id: 'eye-drops', label: 'Eye drops', notes: 'Dust on game drives can be significant, particularly at Mana Pools in the dry season' },
      { id: 'spare-glasses', label: 'Spare glasses if you wear contact lenses', notes: 'TMAC recommend this specifically, dust on the game drives irritates lenses badly' },
      { id: 'motion-sickness', label: 'Anti-nausea / motion sickness tablets', notes: 'Four light-aircraft charter legs plus the Zambezi boat cruises' },
      { id: 'lip-balm', label: 'Lip balm with SPF', notes: 'Low humidity in the African bush dries lips quickly' },
    ],
  },
  {
    id: 'electronics',
    title: 'Electronics & Photography',
    icon: '📷',
    items: [
      { id: 'camera', label: 'Camera body (DSLR or mirrorless)', notes: 'Sony, Nikon, Canon. Full frame or crop sensor both work well' },
      { id: 'telephoto', label: 'Telephoto lens 200mm minimum (400–500mm ideal)', notes: 'Many sightings are at distance; a long lens is the single most impactful photography investment for safari' },
      { id: 'memory-cards', label: 'Memory cards, multiple, high-speed', notes: 'Format them before you travel; bring more than you think you need' },
      { id: 'batteries', label: 'Extra camera batteries + charger', notes: 'Charge every night. Some camps have limited socket availability; bring 3+ batteries if possible' },
      { id: 'phone', label: 'Mobile phone + charging cable', notes: 'South Africa: most networks work (roaming). Zimbabwe: patchy at best. Mana Pools: no signal' },
      { id: 'power-bank', label: 'Power bank 10,000 mAh+', notes: 'Essential for long game drives where charging is not possible' },
      { id: 'adapter', label: 'Travel adapters', notes: 'South Africa: Type M (large 3-pin). Zimbabwe: Type G (UK 3-pin). Bring both or a universal.' },
      { id: 'headtorch', label: 'Head torch / headlamp + spare batteries', notes: 'Camp paths are unlit at night and wildlife can wander through: do not rely on your phone' },
      { id: 'binoculars', label: 'Binoculars 8×42 or 10×42', notes: 'Arguably the most important item after malaria meds, borrow or hire if you don\'t own them' },
      { id: 'bean-bag', label: 'Camera bean bag or window mount', notes: 'For stabilising telephoto shots on the vehicle door or roof hatch' },
      { id: 'dust-cover', label: 'Dust cover or rain sleeve for camera', notes: 'Fine Kalahari dust on game drives will find its way into everything' },
    ],
  },
  {
    id: 'toiletries',
    title: 'Toiletries',
    icon: '🪥',
    items: [
      { id: 'toothbrush', label: 'Toothbrush and toothpaste' },
      { id: 'shampoo', label: 'Shampoo and conditioner (travel size)', notes: 'All lodges provide toiletries but personal brands are welcome' },
      { id: 'deodorant', label: 'Deodorant' },
      { id: 'razor', label: 'Razor and shaving supplies' },
      { id: 'feminine-hygiene', label: 'Feminine hygiene products', notes: 'Very limited availability at lodges: bring a full supply' },
      { id: 'hand-sanitiser', label: 'Hand sanitiser (small bottle)' },
      { id: 'wet-wipes', label: 'Biodegradable wet wipes', notes: 'Useful in the field and on long game drives' },
    ],
  },
  {
    id: 'luggage',
    title: 'Luggage',
    icon: '🧳',
    items: [
      { id: 'soft-duffel', label: 'Soft-sided duffel for the charter flights', notes: 'CRITICAL: Federal Air and Wilderness Air Zimbabwe only take soft bags: no hard cases, no frame rucksacks, no long hanging straps, and at least one flat surface. CONFIRM THE WEIGHT LIMIT: the TMAC packing list in the Docs tab says usually 40 lb (18 kg) per person, and the itinerary points to a separate Important Travel Information document. Check with TMAC before you pack.' },
      { id: 'main-case', label: 'Main suitcase (Cape Town and Victoria Falls legs only)' },
      { id: 'day-pack', label: 'Small day pack or rucksack', notes: 'For game drives, Cape Town day trips and as hand luggage on flights' },
      { id: 'packing-cubes', label: 'Packing cubes', notes: 'Help enormously when living out of a soft duffel for multiple camp changes' },
      { id: 'laundry-bag', label: 'Laundry bag', notes: 'Laundry is included at Kings Camp and Wilderness Ruckomechi, hand it in each morning' },
      { id: 'reusable-bag', label: 'Reusable shopping bag', notes: 'South Africa charges for plastic bags; Zimbabwe is working to ban them entirely' },
    ],
  },
  {
    id: 'misc',
    title: 'Miscellaneous',
    icon: '🔦',
    items: [
      { id: 'bird-guide', label: 'Southern African bird guide', notes: 'TMAC suggest Newman\'s or Sasol. The Wildlife tab covers the headline species, but a proper bird guide earns its place on the Zambezi' },
      { id: 'books', label: 'Books or e-reader', notes: 'Long-haul flights, lazy afternoon siestas and camp down-time' },
      { id: 'snacks', label: 'Energy bars and snacks', notes: 'Long travel days on Sep 11, 14, 18, 21 and 25. Lodges may not have food until arrival' },
      { id: 'water-bottle', label: 'Reusable water bottle', notes: 'Lodges provide filtered water; single-use plastic is discouraged in national parks' },
      { id: 'notebook', label: 'Notebook and pen', notes: 'Wildlife sighting diary, more satisfying than typing on a phone mid-drive' },
      { id: 'earplugs', label: 'Earplugs and sleep mask', notes: 'Long-haul flights and very early morning wake-up calls (04:30 at some camps)' },
      { id: 'neck-pillow', label: 'Travel neck pillow' },
      { id: 'small-gifts', label: 'Small gifts for lodge staff', notes: 'Sweets, postcards from home, or small items from your city are always warmly received' },
    ],
  },
];
