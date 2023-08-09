import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const Logo = component$(() => {
  return (
    <Link class="w-14 h-14 p-0 rounded-full btn btn-ghost" href="/">
      <img src="favicon.svg" alt="Logo" width={56} height={56} />
    </Link>
  );
});
