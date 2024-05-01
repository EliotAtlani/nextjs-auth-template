import { redirect } from "next/navigation";

import { auth } from "../../../../auth";

import { LoginForm } from "@/components/auth/login";
import { User } from "@/types/user";

const page = async () => {
  const session = (await auth()) as User;

  //Navigate to dashboard if user is signed in
  if (session?.user) {
    redirect("/");
  }

  return (
    <>
      <LoginForm />
    </>
  );
};

export default page;
