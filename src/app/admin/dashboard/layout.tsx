import { User } from "@prisma/client";

import { auth } from "../../../../auth";

import DashboardHeader from "@/components/admin/dashboard/dashboard-header";
import SideBar from "@/components/admin/dashboard/side-bar";
import NotAuthorized from "@/components/errors/not-authorized";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await auth()) as unknown as User;

  if (session?.role != "admin") {
    return <NotAuthorized />;
  }
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideBar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <DashboardHeader session={session} />
        {children}
      </div>
    </div>
  );
}
