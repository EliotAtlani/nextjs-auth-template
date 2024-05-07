import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

import { auth } from "../../../auth";

import NotAuthorized from "@/components/errors/not-authorized";
import { ModeToggle } from "@/components/themes/mode-toggle";
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await auth()) as unknown as User;

  if (!session) {
    return <NotAuthorized />;
  }
  if (session?.role == "admin") {
    redirect("/admin/dashboard");
  } else if (session?.onboarded == true) {
    redirect("/dashboard");
  }
  return (
    <div className="flex items-center justify-center w-full h-screen">
      {children}
      <div className="fixed bottom-2 left-2">
        <ModeToggle />
      </div>
    </div>
  );
}
