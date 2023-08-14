import { Slot, component$ } from "@builder.io/qwik";
import { Link, routeLoader$, useLocation } from "@builder.io/qwik-city";
import { ProfileInfo } from "./profile-info";
import { Header } from "./header";
import { ProfileTabs } from "./profile-tabs";
import { FollowTabs } from "./follow-tabs";
import { FollowLinks } from "./follow-links";
import { ProfileImage } from "./profile-image";

export const useProfile = routeLoader$(({ params }) => {
  return {
    username: params.username,
  };
});
export default component$(() => {
  const location = useLocation();
  const showTopTab =
    location.url.pathname.includes("followers") ||
    location.url.pathname.includes("following");
  return (
    <div>
      <Header />
      {!showTopTab && (
        <div>
          <ProfileImage />
          <section class="py-3 px-4">
            <div class="flex justify-end">
              <Link href="/settings/profile" class="btn rounded-full">
                Edit Profile
              </Link>
            </div>
            <div class="mt-4">
              <h3 class="text-xl font-bold ">Harsh Mangalam</h3>
              <p class="opacity-70">@HarshMangalam6</p>
            </div>
            <p class="mt-4">Open source developer, blogger and student</p>

            <div class="mt-4">
              <ProfileInfo />
            </div>

            <FollowLinks />
          </section>
        </div>
      )}
      {showTopTab ? <FollowTabs /> : <ProfileTabs />}

      <Slot />
    </div>
  );
});
