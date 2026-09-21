/**
 * Content model for the listing.
 *
 * Every string here was transcribed from the rendered reference page; the photo
 * grouping was derived by measuring which images fall under which section
 * heading in the photo tour. Nothing in this file is copied source.
 */

const IMG = "/assets/images";

export type Photo = {
  /** Stable id, also the filename stem. */
  id: string;
  src: string;
  category: string;
  alt: string;
};

/** Photo tour categories, in the order the reference lists them. */
export const PHOTO_CATEGORIES = [
  "Living room 1",
  "Living room 2",
  "Full kitchen",
  "Bedroom",
  "Full bathroom",
  "Gym",
  "Exterior",
  "Pool",
  "Additional photos",
] as const;

export type PhotoCategory = (typeof PHOTO_CATEGORIES)[number];

/** Amenity blurb shown under each photo tour section heading. */
export const CATEGORY_SUBTITLES: Partial<Record<PhotoCategory, string>> = {
  "Living room 1": "Sofa · Air conditioning · Ceiling fan · TV",
  "Living room 2": "Sofa · Air conditioning · Ceiling fan",
  "Full kitchen": "Fridge · Microwave · Cooking basics · Kettle",
  Bedroom: "1 double bed · Air conditioning · Room-darkening blinds",
  "Full bathroom": "Hot tub · Shower",
  Gym: "Exercise equipment",
  Pool: "Outdoor pool",
};

const GROUPS: Record<PhotoCategory, string[]> = {
  "Living room 1": [
    "a9831aeb-f441-44f5-a38f-4cf54e3f0fcf",
    "a45feaa2-b607-4092-83ac-5fd4b2894959",
    "f1da1c3d-0d10-481e-9b63-c71f9073f30b",
  ],
  "Living room 2": [
    "090d8b0b-b539-42c0-84f8-e1fb0cdf9a93",
    "9be71047-fc52-438a-9270-75cb470f6752",
    "f6de1663-4e9c-4414-b63b-29a154a92ee1",
    "2367476f-11c4-4a14-a7c6-267be62c1d59",
    "67c61c6f-6260-4809-9510-0360e58a345d",
    "34529829-a971-44d3-ac2f-90ea3678a34d",
    "153aa732-4935-48b8-a6fe-b469b6af5efc",
    "3c6e6809-1bb1-47a6-8e24-aff593e1c28f",
  ],
  "Full kitchen": [
    "56c44812-52c0-4481-90d8-101ec1f34c7a",
    "ddc853d7-e658-405c-bedc-8f31106c447e",
  ],
  Bedroom: [
    "1c827136-4a85-4fe0-8e69-3fd8ea19bb17",
    "0622ab42-b851-4d55-9d9f-df3143bc5909",
    "a74e3c0b-3188-4442-9146-1cd4d6ea45df",
    "48a8ffbc-fbf7-4f84-bc29-ee400da3f08b",
    "3cf31697-f3f3-4c60-82c4-029acb119ae4",
  ],
  "Full bathroom": ["97c78f8a-5090-4663-aebc-ba4e13b47092"],
  Gym: [
    "9aa8e65f-94ac-4ba0-9a10-9ec91e536d22",
    "246bd88d-4dd6-4117-a401-02a36ebfcf16",
    "4fede77d-7a71-446f-89e3-263af937f3fa",
    "79f59adb-5a5f-4d6c-8109-1f01f4ca0d03",
    "f19d8c0a-1d88-42a4-9218-686d4f0db7e4",
  ],
  Exterior: [
    "23ea6621-6f74-4baa-acea-2fd03e312b41",
    "5adfdf3e-d497-4efc-ab8c-fc559dab311e",
    "608748cd-6ee7-4a71-88a2-ba79d3ddba5a",
    "5b856fde-a393-41bf-b373-c9d02e64221f",
    "c904e1ab-a39d-4ef0-bdea-8c0bd16b9e3d",
    "42befad7-fb29-473d-91db-b03e7a544d1d",
  ],
  Pool: [
    "fc02f48f-a937-42c5-895d-f9cc3113d6ca",
    "929545d3-e241-46c0-8a70-c24531ce7b54",
    "8eb65a8b-e795-4870-b141-6f63b1be24ae",
  ],
  "Additional photos": [
    "70325367-cbae-4993-b560-18cd3f6edd53",
    "cc7a56bd-242c-498a-9aef-0cffac619e54",
    "30ad93b2-293f-494d-b645-626303c6cb93",
    "9642a60d-e9de-4e1a-89c2-9ebd230f4a74",
    "b6599f26-d65c-4df0-baf2-ef18c82a86a3",
    "dc01fd46-b119-48d3-a43b-f6c093e26eca",
    "fe37b80e-da8a-4225-b27b-dfbb5d763c01",
    "3c90338e-86b4-423f-aae1-279e0ccc3a18",
    "862d936c-0f34-4e50-af87-b519e2781d19",
    "79addceb-8c2d-419b-80ff-e29af426a94c",
  ],
};

