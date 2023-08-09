import { component$, Slot } from "@builder.io/qwik";
import { Sidebar } from "~/components/sidebar";

export default component$(() => {
  return (
    <div class="relative container max-w-7xl mx-auto">
      <Sidebar />
      <main>
        <Slot />
      </main>
    </div>
  );
});
