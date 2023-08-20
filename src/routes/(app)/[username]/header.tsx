import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { useProfile, useProfilePostsCount } from "./layout";
import { ArrowLeftIcon } from "~/icons/arrow";

export const Header = component$(() => {
  const location = useLocation();
  const profileSig = useProfile();
  const postsCountSig = useProfilePostsCount();
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
        <h2 class="text-xl font-bold">{profileSig.value.name}</h2>
        <p class="text-sm">{postsCountSig.value.count} posts</p>
      </div>
    </header>
  );
});
