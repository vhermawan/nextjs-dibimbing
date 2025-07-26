// middleware.ts

import { auth } from "./auth"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Define public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/register"]
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

  // Define auth routes (login, register)
  const authRoutes = ["/login", "/register"]
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  // If user is logged in and tries to access auth routes, redirect to dashboard
  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL("/dashboard", nextUrl))
  }

  // If user is not logged in and tries to access protected routes, redirect to login
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl))
  }

  return null
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}