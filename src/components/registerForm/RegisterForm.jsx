"use client";
import { addUser } from "@/lib/action";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  const [state, formAction] = useFormState(addUser, undefined);

  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/login");
  }, [state?.success, router]);

  return (
    <Card className="bg-black text-white border-gray-600 min-w-[90%]  min-h-[90%] md:min-w-[60%] lg:min-w-[40%]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter new credentials below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 ">
        <form action={formAction} className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="username..."
              className="bg-black text-white border-gray-600"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="youremail@example.com"
              className="bg-black text-white border-gray-600"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="password..."
              className="bg-black text-white border-gray-600"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="passwordRepeat">Repeat Password</Label>
            <Input
              id="passwordRepeat"
              type="password"
              name="passwordRepeat"
              placeholder="password..."
              className="bg-black text-white border-gray-600"
              required
            />
          </div>
          <Button className="w-full bg-white text-black border border-gray-600 hover:bg-black hover:text-white">
            Register
          </Button>
          {state?.error}
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background bg-black px-2 text-muted-foreground">
              Already have an account?
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Link href="/login" className="w-full">
          <Button className="w-full bg-white text-black border border-gray-600 hover:bg-black hover:text-white">
            Login
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
