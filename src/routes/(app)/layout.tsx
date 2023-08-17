import { component$, Slot } from "@builder.io/qwik";
import { globalAction$, routeLoader$ } from "@builder.io/qwik-city";
import { MetaSidebar } from "~/components/meta-sidebar";
import { Sidebar } from "~/components/sidebar";
import type { AuthUser } from "~/types";
import { handleLogout } from "~/utils/auth";

export const useCurrentUser = routeLoader$(({ sharedMap }) => {
  const user = sharedMap.get("user") as AuthUser | undefined;
  return user;
});

export const useLogout = globalAction$(async (_, requestEvent) => {
  return handleLogout(requestEvent);
});
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
