import { User } from "@prisma/client";

import { auth } from "../../../../auth";

import { db } from "@/lib/Prisma.db";

export default async function getAllUsers() {
  const session = (await auth()) as unknown as User;
  if (!session || session.role != "admin") {
    return;
  }

  try {
    // Fetch all users from the database order by lastLogin date
    const users = await db.user.findMany({
      orderBy: {
        lastLogin: "desc",
      },
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}
