"use server";

import { revalidatePath } from "next/cache";
import { Task, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

export const addTask = async (prevState, formData) => {
  const { title, tag, assignToEmail, userId, status, priority, deadline } =
    Object.fromEntries(formData);

  if (
    !title ||
    !tag ||
    !assignToEmail ||
    !userId ||
    !status ||
    !priority ||
    !deadline
  ) {
    return { error: "Kindly fill all the details." };
  }

  try {
    connectToDb();

    const user = await User.findOne({ email: assignToEmail });
    if (!user) {
      return { error: "User not found!" };
    }

    const task = await Task.findOne({ title });
    if (
      task &&
      task.assignedToEmail == assignToEmail &&
      task.assignedByuserId == userId
    ) {
      return { error: "Task already exists!" };
    }

    const assignedByUser = await User.findOne({ userId });
    if (!assignedByUser) {
      return { error: "Something went wrong!" };
    }

    const taskCount = await Task.find();
    const taskId = "TASK-" + (taskCount.length + 1);

    const timezoneOffset = new Date().getTimezoneOffset();
    const dueDate = new Date(
      new Date(deadline).getTime() + timezoneOffset * 60000
    );

    const newTask = new Task({
      taskId,
      title,
      tag,
      assignedToEmail: user.email,
      assignedToName: user.username,
      deadline: dueDate.toISOString(),
      assignedByuserId: assignedByUser.userId,
      assignedByName: assignedByUser.username,
      status,
      priority,
    });

    await newTask.save();
    console.log("New task saved to DB");
    revalidatePath("/alltasks");
    return { error: "Task created successfully" };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const updateTasks = async (prevData, updatedData) => {
  try {
    connectToDb();

    const tasksToUpdate = [];
    for (const updatedTask of updatedData) {
      const prevTask = prevData.find(
        (task) => task.taskId === updatedTask.taskId
      );
      if (
        !prevTask ||
        JSON.stringify(prevTask) !== JSON.stringify(updatedTask)
      ) {
        tasksToUpdate.push(updatedTask);
      }
    }

    if (tasksToUpdate.length === 0) {
      console.log("No tasks found to update.");
      // return prevState;
      return "No tasks found to update.";
    }

    const updateOperations = tasksToUpdate.map((task) => ({
      updateOne: {
        filter: { taskId: task.taskId },
        update: {
          $set: {
            title: task.title,
            deadline: task.deadline,
            status:
              task.status === "notdone"
                ? "done"
                : task.status === "notcanceled"
                ? "canceled"
                : task.status,
            priority: task.priority,
          },
        },
      },
    }));

    const updateResult = await Task.bulkWrite(updateOperations, {
      ordered: false,
    });

    // Revalidate relevant paths
    revalidatePath("/alltasks");

    if (updateResult.modifiedCount === 0) {
      console.log("No tasks found to update.");
      return "No tasks found to update.";
    }

    console.log("Tasks updated successfully");
    return "Tasks updated successfully.";
  } catch (err) {
    console.error("Error updating tasks:", err);
    return "Something went wrong!"; // Handle errors gracefully
  }
};

//add user from admin panel or register form
export const addUser = async (previousState, formData) => {
  let { username, email, password, passwordRepeat, isAdmin } =
    Object.fromEntries(formData);

  if (!username || !email || !password) {
    return { error: "Kindly fill all the details." };
  }

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  if (!isAdmin) {
    isAdmin = false;
  }

  try {
    connectToDb();

    let user = await User.findOne({ email });
    if (user) {
      return { error: "User with given email already exists!" };
    }

    user = await User.findOne({ username });
    if (user) {
      return { error: "User with given username already exists!" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin,
      userId: username + "_1",
    });

    await newUser.save();

    //getting automatically generated _id from mongodb
    //save that _id as a userId property
    newUser.userId = newUser._id.toString();
    await newUser.save();

    console.log("New user registered");
    revalidatePath("/admin");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

//delete user from admin panel
export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();
    const user = await User.findById(id);
    if (!user) {
      return { error: "Something went wrong!" };
    }

    await Task.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

// export const deleteTasks = async () => {
//   try {
//     connectToDb();

//     const filter = { $expr: { $gt: [{ $strLenCP: "$title" }, 7] } };

//     // Delete the documents that match the filter
//     await Task.deleteMany(filter);
//     console.log("deleted from db");
//   } catch (err) {
//     console.log(err);
//     return { error: "Something went wrong!" };
//   }
// };

// LOGIN AND AUTHENTICATION FUNCTIONS
export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleGoogleLogin = async () => {
  "use server";
  await signIn("google");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};
