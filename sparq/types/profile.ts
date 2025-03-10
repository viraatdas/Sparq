import { VisualType } from "@/lib/visualPreferences";

export interface Profile {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female" | "non-binary" | "other";
  location: string;
  bio: string;
  interests: string[];
  image: string;
  
  // Visual features
  hairColor?: string;
  hairStyle?: string;
  eyeColor?: string;
  faceShape?: string;
  bodyType?: string;
  style?: string;
  visualType?: VisualType;
  
  // Additional metadata
  occupation?: string;
  education?: string;
  height?: number; // in cm
  lookingFor?: ("casual" | "serious" | "friendship")[];
} 