/** Flat, ordered list — this order is what the lightbox pages through. */
export const photos: Photo[] = PHOTO_CATEGORIES.flatMap((category) =>
  GROUPS[category].map((id, i) => ({
    id,
    src: `${IMG}/${id}.jpeg`,
    category,
    alt: `${category}${GROUPS[category].length > 1 ? ` ${i + 1}` : ""}`,
  })),
);

export const photosByCategory = PHOTO_CATEGORIES.map((category) => ({
  category,
  subtitle: CATEGORY_SUBTITLES[category],
  photos: photos.filter((p) => p.category === category),
}));

/** The five images in the hero mosaic, left-large then 2x2. */
export const heroPhotoIds = [
  "2367476f-11c4-4a14-a7c6-267be62c1d59",
  "090d8b0b-b539-42c0-84f8-e1fb0cdf9a93",
  "9be71047-fc52-438a-9270-75cb470f6752",
  "67c61c6f-6260-4809-9510-0360e58a345d",
  "c904e1ab-a39d-4ef0-bdea-8c0bd16b9e3d",
];

export const heroPhotos = heroPhotoIds.map(
  (id) => photos.find((p) => p.id === id) ?? photos[0],
);

export const listing = {
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  subtitle: "Entire serviced apartment in Candolim, India",
  stats: "3 guests · 1 bedroom · 1 bed · 1 bathroom",
  rating: 4.95,
  reviewCount: 19,
  guestFavourite: "One of the most loved homes on Airbnb, according to guests",
  location: "Candolim, Goa, India",
  description:
    "🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it's ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴",
  translationNote: "Some info has been automatically translated.",
} as const;

export const host = {
  name: "Mirashya Homes",
  avatar: `${IMG}/avatars/host.jpeg`,
  yearsHosting: 2,
  tenure: "2 years hosting",
  reviews: 1463,
  rating: 4.68,
  bornIn: "Born in the 80s",
  school: "Where I went to school: NICMAR GOA",
  responseRate: "100%",
  responseTime: "Responds within an hour",
  coHosts: [
    { name: "Sharath", avatar: `${IMG}/avatars/co1.jpg` },
    { name: "Aman Dev Pahwa", avatar: `${IMG}/avatars/co2.jpg` },
    { name: "Maria Karen Priyanka", avatar: `${IMG}/avatars/co3.jpg` },
    { name: "Simran", avatar: null },
    { name: "Pallavi", avatar: null },
    { name: "Sanyukta", avatar: null },
    { name: "Shruti", avatar: null },
    { name: "Amisha", avatar: null },
  ],
} as const;

/** The three "why this place" callouts under the subtitle. */
export const highlights = [
  {
    icon: "outdoor",
    title: "Outdoor entertainment",
    body: "The pool and alfresco dining are great for summer trips.",
  },
  {
    icon: "cooling",
    title: "Designed for staying cool",
    body: "Beat the heat with the A/C and ceiling fan.",
  },
  {
    icon: "checkin",
    title: "Self check-in",
    body: "You can check in with the building staff.",
  },
] as const;

export const sleepingArrangements = [
  { room: "Bedroom", detail: "1 double bed", icon: "bed" },
  { room: "Living room", detail: "1 sofa", icon: "sofa" },
] as const;

/**
 * The ten amenities shown before "Show all 50 amenities".
 *
 * The two alarms are `unavailable` — the host hasn't reported them, so the
 * reference strikes them through rather than dropping them from the list.
 */
