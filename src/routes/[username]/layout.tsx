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
  };
});
export default component$(() => {
  const location = useLocation();
  const profileSig = useProfile();
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
            <ProfileInfo
              name={profileSig.value.name}
              username={profileSig.value.username}
              bio={profileSig.value.bio}
            />

            <ProfileMetaInfo
              birthday={profileSig.value.birthday}
              category={profileSig.value.category}
              location={profileSig.value.location}
              link={profileSig.value.link}
              createdAt={profileSig.value.createdAt}
            />
            <FollowLinks />
          </section>
        </div>
      )}
      {showTopTab ? <FollowTabs /> : <ProfileTabs />}
      <Slot />
    </div>
  );
});
