interface BrandsCarInterface {
  id: number;
  title: string;
  image: string;
  price: number;
  mileage: number;
  transmission: string;
  fuelType: string;
  year: number;
  engine: string;
  description: string;
  features: string[];
  images: string[];
  brand: string;
}

export interface incentive {
  title: string;
  description: string;
  expires: string;
  type: string;
}

interface Feature {
  title: string;
  description: string;
  image: string;
}
export interface BlogPost {
  id: number;
  image: string;
  type: string;
  author: string;
  title: string;
  content: string;
  datePublished: string;
}
interface model {
  title: string;
  name: string;
}

export interface Brand {
  name: string;
  logo: string;
  link: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  customerReviewAverage: number;
  customerReviewCount: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNew: boolean;
  isTrending: boolean;
  models: model[];
  blogPosts: BlogPost[];
  features: Feature[];
  incentives: incentive[];
  cars: BrandsCarInterface[];
}

export const Brands: Brand[] = [
  {
    name: "Alfa Romeo",
    slug: "alfa-romeo",
    logo: "/images/brands/logo.svg",
    link: "/Alfa Romeo",
    description:
      "Alfa Romeo combines Italian elegance with cutting-edge performance, delivering a driving experience that is both thrilling and refined.",
    image: "/images/brands/logo.svg",
    productCount: 10000,
    customerReviewAverage: 4.5,
    customerReviewCount: 200,
    isFeatured: true,
    isBestSeller: false,
    isNew: false,
    isTrending: true,
    models: [
      { title: "1980-1985" ,name: 'ABCD' },
      { title: "1986-1990" ,name: 'ABCD' },
      { title: "1991-1995" ,name: 'ABCD' },
      { title: "1996-2000" ,name: 'ABCD'},
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
    cars: [
      {
        id: 1,
        title: "Alfa Romeo Speedster",
        image: "/images/brands/audi.webp",
        price: 32999,
        mileage: 100000,
        transmission: "Automatic",
        fuelType: "Petrol",
        year: 2021,
        engine: "2.0L V6",
        description:
          "The Alfa Romeo Speedster is a luxury sedan that combines the elegance of Italian design with the performance of the latest generation V6 engine.",
        features: [
          "Powerful 2.0L V6 engine",
          "4-speed automatic transmission",
          "Air conditioning",
          "Power steering",
          "Premium sound system",
        ],
        images: ["/images/brands/audi.webp"],
        brand: "Alfa Romeo",
      },
      {
        id: 2,
        title: "Alfa Romeo Stelvio",
        image: "/images/brands/audi.webp",
        price: 42999,
        mileage: 80000,
        transmission: "Automatic",
        fuelType: "Petrol",
        year: 2020,
        engine: "2.5L V6",
        description:
          "The Alfa Romeo Stelvio is a sport sedan that combines the elegance of Italian design with the performance of the latest generation V6 engine.",
        features: [
          "Powerful 2.5L V6 engine",
          "4-speed automatic transmission",
          "Air conditioning",
          "Power steering",
          "Premium sound system",
        ],
        images: ["/images/cars/alfa-romeo-stelvio.jpg"],
        brand: "Alfa Romeo",
      },
      {
        id: 3,
        title: "Alfa Romeo Spider",
        image: "/images/brands/audi.webp",
        price: 52999,
        mileage: 60000,
        transmission: "Automatic",
        fuelType: "Petrol",
        year: 2019,
        engine: "3.0L V6",
        description:
          "The Alfa Romeo Spider is a sports sedan that combines the elegance of Italian design with the performance of the latest generation V6 engine.",
        features: [
          "Powerful 3.0L V6 engine",
          "4-speed automatic transmission",
          "Air conditioning",
          "Power steering",
          "Premium sound system",
        ],
        images: ["/images/cars/alfa-romeo-spider.jpg"],
        brand: "Alfa Romeo",
      },
      {
        id: 4,
        title: "Alfa Romeo Giulia",
        image: "/images/brands/audi.webp",
        price: 62999,
        mileage: 90000,
        transmission: "Automatic",
        fuelType: "Petrol",
        year: 2018,
        engine: "3.5L V6",
        description:
          "The Alfa Romeo Giulia is a sports sedan that combines the elegance of Italian design with the performance of the latest generation V6 engine.",
        features: [
          "Powerful 3.5L V6 engine",
          "4-speed automatic transmission",
          "Air conditioning",
          "Power steering",
          "Premium sound system",
        ],
        images: ["/images/cars/alfa-romeo-giulia.jpg"],
        brand: "Alfa Romeo",
      },
    ],
  },
  {
    name: "Honda",
    slug: "Honda",
    logo: "/images/brands/logo.svg",
    link: "/honda",
    description:
      "Honda is an American multinational automobile manufacturer known for its luxury vehicles, motorcycles, and commercial vehicles.",
    image: "/images/brands/logo.svg",
    productCount: 15000,
    customerReviewAverage: 4.2,
    customerReviewCount: 300,
    isFeatured: false,
    isBestSeller: true,
    isNew: false,
    isTrending: true,
    models: [
      { title: "1980-1985" ,name: 'ABCD' },
      { title: "1986-1990" ,name: 'ABCD' },
      { title: "1991-1995" ,name: 'ABCD' },
      { title: "1996-2000" ,name: 'ABCD'},
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
    ],
    cars: [
      {
        id: 1,
        title: "Alfa Romeo Speedster",
        image: "/images/brands/audi.webp",
        price: 32999,
        mileage: 100000,
        transmission: "Automatic",
        fuelType: "Petrol",
        year: 2021,
        engine: "2.0L V6",
        description:
          "The Alfa Romeo Speedster is a luxury sedan that combines the elegance of Italian design with the performance of the latest generation V6 engine.",
        features: [
          "Powerful 2.0L V6 engine",
          "4-speed automatic transmission",
          "Air conditioning",
          "Power steering",
          "Premium sound system",
        ],
        images: ["/images/brands/audi.webp"],
        brand: "Alfa Romeo",
      },
      {
        id: 2,
        title: "Alfa Romeo Stelvio",
        image: "/images/brands/audi.webp",
        price: 42999,
        mileage: 80000,
        transmission: "Automatic",
        fuelType: "Petrol",
        year: 2020,
        engine: "2.5L V6",
        description:
          "The Alfa Romeo Stelvio is a sport sedan that combines the elegance of Italian design with the performance of the latest generation V6 engine.",
        features: [
          "Powerful 2.5L V6 engine",
          "4-speed automatic transmission",
          "Air conditioning",
          "Power steering",
          "Premium sound system",
        ],
        images: ["/images/cars/alfa-romeo-stelvio.jpg"],
        brand: "Alfa Romeo",
      },
      {
        id: 3,
        title: "Alfa Romeo Spider",
        image: "/images/brands/audi.webp",
        price: 52999,
        mileage: 60000,
        transmission: "Automatic",
        fuelType: "Petrol",
        year: 2019,
        engine: "3.0L V6",
        description:
          "The Alfa Romeo Spider is a sports sedan that combines the elegance of Italian design with the performance of the latest generation V6 engine.",
        features: [
          "Powerful 3.0L V6 engine",
          "4-speed automatic transmission",
          "Air conditioning",
          "Power steering",
          "Premium sound system",
        ],
        images: ["/images/cars/alfa-romeo-spider.jpg"],
        brand: "Alfa Romeo",
      },
      {
        id: 4,
        title: "Alfa Romeo Giulia",
        image: "/images/brands/audi.webp",
        price: 62999,
        mileage: 90000,
        transmission: "Automatic",
        fuelType: "Petrol",
        year: 2018,
        engine: "3.5L V6",
        description:
          "The Alfa Romeo Giulia is a sports sedan that combines the elegance of Italian design with the performance of the latest generation V6 engine.",
        features: [
          "Powerful 3.5L V6 engine",
          "4-speed automatic transmission",
          "Air conditioning",
          "Power steering",
          "Premium sound system",
        ],
        images: ["/images/cars/alfa-romeo-giulia.jpg"],
        brand: "Alfa Romeo",
      },
    ],
  },
  {
    name: "Ford",
    slug: "Ford",
    logo: "/images/brands/logo.svg",
    link: "/ford",
    description:
      "Ford Motor Company is an American multinational automobile manufacturer, known for its production of automobiles and related products.",
    image: "/images/brands/logo.svg",
    productCount: 12000,
    customerReviewAverage: 4.7,
    customerReviewCount: 150,
    isFeatured: false,
    isBestSeller: false,
    isNew: true,
    isTrending: true,
    models: [
      { title: "1980-1985" ,name: 'ABCD' },
      { title: "1986-1990" ,name: 'ABCD' },
      { title: "1991-1995" ,name: 'ABCD' },
      { title: "1996-2000" ,name: 'ABCD'},
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
    ],
    cars: [
      {
        id: 1,
        title: "Alfa Romeo Speedster",
        image: "/images/brands/audi.webp",
        price: 32999,
        mileage: 100000,
        transmission: "Automatic",
        fuelType: "Petrol",
        year: 2021,
        engine: "2.0L V6",
        description:
          "The Alfa Romeo Speedster is a luxury sedan that combines the elegance of Italian design with the performance of the latest generation V6 engine.",
        features: [
          "Powerful 2.0L V6 engine",
          "4-speed automatic transmission",
          "Air conditioning",
          "Power steering",
          "Premium sound system",
        ],
        images: ["/images/brands/audi.webp"],
        brand: "Alfa Romeo",
      },
      {
        id: 2,
        title: "Alfa Romeo Stelvio",
        image: "/images/brands/audi.webp",
        price: 42999,
        mileage: 80000,
        transmission: "Automatic",
        fuelType: "Petrol",
        year: 2020,
        engine: "2.5L V6",
        description:
          "The Alfa Romeo Stelvio is a sport sedan that combines the elegance of Italian design with the performance of the latest generation V6 engine.",
        features: [
          "Powerful 2.5L V6 engine",
          "4-speed automatic transmission",
          "Air conditioning",
          "Power steering",
          "Premium sound system",
        ],
        images: ["/images/cars/alfa-romeo-stelvio.jpg"],
        brand: "Alfa Romeo",
      },
      {
        id: 3,
        title: "Alfa Romeo Spider",
        image: "/images/brands/audi.webp",
        price: 52999,
        mileage: 60000,
        transmission: "Automatic",
        fuelType: "Petrol",
        year: 2019,
        engine: "3.0L V6",
        description:
          "The Alfa Romeo Spider is a sports sedan that combines the elegance of Italian design with the performance of the latest generation V6 engine.",
        features: [
          "Powerful 3.0L V6 engine",
          "4-speed automatic transmission",
          "Air conditioning",
          "Power steering",
          "Premium sound system",
        ],
        images: ["/images/cars/alfa-romeo-spider.jpg"],
        brand: "Alfa Romeo",
      },
      {
        id: 4,
        title: "Alfa Romeo Giulia",
        image: "/images/brands/audi.webp",
        price: 62999,
        mileage: 90000,
        transmission: "Automatic",
        fuelType: "Petrol",
        year: 2018,
        engine: "3.5L V6",
        description:
          "The Alfa Romeo Giulia is a sports sedan that combines the elegance of Italian design with the performance of the latest generation V6 engine.",
        features: [
          "Powerful 3.5L V6 engine",
          "4-speed automatic transmission",
          "Air conditioning",
          "Power steering",
          "Premium sound system",
        ],
        images: ["/images/cars/alfa-romeo-giulia.jpg"],
        brand: "Alfa Romeo",
      },
    ],
  },
];
