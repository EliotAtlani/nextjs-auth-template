import React from "react";

import { auth } from "../../../auth";
import { SignOutBtn } from "../buttons/sign-out-btn";
import { ModeToggle } from "../themes/mode-toggle";

import { User } from "@/types/user";

const Dashboard = async () => {
  const session = (await auth()) as User;

  if (!session?.user) return null;

  return (
    <>
      <ModeToggle />
      <SignOutBtn />
    </>
  );
};

export default Dashboard;
