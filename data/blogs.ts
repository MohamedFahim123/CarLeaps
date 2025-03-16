interface blogPost1 {
  id: number;
  title: string;
  author: string;
  date: string;
  imageSrc: string;
  delay: string;
};
interface blogPost2 {
  id: number;
  imgSrc: string;
  alt: string;
  datePublished: string;
  title: string;
  author: string;
  date: string;
  delay: string;
};
interface blogPost3 {
  id: number;
  datePublished: string;
  title: string;
  author: string;
  date: string;
  src: string;
  width: number;
  height: number;
  wowDelay: string;
  filterCategories: string[];
};
interface blogPost4 {
  id: number;
  imgSrc: string;
  alt: string;
  date: string;
  author: string;
  datePublished: string
  title: string;
  text: string;
  link: string;
};
interface blogPost5 {
  id: number;
  imgSrc: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
};
interface blogPost6 {
  id: number;
  src: string;
  wowDelay: string;
  date: string;
  author: string;
  datePublished: string;
  title: string;
};

export const blogPosts: blogPost1[] = [
  {
    id: 1,
    title: "This Long-Awaited Technology May Finally Change the World",
    author: "Ali Tufan",
    date: "April 20, 2023",
    imageSrc: "/images/resource/blog-1.jpg",
    delay: "100ms",
  },
  {
    id: 2,
    title: "This Long-Awaited Technology May Finally Change the World",
    author: "Ali Tufan",
    date: "April 20, 2023",
    imageSrc: "/images/resource/blog-2.jpg",
    delay: "200ms",
  },
  {
    id: 3,
    title: "This Long-Awaited Technology May Finally Change the World",
    author: "Ali Tufan",
    date: "April 20, 2023",
    imageSrc: "/images/resource/blog-3.jpg",
    delay: "300ms",
  },
];
export const blogPosts2: blogPost2[] = [
  {
    id: 4,
    imgSrc: "/images/resource/blog-1.jpg",
    alt: "",
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "This Long-Awaited Technology May Finally Change the World",
    delay: "0ms",
  },
  {
    id: 5,
    imgSrc: "/images/resource/blog-2.jpg",
    alt: "",
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "This Long-Awaited Technology May Finally Change the World",
    delay: "100ms",
  },
  {
    id: 6,
    imgSrc: "/images/resource/blog-3.jpg",
    alt: "",
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "This Long-Awaited Technology May Finally Change the World",
    delay: "200ms",
  },
];

export const blogPosts3: blogPost3[] = [
  {
    id: 7,
    src: "/images/resource/blog-1.jpg",
    width: 448,
    height: 300,
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "This Long-Awaited Technology May Finally Change the World",
    wowDelay: "0ms",
    filterCategories: ["Auto Detailing", "Buying Guides"],
  },
  {
    id: 8,
    src: "/images/resource/blog-2.jpg",
    width: 448,
    height: 300,
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "This Long-Awaited Technology May Finally Change the World",
    wowDelay: "100ms",
    filterCategories: ["Auto Detailing"],
  },
  {
    id: 9,
    src: "/images/resource/blog-3.jpg",
    width: 448,
    height: 300,
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "This Long-Awaited Technology May Finally Change the World",
    wowDelay: "200ms",
    filterCategories: ["Auto Detailing", "Car News"],
  },
  {
    id: 10,
    src: "/images/resource/blog4-1.jpg",
    width: 448,
    height: 300,
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "How To Save On Car Fuel Costs - The Ultimate Guide",
    wowDelay: "200ms",
    filterCategories: ["Auto Detailing", "Car News", "Buying Guides"],
  },
  {
    id: 11,
    src: "/images/resource/blog4-2.jpg",
    width: 448,
    height: 300,
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "Selling a Modified Car: How to Secure the Best Price",
    wowDelay: "200ms",
    filterCategories: ["Auto Detailing", "Buying Guides"],
  },
  {
    id: 12,
    src: "/images/resource/blog4-3.jpg",
    width: 448,
    height: 300,
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "Searches For Used EVs in London Are Rising",
    wowDelay: "200ms",
    filterCategories: ["Auto Detailing", "Buying Guides"],
  },
  {
    id: 13,
    src: "/images/resource/blog4-4.jpg",
    width: 448,
    height: 300,
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "Best Used Electric Cars for Under £30K",
    wowDelay: "200ms",
    filterCategories: ["Auto Detailing", "Car News"],
  },
  {
    id: 14,
    src: "/images/resource/blog4-5.jpg",
    width: 448,
    height: 300,
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "Top 10 Car Shows and Events in &amp; around London",
    wowDelay: "200ms",
    filterCategories: ["Auto Detailing", "Buying Guides"],
  },
  {
    id: 15,
    src: "/images/resource/blog4-6.jpg",
    width: 448,
    height: 300,
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "Golf vs Polo: A Comparison of Two Volkswagen Classics",
    wowDelay: "200ms",
    filterCategories: ["Auto Detailing", "Car News"],
  },
];

