import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function NotAuthorized() {
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <Image src="/not-found2.png" alt="Not Found" width={500} height={500} />
      <div className="flex flex-col items-center justify-center ">
        {" "}
        <h1 className="text-primary text-4xl">404 - PAGE NOT FOUND</h1>
        <Label>Could not find requested resource</Label>
        <Link href="/dashboard" className="mt-4">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
