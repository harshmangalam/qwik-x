import { component$ } from "@builder.io/qwik";
import { Logo } from "../shared/logo";
import { HomeIcon, HomeOutlineIcon } from "~/icons/home";
import { SearchIcon, SearchOutlineIcon } from "~/icons/search";
import { CommunityIcon, CommunityOutlineIcon } from "~/icons/community";
import { ProfileIcon, ProfileOutlineIcon } from "~/icons/profile";
import { AccountMenu } from "./account-menu";
import { MenuItem } from "./menu-item";
import { useCurrentUser } from "~/routes/(app)/layout";
import { CreatePost } from "../create-post";
import { BookmarkIcon, BookmarkOutlineIcon } from "~/icons/bookmark";

export const Sidebar = component$(() => {
  const userSig = useCurrentUser();
  const links = [
    {
      name: "Home",
      href: "/",
      icon: HomeOutlineIcon,
      activeIcon: HomeIcon,
      show: true,
    },
    {
      name: "Login",
      href: "/login/",
      icon: CommunityOutlineIcon,
      activeIcon: CommunityIcon,
      show: !userSig.value,
    },
    {
      name: "Explore",
      href: "/explore/",
      icon: SearchOutlineIcon,
      activeIcon: SearchIcon,
      show: true,
    },
    {
      name: "Bookmarks",
      href: "/bookmarks/",
      icon: BookmarkOutlineIcon,
      activeIcon: BookmarkIcon,
      show: !!userSig.value,
    },

    {
      name: "Profile",
      href: `/${userSig.value?.username}/`,
      icon: ProfileOutlineIcon,
      activeIcon: ProfileIcon,
      show: !!userSig.value,
    },
  ];
  return (
    <aside class="fixed top-0 bottom-0 flex flex-col gap-4 items-stretch w-64  overflow-y-auto justify-between py-2 border-r">
      <div>
        <div class="px-4">
          <Logo />
        </div>
        <ul class="menu menu-vertical w-full gap-y-1">
          {links.map(
            (link) => link.show && <MenuItem key={link.name} {...link} />
          )}
        </ul>

        {!!userSig.value && (
          <div class="w-full px-2">
            <CreatePost />
          </div>
        )}
      </div>

      {userSig.value && (
        <div class="px-2">
          <AccountMenu
            avatar={userSig.value.avatar.url}
            username={userSig.value.username}
            name={userSig.value.name}
          />
        </div>
      )}
    </aside>
  );
});
