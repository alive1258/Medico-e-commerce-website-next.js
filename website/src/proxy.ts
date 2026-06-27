import { NextRequest, NextResponse } from "next/server";

// Auth pages
const authRoutes = [
  "/login",
  "/forget-password",
  "/otp",
  "/signup",
  "/verify-otp",
];

export async function proxy(request: NextRequest) {
  const adminAccessToken = request.cookies.get("refreshToken")?.value;
  const pathname = request.nextUrl.pathname;

  // Prevent logged-in users from accessing authentication pages
  if (adminAccessToken && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users to signin page for protected routes
  if (!adminAccessToken && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow access & prevent caching issues (fixes back button issue)
  const response = NextResponse.next();
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate",
  );
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  return response;
}

//  Correct static matcher
export const config = {
  matcher: [
    "/",
    "/login",
    "/forget-password",
    "/otp",
    "/signup",
    "/verify-otp",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
