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
