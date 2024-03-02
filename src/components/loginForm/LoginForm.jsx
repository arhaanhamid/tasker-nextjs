"use client";

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
import { useFormState } from "react-dom";
import { Icons } from "../ui/icons";

import { handleGithubLogin, handleGoogleLogin, login } from "@/lib/action";
import Link from "next/link";

export function LoginForm() {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <Card className="bg-black text-white border-gray-600 min-w-[90%]  min-h-[90%] md:min-w-[60%] lg:min-w-[40%]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Login to your account</CardTitle>
        <CardDescription>Login with the following</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 ">
        <div className="grid grid-cols-2 gap-6">
          <form action={handleGithubLogin}>
            <Button
              variant="outline"
              className="bg-black text-white border border-gray-600 hover:bg-white hover:text-black w-[100%]"
            >
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </Button>
          </form>
          <form action={handleGoogleLogin}>
            <Button
              variant="outline"
              className="bg-black text-white border border-gray-600 hover:bg-white hover:text-black  w-[100%]"
            >
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </form>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background bg-black px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
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
          <Button className="w-full bg-white text-black border border-gray-600 hover:bg-black hover:text-white">
            Login
          </Button>
        </form>
        {state?.error}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background bg-black px-2 text-muted-foreground">
              {`Don't have an account?`}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/register" className="w-full">
          <Button className="w-full bg-white text-black border border-gray-600 hover:bg-black hover:text-white">
            Register
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
