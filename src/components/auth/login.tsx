/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import { SignInGoogle } from "./signinGoogle";

import { SubmitButton } from "../buttons/submit-btn";
import PasswordInput from "../input/password-input";
import Logo from "../logo";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate } from "@/lib/actions";
export function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      setError(null);

      // Introduce a delay of 1 second
      await new Promise((resolve) => setTimeout(resolve, 100));
      const form = new FormData();
      form.append("email", e.target.email.value);
      form.append("password", e.target.password.value);

      await dispatch(form);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  return (
    <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <Link href="/" passHref={true} legacyBehavior={true}>
            <a>
              <Logo />
            </a>
          </Link>
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <PasswordInput id={"password"} />
              </div>
              {error && (
                <>
                  <p className="text-sm text-red-500">{error}</p>
                </>
              )}

              <SubmitButton text="Login" loading={loading} />
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

            <SignInGoogle text="Login with Google" />
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
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
          className="h-full w-full object-cover "
        />
      </div>
    </div>
  );
}
