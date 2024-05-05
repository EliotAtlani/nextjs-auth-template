import { User } from "@prisma/client";
import React from "react";

import { LandingPageNavBar } from "./nav-bar";

const HeroSection = async ({ session }: { session: User }) => {
  return (
    <div
      style={{
        backgroundImage: "url('test.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        position: "fixed",
      }}
      className="w-full h-full "
    >
      <LandingPageNavBar session={session} />
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-6xl text-white font-bold"> Home page</h1>
      </div>
    </div>
  );
};

export default HeroSection;