export const blogPosts4: blogPost4[] = [
  {
    id: 17,
    imgSrc: "/images/resource/blog4-7.jpg",
    alt: "",
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "The Best Used Cars For Affordable Insurance Policies",
    text: "In the market for an SUV but now sure which one to go for? Cargiant has weighed up two great options against each other, to help you buy the right car for you.",
    link: "#",
  },
  {
    id: 18,
    imgSrc: "/images/resource/blog4-8.jpg",
    alt: "",
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "Battle of the SUVs - Kia Sportage vs Hyundai Tucson",
    text: "In the market for an SUV but now sure which one to go for? Cargiant has weighed up two great options against each other, to help you buy the right car for you.",
    link: "#",
  },
  {
    id: 19,
    imgSrc: "/images/resource/blog4-9.jpg",
    alt: "",
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "Golf vs Polo: A Comparison of Two Volkswagen Classics",
    text: "In the market for an SUV but now sure which one to go for? Cargiant has weighed up two great options against each other, to help you buy the right car for you.",
    link: "#",
  },
];

export const blogPosts5: blogPost5[] = [
  {
    id: 20,
    imgSrc: "/images/resource/blog5-1.jpg",
    title: "The Best Used Cars For Affordable Insurance Policies",
    author: "Ali Tufan",
    date: "April 20, 2023",
    excerpt:
      "In 2023, more and more savvy motorists are finding value in the pre-owned vehicle market. Here are 10 used cars that have affordable insurance policies.",
  },
  {
    id: 21,
    imgSrc: "/images/resource/blog5-2.jpg",
    title: "Battle of the SUVs - Kia Sportage vs Hyundai Tucson",
    author: "Ali Tufan",
    date: "April 20, 2023",
    excerpt:
      "In 2023, more and more savvy motorists are finding value in the pre-owned vehicle market. Here are 10 used cars that have affordable insurance policies.",
  },
  {
    id: 22,
    imgSrc: "/images/resource/blog5-3.jpg",
    title: "Golf vs Polo: A Comparison of Two Volkswagen Classics",
    author: "Ali Tufan",
    date: "April 20, 2023",
    excerpt:
      "In 2023, more and more savvy motorists are finding value in the pre-owned vehicle market. Here are 10 used cars that have affordable insurance policies.",
  },
];

export const blogPosts6: blogPost6[] = [
  {
    id: 23,
    src: "/images/resource/blog-1.jpg",
    wowDelay: "",
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "This Long-Awaited Technology May Finally Change the World",
  },
  {
    id: 24,
    src: "/images/resource/blog-2.jpg",
    wowDelay: "100ms",
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "This Long-Awaited Technology May Finally Change the World",
  },
  {
    id: 25,
    src: "/images/resource/blog-3.jpg",
    wowDelay: "200ms",
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "This Long-Awaited Technology May Finally Change the World",
  },
];
export const blogPosts7: blogPost6[] = [
  {
    id: 26,
    src: "/images/resource/blog-1.jpg",
    wowDelay: "",
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "This Long-Awaited Technology May Finally Change the World",
  },
  {
    id: 27,
    src: "/images/resource/blog-2.jpg",
    wowDelay: "100ms",
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "This Long-Awaited Technology May Finally Change the World",
  },
  {
    id: 28,
    src: "/images/resource/blog-3.jpg",
    wowDelay: "200ms",
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "This Long-Awaited Technology May Finally Change the World",
  },
  {
    id: 26,
    src: "/images/resource/blog-1.jpg",
    wowDelay: "",
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "This Long-Awaited Technology May Finally Change the World",
  },
  {
    id: 27,
    src: "/images/resource/blog-2.jpg",
    wowDelay: "100ms",
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "This Long-Awaited Technology May Finally Change the World",
  },
  {
    id: 28,
    src: "/images/resource/blog-3.jpg",
    wowDelay: "200ms",
    date: "news",
    author: "Ali Tufan",
    datePublished: "April 20, 2023",
    title: "This Long-Awaited Technology May Finally Change the World",
  },
];

export const allBlogs = [
  ...blogPosts,
  ...blogPosts2,
  ...blogPosts3,
  ...blogPosts4,
  ...blogPosts5,
  ...blogPosts6,
  ...blogPosts7,
];
