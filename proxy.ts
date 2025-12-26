import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/cart/:path*", "/me/:path*"],
};

export function proxy(request: NextRequest) {
  const resource = request.nextUrl.pathname; // full path
  const isAuthenticated = Boolean(request.cookies.get("session")?.value);

  if (!isAuthenticated) {
    const loginUrl = new URL(`/login`, request.url);
    loginUrl.searchParams.set("redirectTo", resource);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
