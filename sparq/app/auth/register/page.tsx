"use client"

import { useEffect } from "react"
import { signIn } from "next-auth/react"
import { Sparkles } from "lucide-react"

export default function RegisterPage() {
  useEffect(() => {
    // Automatically redirect to Google OAuth
    signIn("google", { callbackUrl: "/profile" })
  }, [])

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight flex items-center justify-center">
            Sparq
            <Sparkles className="ml-1 h-6 w-6" />
          </h1>
          <p className="text-md text-muted-foreground">
            Where AI finds your perfect match
          </p>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="text-center text-muted-foreground">
            Redirecting you to Google to create your account...
          </p>
        </div>
      </div>
    </div>
  )
}

