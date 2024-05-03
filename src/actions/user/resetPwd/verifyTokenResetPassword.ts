"use server";

import { db } from "@/lib/Prisma.db";
import { saltAndHashPassword } from "@/lib/utils";
import { resetPasswordSchema } from "@/lib/zod";

export const verifyTokenResetPassword = async (
  prevState: string | undefined,
  formData: FormData
) => {
  try {
    const validatedFields = resetPasswordSchema.safeParse({
      password: formData.get("password"),
      token: formData.get("token"),
    });

    console.log("validatedFields", validatedFields);

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      return {
        errors: JSON.stringify(validatedFields.error.flatten().fieldErrors),
      };
    }

    if (!validatedFields.data.token)
      return {
        status: 0,
        message: "Token is invalid or expired",
      };

    const token = validatedFields.data.token;
    const password = validatedFields.data.password;

    const resetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    // Check if token exists and is not expired
    if (!resetToken || resetToken.expiresAt < new Date()) {
      return {
        status: 0,
        message: "Token is invalid or expired",
      };
    }

    const hashPwd = await saltAndHashPassword(password);

    // Update user's password
    await db.user.update({
      where: { email: resetToken.email },
      data: { password: hashPwd }, // Implement your password hashing logic
    });

    // Delete token from database
    await db.passwordResetToken.delete({
      where: { token },
    });

    return {
      status: 1,
      message: "Password reset successfully",
    };
  } catch (e) {
    console.log(e);
  }
};
