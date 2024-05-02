"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

import { ResetPassword } from "@/components/auth/reset-password";

const Page = () => {
  // Get URL parameters
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-primary"
      style={{
        backgroundImage: "url('/test.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ResetPassword token={token as string} />
    </div>
  );
};

export default Page;
