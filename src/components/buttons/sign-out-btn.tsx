import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

import { signOut } from "../../../auth";
export function SignOutBtn() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
        redirect("/signin");
      }}
      className="w-full"
    >
      <button
        type="submit"
        className="flex items-center cursor-pointer w-full justify-center px-2 py-1.5"
      >
        <LogOut size={16} className="mr-2" /> Sign Out
      </button>
    </form>
  );
}
