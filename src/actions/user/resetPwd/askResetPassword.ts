"use server";

import { sendEmailResetPassword } from "../../email/sendEmailResetPassword";

import { db } from "@/lib/Prisma.db";
import { generateRandomToken } from "@/lib/utils";

export async function askResetPassword(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    console.log("formData", formData.get("email"));
    const email = formData.get("email") as string;

    //Check if email exists in the database
    const user = await db.user.findFirst({
      where: {
        email,
        provider: "email",
      },
    });
    if (!user) {
      return;
    }
    const token = generateRandomToken(20);
    await db.passwordResetToken.create({
      data: {
        email,
        token,
        expiresAt: new Date(Date.now() + 3600000), // Token expires in 1 hour
      },
    });
    await sendEmailResetPassword(email, token);
  } catch (e) {
    console.log(e);
  }
}
