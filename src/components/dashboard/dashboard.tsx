import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

import { auth } from "../../../auth";
import { SignOutBtn } from "../buttons/sign-out-btn";
import { ModeToggle } from "../themes/mode-toggle";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Dashboard = async () => {
  const session = (await auth()) as unknown as User;
  console.log("session_eliot", session);

  if (!session) return null;

  if (session.role == "admin") {
    redirect("/admin/dashboard");
  }

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
      <h2>
        {" "}
        Name : {session.firstname} {session.lastname}
      </h2>
      <h1> {session.email}</h1>
      <h3> {session.role}</h3>
    </>
  );
};

export default Dashboard;
