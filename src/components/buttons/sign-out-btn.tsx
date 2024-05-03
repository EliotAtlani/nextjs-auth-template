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
    >
      <button type="submit">Sign Out</button>
    </form>
  );
}
