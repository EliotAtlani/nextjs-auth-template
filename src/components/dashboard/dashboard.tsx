import { User } from "@prisma/client";
import React from "react";

import { auth } from "../../../auth";
import { SignOutBtn } from "../buttons/sign-out-btn";
import { ModeToggle } from "../themes/mode-toggle";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Dashboard = async () => {
  const session = (await auth()) as unknown as User;
  console.log("session", session);

  if (!session) return null;

  console.log("session image", session.image);

  const image = session.image as string;
  return (
    <>
      <ModeToggle />
      <SignOutBtn />
      <Avatar>
        <AvatarImage src={`${image}`} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </>
  );
};

export default Dashboard;
