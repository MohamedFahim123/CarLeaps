const STORAGE_KEY = "carleaps_mock_db_v4";

export type FeatureItem = {
  id: number;
  name: string;
  type: string;
  status?: string;
};

export type DealerRecord = {
  id: number;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  bio: string;
  address: string;
  sales_hours: string;
  status: string;
  type: string;
  country_id: number;
  country_name: string;
  locale: string;
  cover: string;
  image: string;
  documents: string[];
  password: string;
};

export type CarRecord = {
  id: number;
  name: string;
  condition: string;
  dealer: Omit<DealerRecord, "password"> & { cars?: CarRecord[] };
  body: string;
  make: string;
  model: string;
  trim: string;
  transmission: string;
  year: string;
  country: string;
  city: string;
  body_id: number;
  make_id: number;
  model_id: number;
  trim_id: number;
  transmission_id: number;
  year_id: number;
  country_id: number;
  city_id: number;
  price: number;
  currency: string;
  offer_price: number;
  mileage: number;
  drive_type: string;
  exterior: string;
  interior: string;
  vin: string;
  engine: string;
  fuel_type: string;
  ad_state: string;
  added_at: string;
  description: string;
  video_link: string;
  status: string;
  main_image: string;
  history: string;
  lat: number;
  lng: number;
  features: FeatureItem[];
  carImagesCount: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  carImages: { image: string }[];
};

export type MockDb = {
  dealers: DealerRecord[];
  cars: CarRecord[];
  makes: {
    id: number;
    name: string;
    description: string;
    image: string;
    cover: string;
    status: string;
    incentives: {
      id: number;
      name: string;
      title: string;
      description: string;
      image: string;
      type: string;
      expiry_date: string;
      label: string;
    }[];
  }[];
  models: {
    id: number;
    name: string;
    make: string;
    make_id: number;
    image: string;
    cover: string;
    status: string;
    start_price?: number;
    end_price?: number;
    specifications: {
      id: number;
      title: string;
      description: string;
      model_id: string;
      body_id: string;
      model?: string;
      body?: string;
      fuel_type_id?: string;
      fuel_type?: string;
      interests?: { id: number; name: string }[];
      highlights?: unknown[];
    }[];
    features: FeatureItem[];
    gallery: {
      id: number;
      name?: string;
      image: string;
      description?: string;
      model_id?: number;
      model?: string;
    }[];
  }[];
  trims: {
    id: number;
    name: string;
    model: string;
    model_id: number;
    image: string;
    features: {
      comfort: FeatureItem[];
      seats: FeatureItem[];
      safety: FeatureItem[];
      entertainment: FeatureItem[];
    };
  }[];
  bodies: { id: number; name: string; image: string }[];
  cities: {
    id: number;
    name: string;
    code: string;
    country_id: string;
    country: string;
    currency: string;
  }[];
  countries: { id: number; name: string; code: string; flag: string }[];
  years: { id: number; name: string }[];
  transmissions: { id: number; name: string }[];
  fuelTypes: { id: number; name: string; image: string }[];
  conditions: string[];
  features: {
    comfort: FeatureItem[];
    seats: FeatureItem[];
    safety: FeatureItem[];
    entertainment: FeatureItem[];
  };
  interests: { id: number; name: string; image: string }[];
  adStates: { id: number; name: string }[];
  footerTaps: {
    id: number;
    name: string;
    city_id: string;
    city_name: string;
    items: { id: number; title: string; link: string }[];
  }[];
  researchMakes: unknown[];
  cpoPrograms: unknown[];
  authorizedCars: CarRecord[];
  featuredItems: {
    id: number;
    name: string;
    items: { id: number; name: string; image: string; link: string }[];
  }[];
  researchBodies: Record<number, unknown>;
  profileDealerId: number;
  dealerActiveCars: CarRecord[];
  dealerPendingCars: CarRecord[];
  dealerDeactiveCars: CarRecord[];
  sessions: Record<string, number>;
  forgetPasswordTokens: Record<string, string>;
  nextIdCounter: number;
};

