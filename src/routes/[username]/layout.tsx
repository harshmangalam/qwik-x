import { Slot, component$ } from "@builder.io/qwik";
import { Link, routeLoader$, useLocation } from "@builder.io/qwik-city";
import { ArrowLeftIcon } from "~/icons/arrow";
import { TabLink } from "./tab-link";

export const useProfile = routeLoader$(({ params }) => {
  return {
    username: params.username,
  };
});
export default component$(() => {
  const location = useLocation();
  const profileSig = useProfile();
  return (
    <div>
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
      {(location.url.pathname.includes("followers") ||
        location.url.pathname.includes("following")) && (
        <div class="tabs bg-base-100 grid grid-cols-2">
          <TabLink href={`/${profileSig.value.username}/followers/`}>
            Followers
          </TabLink>
          <TabLink href={`/${profileSig.value.username}/following/`}>
            Following
          </TabLink>
        </div>
      )}
      <Slot />
    </div>
  );
});
