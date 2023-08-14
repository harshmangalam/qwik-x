import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { useProfile } from "./layout";
import { ArrowLeftIcon } from "~/icons/arrow";

export const Header = component$(() => {
  const location = useLocation();
  const profileSig = useProfile();
  return (
    <header class="flex items-center h-14 px-4 gap-4">
      <Link
        href={
          location.url.pathname === `/${profileSig.value.username}/`
            ? "/"
            : `/${profileSig.value.username}`
        }
        class="btn btn-circle btn-ghost btn-sm"
      >
        <ArrowLeftIcon />
      </Link>
      <div>
        <h2 class="text-xl font-bold">Harsh Mangalam</h2>
        <p class="text-sm">12 posts</p>
      </div>
    </header>
  );
});
