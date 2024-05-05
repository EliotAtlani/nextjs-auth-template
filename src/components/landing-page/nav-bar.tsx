/* eslint-disable max-len */

import { User } from "@prisma/client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import Logo from "../logo";
import { Button } from "../ui/button";

export async function LandingPageNavBar({ session }: { session: User }) {
  return (
    <div className=" fixed bg-transparent flex w-screen justify-between px-4 py-2 z-20">
      <Link href="/">
        <Logo size={80} />
      </Link>
      {session ? (
        <div className="flex gap-2">
          <Link href="/dashboard">
            <Button>
              {" "}
              <ArrowUpRight size={16} className="mr-2" />
              Go to dashboard{" "}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link href="/signin">
            <Button>Sign in </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-foreground text-background">Sign up </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
