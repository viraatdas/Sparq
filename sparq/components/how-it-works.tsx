import { Check, MessageSquare, Search, Sparkles, ThumbsUp, Users } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Users className="h-6 w-6 text-purple-500" />,
      title: "Create Profile",
      description: "Sign up and create your basic profile with photos and information.",
    },
    {
      icon: <ThumbsUp className="h-6 w-6 text-pink-500" />,
      title: "Answer Personality Questions",
      description: "Respond to tailored personality prompts to build your AI representation.",
    },
    {
      icon: <Search className="h-6 w-6 text-blue-500" />,
      title: "Swipe for Preferences",
      description: "Swipe through suggested profiles to teach the AI your visual preferences.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-amber-500" />,
      title: "AI Matchmaking",
      description: "Our AI autonomously finds and matches compatible profiles.",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-green-500" />,
      title: "AI Conversations",
      description: "Matched AI profiles interact automatically to gauge compatibility.",
    },
    {
      icon: <Check className="h-6 w-6 text-red-500" />,
      title: "Compatibility Assessment",
      description: "The Discriminator AI evaluates your compatibility based on AI conversations.",
    },
    {
      icon: <Users className="h-6 w-6 text-indigo-500" />,
      title: "Real-Life Date",
      description: "Compatible matches are notified and encouraged to meet in person.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-12">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center">
              {step.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">
                {index + 1}. {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

