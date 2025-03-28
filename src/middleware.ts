import {auth} from "@/plugins/auth"
import {env} from "@/env/server";

export default auth(async (req) => {
  if (req.nextUrl.pathname === '/manifest.webmanifest') {
    return
  }

  if (req.nextUrl.pathname === '/register' && env.APP_ENV !== 'development') {
    const newUrl = new URL("/", req.nextUrl.origin)

    return Response.redirect(newUrl)
  }

  if (!req.auth && req.nextUrl.pathname !== "/login" && req.nextUrl.pathname !== "/register") {
    const newUrl = new URL("/login", req.nextUrl.origin)

    return Response.redirect(newUrl)
  }

  if (req.auth && req.nextUrl.pathname === '/login') {
    const newUrl = new URL("/", req.nextUrl.origin)

    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}