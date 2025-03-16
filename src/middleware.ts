import {auth} from "@/plugins/auth"

export default auth(async (req) => {
  if (req.nextUrl.pathname === '/register' && process.env.VITE_APP_ENV !== 'development') {
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