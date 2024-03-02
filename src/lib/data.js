import moment from "moment";
import { Task, User } from "./models";
import { connectToDb } from "./utils";
// import { unstable_noStore as noStore } from "next/cache";
// import { TEMP_DATA } from "./temp_data";

//for admin panel
export const getUsers = async () => {
  try {
    connectToDb();
    const users = await User.find();
    return users;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const getTasks = async (user) => {
  try {
    connectToDb();
    const filters = [
      { assignedByuserId: user.id },
      { assignedToEmail: user.email },
    ];

    const tasks = await Task.find({ $or: filters });

    //converting ot plain objects for client side
    const clientTasks = tasks.map((item) => ({
      ...item.toObject(),
      _id: item._id.toString(),
    }));

    return clientTasks;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch tasks!");
  }
};

export const getTasksByDeadline = async () => {
  const timezoneOffset = new Date().getTimezoneOffset();

  const now = moment();
  const startDate = now.utc().toDate(); // Current date and time
  startDate.setHours(0, 0, 0, 0);
  const endDate = now.utc().add(24, "hours").toDate(); // Date and time 24 hours from now
  endDate.setHours(0, 0, 0, 0);

  try {
    connectToDb();
    const tasksToSendEmail = await Task.aggregate([
      {
        $match: {
          deadline: { $exists: true, $ne: null },
        },
      },
      {
        $addFields: {
          localDeadline: {
            $subtract: [{ $toDate: "$deadline" }, timezoneOffset * 60 * 1000],
          },
        },
      },
      {
        $match: {
          $expr: {
            $and: [
              { $gt: ["$localDeadline", startDate] },
              {
                $lte: ["$localDeadline", endDate],
              },
            ],
          },
        },
      },
    ]);

    return tasksToSendEmail;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch tasks!");
  }
};

// export const getTask = async (id) => {
//   try {
//     connectToDb();
//     const task = await Task.findById(id);
//     return task;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch tasks!");
//   }
// };

// export const getUserTasks = async (userId) => {
//   try {
//     connectToDb();
//     const tasks = await Task.find({ userId: userId });
//     return tasks;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch tasks!");
//   }
// };

// export const getAssignedToTasks = async (email) => {
//   try {
//     connectToDb();
//     const tasks = await Task.find({ assignedTo: email });
//     return tasks;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch tasks!");
//   }
// };

// export const getUser = async (userId) => {
//   noStore();
//   try {
//     connectToDb();
//     const user = await User.findOne({ userId });
//     if (!user) {
//       return { error: "User not found" };
//     }
//     return user;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch user!");
//   }
// };
