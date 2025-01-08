// Define interfaces for the team members
interface TeamMember {
  id: number;
  name: string;
  title?: string;
  position?: string;
  role?: string;
  imageSrc?: string;
  imgSrc?: string;
  email: string;
  phone: string;
  delay?: string;
  wowDelay?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Courtney Henry",
    title: "Software Development Manager",
    imageSrc: "/images/resource/team1-1.jpg",
    email: "henry@boxcars.com",
    phone: "+30 595 59 291 2",
    delay: "0ms",
  },
  {
    id: 2,
    name: "Jerome Bell",
    title: "Software Tester",
    imageSrc: "/images/resource/team1-2.jpg",
    email: "henry@boxcars.com",
    phone: "+30 595 59 291 2",
    delay: "100ms",
  },
  {
    id: 3,
    name: "Arlene McCoy",
    title: "Software Developer",
    imageSrc: "/images/resource/team1-3.jpg",
    email: "henry@boxcars.com",
    phone: "+30 595 59 291 2",
    delay: "200ms",
  },
  {
    id: 4,
    name: "Jenny Wilson",
    title: "UI/UX Designer",
    imageSrc: "/images/resource/team1-4.jpg",
    email: "henry@boxcars.com",
    phone: "+30 595 59 291 2",
    delay: "300ms",
  },
];

export const teamMembers2: TeamMember[] = [
  {
    id: 5,
    imgSrc: "/images/resource/team6-1.jpg",
    name: "Courtney Henry",
    role: "Software Development Manager",
    email: "henry@boxcars.com",
    phone: "+30 595 59 291 2",
    delay: "0ms",
  },
  {
    id: 6,
    imgSrc: "/images/resource/team6-2.jpg",
    name: "Jerome Bell",
    role: "Software Tester",
    email: "henry@boxcars.com",
    phone: "+30 595 59 291 2",
    delay: "100ms",
  },
  {
    id: 7,
    imgSrc: "/images/resource/team6-3.jpg",
    name: "Arlene McCoy",
    role: "Software Developer",
    email: "henry@boxcars.com",
    phone: "+30 595 59 291 2",
    delay: "200ms",
  },
  {
    id: 8,
    imgSrc: "/images/resource/team6-4.jpg",
    name: "Jenny Wilson",
    role: "UI/UX Designer",
    email: "henry@boxcars.com",
    phone: "+30 595 59 291 2",
    delay: "300ms",
  },
];

export const teamBlocks: TeamMember[] = [
  {
    id: 9,
    imgSrc: "/images/resource/team2-1.jpg",
    delay: "",
    name: "Courtney Henry",
    title: "Software Development Manager",
    email: "henry@boxcars.com",
    phone: "+30 595 59 291 2",
  },
  {
    id: 10,
    imgSrc: "/images/resource/team2-2.jpg",
    delay: "100ms",
    name: "Jerome Bell",
    title: "Software Tester",
    email: "henry@boxcars.com",
    phone: "+30 595 59 291 2",
  },
  {
    id: 11,
    imgSrc: "/images/resource/team2-3.jpg",
    delay: "200ms",
    name: "Arlene McCoy",
    title: "Software Developer",
    email: "henry@boxcars.com",
    phone: "+30 595 59 291 2",
  },
  {
    id: 12,
    imgSrc: "/images/resource/team2-4.jpg",
    delay: "300ms",
    name: "Jenny Wilson",
    title: "UI/UX Designer",
    email: "henry@boxcars.com",
    phone: "+30 595 59 291 2",
  },
];

export const teamMembers3: TeamMember[] = [
  {
    id: 13,
    name: "Courtney Henry",
    position: "Software Development Manager",
    imageSrc: "/images/resource/team6-1.jpg",
    email: "henry@boxcars.com",
    phone: "+30 595 59 291 2",
    delay: "0ms",
  },
  {
    id: 14,
    name: "Jerome Bell",
    position: "Software Tester",
    imageSrc: "/images/resource/team6-2.jpg",
    email: "henry@boxcars.com",
    phone: "+30 595 59 291 2",
    delay: "100ms",
  },
  {
    id: 15,
    name: "Arlene McCoy",
    position: "Software Developer",
    imageSrc: "/images/resource/team6-3.jpg",
    email: "henry@boxcars.com",
    phone: "+30 595 59 291 2",
    delay: "200ms",
  },
  {
    id: 16,
    name: "Jenny Wilson",
    position: "UI/UX Designer",
    imageSrc: "/images/resource/team6-4.jpg",
    email: "henry@boxcars.com",
    phone: "+30 595 59 291 2",
    delay: "300ms",
  },
];

export const teamMembers4: TeamMember[] = [
  {
    id: 17,
    name: "Courtney Henry",
    role: "Software Development Manager",
    imgSrc: "/images/resource/team1-1.jpg",
    email: "henry@boxcars.com",
    phone: "+30 595 59 291 2",
    wowDelay: "0ms",
  },
  {
    id: 18,
    name: "Jerome Bell",
    role: "Software Tester",
    imgSrc: "/images/resource/team1-2.jpg",
    email: "henry@boxcars.com",
    phone: "+30 595 59 291 2",
    wowDelay: "100ms",
  },
];

export const allTeammember: TeamMember[] = [
  ...teamMembers,
  ...teamMembers2,
  ...teamBlocks,
  ...teamMembers3,
  ...teamMembers4,
];