import { component$ } from "@builder.io/qwik";
import { useProfile } from "./layout";
import { TabLink } from "./tab-link";

export const ProfileTabs = component$(() => {
  const profileSig = useProfile();
  const profileTabs = [
    {
      name: "Posts",
      href: `/${profileSig.value.username}/`,
    },
    {
      name: "Replies",
      href: `/${profileSig.value.username}/with-replies/`,
    },
    {
      name: "Media",
      href: `/${profileSig.value.username}/media/`,
    },
    {
      name: "Likes",
      href: `/${profileSig.value.username}/likes/`,
    },
  ];
  return (
    <div class="tabs bg-base-100 grid grid-cols-4">
      {profileTabs.map(({ name, href }) => (
        <TabLink key={name} href={href}>
          {name}
        </TabLink>
      ))}
    </div>
  );
});
