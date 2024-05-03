import { compare } from "bcryptjs";

export const comparePwd = async (pwd: string, hash: string) => {
  try {
    const match = await compare(pwd, hash);
    return match;
  } catch (err) {
    console.error("Error comparing passwords:", err);
    throw err;
  }
};
