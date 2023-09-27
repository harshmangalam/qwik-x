import { Slot, component$ } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";
import { isUsernameExists } from "~/utils/users";

export const onRequest: RequestHandler = async ({ next, query, error }) => {
  const username = query.get("username");
  const exists = await isUsernameExists(username);
  if (!exists) throw error(404, "Username does not exists");
  await next();
};
export default component$(() => {
  return <Slot />;
});
