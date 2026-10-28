import { BlogPost, incentive } from "../Brands/Data";

interface Feature {
  title: string;
  description: string;
  image: string;
}
export interface FactoryWranty {
  id: number;
  title: string;
  description: string;
}
export interface ExploreModel {
  title: string;
  subtitle: string;
  description: string;
  content: string;
}

export interface TrimInteface {
  make: string;
  makeSlug: string;
  model: string;
  year: number;
  trim: string;
  price: number;
  transmission: string;
  fuelType: string;
  description: string;
  image: string;
}

export interface MODEL {
  make: string;
  makeSlug: string;
  model: string;
  year: number;
  trim: string;
  price: number;
  mileage: number;
  transmission: string;
  fuelType: string;
  description: string;
  images: string[];
  incentives: incentive[];
  features: Feature[];
  blogPosts: BlogPost[];
  relatedModels: MODEL[];
  reviewsCount: number;
  testimonialsCount: number;
  videosCount: number;
  incentivesCount: number;
  featuresCount: number;
  blogPostsCount: number;
  relatedModelsCount: number;
  testimonialsAverageRating: number;
  videosAverageRating: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNew: boolean;
  isTrending: boolean;
  isExclusive: boolean;
  isLimitedEdition: boolean;
  isPremium: boolean;
  isUsed: boolean;
  isCertified: boolean;
  isLeatherInterior: boolean;
  isPowerSteering: boolean;
  isAirConditioning: boolean;
  isElectricWindows: boolean;
  isBluetooth: boolean;
  isClimateControl: boolean;
  isPowerMirrors: boolean;
  isSunroof: boolean;
  isRoof: boolean;
  isMoonroof: boolean;
  factoryWranties: FactoryWranty[];
  exploreModel: ExploreModel[];
  trims: TrimInteface[];
}

