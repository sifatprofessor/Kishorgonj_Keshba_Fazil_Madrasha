import { NextResponse } from "next/server";

export function middleware(request) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === "/login" || path === "/register";

    // Check both secure and non-secure session tokens
    const secureToken = request.cookies.get("__Secure-next-auth.session-token")?.value || "";
    const localToken = request.cookies.get("next-auth.session-token")?.value || "";

    // Use the appropriate token depending on the environment
    const token = process.env.NODE_ENV === "production" ? secureToken : localToken;

    console.log("Token:", token);

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
}

export const config = { matcher: ["/dashboard/:path*", "/register", "/login"] };