export const featuredAmenities = [
  { name: "Kitchen", icon: "kitchen", unavailable: false },
  { name: "Wifi", icon: "wifi", unavailable: false },
  { name: "Dedicated workspace", icon: "workspace", unavailable: false },
  { name: "Free parking on premises", icon: "parking", unavailable: false },
  { name: "Pool", icon: "pool", unavailable: false },
  { name: "Hot tub", icon: "hottub", unavailable: false },
  { name: "Pets allowed", icon: "pets", unavailable: false },
  {
    name: "Exterior security cameras on property",
    icon: "camera",
    unavailable: false,
  },
  { name: "Carbon monoxide alarm", icon: "alarm", unavailable: true },
  { name: "Smoke alarm", icon: "alarm", unavailable: true },
] as const;

export const amenityGroups = [
  {
    group: "Bedroom and laundry",
    items: [
      "Washing machine",
      "Hangers",
      "Bed linen",
      "Room-darkening blinds",
      "Iron",
      "Clothes storage",
      "Cot",
    ],
  },
  { group: "Entertainment", items: ["TV"] },
  { group: "Family", items: ["Cot"] },
  { group: "Heating and cooling", items: ["Air conditioning", "Ceiling fan"] },
  {
    group: "Home safety",
    items: [
      "Exterior security cameras on property",
      "Carbon monoxide alarm",
      "Smoke alarm",
    ],
  },
  { group: "Internet and office", items: ["Wifi", "Dedicated workspace"] },
  {
    group: "Kitchen and dining",
    items: [
      "Kitchen",
      "Fridge",
      "Freezer",
      "Microwave",
      "Cooking basics",
      "Crockery and cutlery",
      "Kettle",
      "Coffee",
      "Wine glasses",
      "Toaster",
      "Blender",
      "Cooker",
    ],
  },
  { group: "Location features", items: ["Private entrance"] },
  { group: "Outdoor", items: ["Patio or balcony", "Outdoor dining area"] },
  {
    group: "Parking and facilities",
    items: ["Free parking on premises", "Pool", "Hot tub", "Gym"],
  },
  {
    group: "Services",
    items: [
      "Pets allowed",
      "Cleaning available during stay",
      "Long-term stays allowed",
      "Self check-in",
    ],
  },
] as const;

export const booking = {
  total: 28499,
  currency: "₹",
  nights: 5,
  headline: "5 nights in Candolim",
  dateRange: "18 Oct 2026 - 23 Oct 2026",
  checkIn: "10/18/2026",
  checkOut: "10/23/2026",
  guests: "2 guests",
  cancellation: "Free cancellation before 17 October",
  promo: { title: "Get 10% off your next stay.", terms: "Terms apply" },
} as const;

export const ratingBreakdown = [
  { label: "Cleanliness", value: 5.0, icon: "sparkle" },
  { label: "Accuracy", value: 5.0, icon: "check" },
  { label: "Check-in", value: 5.0, icon: "key" },
  { label: "Communication", value: 5.0, icon: "chat" },
  { label: "Location", value: 4.8, icon: "pin" },
  { label: "Value", value: 4.8, icon: "tag" },
] as const;

/** Distribution bars, 5 → 1 stars. Reference shows an all-but-full top bar. */
export const ratingDistribution = [
  { stars: 5, pct: 0.95 },
  { stars: 4, pct: 0.05 },
  { stars: 3, pct: 0 },
  { stars: 2, pct: 0 },
  { stars: 1, pct: 0 },
] as const;

/** "What guests are saying" topic chips, with their mention counts. */
export const reviewTopics = [
  { label: "Comfort", count: 6, icon: `${IMG}/chips/comfort.png` },
  { label: "Accuracy", count: 5, icon: `${IMG}/chips/accuracy.png` },
  { label: "Hot tub", count: 5, icon: `${IMG}/chips/hot-tub.png` },
  { label: "Condition", count: 4, icon: `${IMG}/chips/condition.png` },
  { label: "Hospitality", count: 8, icon: `${IMG}/chips/hospitality.png` },
  { label: "Cleanliness", count: 4, icon: `${IMG}/chips/cleanliness.png` },
  { label: "Amenities", count: 2, icon: `${IMG}/chips/amenities.png` },
  { label: "Decor", count: 2, icon: `${IMG}/chips/decor.png` },
  { label: "Indoor spaces", count: 2, icon: `${IMG}/chips/indoor-spaces.png` },
  { label: "Location", count: 2, icon: `${IMG}/chips/location.png` },
] as const;