const IMG = {
  deal: (n: number) => `/images/resource/deal1-${n}.png`,
  inventory: (n: number) =>
    n <= 2 || n === 4
      ? `/images/resource/inventory1-${n}.jpg`
      : `/images/resource/inventory1-${n}.png`,
  gallery: (n: number) => `/images/resource/gallery1-${n}.jpg`,
  carSingle: (n: number) => `/images/resource/car-single-${n}.png`,
  brand: (n: number) => `/images/resource/brand-${n}.png`,
  brand5: (n: number) => `/images/resource/brand5-${n}.png`,
  dealer: (n: number) => `/images/resource/dealer1-${n}.jpg`,
  audi: "/images/brands/audi.webp",
  cover: "/images/resource/coverImage.png",
  list: (n: number) => `/images/resource/list2-${n}.png`,
  car: (file: string) => `/images/mock-cars/${file}.jpg`,
};

function publicDealer(d: DealerRecord): Omit<DealerRecord, "password"> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = d;
  return rest;
}

function createSeed(): MockDb {
  const features = {
    comfort: [
      { id: 1, name: "Climate Control", type: "comfort", status: "active" },
      { id: 2, name: "Heated Seats", type: "comfort", status: "active" },
      { id: 3, name: "Keyless Entry", type: "comfort", status: "active" },
    ],
    seats: [
      { id: 4, name: "Leather Seats", type: "seats", status: "active" },
      { id: 5, name: "Power Seats", type: "seats", status: "active" },
      { id: 6, name: "Memory Seats", type: "seats", status: "active" },
    ],
    safety: [
      { id: 7, name: "ABS", type: "safety", status: "active" },
      { id: 8, name: "Lane Assist", type: "safety", status: "active" },
      { id: 9, name: "Blind Spot Monitor", type: "safety", status: "active" },
    ],
    entertainment: [
      { id: 10, name: "Apple CarPlay", type: "entertainment", status: "active" },
      { id: 11, name: "Android Auto", type: "entertainment", status: "active" },
      { id: 12, name: "Premium Sound", type: "entertainment", status: "active" },
    ],
  };

  const allFeatures = [
    ...features.comfort,
    ...features.seats,
    ...features.safety,
    ...features.entertainment,
  ];

  const dealers: DealerRecord[] = [
    {
      id: 1,
      name: "Demo Motors",
      email: "dealer@carleaps.com",
      phone: "+44 20 7946 0001",
      whatsapp: "+44 7700 900001",
      bio: "Premier demo dealership offering certified pre-owned and new vehicles across London. Use this account to explore the dealer dashboard.",
      address: "12 Baker Street, London, UK",
      sales_hours: "Mon-Sat 9:00-18:00",
      status: "active",
      type: "authorized_dealer",
      country_id: 1,
      country_name: "United Kingdom",
      locale: "en",
      cover: IMG.cover,
      image: IMG.dealer(1),
      documents: ["/images/resource/dealer1-1.jpg"],
      password: "Demo@1234",
    },
    {
      id: 2,
      name: "Prime Auto Gallery",
      email: "prime@carleaps.com",
      phone: "+44 20 7946 0002",
      whatsapp: "+44 7700 900002",
      bio: "Curated luxury and performance cars with nationwide delivery.",
      address: "88 Fleet Street, London, UK",
      sales_hours: "Mon-Fri 10:00-19:00",
      status: "active",
      type: "dealer",
      country_id: 1,
      country_name: "United Kingdom",
      locale: "en",
      cover: IMG.cover,
      image: IMG.dealer(2),
      documents: [],
      password: "Prime@1234",
    },
  ];

  const makes = [
    {
      id: 1,
      name: "Audi",
      description: "Progress through technology.",
      image: IMG.audi,
      cover: IMG.cover,
      status: "active",
      incentives: [
        {
          id: 1,
          name: "Summer Offer",
          title: "0% APR Financing",
          description: "Finance selected Audi models with 0% APR for 36 months.",
          image: IMG.brand(1),
          type: "finance",
          expiry_date: "2026-12-31",
          label: "Limited",
        },
      ],
    },
    {
      id: 2,
      name: "BMW",
      description: "The ultimate driving machine.",
      image: IMG.brand(2),
      cover: IMG.cover,
      status: "active",
      incentives: [
        {
          id: 2,
          name: "Trade-In Boost",
          title: "Extra Trade Value",
          description: "Get up to £2,000 extra on your trade-in.",
          image: IMG.brand(2),
          type: "trade",
          expiry_date: "2026-10-31",
          label: "Popular",
        },
      ],
    },
    {
      id: 3,
      name: "Mercedes-Benz",
      description: "The best or nothing.",
      image: IMG.brand(3),
      cover: IMG.cover,
      status: "active",
      incentives: [],
    },
  ];

  const models = [
    {
      id: 1,
      name: "A4",
      make: "Audi",
      make_id: 1,
      image: IMG.inventory(1),
      cover: IMG.gallery(1),
      status: "active",
      start_price: 32000,
      end_price: 48000,
      specifications: [
        {
          id: 1,
          title: "Audi A4 2024",
          description: "Refined compact executive sedan.",
          model_id: "1",
          body_id: "1",
          model: "A4",
          body: "Sedan",
          fuel_type_id: "1",
          fuel_type: "Petrol",
          interests: [{ id: 1, name: "Budget-Friendly" }],
          highlights: [],
        },
      ],
      features: allFeatures.slice(0, 6),
      gallery: [
        { id: 1, model_id: 1, model: "A4", image: IMG.gallery(1) },
        { id: 2, model_id: 1, model: "A4", image: IMG.gallery(2) },
      ],
    },
    {
      id: 2,
      name: "Q5",
      make: "Audi",
      make_id: 1,
      image: IMG.inventory(2),
      cover: IMG.gallery(2),
      status: "active",
      start_price: 42000,
      end_price: 62000,
      specifications: [
        {
          id: 2,
          title: "Audi Q5 2024",
          description: "Versatile premium SUV.",
          model_id: "2",
          body_id: "2",
          model: "Q5",
          body: "SUV",
          fuel_type_id: "1",
          fuel_type: "Petrol",
          interests: [{ id: 2, name: "Family" }],
          highlights: [],
        },
      ],
      features: allFeatures.slice(2, 8),
      gallery: [
        { id: 3, model_id: 2, model: "Q5", image: IMG.gallery(3) },
        { id: 4, model_id: 2, model: "Q5", image: IMG.gallery(4) },
      ],
    },
    {
      id: 3,
      name: "3 Series",
      make: "BMW",
      make_id: 2,
      image: IMG.inventory(3),
      cover: IMG.gallery(3),
      status: "active",
      start_price: 35000,
      end_price: 55000,
      specifications: [
        {
          id: 3,
          title: "BMW 3 Series 2024",
          description: "Sporty midsize sedan.",
          model_id: "3",
          body_id: "1",
          model: "3 Series",
          body: "Sedan",
          fuel_type_id: "2",
          fuel_type: "Diesel",
          interests: [{ id: 3, name: "Performance" }],
          highlights: [],
        },
      ],
      features: allFeatures.slice(0, 8),
      gallery: [
        { id: 5, model_id: 3, model: "3 Series", image: IMG.gallery(5) },
        { id: 6, model_id: 3, model: "3 Series", image: IMG.inventory(5) },
      ],
    },
    {
      id: 4,
      name: "X5",
      make: "BMW",
      make_id: 2,
      image: IMG.inventory(4),
      cover: IMG.gallery(4),
      status: "active",
      start_price: 55000,
      end_price: 78000,
      specifications: [
        {
          id: 4,
          title: "BMW X5 2024",
          description: "Luxury performance SUV.",
          model_id: "4",
          body_id: "2",
          model: "X5",
          body: "SUV",
          fuel_type_id: "3",
          fuel_type: "Hybrid",
          interests: [{ id: 2, name: "Family" }],
          highlights: [],
        },
      ],
      features: allFeatures,
      gallery: [
        { id: 7, model_id: 4, model: "X5", image: IMG.inventory(6) },
        { id: 8, model_id: 4, model: "X5", image: IMG.inventory(7) },
      ],
    },
    {
      id: 5,
      name: "C-Class",
      make: "Mercedes-Benz",
      make_id: 3,
      image: IMG.inventory(5),
      cover: IMG.gallery(5),
      status: "active",
      start_price: 38000,
      end_price: 58000,
      specifications: [
        {
          id: 5,
          title: "Mercedes C-Class 2024",
          description: "Elegant executive sedan.",
          model_id: "5",
          body_id: "1",
          model: "C-Class",
          body: "Sedan",
          fuel_type_id: "1",
          fuel_type: "Petrol",
          interests: [{ id: 4, name: "Luxury" }],
          highlights: [],
        },
      ],
      features: allFeatures.slice(1, 9),
      gallery: [
        { id: 9, model_id: 5, model: "C-Class", image: IMG.inventory(8) },
        { id: 10, model_id: 5, model: "C-Class", image: IMG.inventory(9) },
      ],
    },
  ];

  const trims = [
    {
      id: 1,
      name: "Premium",
      model: "A4",
      model_id: 1,
      image: IMG.list(1),
      features,
    },
    {
      id: 2,
      name: "S Line",
      model: "A4",
      model_id: 1,
      image: IMG.list(2),
      features,
    },
    {
      id: 3,
      name: "Sportback",
      model: "Q5",
      model_id: 2,
      image: IMG.list(3),
      features,
    },
    {
      id: 4,
      name: "M Sport",
      model: "3 Series",
      model_id: 3,
      image: IMG.list(4),
      features,
    },
    {
      id: 5,
      name: "xDrive",
      model: "X5",
      model_id: 4,
      image: IMG.carSingle(1),
      features,
    },
    {
      id: 6,
      name: "AMG Line",
      model: "C-Class",
      model_id: 5,
      image: IMG.carSingle(2),
      features,
    },
  ];

  const bodies = [
    { id: 1, name: "Sedan", image: IMG.car("audi-a4") },
    { id: 2, name: "SUV", image: IMG.car("audi-q5") },
    { id: 3, name: "Hatchback", image: IMG.car("hatchback") },
    { id: 4, name: "Coupe", image: IMG.car("merc-coupe") },
  ];

  const countries = [
    {
      id: 1,
      name: "United Kingdom",
      code: "UK",
      flag: IMG.brand5(1),
    },
    {
      id: 2,
      name: "United Arab Emirates",
      code: "AE",
      flag: IMG.brand5(2),
    },
  ];

  const cities = [
    {
      id: 1,
      name: "London",
      code: "London",
      country_id: "1",
      country: "United Kingdom",
      currency: "GBP",
    },
    {
      id: 2,
      name: "Manchester",
      code: "Manchester",
      country_id: "1",
      country: "United Kingdom",
      currency: "GBP",
    },
    {
      id: 3,
      name: "Dubai",
      code: "Dubai",
      country_id: "2",
      country: "United Arab Emirates",
      currency: "AED",
    },
  ];

  const years = [
    { id: 1, name: "2025" },
    { id: 2, name: "2024" },
    { id: 3, name: "2023" },
    { id: 4, name: "2022" },
    { id: 5, name: "2021" },
  ];

  const transmissions = [
    { id: 1, name: "Automatic" },
    { id: 2, name: "Manual" },
    { id: 3, name: "CVT" },
  ];

  const fuelTypes = [
    { id: 1, name: "Petrol", image: IMG.brand5(3) },
    { id: 2, name: "Diesel", image: IMG.brand5(4) },
    { id: 3, name: "Hybrid", image: IMG.brand5(5) },
    { id: 4, name: "Electric", image: IMG.brand5(6) },
  ];

  const conditions = ["New", "Used", "Certified"];

  const interests = [
    { id: 1, name: "Budget-Friendly", image: IMG.brand5(1) },
    { id: 2, name: "Family", image: IMG.brand5(2) },
    { id: 3, name: "Performance", image: IMG.brand5(3) },
    { id: 4, name: "Luxury", image: IMG.brand5(4) },
  ];

  const adStates = [
    { id: 1, name: "For Sale" },
    { id: 2, name: "Sold" },
    { id: 3, name: "Reserved" },
  ];

  const footerTaps = [
    {
      id: 1,
      name: "Quick Links",
      city_id: "1",
      city_name: "London",
      items: [
        { id: 1, title: "Find a Car", link: "/cars/find-car" },
        { id: 2, title: "Sell Your Car", link: "/cars/sell-car" },
        { id: 3, title: "Perfect Match", link: "/cars/perfect-match" },
      ],
    },
    {
      id: 2,
      name: "Dealership",
      city_id: "1",
      city_name: "London",
      items: [
        { id: 4, title: "Pricing Hub", link: "/cars/pricing-hub" },
        { id: 5, title: "CPO Cars", link: "/cars/cpo" },
      ],
    },
  ];

  const dealer1 = publicDealer(dealers[0]);
  const dealer2 = publicDealer(dealers[1]);

  const now = "2026-01-15T10:00:00.000Z";

  const carDefs: Array<Partial<CarRecord> & { id: number; name: string; dealerId: number }> = [
    {
      id: 1,
      name: "Audi A4 Premium 2024",
      dealerId: 1,
      condition: "Used",
      body: "Sedan",
      make: "Audi",
      model: "A4",
      trim: "Premium",
      transmission: "Automatic",
      year: "2024",
      body_id: 1,
      make_id: 1,
      model_id: 1,
      trim_id: 1,
      transmission_id: 1,
      year_id: 2,
      price: 34990,
      offer_price: 33490,
      mileage: 18200,
      drive_type: "AWD",
      exterior: "Glacier White",
      interior: "Black Leather",
      vin: "WAUZZZ8K9NA000001",
      engine: "2.0 TFSI",
      fuel_type: "Petrol",
      main_image: IMG.car("audi-a4"),
      carImages: [{ image: IMG.car("audi-a4") }, { image: IMG.car("audi-a4-2") }],
    },
    {
      id: 2,
      name: "Audi Q5 Sportback 2023",
      dealerId: 1,
      condition: "Certified",
      body: "SUV",
      make: "Audi",
      model: "Q5",
      trim: "Sportback",
      transmission: "Automatic",
      year: "2023",
      body_id: 2,
      make_id: 1,
      model_id: 2,
      trim_id: 3,
      transmission_id: 1,
      year_id: 3,
      price: 44900,
      offer_price: 42900,
      mileage: 24100,
      drive_type: "AWD",
      exterior: "Mythos Black",
      interior: "Brown",
      vin: "WAUZZZFY5N0000002",
      engine: "2.0 TFSI",
      fuel_type: "Petrol",
      main_image: IMG.car("audi-q5"),
      carImages: [{ image: IMG.car("audi-q5") }],
    },
    {
      id: 3,
      name: "BMW 330i M Sport 2024",
      dealerId: 2,
      condition: "New",
      body: "Sedan",
      make: "BMW",
      model: "3 Series",
      trim: "M Sport",
      transmission: "Automatic",
      year: "2024",
      body_id: 1,
      make_id: 2,
      model_id: 3,
      trim_id: 4,
      transmission_id: 1,
      year_id: 2,
      price: 48950,
      offer_price: 47950,
      mileage: 1200,
      drive_type: "RWD",
      exterior: "Portimao Blue",
      interior: "Vernasca Black",
      vin: "WBA8E9G50N0000003",
      engine: "2.0 TwinPower",
      fuel_type: "Petrol",
      main_image: IMG.car("bmw-3"),
      carImages: [{ image: IMG.car("bmw-3") }],
    },
    {
      id: 4,
      name: "BMW X5 xDrive40i 2022",
      dealerId: 2,
      condition: "Used",
      body: "SUV",
      make: "BMW",
      model: "X5",
      trim: "xDrive",
      transmission: "Automatic",
      year: "2022",
      body_id: 2,
      make_id: 2,
      model_id: 4,
      trim_id: 5,
      transmission_id: 1,
      year_id: 4,
      price: 52900,
      offer_price: 50900,
      mileage: 38500,
      drive_type: "AWD",
      exterior: "Alpine White",
      interior: "Cognac",
      vin: "5UXCR6C05N0000004",
      engine: "3.0 Turbo",
      fuel_type: "Petrol",
      main_image: IMG.car("bmw-x5"),
      carImages: [{ image: IMG.car("bmw-x5") }],
    },
    {
      id: 5,
      name: "Mercedes C300 AMG Line 2024",
      dealerId: 1,
      condition: "New",
      body: "Sedan",
      make: "Mercedes-Benz",
      model: "C-Class",
      trim: "AMG Line",
      transmission: "Automatic",
      year: "2024",
      body_id: 1,
      make_id: 3,
      model_id: 5,
      trim_id: 6,
      transmission_id: 1,
      year_id: 2,
      price: 51900,
      offer_price: 49900,
      mileage: 800,
      drive_type: "RWD",
      exterior: "Obsidian Black",
      interior: "Macchiato Beige",
      vin: "W1KAF4HB5NR000005",
      engine: "2.0 Turbo",
      fuel_type: "Petrol",
      main_image: IMG.car("merc-c"),
      carImages: [{ image: IMG.car("merc-c") }],
    },
    {
      id: 6,
      name: "Audi A4 S Line 2021",
      dealerId: 2,
      condition: "Used",
      body: "Sedan",
      make: "Audi",
      model: "A4",
      trim: "S Line",
      transmission: "Automatic",
      year: "2021",
      body_id: 1,
      make_id: 1,
      model_id: 1,
      trim_id: 2,
      transmission_id: 1,
      year_id: 5,
      price: 27900,
      offer_price: 26500,
      mileage: 52000,
      drive_type: "FWD",
      exterior: "Navarra Blue",
      interior: "Grey",
      vin: "WAUZZZ8K9MA000006",
      engine: "2.0 TFSI",
      fuel_type: "Petrol",
      main_image: IMG.car("audi-a4-2"),
      carImages: [{ image: IMG.car("audi-a4-2") }],
    },
    {
      id: 7,
      name: "BMW X5 Hybrid 2024",
      dealerId: 1,
      condition: "Certified",
      body: "SUV",
      make: "BMW",
      model: "X5",
      trim: "xDrive",
      transmission: "Automatic",
      year: "2024",
      body_id: 2,
      make_id: 2,
      model_id: 4,
      trim_id: 5,
      transmission_id: 1,
      year_id: 2,
      price: 68900,
      offer_price: 66900,
      mileage: 9500,
      drive_type: "AWD",
      exterior: "Carbon Black",
      interior: "Black",
      vin: "5UXTA6C05P0000007",
      engine: "3.0 PHEV",
      fuel_type: "Hybrid",
      main_image: IMG.car("bmw-x5-2"),
      carImages: [{ image: IMG.car("bmw-x5-2") }],
    },
    {
      id: 8,
      name: "Mercedes C-Class Coupe 2023",
      dealerId: 2,
      condition: "Used",
      body: "Coupe",
      make: "Mercedes-Benz",
      model: "C-Class",
      trim: "AMG Line",
      transmission: "Automatic",
      year: "2023",
      body_id: 4,
      make_id: 3,
      model_id: 5,
      trim_id: 6,
      transmission_id: 1,
      year_id: 3,
      price: 45500,
      offer_price: 43900,
      mileage: 21000,
      drive_type: "RWD",
      exterior: "Polar White",
      interior: "Red",
      vin: "W1KAF4HB5PR000008",
      engine: "2.0 Turbo",
      fuel_type: "Petrol",
      main_image: IMG.car("merc-coupe"),
      carImages: [{ image: IMG.car("merc-coupe") }],
    },
  ];

  const cars: CarRecord[] = carDefs.map((def) => {
    const dealer = def.dealerId === 1 ? dealer1 : dealer2;
    const images = def.carImages || [{ image: IMG.deal(1) }];
    return {
      id: def.id,
      name: def.name,
      condition: def.condition || "Used",
      dealer: { ...dealer, cars: [] },
      body: def.body || "Sedan",
      make: def.make || "Audi",
      model: def.model || "A4",
      trim: def.trim || "Premium",
      transmission: def.transmission || "Automatic",
      year: def.year || "2024",
      country: "United Kingdom",
      city: "London",
      body_id: def.body_id || 1,
      make_id: def.make_id || 1,
      model_id: def.model_id || 1,
      trim_id: def.trim_id || 1,
      transmission_id: def.transmission_id || 1,
      year_id: def.year_id || 2,
      country_id: 1,
      city_id: 1,
      price: def.price || 30000,
      currency: "GBP",
      offer_price: def.offer_price || 29000,
      mileage: def.mileage || 10000,
      drive_type: def.drive_type || "AWD",
      exterior: def.exterior || "White",
      interior: def.interior || "Black",
      vin: def.vin || `VIN${def.id}`,
      engine: def.engine || "2.0",
      fuel_type: def.fuel_type || "Petrol",
      ad_state: "For Sale",
      added_at: now,
      description:
        def.description ||
        `${def.name} in excellent condition with full service history and competitive pricing.`,
      video_link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      status: "active",
      main_image: def.main_image || IMG.deal(1),
      history: IMG.gallery(1),
      lat: 51.5074,
      lng: -0.1278,
      features: allFeatures.slice(0, 8),
      carImagesCount: images.length,
      created_at: now,
      updated_at: now,
      deleted_at: "",
      carImages: images,
    };
  });

  const warranties = (makeId: number, makeName: string) => [
    {
      id: makeId * 10 + 1,
      title: `${makeName} Warranty`,
      description: "Comprehensive manufacturer-backed warranty coverage.",
      make_id: makeId,
      make: makeName,
    },
    {
      id: makeId * 10 + 2,
      title: "Roadside Assistance",
      description: "24/7 roadside assistance for 12 months.",
      make_id: makeId,
      make: makeName,
    },
  ];

  const researchMakes = makes.map((make) => {
    const makeModels = models
      .filter((m) => m.make_id === make.id)
      .map((m) => ({
        id: m.id,
        name: m.name,
        make_id: m.make_id,
        make: m.make,
        image: m.image,
        cover: m.cover,
        start_price: m.start_price || 30000,
        end_price: m.end_price || 50000,
        status: m.status,
        specifications: m.specifications,
        gallery: m.gallery,
        trims: trims
          .filter((t) => t.model_id === m.id)
          .map((t) => ({
            id: t.id,
            name: t.name,
            model_id: t.model_id,
            model: t.model,
            image: t.image,
            features: t.features,
            cities: [
              {
                price: String(m.start_price || 30000),
                city_id: 1,
                city: "London",
                currency: "GBP",
              },
              {
                price: String((m.start_price || 30000) + 1500),
                city_id: 2,
                city: "Manchester",
                currency: "GBP",
              },
            ],
          })),
      }));

    // Research car cards read flat `car.dealer.name` / `car.dealer.image`
    const makeCars = cars
      .filter((c) => c.make_id === make.id)
      .map((c) => ({
        ...c,
        dealer: { ...c.dealer, cars: [] },
      }));

    const makeDealers = dealers
      .filter((d) => makeCars.some((c) => c.dealer?.id === d.id) || true)
      .slice(0, 2)
      .map((d) => ({
        dealer: {
          ...publicDealer(d),
          cars: cars.filter((c) => c.dealer.id === d.id && c.make_id === make.id),
        },
      }));

    return {
      cars: makeCars,
      id: make.id,
      name: make.name,
      description: make.description,
      image: make.image,
      cover: make.cover,
      status: make.status,
      incentives: make.incentives,
      warranties: warranties(make.id, make.name),
      dealers: makeDealers,
      models: makeModels,
    };
  });

  const cpoPrograms = makes.map((make) => ({
    video_link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    cars: cars.filter((c) => c.make_id === make.id && c.condition === "Certified"),
    id: make.id,
    name: `${make.name} CPO`,
    description: `${make.name} Certified Pre-Owned program with multipoint inspection.`,
    logo: make.image,
    cover: make.cover,
    status: "active",
    make_name: make.name,
    make_image: make.image,
    incentives: make.incentives,
    warranties: warranties(make.id, make.name),
    features: [
      { title: "150-Point Inspection" },
      { title: "Extended Warranty" },
      { title: "Vehicle History Report" },
    ],
    dealers: dealers.map((d) => ({
      dealer: {
        ...publicDealer(d),
        cars: cars.filter((c) => c.dealer.id === d.id),
      },
    })),
  }));

  const researchBodies: Record<number, unknown> = {};
  for (const make of makes) {
    const makeModels = models.filter((m) => m.make_id === make.id);
    const grouped = bodies
      .map((body) => {
        const bodyModels = makeModels
          .filter((m) =>
            m.specifications.some((s) => String(s.body_id) === String(body.id))
          )
          .map((m) => ({
            id: m.id,
            name: m.name,
            make_id: m.make_id,
            make: m.make,
            image: m.image,
            cover: m.cover,
            start_price: m.start_price || 30000,
            end_price: m.end_price || 50000,
            status: m.status,
            specifications: m.specifications,
            gallery: m.gallery,
            trims: trims.filter((t) => t.model_id === m.id),
          }));
        if (bodyModels.length === 0) return null;
        return {
          body: { id: body.id, name: body.name, image: body.image },
          models: bodyModels,
        };
      })
      .filter(Boolean);

    researchBodies[make.id] = {
      id: make.id,
      name: make.name,
      image: make.image,
      models: grouped,
    };
  }

  const withStatus = (list: CarRecord[], status: string) =>
    list.map((car) => ({ ...car, status }));

  const dealer1Cars = cars.filter((c) => c.dealer.id === 1);
  const dealer2Cars = cars.filter((c) => c.dealer.id === 2);

  // Per-dealer listing tabs (handlers filter by logged-in dealer id)
  const dealerActiveCars = [
    ...withStatus(dealer1Cars.slice(0, 2), "active"),
    ...withStatus(dealer2Cars.slice(0, 2), "active"),
  ];
  const dealerPendingCars = [
    ...withStatus(dealer1Cars.slice(2, 3), "pending"),
    ...withStatus(dealer2Cars.slice(2, 3), "pending"),
  ];
  const dealerDeactiveCars = [
    ...withStatus(dealer1Cars.slice(3, 4), "deactive"),
    ...withStatus(dealer2Cars.slice(3, 4), "deactive"),
  ];

  const featuredItems = [
    {
      id: 1,
      name: "Featured Collections",
      items: [
        {
          id: 1,
          name: "SUVs Under 50k",
          image: IMG.inventory(2),
          link: "/cars/cars-for-sale",
        },
        {
          id: 2,
          name: "Executive Sedans",
          image: IMG.inventory(1),
          link: "/cars/cars-for-sale",
        },
        {
          id: 3,
          name: "Certified Picks",
          image: IMG.inventory(4),
          link: "/cars/cpo",
        },
      ],
    },
  ];

  return {
    dealers,
    cars,
    makes,
    models,
    trims,
    bodies,
    cities,
    countries,
    years,
    transmissions,
    fuelTypes,
    conditions,
    features,
    interests,
    adStates,
    footerTaps,
    researchMakes,
    cpoPrograms,
    authorizedCars: cars.filter((c) => c.condition === "New" || c.condition === "Certified"),
    featuredItems,
    researchBodies,
    profileDealerId: 1,
    dealerActiveCars,
    dealerPendingCars,
    dealerDeactiveCars,
    sessions: {},
    forgetPasswordTokens: {},
    nextIdCounter: 100,
  };
}

