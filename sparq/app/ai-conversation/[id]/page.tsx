"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Sparkles, ArrowRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

interface Message {
  id: number
  sender: "user-ai" | "match-ai"
  content: string
  timestamp: Date
}

export default function AIConversationPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "user-ai",
      content: "Hi there! I noticed you're into photography. What kind of subjects do you like to photograph?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: 2,
      sender: "match-ai",
      content:
        "Hi! Yes, I love photography! I mostly focus on landscapes and street photography. I find capturing the beauty of nature and the spontaneity of urban life really fulfilling. What about you?",
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
    },
    {
      id: 3,
      sender: "user-ai",
      content:
        "That's awesome! I'm also into landscape photography. I recently got into astrophotography as well. Have you ever tried hiking to capture landscapes? I find it combines two great activities.",
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
    },
    {
      id: 4,
      sender: "match-ai",
      content:
        "Astrophotography sounds fascinating! I haven't tried it yet, but it's on my list. And yes, hiking and photography go perfectly together! I actually went on a trail in the Catskills last month specifically to photograph the fall colors. Do you have any favorite hiking spots?",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
    },
    {
      id: 5,
      sender: "user-ai",
      content:
        "The Catskills in fall must have been gorgeous! I haven't been there yet, but it's on my list. I usually go to trails around the Hudson Valley. There's this one spot with an amazing view of the river that's perfect for sunset shots. Would you be interested in checking it out sometime?",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
    },
    {
      id: 6,
      sender: "match-ai",
      content:
        "That sounds incredible! I'd love to explore the Hudson Valley trails. A sunset over the river would make for some stunning photos. I'm definitely interested in checking it out sometime. Maybe we could plan a photography hike?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [compatibilityScore, setCompatibilityScore] = useState(78)
  const [analysisComplete, setAnalysisComplete] = useState(false)

  const matchInfo = {
    id: params.id,
    name: "Emily",
    age: 29,
    location: "Queens, NY",
    image: "/placeholder.svg?height=100&width=100",
  }

  useEffect(() => {
    scrollToBottom()

    // Simulate AI conversation continuing and analysis completing
    const timer = setTimeout(() => {
      const newMsg: Message = {
        id: messages.length + 1,
        sender: "user-ai",
        content:
          "That would be great! I'm free most weekends. What kind of camera gear do you use? I have a Sony mirrorless that I absolutely love for landscape work.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, newMsg])

      setTimeout(() => {
        const responseMsg: Message = {
          id: messages.length + 2,
          sender: "match-ai",
          content:
            "I use a Canon DSLR, but I've been thinking about switching to mirrorless. Would love to see your Sony in action! I'm usually free on Saturdays. Maybe we could plan something for next weekend if the weather is good?",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, responseMsg])

        // Complete analysis after conversation
        setTimeout(() => {
          setCompatibilityScore(92)
          setAnalysisComplete(true)
        }, 3000)
      }, 4000)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-120px)]">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={matchInfo.image} alt={matchInfo.name} />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {matchInfo.name}, {matchInfo.age}
                    <Badge
                      variant="outline"
                      className="ml-2 bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300"
                    >
                      AI Conversation
                    </Badge>
                  </CardTitle>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{matchInfo.location}</div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="bg-purple-100 dark:bg-purple-950 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  AI Analysis in Progress
                </span>
              </div>
              <p className="text-sm mb-2">
                Our AI is having a conversation with {matchInfo.name} based on your personality profile and preferences.
              </p>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs">Compatibility</span>
                <Progress value={compatibilityScore} className="h-2 flex-1" />
                <span className="text-xs font-medium">{compatibilityScore}%</span>
              </div>
            </div>

            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user-ai" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "user-ai" ? (
                    <div className="bg-blue-100 dark:bg-blue-950 rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="h-4 w-4 text-blue-500" />
                        <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Your AI</span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                      <div className="text-xs text-right mt-1 text-gray-500">{formatTime(message.timestamp)}</div>
                    </div>
                  ) : (
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="h-4 w-4 text-purple-500" />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {matchInfo.name}'s AI
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                      <div className="text-xs text-right mt-1 text-gray-500">{formatTime(message.timestamp)}</div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {analysisComplete && (
              <div className="bg-green-100 dark:bg-green-950 rounded-lg p-4 mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="font-medium text-green-800 dark:text-green-300">Analysis Complete</span>
                </div>
                <p className="text-sm text-green-800 dark:text-green-300 mb-3">
                  Great news! Our AI has determined that you and {matchInfo.name} have a {compatibilityScore}%
                  compatibility rate. You share interests in photography, hiking, and outdoor activities, and your
                  communication styles are highly compatible.
                </p>
                <Link href={`/conversation/${matchInfo.id}`}>
                  <Button className="w-full">
                    Start Real Conversation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

