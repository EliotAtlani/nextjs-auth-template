"use server";

import { AuthError } from "next-auth";

import { signIn } from "../../auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    console.log("formData", formData);
    formData.append("provider", "credentials");
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function authenticateWithGoogle() {
  await signIn("google");
}
