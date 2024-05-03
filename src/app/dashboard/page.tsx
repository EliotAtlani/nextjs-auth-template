import { User } from "@prisma/client";
import { redirect } from "next/navigation";

import { auth } from "../../../auth";

import { Dashboard } from "@/components/dashboard/dashboard";
import NotAuthorized from "@/components/errors/not-authorized";

export default async function Home() {
  const session = (await auth()) as unknown as User;

  console.log(session);

  if (!session) {
    return <NotAuthorized />;
  }
  if (session.role == "admin") {
    redirect("/admin/dashboard");
  }

  return (
    <>
      <Dashboard session={session} />
    </>
  );
}
