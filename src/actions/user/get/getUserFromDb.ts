import { User } from "@prisma/client";

import { db } from "@/lib/Prisma.db";

export const getUserFromDb = async (email: string, provider: string) => {
  try {
    const user = db.user.findFirst({
      where: {
        email,
        provider,
      },
    }) as unknown as User;
    return user;
  } catch (e) {
    console.log(e);
  }
};
