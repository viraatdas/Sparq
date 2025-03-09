import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, MessageSquare, Heart, UserCheck, Shield, Brain, AlertTriangle } from "lucide-react"
import FeatureCard from "@/components/feature-card"
import HowItWorks from "@/components/how-it-works"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="inline-block">Sparq</span>
              <Sparkles className="inline-block ml-2 h-8 w-8 md:h-10 md:w-10" />
            </h1>
            <p className="text-xl md:text-2xl mb-8">Dating Powered by AI Honesty</p>
            <p className="text-lg mb-10 opacity-90">
              Skip the games. Let AI reveal the real you, detect red flags early, and find genuine connections that last.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100" asChild>
                <Link href="/auth/register">
                  Create Your AI Dating Personality
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Sparq Is Different</h2>
          <p className="text-center text-lg mb-12 max-w-2xl mx-auto">
            Traditional dating apps waste your time with mismatches and hidden red flags. 
            Sparq uses AI to create honest connections from the start.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-8 w-8 text-purple-500" />}
              title="AI Dating Personality"
              description="Create an honest AI representation of yourself that communicates with potential matches."
            />
            <FeatureCard
              icon={<AlertTriangle className="h-8 w-8 text-amber-500" />}
              title="Red Flag Detection"
              description="Our AI identifies compatibility issues and red flags before you waste months discovering them."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-blue-500" />}
              title="Honesty Protection"
              description="No more games or false personas. AI ensures authentic representation of who you really are."
            />
            <FeatureCard
              icon={<MessageSquare className="h-8 w-8 text-green-500" />}
              title="AI-Driven Conversations"
              description="Your AI personality chats with potential matches, revealing true compatibility."
            />
            <FeatureCard
              icon={<UserCheck className="h-8 w-8 text-pink-500" />}
              title="Compatibility Assessment"
              description="Advanced algorithms determine real-life compatibility based on values, goals, and communication styles."
            />
            <FeatureCard
              icon={<Heart className="h-8 w-8 text-red-500" />}
              title="Genuine Connections"
              description="Meet people who appreciate the real you, not a curated persona that falls apart over time."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-lg mb-12 max-w-2xl mx-auto">
            Sparq short-circuits the dating process by letting AI personalities interact first, 
            saving you from wasting time on incompatible matches.
          </p>
          <HowItWorks />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Stop Wasting Time on Bad Matches</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Let AI find your genuine connections by cutting through the games and revealing red flags early.
          </p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100" asChild>
            <Link href="/auth/register">
              Create Your AI Dating Personality
              <Brain className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Sparq</h3>
              <Sparkles className="ml-1 h-5 w-5" />
            </div>
            <div className="flex gap-8">
              <Link href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                About
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Privacy
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Terms
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Sparq. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

