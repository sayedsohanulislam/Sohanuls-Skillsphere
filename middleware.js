import { NextResponse } from "next/server";

// Auth protection is handled client-side in individual pages
// to avoid edge runtime incompatibility with better-sqlite3.
export function middleware(request) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
