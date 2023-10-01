import { Slot, component$ } from "@builder.io/qwik";
import { routeAction$, zod$ } from "@builder.io/qwik-city";
import { handleFollowUnfollowLists, handleTogglePinLists } from "~/utils/lists";

export const useTogglePin = routeAction$(
  async ({ listId }, requestEvent) => {
    return handleTogglePinLists(Number(listId), requestEvent);
  },
  zod$((z) => ({
    listId: z.string().nonempty(),
  }))
);

export const useFollowing = routeAction$(
  async ({ listId }, requestEvent) => {
    return handleFollowUnfollowLists(listId, requestEvent);
  },
  zod$((z) => ({
    listId: z.string().nonempty(),
  }))
);
export default component$(() => {
  return <Slot />;
});
