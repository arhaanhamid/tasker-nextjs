import TaskTable from "@/components/tasktable/TaskTable";
import { auth } from "@/lib/auth";
import { getTasks } from "@/lib/data";

const TasksPage = async () => {
  const session = await auth();
  const tasks = await getTasks(session.user);

  return (
    <>
      <TaskTable tasks={tasks} />
    </>
  );
};

export default TasksPage;
