import { Slot, component$ } from "@builder.io/qwik";
import { Link, routeLoader$, useLocation } from "@builder.io/qwik-city";
import { ProfileMetaInfo } from "./profile-meta-info";
import { Header } from "./header";
import { ProfileTabs } from "./profile-tabs";
import { FollowTabs } from "./follow-tabs";
import { FollowLinks } from "./follow-links";
import { ProfileImage } from "./profile-image";
import { ProfileInfo } from "./profile-info";

export const useProfile = routeLoader$(({ params }) => {
  return {
    username: params.username,
    name: "Harsh Mangalam",
    bio: "Open source developer, blogger and student",
    category: "Education",
    location: "Bhagalpur",
    link: "github.com/harshmangalam",
    birthday: "Born December 22, 2002",
    createdAt: "Joined February 2021",
    cover:
      "https://images.unsplash.com/photo-1678524493115-cc22b4789d24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1537&q=80",
    avatar: "https://avatars.githubusercontent.com/u/57381638?v=4",
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
