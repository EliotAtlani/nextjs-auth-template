/* eslint-disable max-len */
import { User } from "@prisma/client";
import { UserIcon } from "lucide-react";

import { TabUserTable } from "./users/tab-user-table";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AdminDashboard({ users }: { users: User[] | undefined }) {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card
          x-chunk="dashboard-05-chunk-1 "
          className="flex items-center justify-center"
        >
          <CardHeader className="pb-4 flex items-center justify-center">
            <CardDescription>Number of users</CardDescription>
            <CardTitle className="text-4xl flex items-center text-primary ">
              {users?.length}
              <UserIcon className="font-bold ml-2" size={30} />
            </CardTitle>
          </CardHeader>
        </Card>
        <Card
          x-chunk="dashboard-05-chunk-1 "
          className="flex items-center justify-center"
        >
          <CardHeader className="pb-4 flex items-center justify-center">
            <CardDescription>This Month</CardDescription>
            <CardTitle className="text-4xl">$5,329</CardTitle>
          </CardHeader>
        </Card>
        <Card
          x-chunk="dashboard-05-chunk-1 "
          className="flex items-center justify-center"
        >
          <CardHeader className="pb-4 flex items-center justify-center">
            <CardDescription>This Month</CardDescription>
            <CardTitle className="text-4xl">$5,329</CardTitle>
          </CardHeader>
        </Card>
        <Card
          x-chunk="dashboard-05-chunk-1 "
          className="flex items-center justify-center"
        >
          <CardHeader className="pb-4 flex items-center justify-center">
            <CardDescription>This Month</CardDescription>
            <CardTitle className="text-4xl">$5,329</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <TabUserTable users={users} />
    </main>
  );
}
