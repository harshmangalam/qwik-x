import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { ArrowLeftIcon } from "~/icons/arrow";

export default component$(() => {
  return (
    <div>
      <header class="flex items-center gap-3 px-4 h-14 sticky bg-base-100/80 top-0 backdrop-blur">
        <Link href="/" class="btn btn-ghost btn-circle btn-sm">
          <ArrowLeftIcon />
        </Link>
        <h2 class="font-bold text-lg">Posts</h2>
      </header>
    </div>
  );
});