export const Models: MODEL[] = [
  {
    make: "Alfa Romeo",
    makeSlug: "alfa-romeo",
    model: "ABCD",
    year: 2022,
    trim: "Sport",
    price: 28999,
    mileage: 120000,
    transmission: "Automatic",
    fuelType: "Gasoline",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    images: ["/images/models/alfa-romeo-159-sport.jpg"],
    trims: [
      {
        image: "/images/brands/audi.webp",
        make: "Alfa Romeo",
        makeSlug: "alfa-romeo",
        model: "ABCD",
        year: 2022,
        trim: "Sport",
        price: 28999,
        transmission: "Automatic",
        fuelType: "Gasoline",
        description: "lorem ipsum dolor sit amet, consectetur adip",
      },
    ],
    exploreModel: [
      {
        title: "Safty",
        subtitle: "Explore Safty",
        description: "Explore Safty description",
        content: "Explore Safty content",
      },
      {
        title: "Entertainment",
        description: "Explore Entertainment description",
        content: "Explore Entertainment content",
        subtitle: "Explore Entertainment",
      },
      {
        title: "Safty",
        subtitle: "Explore Safty",
        description: "Explore Safty description",
        content: "Explore Safty content",
      },
      {
        title: "Entertainment",
        description: "Explore Entertainment description",
        content: "Explore Entertainment content",
        subtitle: "Explore Entertainment",
      },
    ],
    factoryWranties: [
      {
        id: 1,
        title: "factory wranty 1",
        description: "factory warranty 1 description",
      },
      {
        id: 2,
        title: "factory wranty 2",
        description: "factory warranty 2 description",
      },
      {
        id: 3,
        title: "factory wranty 3",
        description: "factory warranty 3 description",
      },
      {
        id: 4,
        title: "factory wranty 4",
        description: "factory warranty 4 description",
      },
      {
        id: 5,
        title: "factory wranty 5",
        description: "factory warranty 5 description",
      },
      {
        id: 6,
        title: "factory wranty 6",
        description: "factory warranty 6 description",
      },
    ],
    incentives: [
      {
        title: "$1,000 Stellantis US National Select Inventory Bonus Cash",
        description: "Bonus cash on Alfa Romeo Giulia 2024 Veloce Sedan",
        expires: "02/03/2025",
        type: "Bonus cash",
      },
      {
        title: "$1,000 Stellantis US 2024 TCP Third Party Conquest Program",
        description:
          "Direct Mail bonus cash on Alfa Romeo Stelvio 2024 Quadrifoglio SUV",
        expires: "01/02/2025",
        type: "Bonus cash",
      },
      {
        title: "$5,000 Stellantis US MVP Select Owner SFS Trade-In",
        description:
          "Best cash offer on Alfa Romeo Giulia 2024 Quadrifoglio Sedan",
        expires: "01/02/2025",
        type: "Bonus cash",
      },
      {
        title: "$1,000 Stellantis US National Select Inventory Bonus Cash",
        description: "Bonus cash on Alfa Romeo Giulia 2024 Veloce Sedan",
        expires: "02/03/2025",
        type: "Bonus cash",
      },
      {
        title: "$1,000 Stellantis US 2024 TCP Third Party Conquest Program",
        description:
          "Direct Mail bonus cash on Alfa Romeo Stelvio 2024 Quadrifoglio SUV",
        expires: "01/02/2025",
        type: "Bonus cash",
      },
      {
        title: "$5,000 Stellantis US MVP Select Owner SFS Trade-In",
        description:
          "Best cash offer on Alfa Romeo Giulia 2024 Quadrifoglio Sedan",
        expires: "01/02/2025",
        type: "Bonus cash",
      },
    ],
    features: [
      {
        title: "Performance",
        description:
          "Efficient, high-performance engines. A chassis designed to work with innovative suspension systems and a well-balanced power-to-weight ratio.",
        image: "/images/brands/audi.webp", // Replace with your image URL
      },
      {
        title: "Safety",
        description:
          "Alfa Romeo mastered the art of finding the balance between hands-on driving passion and cutting-edge automated driving systems.",
        image: "/images/brands/audi.webp", // Replace with your image URL
      },
      {
        title: "Technology",
        description:
          "The sporty and high-tech interior is designed to be focused at the driver with a fully digital and customizable information cluster display.",
        image: "/images/brands/audi.webp", // Replace with your image URL
      },
      {
        title: "Performance",
        description:
          "Efficient, high-performance engines. A chassis designed to work with innovative suspension systems and a well-balanced power-to-weight ratio.",
        image: "/images/brands/audi.webp", // Replace with your image URL
      },
      {
        title: "Safety",
        description:
          "Alfa Romeo mastered the art of finding the balance between hands-on driving passion and cutting-edge automated driving systems.",
        image: "/images/brands/audi.webp", // Replace with your image URL
      },
      {
        title: "Technology",
        description:
          "The sporty and high-tech interior is designed to be focused at the driver with a fully digital and customizable information cluster display.",
        image: "/images/brands/audi.webp", // Replace with your image URL
      },
    ],
    blogPosts: [
      {
        id: 26,
        image: "/images/resource/blog-1.jpg",
        type: "Image",
        author: "Ali Tufan",
        datePublished: "April 20, 2023",
        title: "This Long-Awaited Technology May Finally Change the World",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ligula vel tempus consectetur, arcu nulla convallis ex, a pellentesque nunc nunc eu velit. Sed vel neque at velit tristique ornare. Donec et sem sed nunc maximus tempus. Donec in est et ex bibendum tincidunt.",
      },
      {
        id: 27,
        image: "/images/resource/blog-1.jpg",
        type: "Image",
        author: "Ali Tufan",
        datePublished: "April 20, 2023",
        title: "This Long-Awaited Technology May Finally Change the World",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ligula vel tempus consectetur, arcu nulla convallis ex, a pellentesque nunc nunc eu velit. Sed vel neque at velit tristique ornare. Donec et sem sed nunc maximus tempus. Donec in est et ex bibendum tincidunt.",
      },
      {
        id: 28,
        image: "/images/resource/blog-1.jpg",
        type: "Image",
        author: "Ali Tufan",
        datePublished: "April 20, 2023",
        title: "This Long-Awaited Technology May Finally Change the World",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ligula vel tempus consectetur, arcu nulla convallis ex, a pellentesque nunc nunc eu velit. Sed vel neque at velit tristique ornare. Donec et sem sed nunc maximus tempus. Donec in est et ex bibendum tincidunt.",
      },
      {
        id: 29,
        image: "/images/resource/blog-1.jpg",
        type: "Image",
        author: "Ali Tufan",
        datePublished: "April 20, 2023",
        title: "This Long-Awaited Technology May Finally Change the World",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ligula vel tempus consectetur, arcu nulla convallis ex, a pellentesque nunc nunc eu velit. Sed vel neque at velit tristique ornare. Donec et sem sed nunc maximus tempus. Donec in est et ex bibendum tincidunt.",
      },
    ],
    relatedModels: [],
    reviewsCount: 0,
    testimonialsCount: 0,
    videosCount: 0,
    incentivesCount: 0,
    featuresCount: 0,
    blogPostsCount: 0,
    relatedModelsCount: 0,
    testimonialsAverageRating: 0,
    videosAverageRating: 0,
    isFeatured: false,
    isBestSeller: false,
    isNew: false,
    isTrending: false,
    isExclusive: false,
    isLimitedEdition: false,
    isPremium: false,
    isUsed: false,
    isCertified: false,
    isLeatherInterior: false,
    isPowerSteering: false,
    isAirConditioning: false,
    isElectricWindows: false,
    isBluetooth: false,
    isClimateControl: false,
    isPowerMirrors: false,
    isSunroof: false,
    isRoof: false,
    isMoonroof: false,
  },
];
