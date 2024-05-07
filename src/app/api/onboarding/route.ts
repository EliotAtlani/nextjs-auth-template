import type { NextRequest } from "next/server";
import { getToken, GetTokenParams } from "next-auth/jwt";

import { db } from "@/lib/Prisma.db";
export async function POST(req: NextRequest) {
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
    // Access the form data
    const formData = await req.formData();

    // Extract the individual fields
    const email = formData.get("email");

    console.log("Email:", email);

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    const job = formData.get("job");
    const country = formData.get("country");
    const subscription = formData.get("subscription");
    const cv = formData.get("cv");
    const image = formData.get("image");

    console.log("CV:", cv);
    console.log("Image:", image);

    //Simulate a delay for adding cv and image to s3
    const cv_url = "https://cv.s3.amazonaws.com/cv.pdf";
    const image_url = "https://image.s3.amazonaws.com/image.jpg";

    //Check for userProfile
    const userProfile = await db.userProfile.findFirst({
      where: {
        userEmail: email as string,
      },
    });

    console.log("UserProfile:", userProfile);

    if (userProfile) {
      //Delete the existing user profile
      await db.userProfile.delete({
        where: {
          id: userProfile.id,
        },
      });
    }
    //Save data to data base
    await db.userProfile.create({
      data: {
        job: job as string,
        country: country as string,
        cv: cv_url,
        userEmail: email as string,
      },
    });

    //Update user
    await db.user.update({
      where: {
        email: email as string,
      },
      data: {
        image: image_url,
        onboarded: true,
        subscription: {
          connect: {
            title: subscription as string,
          },
        },
      },
    });

    return new Response(
      JSON.stringify({ message: "Data received successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while processing the data" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export const config = {
  runtime: "edge",
};
