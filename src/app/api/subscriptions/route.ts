import { NextRequest } from "next/server";
import { getToken, GetTokenParams } from "next-auth/jwt";

import { db } from "@/lib/Prisma.db";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
    } as unknown as GetTokenParams);

    if (!token) {
      //Unauthorized
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const subscriptions = await db.subscriptions.findMany({
      orderBy: {
        price: "asc",
      },
    });
    return new Response(JSON.stringify(subscriptions), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
}
