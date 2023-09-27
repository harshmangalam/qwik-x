import { Slot, component$ } from "@builder.io/qwik";
import { routeAction$, zod$ } from "@builder.io/qwik-city";
import { handleTogglePinLists } from "~/utils/lists";

export const useTogglePin = routeAction$(
  async ({ listId }, requestEvent) => {
    return handleTogglePinLists(Number(listId), requestEvent);
  },
  zod$((z) => ({
    listId: z.string().nonempty(),
  }))
);
export default component$(() => {
  return <Slot />;
});