let db: MockDb | null = null;

function loadFromStorage(): MockDb | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as MockDb;
  } catch {
    return null;
  }
}

export function saveMockDb(): void {
  if (typeof window === "undefined" || !db) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch {
    // ignore quota errors
  }
}

export function getMockDb(): MockDb {
  if (!db) {
    db = loadFromStorage() || createSeed();
  }
  return db;
}

export function resetMockDb(): MockDb {
  db = createSeed();
  saveMockDb();
  return db;
}

export function nextId(): number {
  const store = getMockDb();
  store.nextIdCounter += 1;
  saveMockDb();
  return store.nextIdCounter;
}

export function delay(ms?: number): Promise<void> {
  const wait =
    typeof ms === "number" ? ms : 200 + Math.floor(Math.random() * 201);
  return new Promise((resolve) => setTimeout(resolve, wait));
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function stripDealerPassword(
  dealer: DealerRecord
): Omit<DealerRecord, "password"> {
  return publicDealer(dealer);
}

export function paginateCars(cars: CarRecord[]) {
  return {
    cars,
    meta: {
      total: cars.length,
      per_page: cars.length || 10,
      current_page: 1,
      last_page: 1,
    },
    links: {
      first: "",
      last: "",
      prev: null,
      next: null,
    },
    pages: ["1"],
  };
}
