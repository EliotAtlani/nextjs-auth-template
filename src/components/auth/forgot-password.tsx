/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";

import { SubmitButton } from "../buttons/submit-btn";
import Logo from "../logo";

import { askResetPassword } from "@/actions/user/askResetPassword";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState = "" as any;

export function ForgotPassword() {
  const [_, formAction] = useFormState(askResetPassword, initialState);
  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Introduce a delay of 1 second
      await new Promise((resolve) => setTimeout(resolve, 500));
      const form = new FormData();
      form.append("email", e.target.email.value);

      await formAction(form);
      toast({
        title: "An email has been sent",
        duration: 5000,
      });
      // Reset the form after successful submission
      e.target.reset();
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <Logo />
          <div className="grid gap-2 text-center">
            <h1 className="text-xl font-bold">Forgot your password ?</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to reset your password
            </p>
          </div>

          <div className="grid gap-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              <SubmitButton text="Reset your password" loading={loading} />
            </form>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
          </div>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/login.jpeg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
