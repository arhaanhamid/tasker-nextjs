import { CreateTaskForm } from "@/components/createTaskForm/CreateTaskForm";
import { auth } from "@/lib/auth";

const CreateTaskPage = async () => {
  const session = await auth();
  return (
    <div className="flex items-center justify-center">
      <CreateTaskForm userId={session.user.id} />
    </div>
  );
};

export default CreateTaskPage;
