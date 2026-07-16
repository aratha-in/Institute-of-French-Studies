export interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  price: number;
  schedule: string;
  duration: string;
  imageUrl: string;
  featured?: boolean;
}

export const courses: Course[] = [
  {
    id: 7,
    title: "Course Bundle \"TEF/TCF\" (A0 to B2)",
    description: "A comprehensive preparation package covering everything from absolute beginner (A0) up to upper-intermediate (B2) fluency. Tailored specifically for students preparing for the TEF and TCF examinations.",
    level: "A0-B2",
    price: 70000.00,
    schedule: "Flexible Online Sessions, Self-Paced",
    duration: "24 Weeks (120 Hours)",
    imageUrl: "/images/courses/bundle.jpg",
    featured: true
  },
  {
    id: 9,
    title: "Academic French (Le Français Académique)",
    description: "Designed for students planning to study in French universities. Focuses on dissertation writing, textual analysis, presentation delivery, and formal academic research methods.",
    level: "B2-C2",
    price: 459.00,
    schedule: "Fridays, 4:00 PM - 7:00 PM",
    duration: "10 Weeks (30 Hours)",
    imageUrl: "/images/courses/academic.jpg"
  },
  {
    id: 8,
    title: "Spoken French (Le Français Oral)",
    description: "Focus exclusively on conversation, oral comprehension, pronunciation, and practical daily communication skills. Build confidence in speaking French in real-life social environments.",
    level: "A2-B2",
    price: 329.00,
    schedule: "Saturdays, 2:00 PM - 5:00 PM",
    duration: "6 Weeks (18 Hours)",
    imageUrl: "/images/courses/spoken.jpg"
  },
  {
    id: 6,
    title: "Business French (Le Français Professionnel)",
    description: "Tailored for professionals working in French-speaking environments. Covers professional writing, negotiations, business vocabulary, and cultural etiquette.",
    level: "B2",
    price: 479.00,
    schedule: "Fridays, 6:00 PM - 9:00 PM",
    duration: "8 Weeks (24 Hours)",
    imageUrl: "/images/courses/business.jpg"
  },
  {
    id: 1,
    title: "French Level A1 (Beginner)",
    description: "Learn basic French phrases, vocabulary, and grammar. Ideal for absolute beginners who want to build a strong foundation in listening, speaking, reading, and writing.",
    level: "A1",
    price: 299.00,
    schedule: "Mondays & Wednesdays, 6:00 PM - 8:00 PM",
    duration: "8 Weeks (32 Hours)",
    imageUrl: "/images/courses/a1.jpg"
  },
  {
    id: 2,
    title: "French Level A2 (Elementary)",
    description: "Consolidate your beginner skills. Learn to express basic needs, talk about your immediate surroundings, and conduct everyday transactions in French speaking environments.",
    level: "A2",
    price: 349.00,
    schedule: "Tuesdays & Thursdays, 6:00 PM - 8:00 PM",
    duration: "8 Weeks (32 Hours)",
    imageUrl: "/images/courses/a2.jpg"
  },
  {
    id: 3,
    title: "French Level B1 (Intermediate)",
    description: "Express opinions, describe experiences and ambitions, and handle most situations likely to arise while travelling in French-speaking countries.",
    level: "B1",
    price: 399.00,
    schedule: "Mondays & Wednesdays, 7:30 PM - 9:30 PM",
    duration: "10 Weeks (40 Hours)",
    imageUrl: "/images/courses/b1.jpg"
  },
  {
    id: 4,
    title: "French Level B2 (Upper Intermediate)",
    description: "Understand the main ideas of complex texts, interact with a degree of fluency with native speakers, and write clear, detailed texts on a wide range of subjects.",
    level: "B2",
    price: 449.00,
    schedule: "Tuesdays & Thursdays, 7:30 PM - 9:30 PM",
    duration: "10 Weeks (40 Hours)",
    imageUrl: "/images/courses/b2.jpg"
  },
  {
    id: 5,
    title: "French Level C1/C2 (Advanced Mastery)",
    description: "Master fluent communication. Express ideas fluently and spontaneously, and read demanding, longer texts including literature, business reports, and media reviews.",
    level: "C1",
    price: 499.00,
    schedule: "Saturdays, 10:00 AM - 2:00 PM",
    duration: "12 Weeks (48 Hours)",
    imageUrl: "/images/courses/c1.jpg"
  }
];
