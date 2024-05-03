import { db } from "@/lib/Prisma.db";

export const updateLastLoginTime = async (email: string) => {
  try {
    await db.user.update({
      where: {
        email: email as string,
      },
      data: {
        lastLogin: new Date(),
      },
    });
  } catch (e) {
    console.log(e);
  }
};
