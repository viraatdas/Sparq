import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuthenticated = !!token

  // Define protected routes
  const protectedRoutes = ["/profile", "/swipe", "/matches", "/conversation", "/ai-conversation"]
  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  // Redirect to login if accessing protected route without authentication
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/auth/login", request.url)
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect to profile if already authenticated and trying to access auth pages
  if (isAuthenticated && request.nextUrl.pathname.startsWith("/auth/")) {
    return NextResponse.redirect(new URL("/profile", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/swipe/:path*",
    "/matches/:path*",
    "/conversation/:path*",
    "/ai-conversation/:path*",
    "/auth/:path*",
  ],
}

