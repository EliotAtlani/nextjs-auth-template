/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import { SignInGoogle } from "./signinGoogle";

import { SubmitButton } from "../buttons/submit-btn";
import FormError from "../errors/form-error";
import PasswordInput from "../input/password-input";
import Logo from "../logo";

import { createUser } from "@/actions/user/post/createUser";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState = "" as any;

export function SignUpForm() {
  const [state, formAction] = useFormState(createUser, initialState);

  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  console.log(state);
  if (state?.success) {
    redirect("/signin");
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      setError(null);
      if (e.target.password.value !== e.target["confirm-password"].value) {
        setError(JSON.stringify({ p: ["Passwords do not match"] }));
        return;
      }

      // Introduce a delay of 1 second
      await new Promise((resolve) => setTimeout(resolve, 500));
      const form = new FormData();
      form.append("email", e.target.email.value);
      form.append("password", e.target.password.value);
      if (e.target.password.value !== e.target["confirm-password"].value) {
        setError(JSON.stringify({ p: ["Passwords do not match"] }));
        return;
      }
      form.append("firstname", e.target["first-name"].value);
      form.append("lastname", e.target["last-name"].value);

      await formAction(form);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setError(state?.errors as string);
  }, [state]);

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <Link href="/">
          <Logo />
        </Link>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="John" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Doe" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="mt-2">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="mt-2">
                Password
              </Label>
              <PasswordInput id={"password"} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="mt-2">
                Confirm your password
              </Label>
              <PasswordInput id={"confirm-password"} />
            </div>

            <FormError errors={error} />
            <SubmitButton loading={loading} text={"Create an account"} />
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <SignInGoogle text="Sign in with Google" />
        </div>
      </CardContent>
      <CardFooter>
        <div className="mt-4 text-center text-sm w-full">
          Already have an account?{" "}
          <Link href="/signin" className="underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
