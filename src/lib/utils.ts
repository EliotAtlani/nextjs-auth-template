import { hash } from "bcryptjs";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const saltAndHashPassword = async (
  password: string
): Promise<string> => {
  const saltRounds = 10; // Number of salt rounds (higher is more secure but slower)

  try {
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err;
  }
};

export const generateRandomToken = (length: number = 12): string => {
  try {
    return Array.from(crypto.getRandomValues(new Uint8Array(length)))
      .map((dec) => dec.toString(36))
      .join("");
  } catch (err) {
    console.error("Error generating random token:", err);
    throw err;
  }
};

export const getWebsiteUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return process.env.WEBSITE_URL;
  } else {
    return "http://localhost:3000";
  }
};
