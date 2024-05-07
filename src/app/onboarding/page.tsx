import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

import { auth } from "../../../auth";

import NotAuthorized from "@/components/errors/not-authorized";
import Onboarding from "@/components/onboarding/orchestration-onboarding";

const Page = async () => {
  const session = (await auth()) as unknown as User;

  console.log("eliot2", session);

  if (!session) {
    return <NotAuthorized />;
  }
  if (session.onboarded == true) {
    redirect("/onboarding");
  }

  return (
    <div>
      <Onboarding session={session} />
    </div>
  );
};

export default Page;
