import { Slot, component$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

export const onRequest: RequestHandler = async ({ sharedMap, redirect }) => {
  const user = sharedMap.get("user");
  if (user) throw redirect(302, "/");
};
export default component$(() => {
  return (
    <div>
      <Slot />
    </div>
  );
});
