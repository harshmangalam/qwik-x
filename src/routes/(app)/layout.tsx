import { component$, Slot } from "@builder.io/qwik";
import { MetaSidebar } from "~/components/meta-sidebar";
import { Sidebar } from "~/components/sidebar";
import type { RequestHandler } from "@builder.io/qwik-city";
import { handleTokenVerification } from "~/utils/auth";

export const onRequest: RequestHandler = async (requestEvent) => {
  await handleTokenVerification(requestEvent);
  await requestEvent.next();
};
export default component$(() => {
  return (
    <div class="relative container max-w-7xl mx-auto">
      <Sidebar />

      <main class="ml-64">
        <div class="grid grid-cols-12 divide-x min-h-screen h-full">
          <div class="col-span-7">
            <Slot />
          </div>
          <div class="col-span-5">
            <MetaSidebar />
          </div>
        </div>
      </main>
    </div>
  );
});
