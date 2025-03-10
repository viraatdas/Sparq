import { Profile } from "@/types/profile";
import { VisualType } from "./visualPreferences";

// Women profiles with different visual types
export const womenProfiles: Profile[] = [
  // Athletic women
  {
    id: "w1",
    name: "Emma",
    age: 28,
    gender: "female",
    location: "Brooklyn, NY",
    bio: "Fitness instructor and marathon runner. Love outdoor activities and healthy cooking.",
    interests: ["Running", "Fitness", "Nutrition", "Hiking"],
    image: "/images/profiles/women/athletic/emma.jpg",
    hairColor: "blonde",
    hairStyle: "ponytail",
    eyeColor: "blue",
    bodyType: "athletic",
    style: "sporty",
    visualType: "athletic",
    occupation: "Fitness Instructor",
    height: 170,
    lookingFor: ["serious", "casual"],
  },
  {
    id: "w2",
    name: "Sophia",
    age: 26,
    gender: "female",
    location: "Manhattan, NY",
    bio: "Former college athlete, now working in sports marketing. Always up for a new adventure!",
    interests: ["Basketball", "Beach Volleyball", "Cycling", "Sports"],
    image: "/images/profiles/women/athletic/sophia.jpg",
    hairColor: "brown",
    hairStyle: "short",
    eyeColor: "brown",
    bodyType: "athletic",
    style: "sporty",
    visualType: "athletic",
    occupation: "Sports Marketing Manager",
    height: 175,
    lookingFor: ["casual", "friendship"],
  },
  
  // Artistic women
  {
    id: "w3",
    name: "Isabella",
    age: 27,
    gender: "female",
    location: "Williamsburg, Brooklyn",
    bio: "Painter and art gallery curator. Love discussing art, philosophy, and visiting museums.",
    interests: ["Painting", "Art", "Museums", "Philosophy"],
    image: "/images/profiles/women/artistic/isabella.jpg",
    hairColor: "black",
    hairStyle: "wavy",
    eyeColor: "brown",
    bodyType: "slim",
    style: "creative",
    visualType: "artistic",
    occupation: "Art Curator",
    height: 165,
    lookingFor: ["serious"],
  },
  {
    id: "w4",
    name: "Olivia",
    age: 29,
    gender: "female",
    location: "East Village, NY",
    bio: "Musician and songwriter. Looking for someone to share creative energy with.",
    interests: ["Music", "Concerts", "Writing", "Poetry"],
    image: "/images/profiles/women/artistic/olivia.jpg",
    hairColor: "red",
    hairStyle: "colorful",
    eyeColor: "green",
    bodyType: "average",
    style: "bohemian",
    visualType: "artistic",
    occupation: "Musician",
    height: 168,
    lookingFor: ["casual", "serious"],
  },
  
  // Professional women
  {
    id: "w5",
    name: "Charlotte",
    age: 31,
    gender: "female",
    location: "Financial District, NY",
    bio: "Investment banker with a passion for economics and global markets. Love intellectual conversations.",
    interests: ["Finance", "Economics", "Travel", "Wine Tasting"],
    image: "/images/profiles/women/professional/charlotte.jpg",
    hairColor: "blonde",
    hairStyle: "straight",
    eyeColor: "blue",
    bodyType: "slim",
    style: "formal",
    visualType: "professional",
    occupation: "Investment Banker",
    height: 172,
    lookingFor: ["serious"],
  },
  {
    id: "w6",
    name: "Ava",
    age: 30,
    gender: "female",
    location: "Upper East Side, NY",
    bio: "Corporate attorney specializing in international law. Enjoy fine dining and cultural events.",
    interests: ["Law", "Politics", "Theater", "Fine Dining"],
    image: "/images/profiles/women/professional/ava.jpg",
    hairColor: "brown",
    hairStyle: "bob",
    eyeColor: "brown",
    bodyType: "slim",
    style: "business",
    visualType: "professional",
    occupation: "Attorney",
    height: 167,
    lookingFor: ["serious", "friendship"],
  },
  
  // Casual women
  {
    id: "w7",
    name: "Mia",
    age: 25,
    gender: "female",
    location: "Queens, NY",
    bio: "Grad student who loves coffee shops, reading, and casual hangouts with friends.",
    interests: ["Reading", "Coffee", "Movies", "Board Games"],
    image: "/images/profiles/women/casual/mia.jpg",
    hairColor: "brown",
    hairStyle: "messy bun",
    eyeColor: "hazel",
    bodyType: "average",
    style: "casual",
    visualType: "casual",
    occupation: "Graduate Student",
    height: 165,
    lookingFor: ["casual", "friendship"],
  },
  {
    id: "w8",
    name: "Amelia",
    age: 27,
    gender: "female",
    location: "Astoria, NY",
    bio: "Elementary school teacher who enjoys simple pleasures. Looking for someone genuine and kind.",
    interests: ["Teaching", "Reading", "Cooking", "Hiking"],
    image: "/images/profiles/women/casual/amelia.jpg",
    hairColor: "blonde",
    hairStyle: "medium",
    eyeColor: "blue",
    bodyType: "average",
    style: "relaxed",
    visualType: "casual",
    occupation: "Teacher",
    height: 163,
    lookingFor: ["serious"],
  },
];

