"use server";

import { Prisma } from "@prisma/client";

import { db } from "@/lib/Prisma.db";
import { saltAndHashPassword } from "@/lib/utils";
import { signInSchema } from "@/lib/zod";

export async function createUser(
  prevState: string | undefined,
  formData: FormData
) {
  const validatedFields = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: JSON.stringify(validatedFields.error.flatten().fieldErrors),
    };
  }
  try {
    //Hash the password
    const hashPwd = await saltAndHashPassword(validatedFields.data.password);
    console.log("Hashed Password", hashPwd);

    // Create user logic here
    await db.user.create({
      data: {
        email: validatedFields.data.email,
        password: hashPwd,
        provider: "email",
        firstname: validatedFields.data.firstname,
        lastname: validatedFields.data.lastname,
        image: process.env.DEFAULT_PICTURE_URL ?? "",
      },
    });

    // Return a successful response with a status code of 201 (Created)
    return {
      success: true,
    };
    return;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { errors: JSON.stringify({ email: ["Email already exist"] }) };
    }

    console.log("Error", error);
    return { errors: JSON.stringify({ error: ["An error occurred"] }) };
  }
}
