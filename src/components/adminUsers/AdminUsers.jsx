import { getUsers } from "@/lib/data";
import Image from "next/image";
import { deleteUser } from "@/lib/action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminUsers = async () => {
  const users = await getUsers();

  return (
    <Card className="bg-black text-white border-gray-600 min-w-[30%]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Delete an user</CardTitle>
        <CardDescription>
          WARNING: There will be no confirmation once clicked!
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 ">
        {users.map((user) => (
          <div className="flex items-center justify-between" key={user.id}>
            <div className="flex items-center gap-5 ">
              <Image
                className="object-cover rounded-full"
                src={user.img || "/noavatar.png"}
                alt=""
                width={50}
                height={50}
              />
              <span>{user.username}</span>
            </div>
            <form action={deleteUser}>
              <Input type="hidden" name="id" value={user.id} />
              <Button className="w-full bg-red-950 text-white border border-gray-600 hover:bg-white hover:text-red-950">
                Delete
              </Button>
            </form>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AdminUsers;
