"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, X, Sparkles, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  initializeVisualPreferenceModel, 
  recordSwipePreference, 
  getTopVisualTypes,
  VisualPreferenceModel,
  VisualType
} from "@/lib/visualPreferences"
import { allProfiles, getFilteredProfiles } from "@/lib/profileData"
import { Profile } from "@/types/profile"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function SwipePage() {
  const [currentProfile, setCurrentProfile] = useState(0)
  const [aiProgress, setAiProgress] = useState(0)
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [preferenceModel, setPreferenceModel] = useState<VisualPreferenceModel>()
  const [topVisualTypes, setTopVisualTypes] = useState<VisualType[]>([])
  const [showVisualTypeInfo, setShowVisualTypeInfo] = useState(false)

  // Initialize profiles and preference model
  useEffect(() => {
    // In a real app, we would load the user's preference model from the database
    // or initialize a new one if it doesn't exist
    const userId = "user123" // This would come from authentication
    const model = initializeVisualPreferenceModel(userId)
    setPreferenceModel(model)
    
    // Load profiles
    // In a real app, we would filter these based on the user's preferences
    setProfiles(allProfiles)
  }, [])

  const handleSwipe = (direction: "left" | "right") => {
    if (!preferenceModel) return
    
    const profile = profiles[currentProfile]
    const liked = direction === "right"
    
    // Record the preference and update the model
    const updatedModel = recordSwipePreference(preferenceModel, profile, liked)
    setPreferenceModel(updatedModel)
    
    // Update top visual types
    const newTopTypes = getTopVisualTypes(updatedModel)
    setTopVisualTypes(newTopTypes)
    
    // Update AI learning progress
    setAiProgress(updatedModel.confidenceScore)
    
    // Move to next profile
    if (currentProfile < profiles.length - 1) {
      setCurrentProfile(currentProfile + 1)
    } else {
      // Reset to first profile for demo purposes
      // In a real app, we would load more profiles
      setCurrentProfile(0)
    }
  }

  // If profiles or preference model aren't loaded yet, show loading
  if (profiles.length === 0 || !preferenceModel) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Loading profiles...</h1>
        <Progress value={0} className="h-2 w-full max-w-md mx-auto" />
      </div>
    )
  }

  const profile = profiles[currentProfile]
  
  // Visual type descriptions for the tooltip
  const visualTypeDescriptions: Record<VisualType, string> = {
    athletic: "People with an active lifestyle and fitness focus",
    artistic: "Creative individuals with unique style and expression",
    professional: "Career-focused people with polished appearance",
    casual: "Relaxed, down-to-earth individuals",
    alternative: "People with unconventional style and interests",
    classic: "Timeless, traditional appearance and style",
    trendy: "Fashion-forward individuals following current styles",
    outdoorsy: "Nature lovers with an adventurous spirit"
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Discover</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Swipe to help our AI learn your visual preferences</p>
          <div className="flex items-center gap-2 justify-center mb-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium">AI Learning Progress</span>
          </div>
          <Progress value={aiProgress} className="h-2 w-full mb-4" />
          
          {topVisualTypes.length > 0 && (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-sm font-medium">Your Top Visual Preferences</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-sm">
                        These are the visual types you seem to prefer based on your swipes.
                        The AI is learning your preferences to find better matches.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex gap-2">
                {topVisualTypes.map((type) => (
                  <TooltipProvider key={type}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-sm">{visualTypeDescriptions[type]}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          )}
        </div>

        <Card className="overflow-hidden mb-6">
          <div className="relative">
            <img
              src={profile.image || "/placeholder.svg"}
              alt={profile.name}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
              <h2 className="text-2xl font-bold">
                {profile.name}, {profile.age}
              </h2>
              <p className="text-sm opacity-90">{profile.location}</p>
              {profile.visualType && (
                <Badge variant="outline" className="mt-2 bg-black/30 text-white border-white/30">
                  {profile.visualType.charAt(0).toUpperCase() + profile.visualType.slice(1)}
                </Badge>
              )}
            </div>
          </div>
          <CardContent className="p-4">
            <p className="mb-4">{profile.bio}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {profile.interests.map((interest, index) => (
                <Badge key={index} variant="secondary">
                  {interest}
                </Badge>
              ))}
            </div>
            {profile.occupation && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {profile.occupation}
              </p>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4">
          <Button
            size="lg"
            variant="outline"
            className="h-16 w-16 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
            onClick={() => handleSwipe("left")}
          >
            <X className="h-8 w-8" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-16 w-16 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-950"
            onClick={() => handleSwipe("right")}
          >
            <Heart className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </div>
  )
}

