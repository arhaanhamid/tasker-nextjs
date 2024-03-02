import { Resend } from "resend";
import { NotificationEmail } from "./notification";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNotificationEmail({ name, email }) {
  console.log(name, email);
  const emailTemplate = NotificationEmail({ name });
  try {
    // Send the email using the Resend API
    await resend.emails.send({
      from: "suham_taskmanager@resend.dev",
      to: email,
      subject: "Your assigned task is due tommorow!",
      react: emailTemplate,
    });
  } catch (error) {
    // Log any errors and re-throw the error
    console.log({ error });
    throw error;
  }
}
