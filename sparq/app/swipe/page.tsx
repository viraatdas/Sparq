"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, X, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function SwipePage() {
  const [currentProfile, setCurrentProfile] = useState(0)
  const [aiProgress, setAiProgress] = useState(35)

  const profiles = [
    {
      id: 1,
      name: "Sarah",
      age: 28,
      location: "Brooklyn, NY",
      bio: "Coffee enthusiast, amateur photographer, and avid hiker. Looking for someone to explore new trails with!",
      interests: ["Photography", "Hiking", "Coffee", "Travel"],
      image: "/placeholder.svg?height=500&width=400",
    },
    {
      id: 2,
      name: "Jessica",
      age: 26,
      location: "Manhattan, NY",
      bio: "Art gallery curator with a passion for contemporary art. Love trying new restaurants and going to live music shows.",
      interests: ["Art", "Music", "Food", "Museums"],
      image: "/placeholder.svg?height=500&width=400",
    },
    {
      id: 3,
      name: "Emily",
      age: 29,
      location: "Queens, NY",
      bio: "Software engineer by day, baker by night. Looking for someone to taste test my experimental desserts!",
      interests: ["Baking", "Coding", "Reading", "Podcasts"],
      image: "/placeholder.svg?height=500&width=400",
    },
  ]

  const handleSwipe = (direction: "left" | "right") => {
    // In a real app, we would send this preference to the AI
    if (direction === "right") {
      // User liked this profile
      console.log(`Liked ${profiles[currentProfile].name}`)
    } else {
      // User passed on this profile
      console.log(`Passed on ${profiles[currentProfile].name}`)
    }

    // Move to next profile
    if (currentProfile < profiles.length - 1) {
      setCurrentProfile(currentProfile + 1)
    } else {
      // Reset to first profile for demo purposes
      setCurrentProfile(0)
    }

    // Increment AI learning progress for demo
    setAiProgress(Math.min(aiProgress + 5, 100))
  }

  const profile = profiles[currentProfile]

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Discover</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Swipe to help our AI learn your preferences</p>
          <div className="flex items-center gap-2 justify-center mb-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium">AI Learning Progress</span>
          </div>
          <Progress value={aiProgress} className="h-2 w-full" />
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

