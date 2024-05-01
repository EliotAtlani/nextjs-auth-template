import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken, GetTokenParams } from "next-auth/jwt";

import { User } from "./types/user";

import { auth } from "../auth";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  } as unknown as GetTokenParams);
  console.log("tokenDD", token);

  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  } else {
    const session = (await auth()) as User;
    if (!session?.user) {
      return NextResponse.redirect(new URL("/signin", req.nextUrl));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/test"],
};
