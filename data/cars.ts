
interface CarSpec {
  icon: string;
  text: string;
}

interface CarSpecBlock {
  iconClass: string;
  text: string;
}

export interface Car {
  id: number;
  images: string[];
  badge?: string;
  title: string;
  description: string;
  specs: CarSpec[];
  price: string;
  oldPrice: string;
  lat: number;
  long: number;
  brand: string[];
  filterCategories: string[];
  filterBrands: string[];
}

interface CarItem {
  id: number;
  imgSrc: string;
  alt: string;
  title: string;
  description: string;
  mileage: string;
  fuel: string;
  transmission: string;
  price: string;
  discountPrice: string;
  icon?: string;
  imgBoxClass: string;
  btnDetails: string;
}

interface CarBlock {
  id: number;
  imgSrc: string;
  title: string;
  description: string;
  detailsLink: string;
  oldPrice: string;
  newPrice: string;
  specs: CarSpecBlock[];
}

interface CarSearchItem {
  id: number;
  title: string;
  newPrice: number;
  imgSrc: string;
}

export const carData: Car[] = [
  {
    id: 1,
    images: [
      "/images/resource/shop3-1.jpg",
      "/images/resource/shop3-2.jpg",
      "/images/resource/shop3-3.jpg",
    ],
    badge: "Low Mileage",
    title: "Audi A4",
    description: "2023 C300e AMG Line Night Ed Premiu...",
    specs: [
      { icon: "flaticon-gasoline-pump", text: "72,925 miles" },
      { icon: "flaticon-speedometer", text: "Petrol" },
      { icon: "flaticon-gearbox", text: "Automatic" },
    ],
    price: "$768",
    oldPrice: "$399",
    lat: 45.7279707552121,
    long: -74.07152705896405,
    brand: ["Mercedes", "BMW"],
    filterCategories: ["New cars", "Used Cars", "In Stock"],
    filterBrands: ["SUV", "Hatchback", "Coupe", "Convertible"],
  },
  {
    id: 1,
    images: [
      "/images/resource/shop3-1.jpg",
      "/images/resource/shop3-2.jpg",
      "/images/resource/shop3-3.jpg",
    ],
    badge: "Low Mileage",
    title: "Audi A4",
    description: "2023 C300e AMG Line Night Ed Premiu...",
    specs: [
      { icon: "flaticon-gasoline-pump", text: "72,925 miles" },
      { icon: "flaticon-speedometer", text: "Petrol" },
      { icon: "flaticon-gearbox", text: "Automatic" },
    ],
    price: "$768",
    oldPrice: "$399",
    lat: 45.7279707552121,
    long: -74.07152705896405,
    brand: ["Mercedes", "BMW"],
    filterCategories: ["New cars", "Used Cars", "In Stock"],
    filterBrands: ["SUV", "Hatchback", "Coupe", "Convertible"],
  },
  {
    id: 1,
    images: [
      "/images/resource/shop3-1.jpg",
      "/images/resource/shop3-2.jpg",
      "/images/resource/shop3-3.jpg",
    ],
    badge: "Low Mileage",
    title: "Audi A4",
    description: "2023 C300e AMG Line Night Ed Premiu...",
    specs: [
      { icon: "flaticon-gasoline-pump", text: "72,925 miles" },
      { icon: "flaticon-speedometer", text: "Petrol" },
      { icon: "flaticon-gearbox", text: "Automatic" },
    ],
    price: "$768",
    oldPrice: "$399",
    lat: 45.7279707552121,
    long: -74.07152705896405,
    brand: ["Mercedes", "BMW"],
    filterCategories: ["New cars", "Used Cars", "In Stock"],
    filterBrands: ["SUV", "Hatchback", "Coupe", "Convertible"],
  },
  {
    id: 1,
    images: [
      "/images/resource/shop3-1.jpg",
      "/images/resource/shop3-2.jpg",
      "/images/resource/shop3-3.jpg",
    ],
    badge: "Low Mileage",
    title: "Audi A4",
    description: "2023 C300e AMG Line Night Ed Premiu...",
    specs: [
      { icon: "flaticon-gasoline-pump", text: "72,925 miles" },
      { icon: "flaticon-speedometer", text: "Petrol" },
      { icon: "flaticon-gearbox", text: "Automatic" },
    ],
    price: "$768",
    oldPrice: "$399",
    lat: 45.7279707552121,
    long: -74.07152705896405,
    brand: ["Mercedes", "BMW"],
    filterCategories: ["New cars", "Used Cars", "In Stock"],
    filterBrands: ["SUV", "Hatchback", "Coupe", "Convertible"],
  },
  {
    id: 1,
    images: [
      "/images/resource/shop3-1.jpg",
      "/images/resource/shop3-2.jpg",
      "/images/resource/shop3-3.jpg",
    ],
    badge: "Low Mileage",
    title: "Audi A4",
    description: "2023 C300e AMG Line Night Ed Premiu...",
    specs: [
      { icon: "flaticon-gasoline-pump", text: "72,925 miles" },
      { icon: "flaticon-speedometer", text: "Petrol" },
      { icon: "flaticon-gearbox", text: "Automatic" },
    ],
    price: "$768",
    oldPrice: "$399",
    lat: 45.7279707552121,
    long: -74.07152705896405,
    brand: ["Mercedes", "BMW"],
    filterCategories: ["New cars", "Used Cars", "In Stock"],
    filterBrands: ["SUV", "Hatchback", "Coupe", "Convertible"],
  },
  {
    id: 1,
    images: [
      "/images/resource/shop3-1.jpg",
      "/images/resource/shop3-2.jpg",
      "/images/resource/shop3-3.jpg",
    ],
    badge: "Low Mileage",
    title: "Audi A4",
    description: "2023 C300e AMG Line Night Ed Premiu...",
    specs: [
      { icon: "flaticon-gasoline-pump", text: "72,925 miles" },
      { icon: "flaticon-speedometer", text: "Petrol" },
      { icon: "flaticon-gearbox", text: "Automatic" },
    ],
    price: "$768",
    oldPrice: "$399",
    lat: 45.7279707552121,
    long: -74.07152705896405,
    brand: ["Mercedes", "BMW"],
    filterCategories: ["New cars", "Used Cars", "In Stock"],
    filterBrands: ["SUV", "Hatchback", "Coupe", "Convertible"],
  },
  {
    id: 1,
    images: [
      "/images/resource/shop3-1.jpg",
      "/images/resource/shop3-2.jpg",
      "/images/resource/shop3-3.jpg",
    ],
    badge: "Low Mileage",
    title: "Audi A4",
    description: "2023 C300e AMG Line Night Ed Premiu...",
    specs: [
      { icon: "flaticon-gasoline-pump", text: "72,925 miles" },
      { icon: "flaticon-speedometer", text: "Petrol" },
      { icon: "flaticon-gearbox", text: "Automatic" },
    ],
    price: "$768",
    oldPrice: "$399",
    lat: 45.7279707552121,
    long: -74.07152705896405,
    brand: ["Mercedes", "BMW"],
    filterCategories: ["New cars", "Used Cars", "In Stock"],
    filterBrands: ["SUV", "Hatchback", "Coupe", "Convertible"],
  },
];

