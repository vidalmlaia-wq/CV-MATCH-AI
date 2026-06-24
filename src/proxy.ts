import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function proxy(req: NextRequest) {
  const session = await auth()
  const { pathname } = req.nextUrl
  const isLoggedIn = !!session?.user

  const isAuthPage = pathname.startsWith("/login")
  const isDashboard =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/resumes") ||
    pathname.startsWith("/ats") ||
    pathname.startsWith("/cover-letters") ||
    pathname.startsWith("/settings")

  // DEMO: auth bypass disabled temporarily
  // if (isDashboard && !isLoggedIn) {
  //   return NextResponse.redirect(new URL("/login", req.url))
  // }

  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
}
