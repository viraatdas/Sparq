/**
 * Visual Preference Learning Algorithm
 * 
 * This module implements a visual preference learning system that:
 * 1. Tracks user swipe preferences on profile images
 * 2. Analyzes visual features of liked/disliked profiles
 * 3. Builds a personalized visual preference model
 * 4. Categorizes visual types (e.g., "athletic", "artistic", "professional")
 */

import { Profile } from "@/types/profile";

// Visual feature categories that can be learned
export type VisualFeature = 
  | "hairColor" 
  | "hairStyle" 
  | "eyeColor" 
  | "faceShape" 
  | "bodyType" 
  | "style" 
  | "visualType";

// Visual types that can be identified
export type VisualType = 
  | "athletic" 
  | "artistic" 
  | "professional" 
  | "casual" 
  | "alternative" 
  | "classic" 
  | "trendy" 
  | "outdoorsy";

// Visual preference model for a user
export interface VisualPreferenceModel {
  userId: string;
  likedProfiles: string[]; // IDs of liked profiles
  dislikedProfiles: string[]; // IDs of disliked profiles
  featurePreferences: Record<VisualFeature, Record<string, number>>; // Feature -> value -> score
  visualTypePreferences: Record<VisualType, number>; // Visual type -> score
  confidenceScore: number; // How confident we are in the model (0-100)
}

// Initialize a new visual preference model for a user
export function initializeVisualPreferenceModel(userId: string): VisualPreferenceModel {
  return {
    userId,
    likedProfiles: [],
    dislikedProfiles: [],
    featurePreferences: {
      hairColor: {},
      hairStyle: {},
      eyeColor: {},
      faceShape: {},
      bodyType: {},
      style: {},
      visualType: {},
    },
    visualTypePreferences: {
      athletic: 0,
      artistic: 0,
      professional: 0,
      casual: 0,
      alternative: 0,
      classic: 0,
      trendy: 0,
      outdoorsy: 0,
    },
    confidenceScore: 0,
  };
}

// Record a swipe preference and update the model
export function recordSwipePreference(
  model: VisualPreferenceModel,
  profile: Profile,
  liked: boolean
): VisualPreferenceModel {
  // Create a copy of the model to update
  const updatedModel = { ...model };
  
  // Record the profile ID in the appropriate list
  if (liked) {
    updatedModel.likedProfiles = [...updatedModel.likedProfiles, profile.id];
  } else {
    updatedModel.dislikedProfiles = [...updatedModel.dislikedProfiles, profile.id];
  }
  
  // Extract visual features from the profile
  const visualFeatures = extractVisualFeatures(profile);
  
  // Update feature preferences based on the swipe
  Object.entries(visualFeatures).forEach(([feature, value]) => {
    const featureKey = feature as VisualFeature;
    if (!updatedModel.featurePreferences[featureKey][value]) {
      updatedModel.featurePreferences[featureKey][value] = 0;
    }
    
    // Increase or decrease preference score based on like/dislike
    updatedModel.featurePreferences[featureKey][value] += liked ? 1 : -0.5;
  });
  
  // Update visual type preferences
  if (profile.visualType) {
    updatedModel.visualTypePreferences[profile.visualType as VisualType] += liked ? 1 : -0.5;
  }
  
  // Update confidence score based on number of swipes
  const totalSwipes = updatedModel.likedProfiles.length + updatedModel.dislikedProfiles.length;
  updatedModel.confidenceScore = Math.min(
    Math.floor((totalSwipes / 20) * 100), // 20 swipes = 100% confidence
    100
  );
  
  return updatedModel;
}

// Extract visual features from a profile
function extractVisualFeatures(profile: Profile): Record<VisualFeature, string> {
  // In a real implementation, this would use computer vision APIs
  // to extract features from the profile image
  
  // For now, we'll use the metadata that's manually tagged on the profile
  return {
    hairColor: profile.hairColor || "unknown",
    hairStyle: profile.hairStyle || "unknown",
    eyeColor: profile.eyeColor || "unknown",
    faceShape: profile.faceShape || "unknown",
    bodyType: profile.bodyType || "unknown",
    style: profile.style || "unknown",
    visualType: profile.visualType || "unknown",
  };
}

// Predict if a user would like a profile based on visual features
export function predictVisualPreference(
  model: VisualPreferenceModel,
  profile: Profile
): number {
  // If confidence is too low, return neutral score
  if (model.confidenceScore < 20) {
    return 0.5;
  }
  
  // Extract visual features from the profile
  const visualFeatures = extractVisualFeatures(profile);
  
  // Calculate preference score based on features
  let score = 0;
  let featureCount = 0;
  
  Object.entries(visualFeatures).forEach(([feature, value]) => {
    const featureKey = feature as VisualFeature;
    if (value !== "unknown" && model.featurePreferences[featureKey][value]) {
      score += model.featurePreferences[featureKey][value];
      featureCount++;
    }
  });
  
  // Add visual type preference if available
  if (profile.visualType && model.visualTypePreferences[profile.visualType as VisualType]) {
    score += model.visualTypePreferences[profile.visualType as VisualType];
    featureCount++;
  }
  
  // Normalize score between 0 and 1
  const normalizedScore = featureCount > 0 
    ? 0.5 + (score / (featureCount * 2)) 
    : 0.5;
  
  return Math.max(0, Math.min(1, normalizedScore));
}

// Get the top visual types preferred by the user
export function getTopVisualTypes(model: VisualPreferenceModel): VisualType[] {
  return Object.entries(model.visualTypePreferences)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .map(([type]) => type as VisualType)
    .slice(0, 3);
}

// Get the visual type of a profile based on its features
export function determineVisualType(profile: Profile): VisualType {
  // In a real implementation, this would use machine learning
  // to classify the profile image into a visual type
  
  // For now, we'll use a simple rule-based approach
  const { style, bodyType, hairStyle } = profile;
  
  if (bodyType === "athletic" || bodyType === "muscular") {
    return "athletic";
  }
  
  if (style === "creative" || hairStyle === "colorful") {
    return "artistic";
  }
  
  if (style === "formal" || style === "business") {
    return "professional";
  }
  
  if (style === "casual" || style === "relaxed") {
    return "casual";
  }
  
  if (style === "alternative" || hairStyle === "unconventional") {
    return "alternative";
  }
  
  if (style === "classic" || style === "elegant") {
    return "classic";
  }
  
  if (style === "trendy" || style === "fashionable") {
    return "trendy";
  }
  
  if (style === "outdoorsy" || bodyType === "fit") {
    return "outdoorsy";
  }
  
  // Default to casual if no clear type
  return "casual";
} 