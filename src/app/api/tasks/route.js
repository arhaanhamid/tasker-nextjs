import { Task } from "@/lib/models";
import { connectToDb } from "@/lib/utils";

export const POST = async (req) => {
  const { userId, userEmail } = await req.json();
  try {
    await connectToDb();
    const filters = [
      { assignedByuserId: userId },
      { assignedToEmail: userEmail },
    ];

    const tasks = await Task.find({ $or: filters }).then((data) =>
      data.map((item) => ({
        ...item.toObject(),
        _id: item._id.toString(),
      }))
    );

    // Wait for all tasks to be processed
    return new Response(JSON.stringify(tasks), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
