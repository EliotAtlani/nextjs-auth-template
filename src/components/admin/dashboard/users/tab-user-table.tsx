/* eslint-disable max-len */
import { User } from "@prisma/client";

import { UserTable } from "./user-table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabUserTable({
  users,
  limit,
}: {
  users: User[] | undefined;
  limit?: boolean;
}) {
  if (limit) {
    return <UserTable users={users?.slice(0, 10)} limit={true} />;
  } else {
    return (
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all">
          <UserTable users={users} />
        </TabsContent>
        <TabsContent value="user">
          <UserTable users={users?.filter((user) => user.role === "user")} />
        </TabsContent>
        <TabsContent value="admin">
          <UserTable users={users?.filter((user) => user.role === "admin")} />
        </TabsContent>
      </Tabs>
    );
  }
}
