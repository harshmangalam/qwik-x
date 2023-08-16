import { Slot, component$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { handleTokenVerification } from "~/utils/auth";

export const onRequest: RequestHandler = async (requestEvent) => {
  await handleTokenVerification(requestEvent);
  await requestEvent.next();
};

export default component$(() => {
  return <Slot />;
});
