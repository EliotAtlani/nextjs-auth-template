"use server";
import { User } from "@prisma/client";
import { revalidateTag } from "next/cache";

import { auth } from "../../../../auth";

import { db } from "@/lib/Prisma.db";

export const deleteUser = async (email: string) => {
  try {
    const session = (await auth()) as unknown as User;
    if (!session || session.role != "admin") {
      return;
    }
    // delete user
    await db.user.delete({
      where: {
        email,
      },
    });
    revalidateTag("users");
    return "";
  } catch (error) {
    console.error(error);
    return error;
  }
};