export const reviews = [
  {
    name: "Amit",
    avatar: null,
    initial: "A",
    tenure: "2 months on Airbnb",
    when: "1 week ago",
    body: "Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.",
  },
  {
    name: "Aheesh",
    avatar: `${IMG}/avatars/rev1.jpeg`,
    initial: "A",
    tenure: "3 years on Airbnb",
    when: "2 weeks ago",
    body: "We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.",
  },
  {
    name: "Samiksha",
    avatar: `${IMG}/avatars/rev2.jpeg`,
    initial: "S",
    tenure: "8 months on Airbnb",
    when: "May 2026",
    body: "the host nitish was really great help",
  },
  {
    name: "Vedant",
    avatar: null,
    initial: "V",
    tenure: "4 years on Airbnb",
    when: "May 2026",
    body: "We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine.\nThe highlight of our stay was definitely the jacuzzi. It was clean, well-kept, and the perfect place to relax after a day of exploring Goa. It added a luxurious touch to our vacation and made our experience even more memorable.\nThe property was exactly as described, well-equipped, and offered a peaceful atmosphere. We would highly recommend this place to anyone looking for a comfortable, clean, and relaxing stay in Goa. Looking forward to visiting again!",
  },
  {
    name: "Vaibhav S",
    avatar: `${IMG}/avatars/rev3.jpeg`,
    initial: "V",
    tenure: "3 years on Airbnb",
    when: "May 2026",
    body: "Great great experience living out there , can't expect more , will always look for it in the future and will recommend my friends too.",
  },
  {
    name: "Mohd",
    avatar: `${IMG}/avatars/rev4.jpeg`,
    initial: "M",
    tenure: "5 years on Airbnb",
    when: "May 2026",
    body: "Great place. Exactly as described in the listing.",
  },
] as const;

export const neighbourhood = {
  heading: "Where you'll be",
  location: "Candolim, Goa, India",
  note: "Exact location will be provided after booking.",
  highlightsTitle: "Neighbourhood highlights",
  body: "Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.",
} as const;

export const thingsToKnow = [
  {
    title: "Cancellation policy",
    lines: [
      "Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.",
      "Review this host's full policy for details.",
    ],
  },
  {
    title: "House rules",
    lines: [
      "Check-in after 2:00 pm",
      "Checkout before 11:00 am",
      "3 guests maximum",
    ],
  },
  {
    title: "Safety & property",
    lines: [
      "Carbon monoxide alarm not reported",
      "Smoke alarm not reported",
      "Exterior security cameras on property",
    ],
  },
] as const;

export const nearbyStays = [
  {
    title: "Beautiful Studio with a view to die for",
    price: 23600,
    rating: 4.91,
    src: `${IMG}/similar/s1.jpeg`,
  },
  {
    title: "NAQAB - 1bhk with private pool",
    price: 42218,
    rating: 4.95,
    src: `${IMG}/similar/s2.jpeg`,
  },
  {
    title: "Greentique Luxury Flat with plunge pool, Calangute",
    price: 44506,
    rating: 4.94,
    src: `${IMG}/similar/s3.jpeg`,
  },
  {
    title: "The Tropical Studio | 5 mins to Beach",
    price: 22824,
    rating: 4.96,
    src: `${IMG}/similar/s4.jpeg`,
  },
  {
    title: "Luxury Casa Bella 1BHK with plunge pool, Calangute",
    price: 39942,
    rating: 4.95,
    src: `${IMG}/similar/s5.jpeg`,
  },
  {
    title: "Kanso by Earthen Window | Jacuzzi | Terrace | Pool",
    price: 45648,
    rating: 5.0,
    src: `${IMG}/similar/s6.jpeg`,
  },
  {
    title: "Luxury Apt | Private Pool | 6 Mins from Beach",
    price: 48786,
    rating: 4.93,
    src: `${IMG}/similar/s1.jpeg`,
  },
  {
    title: "Serendipity Cottage - Calm Stay in Calangute-Baga.",
    price: 22824,
    rating: 4.92,
    src: `${IMG}/similar/s2.jpeg`,
  },
] as const;
