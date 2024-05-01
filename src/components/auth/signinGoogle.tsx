"use client";
import { useState } from "react";
import { useFormState } from "react-dom";
import { FcGoogle } from "react-icons/fc";
import PuffLoader from "react-spinners/PuffLoader";

import { Button } from "../ui/button";

import { authenticateWithGoogle } from "@/lib/actions";

export function SignInGoogle({ text }: { text: string }) {
  const [errorMessage, dispatch] = useFormState(
    authenticateWithGoogle,
    undefined
  );

  const [loading, setLoading] = useState<boolean>(false);

  console.log("errorMessage", errorMessage);
  return (
    <form action={dispatch}>
      <Button
        type="submit"
        variant="outline"
        className="w-full"
        onClick={() => setLoading(true)}
      >
        {loading ? (
          <PuffLoader color="#7c3aed" size={24} />
        ) : (
          <>
            <FcGoogle className="mr-4" /> {text}
          </>
        )}
      </Button>
    </form>
  );
}