// Men profiles with different visual types
export const menProfiles: Profile[] = [
  // Athletic men
  {
    id: "m1",
    name: "Ethan",
    age: 29,
    gender: "male",
    location: "Brooklyn, NY",
    bio: "Personal trainer and former college football player. Passionate about fitness and nutrition.",
    interests: ["Fitness", "Football", "Nutrition", "Hiking"],
    image: "/images/profiles/men/athletic/ethan.jpg",
    hairColor: "brown",
    hairStyle: "short",
    eyeColor: "brown",
    bodyType: "muscular",
    style: "sporty",
    visualType: "athletic",
    occupation: "Personal Trainer",
    height: 185,
    lookingFor: ["casual", "serious"],
  },
  {
    id: "m2",
    name: "Noah",
    age: 27,
    gender: "male",
    location: "Manhattan, NY",
    bio: "Triathlete and sports physical therapist. Always looking for new physical challenges.",
    interests: ["Triathlon", "Swimming", "Cycling", "Running"],
    image: "/images/profiles/men/athletic/noah.jpg",
    hairColor: "blonde",
    hairStyle: "short",
    eyeColor: "blue",
    bodyType: "athletic",
    style: "sporty",
    visualType: "athletic",
    occupation: "Physical Therapist",
    height: 183,
    lookingFor: ["friendship", "casual"],
  },
  
  // Artistic men
  {
    id: "m3",
    name: "Liam",
    age: 28,
    gender: "male",
    location: "Williamsburg, Brooklyn",
    bio: "Photographer and visual artist. Love capturing the beauty in everyday moments.",
    interests: ["Photography", "Art", "Travel", "Coffee"],
    image: "/images/profiles/men/artistic/liam.jpg",
    hairColor: "black",
    hairStyle: "medium",
    eyeColor: "brown",
    bodyType: "slim",
    style: "creative",
    visualType: "artistic",
    occupation: "Photographer",
    height: 178,
    lookingFor: ["serious"],
  },
  {
    id: "m4",
    name: "Mason",
    age: 30,
    gender: "male",
    location: "East Village, NY",
    bio: "Musician and music producer. Looking for someone to share creative inspiration with.",
    interests: ["Music", "Concerts", "Vinyl Records", "Instruments"],
    image: "/images/profiles/men/artistic/mason.jpg",
    hairColor: "brown",
    hairStyle: "long",
    eyeColor: "green",
    bodyType: "average",
    style: "bohemian",
    visualType: "artistic",
    occupation: "Music Producer",
    height: 180,
    lookingFor: ["casual", "friendship"],
  },
  
  // Professional men
  {
    id: "m5",
    name: "William",
    age: 32,
    gender: "male",
    location: "Financial District, NY",
    bio: "Software engineer at a fintech startup. Passionate about technology and innovation.",
    interests: ["Technology", "Coding", "Startups", "Chess"],
    image: "/images/profiles/men/professional/william.jpg",
    hairColor: "brown",
    hairStyle: "professional",
    eyeColor: "brown",
    bodyType: "average",
    style: "business casual",
    visualType: "professional",
    occupation: "Software Engineer",
    height: 182,
    lookingFor: ["serious"],
  },
  {
    id: "m6",
    name: "James",
    age: 34,
    gender: "male",
    location: "Upper East Side, NY",
    bio: "Management consultant with a passion for business strategy and leadership.",
    interests: ["Business", "Economics", "Travel", "Golf"],
    image: "/images/profiles/men/professional/james.jpg",
    hairColor: "black",
    hairStyle: "short",
    eyeColor: "brown",
    bodyType: "athletic",
    style: "formal",
    visualType: "professional",
    occupation: "Management Consultant",
    height: 188,
    lookingFor: ["serious", "friendship"],
  },
  
  // Casual men
  {
    id: "m7",
    name: "Benjamin",
    age: 26,
    gender: "male",
    location: "Queens, NY",
    bio: "Grad student in literature who enjoys coffee shops, reading, and casual conversations.",
    interests: ["Literature", "Coffee", "Movies", "Philosophy"],
    image: "/images/profiles/men/casual/benjamin.jpg",
    hairColor: "brown",
    hairStyle: "messy",
    eyeColor: "hazel",
    bodyType: "average",
    style: "casual",
    visualType: "casual",
    occupation: "Graduate Student",
    height: 175,
    lookingFor: ["casual", "friendship"],
  },
  {
    id: "m8",
    name: "Lucas",
    age: 29,
    gender: "male",
    location: "Astoria, NY",
    bio: "High school history teacher who enjoys simple pleasures. Looking for genuine connections.",
    interests: ["History", "Reading", "Cooking", "Hiking"],
    image: "/images/profiles/men/casual/lucas.jpg",
    hairColor: "blonde",
    hairStyle: "short",
    eyeColor: "blue",
    bodyType: "average",
    style: "relaxed",
    visualType: "casual",
    occupation: "Teacher",
    height: 180,
    lookingFor: ["serious"],
  },
];

// Combined profiles
export const allProfiles: Profile[] = [...womenProfiles, ...menProfiles];

// Get profiles by gender
export function getProfilesByGender(gender: "male" | "female" | "all"): Profile[] {
  if (gender === "male") return menProfiles;
  if (gender === "female") return womenProfiles;
  return allProfiles;
}

// Get profiles by visual type
export function getProfilesByVisualType(visualType: VisualType): Profile[] {
  return allProfiles.filter(profile => profile.visualType === visualType);
}

// Get profiles by multiple criteria
export function getFilteredProfiles(options: {
  gender?: "male" | "female";
  visualType?: VisualType;
  minAge?: number;
  maxAge?: number;
}): Profile[] {
  let filtered = options.gender ? getProfilesByGender(options.gender) : allProfiles;
  
  if (options.visualType) {
    filtered = filtered.filter(profile => profile.visualType === options.visualType);
  }
  
  if (options.minAge !== undefined && options.minAge !== null) {
    filtered = filtered.filter(profile => profile.age >= options.minAge!);
  }
  
  if (options.maxAge !== undefined && options.maxAge !== null) {
    filtered = filtered.filter(profile => profile.age <= options.maxAge!);
  }
  
  return filtered;
} 