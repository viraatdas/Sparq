"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { VisualPreferenceModel, VisualType, VisualFeature } from "@/lib/visualPreferences"
import { Progress } from "@/components/ui/progress"

interface VisualPreferenceInsightsProps {
  preferenceModel: VisualPreferenceModel
}

export default function VisualPreferenceInsights({ preferenceModel }: VisualPreferenceInsightsProps) {
  const [activeTab, setActiveTab] = useState<"types" | "features">("types")
  
  // Visual type descriptions
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
  
  // Feature descriptions
  const featureDescriptions: Record<VisualFeature, string> = {
    hairColor: "Hair color preference",
    hairStyle: "Hair style preference",
    eyeColor: "Eye color preference",
    faceShape: "Face shape preference",
    bodyType: "Body type preference",
    style: "Style and fashion preference",
    visualType: "Overall visual type preference"
  }
  
  // Get sorted visual types by preference score
  const sortedVisualTypes = Object.entries(preferenceModel.visualTypePreferences)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .map(([type, score]) => ({ 
      type: type as VisualType, 
      score: score,
      percentage: Math.max(0, Math.min(100, (score + 5) * 10)) // Convert to percentage (range -5 to +5)
    }))
  
  // Get top features for each category
  const getTopFeatures = (feature: VisualFeature) => {
    return Object.entries(preferenceModel.featurePreferences[feature])
      .filter(([value]) => value !== "unknown")
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
      .slice(0, 3)
      .map(([value, score]) => ({ 
        value, 
        score,
        percentage: Math.max(0, Math.min(100, (score + 5) * 10)) // Convert to percentage (range -5 to +5)
      }))
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          <CardTitle>Visual Preference Insights</CardTitle>
        </div>
        <CardDescription>
          AI analysis of your visual preferences based on {preferenceModel.likedProfiles.length + preferenceModel.dislikedProfiles.length} swipes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "types" | "features")} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="types">Visual Types</TabsTrigger>
            <TabsTrigger value="features">Visual Features</TabsTrigger>
          </TabsList>
          
          <TabsContent value="types" className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              These are the visual types you seem to prefer based on your swipes:
            </p>
            
            {sortedVisualTypes.map(({ type, score, percentage }) => (
              <div key={type} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant={score > 0 ? "default" : "outline"} className={score > 0 ? "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300" : ""}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs text-sm">{visualTypeDescriptions[type]}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span className="text-xs font-medium">{percentage.toFixed(0)}%</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {score > 2 ? "Strong preference" : 
                     score > 0 ? "Mild preference" : 
                     score < -2 ? "Strong dislike" : 
                     score < 0 ? "Mild dislike" : "Neutral"}
                  </span>
                </div>
                <Progress value={percentage} className="h-1" />
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="features" className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              These are the specific visual features you seem to prefer:
            </p>
            
            {(Object.keys(preferenceModel.featurePreferences) as VisualFeature[]).map((feature) => {
              const topFeatures = getTopFeatures(feature)
              if (topFeatures.length === 0) return null
              
              return (
                <div key={feature} className="space-y-2">
                  <h4 className="text-sm font-medium flex items-center gap-1">
                    {feature.charAt(0).toUpperCase() + feature.slice(1).replace(/([A-Z])/g, ' $1')}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-3 w-3 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs text-sm">{featureDescriptions[feature]}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </h4>
                  
                  <div className="space-y-2 pl-2">
                    {topFeatures.map(({ value, score, percentage }) => (
                      <div key={value} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs capitalize">{value}</span>
                            <span className="text-xs font-medium">{percentage.toFixed(0)}%</span>
                          </div>
                        </div>
                        <Progress value={percentage} className="h-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 