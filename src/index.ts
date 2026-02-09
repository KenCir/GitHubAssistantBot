import { Probot } from "probot";
import { loadEvents } from "./util/loaders.js";

export default async (app: Probot) => {
  app.onError(async (error) => {
    app.log.error(error);
  });

  const events = await loadEvents(new URL("events/", import.meta.url));

  for (const event of events) {
    app.on(event.name, async (...args) => {
      try {
        await event.execute(...args);
      } catch (error) {
        app.log.error(error, `Error executing event ${String(event.name)}`);
      }
    });

    app.log.info(`Registered event: ${String(event.name)}`);
  }

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
