import React from "react";

import getAllUsers from "@/actions/user/get/getUsers";
import { TabUserTable } from "@/components/admin/dashboard/users/tab-user-table";

const page = async () => {
  const users = await getAllUsers();
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <TabUserTable users={users} />
    </main>
  );
};

export default page;
