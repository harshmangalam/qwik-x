import { component$ } from "@builder.io/qwik";
import { TabLink } from "./tab-link";
import { useProfile } from "./layout";

export const FollowTabs = component$(() => {
  const profileSig = useProfile();
  const tabs = [
    {
      name: "Followers",
      href: `/${profileSig.value.username}/followers/`,
    },
    {
      name: "Following",
      href: `/${profileSig.value.username}/following/`,
    },
  ];
  return (
    <div class="tabs bg-base-100 grid grid-cols-2">
      {tabs.map(({ name, href }) => (
        <TabLink key={name} href={href}>
          {name}
        </TabLink>
      ))}
    </div>
  );
});
