import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/cart/:path*",
    "/me/:path*",
    "/login",
    "/signup",
    "/password-reset",
    "/forgot-password",
  ],
};

const AUTH_PAGES = ["/login", "/signup", "/password-reset", "/forgot-password"];

export function proxy(request: NextRequest) {
  const resource = request.nextUrl.pathname; // full path
  const isAuthenticated = Boolean(request.cookies.get("session")?.value);
  const { pathname } = request.nextUrl;

  // Protect cart and user page
  if (
    !isAuthenticated &&
    (pathname.startsWith("/cart") || pathname.startsWith("/me"))
  ) {
    const loginUrl = new URL(`/login`, request.url);
    loginUrl.searchParams.set("redirectTo", resource);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && AUTH_PAGES.some((p) => pathname.startsWith(p))) {
    const homepage = new URL(`/`, request.url);
    return NextResponse.redirect(homepage);
  }

  return NextResponse.next();
}
