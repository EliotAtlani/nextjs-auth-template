"use client";
import { User } from "@prisma/client";
import { format } from "date-fns";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import RowDropdown from "@/components/dropdown-menu/row-dropdown";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export function UserTable({ users }: { users: User[] | undefined }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users?.filter((user) => {
    const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
    const email = user.email.toLowerCase();
    const query = searchQuery.toLowerCase();

    return fullName.includes(query) || email.includes(query);
  });

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle className="flex">
          <div>
            Users
            <Label className="ml-4">
              (Showing <strong>{filteredUsers?.length}</strong> users)
            </Label>
          </div>

          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardTitle>
        <CardDescription>
          Browse your users and manage their roles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Firstname</TableHead>
              <TableHead>Lastname</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead className="hidden md:table-cell">Last login</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-[50%] object-cover"
                    height="50"
                    src={(user?.image as string) ?? "/logo-light.png"}
                    width="50"
                  />
                </TableCell>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell className="font-medium">{user.firstname}</TableCell>
                <TableCell className="font-medium">{user.lastname}</TableCell>
                <TableCell className="font-medium">
                  <Badge
                    className={cn(
                      "capitalize",
                      user.role == "admin"
                        ? "bg-foreground text-background"
                        : "bg-primary"
                    )}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(new Date(user.createdAt), "yyyy-MM-dd hh:mm aa")}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(new Date(user.lastLogin), "yyyy-MM-dd hh:mm aa")}
                </TableCell>
                <TableCell>
                  <RowDropdown user={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
