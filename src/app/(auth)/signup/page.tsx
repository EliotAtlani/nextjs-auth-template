import { redirect } from "next/navigation";

import { auth } from "../../../../auth";

import { SignUpForm } from "@/components/auth/signup";
import { User } from "@/types/user";

const Page = async () => {
  const session = (await auth()) as User;
  //Navigate to dashboard if user is signed in
  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="w-full h-screen flex items-center">
      <SignUpForm />
    </div>
  );
};

export default Page;