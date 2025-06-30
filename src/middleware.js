import { NextResponse } from "next/server";

export function middleware(request) {
    console.log("Im in the middleware")
  // return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
  matcher: ["/", "/((?!api|_next|static).*)"],
};
  