import { type RequestHandler } from "@builder.io/qwik-city";
import { createSeedUsers } from "~/database/seed";

export const onGet: RequestHandler = async ({ query, json, env }) => {
  if (env.get("NODE_ENV") === "production") {
    json(400, {
      success: false,
      message: "Seed users only generated in dev mode",
    });
  }
  const entities = query.get("entities");
  if (!entities) {
    json(400, {
      success: false,
      message: "Provide entities i.e. `users` ",
    });
  }
  switch (entities) {
    case "users":
      await createSeedUsers(100);
      json(201, {
        success: true,
        message: "Generated users seeds",
      });
      break;
    default:
      json(400, {
        success: false,
        message: "entities not available",
      });
  }
};
