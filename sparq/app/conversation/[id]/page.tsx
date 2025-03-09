"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, User, Sparkles, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Message {
  id: number
  sender: "user" | "match" | "ai"
  content: string
  timestamp: Date
}

export default function ConversationPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      content:
        "Based on your shared interests in photography and hiking, I've started a conversation with Sarah. You can now take over!",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: 2,
      sender: "match",
      content: "Hi there! Your AI mentioned you're into photography. What kind of photos do you like to take?",
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const matchInfo = {
    id: params.id,
    name: "Sarah",
    age: 28,
    location: "Brooklyn, NY",
    compatibility: 92,
    image: "/placeholder.svg?height=100&width=100",
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const newMsg: Message = {
      id: messages.length + 1,
      sender: "user",
      content: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, newMsg])
    setNewMessage("")

    // Simulate a response after a short delay
    setTimeout(() => {
      const responseMsg: Message = {
        id: messages.length + 2,
        sender: "match",
        content:
          "That sounds amazing! I love landscape photography too. Have you visited any of the hiking trails in the Catskills?",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, responseMsg])
    }, 3000)
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
                  <CardTitle>
                    {matchInfo.name}, {matchInfo.age}
                  </CardTitle>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{matchInfo.location}</div>
                </div>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge className="bg-purple-500 hover:bg-purple-600 cursor-help">
                      {matchInfo.compatibility}% Match
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">
                      Our AI determined you have high compatibility based on shared interests and values.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {message.sender === "ai" ? (
                    <div className="bg-purple-100 dark:bg-purple-950 rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="h-4 w-4 text-purple-500" />
                        <span className="text-xs font-medium text-purple-700 dark:text-purple-300">Sparq AI</span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                      <div className="text-xs text-right mt-1 text-gray-500">{formatTime(message.timestamp)}</div>
                    </div>
                  ) : message.sender === "user" ? (
                    <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">{message.content}</p>
                      <div className="text-xs text-right mt-1 text-blue-100">{formatTime(message.timestamp)}</div>
                    </div>
                  ) : (
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">{message.content}</p>
                      <div className="text-xs text-right mt-1 text-gray-500">{formatTime(message.timestamp)}</div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="border-t p-3">
            <div className="flex w-full items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="flex-shrink-0">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">
                      Our AI has analyzed Sarah's profile and determined she's interested in photography, hiking, and
                      travel.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage()
                  }
                }}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} className="flex-shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