export const cars: CarItem[] = [
  {
    id: 9,
    imgSrc: "/images/resource/shop3-1.jpg",
    alt: "Range Rover, Defender 110",
    title: "Range Rover, Defender 110",
    description: "2023 C300e AMG Line Night Ed Premiu...",
    mileage: "72,925 miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "$789",
    discountPrice: "$399",
    icon: "Low Mileage",
    imgBoxClass: "image-box",
    btnDetails: "View Details",
  },
  // Add more cars entries here...
];

export const carBlocks: CarBlock[] = [
  {
    id: 21,
    imgSrc: "/images/resource/shop14-4.jpg",
    title: "Mercedes-Benz, C Class",
    description: "2023 C300e AMG Line Night Ed Premium Plu...",
    detailsLink: "#",
    oldPrice: "$789",
    newPrice: "$399",
    specs: [
      { iconClass: "flaticon-gasoline-pump", text: "72,925 miles" },
      { iconClass: "flaticon-speedometer", text: "Petrol" },
      { iconClass: "flaticon-gearbox", text: "Automatic" },
    ],
  },
];

export const carItemsSearch: CarSearchItem[] = [
  {
    id: 24,
    title: "Audi, Q5 - 2023 Sport Edition",
    newPrice: 399,
    imgSrc: "/images/resource/car-search.jpg",
  },
  {
    id: 25,
    title: "Mercedes-Benz, GLC - 2023 Luxury Model",
    newPrice: 399,
    imgSrc: "/images/resource/car-search.jpg",
  },
];

export const allCars = [...carData, ...cars, ...carBlocks, ...carItemsSearch];
