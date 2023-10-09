import { Slot, component$ } from "@builder.io/qwik";
import { routeAction$, type RequestHandler, zod$ } from "@builder.io/qwik-city";
import { handleTokenVerification } from "~/utils/auth";
import { handleUpdateUserTheme } from "~/utils/users";

export const useThemeAction = routeAction$(
  async ({ theme }, requestEvent) => {
    return handleUpdateUserTheme(theme, requestEvent);
  },
  zod$((z) => ({
    theme: z.string().nonempty(),
  }))
);
export const onRequest: RequestHandler = async (requestEvent) => {
  await handleTokenVerification(requestEvent);
  await requestEvent.next();
};

export default component$(() => {
  return <Slot />;
});
