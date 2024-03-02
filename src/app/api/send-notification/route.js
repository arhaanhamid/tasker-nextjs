// import prisma from "@/lib/prisma";
// import { sendViewedDocumentEmail } from "@/lib/emails/resend-notification";

import { getTasksByDeadline } from "@/lib/data";
import { sendNotificationEmail } from "@/lib/emails/resend-notification";
import { Promise } from "es6-promise";
require("es6-promise").polyfill();

export const maxDuration = 60;

export const GET = async (req, res) => {
  // We only allow POST requests
  //   if (req.method !== "POST") {
  //     res.status(405).json({ message: "Method Not Allowed" });
  //     return;
  //   }

  try {
    // Extract the API Key from the Authorization header
    // const authHeader = await req.headers.get("Authorization");
    // const token = authHeader?.split(" ")[1];

    // // Check if the API Key matches
    // if (token !== process.env.AUTH_API_KEY) {
    //   return new Response("Unauthorized!", { status: 401 });
    // }
    console.log("about tp call gettasksbydeadline");
    const tasks = await getTasksByDeadline();
    console.log(tasks);
    // send email to document owner that document
    const emailPromises = tasks.map((task) => {
      return sendNotificationEmail({
        email: task.assignedToEmail,
        name: task.assignedToName,
      });
    });

    // Wait for all email promises to resolve
    await Promise.all(emailPromises);

    return new Response({ message: "Successs" }, { status: 201 });
  } catch (error) {
    console.log("Error:", error);
    return new Response("Failed to send notifications", { status: 500 });
  }
};
