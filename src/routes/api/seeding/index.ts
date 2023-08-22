import { type RequestHandler } from "@builder.io/qwik-city";
import { createSeedUsers } from "~/database/seed";

export const onGet: RequestHandler = async ({ json, query }) => {
  const entities = query.get("entities");
  console.log(entities);
  if (!entities)
    json(400, {
      success: false,
      message: "Provide entites query params",
    });
  switch (entities) {
    case "users":
      await createSeedUsers(100);
      json(201, {
        message: "Generated users seeds",
      });
  }
};
