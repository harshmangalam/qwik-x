import { Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { ArrowLeftIcon } from "~/icons/arrow";

export default component$(() => {
  return (
    <div>
      <header class="flex items-center h-14 px-4 gap-4">
        <Link href="/" class="btn btn-circle btn-ghost btn-sm">
          <ArrowLeftIcon />
        </Link>
        <div>
          <h2 class="text-xl font-bold">Harsh Mangalam</h2>
          <p class="text-sm">12 posts</p>
        </div>
      </header>
      <Slot />
    </div>
  );
});
