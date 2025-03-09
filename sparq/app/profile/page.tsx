"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, Upload, User, Sparkles } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"

export default function ProfileCreation() {
  const [activeTab, setActiveTab] = useState("basic")
  const [progress, setProgress] = useState(25)

  const handleNextTab = (current: string) => {
    if (current === "basic") {
      setActiveTab("personality")
      setProgress(50)
    } else if (current === "personality") {
      setActiveTab("preferences")
      setProgress(75)
    } else if (current === "preferences") {
      setActiveTab("review")
      setProgress(100)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Create Your Sparq Profile</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Let's build your profile and AI representation to find your perfect match
          </p>
          <Progress value={progress} className="h-2 w-full" />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="personality">Personality</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Let's start with some basic details about you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                    <AvatarFallback>
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Your first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Your last name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <RadioGroup defaultValue="female" id="gender">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="non-binary" id="non-binary" />
                        <Label htmlFor="non-binary">Non-binary</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="City, State" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => handleNextTab("basic")}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="personality">
            <Card>
              <CardHeader>
                <CardTitle>Personality Profile</CardTitle>
                <CardDescription>Help our AI understand your personality and values</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>How would you describe yourself in three words?</Label>
                    <Input placeholder="e.g., Creative, Ambitious, Kind" />
                  </div>

                  <div className="space-y-2">
                    <Label>What are you passionate about?</Label>
                    <Textarea placeholder="Tell us about your interests and passions" />
                  </div>

                  <div className="space-y-2">
                    <Label>Introvert vs. Extrovert</Label>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">Introvert</span>
                      <Slider defaultValue={[50]} max={100} step={1} className="flex-1" />
                      <span className="text-sm">Extrovert</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Planning vs. Spontaneity</Label>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">Planner</span>
                      <Slider defaultValue={[50]} max={100} step={1} className="flex-1" />
                      <span className="text-sm">Spontaneous</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>What are your life goals?</Label>
                    <Textarea placeholder="Share your ambitions and dreams" />
                  </div>

                  <div className="space-y-2">
                    <Label>What qualities do you value most in a relationship?</Label>
                    <Textarea placeholder="Describe what matters to you in a partner" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => handleNextTab("personality")}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Dating Preferences</CardTitle>
                <CardDescription>Tell us what you're looking for in a match</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>I'm interested in</Label>
                    <RadioGroup defaultValue="women">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="women" id="women" />
                        <Label htmlFor="women">Women</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="men" id="men" />
                        <Label htmlFor="men">Men</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="everyone" id="everyone" />
                        <Label htmlFor="everyone">Everyone</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Age Range</Label>
                    <div className="flex items-center gap-4">
                      <Input type="number" placeholder="Min" className="w-20" />
                      <span>to</span>
                      <Input type="number" placeholder="Max" className="w-20" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Distance (miles)</Label>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">5</span>
                      <Slider defaultValue={[25]} max={100} step={5} className="flex-1" />
                      <span className="text-sm">100+</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>What are your deal-breakers?</Label>
                    <Textarea placeholder="Things you absolutely cannot accept in a partner" />
                  </div>

                  <div className="space-y-2">
                    <Label>What kind of relationship are you looking for?</Label>
                    <RadioGroup defaultValue="long-term">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="long-term" id="long-term" />
                        <Label htmlFor="long-term">Long-term relationship</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="casual" id="casual" />
                        <Label htmlFor="casual">Casual dating</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="friendship" id="friendship" />
                        <Label htmlFor="friendship">Friendship</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="not-sure" id="not-sure" />
                        <Label htmlFor="not-sure">Not sure yet</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => handleNextTab("preferences")}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="review">
            <Card>
              <CardHeader>
                <CardTitle>Review Your Profile</CardTitle>
                <CardDescription>
                  Make sure everything looks good before we create your AI representation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Profile" />
                      <AvatarFallback>
                        <User className="h-8 w-8" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-medium">John Doe</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">28 • New York, NY</p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div>
                      <h4 className="font-medium mb-1">Personality</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Creative, Ambitious, Kind • Moderately extroverted • Enjoys spontaneity
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-1">Interests</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Photography, Hiking, Reading, Travel</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-1">Looking for</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Women • Ages 25-35 • Within 25 miles • Long-term relationship
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-slate-100 dark:bg-slate-800 p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 text-purple-500" />
                      AI Representation
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Based on your profile, our AI will represent you as a creative and ambitious individual who values
                      kindness and authenticity. It will engage in conversations that highlight your interests in
                      photography and travel, while looking for partners who share your values of honesty and emotional
                      connection.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("preferences")}>
                  Back
                </Button>
                <Button>Complete Profile</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

