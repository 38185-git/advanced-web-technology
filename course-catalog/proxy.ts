import { NextResponse, type NextRequest } from "next/server";

// Only a quick redirect. The DAL verifies the token with the API.
export function proxy(request: NextRequest) {
  if (!request.cookies.has("session")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/account/:path*"] };
