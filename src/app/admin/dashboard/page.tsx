import { User } from "@prisma/client";
import React, { Suspense } from "react";

import Loading from "./loading";

import { auth } from "../../../../auth";

import getAllUsers from "@/actions/user/get/getUsers";
import { AdminDashboard } from "@/components/admin/dashboard/dashboard-admin";

const Page = async () => {
  const session = (await auth()) as unknown as User;

  if (!session) return;

  const users = await getAllUsers();

  console.log(users);

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <AdminDashboard users={users} />
      </Suspense>
    </div>
  );
};

export default Page;
