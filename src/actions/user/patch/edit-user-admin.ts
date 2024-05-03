"use server";
import { User } from "@prisma/client";
import { revalidateTag } from "next/cache";

import { db } from "@/lib/Prisma.db";

export const EditUserAdmin = async (data: Partial<User>) => {
  try {
    await db.user.update({
      where: {
        email: data.email as string,
      },
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        role: data.role,
      },
    });
    revalidateTag("users");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
