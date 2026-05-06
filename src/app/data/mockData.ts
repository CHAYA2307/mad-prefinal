export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
}

export interface Creator {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  rating: number;
  experience: number;
  description: string;
  portfolioImages: string[];
  portfolioVideos: string[];
  totalReviews: number;
  location: string;
}

export interface Booking {
  id: string;
  customerId: string;
  creatorId: string;
  serviceType: string;
  date: string;
  time: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  customerName: string;
}

export const categories: Category[] = [
  {
    id: "media",
    name: "Media",
    icon: "Camera",
    subcategories: ["Photographer", "Videographer", "Reel Creator", "Video Editor"],
  },
  {
    id: "event",
    name: "Event",
    icon: "Sparkles",
    subcategories: ["Makeup Artist", "Stylist", "Anchor"],
  },
  {
    id: "design",
    name: "Design",
    icon: "Palette",
    subcategories: ["Graphic Designer", "Thumbnail Designer"],
  },
];

export const creators: Creator[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    category: "media",
    subCategory: "Photographer",
    price: 5000,
    rating: 4.8,
    experience: 5,
    description: "Professional wedding and portrait photographer with 5 years of experience. Specialized in candid photography and natural lighting.",
    portfolioImages: [
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
    ],
    portfolioVideos: [],
    totalReviews: 124,
    location: "Mumbai, Maharashtra",
  },
  {
    id: "2",
    name: "Priya Kapoor",
    category: "event",
    subCategory: "Makeup Artist",
    price: 3500,
    rating: 4.9,
    experience: 7,
    description: "Expert makeup artist specializing in bridal makeup, party makeup, and special effects. Certified professional with 7 years experience.",
    portfolioImages: [
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
    ],
    portfolioVideos: [],
    totalReviews: 256,
    location: "Delhi, Delhi",
  },
  {
    id: "3",
    name: "Arjun Patel",
    category: "media",
    subCategory: "Videographer",
    price: 8000,
    rating: 4.7,
    experience: 6,
    description: "Creative videographer specializing in weddings, corporate events, and music videos. Drone footage expert.",
    portfolioImages: [],
    portfolioVideos: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800",
    ],
    totalReviews: 98,
    location: "Bangalore, Karnataka",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    category: "design",
    subCategory: "Graphic Designer",
    price: 2500,
    rating: 4.6,
    experience: 4,
    description: "Professional graphic designer with expertise in branding, logo design, and social media graphics.",
    portfolioImages: [
      "https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67?w=800",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    ],
    portfolioVideos: [],
    totalReviews: 87,
    location: "Hyderabad, Telangana",
  },
  {
    id: "5",
    name: "Vikram Singh",
    category: "media",
    subCategory: "Reel Creator",
    price: 4000,
    rating: 4.9,
    experience: 3,
    description: "Social media reel creator with 500K+ followers. Expert in viral content creation and brand collaborations.",
    portfolioImages: [],
    portfolioVideos: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800",
    ],
    totalReviews: 178,
    location: "Pune, Maharashtra",
  },
  {
    id: "6",
    name: "Ananya Das",
    category: "media",
    subCategory: "Video Editor",
    price: 3000,
    rating: 4.8,
    experience: 5,
    description: "Professional video editor specializing in color grading, motion graphics, and cinematic editing.",
    portfolioImages: [],
    portfolioVideos: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800",
    ],
    totalReviews: 143,
    location: "Chennai, Tamil Nadu",
  },
  {
    id: "7",
    name: "Kabir Mehta",
    category: "event",
    subCategory: "Anchor",
    price: 6000,
    rating: 4.7,
    experience: 8,
    description: "Experienced event anchor and MC for corporate events, weddings, and celebrations. Fluent in English, Hindi, and Gujarati.",
    portfolioImages: [
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
    ],
    portfolioVideos: [],
    totalReviews: 112,
    location: "Ahmedabad, Gujarat",
  },
  {
    id: "8",
    name: "Ishita Joshi",
    category: "event",
    subCategory: "Stylist",
    price: 4500,
    rating: 4.8,
    experience: 6,
    description: "Personal stylist and fashion consultant specializing in wardrobe makeovers and personal shopping.",
    portfolioImages: [
      "https://images.unsplash.com/photo-1558769132-cb1aea3c9b3d?w=800",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800",
    ],
    portfolioVideos: [],
    totalReviews: 95,
    location: "Mumbai, Maharashtra",
  },
  {
    id: "9",
    name: "Aditya Kumar",
    category: "design",
    subCategory: "Thumbnail Designer",
    price: 1500,
    rating: 4.9,
    experience: 3,
    description: "YouTube thumbnail designer with 1M+ cumulative views on client videos. Expert in clickable designs.",
    portfolioImages: [
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800",
      "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800",
    ],
    portfolioVideos: [],
    totalReviews: 234,
    location: "Delhi, Delhi",
  },
  {
    id: "10",
    name: "Riya Malhotra",
    category: "media",
    subCategory: "Photographer",
    price: 7000,
    rating: 4.9,
    experience: 8,
    description: "Award-winning fashion and commercial photographer. Featured in Vogue and Elle magazines.",
    portfolioImages: [
      "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=800",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800",
    ],
    portfolioVideos: [],
    totalReviews: 189,
    location: "Mumbai, Maharashtra",
  },
];
