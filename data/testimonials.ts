// Define interfaces for the various testimonial types
interface Testimonial {
  imgSrc: string;
  rating: number;
  name: string;
  position: string;
  review: string;
  wowDelay: string;
}

interface CustomerReview {
  title: string;
  text: string;
  author: string;
  rating: number;
  verified: boolean;
}

export interface TestiSlide {
  text: string;
}

interface Testimonial2 {
  imgSrc: string;
  imgWidth: number;
  imgHeight: number;
  styleClass: string;
  rating: number[];
  reviewsCount: string;
}

interface Testimonial4 {
  title: string;
  text: string;
  authorName: string;
  authorCompany: string;
  authorImage: string;
  iconImage: string;
}

interface Testimonial5 {
  iconSrc: string;
  title: string;
  text: string;
  authorImageSrc: string;
  authorName: string;
  authorCompany: string;
}

// Define the arrays with type annotations
export const testimonials: Testimonial[] = [
  {
    imgSrc: "/images/resource/test-1.jpg",
    rating: 4.8,
    name: "Ali TUFAN",
    position: "Designer",
    review:
      "I'd suggest Macklin Motors Nissan Glasgow South to a friend because I had great service from my salesman Patrick and all of the team.",
    wowDelay: "100ms",
  },
  {
    imgSrc: "/images/resource/test-1.jpg",
    rating: 4.8,
    name: "Ali TUFAN",
    position: "Designer",
    review:
      "I'd suggest Macklin Motors Nissan Glasgow South to a friend because I had great service from my salesman Patrick and all of the team.",
    wowDelay: "100ms",
  },
];

export const customerData: CustomerReview[] = [
  {
    title: "Sales process was simple and easy",
    text: "Sales process was simple and easy. Maximillion was friendly and I didn’t feel pressured.",
    author: "Ali Tufan, 2 hours ago",
    rating: 5,
    verified: true,
  },
  {
    title: "Amazing customer support",
    text: "The customer service team was extremely helpful and solved my issue in no time.",
    author: "Sarah Lee, 3 hours ago",
    rating: 5,
    verified: true,
  },
  // Add more objects as needed
];

export const testiSlides: TestiSlide[] = [
  {
    text: "I'd suggest Macklin Motors Nissan Glasgow South to a friend because I had great service from my salesman Patrick and all of the team.",
  },
  {
    text: "I'd suggest Macklin Motors Nissan Glasgow South to a friend because I had great service from my salesman Patrick and all of the team.",
  },
];

export const testimonials2: Testimonial2[] = [
  {
    imgSrc: "/images/resource/testi3-1.png",
    imgWidth: 150,
    imgHeight: 37,
    styleClass: "",
    rating: [1, 2, 3, 4, 5],
    reviewsCount: "5,801",
  },
  {
    imgSrc: "/images/resource/testi3-2.png",
    imgWidth: 108,
    imgHeight: 53,
    styleClass: "v2",
    rating: [1, 2, 3, 4, 5],
    reviewsCount: "5,801",
  },
];

export const testimonials4: Testimonial4[] = [
  {
    title: "Great Work",
    text: `“Amazing design, easy to customize and a design quality
           superlative account on its cloud platform for the optimized
           performance. And we didn’t on our original designs.”`,
    authorName: "Leslie Alexander",
    authorCompany: "Nintendo",
    authorImage: "/images/resource/test-auther-1.jpg",
    iconImage: "/images/resource/comas.png",
  },
  {
    title: "Awesome Design",
    text: `“Amazing design, easy to customize and a design quality
           superlative account on its cloud platform for the optimized
           performance. And we didn’t on our original designs.”`,
    authorName: "Floyd Miles",
    authorCompany: "Bank of America",
    authorImage: "/images/resource/test-auther-2.jpg",
    iconImage: "/images/resource/comas.png",
  },
];

export const testimonials5: Testimonial5[] = [
  {
    iconSrc: "/images/resource/comas.png",
    title: "Great Work",
    text: `“Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”`,
    authorImageSrc: "/images/resource/test-auther-1.jpg",
    authorName: "Leslie Alexander",
    authorCompany: "Nintendo",
  },
  {
    iconSrc: "/images/resource/comas.png",
    title: "Awesome Design",
    text: `“Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”`,
    authorImageSrc: "/images/resource/test-auther-2.jpg",
    authorName: "Floyd Miles",
    authorCompany: "Bank of America",
  },
];

export const testimonials6: Testimonial5[] = [
  {
    iconSrc: "/images/resource/comas.png",
    title: "Great Work",
    text: `“Amazing design, easy to customize and a design quality
           superlative account on its cloud platform for the optimized
           performance. And we didn’t on our original designs.”`,
    authorImageSrc: "/images/resource/test-auther-1.jpg",
    authorName: "Leslie Alexander",
    authorCompany: "Nintendo",
  },
  {
    iconSrc: "/images/resource/comas.png",
    title: "Awesome Design",
    text: `“Amazing design, easy to customize and a design quality
           superlative account on its cloud platform for the optimized
           performance. And we didn’t on our original designs.”`,
    authorImageSrc: "/images/resource/test-auther-2.jpg",
    authorName: "Floyd Miles",
    authorCompany: "Bank of America",
  },
];