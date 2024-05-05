import { User } from "@prisma/client";
import React from "react";

import { auth } from "../../auth";

import HeroSection from "@/components/landing-page/hero-section";

const Page = async () => {
  const session = (await auth()) as unknown as User;

  return (
    <div className="h-screen w-screen">
      <HeroSection session={session} />
    </div>
  );
};

export default Page;
