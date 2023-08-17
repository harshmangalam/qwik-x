import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { LogoIcon } from "~/icons/logo";

export const Logo = component$(() => {
  return (
    <Link class="w-14 h-14 p-0 rounded-full btn btn-ghost" href="/">
      <LogoIcon />
    </Link>
  );
});
