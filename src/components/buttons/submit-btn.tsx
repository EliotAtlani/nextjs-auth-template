"use client";

import PuffLoader from "react-spinners/PuffLoader";

import { Button } from "../ui/button";

export function SubmitButton({
  text,
  loading,
}: {
  text: string;
  loading: boolean;
}) {
  return (
    <Button type="submit" disabled={loading} className="w-full mt-4">
      {loading ? <PuffLoader color="#fff" size={24} /> : text}
    </Button>
  );
}
