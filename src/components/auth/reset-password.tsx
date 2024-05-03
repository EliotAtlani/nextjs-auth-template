/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import { SubmitButton } from "../buttons/submit-btn";
import FormError from "../errors/form-error";
import PasswordInput from "../input/password-input";
import Logo from "../logo";
import { useToast } from "../ui/use-toast";

import { verifyTokenResetPassword } from "@/actions/user/resetPwd/verifyTokenResetPassword";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const initialState = "" as any;

export function ResetPassword({ token }: { token: string }) {
  const { toast } = useToast();

  const [state, formAction] = useFormState(
    verifyTokenResetPassword,
    initialState
  );

  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  console.log("state", state);
  console.log("error", error);

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      setError(null);
      if (e.target.password.value !== e.target["confirm-password"].value) {
        setError(JSON.stringify({ p: ["Passwords do not match"] }));
        return;
      }
      const form = new FormData();
      form.append("password", e.target.password.value);
      form.append("token", token);
      await formAction(form);
    } catch (err) {
      console.error(err);
    } finally {
      e.target.reset();
      setLoading(false);
    }
  };

  useEffect(() => {
    setError(state?.errors as string);
    if (state?.status === 1 || state?.status === 0) {
      toast({
        title: state?.message,
        variant: state?.status === 1 ? "default" : "destructive",
        duration: 5000,
      });
    }
  }, [state]);
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <Logo />
        <CardTitle className="text-2xl">Reset your password</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-3">
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <PasswordInput id={"password"} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Confirm your password</Label>
            <PasswordInput id={"confirm-password"} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <FormError errors={error} />
          <SubmitButton loading={loading} text={"Reset"} />

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
