"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <Image src="/not-found.png" alt="Not Found" width={500} height={500} />
      <div className="flex flex-col items-center justify-center ">
        {" "}
        <h1 className="text-primary text-4xl">404 - PAGE NOT FOUND</h1>
        <Label>Could not find requested resource</Label>
        <Button onClick={() => router.back()} className="mt-4">
          Go home
        </Button>
      </div>
    </div>
  );
}
