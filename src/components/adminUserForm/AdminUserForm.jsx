"use client";
import { addUser } from "@/lib/action";
import { useFormState } from "react-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminUserForm = () => {
  const [state, formAction] = useFormState(addUser, undefined);

  return (
    <Card className="bg-black text-white border-gray-600 min-w-[30%]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Enter credentials of the user</CardDescription>
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
          <div className="grid gap-2">
            <Label htmlFor="isAdmin">Admin Access</Label>
            <Select required name="isAdmin">
              <SelectTrigger className="w-full bg-black border-gray-600 text-white">
                <SelectValue placeholder="Give admin access?" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border-gray-600">
                <SelectGroup>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full bg-white text-black border border-gray-600 hover:bg-black hover:text-white">
            Register
          </Button>
          {state && state?.success ? "New user registered" : state?.error}
          {/* {state?.error} */}
          {/* {state?.success && "New user created!"} */}
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminUserForm;
