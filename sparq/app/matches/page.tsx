"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Sparkles, User } from "lucide-react"

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState("ai-matches")

  const aiMatches = [
    {
      id: 1,
      name: "Sarah",
      age: 28,
      location: "Brooklyn, NY",
      compatibility: 92,
      status: "AI Conversation in Progress",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Jessica",
      age: 26,
      location: "Manhattan, NY",
      compatibility: 87,
      status: "Ready for Introduction",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Emily",
      age: 29,
      location: "Queens, NY",
      compatibility: 85,
      status: "AI Conversation in Progress",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const confirmedMatches = [
    {
      id: 4,
      name: "Rachel",
      age: 27,
      location: "Manhattan, NY",
      compatibility: 94,
      lastMessage: "Looking forward to meeting you on Saturday!",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 5,
      name: "Olivia",
      age: 28,
      location: "Brooklyn, NY",
      compatibility: 91,
      lastMessage: "That coffee shop sounds perfect. What time works for you?",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Your Matches</h1>
          <p className="text-gray-600 dark:text-gray-400">Discover your AI-powered connections</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="ai-matches">AI Matches</TabsTrigger>
            <TabsTrigger value="confirmed-matches">Confirmed Matches</TabsTrigger>
          </TabsList>

          <TabsContent value="ai-matches">
            <div className="grid gap-6">
              {aiMatches.map((match) => (
                <Card key={match.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={match.image} alt={match.name} />
                          <AvatarFallback>
                            <User className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>
                            {match.name}, {match.age}
                          </CardTitle>
                          <CardDescription>{match.location}</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-purple-500 hover:bg-purple-600">{match.compatibility}% Match</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                      <span>Status: {match.status}</span>
                    </div>

                    {match.status === "AI Conversation in Progress" ? (
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                        <p className="text-sm">
                          Our AI is currently chatting with {match.name} to determine compatibility. We'll notify you
                          when it's time to take over the conversation!
                        </p>
                      </div>
                    ) : (
                      <div className="bg-green-50 dark:bg-green-950 rounded-lg p-3">
                        <p className="text-sm text-green-800 dark:text-green-300">
                          Great news! Our AI has determined you and {match.name} are highly compatible. You can now
                          start a real conversation!
                        </p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    {match.status === "Ready for Introduction" ? (
                      <Button className="w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Start Conversation
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full">
                        <Sparkles className="mr-2 h-4 w-4" />
                        View AI Conversation
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="confirmed-matches">
            <div className="grid gap-6">
              {confirmedMatches.map((match) => (
                <Card key={match.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={match.image} alt={match.name} />
                          <AvatarFallback>
                            <User className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>
                            {match.name}, {match.age}
                          </CardTitle>
                          <CardDescription>{match.location}</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-green-500 hover:bg-green-600">{match.compatibility}% Match</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                      <p className="text-sm italic">"{match.lastMessage}"</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Continue Conversation
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

