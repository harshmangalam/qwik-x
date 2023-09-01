import { Slot, component$ } from "@builder.io/qwik";
import { Link, routeLoader$, useLocation } from "@builder.io/qwik-city";
import { ProfileMetaInfo } from "./profile-meta-info";
import { Header } from "./header";
import { ProfileTabs } from "./profile-tabs";
import { FollowTabs } from "./follow-tabs";
import { FollowLinks } from "./follow-links";
import { ProfileImage } from "./profile-image";
import { ProfileInfo } from "./profile-info";
import { fetchProfileFollowCount, fetchUserProfile } from "~/utils/profile";
import { fetchProfilePostsCount } from "~/utils/profile";

export const useProfile = routeLoader$((requestEvent) => {
  return fetchUserProfile(requestEvent);
});
export const useProfilePostsCount = routeLoader$((requestEvent) => {
  return fetchProfilePostsCount(requestEvent);
});

export const useFollowCounts = routeLoader$(async (requestEvent) => {
  return fetchProfileFollowCount(requestEvent);
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
              <Link href="/edit-profile" class="btn rounded-full">
                Edit Profile
              </Link>
            </div>
            <ProfileInfo />
            <ProfileMetaInfo />
            <FollowLinks />
          </section>
        </div>
      )}
      {showTopTab ? <FollowTabs /> : <ProfileTabs />}
      <Slot />
    </div>
  );
});
