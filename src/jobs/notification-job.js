import { client } from "@/trigger";
import { cronTrigger, retry } from "@trigger.dev/sdk";

client.defineJob({
  id: "send-notification",
  name: "Send Notification",
  version: "0.0.1",
  // trigger: eventTrigger({
  //   name: "link.viewed",
  //   // schema: z.object({
  //   //   viewId: z.string(),
  //   // }),
  // }),
  trigger: cronTrigger({
    cron: "0 8 * * 1-5",
  }),
  run: async (payload, io, ctx) => {
    await io.runTask(
      "send-notification",
      async () => {
        const response = await fetch(
          `${process.env.DOMAIN}/api/send-notification`,
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.AUTH_API_KEY}`, // <- add the authenication header with a local env variable
            },
          }
        );

        if (!response.ok) {
          await io.logger.error("Failed to send notification", { payload });
          return;
        }

        await io.logger.info("Notification sent", { payload });
      },
      { retry: retry.standardBackoff }
    );
  },
});
